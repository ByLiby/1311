// Preserved seat-only material presets.
// Not part of the active catalog/homepage runtime; kept for later isolated seat rebuild work.
export type SeatMaterialPresetId = "LuxurySportSeat";

export type SeatMaterialColorPresetId =
  | "black-edition"
  | "white-edition"
  | "brown-edition"
  | "dark-grey-edition";

export type SeatMaterialColorVariant = {
  sideColor: string;
  centerColor: string;
};

export type SeatMaterialLightingProfile = {
  ambient: number;
  key: number;
  fill: number;
  rim: number;
  exposure: number;
};

export type SeatMaterialPreset = {
  id: SeatMaterialPresetId;
  sideTextureCandidates: string[];
  centerTextureCandidates: string[];
  stitchingTextureCandidates: string[];
  sideTextureRepeat: number;
  centerTextureRepeat: number;
  stitchingTextureRepeat: number;
  sideRoughness: number;
  centerRoughness: number;
  metalness: number;
  sideEnvMapIntensity: number;
  centerEnvMapIntensity: number;
  stitchingBumpScale: number;
  stitchingEmissiveIntensity: number;
  stitchingEmissiveColor: string;
  lighting: SeatMaterialLightingProfile;
  colors: Record<SeatMaterialColorPresetId, SeatMaterialColorVariant>;
};

export const DEFAULT_SEAT_MATERIAL_PRESET_ID: SeatMaterialPresetId = "LuxurySportSeat";
export const DEFAULT_SEAT_MATERIAL_COLOR_PRESET_ID: SeatMaterialColorPresetId = "black-edition";

export const SEAT_MATERIAL_PRESETS: Record<SeatMaterialPresetId, SeatMaterialPreset> = {
  LuxurySportSeat: {
    id: "LuxurySportSeat",
    sideTextureCandidates: [
      "/textures/alcantara-style.jpg",
      "/textures/alcantara.jpg",
    ],
    centerTextureCandidates: [
      "/textures/alcantara-diamond-quilt.svg",
      "/textures/alcantara-style.svg",
    ],
    stitchingTextureCandidates: [
      "/textures/alcantara-diamond-quilt.svg",
      "/textures/alcantara-style.svg",
    ],
    sideTextureRepeat: 12,
    centerTextureRepeat: 12,
    stitchingTextureRepeat: 12,
    sideRoughness: 0.92,
    centerRoughness: 0.92,
    metalness: 0,
    sideEnvMapIntensity: 0.25,
    centerEnvMapIntensity: 0.25,
    stitchingBumpScale: 0.006,
    stitchingEmissiveIntensity: 0,
    stitchingEmissiveColor: "#000000",
    lighting: {
      ambient: 0.4,
      key: 1.36,
      fill: 0.56,
      rim: 0.46,
      exposure: 1.14,
    },
    colors: {
      "black-edition": {
        sideColor: "#141517",
        centerColor: "#26282c",
      },
      "white-edition": {
        sideColor: "#d3ccc2",
        centerColor: "#ebe4d9",
      },
      "brown-edition": {
        sideColor: "#3c271f",
        centerColor: "#5d3c2e",
      },
      "dark-grey-edition": {
        sideColor: "#252a31",
        centerColor: "#394047",
      },
    },
  },
};
