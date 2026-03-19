import * as THREE from "three";
import type { AlcantaraFabricTextureSet } from "./alcantara-fabric";

export type UpholsteryFamily = "kunstleder" | "alcantara";
export type UpholsteryContext = "seat" | "preview";
export type UpholsteryZone = "center" | "side";
export type UpholsteryAppearance = "light" | "dark" | "brown";

export type UpholsteryTextureRepeatOptions = {
  family: UpholsteryFamily;
  context?: UpholsteryContext;
  zone?: UpholsteryZone;
  perforated?: boolean;
};

export type UpholsteryProfileOptions = {
  family: UpholsteryFamily;
  zone?: UpholsteryZone;
  perforated?: boolean;
  appearance?: UpholsteryAppearance;
};

export type UpholsteryMaterialProfile = {
  roughness: number;
  metalness: number;
  envMapIntensity: number;
  normalStrength: number;
  clearcoat: number;
  clearcoatRoughness: number;
  sheen: number;
  sheenRoughness: number;
  specularIntensity: number;
  reflectivity: number;
  bumpScale: number;
};

export type UpholsteryMaterialOptions = {
  zone?: UpholsteryZone;
  context?: UpholsteryContext;
  perforated?: boolean;
  appearance?: UpholsteryAppearance;
  color?: THREE.ColorRepresentation | THREE.Color;
  map?: THREE.Texture | null;
  normalMap?: THREE.Texture | null;
  roughnessMap?: THREE.Texture | null;
  metalnessMap?: THREE.Texture | null;
  aoMap?: THREE.Texture | null;
  alphaMap?: THREE.Texture | null;
  maxAnisotropy?: number;
  repeatScale?: number;
};

export type AlcantaraMaterialOptions = {
  zone?: UpholsteryZone;
  context?: UpholsteryContext;
  area?: "headrest" | "backrest" | "sideBolster" | "seatCushion" | null;
  color?: THREE.ColorRepresentation | THREE.Color;
  map?: THREE.Texture | null;
  maxAnisotropy?: number;
  fabricTextures?: AlcantaraFabricTextureSet | null;
  repeatScale?: number;
};

export function getUpholsteryTextureRepeat(options: UpholsteryTextureRepeatOptions): number;
export function getStitchingTextureRepeat(context?: UpholsteryContext): number;
export function getUpholsteryMaterialProfile(
  options: UpholsteryProfileOptions,
): UpholsteryMaterialProfile;
export function syncKunstlederMaterial(
  material: THREE.MeshPhysicalMaterial,
  options?: UpholsteryMaterialOptions,
): THREE.MeshPhysicalMaterial;
export function makeKunstlederMaterial(options?: UpholsteryMaterialOptions): THREE.MeshPhysicalMaterial;
export function syncAlcantaraMaterial(
  material: THREE.MeshPhysicalMaterial,
  options?: AlcantaraMaterialOptions,
): THREE.MeshPhysicalMaterial;
export function makeAlcantaraMaterial(options?: AlcantaraMaterialOptions): THREE.MeshPhysicalMaterial;
export function ensureUpholsteryPhysicalMaterial(
  material: THREE.Material,
  options?: { maxAnisotropy?: number; repeatScale?: number },
): THREE.MeshPhysicalMaterial;
export function createSeatMaterial(
  type: string,
  texture: THREE.Texture | null | undefined,
  options?: UpholsteryMaterialOptions & AlcantaraMaterialOptions,
): THREE.MeshPhysicalMaterial;
