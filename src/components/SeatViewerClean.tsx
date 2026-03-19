"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { cn } from "@/lib/utils";

THREE.Cache.enabled = true;

type SeatViewerCleanProps = {
  className?: string;
  modelUrl?: string;
  envUrl?: string;
  height?: number | string;
};

type OuterUpholsteryMaterialMode = "final" | "debug";

type SeatMaterialInventoryEntry = {
  meshName: string;
  materialIndex: number;
  materialName: string;
  hasMap: boolean;
  isMaterialArray: boolean;
  targetOuterUpholstery: boolean;
  targetReason: string;
};

type OuterUpholsteryTarget = {
  mesh: THREE.Mesh;
  meshName: string;
  materialIndex: number;
  sourceMaterial: THREE.Material;
  sourceMaterialName: string;
  hasMap: boolean;
  reason: string;
  activeReplacement: THREE.MeshPhysicalMaterial | null;
};

type BrownLeatherTextures = {
  colorMap: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
};

declare global {
  interface Window {
    __seatViewerDebug?: {
      inspectMaterialInventory: () => SeatMaterialInventoryEntry[];
      listOuterUpholsteryTargets: () => Array<{
        meshName: string;
        materialIndex: number;
        materialName: string;
        hasMap: boolean;
        reason: string;
      }>;
      highlightOuterUpholstery: (enabled?: boolean) => void;
    };
  }
}

const DEFAULT_BACKGROUND = "#0e0e11";
const DEFAULT_MODEL_URL = "/seat-optimized.glb";
const HDR_ENV_MAP_URL = "/hdr/luxury-studio.hdr";
const MAX_TEXTURE_ANISOTROPY = 8;
const HIDDEN_ARTIFACT_NAME_PARTS = ["stitch", "thread", "seam", "curve", "line"] as const;
const BROWN_LEATHER_COLOR_URL = "/seat-assets/leather/Leather033C_1K-JPG_Color.jpg";
const BROWN_LEATHER_NORMAL_URL = "/seat-assets/leather/Leather033C_1K-JPG_NormalGL.jpg";
const BROWN_LEATHER_ROUGHNESS_URL = "/seat-assets/leather/Leather033C_1K-JPG_Roughness.jpg";
const BROWN_LEATHER_REPEAT = 3;
const BROWN_LEATHER_TONE = {
  r: 0.4,
  g: 0.29,
  b: 0.25,
};
function configureDirectionalLight(light: THREE.DirectionalLight, targetPosition: THREE.Vector3) {
  light.target.position.copy(targetPosition);
}

function resolveCssHeight(height: number | string | undefined) {
  if (typeof height === "number") {
    return `${height}px`;
  }

  return height ?? "720px";
}

function setSeatData(container: HTMLDivElement, key: string, value: number | string) {
  container.setAttribute(`data-seat-${key}`, String(value));
}

function logSeatPerf(
  container: HTMLDivElement,
  stage: string,
  viewerStart: number,
  durationMs?: number,
  extra?: Record<string, number | string>,
) {
  const now = performance.now();
  setSeatData(container, "stage", stage);

  if (durationMs !== undefined) {
    setSeatData(container, `${stage}-ms`, durationMs.toFixed(1));
  }

  console.info("[SeatViewerPerf]", {
    stage,
    sinceNavigationMs: Number(now.toFixed(1)),
    sinceViewerMountMs: Number((now - viewerStart).toFixed(1)),
    durationMs: durationMs === undefined ? undefined : Number(durationMs.toFixed(1)),
    ...extra,
  });
}

function optimizeTexture(texture: THREE.Texture | null | undefined, anisotropy: number) {
  if (!texture) {
    return;
  }

  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
}

function materialHasMap(material: THREE.Material) {
  const textureAwareMaterial = material as THREE.Material & {
    map?: THREE.Texture | null;
  };

  return Boolean(textureAwareMaterial.map);
}

function getOuterUpholsteryTargetReason(mesh: THREE.Mesh, materialIndex: number) {
  if (mesh.name === "NLM Seat" && materialIndex === 5) {
    return 'mesh.name === "NLM Seat" && materialIndex === 5';
  }

  if (mesh.name === "NLM_Seat_6" && materialIndex === 0) {
    return 'active split mesh "NLM_Seat_6" maps to original "NLM Seat" material slot 5';
  }

  return null;
}

function logSeatMaterialInventory(entries: SeatMaterialInventoryEntry[]) {
  console.groupCollapsed("[SeatViewerClean] seat material inventory");
  console.table(entries);
  console.groupEnd();
}

function replaceMeshMaterialSlot(
  mesh: THREE.Mesh,
  materialIndex: number,
  nextMaterial: THREE.Material,
) {
  const nextMaterials = Array.isArray(mesh.material) ? [...mesh.material] : [mesh.material];
  nextMaterials[materialIndex] = nextMaterial;
  mesh.material = nextMaterials.length === 1 ? nextMaterials[0] : nextMaterials;
}

function configureReplacementTexture(
  texture: THREE.Texture,
  anisotropy: number,
  colorSpace: THREE.ColorSpace,
  repeatScale = BROWN_LEATHER_REPEAT,
) {
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatScale, repeatScale);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.flipY = false;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
}

function getTextureImageMetrics(texture: THREE.Texture) {
  const image = texture.image as
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap
    | OffscreenCanvas
    | undefined;

  let width = 0;
  let height = 0;

  if (image instanceof HTMLImageElement) {
    width = image.naturalWidth || image.width;
    height = image.naturalHeight || image.height;
  } else if (image) {
    width = image.width;
    height = image.height;
  }

  if (!image || width <= 0 || height <= 0) {
    return null;
  }

  return {
    image,
    width,
    height,
  };
}

function softenTextureHighFrequencyDetail(texture: THREE.Texture, scale = 0.58) {
  const metrics = getTextureImageMetrics(texture);
  if (!metrics) {
    return false;
  }

  const { image, width, height } = metrics;
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = width;
  sourceCanvas.height = height;

  const sourceContext = sourceCanvas.getContext("2d");
  if (!sourceContext) {
    return false;
  }

  sourceContext.imageSmoothingEnabled = true;
  sourceContext.drawImage(image, 0, 0, width, height);

  const reducedCanvas = document.createElement("canvas");
  reducedCanvas.width = Math.max(32, Math.round(width * scale));
  reducedCanvas.height = Math.max(32, Math.round(height * scale));

  const reducedContext = reducedCanvas.getContext("2d");
  if (!reducedContext) {
    return false;
  }

  reducedContext.imageSmoothingEnabled = true;
  reducedContext.drawImage(sourceCanvas, 0, 0, reducedCanvas.width, reducedCanvas.height);

  sourceContext.clearRect(0, 0, width, height);
  sourceContext.drawImage(reducedCanvas, 0, 0, reducedCanvas.width, reducedCanvas.height, 0, 0, width, height);
  texture.image = sourceCanvas;
  texture.needsUpdate = true;
  return true;
}

function withCanvasTexturePixels(
  texture: THREE.Texture,
  mutate: (data: Uint8ClampedArray) => void,
) {
  const metrics = getTextureImageMetrics(texture);
  if (!metrics) {
    return false;
  }

  const { image, width, height } = metrics;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return false;
  }

  context.drawImage(image, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  mutate(imageData.data);
  context.putImageData(imageData, 0, 0);
  texture.image = canvas;
  texture.needsUpdate = true;
  return true;
}

function softenBrownRoughnessTexture(texture: THREE.Texture) {
  const blurred = softenTextureHighFrequencyDetail(texture, 0.46);
  const processed = withCanvasTexturePixels(texture, (data) => {
    for (let i = 0; i < data.length; i += 4) {
      const originalRoughness = data[i] / 255;
      const softenedRoughness = 0.955 + (originalRoughness - 0.5) * 0.025;
      const roughnessByte = Math.round(
        THREE.MathUtils.clamp(softenedRoughness, 0.94, 0.975) * 255,
      );

      data[i] = roughnessByte;
      data[i + 1] = roughnessByte;
      data[i + 2] = roughnessByte;
    }
  });

  return blurred || processed;
}

function softenBrownColorTexture(texture: THREE.Texture) {
  const blurred = softenTextureHighFrequencyDetail(texture, 0.42);
  const processed = withCanvasTexturePixels(texture, (data) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const desaturatedR = THREE.MathUtils.lerp(luminance, r, 0.32);
      const desaturatedG = THREE.MathUtils.lerp(luminance, g, 0.32);
      const desaturatedB = THREE.MathUtils.lerp(luminance, b, 0.32);
      const refinedR = BROWN_LEATHER_TONE.r + (desaturatedR - BROWN_LEATHER_TONE.r) * 0.24;
      const refinedG = BROWN_LEATHER_TONE.g + (desaturatedG - BROWN_LEATHER_TONE.g) * 0.24;
      const refinedB = BROWN_LEATHER_TONE.b + (desaturatedB - BROWN_LEATHER_TONE.b) * 0.26;
      const softenedR = refinedR * 0.98;
      const softenedG = refinedG;
      const softenedB = refinedB * 1.01;

      data[i] = Math.round(THREE.MathUtils.clamp(softenedR, 0, 1) * 255);
      data[i + 1] = Math.round(THREE.MathUtils.clamp(softenedG, 0, 1) * 255);
      data[i + 2] = Math.round(THREE.MathUtils.clamp(softenedB, 0, 1) * 255);
    }
  });

  return blurred || processed;
}

function softenBrownNormalTexture(texture: THREE.Texture) {
  const blurred = softenTextureHighFrequencyDetail(texture, 0.42);
  const processed = withCanvasTexturePixels(texture, (data) => {
    for (let i = 0; i < data.length; i += 4) {
      const x = data[i] / 255;
      const y = data[i + 1] / 255;
      const z = data[i + 2] / 255;
      const softenedX = 0.5 + (x - 0.5) * 0.32;
      const softenedY = 0.5 + (y - 0.5) * 0.32;
      const softenedZ = 1 - (1 - z) * 0.24;

      data[i] = Math.round(THREE.MathUtils.clamp(softenedX, 0, 1) * 255);
      data[i + 1] = Math.round(THREE.MathUtils.clamp(softenedY, 0, 1) * 255);
      data[i + 2] = Math.round(THREE.MathUtils.clamp(softenedZ, 0, 1) * 255);
    }
  });

  return blurred || processed;
}

function loadLoggedReplacementTexture(
  textureLoader: THREE.TextureLoader,
  textureUrl: string,
  label: "map" | "normalMap" | "roughnessMap",
  anisotropy: number,
  colorSpace: THREE.ColorSpace,
  postProcess?: (texture: THREE.Texture) => boolean,
) {
  const texture = textureLoader.load(
    textureUrl,
    (loadedTexture) => {
      const processed = postProcess?.(loadedTexture);
      configureReplacementTexture(loadedTexture, anisotropy, colorSpace);
      console.info("[SeatViewerClean] brown leather texture loaded", {
        label,
        url: textureUrl,
        processed: Boolean(processed),
      });
    },
    undefined,
    (error) => {
      console.error("[SeatViewerClean] brown leather texture failed", {
        label,
        url: textureUrl,
        error,
      });
    },
  );

  configureReplacementTexture(texture, anisotropy, colorSpace);
  return texture;
}

function createBrownLeatherTextures(
  textureLoader: THREE.TextureLoader,
  anisotropy: number,
): BrownLeatherTextures {
  return {
    colorMap: loadLoggedReplacementTexture(
      textureLoader,
      BROWN_LEATHER_COLOR_URL,
      "map",
      anisotropy,
      THREE.SRGBColorSpace,
      softenBrownColorTexture,
    ),
    normalMap: loadLoggedReplacementTexture(
      textureLoader,
      BROWN_LEATHER_NORMAL_URL,
      "normalMap",
      anisotropy,
      THREE.NoColorSpace,
      softenBrownNormalTexture,
    ),
    roughnessMap: loadLoggedReplacementTexture(
      textureLoader,
      BROWN_LEATHER_ROUGHNESS_URL,
      "roughnessMap",
      anisotropy,
      THREE.NoColorSpace,
      softenBrownRoughnessTexture,
    ),
  };
}

function disposeBrownLeatherTextures(textures: BrownLeatherTextures) {
  textures.colorMap.dispose();
  textures.normalMap.dispose();
  textures.roughnessMap.dispose();
}

function createBrownLeatherOuterUpholsteryMaterial(
  sourceMaterialName: string,
  textures: BrownLeatherTextures,
) {
  const mat = new THREE.MeshPhysicalMaterial({
    name: `${sourceMaterialName || "outer_upholstery"}__brown_leather`,
    color: new THREE.Color("#704d40"),
    map: textures.colorMap,
    normalMap: textures.normalMap,
    roughnessMap: textures.roughnessMap,
    roughness: 0.98,
    metalness: 0.0,
    specularIntensity: 0.015,
    clearcoat: 0.0,
    sheen: 0.55,
    sheenColor: new THREE.Color("#46352f"),
    sheenRoughness: 0.95,
  });

  mat.normalScale.set(0.07, 0.07);
  mat.envMapIntensity = 0.18;
  mat.clearcoatRoughness = 1.0;
  mat.flatShading = false;
  mat.dithering = true;

  return mat;
}

function createDebugOuterUpholsteryMaterial(sourceMaterialName: string) {
  const mat = new THREE.MeshPhysicalMaterial({
    name: `${sourceMaterialName || "outer_upholstery"}__debug_red`,
    color: new THREE.Color("#ff2b2b"),
    roughness: 0.5,
    metalness: 0.0,
    clearcoat: 0.0,
  });

  mat.envMapIntensity = 0.1;
  return mat;
}

function optimizeImportedMaterial(material: THREE.Material, anisotropy: number) {
  if (
    !(material instanceof THREE.MeshStandardMaterial) &&
    !(material instanceof THREE.MeshPhysicalMaterial)
  ) {
    return material;
  }

  optimizeTexture(material.map, anisotropy);
  optimizeTexture(material.normalMap, anisotropy);
  optimizeTexture(material.roughnessMap, anisotropy);
  optimizeTexture(material.metalnessMap, anisotropy);
  optimizeTexture(material.emissiveMap, anisotropy);
  optimizeTexture(material.alphaMap, anisotropy);
  optimizeTexture(material.bumpMap, anisotropy);

  material.envMapIntensity = Math.max(material.envMapIntensity ?? 0, 0.18);
  material.dithering = true;
  material.needsUpdate = true;
  return material;
}

function collectMaterialTextures(material: THREE.Material, target: Set<THREE.Texture>) {
  const textureAwareMaterial = material as THREE.Material & {
    alphaMap?: THREE.Texture | null;
    aoMap?: THREE.Texture | null;
    bumpMap?: THREE.Texture | null;
    clearcoatMap?: THREE.Texture | null;
    clearcoatNormalMap?: THREE.Texture | null;
    clearcoatRoughnessMap?: THREE.Texture | null;
    emissiveMap?: THREE.Texture | null;
    map?: THREE.Texture | null;
    metalnessMap?: THREE.Texture | null;
    normalMap?: THREE.Texture | null;
    roughnessMap?: THREE.Texture | null;
    sheenColorMap?: THREE.Texture | null;
    sheenRoughnessMap?: THREE.Texture | null;
    specularMap?: THREE.Texture | null;
  };

  [
    textureAwareMaterial.map,
    textureAwareMaterial.normalMap,
    textureAwareMaterial.roughnessMap,
    textureAwareMaterial.metalnessMap,
    textureAwareMaterial.alphaMap,
    textureAwareMaterial.aoMap,
    textureAwareMaterial.emissiveMap,
    textureAwareMaterial.bumpMap,
    textureAwareMaterial.specularMap,
    textureAwareMaterial.clearcoatMap,
    textureAwareMaterial.clearcoatNormalMap,
    textureAwareMaterial.clearcoatRoughnessMap,
    textureAwareMaterial.sheenColorMap,
    textureAwareMaterial.sheenRoughnessMap,
  ].forEach((texture) => {
    if (texture) {
      target.add(texture);
    }
  });
}

function shouldHideArtifactMesh(mesh: THREE.Mesh) {
  const meshName = mesh.name.toLowerCase();
  if (HIDDEN_ARTIFACT_NAME_PARTS.some((part) => meshName.includes(part))) {
    return true;
  }

  const positionAttribute = mesh.geometry.getAttribute("position");
  if (!positionAttribute) {
    return false;
  }

  if (positionAttribute.count <= 24) {
    return true;
  }

  mesh.geometry.computeBoundingBox();
  const boundingBox = mesh.geometry.boundingBox;
  if (!boundingBox) {
    return false;
  }

  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  return size.y <= 0.004 && Math.max(size.x, size.z) >= 0.02 && positionAttribute.count <= 256;
}

function fitCameraToObject(
  object: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  object.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const targetY = size.y * 0.15;
  const distance = maxDim * 2.05;

  controls.target.set(0, targetY, 0);
  camera.position.set(distance * 0.32, targetY + maxDim * 0.22, distance * 0.9);
  camera.near = 0.01;
  camera.far = Math.max(100, distance * 10);
  camera.updateProjectionMatrix();
  camera.lookAt(controls.target);

  controls.minDistance = maxDim * 0.95;
  controls.maxDistance = maxDim * 4.2;
  controls.update();
}

export default function SeatViewerClean({
  className,
  modelUrl = DEFAULT_MODEL_URL,
  height = 720,
}: SeatViewerCleanProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isSeatVisible, setIsSeatVisible] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const containerEl = container;

    startTransition(() => setIsSeatVisible(false));

    const viewerStart = performance.now();
    setSeatData(containerEl, "status", "booting");
    setSeatData(containerEl, "viewer-mount-ms", viewerStart.toFixed(1));
    setSeatData(containerEl, "external-texture-load-ms", "0.0");
    setSeatData(containerEl, "outer-upholstery-assignment-original-mesh", "NLM Seat");
    setSeatData(containerEl, "outer-upholstery-assignment-original-slot", 5);
    logSeatPerf(containerEl, "viewer-mounted", viewerStart);
    logSeatPerf(containerEl, "external-textures-request-start", viewerStart, 0, {
      externalTextureRequests: 3,
    });

    let disposed = false;
    let frameId = 0;
    let seatRoot: THREE.Object3D | null = null;
    let envRT: THREE.WebGLRenderTarget | null = null;
    let pmrem: THREE.PMREMGenerator | null = null;
    let hasLoggedFirstFrame = false;
    let envRequested = false;
    const materialInventory: SeatMaterialInventoryEntry[] = [];
    const outerUpholsteryTargets: OuterUpholsteryTarget[] = [];
    const debugOuterUpholstery =
      new URLSearchParams(window.location.search).get("debugOuterUpholstery") === "1";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(DEFAULT_BACKGROUND);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
    camera.position.set(0, 0.95, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(
      Math.max(container.clientWidth, 1),
      Math.max(container.clientHeight, 1),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 1.8;
    controls.maxDistance = 6.5;
    controls.target.set(0, 0.9, 0);
    controls.update();

    const ambientLift = new THREE.HemisphereLight(0xf0f3f7, 0x121217, 0.82);
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(4.8, 6.1, 5.4);
    configureDirectionalLight(keyLight, new THREE.Vector3(0.08, 0.68, 0.34));

    const fillLight = new THREE.DirectionalLight(0xe7edf5, 1.55);
    fillLight.position.set(-5.1, 3.5, 2.4);
    configureDirectionalLight(fillLight, new THREE.Vector3(-0.12, 0.6, -0.18));

    const rimLight = new THREE.DirectionalLight(0xf5f8ff, 2.35);
    rimLight.position.set(-4.2, 4.1, -5.8);
    configureDirectionalLight(rimLight, new THREE.Vector3(0, 0.82, -0.46));

    scene.add(
      ambientLift,
      keyLight,
      keyLight.target,
      fillLight,
      fillLight.target,
      rimLight,
      rimLight.target,
    );

    const maxAnisotropy = Math.min(
      MAX_TEXTURE_ANISOTROPY,
      renderer.capabilities.getMaxAnisotropy(),
    );
    const brownLeatherTextures = createBrownLeatherTextures(
      new THREE.TextureLoader(),
      maxAnisotropy,
    );
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    function disposeOuterUpholsteryReplacement(target: OuterUpholsteryTarget) {
      if (!target.activeReplacement) {
        return;
      }

      target.activeReplacement.dispose();
      target.activeReplacement = null;
    }

    function restoreOuterUpholsterySourceMaterials() {
      outerUpholsteryTargets.forEach((target) => {
        disposeOuterUpholsteryReplacement(target);
        replaceMeshMaterialSlot(target.mesh, target.materialIndex, target.sourceMaterial);
      });
    }

    function applyOuterUpholsteryMaterialMode(mode: OuterUpholsteryMaterialMode) {
      outerUpholsteryTargets.forEach((target) => {
        disposeOuterUpholsteryReplacement(target);

        const replacement =
          mode === "debug"
            ? createDebugOuterUpholsteryMaterial(target.sourceMaterialName)
            : createBrownLeatherOuterUpholsteryMaterial(
                target.sourceMaterialName,
                brownLeatherTextures,
              );

        target.activeReplacement = replacement;
        replaceMeshMaterialSlot(target.mesh, target.materialIndex, replacement);
        setSeatData(containerEl, "outer-upholstery-assignment-mesh", target.meshName);
        setSeatData(containerEl, "outer-upholstery-assignment-slot", target.materialIndex);
        setSeatData(containerEl, "outer-upholstery-material-name", replacement.name);
        setSeatData(containerEl, "outer-upholstery-map", replacement.map ? "yes" : "no");
        setSeatData(containerEl, "outer-upholstery-normal-map", replacement.normalMap ? "yes" : "no");
        setSeatData(
          containerEl,
          "outer-upholstery-roughness-map",
          replacement.roughnessMap ? "yes" : "no",
        );

        console.info("[SeatViewerClean] outer upholstery replacement assigned", {
          meshName: target.meshName,
          materialIndex: target.materialIndex,
          materialName: replacement.name,
          mode,
          map: Boolean(replacement.map),
          normalMap: Boolean(replacement.normalMap),
          roughnessMap: Boolean(replacement.roughnessMap),
          reason: target.reason,
        });

        if (target.hasMap) {
          console.info("[SeatViewerClean] disabled outer upholstery texture map", {
            meshName: target.meshName,
            materialIndex: target.materialIndex,
            materialName: target.sourceMaterialName,
          });
        }
      });

      setSeatData(containerEl, "outer-upholstery-mode", mode);
      renderer.render(scene, camera);
    }

    function startEnvironmentLoad() {
      if (envRequested || disposed) {
        return;
      }

      envRequested = true;
      setSeatData(containerEl, "status", "enhancing");

      const envStart = performance.now();
      logSeatPerf(containerEl, "environment-request-start", viewerStart);

      pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();

      const applyFallbackEnvironment = (error?: unknown) => {
        const roomEnvironment = new RoomEnvironment();

        try {
          envRT?.dispose();
          envRT = pmrem?.fromScene(roomEnvironment, 0.06) ?? null;
          if (envRT) {
            scene.environment = envRT.texture;
          }

          if (error) {
            console.error("Seat HDR environment load failed, using room fallback:", error);
          }

          logSeatPerf(containerEl, "environment-loaded", viewerStart, performance.now() - envStart, {
            environmentMode: "room-fallback",
          });
        } catch (fallbackError) {
          console.error("Seat environment load failed:", fallbackError);
          logSeatPerf(containerEl, "environment-failed", viewerStart, performance.now() - envStart);
        } finally {
          roomEnvironment.dispose();
          setSeatData(containerEl, "status", "ready");
        }
      };

      new RGBELoader().load(
        HDR_ENV_MAP_URL,
        (hdrTexture) => {
          if (disposed) {
            hdrTexture.dispose();
            return;
          }

          try {
            hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
            envRT?.dispose();
            envRT = pmrem?.fromEquirectangular(hdrTexture) ?? null;
            if (envRT) {
              scene.environment = envRT.texture;
            }

            logSeatPerf(containerEl, "environment-loaded", viewerStart, performance.now() - envStart, {
              environmentMode: "hdr",
            });
          } catch (error) {
            applyFallbackEnvironment(error);
            return;
          } finally {
            hdrTexture.dispose();
          }

          setSeatData(containerEl, "status", "ready");
        },
        undefined,
        (error) => {
          applyFallbackEnvironment(error);
        },
      );
    }

    const modelStart = performance.now();
    setSeatData(containerEl, "status", "loading-model");
    logSeatPerf(containerEl, "model-request-start", viewerStart);

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        if (disposed) {
          return;
        }

        seatRoot = gltf.scene;
        seatRoot.rotation.y = Math.PI * 0.08;

        let visibleMeshCount = 0;
        let hiddenMeshCount = 0;
        let materialSlotCount = 0;

        seatRoot.traverse((obj) => {
          if (!(obj instanceof THREE.Mesh)) {
            return;
          }

          const sourceMaterials = Array.isArray(obj.material) ? obj.material : [obj.material];
          const isMaterialArray = Array.isArray(obj.material);
          const materialScan = sourceMaterials.map((material, materialIndex) => {
            const targetReason = getOuterUpholsteryTargetReason(obj, materialIndex);
            const isTargetOuterUpholstery = targetReason !== null;
            const hasMap = materialHasMap(material);

            materialInventory.push({
              meshName: obj.name || "(unnamed)",
              materialIndex,
              materialName: material.name || "(unnamed)",
              hasMap,
              isMaterialArray,
              targetOuterUpholstery: isTargetOuterUpholstery,
              targetReason: targetReason ?? "not-targeted",
            });

            return {
              material,
              isTargetOuterUpholstery,
              hasMap,
              targetReason,
            };
          });

          if (shouldHideArtifactMesh(obj)) {
            obj.visible = false;
            hiddenMeshCount += 1;
            return;
          }

          obj.visible = true;
          obj.castShadow = false;
          obj.receiveShadow = false;

          const nextMaterials = materialScan.map(
            ({ material, isTargetOuterUpholstery, hasMap, targetReason }, materialIndex) => {
              if (isTargetOuterUpholstery) {
                outerUpholsteryTargets.push({
                  mesh: obj,
                  meshName: obj.name || "(unnamed)",
                  materialIndex,
                  sourceMaterial: material,
                  sourceMaterialName: material.name || "(unnamed)",
                  hasMap,
                  reason: targetReason ?? "targeted",
                  activeReplacement: null,
                });

                console.info("[SeatViewerClean] identified outer upholstery target", {
                  meshName: obj.name || "(unnamed)",
                  materialIndex,
                  materialName: material.name || "(unnamed)",
                  reason: targetReason ?? "targeted",
                });
              }

              return optimizeImportedMaterial(material, maxAnisotropy);
            },
          );

          obj.material = isMaterialArray ? nextMaterials : nextMaterials[0];
          materialSlotCount += nextMaterials.length;
          visibleMeshCount += 1;
        });

        logSeatMaterialInventory(materialInventory);
        console.info(
          "[SeatViewerClean] outer upholstery targets",
          outerUpholsteryTargets.map((target) => ({
            meshName: target.meshName,
            materialIndex: target.materialIndex,
            materialName: target.sourceMaterialName,
            hasMap: target.hasMap,
            reason: target.reason,
          })),
        );

        if (outerUpholsteryTargets.length > 0) {
          applyOuterUpholsteryMaterialMode(debugOuterUpholstery ? "debug" : "final");
        }

        window.__seatViewerDebug = {
          inspectMaterialInventory: () => [...materialInventory],
          listOuterUpholsteryTargets: () => {
            return outerUpholsteryTargets.map((target) => ({
              meshName: target.meshName,
              materialIndex: target.materialIndex,
              materialName: target.sourceMaterialName,
              hasMap: target.hasMap,
              reason: target.reason,
            }));
          },
          highlightOuterUpholstery: (enabled = true) => {
            if (disposed) {
              return;
            }

            applyOuterUpholsteryMaterialMode(enabled ? "debug" : "final");
          },
        };

        console.info(
          "[SeatViewerClean] debug helper",
          "Use ?debugOuterUpholstery=1 or window.__seatViewerDebug.highlightOuterUpholstery(true)",
        );

        scene.add(seatRoot);
        fitCameraToObject(seatRoot, camera, controls);

        setSeatData(containerEl, "visible-mesh-count", visibleMeshCount);
        setSeatData(containerEl, "hidden-mesh-count", hiddenMeshCount);
        setSeatData(containerEl, "material-slot-count", materialSlotCount);
        setSeatData(containerEl, "outer-upholstery-target-count", outerUpholsteryTargets.length);
        logSeatPerf(containerEl, "model-loaded", viewerStart, performance.now() - modelStart, {
          visibleMeshCount,
          hiddenMeshCount,
          materialSlotCount,
          outerUpholsteryTargetCount: outerUpholsteryTargets.length,
        });
      },
      undefined,
      (error) => {
        console.error("Seat model load failed:", error);
        setSeatData(containerEl, "status", "error");
      },
    );

    function onResize() {
      const nextContainer = mountRef.current;
      if (!nextContainer) return;

      const width = Math.max(nextContainer.clientWidth, 1);
      const nextHeight = Math.max(nextContainer.clientHeight, 1);
      camera.aspect = width / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, nextHeight);
    }

    function render() {
      frameId = window.requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);

      if (seatRoot && !hasLoggedFirstFrame) {
        hasLoggedFirstFrame = true;
        logSeatPerf(containerEl, "first-frame", viewerStart, performance.now() - viewerStart);
        startTransition(() => setIsSeatVisible(true));
        window.setTimeout(startEnvironmentLoad, 0);
      }
    }

    onResize();
    render();
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frameId);

      controls.dispose();

      if (seatRoot) {
        restoreOuterUpholsterySourceMaterials();
        scene.remove(seatRoot);
        const assignedMaterials = new Set<THREE.Material>();
        const assignedTextures = new Set<THREE.Texture>();

        seatRoot.traverse((obj) => {
          if (!(obj instanceof THREE.Mesh)) {
            return;
          }

          obj.geometry?.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((material) => {
            assignedMaterials.add(material);
            collectMaterialTextures(material, assignedTextures);
          });
        });

        assignedMaterials.forEach((material) => material.dispose());
        assignedTextures.forEach((texture) => texture.dispose());
      }

      envRT?.dispose();
      pmrem?.dispose();
      disposeBrownLeatherTextures(brownLeatherTextures);
      renderer.dispose();

      if (window.__seatViewerDebug) {
        delete window.__seatViewerDebug;
      }

      if (containerEl.contains(renderer.domElement)) {
        containerEl.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  return (
    <div
      ref={mountRef}
      className={cn("w-full", className)}
      style={{
        position: "relative",
        width: "100%",
        height: resolveCssHeight(height),
        background: DEFAULT_BACKGROUND,
        overflow: "hidden",
      }}
    >
      {!isSeatVisible ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: DEFAULT_BACKGROUND,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "10px",
              justifyItems: "center",
              color: "rgba(232, 236, 242, 0.92)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "999px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "rgba(255, 255, 255, 0.04)",
                display: "grid",
                placeItems: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.84)",
                  boxShadow: "0 0 24px rgba(255, 255, 255, 0.18)",
                }}
              />
            </div>
            <div style={{ fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Loading 3D Seat
            </div>
            <div style={{ fontSize: "12px", color: "rgba(185, 193, 205, 0.74)" }}>
              Fast geometry first, studio finish second.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
