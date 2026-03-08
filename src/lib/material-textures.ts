const DEFAULT_TEXTURE_PATH = "/textures/pu-classic-black.jpg";

const explicitTextureByMaterialId: Partial<Record<string, string>> = {
  "pu-classic-black": "/textures/pu-classic-black.jpg",
  "pu-classic-brown": "/textures/pu-brown.jpg",
  "pu-classic-white": "/textures/pu-cream.jpg",
  "pu-brown": "/textures/pu-brown.jpg",
  "pu-cream": "/textures/pu-cream.jpg",
  "alcantara-style": "/materials/alcantara-schwarz.jpg",
  "pu-classic-grain": "/textures/pu-classic-black.jpg",
};

const textureExtensions = ["jpg", "jpeg", "png", "webp", "avif", "svg"] as const;

export function getMaterialTextureCandidates(materialId: string) {
  const inferredCandidates = textureExtensions.map(
    (extension) => `/textures/${materialId}.${extension}`,
  );

  const explicitTexture = explicitTextureByMaterialId[materialId];
  const candidates = explicitTexture
    ? [explicitTexture, ...inferredCandidates]
    : inferredCandidates;

  return [...new Set([...candidates, DEFAULT_TEXTURE_PATH])];
}

export function getPreferredMaterialTexture(materialId: string) {
  return getMaterialTextureCandidates(materialId)[0];
}
