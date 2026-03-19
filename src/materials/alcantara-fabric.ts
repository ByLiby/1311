import * as THREE from "three";

export type AlcantaraFabricTextureSet = {
  textures: THREE.Texture[];
  colorTexture: THREE.DataTexture;
  heightTexture: THREE.DataTexture;
  responseTexture: THREE.DataTexture;
};

type AlcantaraFabricTextureOptions = {
  maxAnisotropy?: number;
  repeatScale?: number;
  size?: number;
};

function configureGeneratedTexture(
  texture: THREE.Texture,
  colorSpace: THREE.ColorSpace,
  repeatScale: number,
  maxAnisotropy: number,
) {
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatScale, repeatScale);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.flipY = false;
  texture.anisotropy = Math.max(1, maxAnisotropy);
  texture.needsUpdate = true;
}

function fract(value: number) {
  return value - Math.floor(value);
}

function hashNoise2d(x: number, y: number) {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123);
}

function smoothNoise2d(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const xf = x - x0;
  const yf = y - y0;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const n00 = hashNoise2d(x0, y0);
  const n10 = hashNoise2d(x0 + 1, y0);
  const n01 = hashNoise2d(x0, y0 + 1);
  const n11 = hashNoise2d(x0 + 1, y0 + 1);

  const nx0 = THREE.MathUtils.lerp(n00, n10, u);
  const nx1 = THREE.MathUtils.lerp(n01, n11, u);

  return THREE.MathUtils.lerp(nx0, nx1, v);
}

export function createAlcantaraFabricTextures({
  maxAnisotropy = 1,
  repeatScale = 9,
  size = 192,
}: AlcantaraFabricTextureOptions = {}): AlcantaraFabricTextureSet {
  const colorData = new Uint8Array(size * size * 4);
  const heightData = new Uint8Array(size * size * 4);
  const responseData = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      const drift = smoothNoise2d(u * 2.6 + 3.1, v * 2.6 + 8.4) - 0.5;
      const mottling = smoothNoise2d(u * 4.2 + 11.3, v * 4.2 + 2.1);
      const napShift = smoothNoise2d(u * 1.8 + 17.6, v * 1.8 + 6.5) - 0.5;
      const primaryFiber =
        0.5 + 0.5 * Math.sin((u * 0.82 + v * 0.31 + drift * 0.12) * Math.PI * 18);
      const crossFiber =
        0.5 + 0.5 * Math.sin((u * 0.16 - v * 0.78 - drift * 0.08) * Math.PI * 12);
      const nap = primaryFiber * 0.82 + crossFiber * 0.18;

      const albedo = THREE.MathUtils.clamp(
        0.972 + (nap - 0.5) * 0.009 + (mottling - 0.5) * 0.006 + napShift * 0.0035,
        0,
        1,
      );
      const height = THREE.MathUtils.clamp(
        0.5 + (nap - 0.5) * 0.006 + (mottling - 0.5) * 0.0025 + napShift * 0.0015,
        0,
        1,
      );
      const roughness = THREE.MathUtils.clamp(
        0.978 + (1 - nap) * 0.007 + Math.abs(napShift) * 0.003 + (mottling - 0.5) * 0.002,
        0,
        1,
      );
      const sheenRoughness = THREE.MathUtils.clamp(
        0.948 - (nap - 0.5) * 0.01 + (mottling - 0.5) * 0.004 + Math.abs(napShift) * 0.002,
        0,
        1,
      );

      const pixelIndex = (y * size + x) * 4;
      const albedoByte = Math.round(albedo * 255);
      const heightByte = Math.round(height * 255);
      const roughnessByte = Math.round(roughness * 255);
      const sheenByte = Math.round(sheenRoughness * 255);

      colorData[pixelIndex] = albedoByte;
      colorData[pixelIndex + 1] = albedoByte;
      colorData[pixelIndex + 2] = albedoByte;
      colorData[pixelIndex + 3] = 255;

      heightData[pixelIndex] = heightByte;
      heightData[pixelIndex + 1] = heightByte;
      heightData[pixelIndex + 2] = heightByte;
      heightData[pixelIndex + 3] = 255;

      responseData[pixelIndex] = roughnessByte;
      responseData[pixelIndex + 1] = roughnessByte;
      responseData[pixelIndex + 2] = roughnessByte;
      responseData[pixelIndex + 3] = sheenByte;
    }
  }

  const colorTexture = new THREE.DataTexture(colorData, size, size, THREE.RGBAFormat);
  const heightTexture = new THREE.DataTexture(heightData, size, size, THREE.RGBAFormat);
  const responseTexture = new THREE.DataTexture(responseData, size, size, THREE.RGBAFormat);

  configureGeneratedTexture(colorTexture, THREE.SRGBColorSpace, repeatScale, maxAnisotropy);
  configureGeneratedTexture(heightTexture, THREE.NoColorSpace, repeatScale, maxAnisotropy);
  configureGeneratedTexture(responseTexture, THREE.NoColorSpace, repeatScale, maxAnisotropy);

  return {
    textures: [colorTexture, heightTexture, responseTexture],
    colorTexture,
    heightTexture,
    responseTexture,
  };
}
