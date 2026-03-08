import * as THREE from "three";
import { MeshRegistry } from "./meshRegistry.js";
import { createSeatMaterial } from "../materials/materialFactory.js";

const ENABLE_SEAT_UV_DEBUG_MATERIAL = false;
const debugMaterial = new THREE.MeshStandardMaterial({
  color: 0x333333,
  roughness: 0.9,
  metalness: 0,
});

function disposeMaterialWithTextures(material, disposedTextures) {
  const textureKeys = [
    "map",
    "normalMap",
    "roughnessMap",
    "metalnessMap",
    "aoMap",
    "bumpMap",
    "alphaMap",
    "emissiveMap",
  ];

  textureKeys.forEach((key) => {
    const texture = material[key];
    if (!(texture instanceof THREE.Texture) || disposedTextures.has(texture)) {
      return;
    }

    disposedTextures.add(texture);
    texture.dispose();
  });

  material.dispose();
}

// Applies the selected seat material to all registered seat meshes.
export function changeSeatMaterial(type, texture, maxAnisotropy) {
  const material = ENABLE_SEAT_UV_DEBUG_MATERIAL
    ? debugMaterial
    : createSeatMaterial(type, texture, { maxAnisotropy });
  const disposedMaterials = new Set();
  const disposedTextures = new Set();

  MeshRegistry.seats.forEach((mesh) => {
    const currentMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    currentMaterials.forEach((currentMaterial) => {
      if (!currentMaterial || disposedMaterials.has(currentMaterial) || currentMaterial === material) {
        return;
      }

      disposedMaterials.add(currentMaterial);
      disposeMaterialWithTextures(currentMaterial, disposedTextures);
    });

    mesh.material = material;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  return material;
}
