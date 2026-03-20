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

const DEFAULT_BACKGROUND = "radial-gradient(circle at center, #0a0a0a 0%, #000000 70%)";
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
const PREMIUM_CAMERA_FOV = 32;
const PREMIUM_ZOOM_SPEED = 0.22;
const PREMIUM_DAMPING_FACTOR = 0.075;
const PREMIUM_ZOOM_SMOOTHING = 8;
const PREMIUM_WHEEL_DELTA_FACTOR = 0.0018;
const PREMIUM_RETURN_TO_DEFAULT_DELAY_MS = 1500;
const PREMIUM_RETURN_TO_DEFAULT_DURATION_MS = 1500;
const PREMIUM_HERO_DISTANCE_FACTOR = 2.08;
const PREMIUM_TARGET_HEIGHT_FACTOR = 0.06;
const PREMIUM_HERO_FRONT_AZIMUTH = THREE.MathUtils.degToRad(4);
const PREMIUM_CAMERA_HEIGHT_FACTOR = 0.3;
const PREMIUM_MODEL_Y_ROTATION = THREE.MathUtils.degToRad(-12);
const PREMIUM_MIN_DISTANCE_FACTOR = 0.8;
const PREMIUM_MAX_DISTANCE_FACTOR = 3.3;
const STUDIO_KEY_LIGHT_INTENSITY = 0.95;
const STUDIO_FILL_LIGHT_INTENSITY = 0.3;
const STUDIO_RIM_LIGHT_INTENSITY = 0.5;
const STUDIO_KEY_LIGHT_POSITION = new THREE.Vector3(0.42, 2.82, 1.68);
const STUDIO_FILL_LIGHT_POSITION = new THREE.Vector3(-1.62, 1.55, 0.92);
const STUDIO_RIM_LIGHT_POSITION = new THREE.Vector3(-2.4, 2.04, -0.56);
const STUDIO_KEY_LIGHT_TARGET = new THREE.Vector3(0, 0.82, 0.28);
const STUDIO_FILL_LIGHT_TARGET = new THREE.Vector3(0, 0.78, 0.12);
const STUDIO_RIM_LIGHT_TARGET = new THREE.Vector3(0.2, 0.9, 0.14);
const STUDIO_SHADOW_MAP_SIZE = 2048;
const STUDIO_SHADOW_RADIUS = 8;
const STUDIO_SHADOW_BIAS = -0.00018;
const STUDIO_SHADOW_NORMAL_BIAS = 0.02;

function configureDirectionalLight(light: THREE.DirectionalLight, targetPosition: THREE.Vector3) {
  light.target.position.copy(targetPosition);
}

function configureStudioShadowLight(light: THREE.DirectionalLight) {
  light.castShadow = true;
  light.shadow.mapSize.width = STUDIO_SHADOW_MAP_SIZE;
  light.shadow.mapSize.height = STUDIO_SHADOW_MAP_SIZE;
  light.shadow.radius = STUDIO_SHADOW_RADIUS;
  light.shadow.bias = STUDIO_SHADOW_BIAS;
  light.shadow.normalBias = STUDIO_SHADOW_NORMAL_BIAS;
}

function fitShadowToSeat(light: THREE.DirectionalLight, object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);

  const shadowCamera = light.shadow.camera as THREE.OrthographicCamera;
  shadowCamera.left = -Math.max(1.2, size.x * 0.92);
  shadowCamera.right = Math.max(1.2, size.x * 0.92);
  shadowCamera.top = Math.max(1.35, size.y * 1.04);
  shadowCamera.bottom = -Math.max(0.7, size.y * 0.5);
  shadowCamera.near = 0.45;
  shadowCamera.far = Math.max(7, size.z * 7);
  shadowCamera.updateProjectionMatrix();
  light.shadow.needsUpdate = true;
}

function createStudioFloorFadeTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const center = size / 2;
  const radius = size * 0.24;
  const gradient = context.createRadialGradient(center, center, size * 0.04, center, center, radius);
  gradient.addColorStop(0, "rgba(38, 42, 50, 0.6)");
  gradient.addColorStop(0.18, "rgba(32, 35, 41, 0.46)");
  gradient.addColorStop(0.38, "rgba(21, 23, 28, 0.24)");
  gradient.addColorStop(0.56, "rgba(11, 12, 15, 0.09)");
  gradient.addColorStop(0.74, "rgba(4, 4, 5, 0.02)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  context.clearRect(0, 0, size, size);
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function resolveCssHeight(height: number | string | undefined) {
  if (typeof height === "number") {
    return `${height}px`;
  }

  return height ?? "720px";
}

function getShortestAngleDelta(from: number, to: number) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
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

  const materialName = material.name.trim().toLowerCase();
  if (
    materialName === "metal" ||
    materialName.includes("badge") ||
    materialName.includes("emblem") ||
    materialName.includes("logo")
  ) {
    material.roughness = 0.35;
    material.metalness = 0.2;
  }

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
  const targetY = size.y * PREMIUM_TARGET_HEIGHT_FACTOR;
  const horizontalDistance = maxDim * PREMIUM_HERO_DISTANCE_FACTOR;

  controls.target.set(0, targetY, 0);
  camera.position.set(
    horizontalDistance * Math.cos(PREMIUM_HERO_FRONT_AZIMUTH),
    targetY + maxDim * PREMIUM_CAMERA_HEIGHT_FACTOR,
    horizontalDistance * Math.sin(PREMIUM_HERO_FRONT_AZIMUTH),
  );
  camera.near = 0.01;
  camera.far = Math.max(100, horizontalDistance * 10);
  camera.updateProjectionMatrix();
  camera.lookAt(controls.target);

  controls.minDistance = maxDim * PREMIUM_MIN_DISTANCE_FACTOR;
  controls.maxDistance = maxDim * PREMIUM_MAX_DISTANCE_FACTOR;
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
    scene.background = null;
    scene.environmentIntensity = 1.6;

    const camera = new THREE.PerspectiveCamera(PREMIUM_CAMERA_FOV, 1, 0.01, 100);
    camera.position.set(2.4, 1.08, 1.08);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(
      Math.max(container.clientWidth, 1),
      Math.max(container.clientHeight, 1),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = PREMIUM_DAMPING_FACTOR;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.zoomSpeed = PREMIUM_ZOOM_SPEED;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;
    controls.minDistance = 1.8;
    controls.maxDistance = 6.5;
    controls.target.set(0, 0.98, 0);
    controls.update();

    const zoomState = {
      targetDistance: camera.position.distanceTo(controls.target),
    };
    const returnState = {
      defaultAzimuth: controls.getAzimuthalAngle(),
      defaultPolar: controls.getPolarAngle(),
      hasDefaultOrbit: false,
      isUserInteracting: false,
      isAnimating: false,
      animationStartedAt: 0,
      startAzimuth: 0,
      startPolar: 0,
    };
    let resetTimeoutId: number | null = null;
    const zoomClock = new THREE.Clock();
    const zoomOffset = new THREE.Vector3();
    const orbitOffset = new THREE.Vector3();
    const orbitSpherical = new THREE.Spherical();

    function clampZoomDistance(distance: number) {
      return THREE.MathUtils.clamp(distance, controls.minDistance, controls.maxDistance);
    }

    function syncTargetDistanceFromCamera() {
      zoomState.targetDistance = clampZoomDistance(camera.position.distanceTo(controls.target));
    }

    function clearResetTimeout() {
      if (resetTimeoutId === null) {
        return;
      }

      window.clearTimeout(resetTimeoutId);
      resetTimeoutId = null;
    }

    function stopReturnToDefault() {
      returnState.isAnimating = false;
      returnState.animationStartedAt = 0;
    }

    function applyOrbitAngles(azimuth: number, polar: number) {
      const distance = clampZoomDistance(camera.position.distanceTo(controls.target));
      orbitSpherical.set(distance, polar, azimuth);
      orbitOffset.setFromSpherical(orbitSpherical);
      camera.position.copy(controls.target).add(orbitOffset);
      camera.lookAt(controls.target);
    }

    function beginReturnToDefault() {
      if (returnState.isUserInteracting || !returnState.hasDefaultOrbit) {
        return;
      }

      const startAzimuth = controls.getAzimuthalAngle();
      const startPolar = controls.getPolarAngle();
      const azimuthDelta = getShortestAngleDelta(startAzimuth, returnState.defaultAzimuth);
      const polarDelta = returnState.defaultPolar - startPolar;

      if (Math.abs(azimuthDelta) < 0.0001 && Math.abs(polarDelta) < 0.0001) {
        stopReturnToDefault();
        return;
      }

      returnState.isAnimating = true;
      returnState.animationStartedAt = performance.now();
      returnState.startAzimuth = startAzimuth;
      returnState.startPolar = startPolar;
    }

    function scheduleReturnToDefault() {
      clearResetTimeout();
      if (!returnState.hasDefaultOrbit) {
        return;
      }

      resetTimeoutId = window.setTimeout(() => {
        resetTimeoutId = null;
        beginReturnToDefault();
      }, PREMIUM_RETURN_TO_DEFAULT_DELAY_MS);
    }

    function markPassiveInteraction() {
      stopReturnToDefault();
      clearResetTimeout();
      scheduleReturnToDefault();
    }

    function updateReturnToDefault(now: number) {
      if (!returnState.isAnimating || returnState.isUserInteracting || !returnState.hasDefaultOrbit) {
        return;
      }

      const elapsed = now - returnState.animationStartedAt;
      const t = Math.min(elapsed / PREMIUM_RETURN_TO_DEFAULT_DURATION_MS, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const azimuthDelta = getShortestAngleDelta(returnState.startAzimuth, returnState.defaultAzimuth);
      const nextAzimuth = returnState.startAzimuth + azimuthDelta * ease;
      const nextPolar = THREE.MathUtils.lerp(
        returnState.startPolar,
        returnState.defaultPolar,
        ease,
      );

      applyOrbitAngles(nextAzimuth, nextPolar);

      if (t >= 1) {
        stopReturnToDefault();
      }
    }

    function onControlsStart() {
      returnState.isUserInteracting = true;
      stopReturnToDefault();
      clearResetTimeout();
      renderer.domElement.style.cursor = "grabbing";
    }

    function onControlsEnd() {
      returnState.isUserInteracting = false;
      renderer.domElement.style.cursor = "grab";
      scheduleReturnToDefault();
    }

    function captureDefaultOrbit() {
      returnState.defaultAzimuth = controls.getAzimuthalAngle();
      returnState.defaultPolar = controls.getPolarAngle();
      returnState.hasDefaultOrbit = true;
    }

    function onWheelZoom(event: WheelEvent) {
      event.preventDefault();

      const deltaModeScale =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      const delta = THREE.MathUtils.clamp(event.deltaY * deltaModeScale, -240, 240);
      if (delta === 0) {
        return;
      }

      const zoomFactor = Math.exp(delta * controls.zoomSpeed * PREMIUM_WHEEL_DELTA_FACTOR);
      zoomState.targetDistance = clampZoomDistance(zoomState.targetDistance * zoomFactor);
      markPassiveInteraction();
    }

    function updateSmoothZoom(deltaSeconds: number) {
      const currentDistance = zoomOffset.copy(camera.position).sub(controls.target).length();
      if (currentDistance <= 0.0001) {
        return;
      }

      const nextDistance = THREE.MathUtils.damp(
        currentDistance,
        zoomState.targetDistance,
        PREMIUM_ZOOM_SMOOTHING,
        deltaSeconds,
      );
      if (Math.abs(nextDistance - currentDistance) <= 0.0001) {
        return;
      }

      zoomOffset.setLength(nextDistance);
      camera.position.copy(controls.target).add(zoomOffset);
      camera.lookAt(controls.target);
    }

    renderer.domElement.addEventListener("wheel", onWheelZoom, { passive: false });
    controls.addEventListener("start", onControlsStart);
    controls.addEventListener("end", onControlsEnd);

    const keyLight = new THREE.DirectionalLight(0xffffff, STUDIO_KEY_LIGHT_INTENSITY);
    keyLight.position.copy(STUDIO_KEY_LIGHT_POSITION);
    configureDirectionalLight(keyLight, STUDIO_KEY_LIGHT_TARGET);
    configureStudioShadowLight(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, STUDIO_FILL_LIGHT_INTENSITY);
    fillLight.position.copy(STUDIO_FILL_LIGHT_POSITION);
    configureDirectionalLight(fillLight, STUDIO_FILL_LIGHT_TARGET);

    const rimLight = new THREE.DirectionalLight(0xffffff, STUDIO_RIM_LIGHT_INTENSITY);
    rimLight.position.copy(STUDIO_RIM_LIGHT_POSITION);
    configureDirectionalLight(rimLight, STUDIO_RIM_LIGHT_TARGET);

    const floorFadeTexture = createStudioFloorFadeTexture();
    const floorBase = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshBasicMaterial({
        map: floorFadeTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    floorBase.rotation.x = -Math.PI / 2;
    floorBase.position.y = -0.601;

    const floorShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.ShadowMaterial({
        color: 0x000000,
        opacity: 0.2,
        depthWrite: false,
      }),
    );
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.y = -0.599;
    floorShadow.receiveShadow = true;

    const lightSphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x16181c,
        side: THREE.BackSide,
      }),
    );

    scene.add(
      floorBase,
      floorShadow,
      lightSphere,
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
    if (floorFadeTexture) {
      floorFadeTexture.anisotropy = maxAnisotropy;
    }
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
        seatRoot.rotation.y = PREMIUM_MODEL_Y_ROTATION;

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
          obj.castShadow = true;
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
        fitShadowToSeat(keyLight, seatRoot);
        syncTargetDistanceFromCamera();
        captureDefaultOrbit();
        controls.saveState();

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
      const deltaSeconds = Math.min(zoomClock.getDelta(), 0.05);
      controls.update();
      updateReturnToDefault(performance.now());
      updateSmoothZoom(deltaSeconds);
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
      clearResetTimeout();
      renderer.domElement.removeEventListener("wheel", onWheelZoom);
      controls.removeEventListener("start", onControlsStart);
      controls.removeEventListener("end", onControlsEnd);

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
      scene.remove(floorBase);
      floorBase.geometry.dispose();
      (floorBase.material as THREE.Material).dispose();
      scene.remove(floorShadow);
      floorShadow.geometry.dispose();
      (floorShadow.material as THREE.Material).dispose();
      floorFadeTexture?.dispose();
      scene.remove(lightSphere);
      lightSphere.geometry.dispose();
      (lightSphere.material as THREE.Material).dispose();
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
