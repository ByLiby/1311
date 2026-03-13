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
      ambient: 0.5,
      key: 1.35,
      fill: 0.5,
      rim: 0.3,
      exposure: 1.08,
    },
    colors: {
      "black-edition": {
        sideColor: "#1a1a1a",
        centerColor: "#2a2a2a",
      },
      "white-edition": {
        sideColor: "#e5e5e5",
        centerColor: "#ffffff",
      },
      "brown-edition": {
        sideColor: "#5a3a2a",
        centerColor: "#c8ccd6",
      },
      "dark-grey-edition": {
        sideColor: "#2f3338",
        centerColor: "#3c4148",
      },
    },
  },
};
