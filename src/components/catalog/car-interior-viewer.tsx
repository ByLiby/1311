"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { changeSeatMaterial } from "../../configurator/materialManager.js";
import { clearMeshRegistry, registerMesh } from "../../configurator/meshRegistry.js";
import { loadTexture as loadConfiguredTexture } from "../../loaders/textureLoader.js";

type CarInteriorViewerProps = {
  materialName: string;
  textureCandidates: string[];
  modelPath: string;
  modelFolderPath?: string;
  modelMtlPath?: string;
  materialId?: string;
};

type ViewerPhase = "loading" | "ready" | "error";
type HDREnvironmentName = "luxury-studio.hdr" | "studio_small_09.hdr";
type LoadedHDREnvironment = {
  environmentTarget: THREE.WebGLRenderTarget;
};

const materialTextureKeys = [
  "map",
  "alphaMap",
  "aoMap",
  "bumpMap",
  "displacementMap",
  "emissiveMap",
  "envMap",
  "lightMap",
  "metalnessMap",
  "normalMap",
  "roughnessMap",
  "specularMap",
] as const;

const ALCANTARA_TEXTURE_PATH = "/textures/alcantara.jpg";
const DEBUG_MATERIALS = false;

const WHITE_LEATHER_SHEEN_COLOR = new THREE.Color("#d8d1c6");
const DARK_LEATHER_SHEEN_COLOR = new THREE.Color("#b6aa9b");

const upholsteryKeywords = [
  "seat",
  "leather",
  "upholstery",
  "cushion",
  "headrest",
  "backrest",
  "bolster",
  "armrest",
  "bench",
  "trim",
];

function encodeAssetUrl(url: string) {
  if (url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }

  try {
    return encodeURI(decodeURI(url));
  } catch {
    return encodeURI(url);
  }
}

function getModelExtension(modelPath: string) {
  const cleanPath = modelPath.split("?")[0].toLowerCase();

  if (cleanPath.endsWith(".glb")) {
    return ".glb";
  }
  if (cleanPath.endsWith(".gltf")) {
    return ".gltf";
  }
  if (cleanPath.endsWith(".fbx")) {
    return ".fbx";
  }
  if (cleanPath.endsWith(".obj")) {
    return ".obj";
  }

  return "";
}

function getDirectoryPath(filePath: string) {
  const cleanPath = filePath.split("?")[0];
  const lastSlash = cleanPath.lastIndexOf("/");
  if (lastSlash <= 0) {
    return "";
  }

  return cleanPath.slice(0, lastSlash);
}

function getBaseNameWithoutExtension(filePath: string) {
  const cleanPath = filePath.split("?")[0];
  const fileName = cleanPath.slice(cleanPath.lastIndexOf("/") + 1);
  const extensionIndex = fileName.lastIndexOf(".");

  if (extensionIndex === -1) {
    return fileName;
  }

  return fileName.slice(0, extensionIndex);
}

function replaceExtension(filePath: string, nextExtension: string) {
  const cleanPath = filePath.split("?")[0];
  const extensionIndex = cleanPath.lastIndexOf(".");

  if (extensionIndex === -1) {
    return `${cleanPath}${nextExtension}`;
  }

  return `${cleanPath.slice(0, extensionIndex)}${nextExtension}`;
}

function buildObjMtlCandidates(modelPath: string, modelFolderPath?: string, explicitMtlPath?: string) {
  const directory = getDirectoryPath(modelPath);
  const basename = getBaseNameWithoutExtension(modelPath);
  const folderRoot = modelFolderPath?.replace(/\/+$/, "");

  return Array.from(
    new Set(
      [
        explicitMtlPath,
        replaceExtension(modelPath, ".mtl"),
        directory ? `${directory}/${basename}.mtl` : undefined,
        folderRoot ? `${folderRoot}/${basename}.mtl` : undefined,
      ].filter((candidate): candidate is string => Boolean(candidate)),
    ),
  );
}

function estimateVolume(mesh: THREE.Mesh) {
  const bounds = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  bounds.getSize(size);
  return size.x * size.y * size.z;
}

function isUpholsteryMesh(mesh: THREE.Mesh) {
  const materialNames = (Array.isArray(mesh.material) ? mesh.material : [mesh.material])
    .map((material: THREE.Material) => material.name.toLowerCase())
    .join(" ");

  const signature = `${mesh.name.toLowerCase()} ${materialNames}`;
  return upholsteryKeywords.some((keyword) => signature.includes(keyword));
}

function disposeMaterialWithTextures(
  material: THREE.Material,
  disposedTextures: Set<THREE.Texture>,
) {
  const texturedMaterial = material as THREE.Material & Record<string, unknown>;
  for (const key of materialTextureKeys) {
    const texture = texturedMaterial[key];
    if (!(texture instanceof THREE.Texture) || disposedTextures.has(texture)) {
      continue;
    }

    disposedTextures.add(texture);
    texture.dispose();
  }

  material.dispose();
}

function loadGltfScene(loader: GLTFLoader, modelPath: string) {
  return new Promise<THREE.Object3D>((resolve, reject) => {
    loader.load(
      encodeAssetUrl(modelPath),
      (gltf: { scene: THREE.Object3D }) => resolve(gltf.scene),
      undefined,
      reject,
    );
  });
}

function loadFbxScene(loader: FBXLoader, modelPath: string) {
  return new Promise<THREE.Object3D>((resolve, reject) => {
    loader.load(encodeAssetUrl(modelPath), resolve, undefined, reject);
  });
}

function loadMtl(mtlLoader: MTLLoader, mtlPath: string) {
  return new Promise<MTLLoader.MaterialCreator>((resolve, reject) => {
    mtlLoader.load(encodeAssetUrl(mtlPath), resolve, undefined, reject);
  });
}

function loadObjScene(loader: OBJLoader, modelPath: string) {
  return new Promise<THREE.Object3D>((resolve, reject) => {
    loader.load(encodeAssetUrl(modelPath), resolve, undefined, reject);
  });
}

function loadHDR(
  name: HDREnvironmentName,
  rgbeLoader: RGBELoader,
  pmremGenerator: THREE.PMREMGenerator,
) {
  return new Promise<LoadedHDREnvironment>((resolve, reject) => {
    rgbeLoader.load(
      name,
      (sourceTexture: THREE.Texture) => {
        const environmentTarget = pmremGenerator.fromEquirectangular(sourceTexture);
        sourceTexture.dispose();
        resolve({ environmentTarget });
      },
      undefined,
      reject,
    );
  });
}

async function loadFirstAvailableSeatTexture(
  renderer: THREE.WebGLRenderer,
  textureCandidates: string[],
) {
  for (const textureCandidate of textureCandidates) {
    try {
      return await loadConfiguredTexture(textureCandidate, renderer);
    } catch {
      // Continue with next texture candidate if one fails.
    }
  }

  return null;
}

function debugMaterialLog(message: string) {
  if (DEBUG_MATERIALS) {
    console.info(`[car-interior-viewer] ${message}`);
  }
}

function buildMaterialCacheKey(previewTexture: THREE.Texture, materialType: string) {
  return `${previewTexture.uuid}:${materialType}`;
}

function getMaterialMap(material: THREE.Material) {
  const map = (material as THREE.Material & { map?: unknown }).map;
  return map instanceof THREE.Texture ? map : null;
}

function collectUsedMaterials(modelRoot: THREE.Object3D) {
  const usedMaterials = new Set<THREE.Material>();

  modelRoot.traverse((node: THREE.Object3D) => {
    if (!(node instanceof THREE.Mesh)) {
      return;
    }

    const meshMaterials = Array.isArray(node.material) ? node.material : [node.material];
    meshMaterials.forEach((material: THREE.Material) => {
      usedMaterials.add(material);
    });
  });

  return usedMaterials;
}

function collectUsedTextureMaps(modelRoot: THREE.Object3D) {
  const usedMaps = new Set<THREE.Texture>();

  modelRoot.traverse((node: THREE.Object3D) => {
    if (!(node instanceof THREE.Mesh)) {
      return;
    }

    const meshMaterials = Array.isArray(node.material) ? node.material : [node.material];
    meshMaterials.forEach((material: THREE.Material) => {
      const map = getMaterialMap(material);
      if (map) {
        usedMaps.add(map);
      }
    });
  });

  return usedMaps;
}

function pruneMaterialCache(
  modelRoot: THREE.Object3D,
  materialCache: Map<string, THREE.Material>,
) {
  const usedMaterials = collectUsedMaterials(modelRoot);

  materialCache.forEach((material, cacheKey) => {
    if (usedMaterials.has(material)) {
      return;
    }

    material.dispose();
    materialCache.delete(cacheKey);
    debugMaterialLog(`disposed stale cached material ${cacheKey}`);
  });
}

function disposeUnusedPreviewTextures(
  modelRoot: THREE.Object3D,
  staleTextures: Set<THREE.Texture>,
  managedPreviewTextures: Set<THREE.Texture>,
  activeTexture: THREE.Texture,
) {
  if (staleTextures.size === 0) {
    return;
  }

  const usedMaps = collectUsedTextureMaps(modelRoot);

  staleTextures.forEach((texture) => {
    if (texture === activeTexture || usedMaps.has(texture)) {
      return;
    }

    texture.dispose();
    managedPreviewTextures.delete(texture);
    debugMaterialLog(`disposed stale preview texture ${texture.uuid}`);
  });
}

function setMaterialMapWithCleanup(
  material: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial,
  previewTexture: THREE.Texture,
  staleTextures: Set<THREE.Texture>,
  managedPreviewTextures: Set<THREE.Texture>,
) {
  const previousMap = material.map;
  const mapPresenceChanged = !(previousMap instanceof THREE.Texture);

  if (
    previousMap instanceof THREE.Texture &&
    previousMap !== previewTexture &&
    managedPreviewTextures.has(previousMap)
  ) {
    staleTextures.add(previousMap);
  }

  if (previousMap !== previewTexture) {
    material.map = previewTexture;
  }

  return mapPresenceChanged;
}

function getOrCreateCachedMaterial<TMaterial extends THREE.Material>(
  materialCache: Map<string, THREE.Material>,
  cacheKey: string,
  createMaterial: () => TMaterial,
) {
  const cached = materialCache.get(cacheKey);
  if (cached) {
    debugMaterialLog(`cache hit for ${cacheKey}`);
    return cached as TMaterial;
  }

  const nextMaterial = createMaterial();
  materialCache.set(cacheKey, nextMaterial);
  debugMaterialLog(`cache miss for ${cacheKey}; created material`);
  return nextMaterial;
}

function configurePreviewTexture(
  previewTexture: THREE.Texture,
  isAlcantara: boolean,
  maxAnisotropy: number,
) {
  previewTexture.colorSpace = THREE.SRGBColorSpace;
  previewTexture.minFilter = THREE.LinearMipmapLinearFilter;
  previewTexture.magFilter = THREE.LinearFilter;
  previewTexture.center.set(0.5, 0.5);
  previewTexture.rotation = 0;
  previewTexture.anisotropy = maxAnisotropy;

  if (isAlcantara) {
    previewTexture.wrapS = THREE.RepeatWrapping;
    previewTexture.wrapT = THREE.RepeatWrapping;
    previewTexture.repeat.set(3, 3);
  } else {
    previewTexture.wrapS = THREE.RepeatWrapping;
    previewTexture.wrapT = THREE.RepeatWrapping;
    previewTexture.repeat.set(3.1, 3.1);
  }

  previewTexture.needsUpdate = true;
}

function applyMaterialPreview(
  modelRoot: THREE.Object3D,
  previewTexture: THREE.Texture,
  replacedMaterials: Set<THREE.Material>,
  materialCache: Map<string, THREE.Material>,
  managedPreviewTextures: Set<THREE.Texture>,
  materialId?: string,
) {
  const isAlcantara = materialId?.toLowerCase().includes("alcantara") ?? false;
  const stalePreviewTextures = new Set<THREE.Texture>();
  managedPreviewTextures.add(previewTexture);

  if (isAlcantara) {
    modelRoot.traverse((node: THREE.Object3D) => {
      if (!(node instanceof THREE.Mesh)) {
        return;
      }

      const mesh = node;
      if (!isUpholsteryMesh(mesh)) {
        return;
      }

      const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      const cacheKey = buildMaterialCacheKey(previewTexture, "alcantara-standard");
      const alcantaraMaterial = getOrCreateCachedMaterial(materialCache, cacheKey, () => {
        return new THREE.MeshStandardMaterial({
          map: previewTexture,
          roughness: 0.95,
          metalness: 0,
          envMapIntensity: 0.25,
          color: new THREE.Color(0xffffff),
          normalMap: null,
          roughnessMap: null,
        });
      });

      const nextMaterials = sourceMaterials.map((sourceMaterial: THREE.Material) => {
        const previousMap = getMaterialMap(sourceMaterial);
        if (
          previousMap &&
          previousMap !== previewTexture &&
          managedPreviewTextures.has(previousMap)
        ) {
          stalePreviewTextures.add(previousMap);
        }

        if (sourceMaterial !== alcantaraMaterial) {
          replacedMaterials.add(sourceMaterial);
        }

        return alcantaraMaterial;
      });

      mesh.material = Array.isArray(mesh.material) ? nextMaterials : nextMaterials[0];

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    disposeUnusedPreviewTextures(
      modelRoot,
      stalePreviewTextures,
      managedPreviewTextures,
      previewTexture,
    );
    pruneMaterialCache(modelRoot, materialCache);
    return;
  }

  const matches: THREE.Mesh[] = [];
  const fallbackMeshes: THREE.Mesh[] = [];

  modelRoot.traverse((node: THREE.Object3D) => {
    if (!(node instanceof THREE.Mesh)) {
      return;
    }

    if (isUpholsteryMesh(node)) {
      matches.push(node);
      return;
    }

    fallbackMeshes.push(node);
  });

  const targetMeshes =
    matches.length > 0
      ? matches
      : fallbackMeshes.sort((meshA, meshB) => estimateVolume(meshB) - estimateVolume(meshA)).slice(0, 6);

  const isWhite = materialId?.toLowerCase().includes("white") ?? materialId?.toLowerCase().includes("cream") ?? false;

  targetMeshes.forEach((mesh) => {
    const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    const nextMaterials = sourceMaterials.map((sourceMaterial: THREE.Material) => {
      const fallbackColor =
        "color" in sourceMaterial && sourceMaterial.color instanceof THREE.Color
          ? sourceMaterial.color
          : new THREE.Color("#f1efe9");

      if (sourceMaterial instanceof THREE.MeshPhysicalMaterial) {
        const mapPresenceChanged = setMaterialMapWithCleanup(
          sourceMaterial,
          previewTexture,
          stalePreviewTextures,
          managedPreviewTextures,
        );
        sourceMaterial.roughness = isWhite ? 0.62 : 0.72;
        sourceMaterial.metalness = 0.06;
        sourceMaterial.sheen = isWhite ? 0.06 : 0.05;
        sourceMaterial.sheenColor.copy(isWhite ? WHITE_LEATHER_SHEEN_COLOR : DARK_LEATHER_SHEEN_COLOR);
        sourceMaterial.envMapIntensity = Math.max(sourceMaterial.envMapIntensity, 1.12);
        if (mapPresenceChanged) {
          sourceMaterial.needsUpdate = true;
        }
        return sourceMaterial;
      }

      if (sourceMaterial instanceof THREE.MeshStandardMaterial) {
        const mapPresenceChanged = setMaterialMapWithCleanup(
          sourceMaterial,
          previewTexture,
          stalePreviewTextures,
          managedPreviewTextures,
        );
        sourceMaterial.roughness = isWhite ? 0.62 : 0.72;
        sourceMaterial.metalness = 0.06;
        sourceMaterial.envMapIntensity = Math.max(sourceMaterial.envMapIntensity, 1.12);
        if (mapPresenceChanged) {
          sourceMaterial.needsUpdate = true;
        }
        return sourceMaterial;
      }

      replacedMaterials.add(sourceMaterial);
      const cacheKey = buildMaterialCacheKey(
        previewTexture,
        `leather-physical-${isWhite ? "white" : "dark"}-${fallbackColor.getHexString()}`,
      );

      return getOrCreateCachedMaterial(materialCache, cacheKey, () => {
        const nextMaterial = new THREE.MeshPhysicalMaterial({
          color: fallbackColor.clone(),
          map: previewTexture,
          roughness: isWhite ? 0.6 : 0.72,
          metalness: 0.05,
          clearcoat: 0.12,
          clearcoatRoughness: 0.54,
          envMapIntensity: 1.12,
          sheen: isWhite ? 0.06 : 0.05,
        });
        nextMaterial.sheenColor = (isWhite ? WHITE_LEATHER_SHEEN_COLOR : DARK_LEATHER_SHEEN_COLOR).clone();
        return nextMaterial;
      });
    });

    mesh.material = Array.isArray(mesh.material) ? nextMaterials : nextMaterials[0];
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  disposeUnusedPreviewTextures(
    modelRoot,
    stalePreviewTextures,
    managedPreviewTextures,
    previewTexture,
  );
  pruneMaterialCache(modelRoot, materialCache);
}

function centerAndScaleModel(modelRoot: THREE.Object3D) {
  const initialBounds = new THREE.Box3().setFromObject(modelRoot);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  initialBounds.getSize(size);
  initialBounds.getCenter(center);
  modelRoot.position.sub(center);

  const maxDimension = Math.max(size.x, size.y, size.z);
  if (maxDimension > 0.0001) {
    const targetDimension = 2.35;
    const scale = targetDimension / maxDimension;
    modelRoot.scale.setScalar(scale);
  }

  modelRoot.updateMatrixWorld(true);
  return new THREE.Box3().setFromObject(modelRoot);
}

function frameCamera(camera: THREE.PerspectiveCamera, controls: OrbitControls, bounds: THREE.Box3) {
  const size = new THREE.Vector3();
  bounds.getSize(size);

  const radius = Math.max(size.length() * 0.45, 0.8);
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const distance = (radius / Math.sin(fov * 0.5)) * 1.2;

  camera.position.set(distance * 0.82, distance * 0.52, distance * 0.98);
  camera.near = 0.01;
  camera.far = Math.max(distance * 40, 40);
  camera.updateProjectionMatrix();

  controls.target.set(0, 0, 0);
  controls.minDistance = 0.4;
  controls.maxDistance = 4;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = Math.PI - 0.08;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.9;
  controls.update();
}

type ViewerRuntime = {
  modelRoot: THREE.Object3D | null;
  renderer: THREE.WebGLRenderer;
  replacedMaterials: Set<THREE.Material>;
  materialCache: Map<string, THREE.Material>;
  managedPreviewTextures: Set<THREE.Texture>;
};

async function applyMaterialSelection(
  runtime: ViewerRuntime,
  materialId: string | undefined,
  textureCandidates: string[],
  shouldCancel: () => boolean,
) {
  if (!runtime.modelRoot) {
    return;
  }

  const isAlcantara = materialId?.toLowerCase().includes("alcantara") ?? false;
  const seatMaterialType = isAlcantara ? "ALCANTARA" : "LEATHER";
  const materialTextureCandidates = isAlcantara
    ? [ALCANTARA_TEXTURE_PATH, ...textureCandidates]
    : textureCandidates;
  const previewTexture = await loadFirstAvailableSeatTexture(
    runtime.renderer,
    materialTextureCandidates,
  );

  if (!previewTexture) {
    return;
  }

  if (shouldCancel()) {
    previewTexture.dispose();
    return;
  }

  const maxAnisotropy = runtime.renderer.capabilities.getMaxAnisotropy();
  changeSeatMaterial(seatMaterialType, previewTexture, isAlcantara ? maxAnisotropy : undefined);
  const staleManagedTextures = Array.from(runtime.managedPreviewTextures).filter(
    (managedTexture) => managedTexture !== previewTexture,
  );
  staleManagedTextures.forEach((managedTexture) => {
    runtime.managedPreviewTextures.delete(managedTexture);
  });
  runtime.managedPreviewTextures.add(previewTexture);
  debugMaterialLog(
    `applied material ${materialId ?? "default"} with texture ${previewTexture.uuid}`,
  );
}

export default function CarInteriorViewer({
  materialName,
  textureCandidates,
  modelPath,
  modelFolderPath,
  modelMtlPath,
  materialId,
}: CarInteriorViewerProps) {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const runtimeRef = useRef<ViewerRuntime | null>(null);
  const materialRequestRef = useRef(0);
  const environmentSwitcherRef = useRef<((name: HDREnvironmentName) => Promise<void>) | null>(null);
  const environmentRequestRef = useRef(0);
  const [currentEnvironment, setCurrentEnvironment] = useState<HDREnvironmentName>("studio_small_09.hdr");
  const latestEnvironmentRef = useRef<HDREnvironmentName>(currentEnvironment);
  const latestMaterialIdRef = useRef<string | undefined>(materialId);
  const latestTextureCandidatesRef = useRef<string[]>(textureCandidates);
  const [phase, setPhase] = useState<ViewerPhase>("loading");
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    latestMaterialIdRef.current = materialId;
    latestTextureCandidatesRef.current = textureCandidates;
  }, [materialId, textureCandidates]);

  useEffect(() => {
    latestEnvironmentRef.current = currentEnvironment;
  }, [currentEnvironment]);

  useEffect(() => {
    const viewerWindow = window as Window & {
      switchCarInteriorEnvironment?: (name: HDREnvironmentName) => void;
    };

    viewerWindow.switchCarInteriorEnvironment = (name: HDREnvironmentName) => {
      setCurrentEnvironment(name);
    };

    return () => {
      delete viewerWindow.switchCarInteriorEnvironment;
    };
  }, []);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;

    if (!canvasContainer) {
      return;
    }

    setPhase("loading");
    setErrorText(null);

    let isCancelled = false;
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | undefined;

    const replacedMaterials = new Set<THREE.Material>();
    const materialCache = new Map<string, THREE.Material>();
    const managedPreviewTextures = new Set<THREE.Texture>();
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvasContainer.clientWidth / Math.max(canvasContainer.clientHeight, 1),
      0.01,
      200,
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    (renderer as THREE.WebGLRenderer & { physicallyCorrectLights?: boolean }).physicallyCorrectLights = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasContainer.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const hdrEnvironmentCache = new Map<HDREnvironmentName, LoadedHDREnvironment>();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 10, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 40;
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(-3, 4, 5);
    scene.add(rimLight);

    const loadingManager = new THREE.LoadingManager();
    loadingManager.setURLModifier((url: string) => encodeAssetUrl(url));

    const gltfLoader = new GLTFLoader(loadingManager);
    const dracoLoader = new DRACOLoader(loadingManager);
    const fbxLoader = new FBXLoader(loadingManager);
    const objLoader = new OBJLoader(loadingManager);
    const mtlLoader = new MTLLoader(loadingManager);
    const rgbeLoader = new RGBELoader(loadingManager).setPath("/hdr/");

    const runtime: ViewerRuntime = {
      modelRoot: null,
      renderer,
      replacedMaterials,
      materialCache,
      managedPreviewTextures,
    };
    runtimeRef.current = runtime;

    const applyEnvironment = async (nextEnvironment: HDREnvironmentName) => {
      const requestId = ++environmentRequestRef.current;
      const cachedEnvironment = hdrEnvironmentCache.get(nextEnvironment);

      if (cachedEnvironment) {
        if (
          isCancelled ||
          runtimeRef.current !== runtime ||
          requestId !== environmentRequestRef.current
        ) {
          return;
        }

        scene.environment = cachedEnvironment.environmentTarget.texture;
        scene.background = null;
        debugMaterialLog(`HDR cache hit for ${nextEnvironment}`);
        return;
      }

      try {
        const loadedEnvironment = await loadHDR(nextEnvironment, rgbeLoader, pmremGenerator);
        if (
          isCancelled ||
          runtimeRef.current !== runtime ||
          requestId !== environmentRequestRef.current
        ) {
          loadedEnvironment.environmentTarget.dispose();
          return;
        }

        hdrEnvironmentCache.set(nextEnvironment, loadedEnvironment);
        scene.environment = loadedEnvironment.environmentTarget.texture;
        scene.background = null;
        debugMaterialLog(`loaded HDR environment ${nextEnvironment}`);
      } catch (error) {
        if (
          isCancelled ||
          runtimeRef.current !== runtime ||
          requestId !== environmentRequestRef.current
        ) {
          return;
        }

        console.error(
          `[car-interior-viewer] Failed to load HDR environment "${nextEnvironment}"`,
          error,
        );
      }
    };
    environmentSwitcherRef.current = applyEnvironment;

    dracoLoader.setDecoderPath("/draco/gltf/");
    gltfLoader.setDRACOLoader(dracoLoader);

    const runAnimation = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(runAnimation);
    };

    const setRendererSize = () => {
      const width = canvasContainer.clientWidth;
      const height = Math.max(canvasContainer.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    async function loadSeatModel() {
      const extension = getModelExtension(modelPath);

      switch (extension) {
        case ".glb":
        case ".gltf":
          return loadGltfScene(gltfLoader, modelPath);
        case ".fbx":
          return loadFbxScene(fbxLoader, modelPath);
        case ".obj": {
          const mtlCandidates = buildObjMtlCandidates(modelPath, modelFolderPath, modelMtlPath);

          for (const mtlCandidate of mtlCandidates) {
            try {
              const materials = await loadMtl(mtlLoader, mtlCandidate);
              materials.preload();
              objLoader.setMaterials(materials);
              break;
            } catch {
              // Keep trying MTL candidates. OBJ can still load without MTL.
            }
          }

          return loadObjScene(objLoader, modelPath);
        }
        default:
          throw new Error(`Unsupported model extension for ${modelPath}`);
      }
    }

    async function initializeViewer() {
      try {
        await applyEnvironment(latestEnvironmentRef.current);
        if (isCancelled || runtimeRef.current !== runtime) {
          return;
        }

        const modelRoot = await loadSeatModel();
        if (isCancelled) {
          return;
        }

        clearMeshRegistry();
        modelRoot.traverse((node: THREE.Object3D) => {
          if (!(node instanceof THREE.Mesh)) {
            return;
          }

          node.castShadow = true;
          node.receiveShadow = true;
          registerMesh(node);
        });
        runtime.modelRoot = modelRoot;

        const requestId = ++materialRequestRef.current;
        await applyMaterialSelection(
          runtime,
          latestMaterialIdRef.current,
          latestTextureCandidatesRef.current,
          () => {
            return (
              isCancelled ||
              runtimeRef.current !== runtime ||
              requestId !== materialRequestRef.current
            );
          },
        );
        if (isCancelled || runtimeRef.current !== runtime) {
          return;
        }

        const framedBounds = centerAndScaleModel(modelRoot);
        scene.add(modelRoot);
        frameCamera(camera, controls, framedBounds);

        setPhase("ready");
        runAnimation();
      } catch (error) {
        if (isCancelled) {
          return;
        }

        const reason = error instanceof Error ? error.message : "Unknown error";
        setPhase("error");
        setErrorText(`Unable to load the seat model from ${modelPath}. ${reason}`);
      }
    }

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(setRendererSize);
      resizeObserver.observe(canvasContainer);
    } else {
      window.addEventListener("resize", setRendererSize);
    }

    let autoRotateResumeTimer: number | undefined;
    const handleControlStart = () => {
      controls.autoRotate = false;
      if (typeof autoRotateResumeTimer !== "undefined") {
        window.clearTimeout(autoRotateResumeTimer);
        autoRotateResumeTimer = undefined;
      }
    };
    const handleControlEnd = () => {
      if (typeof autoRotateResumeTimer !== "undefined") {
        window.clearTimeout(autoRotateResumeTimer);
      }
      autoRotateResumeTimer = window.setTimeout(() => {
        if (!isCancelled) {
          controls.autoRotate = true;
        }
      }, 2200);
    };

    controls.addEventListener("start", handleControlStart);
    controls.addEventListener("end", handleControlEnd);

    initializeViewer();

    return () => {
      isCancelled = true;
      materialRequestRef.current += 1;
      environmentRequestRef.current += 1;
      environmentSwitcherRef.current = null;
      if (runtimeRef.current === runtime) {
        runtimeRef.current = null;
      }
      window.cancelAnimationFrame(animationFrame);
      controls.removeEventListener("start", handleControlStart);
      controls.removeEventListener("end", handleControlEnd);
      if (typeof autoRotateResumeTimer !== "undefined") {
        window.clearTimeout(autoRotateResumeTimer);
      }
      controls.dispose();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", setRendererSize);
      dracoLoader.dispose();
      clearMeshRegistry();
      scene.environment = null;
      scene.background = null;

      hdrEnvironmentCache.forEach((loadedEnvironment) => {
        loadedEnvironment.environmentTarget.dispose();
      });
      hdrEnvironmentCache.clear();
      pmremGenerator.dispose();

      const disposedGeometries = new Set<THREE.BufferGeometry>();
      const disposedMaterials = new Set<THREE.Material>();
      const disposedTextures = new Set<THREE.Texture>();

      scene.traverse((node: THREE.Object3D) => {
        if (!(node instanceof THREE.Mesh)) {
          return;
        }

        if (!disposedGeometries.has(node.geometry)) {
          disposedGeometries.add(node.geometry);
          node.geometry.dispose();
        }

        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((material: THREE.Material) => {
          if (disposedMaterials.has(material)) {
            return;
          }

          disposedMaterials.add(material);
          disposeMaterialWithTextures(material, disposedTextures);
        });
      });

      replacedMaterials.forEach((material) => {
        if (disposedMaterials.has(material)) {
          return;
        }

        disposedMaterials.add(material);
        disposeMaterialWithTextures(material, disposedTextures);
      });

      materialCache.forEach((material) => {
        if (disposedMaterials.has(material)) {
          return;
        }

        disposedMaterials.add(material);
        material.dispose();
      });
      materialCache.clear();

      managedPreviewTextures.forEach((texture) => {
        if (disposedTextures.has(texture)) {
          return;
        }

        disposedTextures.add(texture);
        texture.dispose();
      });
      managedPreviewTextures.clear();

      renderer.dispose();
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, [modelFolderPath, modelMtlPath, modelPath]);

  useEffect(() => {
    const switchEnvironment = environmentSwitcherRef.current;
    if (!switchEnvironment) {
      return;
    }

    void switchEnvironment(currentEnvironment);
  }, [currentEnvironment]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime?.modelRoot) {
      return;
    }

    let isDisposed = false;
    const requestId = ++materialRequestRef.current;

    void applyMaterialSelection(runtime, materialId, textureCandidates, () => {
      return (
        isDisposed ||
        runtimeRef.current !== runtime ||
        requestId !== materialRequestRef.current
      );
    });

    return () => {
      isDisposed = true;
    };
  }, [materialId, textureCandidates]);

  return (
    <div className="relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-2xl border border-divider/70 bg-[radial-gradient(circle_at_16%_20%,rgba(74,86,110,0.26),transparent_40%),radial-gradient(circle_at_78%_82%,rgba(176,148,106,0.12),transparent_44%),linear-gradient(160deg,#06090f_0%,#090f16_44%,#0a1017_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.09),transparent_36%),radial-gradient(circle_at_80%_78%,rgba(198,168,107,0.08),transparent_44%)]"
      />
      <div ref={canvasContainerRef} className="absolute inset-0" />

      {phase === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-base/75 text-sm text-text-secondary">
          Loading 3D preview for {materialName}...
        </div>
      )}

      {phase === "error" && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-text-secondary">
          {errorText}
        </div>
      )}
    </div>
  );
}
