import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

// Loads and configures a texture for physically-based material usage.
export function loadTexture(texturePath, renderer) {
  return new Promise((resolve, reject) => {
    textureLoader.load(
      texturePath,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        resolve(texture);
      },
      undefined,
      reject,
    );
  });
}
