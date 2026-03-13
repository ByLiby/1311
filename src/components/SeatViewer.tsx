"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import {
  DEFAULT_SEAT_MATERIAL_COLOR_PRESET_ID,
  DEFAULT_SEAT_MATERIAL_PRESET_ID,
  type SeatMaterialColorPresetId,
  type SeatMaterialPresetId,
} from "@/lib/seat-material-presets";
import { cn } from "@/lib/utils";

type SeatMaterialVariant = "leather" | "alcantara" | "perforated";
type PremiumCenterInsertStyle = "light-leather" | "perforated" | "dark-alcantara";

type SeatViewerProps = {
  className?: string;
  materialVariant?: SeatMaterialVariant;
  materialPresetId?: SeatMaterialPresetId;
  colorPresetId?: SeatMaterialColorPresetId;
};

type SeatTextureSet = {
  textures: THREE.Texture[];
};

type SeatSurfaceZone = "center" | "side";
type SeatInteractiveArea = "headrest" | "backrest" | "sideBolster" | "seatCushion";

type SeatMaterialAssignment = {
  material: THREE.MeshStandardMaterial;
  zone: SeatSurfaceZone;
  area: SeatInteractiveArea;
  mesh: THREE.Mesh;
  materialIndex: number;
};

type MeshMaterialSnapshot = {
  mesh: THREE.Mesh;
  materials: THREE.Material[];
};

type MaterialSlot = {
  mesh: THREE.Mesh;
  materialIndex: number;
  material: THREE.Material;
};

type ViewerLightRig = {
  ambient: THREE.AmbientLight;
  key: THREE.DirectionalLight;
  fill: THREE.DirectionalLight;
  rim: THREE.DirectionalLight;
};

const upholsteryMaterialKeywords = [
  "leather",
  "perforated",
  "upholstery",
  "alcantara",
  "vinyl",
  "fabric",
  "cushion",
  "suede",
  "microfiber",
];

const excludedUpholsteryKeywords = [
  "plastic",
  "metal",
  "button",
  "stitch",
  "stiches",
  "frame",
  "trim_hard",
];

const centerSurfaceKeywords = [
  "center",
  "middle",
  "inner",
  "insert",
  "inlay",
  "panel",
  "hex",
  "perforated",
  "perforated_seats",
  "quilt",
  "mittel",
  "innen",
];

const sideSurfaceKeywords = [
  "side",
  "outer",
  "bolster",
  "headrest",
  "head",
  "wing",
  "shell",
  "trim",
  "edge",
  "frame",
  "leather_main",
  "leather_black",
  "black",
  "wange",
  "seiten",
];

const headrestKeywords = ["headrest", "head", "kopf"];
const backrestKeywords = ["backrest", "back", "lehne", "perforated_seats"];
const sideBolsterKeywords = ["side", "bolster", "wing", "wange", "leather_black", "black"];
const seatCushionKeywords = ["seat", "base", "cushion", "bottom", "sitz", "perforated"];
const seatAreaLabelByArea: Record<SeatInteractiveArea, string> = {
  headrest: "Headrest",
  backrest: "Backrest",
  sideBolster: "Side Bolster",
  seatCushion: "Seat Cushion",
};

const defaultTextureByVariant: Record<SeatMaterialVariant, string> = {
  leather: "/materials/hex-leather.jpg",
  alcantara: "/materials/alcantara_black.jpg",
  perforated: "/textures/perforated.png",
};

const BLACK_PU_TEXTURE_URL = "/textures/pu-classic-black.jpg";
const BROWN_PU_TEXTURE_URL = "/textures/pu-classic-brown.jpg";
const WHITE_PU_TEXTURE_URL = "/textures/pu-classic-white.jpg";
const BROWN_LEATHER_TEXTURE_URL = "/materials/brown-leather.png";
const BROWN_LEATHER_NORMAL_URL = "/materials/leder-normal.jpg";
const BROWN_LEATHER_ROUGHNESS_URL = "/materials/hex-leather-roughness.jpg";
const HEX_LEATHER_TEXTURE_URL = "/materials/hex-leather.jpg";
const HEX_LEATHER_NORMAL_URL = "/materials/hex-leather-normal.jpg";
const HEX_LEATHER_ROUGHNESS_URL = "/materials/hex-leather-roughness.jpg";
const ALCANTARA_TEXTURE_URL = "/materials/alcantara_black.jpg";
const PERFORATED_TEXTURE_URL = "/textures/perforated.png";
const PERFORATED_NORMAL_URL = "/textures/perforated_normal.png";
const STITCH_TEXTURE_URL = "/textures/stitches.png";
const SEAT_ROUGHNESS_MAP_URL = "/textures/leather_roughness.png";
const HDR_ENV_MAP_URL = "/hdr/luxury-studio.hdr";
const PREMIUM_CENTER_INSERT_STYLE: PremiumCenterInsertStyle = "dark-alcantara";
const PREMIUM_CAMERA_POSITION = new THREE.Vector3(1.3, 1.0, 2.4);
const PREMIUM_CAMERA_LOOK_AT = new THREE.Vector3(0, 0, 0);
const PREMIUM_CONTROLS_TARGET = new THREE.Vector3(0, 0, 0);
const ENABLE_CENTER_PANEL_UV_WARP = false;

const materialTextureKeys = [
  "map",
  "normalMap",
  "roughnessMap",
  "metalnessMap",
  "aoMap",
  "emissiveMap",
  "alphaMap",
  "bumpMap",
  "specularMap",
] as const;

const availableTextureCache = new Set<string>();
const unavailableTextureCache = new Set<string>();
const SOFT_LIGHTING_PRESET = {
  ambient: 0.98,
  key: 0.74,
  fill: 0.76,
  rim: 0.24,
  exposure: 1.16,
};
const ALCANTARA_BASE_COLOR = 0x2e2a25;
const ALCANTARA_GRAIN_WORLD_SCALE = 95;
const ALCANTARA_GRAIN_STRENGTH = 0.024;
const ALCANTARA_ROUGHNESS_GRAIN_STRENGTH = 0.036;

function getMaterialResponse(variant: SeatMaterialVariant) {
  if (variant === "alcantara") {
    return {
      roughness: 0.95,
      metalness: 0.0,
      envMapIntensity: 0.15,
      normalStrength: 0.0,
      bumpStrength: 0.0,
      textureRepeat: 3,
    };
  }

  if (variant === "perforated") {
    return {
      roughness: 0.64,
      metalness: 0.05,
      envMapIntensity: 0.24,
      normalStrength: 0.28,
      bumpStrength: 0.0,
      textureRepeat: 2,
    };
  }

  return {
    roughness: 0.9,
    metalness: 0.02,
    envMapIntensity: 0.26,
    normalStrength: 0.6,
    bumpStrength: 0.0,
    textureRepeat: 6,
  };
}

function uniq(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values.filter((value): value is string => {
        return Boolean(value && value.trim().length > 0);
      }),
    ),
  );
}

function normalizeTextureUrl(textureUrl: string | null) {
  if (!textureUrl) {
    return null;
  }

  const raw = textureUrl.trim();
  if (!raw || raw.startsWith("data:")) {
    return null;
  }

  if (raw.startsWith("blob:")) {
    return raw;
  }

  try {
    const parsed = new URL(raw, window.location.origin);
    if (parsed.origin === window.location.origin) {
      return `${parsed.pathname}${parsed.search}`;
    }

    return parsed.href;
  } catch {
    return raw;
  }
}

function extractBackgroundImageUrl(backgroundImage: string) {
  const match = backgroundImage.match(/url\((["']?)(.*?)\1\)/i);
  return normalizeTextureUrl(match?.[2] ?? null);
}

function extractImageElementUrl(element: ParentNode) {
  const imageElement = element.querySelector<HTMLImageElement>("img");
  if (!imageElement) {
    return null;
  }

  return normalizeTextureUrl(imageElement.currentSrc || imageElement.src || null);
}

function readSelectedTextureFromUi(root: ParentNode) {
  const activeButtons = root.querySelectorAll<HTMLButtonElement>('button[aria-pressed="true"]');
  for (const button of activeButtons) {
    const swatch = button.querySelector<HTMLElement>('[style*="background-image"]');
    const backgroundImage = swatch
      ? swatch.style.backgroundImage || window.getComputedStyle(swatch).backgroundImage
      : "";
    const selectedTextureUrl =
      extractBackgroundImageUrl(backgroundImage) || extractImageElementUrl(button);
    if (selectedTextureUrl) {
      return selectedTextureUrl;
    }
  }

  return null;
}

function isSeatSurfaceMaterial(mesh: THREE.Mesh, material: THREE.Material) {
  const materialName = material.name.toLowerCase();
  if (excludedUpholsteryKeywords.some((keyword) => materialName.includes(keyword))) {
    return false;
  }

  if (upholsteryMaterialKeywords.some((keyword) => materialName.includes(keyword))) {
    return true;
  }

  const meshName = mesh.name.toLowerCase();
  return (
    meshName.includes("seat") &&
    !excludedUpholsteryKeywords.some((keyword) => materialName.includes(keyword))
  );
}

function replaceMeshMaterialAtIndex(
  mesh: THREE.Mesh,
  materialIndex: number,
  nextMaterial: THREE.Material,
) {
  const currentMaterials = Array.isArray(mesh.material) ? [...mesh.material] : [mesh.material];
  currentMaterials[materialIndex] = nextMaterial;
  mesh.material = currentMaterials.length === 1 ? currentMaterials[0] : currentMaterials;
}

function applySeatMaterialAssignmentsToModel(
  model: THREE.Object3D | null,
  assignments: SeatMaterialAssignment[],
) {
  if (!model || assignments.length === 0) {
    return;
  }

  const assignmentMap = new Map<THREE.Mesh, Map<number, THREE.MeshStandardMaterial>>();
  assignments.forEach(({ mesh, materialIndex, material }) => {
    const mapForMesh = assignmentMap.get(mesh) ?? new Map<number, THREE.MeshStandardMaterial>();
    mapForMesh.set(materialIndex, material);
    assignmentMap.set(mesh, mapForMesh);
  });

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    const materialAssignments = assignmentMap.get(child);
    if (!materialAssignments) {
      return;
    }

    const nextMaterials = Array.isArray(child.material) ? [...child.material] : [child.material];
    materialAssignments.forEach((material, index) => {
      nextMaterials[index] = material;
    });
    child.material = nextMaterials.length === 1 ? nextMaterials[0] : nextMaterials;
  });
}

function captureMeshMaterialSnapshots(model: THREE.Object3D | null) {
  const snapshots: MeshMaterialSnapshot[] = [];
  if (!model) {
    return snapshots;
  }

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    const materials = Array.isArray(child.material) ? [...child.material] : [child.material];
    snapshots.push({ mesh: child, materials });
  });

  return snapshots;
}

function restoreMeshMaterialSnapshots(snapshots: MeshMaterialSnapshot[]) {
  snapshots.forEach(({ mesh, materials }) => {
    mesh.material = materials.length === 1 ? materials[0] : [...materials];
  });
}

function ensureMeshStandardMaterial(material: THREE.Material) {
  if (material instanceof THREE.MeshStandardMaterial) {
    return material;
  }

  const source = material as THREE.Material & {
    color?: THREE.Color;
    roughness?: number;
    metalness?: number;
    transparent?: boolean;
    opacity?: number;
    side?: THREE.Side;
  };

  const standardMaterial = new THREE.MeshStandardMaterial({
    color: source.color instanceof THREE.Color ? source.color.clone() : new THREE.Color(0xffffff),
    roughness: typeof source.roughness === "number" ? source.roughness : 0.78,
    metalness: typeof source.metalness === "number" ? source.metalness : 0.06,
    envMapIntensity: 0.3,
    transparent: Boolean(source.transparent),
    opacity: typeof source.opacity === "number" ? source.opacity : 1,
    side: source.side ?? THREE.FrontSide,
  });
  standardMaterial.name = material.name;
  return standardMaterial;
}

function configureTexture(
  texture: THREE.Texture,
  renderer: THREE.WebGLRenderer,
  colorSpace: THREE.ColorSpace,
  repeatScale = 3,
) {
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatScale, repeatScale);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.flipY = false;
  texture.needsUpdate = true;
}

function loadTexture(
  textureLoader: THREE.TextureLoader,
  textureUrl: string,
  renderer: THREE.WebGLRenderer,
  colorSpace: THREE.ColorSpace,
  repeatScale = 3,
) {
  return new Promise<THREE.Texture>((resolve, reject) => {
    textureLoader.load(
      textureUrl,
      (texture) => {
        configureTexture(texture, renderer, colorSpace, repeatScale);
        resolve(texture);
      },
      undefined,
      reject,
    );
  });
}

async function loadFirstAvailableTexture(
  textureLoader: THREE.TextureLoader,
  textureCandidates: string[],
  renderer: THREE.WebGLRenderer,
  colorSpace: THREE.ColorSpace,
  repeatScale = 3,
) {
  const prioritizedCandidates = [
    ...textureCandidates.filter((candidate) => availableTextureCache.has(candidate)),
    ...textureCandidates.filter((candidate) => !availableTextureCache.has(candidate)),
  ];

  for (const textureCandidate of prioritizedCandidates) {
    if (unavailableTextureCache.has(textureCandidate)) {
      continue;
    }

    try {
      const loadedTexture = await loadTexture(
        textureLoader,
        textureCandidate,
        renderer,
        colorSpace,
        repeatScale,
      );
      availableTextureCache.add(textureCandidate);
      return loadedTexture;
    } catch {
      unavailableTextureCache.add(textureCandidate);
    }
  }

  return null;
}

function buildColorTextureCandidates(selectedTextureUrl: string) {
  return uniq([
    selectedTextureUrl,
    HEX_LEATHER_TEXTURE_URL,
    BLACK_PU_TEXTURE_URL,
  ]);
}

function isBlackPuTexture(textureUrl: string) {
  return textureUrl.split("?")[0] === BLACK_PU_TEXTURE_URL;
}

function isBrownLeatherSelection(textureUrl: string) {
  const normalizedTextureUrl = textureUrl.split("?")[0].toLowerCase();
  return (
    normalizedTextureUrl === BROWN_PU_TEXTURE_URL ||
    normalizedTextureUrl === "/textures/pu-brown.jpg" ||
    normalizedTextureUrl === BROWN_LEATHER_TEXTURE_URL
  );
}

function buildLeatherTextureCandidates(selectedTextureUrl: string) {
  const resolvedPrimaryTexture = isBlackPuTexture(selectedTextureUrl)
    ? HEX_LEATHER_TEXTURE_URL
    : selectedTextureUrl;

  return uniq([
    resolvedPrimaryTexture,
    HEX_LEATHER_TEXTURE_URL,
    selectedTextureUrl,
    BLACK_PU_TEXTURE_URL,
  ]);
}

function buildBrownLeatherTextureCandidates() {
  return uniq([
    BROWN_LEATHER_TEXTURE_URL,
    BROWN_PU_TEXTURE_URL,
    "/textures/pu-brown.jpg",
  ]);
}

function buildBrownBolsterLeatherTextureCandidates() {
  return uniq([BROWN_LEATHER_TEXTURE_URL]);
}

function buildSmoothPuTextureCandidates(selectedTextureUrl: string) {
  const normalizedSelectedTexture = selectedTextureUrl.toLowerCase();
  const preferredPuTexture = normalizedSelectedTexture.includes("brown")
    ? BROWN_PU_TEXTURE_URL
    : normalizedSelectedTexture.includes("white") || normalizedSelectedTexture.includes("cream")
      ? WHITE_PU_TEXTURE_URL
      : BLACK_PU_TEXTURE_URL;

  return uniq([
    preferredPuTexture,
    BLACK_PU_TEXTURE_URL,
    BROWN_PU_TEXTURE_URL,
    WHITE_PU_TEXTURE_URL,
  ]);
}

function buildLeatherNormalCandidates() {
  return uniq([
    HEX_LEATHER_NORMAL_URL,
    "/materials/leder-normal.jpg",
    "/textures/leather_normal.png",
    "/models/car-seat/TEXTURES/leather_normal.png",
  ]);
}

function buildBrownLeatherNormalCandidates() {
  return uniq([
    BROWN_LEATHER_NORMAL_URL,
    HEX_LEATHER_NORMAL_URL,
    "/textures/leather_normal.png",
  ]);
}

function buildLeatherRoughnessCandidates() {
  return uniq([
    HEX_LEATHER_ROUGHNESS_URL,
    SEAT_ROUGHNESS_MAP_URL,
  ]);
}

function buildBrownLeatherRoughnessCandidates() {
  return uniq([
    BROWN_LEATHER_ROUGHNESS_URL,
    HEX_LEATHER_ROUGHNESS_URL,
    SEAT_ROUGHNESS_MAP_URL,
  ]);
}

function buildDarkAlcantaraTextureCandidates() {
  return uniq([
    ALCANTARA_TEXTURE_URL,
    "/textures/alcantara-style.jpg",
    "/textures/alcantara.jpg",
  ]);
}

function buildPerforatedTextureCandidates() {
  return uniq([
    PERFORATED_TEXTURE_URL,
    HEX_LEATHER_TEXTURE_URL,
    BROWN_LEATHER_TEXTURE_URL,
  ]);
}

function buildPerforatedNormalCandidates() {
  return uniq([
    PERFORATED_NORMAL_URL,
    HEX_LEATHER_NORMAL_URL,
    BROWN_LEATHER_NORMAL_URL,
  ]);
}

function buildStitchTextureCandidates() {
  return uniq([STITCH_TEXTURE_URL]);
}

function getPremiumCenterInsertTextureConfig(style: PremiumCenterInsertStyle) {
  if (style === "light-leather") {
    return {
      colorCandidates: buildBrownLeatherTextureCandidates(),
      normalCandidates: buildBrownLeatherNormalCandidates(),
      roughnessCandidates: buildBrownLeatherRoughnessCandidates(),
      repeat: 6,
      color: 0xf2ebe1,
      roughness: 0.65,
      metalness: 0.02,
      envMapIntensity: 0.6,
      normalStrength: 0.8,
    };
  }

  if (style === "perforated") {
    return {
      colorCandidates: buildPerforatedTextureCandidates(),
      normalCandidates: buildPerforatedNormalCandidates(),
      roughnessCandidates: buildLeatherRoughnessCandidates(),
      repeat: 6,
      color: 0xddd5ca,
      roughness: 0.68,
      metalness: 0.02,
      envMapIntensity: 0.58,
      normalStrength: 0.8,
    };
  }

  return {
    colorCandidates: buildDarkAlcantaraTextureCandidates(),
    normalCandidates: [] as string[],
    roughnessCandidates: [SEAT_ROUGHNESS_MAP_URL],
    repeat: 6,
    color: 0xbab0a1,
    roughness: 0.86,
    metalness: 0.01,
    envMapIntensity: 0.16,
    normalStrength: 0.14,
  };
}

function classifySeatSurfaceZone(
  mesh: THREE.Mesh,
  material: THREE.Material,
  seatCenterX: number,
  seatHalfWidth: number,
  slotCenter?: THREE.Vector3,
): SeatSurfaceZone {
  const materialName = material.name.toLowerCase();
  if (materialName.includes("perforated")) {
    return "center";
  }
  if (
    materialName.includes("leather_main") ||
    materialName.includes("leather_black") ||
    materialName === "black"
  ) {
    return "side";
  }

  const signature = `${mesh.name} ${material.name}`.toLowerCase();
  if (centerSurfaceKeywords.some((keyword) => signature.includes(keyword))) {
    return "center";
  }
  if (sideSurfaceKeywords.some((keyword) => signature.includes(keyword))) {
    return "side";
  }

  const meshCenter = slotCenter ?? new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
  const lateralOffset = Math.abs(meshCenter.x - seatCenterX);
  return lateralOffset > seatHalfWidth * 0.24 ? "side" : "center";
}

function normalizeRange(value: number, min: number, max: number) {
  const span = Math.max(max - min, 0.0001);
  return THREE.MathUtils.clamp((value - min) / span, 0, 1);
}

function buildMaterialSlotKey(mesh: THREE.Mesh, materialIndex: number) {
  return `${mesh.uuid}:${materialIndex}`;
}

function collectMaterialSlotBounds(mesh: THREE.Mesh, materialIndex: number) {
  const geometry = mesh.geometry;
  if (!(geometry instanceof THREE.BufferGeometry)) {
    return new THREE.Box3().setFromObject(mesh);
  }

  const position = geometry.getAttribute("position");
  if (!(position instanceof THREE.BufferAttribute)) {
    return new THREE.Box3().setFromObject(mesh);
  }

  const index = geometry.getIndex();
  const groups = geometry.groups.length
    ? geometry.groups.filter((group) => (group.materialIndex ?? 0) === materialIndex)
    : [{ start: 0, count: index ? index.count : position.count, materialIndex: 0 }];

  if (groups.length === 0) {
    return new THREE.Box3().setFromObject(mesh);
  }

  mesh.updateWorldMatrix(true, false);

  const slotBounds = new THREE.Box3();
  const localPoint = new THREE.Vector3();
  const worldPoint = new THREE.Vector3();
  let hasPoint = false;

  groups.forEach((group) => {
    const start = Math.max(group.start, 0);
    const end = Math.min(group.start + group.count, index ? index.count : position.count);

    for (let i = start; i < end; i += 1) {
      const vertexIndex = index ? index.getX(i) : i;
      localPoint.fromBufferAttribute(position, vertexIndex);
      worldPoint.copy(localPoint);
      mesh.localToWorld(worldPoint);
      slotBounds.expandByPoint(worldPoint);
      hasPoint = true;
    }
  });

  return hasPoint ? slotBounds : new THREE.Box3().setFromObject(mesh);
}

function classifySeatInteractiveArea(
  mesh: THREE.Mesh,
  material: THREE.Material,
  slotBounds: THREE.Box3,
  seatBounds: THREE.Box3,
  seatCenterX: number,
  seatHalfWidth: number,
  zone: SeatSurfaceZone,
): SeatInteractiveArea {
  const signature = `${mesh.name} ${material.name}`.toLowerCase();

  if (headrestKeywords.some((keyword) => signature.includes(keyword))) {
    return "headrest";
  }
  if (sideBolsterKeywords.some((keyword) => signature.includes(keyword)) && zone === "side") {
    return "sideBolster";
  }
  if (backrestKeywords.some((keyword) => signature.includes(keyword))) {
    return "backrest";
  }
  if (seatCushionKeywords.some((keyword) => signature.includes(keyword)) && zone === "center") {
    return "seatCushion";
  }

  const slotCenter = slotBounds.getCenter(new THREE.Vector3());
  const yNormalized = normalizeRange(slotCenter.y, seatBounds.min.y, seatBounds.max.y);
  const zNormalized = normalizeRange(slotCenter.z, seatBounds.min.z, seatBounds.max.z);
  const lateralNormalized = Math.abs(slotCenter.x - seatCenterX) / Math.max(seatHalfWidth, 0.0001);

  if (yNormalized > 0.78) {
    return "headrest";
  }
  if (lateralNormalized > 0.56 || zone === "side") {
    return "sideBolster";
  }
  if (yNormalized > 0.46 || zNormalized > 0.62) {
    return "backrest";
  }

  return "seatCushion";
}

function classifySeatAreaFromPoint(point: THREE.Vector3, seatBounds: THREE.Box3): SeatInteractiveArea {
  const center = seatBounds.getCenter(new THREE.Vector3());
  const halfWidth = Math.max((seatBounds.max.x - seatBounds.min.x) * 0.5, 0.0001);
  const yNormalized = normalizeRange(point.y, seatBounds.min.y, seatBounds.max.y);
  const zNormalized = normalizeRange(point.z, seatBounds.min.z, seatBounds.max.z);
  const lateralNormalized = Math.abs(point.x - center.x) / halfWidth;

  if (yNormalized > 0.78) {
    return "headrest";
  }
  if (lateralNormalized > 0.58) {
    return "sideBolster";
  }
  if (yNormalized > 0.45 || zNormalized > 0.62) {
    return "backrest";
  }

  return "seatCushion";
}

function applyCenterPanelUvWarp(
  mesh: THREE.Mesh,
  centerMaterialIndices: Set<number>,
  seatMinY: number,
  seatHeight: number,
) {
  if (!ENABLE_CENTER_PANEL_UV_WARP) {
    return;
  }

  if (centerMaterialIndices.size === 0 || !(mesh.geometry instanceof THREE.BufferGeometry)) {
    return;
  }

  const sourceGeometry = mesh.geometry;
  const sourceUv = sourceGeometry.getAttribute("uv") as THREE.BufferAttribute | undefined;
  const sourcePosition = sourceGeometry.getAttribute("position") as THREE.BufferAttribute | undefined;
  if (!sourceUv || !sourcePosition) {
    return;
  }

  const geometry = sourceGeometry.clone();
  mesh.geometry = geometry;

  const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
  const position = geometry.getAttribute("position") as THREE.BufferAttribute;
  const index = geometry.getIndex();

  const groups = geometry.groups.length
    ? geometry.groups
    : [{ start: 0, count: index ? index.count : position.count, materialIndex: 0 }];

  const affectedVertexIndices = new Set<number>();
  groups.forEach((group) => {
    const materialIndex = group.materialIndex ?? 0;
    if (!centerMaterialIndices.has(materialIndex)) {
      return;
    }

    const start = Math.max(0, group.start);
    const end = Math.min(group.start + group.count, index ? index.count : position.count);
    for (let i = start; i < end; i += 1) {
      const vertexIndex = index ? index.getX(i) : i;
      affectedVertexIndices.add(vertexIndex);
    }
  });

  if (affectedVertexIndices.size === 0) {
    return;
  }

  mesh.updateWorldMatrix(true, false);
  const localPosition = new THREE.Vector3();
  const worldPosition = new THREE.Vector3();
  const safeSeatHeight = Math.max(seatHeight, 0.001);

  affectedVertexIndices.forEach((vertexIndex) => {
    localPosition.fromBufferAttribute(position, vertexIndex);
    worldPosition.copy(localPosition);
    mesh.localToWorld(worldPosition);

    const y = THREE.MathUtils.clamp((worldPosition.y - seatMinY) / safeSeatHeight, 0, 1);
    const topWeight = THREE.MathUtils.smoothstep(y, 0.66, 1);
    const bottomWeight = THREE.MathUtils.smoothstep(1 - y, 0.66, 1);

    const originalU = uv.getX(vertexIndex);
    const originalV = uv.getY(vertexIndex);
    const warpedU = (originalU - 0.5) * (1 - 0.18 * bottomWeight) + 0.5;
    const warpedV = (originalV - 0.5) * (1 - 0.1 * topWeight) + 0.5;

    uv.setXY(vertexIndex, warpedU, warpedV);
  });

  uv.needsUpdate = true;
}
function disposeTextureSet(textures: SeatTextureSet | null | undefined) {
  if (!textures) {
    return;
  }

  const uniqueTextures = new Set(textures.textures);

  uniqueTextures.forEach((texture) => {
    texture.dispose();
  });
}

function isTextureStillUsedBySeatMaterials(
  texture: THREE.Texture,
  assignments: SeatMaterialAssignment[],
) {
  return assignments.some(({ material }) => {
    return material.map === texture || material.normalMap === texture || material.roughnessMap === texture;
  });
}

function disposeModel(root: THREE.Object3D) {
  root.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) {
      return;
    }

    node.geometry.dispose();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach((material) => {
      const textureAwareMaterial = material as THREE.Material &
        Partial<Record<(typeof materialTextureKeys)[number], THREE.Texture | null>>;

      materialTextureKeys.forEach((key) => {
        const texture = textureAwareMaterial[key];
        if (texture) {
          texture.dispose();
        }
      });

      material.dispose();
    });
  });
}

function applySoftLightingPreset(
  renderer: THREE.WebGLRenderer,
  lightRig: ViewerLightRig | null,
) {
  if (!lightRig) {
    return;
  }

  lightRig.ambient.intensity = SOFT_LIGHTING_PRESET.ambient;
  lightRig.key.intensity = SOFT_LIGHTING_PRESET.key;
  lightRig.fill.intensity = SOFT_LIGHTING_PRESET.fill;
  lightRig.rim.intensity = SOFT_LIGHTING_PRESET.rim;
  renderer.toneMappingExposure = SOFT_LIGHTING_PRESET.exposure;
}

function disableAlcantaraWorldGrain(material: THREE.MeshStandardMaterial) {
  if (!material.userData.alcantaraWorldGrain) {
    return;
  }

  material.onBeforeCompile = () => {};
  delete material.userData.alcantaraWorldGrain;
  material.needsUpdate = true;
}

function enableAlcantaraWorldGrain(material: THREE.MeshStandardMaterial) {
  if (material.userData.alcantaraWorldGrain) {
    return;
  }

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vAlcantaraWorldPosition;",
      )
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvAlcantaraWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;",
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
varying vec3 vAlcantaraWorldPosition;

float alcantaraNoise3d(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}`,
      )
      .replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `vec4 diffuseColor = vec4( diffuse, opacity );
float alcantaraNoiseA = alcantaraNoise3d(floor(vAlcantaraWorldPosition * ${ALCANTARA_GRAIN_WORLD_SCALE.toFixed(1)}));
float alcantaraNoiseB = alcantaraNoise3d(floor((vAlcantaraWorldPosition + vec3(21.73)) * ${(
          ALCANTARA_GRAIN_WORLD_SCALE * 1.43
        ).toFixed(1)}));
float alcantaraGrain = (alcantaraNoiseA * 0.68 + alcantaraNoiseB * 0.32) - 0.5;
diffuseColor.rgb += alcantaraGrain * ${ALCANTARA_GRAIN_STRENGTH.toFixed(3)};`,
      )
      .replace(
        "float roughnessFactor = roughness;",
        `float roughnessFactor = roughness;
roughnessFactor = clamp(
  roughnessFactor + alcantaraGrain * ${ALCANTARA_ROUGHNESS_GRAIN_STRENGTH.toFixed(3)},
  0.0,
  1.0
);`,
      );
  };

  material.userData.alcantaraWorldGrain = true;
  material.needsUpdate = true;
}

function applyUnifiedAlcantaraMaterial(material: THREE.MeshStandardMaterial) {
  enableAlcantaraWorldGrain(material);
  material.map = null;
  material.normalMap = null;
  material.roughnessMap = null;
  material.metalnessMap = null;
  material.aoMap = null;
  material.alphaMap = null;
  material.emissiveMap = null;
  material.emissive.setHex(0x000000);
  material.emissiveIntensity = 0;
  material.bumpMap = null;
  material.bumpScale = 0;
  material.normalScale.set(0, 0);
  material.roughness = 0.95;
  material.metalness = 0;
  material.envMapIntensity = 0.15;
  material.color.setHex(ALCANTARA_BASE_COLOR);
  material.needsUpdate = true;
}

export default function SeatViewer({
  className,
  materialVariant = "leather",
  materialPresetId = DEFAULT_SEAT_MATERIAL_PRESET_ID,
  colorPresetId = DEFAULT_SEAT_MATERIAL_COLOR_PRESET_ID,
}: SeatViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lightRigRef = useRef<ViewerLightRig | null>(null);
  const seatRef = useRef<THREE.Object3D | null>(null);
  const seatMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const seatMaterialAssignmentsRef = useRef<SeatMaterialAssignment[]>([]);
  const meshMaterialSnapshotsRef = useRef<MeshMaterialSnapshot[]>([]);
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);
  const activeTexturesRef = useRef<SeatTextureSet | null>(null);
  const areaTextureOverridesRef = useRef<Partial<Record<SeatInteractiveArea, string>>>({});
  const areaTexturesRef = useRef<Partial<Record<SeatInteractiveArea, THREE.Texture>>>({});
  const areaTextureRequestIdRef = useRef(0);
  const seatAreaBySlotKeyRef = useRef<Map<string, SeatInteractiveArea>>(new Map());
  const seatBoundsRef = useRef<THREE.Box3 | null>(null);
  const selectedSeatAreaRef = useRef<SeatInteractiveArea | null>(null);
  const textureRequestIdRef = useRef(0);
  const selectedTextureRef = useRef(defaultTextureByVariant[materialVariant]);
  const materialVariantRef = useRef<SeatMaterialVariant>(materialVariant);
  const materialPresetRef = useRef<SeatMaterialPresetId>(materialPresetId);
  const colorPresetRef = useRef<SeatMaterialColorPresetId>(colorPresetId);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedTextureUrl, setSelectedTextureUrl] = useState(defaultTextureByVariant[materialVariant]);
  const [selectedSeatArea, setSelectedSeatArea] = useState<SeatInteractiveArea | null>(null);

  useEffect(() => {
    selectedTextureRef.current = selectedTextureUrl;
  }, [selectedTextureUrl]);

  useEffect(() => {
    materialVariantRef.current = materialVariant;
  }, [materialVariant]);

  useEffect(() => {
    materialPresetRef.current = materialPresetId;
  }, [materialPresetId]);

  useEffect(() => {
    colorPresetRef.current = colorPresetId;
  }, [colorPresetId]);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return;
    }

    if (materialVariant === "alcantara") {
      const fallbackTexture = defaultTextureByVariant.alcantara;
      setSelectedTextureUrl((currentTexture) => {
        return currentTexture === fallbackTexture ? currentTexture : fallbackTexture;
      });
      return;
    }

    const selectionScope =
      (mountNode.closest(".space-y-6") as HTMLElement | null) ??
      mountNode.parentElement ??
      document.body;

    const syncSelectedTexture = () => {
      const fromUi = readSelectedTextureFromUi(selectionScope);
      const fallbackTexture = defaultTextureByVariant[materialVariant];
      const nextTexture = fromUi ?? fallbackTexture;
      setSelectedTextureUrl((currentTexture) => {
        return currentTexture === nextTexture ? currentTexture : nextTexture;
      });
    };

    syncSelectedTexture();

    const observer = new MutationObserver(() => {
      syncSelectedTexture();
    });
    observer.observe(selectionScope, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["aria-pressed", "style"],
    });

    const handleClick = () => {
      window.requestAnimationFrame(syncSelectedTexture);
    };
    selectionScope.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      selectionScope.removeEventListener("click", handleClick);
    };
  }, [materialVariant]);

  const applyTextureToSeatArea = useCallback(
    async (area: SeatInteractiveArea, nextTextureUrl: string) => {
      const renderer = rendererRef.current;
      const seatMaterialAssignments = seatMaterialAssignmentsRef.current;
      if (!renderer || seatMaterialAssignments.length === 0) {
        return;
      }

      const assignmentsForArea = seatMaterialAssignments;
      if (assignmentsForArea.length === 0) {
        return;
      }

      const textureLoader = textureLoaderRef.current ?? new THREE.TextureLoader();
      textureLoaderRef.current = textureLoader;

      const variant = materialVariantRef.current;
      if (variant === "alcantara") {
        const previousTexture = areaTexturesRef.current[area];
        areaTexturesRef.current[area] = undefined;
        areaTextureOverridesRef.current[area] = nextTextureUrl;

        assignmentsForArea.forEach(({ material }) => {
          applyUnifiedAlcantaraMaterial(material);
        });
        applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignmentsRef.current);

        if (
          previousTexture &&
          !isTextureStillUsedBySeatMaterials(previousTexture, seatMaterialAssignmentsRef.current)
        ) {
          previousTexture.dispose();
        }
        return;
      }

      const repeatScale = 6;
      const textureCandidates =
        variant === "leather"
          ? buildSmoothPuTextureCandidates(nextTextureUrl)
          : buildColorTextureCandidates(nextTextureUrl);

      const requestId = ++areaTextureRequestIdRef.current;
      const nextTexture = await loadFirstAvailableTexture(
        textureLoader,
        textureCandidates,
        renderer,
        THREE.SRGBColorSpace,
        repeatScale,
      );
      if (!nextTexture) {
        return;
      }

      if (requestId !== areaTextureRequestIdRef.current) {
        nextTexture.dispose();
        return;
      }

      const previousTexture = areaTexturesRef.current[area];
      areaTexturesRef.current[area] = nextTexture;
      areaTextureOverridesRef.current[area] = nextTextureUrl;

      assignmentsForArea.forEach(({ material }) => {
        disableAlcantaraWorldGrain(material);
        material.map = nextTexture;
        material.color.setHex(0xffffff);
        material.needsUpdate = true;
      });
      applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignmentsRef.current);

      if (
        previousTexture &&
        previousTexture !== nextTexture &&
        !isTextureStillUsedBySeatMaterials(previousTexture, seatMaterialAssignmentsRef.current)
      ) {
        previousTexture.dispose();
      }
    },
    [],
  );

  const applySelectedMaterialTextures = useCallback(
    async (nextTextureUrl: string) => {
      const renderer = rendererRef.current;
      const seatMaterials = seatMaterialsRef.current;
      const seatMaterialAssignments = seatMaterialAssignmentsRef.current;
      if (!renderer || seatMaterials.length === 0 || seatMaterialAssignments.length === 0) {
        return;
      }

      const textureLoader = textureLoaderRef.current ?? new THREE.TextureLoader();
      textureLoaderRef.current = textureLoader;
      const variant = materialVariantRef.current;
      const isAlcantara = variant === "alcantara";
      const isLeather = variant === "leather";
      const materialResponse = getMaterialResponse(variant);
      const lightRig = lightRigRef.current;

      if (!isAlcantara) {
        restoreMeshMaterialSnapshots(meshMaterialSnapshotsRef.current);
      }

      const requestId = ++textureRequestIdRef.current;
      if (isLeather) {
        const useBrownLeatherConfig = isBrownLeatherSelection(nextTextureUrl);
        if (useBrownLeatherConfig) {
          const centerInsertConfig = getPremiumCenterInsertTextureConfig(PREMIUM_CENTER_INSERT_STYLE);
          const sideRepeat = 6;
          const [
            centerColorTexture,
            centerNormalTexture,
            centerRoughnessTexture,
            sideColorTexture,
            sideNormalTexture,
            sideRoughnessTexture,
            stitchTexture,
          ] = await Promise.all([
            loadFirstAvailableTexture(
              textureLoader,
              centerInsertConfig.colorCandidates,
              renderer,
              THREE.SRGBColorSpace,
              centerInsertConfig.repeat,
            ),
            loadFirstAvailableTexture(
              textureLoader,
              centerInsertConfig.normalCandidates,
              renderer,
              THREE.NoColorSpace,
              centerInsertConfig.repeat,
            ),
            loadFirstAvailableTexture(
              textureLoader,
              centerInsertConfig.roughnessCandidates,
              renderer,
              THREE.NoColorSpace,
              centerInsertConfig.repeat,
            ),
            loadFirstAvailableTexture(
              textureLoader,
              buildBrownBolsterLeatherTextureCandidates(),
              renderer,
              THREE.SRGBColorSpace,
              sideRepeat,
            ),
            loadFirstAvailableTexture(
              textureLoader,
              buildBrownLeatherNormalCandidates(),
              renderer,
              THREE.NoColorSpace,
              sideRepeat,
            ),
            loadFirstAvailableTexture(
              textureLoader,
              buildBrownLeatherRoughnessCandidates(),
              renderer,
              THREE.NoColorSpace,
              sideRepeat,
            ),
            loadFirstAvailableTexture(
              textureLoader,
              buildStitchTextureCandidates(),
              renderer,
              THREE.NoColorSpace,
              2.4,
            ),
          ]);

          if (!sideColorTexture) {
            return;
          }

          [centerColorTexture, centerNormalTexture, centerRoughnessTexture]
            .filter((texture): texture is THREE.Texture => Boolean(texture))
            .forEach((texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(6, 6);
              texture.needsUpdate = true;
            });

          [sideColorTexture, sideNormalTexture, sideRoughnessTexture]
            .filter((texture): texture is THREE.Texture => Boolean(texture))
            .forEach((texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(6, 6);
              texture.needsUpdate = true;
            });

          if (stitchTexture) {
            stitchTexture.wrapS = THREE.RepeatWrapping;
            stitchTexture.wrapT = THREE.RepeatWrapping;
            stitchTexture.repeat.set(2.2, 2.2);
            stitchTexture.needsUpdate = true;
          }

          const nextTextures = [
            centerColorTexture,
            centerNormalTexture,
            centerRoughnessTexture,
            sideColorTexture,
            sideNormalTexture,
            sideRoughnessTexture,
            stitchTexture,
          ].filter((texture): texture is THREE.Texture => Boolean(texture));

          if (requestId !== textureRequestIdRef.current) {
            disposeTextureSet({ textures: nextTextures });
            return;
          }

          const previousTextures = activeTexturesRef.current;
          activeTexturesRef.current = { textures: nextTextures };

          seatMaterialAssignments.forEach(({ material }) => {
            disableAlcantaraWorldGrain(material);
            material.map = sideColorTexture;
            material.normalMap = sideNormalTexture ?? centerNormalTexture;
            material.roughnessMap = sideRoughnessTexture ?? centerRoughnessTexture;
            material.bumpMap = null;
            material.bumpScale = 0;
            material.emissiveMap = null;
            material.emissive.setHex(0x000000);
            material.emissiveIntensity = 0;
            material.normalScale.set(0.8, 0.8);
            material.roughness = 0.65;
            material.metalness = 0.02;
            material.envMapIntensity = 0.6;
            material.color.setHex(0xffffff);
            material.needsUpdate = true;
          });
          applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignments);

          applySoftLightingPreset(renderer, lightRig);

          disposeTextureSet(previousTextures);
          return;
        }

        const centerRepeat = 6;
        const sideRepeat = 6;
        const centerColorTexture = await loadFirstAvailableTexture(
          textureLoader,
          buildLeatherTextureCandidates(nextTextureUrl),
          renderer,
          THREE.SRGBColorSpace,
          centerRepeat,
        );
        if (!centerColorTexture) {
          return;
        }

        const [
          centerNormalTexture,
          centerRoughnessTexture,
          sideColorTexture,
          sideNormalTexture,
          sideRoughnessTexture,
        ] = await Promise.all([
          loadFirstAvailableTexture(
            textureLoader,
            buildLeatherNormalCandidates(),
            renderer,
            THREE.NoColorSpace,
            centerRepeat,
          ),
          loadFirstAvailableTexture(
            textureLoader,
            buildLeatherRoughnessCandidates(),
            renderer,
            THREE.NoColorSpace,
            centerRepeat,
          ),
          loadFirstAvailableTexture(
            textureLoader,
            buildSmoothPuTextureCandidates(nextTextureUrl),
            renderer,
            THREE.SRGBColorSpace,
            sideRepeat,
          ),
          loadFirstAvailableTexture(
            textureLoader,
            buildLeatherNormalCandidates(),
            renderer,
            THREE.NoColorSpace,
            sideRepeat,
          ),
          loadFirstAvailableTexture(
            textureLoader,
            buildLeatherRoughnessCandidates(),
            renderer,
            THREE.NoColorSpace,
            sideRepeat,
          ),
        ]);
        if (!sideColorTexture) {
          return;
        }

        [centerColorTexture, centerNormalTexture, centerRoughnessTexture]
          .filter((texture): texture is THREE.Texture => Boolean(texture))
          .forEach((texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(6, 6);
            texture.needsUpdate = true;
          });

        [sideColorTexture, sideNormalTexture, sideRoughnessTexture]
          .filter((texture): texture is THREE.Texture => Boolean(texture))
          .forEach((texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(6, 6);
            texture.needsUpdate = true;
          });

        const nextTextures = [
          centerColorTexture,
          centerNormalTexture,
          centerRoughnessTexture,
          sideColorTexture,
          sideNormalTexture,
          sideRoughnessTexture,
        ].filter((texture): texture is THREE.Texture => Boolean(texture));

        if (requestId !== textureRequestIdRef.current) {
          disposeTextureSet({ textures: nextTextures });
          return;
        }

        const previousTextures = activeTexturesRef.current;
        activeTexturesRef.current = { textures: nextTextures };

        seatMaterialAssignments.forEach(({ material }) => {
          disableAlcantaraWorldGrain(material);
          material.map = sideColorTexture;
          material.normalMap = sideNormalTexture ?? centerNormalTexture;
          material.roughnessMap = sideRoughnessTexture ?? centerRoughnessTexture;
          material.emissiveMap = null;
          material.emissive.setHex(0x000000);
          material.emissiveIntensity = 0;
          material.bumpMap = null;
          material.bumpScale = 0;
          material.normalScale.set(0.8, 0.8);
          material.roughness = 0.65;
          material.metalness = 0.02;
          material.envMapIntensity = 0.6;
          material.color.setHex(0xffffff);
          material.needsUpdate = true;
        });
        applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignments);

        applySoftLightingPreset(renderer, lightRig);

        disposeTextureSet(previousTextures);
        return;
      }

      if (isAlcantara) {
        const nextTextures: THREE.Texture[] = [];
        if (requestId !== textureRequestIdRef.current) {
          disposeTextureSet({ textures: nextTextures });
          return;
        }

        const previousTextures = activeTexturesRef.current;
        activeTexturesRef.current = { textures: nextTextures };

        seatMaterialAssignments.forEach(({ material }) => {
          applyUnifiedAlcantaraMaterial(material);
        });
        applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignments);

        applySoftLightingPreset(renderer, lightRig);

        disposeTextureSet(previousTextures);
        return;
      }

      const colorTexture = await loadFirstAvailableTexture(
        textureLoader,
        buildColorTextureCandidates(nextTextureUrl),
        renderer,
        THREE.SRGBColorSpace,
        materialResponse.textureRepeat,
      );
      if (!colorTexture) {
        return;
      }

      const [normalTexture, roughnessTexture] = await Promise.all([
        loadFirstAvailableTexture(
          textureLoader,
          buildLeatherNormalCandidates(),
          renderer,
          THREE.NoColorSpace,
          materialResponse.textureRepeat,
        ),
        loadFirstAvailableTexture(
          textureLoader,
          [SEAT_ROUGHNESS_MAP_URL],
          renderer,
          THREE.NoColorSpace,
          materialResponse.textureRepeat,
        ),
      ]);

      const nextTextures = [colorTexture, normalTexture, roughnessTexture].filter(
        (texture): texture is THREE.Texture => Boolean(texture),
      );

      if (requestId !== textureRequestIdRef.current) {
        disposeTextureSet({ textures: nextTextures });
        return;
      }

      const previousTextures = activeTexturesRef.current;
      activeTexturesRef.current = { textures: nextTextures };
      seatMaterials.forEach((material) => {
        const seatMaterial = material;
        disableAlcantaraWorldGrain(seatMaterial);
        seatMaterial.map = colorTexture;
        seatMaterial.normalMap = normalTexture ?? null;
        seatMaterial.roughnessMap = roughnessTexture ?? null;
        seatMaterial.emissiveMap = null;
        seatMaterial.emissive.setHex(0x000000);
        seatMaterial.emissiveIntensity = 0;
        seatMaterial.bumpMap = null;
        seatMaterial.bumpScale = 0;
        seatMaterial.normalScale.set(
          materialResponse.normalStrength,
          materialResponse.normalStrength,
        );
        seatMaterial.roughness = materialResponse.roughness;
        seatMaterial.metalness = materialResponse.metalness;
        seatMaterial.envMapIntensity = materialResponse.envMapIntensity;
        seatMaterial.color.setHex(0xffffff);
        seatMaterial.needsUpdate = true;
      });
      applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignments);

      applySoftLightingPreset(renderer, lightRig);

      disposeTextureSet(previousTextures);
    },
    [],
  );

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060910);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.copy(PREMIUM_CAMERA_POSITION);
    camera.lookAt(PREMIUM_CAMERA_LOOK_AT);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = SOFT_LIGHTING_PRESET.exposure;
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    textureLoaderRef.current = new THREE.TextureLoader();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.52;
    controls.zoomSpeed = 0.6;
    controls.minDistance = 0.6;
    controls.maxDistance = 3;
    controls.target.copy(PREMIUM_CONTROLS_TARGET);
    controls.minPolarAngle = 0.32;
    controls.maxPolarAngle = Math.PI - 0.35;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;

    const ambientLight = new THREE.AmbientLight(0xffffff, SOFT_LIGHTING_PRESET.ambient);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, SOFT_LIGHTING_PRESET.key);
    keyLight.position.set(2.6, 4.4, 3.2);
    keyLight.castShadow = false;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, SOFT_LIGHTING_PRESET.fill);
    fillLight.position.set(-2.8, 3.8, 2.6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf5f8ff, SOFT_LIGHTING_PRESET.rim);
    rimLight.position.set(0.2, 3.1, -4.8);
    scene.add(rimLight);

    const skyFillLight = new THREE.HemisphereLight(0xffffff, 0x8d99ab, 0.55);
    scene.add(skyFillLight);

    lightRigRef.current = {
      ambient: ambientLight,
      key: keyLight,
      fill: fillLight,
      rim: rimLight,
    };
    applySoftLightingPreset(renderer, lightRigRef.current);

    const stage = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.28, 0.08, 72),
      new THREE.MeshStandardMaterial({
        color: 0x232830,
        roughness: 0.74,
        metalness: 0.05,
        envMapIntensity: 0.12,
      }),
    );
    stage.position.y = -1.12;
    stage.receiveShadow = false;
    scene.add(stage);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.ShadowMaterial({ opacity: 0.34 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.161;
    ground.receiveShadow = false;
    scene.add(ground);

    const gltfLoader = new GLTFLoader();
    let disposed = false;
    let frameId = 0;
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    let environmentTarget: THREE.WebGLRenderTarget | null = null;

    new RGBELoader().load(
      HDR_ENV_MAP_URL,
      (hdrTexture) => {
        if (disposed) {
          hdrTexture.dispose();
          return;
        }

        environmentTarget?.dispose();
        environmentTarget = pmremGenerator.fromEquirectangular(hdrTexture);
        scene.environment = environmentTarget.texture;
        scene.background = null;
        hdrTexture.dispose();
      },
      undefined,
      () => {
        if (!disposed) {
          scene.environment = null;
        }
      },
    );

    const updateSize = () => {
      const width = mountNode.clientWidth;
      const height = Math.max(mountNode.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(mountNode);
    selectedSeatAreaRef.current = null;
    setSelectedSeatArea(null);
    seatAreaBySlotKeyRef.current.clear();
    seatBoundsRef.current = null;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPosition: { x: number; y: number } | null = null;

    const resolveSeatAreaFromIntersection = (
      intersection: THREE.Intersection<THREE.Object3D>,
    ) => {
      if (intersection.object instanceof THREE.Mesh) {
        const materialIndex = intersection.face?.materialIndex ?? 0;
        const slotKey = buildMaterialSlotKey(intersection.object, materialIndex);
        const mappedArea = seatAreaBySlotKeyRef.current.get(slotKey);
        if (mappedArea) {
          return mappedArea;
        }
      }

      const seatBounds = seatBoundsRef.current;
      if (seatBounds) {
        return classifySeatAreaFromPoint(intersection.point, seatBounds);
      }

      return null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      pointerDownPosition = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.button !== 0 || !pointerDownPosition) {
        return;
      }

      const delta = Math.hypot(
        event.clientX - pointerDownPosition.x,
        event.clientY - pointerDownPosition.y,
      );
      pointerDownPosition = null;
      if (delta > 6) {
        return;
      }

      const seatModel = seatRef.current;
      if (!seatModel) {
        return;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const intersections = raycaster.intersectObject(seatModel, true);
      if (intersections.length === 0) {
        return;
      }

      const hitArea = intersections
        .map((intersection) => resolveSeatAreaFromIntersection(intersection))
        .find((area): area is SeatInteractiveArea => Boolean(area));
      if (!hitArea) {
        return;
      }

      selectedSeatAreaRef.current = hitArea;
      setSelectedSeatArea((currentArea) => (currentArea === hitArea ? currentArea : hitArea));
      void applyTextureToSeatArea(hitArea, selectedTextureRef.current);
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.style.cursor = "pointer";

    gltfLoader.load(
      "/seat.glb",
      (gltf) => {
        if (disposed) {
          return;
        }

        const seat = gltf.scene;
        seatRef.current = seat;
        const sourceBounds = new THREE.Box3().setFromObject(seat);
        const sourceSize = new THREE.Vector3();
        const sourceCenter = new THREE.Vector3();
        sourceBounds.getSize(sourceSize);
        sourceBounds.getCenter(sourceCenter);
        const seatHalfWidth = Math.max(sourceSize.x * 0.5, 0.001);

        const targetSlots: MaterialSlot[] = [];
        const fallbackSlots: MaterialSlot[] = [];

        seat.traverse((node) => {
          if (!(node instanceof THREE.Mesh)) {
            return;
          }

          node.castShadow = false;
          node.receiveShadow = false;

          const materials = Array.isArray(node.material) ? node.material : [node.material];
          materials.forEach((material, materialIndex) => {
            const slot: MaterialSlot = { mesh: node, materialIndex, material };
            fallbackSlots.push(slot);
            if (isSeatSurfaceMaterial(node, material)) {
              targetSlots.push(slot);
            }
          });
        });

        const slotsToUpdate = fallbackSlots.length > 0 ? fallbackSlots : targetSlots;
        const assignedSeatMaterials: THREE.MeshStandardMaterial[] = [];
        const assignedSeatMaterialAssignments: SeatMaterialAssignment[] = [];
        const seatAreaBySlotKey = new Map<string, SeatInteractiveArea>();
        const centerMaterialIndicesByMesh = new Map<THREE.Mesh, Set<number>>();

        slotsToUpdate.forEach((slot) => {
          const standardizedMaterial = ensureMeshStandardMaterial(slot.material);
          const meshStandardMaterial = standardizedMaterial.clone();
          meshStandardMaterial.name = standardizedMaterial.name;
          replaceMeshMaterialAtIndex(slot.mesh, slot.materialIndex, meshStandardMaterial);
          const slotBounds = collectMaterialSlotBounds(slot.mesh, slot.materialIndex);
          const slotCenter = slotBounds.getCenter(new THREE.Vector3());

          const zone = classifySeatSurfaceZone(
            slot.mesh,
            meshStandardMaterial,
            sourceCenter.x,
            seatHalfWidth,
            slotCenter,
          );
          const area = classifySeatInteractiveArea(
            slot.mesh,
            meshStandardMaterial,
            slotBounds,
            sourceBounds,
            sourceCenter.x,
            seatHalfWidth,
            zone,
          );
          seatAreaBySlotKey.set(buildMaterialSlotKey(slot.mesh, slot.materialIndex), area);

          assignedSeatMaterials.push(meshStandardMaterial);
          assignedSeatMaterialAssignments.push({
            material: meshStandardMaterial,
            zone,
            area,
            mesh: slot.mesh,
            materialIndex: slot.materialIndex,
          });
          if (zone === "center") {
            const indices = centerMaterialIndicesByMesh.get(slot.mesh) ?? new Set<number>();
            indices.add(slot.materialIndex);
            centerMaterialIndicesByMesh.set(slot.mesh, indices);
          }
        });

        seatMaterialsRef.current = assignedSeatMaterials;
        seatMaterialAssignmentsRef.current = assignedSeatMaterialAssignments;
        seatAreaBySlotKeyRef.current = seatAreaBySlotKey;
        meshMaterialSnapshotsRef.current = captureMeshMaterialSnapshots(seat);

        centerMaterialIndicesByMesh.forEach((materialIndices, mesh) => {
          applyCenterPanelUvWarp(mesh, materialIndices, sourceBounds.min.y, sourceSize.y);
        });
        const box = new THREE.Box3().setFromObject(seat);
        const center = box.getCenter(new THREE.Vector3());
        const boxSize = box.getSize(new THREE.Vector3());
        seat.position.x -= center.x;
        seat.position.y -= center.y;
        seat.position.z -= center.z;

        const maxDimension = Math.max(boxSize.x, boxSize.y, boxSize.z);
        if (maxDimension > 0.0001) {
          seat.scale.setScalar(2.3 / maxDimension);
        }
        seat.rotation.y = 0.3;
        seat.rotation.x = 0;

        // Keep the transformed model perfectly centered at world origin.
        const centeredBox = new THREE.Box3().setFromObject(seat);
        const centered = centeredBox.getCenter(new THREE.Vector3());
        seat.position.x -= centered.x;
        seat.position.y -= centered.y;
        seat.position.z -= centered.z;

        scene.add(seat);

        const framedBox = new THREE.Box3().setFromObject(seat);
        seatBoundsRef.current = framedBox.clone();
        const modelSize = Math.max(framedBox.getSize(new THREE.Vector3()).length(), 0.001);

        camera.position.set(modelSize * 0.6, modelSize * 0.5, modelSize * 1.6);
        controls.target.set(0, 0, 0);
        controls.minDistance = Math.max(0.6, modelSize * 0.35);
        controls.maxDistance = Math.max(3, modelSize * 4);
        camera.near = Math.max(0.05, modelSize / 100);
        camera.far = Math.max(40, modelSize * 20);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        controls.update();
        setStatus("ready");

        void applySelectedMaterialTextures(selectedTextureRef.current);
      },
      undefined,
      () => {
        if (!disposed) {
          setStatus("error");
        }
      },
    );

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      textureRequestIdRef.current += 1;
      areaTextureRequestIdRef.current += 1;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.style.cursor = "";
      controls.dispose();

      seatMaterialsRef.current.forEach((material) => {
        material.map = null;
        material.normalMap = null;
        material.roughnessMap = null;
        material.emissiveMap = null;
        material.emissive.setHex(0x000000);
        material.emissiveIntensity = 0;
        material.bumpMap = null;
        material.bumpScale = 0;
        material.needsUpdate = true;
      });

      disposeTextureSet(activeTexturesRef.current);
      activeTexturesRef.current = null;
      Object.values(areaTexturesRef.current).forEach((texture) => {
        texture?.dispose();
      });
      areaTexturesRef.current = {};
      areaTextureOverridesRef.current = {};
      seatAreaBySlotKeyRef.current.clear();
      seatBoundsRef.current = null;
      selectedSeatAreaRef.current = null;

      if (seatRef.current) {
        scene.remove(seatRef.current);
        disposeModel(seatRef.current);
        seatRef.current = null;
      }
      seatMaterialsRef.current = [];
      seatMaterialAssignmentsRef.current = [];
      meshMaterialSnapshotsRef.current = [];

      scene.remove(ground);
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();

      scene.remove(stage);
      stage.geometry.dispose();
      (stage.material as THREE.Material).dispose();

      scene.environment = null;
      environmentTarget?.dispose();
      environmentTarget = null;
      pmremGenerator.dispose();

      renderer.dispose();
      rendererRef.current = null;
      lightRigRef.current = null;
      textureLoaderRef.current = null;

      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [applySelectedMaterialTextures, applyTextureToSeatArea]);

  useEffect(() => {
    void applySelectedMaterialTextures(selectedTextureRef.current).then(() => {
      const overrides = Object.entries(areaTextureOverridesRef.current) as Array<
        [SeatInteractiveArea, string]
      >;
      overrides.forEach(([area, textureUrl]) => {
        void applyTextureToSeatArea(area, textureUrl);
      });
    });
  }, [
    applySelectedMaterialTextures,
    applyTextureToSeatArea,
    materialVariant,
    materialPresetId,
    colorPresetId,
  ]);

  useEffect(() => {
    const selectedArea = selectedSeatAreaRef.current;
    if (!selectedArea) {
      void applySelectedMaterialTextures(selectedTextureUrl);
      return;
    }

    areaTextureOverridesRef.current[selectedArea] = selectedTextureUrl;
    void applyTextureToSeatArea(selectedArea, selectedTextureUrl);
  }, [applySelectedMaterialTextures, applyTextureToSeatArea, selectedTextureUrl]);

  return (
    <div
      className={cn(
        "relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-2xl border border-divider/70 bg-[radial-gradient(circle_at_16%_20%,rgba(74,86,110,0.26),transparent_40%),radial-gradient(circle_at_78%_82%,rgba(176,148,106,0.12),transparent_44%),linear-gradient(160deg,#06090f_0%,#090f16_44%,#0a1017_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      <div ref={mountRef} className="h-full w-full" />

      {status === "ready" ? (
        <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/15 bg-black/45 px-3 py-1 text-xs text-white/85">
          {`Selected area: ${selectedSeatArea ? seatAreaLabelByArea[selectedSeatArea] : "none"}`}
        </div>
      ) : null}

      {status !== "ready" ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-md border border-white/10 bg-black/45 px-3 py-1 text-xs text-white/80">
            {status === "loading" ? "Loading seat..." : "Seat model could not be loaded."}
          </div>
        </div>
      ) : null}
    </div>
  );
}
