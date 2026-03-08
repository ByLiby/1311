import * as THREE from "three";

function configureFabricTexture(texture, maxAnisotropy) {
  if (!(texture instanceof THREE.Texture)) {
    return;
  }

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  if (typeof maxAnisotropy === "number" && maxAnisotropy > 0) {
    texture.anisotropy = maxAnisotropy;
  }
  texture.needsUpdate = true;
}

// Creates seat material variants while keeping configuration centralized.
export function createSeatMaterial(type, texture, options = {}) {
  const materialType = String(type ?? "").toUpperCase();
  const { maxAnisotropy } = options;

  if (materialType === "ALCANTARA") {
    configureFabricTexture(texture, maxAnisotropy);

    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.95,
      metalness: 0,
      envMapIntensity: 0.15,
      color: new THREE.Color(0xffffff),
      normalMap: null,
      bumpMap: null,
      aoMap: null,
      roughnessMap: null,
      metalnessMap: null,
    });
  }

  if (materialType === "LEATHER") {
    const normalMap = texture?.userData?.normalMap instanceof THREE.Texture
      ? texture.userData.normalMap
      : null;

    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.6,
      metalness: 0.1,
      color: new THREE.Color(0xffffff),
      normalMap,
    });
  }

  // Default keeps extensibility for future types (fabric/carbon/plastic etc.).
  return new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.8,
    metalness: 0.05,
    color: new THREE.Color(0xffffff),
  });
}
