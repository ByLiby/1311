"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Environment, Html, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { cn } from "@/lib/utils";

const SEAT_MODEL_URL = "/models/NLM BMW M Seat.obj";
const TEXTURE_URLS = {
  leatherColor: "/textures/pu-classic-black.jpg",
  alcantaraColor: "/textures/alcantara.jpg",
  leatherNormal: "/textures/leather_normal.png",
  leatherRoughness: "/textures/leather_roughness.png",
  perforatedColor: "/textures/perforated.png",
  perforatedNormal: "/textures/perforated_normal.png",
  perforatedAlpha: "/models/car-seat/TEXTURES/perforated_alpha.png",
  plasticNormal: "/models/car-seat/TEXTURES/plastic_normal.png",
  stitchesColor: "/textures/stitches.png",
} as const;

type SeatMaterialVariant = "leather" | "alcantara" | "perforated";

type SeatViewerProps = {
  className?: string;
  materialVariant?: SeatMaterialVariant;
};

type SeatTextureSet = Record<keyof typeof TEXTURE_URLS, THREE.Texture>;

type SeatMaterialSet = {
  mainSurface: THREE.MeshStandardMaterial;
  centerSurface: THREE.MeshStandardMaterial;
  plastic: THREE.MeshStandardMaterial;
  buttons: THREE.MeshStandardMaterial;
  metal: THREE.MeshStandardMaterial;
  stitches: THREE.MeshStandardMaterial;
};

function logModelDebugData(model: THREE.Object3D) {
  const describeTexture = (texture: THREE.Texture) => {
    const sourceData = texture.source?.data as { src?: string; currentSrc?: string } | undefined;
    const src =
      texture.name ||
      sourceData?.currentSrc ||
      sourceData?.src ||
      texture.image?.currentSrc ||
      texture.image?.src ||
      "(no-src)";
    return `${texture.constructor.name} name="${texture.name || ""}" uuid=${texture.uuid} src=${src}`;
  };

  const loader = new OBJLoader();
  console.log("Loader used:", loader.constructor.name);

  console.log("MODEL STRUCTURE:");
  model.traverse((child) => {
    console.log("STRUCTURE:", child.type, child.name);
  });

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    const childMaterial = child.material;
    const materials = Array.isArray(childMaterial) ? childMaterial : [childMaterial];

    console.log("MESH:", child.name);
    console.log("MATERIAL:", childMaterial);

    materials.forEach((material, index) => {
      const materialLabel = Array.isArray(childMaterial)
        ? `${material.name || "(unnamed)"} [${index}]`
        : material.name || "(unnamed)";

      console.log("MATERIAL NAME:", materialLabel);

      const textureAwareMaterial = material as THREE.Material & {
        map?: THREE.Texture | null;
        normalMap?: THREE.Texture | null;
        roughnessMap?: THREE.Texture | null;
        alphaMap?: THREE.Texture | null;
      };

      if (textureAwareMaterial.map instanceof THREE.Texture) {
        console.log("BaseMap:", textureAwareMaterial.map);
        console.log("BaseMapSummary:", describeTexture(textureAwareMaterial.map));
      }
      if (textureAwareMaterial.normalMap instanceof THREE.Texture) {
        console.log("NormalMap:", textureAwareMaterial.normalMap);
        console.log("NormalMapSummary:", describeTexture(textureAwareMaterial.normalMap));
      }
      if (textureAwareMaterial.roughnessMap instanceof THREE.Texture) {
        console.log("RoughnessMap:", textureAwareMaterial.roughnessMap);
        console.log("RoughnessMapSummary:", describeTexture(textureAwareMaterial.roughnessMap));
      }
      if (textureAwareMaterial.alphaMap instanceof THREE.Texture) {
        console.log("AlphaMap:", textureAwareMaterial.alphaMap);
        console.log("AlphaMapSummary:", describeTexture(textureAwareMaterial.alphaMap));
      }
    });
  });
}

function configureTexture(
  texture: THREE.Texture,
  maxAnisotropy: number,
  options: { colorSpace?: THREE.ColorSpace } = {},
) {
  texture.colorSpace = options.colorSpace ?? THREE.NoColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
}

function createSeatMaterials(
  materialVariant: SeatMaterialVariant,
  textures: SeatTextureSet,
  maxAnisotropy: number,
) {
  const isAlcantara = materialVariant === "alcantara";

  configureTexture(textures.leatherColor, maxAnisotropy, { colorSpace: THREE.SRGBColorSpace });
  configureTexture(textures.alcantaraColor, maxAnisotropy, { colorSpace: THREE.SRGBColorSpace });
  configureTexture(textures.leatherNormal, maxAnisotropy);
  configureTexture(textures.leatherRoughness, maxAnisotropy);
  configureTexture(textures.perforatedColor, maxAnisotropy, { colorSpace: THREE.SRGBColorSpace });
  configureTexture(textures.perforatedNormal, maxAnisotropy);
  configureTexture(textures.perforatedAlpha, maxAnisotropy);
  configureTexture(textures.plasticNormal, maxAnisotropy);
  configureTexture(textures.stitchesColor, maxAnisotropy, { colorSpace: THREE.SRGBColorSpace });

  const mainSurface = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    map: isAlcantara ? textures.alcantaraColor : textures.leatherColor,
    normalMap: textures.leatherNormal,
    roughnessMap: textures.leatherRoughness,
    roughness: isAlcantara ? 0.9 : 0.74,
    metalness: isAlcantara ? 0 : 0.05,
    envMapIntensity: isAlcantara ? 0.15 : 0.3,
  });

  const centerSurface = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    map: textures.perforatedColor,
    alphaMap: textures.perforatedAlpha,
    normalMap: textures.perforatedNormal,
    roughnessMap: textures.leatherRoughness,
    transparent: true,
    alphaTest: 0.3,
    roughness: 0.9,
    metalness: 0.02,
    envMapIntensity: 0.22,
  });

  const plastic = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x111214),
    normalMap: textures.plasticNormal,
    roughness: 0.84,
    metalness: 0.04,
    envMapIntensity: 0.2,
  });

  const buttons = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x252525),
    normalMap: textures.plasticNormal,
    roughness: 0.72,
    metalness: 0.08,
    envMapIntensity: 0.24,
  });

  const metal = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x666a70),
    roughness: 0.36,
    metalness: 0.9,
    envMapIntensity: 0.5,
  });

  const stitches = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isAlcantara ? 0x111111 : 0xf1f1f1),
    map: isAlcantara ? textures.alcantaraColor : textures.stitchesColor,
    alphaMap: isAlcantara ? null : textures.stitchesColor,
    transparent: !isAlcantara,
    alphaTest: isAlcantara ? 0 : 0.25,
    roughness: isAlcantara ? 0.9 : 0.92,
    metalness: 0,
  });

  return {
    mainSurface,
    centerSurface,
    plastic,
    buttons,
    metal,
    stitches,
  } satisfies SeatMaterialSet;
}

function resolveMaterialByName(sourceMaterial: THREE.Material, seatMaterials: SeatMaterialSet) {
  if (!sourceMaterial?.name) {
    return sourceMaterial;
  }

  const name = sourceMaterial.name.toLowerCase();

  if (name.includes("plastic")) {
    return seatMaterials.plastic;
  }
  if (name.includes("button")) {
    return seatMaterials.buttons;
  }
  if (name.includes("perforated")) {
    return seatMaterials.centerSurface;
  }
  if (name.includes("leather") || name.includes("black")) {
    return seatMaterials.mainSurface;
  }
  if (name.includes("metal")) {
    return seatMaterials.metal;
  }
  if (name.includes("stich") || name.includes("stitch")) {
    return seatMaterials.stitches;
  }

  return sourceMaterial;
}

function SeatMesh({ materialVariant }: { materialVariant: SeatMaterialVariant }) {
  const sourceSeat = useLoader(OBJLoader, SEAT_MODEL_URL);
  const textures = useTexture(TEXTURE_URLS) as SeatTextureSet;
  const renderer = useThree((state) => state.gl);
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

  const seatMaterials = useMemo(
    () => createSeatMaterials(materialVariant, textures, maxAnisotropy),
    [materialVariant, textures, maxAnisotropy],
  );

  useEffect(() => {
    return () => {
      new Set(Object.values(seatMaterials)).forEach((material) => material.dispose());
    };
  }, [seatMaterials]);

  const model = useMemo(() => {
    const clone = sourceSeat.clone(true);
    const initialBounds = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    initialBounds.getCenter(center);
    initialBounds.getSize(size);

    const maxDimension = Math.max(size.x, size.y, size.z);
    if (maxDimension > 0.0001) {
      clone.scale.setScalar(2.3 / maxDimension);
    }
    clone.position.sub(center);
    clone.updateMatrixWorld(true);

    logModelDebugData(clone);

    clone.traverse((node) => {
      if (!(node as THREE.Mesh).isMesh) {
        return;
      }

      const mesh = node as THREE.Mesh;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const mappedMaterials = materials.map((material) => resolveMaterialByName(material, seatMaterials));
      mappedMaterials.forEach((material) => {
        material.needsUpdate = true;
      });
      mesh.material = mappedMaterials.length === 1 ? mappedMaterials[0] : mappedMaterials;

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    return clone;
  }, [seatMaterials, sourceSeat]);

  return <primitive object={model} />;
}

function SeatFallback() {
  return (
    <Html center>
      <div className="rounded-md border border-white/10 bg-black/45 px-3 py-1 text-xs text-white/80">
        Loading seat...
      </div>
    </Html>
  );
}

export default function SeatViewer({ className, materialVariant = "leather" }: SeatViewerProps) {
  return (
    <div
      className={cn(
        "relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-2xl border border-divider/70 bg-[radial-gradient(circle_at_16%_20%,rgba(74,86,110,0.26),transparent_40%),radial-gradient(circle_at_78%_82%,rgba(176,148,106,0.12),transparent_44%),linear-gradient(160deg,#06090f_0%,#090f16_44%,#0a1017_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.4;
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[5, 5, 5]}
          intensity={2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 3, -5]} intensity={1} />
        <Environment preset="studio" />

        <Suspense fallback={<SeatFallback />}>
          <group rotation={[0, Math.PI, 0]}>
            <SeatMesh materialVariant={materialVariant} />
          </group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]} receiveShadow>
            <planeGeometry args={[8, 8]} />
            <shadowMaterial opacity={0.28} />
          </mesh>
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.55}
          zoomSpeed={0.75}
          minDistance={1.2}
          maxDistance={4.3}
          target={[0, 0.15, 0]}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI - 0.35}
        />
      </Canvas>
    </div>
  );
}

useLoader.preload(OBJLoader, SEAT_MODEL_URL);
useTexture.preload(Object.values(TEXTURE_URLS));
