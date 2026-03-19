import * as THREE from "three";
import { createAlcantaraFabricTextures } from "./alcantara-fabric";

// Shared upholstery material logic retained as a seat-focused reference layer.
// It is intentionally decoupled from active app routing and current homepage flow.
const DEFAULT_BASE_COLOR = new THREE.Color(0xffffff);

const UPHOLSTERY_TEXTURE_REPEAT = {
  seat: {
    kunstleder: {
      side: 5.2,
      center: 5.6,
      perforated: 5.0,
    },
    alcantara: {
      side: 4.4,
      center: 4.7,
    },
    stitching: 2.2,
  },
  preview: {
    kunstleder: {
      side: 3.2,
      center: 3.35,
      perforated: 3.1,
    },
    alcantara: {
      side: 3.5,
      center: 3.7,
    },
    stitching: 2,
  },
};

const KUNSTLEDER_PROFILES = {
  dark: {
    roughness: 0.64,
    envMapIntensity: 0.24,
  },
  light: {
    roughness: 0.58,
    envMapIntensity: 0.2,
  },
  brown: {
    roughness: 1.0,
    envMapIntensity: 0.05,
    clearcoat: 0.03,
    clearcoatRoughness: 0.92,
    specularIntensity: 0.06,
    reflectivity: 0.06,
    normalStrength: 0.35,
  },
};

const KUNSTLEDER_BASE_PROFILE = {
  metalness: 0,
  clearcoat: 0.05,
  clearcoatRoughness: 0.84,
  specularIntensity: 0.14,
  reflectivity: 0.1,
  normalStrength: 0.24,
};

const PERFORATED_PROFILE = {
  roughness: 0.66,
  envMapIntensity: 0.2,
  normalStrength: 0.3,
};

const ALCANTARA_PROFILE = {
  metalness: 0,
  side: {
    roughness: 0.98,
    envMapIntensity: 0.08,
    normalStrength: 0.04,
    sheen: 0.16,
    bumpScale: 0.00035,
  },
  center: {
    roughness: 0.982,
    envMapIntensity: 0.09,
    normalStrength: 0.05,
    sheen: 0.2,
    bumpScale: 0.0005,
  },
  sheenRoughness: 0.95,
  specularIntensity: 0.018,
  reflectivity: 0.01,
};

function cloneColor(value) {
  if (value instanceof THREE.Color) {
    return value.clone();
  }

  if (typeof value === "string" || typeof value === "number") {
    return new THREE.Color(value);
  }

  return DEFAULT_BASE_COLOR.clone();
}

function adjustColor(source, lightnessOffset, saturationOffset = 0) {
  const color = cloneColor(source);
  color.offsetHSL(0, saturationOffset, lightnessOffset);
  return color;
}

function assignTextureColorSpace(texture, colorSpace) {
  if (!(texture instanceof THREE.Texture)) {
    return null;
  }

  texture.colorSpace = colorSpace;
  texture.needsUpdate = true;
  return texture;
}

function configureTextureSampling(texture, maxAnisotropy, colorSpace, repeatScale) {
  if (!(texture instanceof THREE.Texture)) {
    return null;
  }

  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatScale, repeatScale);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  if (typeof maxAnisotropy === "number" && maxAnisotropy > 0) {
    texture.anisotropy = maxAnisotropy;
  }
  texture.needsUpdate = true;
  return texture;
}

function getOptionalTexture(source, key) {
  const texture = source?.userData?.[key];
  return texture instanceof THREE.Texture ? texture : null;
}

function getNormalizedZone(zone) {
  return zone === "center" ? "center" : "side";
}

export function getUpholsteryTextureRepeat({
  family,
  context = "seat",
  zone = "side",
  perforated = false,
} = {}) {
  const resolvedContext = context === "preview" ? "preview" : "seat";
  const resolvedZone = getNormalizedZone(zone);

  if (family === "alcantara") {
    return UPHOLSTERY_TEXTURE_REPEAT[resolvedContext].alcantara[resolvedZone];
  }

  if (perforated) {
    return UPHOLSTERY_TEXTURE_REPEAT[resolvedContext].kunstleder.perforated;
  }

  return UPHOLSTERY_TEXTURE_REPEAT[resolvedContext].kunstleder[resolvedZone];
}

export function getStitchingTextureRepeat(context = "seat") {
  return context === "preview"
    ? UPHOLSTERY_TEXTURE_REPEAT.preview.stitching
    : UPHOLSTERY_TEXTURE_REPEAT.seat.stitching;
}

export function getUpholsteryMaterialProfile({
  family,
  zone = "side",
  perforated = false,
  appearance = "dark",
} = {}) {
  if (family === "alcantara") {
    const zoneProfile = ALCANTARA_PROFILE[getNormalizedZone(zone)];

    return {
      roughness: zoneProfile.roughness,
      metalness: ALCANTARA_PROFILE.metalness,
      envMapIntensity: zoneProfile.envMapIntensity,
      clearcoat: 0,
      clearcoatRoughness: 1,
      sheen: zoneProfile.sheen,
      sheenRoughness: ALCANTARA_PROFILE.sheenRoughness,
      specularIntensity: ALCANTARA_PROFILE.specularIntensity,
      reflectivity: ALCANTARA_PROFILE.reflectivity,
      normalStrength: zoneProfile.normalStrength,
      bumpScale: zoneProfile.bumpScale,
    };
  }

  if (perforated) {
    return {
      ...KUNSTLEDER_BASE_PROFILE,
      roughness: PERFORATED_PROFILE.roughness,
      envMapIntensity: PERFORATED_PROFILE.envMapIntensity,
      normalStrength: PERFORATED_PROFILE.normalStrength,
    };
  }

  const appearanceProfile =
    appearance === "light"
      ? KUNSTLEDER_PROFILES.light
      : appearance === "brown"
        ? KUNSTLEDER_PROFILES.brown
        : KUNSTLEDER_PROFILES.dark;

  return {
    ...KUNSTLEDER_BASE_PROFILE,
    ...appearanceProfile,
  };
}

function applyCommonMaterialSettings(material, options) {
  const {
    map = null,
    normalMap = null,
    roughnessMap = null,
    metalnessMap = null,
    aoMap = null,
    alphaMap = null,
    bumpMap = null,
    emissiveMap = null,
    sheenColorMap = null,
    sheenRoughnessMap = null,
    color = DEFAULT_BASE_COLOR,
    roughness,
    metalness,
    envMapIntensity,
    clearcoat = 0,
    clearcoatRoughness = 1,
    specularIntensity = 0.12,
    reflectivity = 0.1,
    sheen = 0,
    sheenColor = 0xffffff,
    sheenRoughness = 1,
    normalStrength = 0,
    bumpScale = 0,
    alphaTest = 0,
    transparent = false,
    opacity = 1,
    side = THREE.FrontSide,
    maxAnisotropy,
    repeatScale,
  } = options;

  material.map = configureTextureSampling(
    assignTextureColorSpace(map, THREE.SRGBColorSpace),
    maxAnisotropy,
    THREE.SRGBColorSpace,
    repeatScale,
  );
  material.normalMap = configureTextureSampling(
    assignTextureColorSpace(normalMap, THREE.NoColorSpace),
    maxAnisotropy,
    THREE.NoColorSpace,
    repeatScale,
  );
  material.roughnessMap = configureTextureSampling(
    assignTextureColorSpace(roughnessMap, THREE.NoColorSpace),
    maxAnisotropy,
    THREE.NoColorSpace,
    repeatScale,
  );
  material.metalnessMap = configureTextureSampling(
    assignTextureColorSpace(metalnessMap, THREE.NoColorSpace),
    maxAnisotropy,
    THREE.NoColorSpace,
    repeatScale,
  );
  material.aoMap = configureTextureSampling(
    assignTextureColorSpace(aoMap, THREE.NoColorSpace),
    maxAnisotropy,
    THREE.NoColorSpace,
    repeatScale,
  );
  material.alphaMap = configureTextureSampling(
    assignTextureColorSpace(alphaMap, THREE.NoColorSpace),
    maxAnisotropy,
    THREE.NoColorSpace,
    repeatScale,
  );
  material.bumpMap = configureTextureSampling(
    assignTextureColorSpace(bumpMap, THREE.NoColorSpace),
    maxAnisotropy,
    THREE.NoColorSpace,
    repeatScale,
  );
  material.emissiveMap = configureTextureSampling(
    assignTextureColorSpace(emissiveMap, THREE.SRGBColorSpace),
    maxAnisotropy,
    THREE.SRGBColorSpace,
    repeatScale,
  );
  material.sheenColorMap = configureTextureSampling(
    assignTextureColorSpace(sheenColorMap, THREE.SRGBColorSpace),
    maxAnisotropy,
    THREE.SRGBColorSpace,
    repeatScale,
  );
  material.sheenRoughnessMap = configureTextureSampling(
    assignTextureColorSpace(sheenRoughnessMap, THREE.NoColorSpace),
    maxAnisotropy,
    THREE.NoColorSpace,
    repeatScale,
  );
  material.color.copy(cloneColor(color));
  material.roughness = roughness;
  material.metalness = metalness;
  material.envMapIntensity = envMapIntensity;
  material.clearcoat = clearcoat;
  material.clearcoatRoughness = clearcoatRoughness;
  material.specularIntensity = specularIntensity;
  material.reflectivity = reflectivity;
  material.sheen = sheen;
  material.sheenColor.copy(cloneColor(sheenColor));
  material.sheenRoughness = sheenRoughness;
  material.emissive.setHex(0x000000);
  material.emissiveIntensity = 0;
  material.transmission = 0;
  material.thickness = 0;
  material.ior = 1.45;
  material.normalScale.set(normalStrength, normalStrength);
  material.bumpScale = bumpScale;
  material.alphaTest = alphaTest;
  material.transparent = transparent;
  material.opacity = opacity;
  material.side = side;
  material.needsUpdate = true;

  return material;
}

export function syncKunstlederMaterial(material, options = {}) {
  const {
    zone = "side",
    context = "seat",
    perforated = false,
    appearance = "dark",
    color = DEFAULT_BASE_COLOR,
    map = null,
    normalMap = getOptionalTexture(map, "normalMap"),
    roughnessMap = getOptionalTexture(map, "roughnessMap"),
    metalnessMap = getOptionalTexture(map, "metalnessMap"),
    aoMap = getOptionalTexture(map, "aoMap"),
    alphaMap = null,
    maxAnisotropy,
    repeatScale = getUpholsteryTextureRepeat({
      family: "kunstleder",
      context,
      zone,
      perforated,
    }),
  } = options;

  const profile = getUpholsteryMaterialProfile({
    family: "kunstleder",
    zone,
    perforated,
    appearance,
  });

  return applyCommonMaterialSettings(material, {
    map,
    normalMap,
    roughnessMap,
    metalnessMap,
    aoMap,
    alphaMap,
    color,
    roughness: profile.roughness,
    metalness: profile.metalness,
    envMapIntensity: profile.envMapIntensity,
    clearcoat: profile.clearcoat,
    clearcoatRoughness: profile.clearcoatRoughness,
    specularIntensity: profile.specularIntensity,
    reflectivity: profile.reflectivity,
    normalStrength: profile.normalStrength,
    maxAnisotropy,
    repeatScale,
  });
}

export function makeKunstlederMaterial(options = {}) {
  return syncKunstlederMaterial(new THREE.MeshPhysicalMaterial(), options);
}

export function syncAlcantaraMaterial(material, options = {}) {
  const {
    zone = "side",
    context = "seat",
    area = null,
    color = DEFAULT_BASE_COLOR,
    map = null,
    maxAnisotropy,
    fabricTextures = null,
    repeatScale = getUpholsteryTextureRepeat({
      family: "alcantara",
      context,
      zone,
    }),
  } = options;

  const profile = getUpholsteryMaterialProfile({
    family: "alcantara",
    zone,
  });
  let materialColor = cloneColor(color);
  let roughness = 0.986;
  let envMapIntensity = 0.07;
  let sheen = 0.96;
  let bumpScale = 0.0045;

  if (area === "headrest") {
    materialColor = adjustColor(materialColor, -0.018, -0.01);
    roughness += 0.004;
    envMapIntensity = Math.max(0.04, envMapIntensity - 0.008);
    sheen = Math.max(0.9, sheen - 0.018);
    bumpScale *= 0.9;
  } else if (area === "backrest") {
    materialColor = adjustColor(materialColor, -0.01, -0.006);
    sheen += 0.012;
  } else if (area === "seatCushion") {
    materialColor = adjustColor(materialColor, 0.004, -0.004);
    roughness = Math.max(0.98, roughness - 0.004);
    envMapIntensity = Math.min(0.09, envMapIntensity + 0.006);
    sheen = Math.min(1, sheen + 0.018);
  } else if (area === "sideBolster") {
    materialColor = adjustColor(materialColor, -0.014, -0.005);
    roughness += 0.003;
    envMapIntensity = Math.max(0.05, envMapIntensity - 0.004);
    sheen += 0.006;
    bumpScale *= 0.8;
  }
  const generatedFabricTextures =
    fabricTextures ??
    createAlcantaraFabricTextures({
      maxAnisotropy,
      repeatScale,
    });
  const baseMap = map ?? generatedFabricTextures.colorTexture;

  applyCommonMaterialSettings(material, {
    map: baseMap,
    roughnessMap: generatedFabricTextures.responseTexture,
    bumpMap: generatedFabricTextures.heightTexture,
    sheenRoughnessMap: generatedFabricTextures.responseTexture,
    color: materialColor,
    roughness,
    metalness: 0,
    envMapIntensity,
    clearcoat: 0,
    clearcoatRoughness: 1,
    specularIntensity: Math.min(profile.specularIntensity, 0.018),
    reflectivity: Math.min(profile.reflectivity, 0.01),
    sheen,
    sheenColor: adjustColor(materialColor, 0.045, -0.02),
    sheenRoughness: 0.96,
    normalStrength: 0.012,
    bumpScale,
    maxAnisotropy,
    repeatScale,
  });
  material.userData.generatedTextures = generatedFabricTextures.textures;

  return material;
}

export function makeAlcantaraMaterial(options = {}) {
  return syncAlcantaraMaterial(new THREE.MeshPhysicalMaterial(), options);
}

export function ensureUpholsteryPhysicalMaterial(material, options = {}) {
  if (material instanceof THREE.MeshPhysicalMaterial) {
    return applyCommonMaterialSettings(material, {
      color: material.color,
      map: material.map,
      normalMap: material.normalMap,
      roughnessMap: material.roughnessMap,
      metalnessMap: material.metalnessMap,
      aoMap: material.aoMap,
      alphaMap: material.alphaMap,
      bumpMap: material.bumpMap,
      emissiveMap: material.emissiveMap,
      sheenColorMap: material.sheenColorMap,
      sheenRoughnessMap: material.sheenRoughnessMap,
      roughness: typeof material.roughness === "number" ? material.roughness : 0.62,
      metalness: typeof material.metalness === "number" ? material.metalness : 0,
      envMapIntensity: typeof material.envMapIntensity === "number" ? material.envMapIntensity : 0.2,
      clearcoat: typeof material.clearcoat === "number" ? material.clearcoat : 0,
      clearcoatRoughness:
        typeof material.clearcoatRoughness === "number" ? material.clearcoatRoughness : 1,
      specularIntensity:
        typeof material.specularIntensity === "number" ? material.specularIntensity : 0.12,
      reflectivity: typeof material.reflectivity === "number" ? material.reflectivity : 0.1,
      sheen: typeof material.sheen === "number" ? material.sheen : 0,
      sheenColor: material.sheenColor ?? material.color,
      sheenRoughness: typeof material.sheenRoughness === "number" ? material.sheenRoughness : 1,
      normalStrength: material.normalScale?.x ?? 0,
      bumpScale: typeof material.bumpScale === "number" ? material.bumpScale : 0,
      alphaTest: material.alphaTest ?? 0,
      transparent: material.transparent ?? false,
      opacity: material.opacity ?? 1,
      side: material.side ?? THREE.FrontSide,
      maxAnisotropy: options.maxAnisotropy,
      repeatScale:
        options.repeatScale ??
        getUpholsteryTextureRepeat({ family: "kunstleder", context: "seat", zone: "side" }),
    });
  }

  const source = material ?? {};
  const physicalMaterial = new THREE.MeshPhysicalMaterial({
    transparent: Boolean(source.transparent),
    opacity: typeof source.opacity === "number" ? source.opacity : 1,
    side: source.side ?? THREE.FrontSide,
  });
  physicalMaterial.name = material?.name ?? "";

  return applyCommonMaterialSettings(physicalMaterial, {
    color: source.color ?? DEFAULT_BASE_COLOR,
    map: source.map ?? null,
    normalMap: source.normalMap ?? null,
    roughnessMap: source.roughnessMap ?? null,
    metalnessMap: source.metalnessMap ?? null,
    aoMap: source.aoMap ?? null,
    alphaMap: source.alphaMap ?? null,
    bumpMap: source.bumpMap ?? null,
    emissiveMap: source.emissiveMap ?? null,
    sheenColorMap: source.sheenColorMap ?? null,
    sheenRoughnessMap: source.sheenRoughnessMap ?? null,
    roughness: typeof source.roughness === "number" ? source.roughness : 0.62,
    metalness: typeof source.metalness === "number" ? source.metalness : 0,
    envMapIntensity: typeof source.envMapIntensity === "number" ? source.envMapIntensity : 0.2,
    clearcoat: typeof source.clearcoat === "number" ? source.clearcoat : 0,
    clearcoatRoughness:
      typeof source.clearcoatRoughness === "number" ? source.clearcoatRoughness : 1,
    specularIntensity:
      typeof source.specularIntensity === "number" ? source.specularIntensity : 0.12,
    reflectivity: typeof source.reflectivity === "number" ? source.reflectivity : 0.1,
    sheen: typeof source.sheen === "number" ? source.sheen : 0,
    sheenColor: source.sheenColor ?? source.color ?? DEFAULT_BASE_COLOR,
    sheenRoughness: typeof source.sheenRoughness === "number" ? source.sheenRoughness : 1,
    normalStrength: source.normalScale?.x ?? 0,
    bumpScale: typeof source.bumpScale === "number" ? source.bumpScale : 0,
    alphaTest: source.alphaTest ?? 0,
    transparent: source.transparent ?? false,
    opacity: source.opacity ?? 1,
    side: source.side ?? THREE.FrontSide,
    maxAnisotropy: options.maxAnisotropy,
    repeatScale:
      options.repeatScale ??
      getUpholsteryTextureRepeat({ family: "kunstleder", context: "seat", zone: "side" }),
  });
}

// Compatibility wrapper while callers migrate to the explicit constructors.
export function createSeatMaterial(type, texture, options = {}) {
  const materialType = String(type ?? "").toUpperCase();

  if (materialType === "ALCANTARA") {
    return makeAlcantaraMaterial({
      map: texture,
      context: options.context,
      zone: options.zone,
      color: options.color ?? DEFAULT_BASE_COLOR,
      maxAnisotropy: options.maxAnisotropy,
      repeatScale: options.repeatScale,
    });
  }

  return makeKunstlederMaterial({
    map: texture,
    context: options.context,
    zone: options.zone,
    perforated: materialType === "PERFORATED",
    appearance: options.appearance,
    color: options.color ?? DEFAULT_BASE_COLOR,
    maxAnisotropy: options.maxAnisotropy,
    repeatScale: options.repeatScale,
  });
}
