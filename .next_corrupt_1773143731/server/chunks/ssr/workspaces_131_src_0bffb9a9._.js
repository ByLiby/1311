module.exports = [
"[project]/workspaces/131/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/workspaces/131/src/components/SeatViewer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeatViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/three/examples/jsm/controls/OrbitControls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/three/examples/jsm/loaders/RGBELoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const upholsteryMaterialKeywords = [
    "leather",
    "perforated",
    "upholstery",
    "alcantara",
    "vinyl",
    "fabric",
    "cushion",
    "suede",
    "microfiber"
];
const excludedUpholsteryKeywords = [
    "plastic",
    "metal",
    "button",
    "stitch",
    "stiches",
    "frame",
    "trim_hard"
];
const centerSurfaceKeywords = [
    "center",
    "middle",
    "inner",
    "insert",
    "inlay",
    "panel",
    "hex",
    "perforated",
    "perforated_seats",
    "quilt",
    "mittel",
    "innen"
];
const sideSurfaceKeywords = [
    "side",
    "outer",
    "bolster",
    "headrest",
    "head",
    "wing",
    "shell",
    "trim",
    "edge",
    "frame",
    "leather_main",
    "leather_black",
    "black",
    "wange",
    "seiten"
];
const defaultTextureByVariant = {
    leather: "/materials/hex-leather.jpg",
    alcantara: "/materials/alcantara_black.jpg",
    perforated: "/textures/perforated.png"
};
const BLACK_PU_TEXTURE_URL = "/textures/pu-classic-black.jpg";
const BROWN_PU_TEXTURE_URL = "/textures/pu-classic-brown.jpg";
const WHITE_PU_TEXTURE_URL = "/textures/pu-classic-white.jpg";
const BROWN_LEATHER_TEXTURE_URL = "/materials/brown-leather.png";
const BROWN_LEATHER_NORMAL_URL = "/materials/leder-normal.jpg";
const BROWN_LEATHER_ROUGHNESS_URL = "/materials/hex-leather-roughness.jpg";
const HEX_LEATHER_TEXTURE_URL = "/materials/hex-leather.jpg";
const HEX_LEATHER_NORMAL_URL = "/materials/hex-leather-normal.jpg";
const HEX_LEATHER_ROUGHNESS_URL = "/materials/hex-leather-roughness.jpg";
const ALCANTARA_TEXTURE_URL = "/materials/alcantara_black.jpg";
const PERFORATED_TEXTURE_URL = "/textures/perforated.png";
const PERFORATED_NORMAL_URL = "/textures/perforated_normal.png";
const STITCH_TEXTURE_URL = "/textures/stitches.png";
const SEAT_ROUGHNESS_MAP_URL = "/textures/leather_roughness.png";
const HDR_ENV_MAP_URL = "/hdr/luxury-studio.hdr";
const PREMIUM_CENTER_INSERT_STYLE = "dark-alcantara";
const PREMIUM_CAMERA_POSITION = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1.3, 1.0, 2.4);
const PREMIUM_CAMERA_LOOK_AT = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
const PREMIUM_CONTROLS_TARGET = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
const ENABLE_CENTER_PANEL_UV_WARP = false;
const materialTextureKeys = [
    "map",
    "normalMap",
    "roughnessMap",
    "metalnessMap",
    "aoMap",
    "emissiveMap",
    "alphaMap",
    "bumpMap",
    "specularMap"
];
const availableTextureCache = new Set();
const unavailableTextureCache = new Set();
function getMaterialResponse(variant) {
    if (variant === "alcantara") {
        return {
            roughness: 0.95,
            metalness: 0.0,
            envMapIntensity: 0.15,
            normalStrength: 0.0,
            bumpStrength: 0.0,
            textureRepeat: 12
        };
    }
    if (variant === "perforated") {
        return {
            roughness: 0.64,
            metalness: 0.05,
            envMapIntensity: 0.24,
            normalStrength: 0.28,
            bumpStrength: 0.0,
            textureRepeat: 2
        };
    }
    return {
        roughness: 0.9,
        metalness: 0.02,
        envMapIntensity: 0.26,
        normalStrength: 0.6,
        bumpStrength: 0.0,
        textureRepeat: 6
    };
}
function uniq(values) {
    return Array.from(new Set(values.filter((value)=>{
        return Boolean(value && value.trim().length > 0);
    })));
}
function normalizeTextureUrl(textureUrl) {
    if (!textureUrl) {
        return null;
    }
    const raw = textureUrl.trim();
    if (!raw || raw.startsWith("data:")) {
        return null;
    }
    if (raw.startsWith("blob:")) {
        return raw;
    }
    try {
        const parsed = new URL(raw, window.location.origin);
        if (parsed.origin === window.location.origin) {
            return `${parsed.pathname}${parsed.search}`;
        }
        return parsed.href;
    } catch  {
        return raw;
    }
}
function extractBackgroundImageUrl(backgroundImage) {
    const match = backgroundImage.match(/url\((["']?)(.*?)\1\)/i);
    return normalizeTextureUrl(match?.[2] ?? null);
}
function extractImageElementUrl(element) {
    const imageElement = element.querySelector("img");
    if (!imageElement) {
        return null;
    }
    return normalizeTextureUrl(imageElement.currentSrc || imageElement.src || null);
}
function readSelectedTextureFromUi(root) {
    const activeButtons = root.querySelectorAll('button[aria-pressed="true"]');
    for (const button of activeButtons){
        const swatch = button.querySelector('[style*="background-image"]');
        const backgroundImage = swatch ? swatch.style.backgroundImage || window.getComputedStyle(swatch).backgroundImage : "";
        const selectedTextureUrl = extractBackgroundImageUrl(backgroundImage) || extractImageElementUrl(button);
        if (selectedTextureUrl) {
            return selectedTextureUrl;
        }
    }
    return null;
}
function isSeatSurfaceMaterial(mesh, material) {
    const materialName = material.name.toLowerCase();
    if (excludedUpholsteryKeywords.some((keyword)=>materialName.includes(keyword))) {
        return false;
    }
    if (upholsteryMaterialKeywords.some((keyword)=>materialName.includes(keyword))) {
        return true;
    }
    const meshName = mesh.name.toLowerCase();
    return meshName.includes("seat") && !excludedUpholsteryKeywords.some((keyword)=>materialName.includes(keyword));
}
function replaceMeshMaterialAtIndex(mesh, materialIndex, nextMaterial) {
    const currentMaterials = Array.isArray(mesh.material) ? [
        ...mesh.material
    ] : [
        mesh.material
    ];
    currentMaterials[materialIndex] = nextMaterial;
    mesh.material = currentMaterials.length === 1 ? currentMaterials[0] : currentMaterials;
}
function applySeatMaterialAssignmentsToModel(model, assignments) {
    if (!model || assignments.length === 0) {
        return;
    }
    const assignmentMap = new Map();
    assignments.forEach(({ mesh, materialIndex, material })=>{
        const mapForMesh = assignmentMap.get(mesh) ?? new Map();
        mapForMesh.set(materialIndex, material);
        assignmentMap.set(mesh, mapForMesh);
    });
    model.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"])) {
            return;
        }
        const materialAssignments = assignmentMap.get(child);
        if (!materialAssignments) {
            return;
        }
        const nextMaterials = Array.isArray(child.material) ? [
            ...child.material
        ] : [
            child.material
        ];
        materialAssignments.forEach((material, index)=>{
            nextMaterials[index] = material;
        });
        child.material = nextMaterials.length === 1 ? nextMaterials[0] : nextMaterials;
    });
}
function captureMeshMaterialSnapshots(model) {
    const snapshots = [];
    if (!model) {
        return snapshots;
    }
    model.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"])) {
            return;
        }
        const materials = Array.isArray(child.material) ? [
            ...child.material
        ] : [
            child.material
        ];
        snapshots.push({
            mesh: child,
            materials
        });
    });
    return snapshots;
}
function restoreMeshMaterialSnapshots(snapshots) {
    snapshots.forEach(({ mesh, materials })=>{
        mesh.material = materials.length === 1 ? materials[0] : [
            ...materials
        ];
    });
}
function applyMaterialToAllSeatMeshes(model, seatMaterial) {
    if (!model) {
        return;
    }
    model.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"])) {
            return;
        }
        child.material = seatMaterial;
    });
}
function ensureMeshStandardMaterial(material) {
    if (material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]) {
        return material;
    }
    const source = material;
    const standardMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: source.color instanceof __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"] ? source.color.clone() : new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0xffffff),
        roughness: typeof source.roughness === "number" ? source.roughness : 0.78,
        metalness: typeof source.metalness === "number" ? source.metalness : 0.06,
        envMapIntensity: 0.3,
        transparent: Boolean(source.transparent),
        opacity: typeof source.opacity === "number" ? source.opacity : 1,
        side: source.side ?? __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FrontSide"]
    });
    standardMaterial.name = material.name;
    return standardMaterial;
}
function configureTexture(texture, renderer, colorSpace, repeatScale = 3) {
    texture.colorSpace = colorSpace;
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    texture.repeat.set(repeatScale, repeatScale);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.flipY = false;
    texture.needsUpdate = true;
}
function loadTexture(textureLoader, textureUrl, renderer, colorSpace, repeatScale = 3) {
    return new Promise((resolve, reject)=>{
        textureLoader.load(textureUrl, (texture)=>{
            configureTexture(texture, renderer, colorSpace, repeatScale);
            resolve(texture);
        }, undefined, reject);
    });
}
async function loadFirstAvailableTexture(textureLoader, textureCandidates, renderer, colorSpace, repeatScale = 3) {
    const prioritizedCandidates = [
        ...textureCandidates.filter((candidate)=>availableTextureCache.has(candidate)),
        ...textureCandidates.filter((candidate)=>!availableTextureCache.has(candidate))
    ];
    for (const textureCandidate of prioritizedCandidates){
        if (unavailableTextureCache.has(textureCandidate)) {
            continue;
        }
        try {
            const loadedTexture = await loadTexture(textureLoader, textureCandidate, renderer, colorSpace, repeatScale);
            availableTextureCache.add(textureCandidate);
            return loadedTexture;
        } catch  {
            unavailableTextureCache.add(textureCandidate);
        }
    }
    return null;
}
function buildColorTextureCandidates(selectedTextureUrl) {
    return uniq([
        selectedTextureUrl,
        HEX_LEATHER_TEXTURE_URL,
        BLACK_PU_TEXTURE_URL
    ]);
}
function isBlackPuTexture(textureUrl) {
    return textureUrl.split("?")[0] === BLACK_PU_TEXTURE_URL;
}
function isBrownLeatherSelection(textureUrl) {
    const normalizedTextureUrl = textureUrl.split("?")[0].toLowerCase();
    return normalizedTextureUrl === BROWN_PU_TEXTURE_URL || normalizedTextureUrl === "/textures/pu-brown.jpg" || normalizedTextureUrl === BROWN_LEATHER_TEXTURE_URL;
}
function buildLeatherTextureCandidates(selectedTextureUrl) {
    const resolvedPrimaryTexture = isBlackPuTexture(selectedTextureUrl) ? HEX_LEATHER_TEXTURE_URL : selectedTextureUrl;
    return uniq([
        resolvedPrimaryTexture,
        HEX_LEATHER_TEXTURE_URL,
        selectedTextureUrl,
        BLACK_PU_TEXTURE_URL
    ]);
}
function buildBrownLeatherTextureCandidates() {
    return uniq([
        BROWN_LEATHER_TEXTURE_URL,
        BROWN_PU_TEXTURE_URL,
        "/textures/pu-brown.jpg"
    ]);
}
function buildBrownBolsterLeatherTextureCandidates() {
    return uniq([
        BROWN_LEATHER_TEXTURE_URL
    ]);
}
function buildSmoothPuTextureCandidates(selectedTextureUrl) {
    const normalizedSelectedTexture = selectedTextureUrl.toLowerCase();
    const preferredPuTexture = normalizedSelectedTexture.includes("brown") ? BROWN_PU_TEXTURE_URL : normalizedSelectedTexture.includes("white") || normalizedSelectedTexture.includes("cream") ? WHITE_PU_TEXTURE_URL : BLACK_PU_TEXTURE_URL;
    return uniq([
        preferredPuTexture,
        BLACK_PU_TEXTURE_URL,
        BROWN_PU_TEXTURE_URL,
        WHITE_PU_TEXTURE_URL
    ]);
}
function buildLeatherNormalCandidates() {
    return uniq([
        HEX_LEATHER_NORMAL_URL,
        "/materials/leder-normal.jpg",
        "/textures/leather_normal.png",
        "/models/car-seat/TEXTURES/leather_normal.png"
    ]);
}
function buildBrownLeatherNormalCandidates() {
    return uniq([
        BROWN_LEATHER_NORMAL_URL,
        HEX_LEATHER_NORMAL_URL,
        "/textures/leather_normal.png"
    ]);
}
function buildLeatherRoughnessCandidates() {
    return uniq([
        HEX_LEATHER_ROUGHNESS_URL,
        SEAT_ROUGHNESS_MAP_URL
    ]);
}
function buildBrownLeatherRoughnessCandidates() {
    return uniq([
        BROWN_LEATHER_ROUGHNESS_URL,
        HEX_LEATHER_ROUGHNESS_URL,
        SEAT_ROUGHNESS_MAP_URL
    ]);
}
function buildDarkAlcantaraTextureCandidates() {
    return uniq([
        ALCANTARA_TEXTURE_URL,
        "/textures/alcantara-style.jpg",
        "/textures/alcantara.jpg"
    ]);
}
function buildPerforatedTextureCandidates() {
    return uniq([
        PERFORATED_TEXTURE_URL,
        HEX_LEATHER_TEXTURE_URL,
        BROWN_LEATHER_TEXTURE_URL
    ]);
}
function buildPerforatedNormalCandidates() {
    return uniq([
        PERFORATED_NORMAL_URL,
        HEX_LEATHER_NORMAL_URL,
        BROWN_LEATHER_NORMAL_URL
    ]);
}
function buildStitchTextureCandidates() {
    return uniq([
        STITCH_TEXTURE_URL
    ]);
}
function getPremiumCenterInsertTextureConfig(style) {
    if (style === "light-leather") {
        return {
            colorCandidates: buildBrownLeatherTextureCandidates(),
            normalCandidates: buildBrownLeatherNormalCandidates(),
            roughnessCandidates: buildBrownLeatherRoughnessCandidates(),
            repeat: 6,
            color: 0xf2ebe1,
            roughness: 0.65,
            metalness: 0.02,
            envMapIntensity: 0.6,
            normalStrength: 0.8
        };
    }
    if (style === "perforated") {
        return {
            colorCandidates: buildPerforatedTextureCandidates(),
            normalCandidates: buildPerforatedNormalCandidates(),
            roughnessCandidates: buildLeatherRoughnessCandidates(),
            repeat: 6,
            color: 0xddd5ca,
            roughness: 0.68,
            metalness: 0.02,
            envMapIntensity: 0.58,
            normalStrength: 0.8
        };
    }
    return {
        colorCandidates: buildDarkAlcantaraTextureCandidates(),
        normalCandidates: [],
        roughnessCandidates: [
            SEAT_ROUGHNESS_MAP_URL
        ],
        repeat: 6,
        color: 0xbab0a1,
        roughness: 0.86,
        metalness: 0.01,
        envMapIntensity: 0.16,
        normalStrength: 0.14
    };
}
function classifySeatSurfaceZone(mesh, material, seatCenterX, seatHalfWidth) {
    const materialName = material.name.toLowerCase();
    if (materialName.includes("perforated")) {
        return "center";
    }
    if (materialName.includes("leather_main") || materialName.includes("leather_black") || materialName === "black") {
        return "side";
    }
    const signature = `${mesh.name} ${material.name}`.toLowerCase();
    if (centerSurfaceKeywords.some((keyword)=>signature.includes(keyword))) {
        return "center";
    }
    if (sideSurfaceKeywords.some((keyword)=>signature.includes(keyword))) {
        return "side";
    }
    const meshBounds = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(mesh);
    const meshCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
    meshBounds.getCenter(meshCenter);
    const lateralOffset = Math.abs(meshCenter.x - seatCenterX);
    return lateralOffset > seatHalfWidth * 0.24 ? "side" : "center";
}
function applyCenterPanelUvWarp(mesh, centerMaterialIndices, seatMinY, seatHeight) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const sourceGeometry = undefined;
    const sourceUv = undefined;
    const sourcePosition = undefined;
    const geometry = undefined;
    const uv = undefined;
    const position = undefined;
    const index = undefined;
    const groups = undefined;
    const affectedVertexIndices = undefined;
    const localPosition = undefined;
    const worldPosition = undefined;
    const safeSeatHeight = undefined;
}
function disposeTextureSet(textures) {
    if (!textures) {
        return;
    }
    const uniqueTextures = new Set(textures.textures);
    uniqueTextures.forEach((texture)=>{
        texture.dispose();
    });
}
function disposeModel(root) {
    root.traverse((node)=>{
        if (!(node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"])) {
            return;
        }
        node.geometry.dispose();
        const materials = Array.isArray(node.material) ? node.material : [
            node.material
        ];
        materials.forEach((material)=>{
            const textureAwareMaterial = material;
            materialTextureKeys.forEach((key)=>{
                const texture = textureAwareMaterial[key];
                if (texture) {
                    texture.dispose();
                }
            });
            material.dispose();
        });
    });
}
function SeatViewer({ className, materialVariant = "leather" }) {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lightRigRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const seatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const seatMaterialsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const seatMaterialAssignmentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const meshMaterialSnapshotsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const textureLoaderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeTexturesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textureRequestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const selectedTextureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(defaultTextureByVariant[materialVariant]);
    const materialVariantRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(materialVariant);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [selectedTextureUrl, setSelectedTextureUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultTextureByVariant[materialVariant]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        selectedTextureRef.current = selectedTextureUrl;
    }, [
        selectedTextureUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        materialVariantRef.current = materialVariant;
    }, [
        materialVariant
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mountNode = mountRef.current;
        if (!mountNode) {
            return;
        }
        const selectionScope = mountNode.closest(".space-y-6") ?? mountNode.parentElement ?? document.body;
        const syncSelectedTexture = ()=>{
            const fromUi = readSelectedTextureFromUi(selectionScope);
            const fallbackTexture = defaultTextureByVariant[materialVariant];
            const nextTexture = fromUi ?? fallbackTexture;
            setSelectedTextureUrl((currentTexture)=>{
                return currentTexture === nextTexture ? currentTexture : nextTexture;
            });
        };
        syncSelectedTexture();
        const observer = new MutationObserver(()=>{
            syncSelectedTexture();
        });
        observer.observe(selectionScope, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: [
                "aria-pressed",
                "style"
            ]
        });
        const handleClick = ()=>{
            window.requestAnimationFrame(syncSelectedTexture);
        };
        selectionScope.addEventListener("click", handleClick);
        return ()=>{
            observer.disconnect();
            selectionScope.removeEventListener("click", handleClick);
        };
    }, [
        materialVariant
    ]);
    const applySelectedMaterialTextures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (nextTextureUrl)=>{
        const renderer = rendererRef.current;
        const seatMaterials = seatMaterialsRef.current;
        const seatMaterialAssignments = seatMaterialAssignmentsRef.current;
        if (!renderer || seatMaterials.length === 0 || seatMaterialAssignments.length === 0) {
            return;
        }
        const textureLoader = textureLoaderRef.current ?? new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]();
        textureLoaderRef.current = textureLoader;
        const variant = materialVariantRef.current;
        const isAlcantara = variant === "alcantara";
        const isLeather = variant === "leather";
        const materialResponse = getMaterialResponse(variant);
        const lightRig = lightRigRef.current;
        if (!isAlcantara) {
            restoreMeshMaterialSnapshots(meshMaterialSnapshotsRef.current);
        }
        const requestId = ++textureRequestIdRef.current;
        if (isLeather) {
            const useBrownLeatherConfig = isBrownLeatherSelection(nextTextureUrl);
            if (useBrownLeatherConfig) {
                const centerInsertConfig = getPremiumCenterInsertTextureConfig(PREMIUM_CENTER_INSERT_STYLE);
                const sideRepeat = 6;
                const [centerColorTexture, centerNormalTexture, centerRoughnessTexture, sideColorTexture, sideNormalTexture, sideRoughnessTexture, stitchTexture] = await Promise.all([
                    loadFirstAvailableTexture(textureLoader, centerInsertConfig.colorCandidates, renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"], centerInsertConfig.repeat),
                    loadFirstAvailableTexture(textureLoader, centerInsertConfig.normalCandidates, renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], centerInsertConfig.repeat),
                    loadFirstAvailableTexture(textureLoader, centerInsertConfig.roughnessCandidates, renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], centerInsertConfig.repeat),
                    loadFirstAvailableTexture(textureLoader, buildBrownBolsterLeatherTextureCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"], sideRepeat),
                    loadFirstAvailableTexture(textureLoader, buildBrownLeatherNormalCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], sideRepeat),
                    loadFirstAvailableTexture(textureLoader, buildBrownLeatherRoughnessCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], sideRepeat),
                    loadFirstAvailableTexture(textureLoader, buildStitchTextureCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], 2.4)
                ]);
                if (!centerColorTexture || !sideColorTexture) {
                    return;
                }
                [
                    centerColorTexture,
                    centerNormalTexture,
                    centerRoughnessTexture
                ].filter((texture)=>Boolean(texture)).forEach((texture)=>{
                    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    texture.repeat.set(6, 6);
                    texture.needsUpdate = true;
                });
                [
                    sideColorTexture,
                    sideNormalTexture,
                    sideRoughnessTexture
                ].filter((texture)=>Boolean(texture)).forEach((texture)=>{
                    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    texture.repeat.set(6, 6);
                    texture.needsUpdate = true;
                });
                if (stitchTexture) {
                    stitchTexture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    stitchTexture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    stitchTexture.repeat.set(2.2, 2.2);
                    stitchTexture.needsUpdate = true;
                }
                const nextTextures = [
                    centerColorTexture,
                    centerNormalTexture,
                    centerRoughnessTexture,
                    sideColorTexture,
                    sideNormalTexture,
                    sideRoughnessTexture,
                    stitchTexture
                ].filter((texture)=>Boolean(texture));
                if (requestId !== textureRequestIdRef.current) {
                    disposeTextureSet({
                        textures: nextTextures
                    });
                    return;
                }
                const previousTextures = activeTexturesRef.current;
                activeTexturesRef.current = {
                    textures: nextTextures
                };
                seatMaterialAssignments.forEach(({ material, zone })=>{
                    const isCenterZone = zone === "center";
                    material.map = isCenterZone ? centerColorTexture : sideColorTexture;
                    material.normalMap = isCenterZone ? centerNormalTexture ?? null : sideNormalTexture ?? centerNormalTexture;
                    material.roughnessMap = isCenterZone ? centerRoughnessTexture ?? null : sideRoughnessTexture ?? centerRoughnessTexture;
                    material.bumpMap = stitchTexture ?? null;
                    material.bumpScale = stitchTexture ? isCenterZone ? 0.01 : 0.008 : 0;
                    material.emissiveMap = isCenterZone ? stitchTexture ?? null : null;
                    material.emissive.setHex(isCenterZone ? 0xd1bea0 : 0x000000);
                    material.emissiveIntensity = isCenterZone && stitchTexture ? 0.09 : 0;
                    material.normalScale.set(isCenterZone ? centerInsertConfig.normalStrength : 0.8, isCenterZone ? centerInsertConfig.normalStrength : 0.8);
                    material.roughness = isCenterZone ? centerInsertConfig.roughness : 0.65;
                    material.metalness = isCenterZone ? centerInsertConfig.metalness : 0.02;
                    material.envMapIntensity = isCenterZone ? centerInsertConfig.envMapIntensity : 0.6;
                    material.color.setHex(isCenterZone ? centerInsertConfig.color : 0xffffff);
                    material.needsUpdate = true;
                });
                applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignments);
                if (lightRig) {
                    lightRig.ambient.intensity = 0.3;
                    lightRig.key.intensity = 1.4;
                    lightRig.fill.intensity = 0.5;
                    lightRig.rim.intensity = 0.45;
                    renderer.toneMappingExposure = 1.1;
                }
                disposeTextureSet(previousTextures);
                return;
            }
            const centerRepeat = 6;
            const sideRepeat = 6;
            const centerColorTexture = await loadFirstAvailableTexture(textureLoader, buildLeatherTextureCandidates(nextTextureUrl), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"], centerRepeat);
            if (!centerColorTexture) {
                return;
            }
            const [centerNormalTexture, centerRoughnessTexture, sideColorTexture, sideNormalTexture, sideRoughnessTexture] = await Promise.all([
                loadFirstAvailableTexture(textureLoader, buildLeatherNormalCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], centerRepeat),
                loadFirstAvailableTexture(textureLoader, buildLeatherRoughnessCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], centerRepeat),
                loadFirstAvailableTexture(textureLoader, buildSmoothPuTextureCandidates(nextTextureUrl), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"], sideRepeat),
                loadFirstAvailableTexture(textureLoader, buildLeatherNormalCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], sideRepeat),
                loadFirstAvailableTexture(textureLoader, buildLeatherRoughnessCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], sideRepeat)
            ]);
            [
                centerColorTexture,
                centerNormalTexture,
                centerRoughnessTexture
            ].filter((texture)=>Boolean(texture)).forEach((texture)=>{
                texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                texture.repeat.set(6, 6);
                texture.needsUpdate = true;
            });
            [
                sideColorTexture,
                sideNormalTexture,
                sideRoughnessTexture
            ].filter((texture)=>Boolean(texture)).forEach((texture)=>{
                texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                texture.repeat.set(6, 6);
                texture.needsUpdate = true;
            });
            const nextTextures = [
                centerColorTexture,
                centerNormalTexture,
                centerRoughnessTexture,
                sideColorTexture,
                sideNormalTexture,
                sideRoughnessTexture
            ].filter((texture)=>Boolean(texture));
            if (requestId !== textureRequestIdRef.current) {
                disposeTextureSet({
                    textures: nextTextures
                });
                return;
            }
            const previousTextures = activeTexturesRef.current;
            activeTexturesRef.current = {
                textures: nextTextures
            };
            seatMaterialAssignments.forEach(({ material, zone })=>{
                const zoneColorTexture = zone === "center" ? centerColorTexture : sideColorTexture ?? centerColorTexture;
                const zoneNormalTexture = zone === "center" ? centerNormalTexture : sideNormalTexture ?? centerNormalTexture;
                const zoneRoughnessTexture = zone === "center" ? centerRoughnessTexture : sideRoughnessTexture ?? centerRoughnessTexture;
                material.map = zoneColorTexture;
                material.normalMap = zoneNormalTexture ?? null;
                material.roughnessMap = zoneRoughnessTexture ?? null;
                material.emissiveMap = null;
                material.emissive.setHex(0x000000);
                material.emissiveIntensity = 0;
                material.bumpMap = null;
                material.bumpScale = 0;
                material.normalScale.set(0.8, 0.8);
                material.roughness = 0.65;
                material.metalness = 0.02;
                material.envMapIntensity = 0.6;
                material.color.setHex(0xffffff);
                material.needsUpdate = true;
            });
            applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignments);
            if (lightRig) {
                lightRig.ambient.intensity = 0.3;
                lightRig.key.intensity = 1.4;
                lightRig.fill.intensity = 0.5;
                lightRig.rim.intensity = 0.45;
                renderer.toneMappingExposure = 1.1;
            }
            disposeTextureSet(previousTextures);
            return;
        }
        const colorTexture = await loadFirstAvailableTexture(textureLoader, isAlcantara ? [
            ALCANTARA_TEXTURE_URL
        ] : buildColorTextureCandidates(nextTextureUrl), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"], materialResponse.textureRepeat);
        if (!colorTexture) {
            return;
        }
        if (isAlcantara) {
            const texture = colorTexture;
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            texture.repeat.set(12, 12);
            texture.needsUpdate = true;
        }
        const [normalTexture, roughnessTexture] = await Promise.all([
            isAlcantara ? Promise.resolve(null) : loadFirstAvailableTexture(textureLoader, buildLeatherNormalCandidates(), renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], materialResponse.textureRepeat),
            isAlcantara ? Promise.resolve(null) : loadFirstAvailableTexture(textureLoader, [
                SEAT_ROUGHNESS_MAP_URL
            ], renderer, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"], materialResponse.textureRepeat)
        ]);
        const nextTextures = [
            colorTexture,
            normalTexture,
            roughnessTexture
        ].filter((texture)=>Boolean(texture));
        if (requestId !== textureRequestIdRef.current) {
            disposeTextureSet({
                textures: nextTextures
            });
            return;
        }
        const previousTextures = activeTexturesRef.current;
        activeTexturesRef.current = {
            textures: nextTextures
        };
        const alcantaraTexture = isAlcantara ? colorTexture : null;
        seatMaterials.forEach((material)=>{
            const seatMaterial = material;
            if (alcantaraTexture) {
                seatMaterial.map = alcantaraTexture;
                seatMaterial.needsUpdate = true;
            } else {
                seatMaterial.map = colorTexture;
            }
            seatMaterial.normalMap = isAlcantara ? null : normalTexture ?? null;
            seatMaterial.roughnessMap = isAlcantara ? null : roughnessTexture ?? null;
            seatMaterial.emissiveMap = null;
            seatMaterial.emissive.setHex(0x000000);
            seatMaterial.emissiveIntensity = 0;
            seatMaterial.bumpMap = null;
            seatMaterial.bumpScale = 0;
            seatMaterial.normalScale.set(isAlcantara ? 0 : materialResponse.normalStrength, isAlcantara ? 0 : materialResponse.normalStrength);
            if (isAlcantara) {
                seatMaterial.roughness = 0.95;
                seatMaterial.metalness = 0;
                seatMaterial.envMapIntensity = 0.15;
                seatMaterial.color.setHex(0xffffff);
            } else {
                seatMaterial.roughness = materialResponse.roughness;
                seatMaterial.metalness = materialResponse.metalness;
                seatMaterial.envMapIntensity = materialResponse.envMapIntensity;
                seatMaterial.color.setHex(0xffffff);
            }
            seatMaterial.needsUpdate = true;
        });
        if (isAlcantara && seatMaterials[0]) {
            applyMaterialToAllSeatMeshes(seatRef.current, seatMaterials[0]);
        } else {
            applySeatMaterialAssignmentsToModel(seatRef.current, seatMaterialAssignments);
        }
        if (lightRig) {
            if (isAlcantara) {
                lightRig.ambient.intensity = 0.5;
                lightRig.key.intensity = 1.35;
                lightRig.fill.intensity = 0.5;
                lightRig.rim.intensity = 0.3;
                renderer.toneMappingExposure = 1.08;
            } else {
                lightRig.ambient.intensity = 0.3;
                lightRig.key.intensity = 1.4;
                lightRig.fill.intensity = 0.5;
                lightRig.rim.intensity = 0.4;
                renderer.toneMappingExposure = 1.1;
            }
        }
        disposeTextureSet(previousTextures);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mountNode = mountRef.current;
        if (!mountNode) {
            return;
        }
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0x060910);
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](34, 1, 0.1, 100);
        camera.position.copy(PREMIUM_CAMERA_POSITION);
        camera.lookAt(PREMIUM_CAMERA_LOOK_AT);
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            antialias: true,
            alpha: true
        });
        renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
        renderer.toneMappingExposure = 1.1;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountNode.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        textureLoaderRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]();
        const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableRotate = true;
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.rotateSpeed = 0.52;
        controls.zoomSpeed = 0.6;
        controls.minDistance = 0.6;
        controls.maxDistance = 3;
        controls.target.copy(PREMIUM_CONTROLS_TARGET);
        controls.minPolarAngle = 0.32;
        controls.maxPolarAngle = Math.PI - 0.35;
        controls.minAzimuthAngle = -Infinity;
        controls.maxAzimuthAngle = Infinity;
        const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 0.5);
        scene.add(ambientLight);
        const keyLight = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 1.4);
        keyLight.position.set(2, 5, 3);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.set(2048, 2048);
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 18;
        keyLight.shadow.camera.left = -3;
        keyLight.shadow.camera.right = 3;
        keyLight.shadow.camera.top = 3;
        keyLight.shadow.camera.bottom = -3;
        keyLight.shadow.radius = 4;
        keyLight.shadow.bias = -0.00006;
        scene.add(keyLight);
        const fillLight = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 0.5);
        fillLight.position.set(-3, 2, 2);
        scene.add(fillLight);
        const rimLight = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xf5f8ff, 0.45);
        rimLight.position.set(-4.2, 2.6, -3.6);
        scene.add(rimLight);
        lightRigRef.current = {
            ambient: ambientLight,
            key: keyLight,
            fill: fillLight,
            rim: rimLight
        };
        const stage = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](1.2, 1.28, 0.08, 72), new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0x232830,
            roughness: 0.74,
            metalness: 0.05,
            envMapIntensity: 0.12
        }));
        stage.position.y = -1.12;
        stage.receiveShadow = true;
        scene.add(stage);
        const ground = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaneGeometry"](8, 8), new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShadowMaterial"]({
            opacity: 0.34
        }));
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.161;
        ground.receiveShadow = true;
        scene.add(ground);
        const gltfLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GLTFLoader"]();
        let disposed = false;
        let frameId = 0;
        const pmremGenerator = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](renderer);
        pmremGenerator.compileEquirectangularShader();
        let environmentTarget = null;
        new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBELoader"]().load(HDR_ENV_MAP_URL, (hdrTexture)=>{
            if (disposed) {
                hdrTexture.dispose();
                return;
            }
            environmentTarget?.dispose();
            environmentTarget = pmremGenerator.fromEquirectangular(hdrTexture);
            scene.environment = environmentTarget.texture;
            scene.background = null;
            hdrTexture.dispose();
        }, undefined, ()=>{
            if (!disposed) {
                scene.environment = null;
            }
        });
        const updateSize = ()=>{
            const width = mountNode.clientWidth;
            const height = Math.max(mountNode.clientHeight, 1);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        updateSize();
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(mountNode);
        gltfLoader.load("/seat.glb", (gltf)=>{
            if (disposed) {
                return;
            }
            const seat = gltf.scene;
            seatRef.current = seat;
            const sourceBounds = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(seat);
            const sourceSize = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
            const sourceCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
            sourceBounds.getSize(sourceSize);
            sourceBounds.getCenter(sourceCenter);
            const seatHalfWidth = Math.max(sourceSize.x * 0.5, 0.001);
            const targetSlots = [];
            const fallbackSlots = [];
            seat.traverse((node)=>{
                if (!(node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"])) {
                    return;
                }
                node.castShadow = true;
                node.receiveShadow = true;
                const materials = Array.isArray(node.material) ? node.material : [
                    node.material
                ];
                materials.forEach((material, materialIndex)=>{
                    const slot = {
                        mesh: node,
                        materialIndex,
                        material
                    };
                    fallbackSlots.push(slot);
                    if (isSeatSurfaceMaterial(node, material)) {
                        targetSlots.push(slot);
                    }
                });
            });
            const slotsToUpdate = targetSlots.length > 0 ? targetSlots : fallbackSlots;
            const assignedSeatMaterials = [];
            const assignedSeatMaterialAssignments = [];
            const centerMaterialIndicesByMesh = new Map();
            slotsToUpdate.forEach((slot)=>{
                const standardizedMaterial = ensureMeshStandardMaterial(slot.material);
                const meshStandardMaterial = standardizedMaterial.clone();
                meshStandardMaterial.name = standardizedMaterial.name;
                replaceMeshMaterialAtIndex(slot.mesh, slot.materialIndex, meshStandardMaterial);
                const zone = classifySeatSurfaceZone(slot.mesh, meshStandardMaterial, sourceCenter.x, seatHalfWidth);
                assignedSeatMaterials.push(meshStandardMaterial);
                assignedSeatMaterialAssignments.push({
                    material: meshStandardMaterial,
                    zone,
                    mesh: slot.mesh,
                    materialIndex: slot.materialIndex
                });
                if (zone === "center") {
                    const indices = centerMaterialIndicesByMesh.get(slot.mesh) ?? new Set();
                    indices.add(slot.materialIndex);
                    centerMaterialIndicesByMesh.set(slot.mesh, indices);
                }
            });
            seatMaterialsRef.current = assignedSeatMaterials;
            seatMaterialAssignmentsRef.current = assignedSeatMaterialAssignments;
            meshMaterialSnapshotsRef.current = captureMeshMaterialSnapshots(seat);
            centerMaterialIndicesByMesh.forEach((materialIndices, mesh)=>{
                applyCenterPanelUvWarp(mesh, materialIndices, sourceBounds.min.y, sourceSize.y);
            });
            const box = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(seat);
            const center = box.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
            const boxSize = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
            seat.position.x -= center.x;
            seat.position.y -= center.y;
            seat.position.z -= center.z;
            const maxDimension = Math.max(boxSize.x, boxSize.y, boxSize.z);
            if (maxDimension > 0.0001) {
                seat.scale.setScalar(2.3 / maxDimension);
            }
            seat.rotation.y = 0.3;
            seat.rotation.x = 0;
            // Keep the transformed model perfectly centered at world origin.
            const centeredBox = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(seat);
            const centered = centeredBox.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
            seat.position.x -= centered.x;
            seat.position.y -= centered.y;
            seat.position.z -= centered.z;
            scene.add(seat);
            const framedBox = new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(seat);
            const modelSize = Math.max(framedBox.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]()).length(), 0.001);
            camera.position.set(modelSize * 0.6, modelSize * 0.5, modelSize * 1.6);
            controls.target.set(0, 0, 0);
            controls.minDistance = Math.max(0.6, modelSize * 0.35);
            controls.maxDistance = Math.max(3, modelSize * 4);
            camera.near = Math.max(0.05, modelSize / 100);
            camera.far = Math.max(40, modelSize * 20);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();
            controls.update();
            setStatus("ready");
            void applySelectedMaterialTextures(selectedTextureRef.current);
        }, undefined, ()=>{
            if (!disposed) {
                setStatus("error");
            }
        });
        const render = ()=>{
            frameId = window.requestAnimationFrame(render);
            controls.update();
            renderer.render(scene, camera);
        };
        render();
        return ()=>{
            disposed = true;
            textureRequestIdRef.current += 1;
            window.cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            controls.dispose();
            seatMaterialsRef.current.forEach((material)=>{
                material.map = null;
                material.normalMap = null;
                material.roughnessMap = null;
                material.emissiveMap = null;
                material.emissive.setHex(0x000000);
                material.emissiveIntensity = 0;
                material.bumpMap = null;
                material.bumpScale = 0;
                material.needsUpdate = true;
            });
            disposeTextureSet(activeTexturesRef.current);
            activeTexturesRef.current = null;
            if (seatRef.current) {
                scene.remove(seatRef.current);
                disposeModel(seatRef.current);
                seatRef.current = null;
            }
            seatMaterialsRef.current = [];
            seatMaterialAssignmentsRef.current = [];
            meshMaterialSnapshotsRef.current = [];
            scene.remove(ground);
            ground.geometry.dispose();
            ground.material.dispose();
            scene.remove(stage);
            stage.geometry.dispose();
            stage.material.dispose();
            scene.environment = null;
            environmentTarget?.dispose();
            environmentTarget = null;
            pmremGenerator.dispose();
            renderer.dispose();
            rendererRef.current = null;
            lightRigRef.current = null;
            textureLoaderRef.current = null;
            if (mountNode.contains(renderer.domElement)) {
                mountNode.removeChild(renderer.domElement);
            }
        };
    }, [
        applySelectedMaterialTextures
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void applySelectedMaterialTextures(selectedTextureUrl);
    }, [
        applySelectedMaterialTextures,
        selectedTextureUrl
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-orchids-id": "src/components/SeatViewer.tsx:1560:4",
        "data-orchids-name": "div",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-2xl border border-divider/70 bg-[radial-gradient(circle_at_16%_20%,rgba(74,86,110,0.26),transparent_40%),radial-gradient(circle_at_78%_82%,rgba(176,148,106,0.12),transparent_44%),linear-gradient(160deg,#06090f_0%,#090f16_44%,#0a1017_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/SeatViewer.tsx:1566:6@mountRef",
                "data-orchids-name": "div",
                ref: mountRef,
                className: "h-full w-full"
            }, void 0, false, {
                fileName: "[project]/workspaces/131/src/components/SeatViewer.tsx",
                lineNumber: 1566,
                columnNumber: 7
            }, this),
            status !== "ready" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/SeatViewer.tsx:1569:8",
                "data-orchids-name": "div",
                className: "pointer-events-none absolute inset-0 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-orchids-id": "src/components/SeatViewer.tsx:1570:10",
                    "data-orchids-name": "div",
                    className: "rounded-md border border-white/10 bg-black/45 px-3 py-1 text-xs text-white/80",
                    children: status === "loading" ? "Loading seat..." : "Seat model could not be loaded."
                }, void 0, false, {
                    fileName: "[project]/workspaces/131/src/components/SeatViewer.tsx",
                    lineNumber: 1570,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/workspaces/131/src/components/SeatViewer.tsx",
                lineNumber: 1569,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/workspaces/131/src/components/SeatViewer.tsx",
        lineNumber: 1560,
        columnNumber: 5
    }, this);
}
}),
"[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MaterialViewerExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$src$2f$components$2f$SeatViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspaces/131/src/components/SeatViewer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const MATERIAL_OPTIONS = [
    {
        id: "pu-classic-black",
        previewTexture: "/textures/pu-classic-black.jpg",
        labels: {
            de: "Schwarzes PU-Leder",
            en: "Black PU Leather",
            ru: "Black PU Leather"
        },
        descriptions: {
            de: "Tiefes Schwarz mit dezenter Lederpraegung",
            en: "Deep black with subtle leather grain",
            ru: "Deep black with subtle leather grain"
        }
    },
    {
        id: "pu-classic-brown",
        previewTexture: "/textures/pu-brown.jpg",
        labels: {
            de: "Braunes PU-Leder",
            en: "Brown PU Leather",
            ru: "Brown PU Leather"
        },
        descriptions: {
            de: "Warmer Braunton fuer klassischen Luxuslook",
            en: "Warm brown tone for a classic luxury look",
            ru: "Warm brown tone for a classic luxury look"
        }
    },
    {
        id: "pu-classic-white",
        previewTexture: "/textures/pu-cream.jpg",
        labels: {
            de: "Weisses PU-Leder",
            en: "White PU Leather",
            ru: "White PU Leather"
        },
        descriptions: {
            de: "Helle Premiumoptik mit feiner Struktur",
            en: "Light premium finish with fine texture",
            ru: "Light premium finish with fine texture"
        }
    },
    {
        id: "alcantara-style",
        previewTexture: "/materials/alcantara_black.jpg",
        labels: {
            de: "Alcantara-Optik",
            en: "Alcantara Style",
            ru: "Alcantara Style"
        },
        descriptions: {
            de: "Matte Mikrofaser-Optik mit softem Griff",
            en: "Matte microfiber look with a soft touch",
            ru: "Matte microfiber look with a soft touch"
        }
    }
];
const copyByLang = {
    de: {
        title: "Interaktive 360 Grad Innenraumvorschau",
        description: "Perspektive vom Fahrersitz: Material auswaehlen und Sitz- sowie Innenraumflaechen direkt vergleichen.",
        controlsHint: "Steuerung: Ziehen fuer 360 Grad Rundumsicht, Mausrad oder Pinch fuer leichten Zoom.",
        selectorTitle: "Material auswaehlen"
    },
    en: {
        title: "Interactive 360 Degree Interior Viewer",
        description: "Driver-seat perspective: pick a material and compare seats and key interior surfaces instantly.",
        controlsHint: "Controls: drag for full 360 view, scroll or pinch for slight zoom.",
        selectorTitle: "Select Material"
    },
    ru: {
        title: "Interactive 360 Degree Interior Viewer",
        description: "Driver-seat perspective: pick a material and compare seats and key interior surfaces instantly.",
        controlsHint: "Controls: drag for full 360 view, scroll or pinch for slight zoom.",
        selectorTitle: "Select Material"
    }
};
function inferInitialOption(materialId) {
    const normalized = materialId.toLowerCase();
    if (normalized.includes("alcantara") || normalized.includes("suede") || normalized.includes("velour")) {
        return "alcantara-style";
    }
    if (normalized.includes("brown") || normalized.includes("cognac") || normalized.includes("tan")) {
        return "pu-classic-brown";
    }
    if (normalized.includes("white") || normalized.includes("ivory") || normalized.includes("cream")) {
        return "pu-classic-white";
    }
    return "pu-classic-black";
}
function MaterialViewerExperience({ lang, initialMaterialId }) {
    const initialOption = inferInitialOption(initialMaterialId);
    const [selectedOptionId, setSelectedOptionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialOption);
    const selectedOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>MATERIAL_OPTIONS.find((option)=>option.id === selectedOptionId) ?? MATERIAL_OPTIONS[0], [
        selectedOptionId
    ]);
    const selectedVariant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (selectedOption.id.includes("alcantara")) {
            return "alcantara";
        }
        if (selectedOption.id.includes("perforated")) {
            return "perforated";
        }
        return "leather";
    }, [
        selectedOption.id
    ]);
    const copy = copyByLang[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:156:4",
        "data-orchids-name": "div",
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:157:6",
                "data-orchids-name": "div",
                className: "rounded-2xl border border-divider bg-card-bg/70 p-4 md:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:158:8",
                        "data-orchids-name": "p",
                        className: "text-xs uppercase tracking-[0.16em] text-gold",
                        children: copy.selectorTitle
                    }, void 0, false, {
                        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:159:8",
                        "data-orchids-name": "h2",
                        className: "mt-2 text-xl font-semibold text-text-primary md:text-2xl",
                        children: copy.title
                    }, void 0, false, {
                        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:160:8",
                        "data-orchids-name": "p",
                        className: "mt-2 text-sm text-text-secondary md:text-base",
                        children: copy.description
                    }, void 0, false, {
                        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:162:8",
                        "data-orchids-name": "div",
                        className: "mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
                        children: MATERIAL_OPTIONS.map((option)=>{
                            const isSelected = option.id === selectedOption.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:167:14@MATERIAL_OPTIONS@isSelected",
                                "data-orchids-name": "button",
                                type: "button",
                                onClick: ()=>setSelectedOptionId(option.id),
                                "aria-pressed": isSelected,
                                className: `text-left rounded-xl border p-3 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${isSelected ? "border-gold bg-gold/10" : "border-divider bg-surface/70 hover:border-gold/45"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:178:16@MATERIAL_OPTIONS",
                                        "data-orchids-name": "div",
                                        "aria-hidden": "true",
                                        className: "mb-3 h-14 rounded-md border border-divider/70",
                                        style: {
                                            backgroundImage: `url(${option.previewTexture})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:187:16@MATERIAL_OPTIONS",
                                        "data-orchids-name": "p",
                                        className: "text-sm font-semibold text-text-primary",
                                        children: option.labels[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:188:16@MATERIAL_OPTIONS",
                                        "data-orchids-name": "p",
                                        className: "mt-1 text-xs text-text-secondary",
                                        children: option.descriptions[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, option.id, true, {
                                fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:195:6",
                "data-orchids-name": "div",
                className: "seat-preview",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$src$2f$components$2f$SeatViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:196:8@selectedVariant",
                    "data-orchids-name": "SeatViewer",
                    materialVariant: selectedVariant
                }, void 0, false, {
                    fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspaces$2f$131$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                "data-orchids-id": "src/components/catalog/material-viewer-experience.tsx:199:6",
                "data-orchids-name": "p",
                className: "text-sm text-text-secondary",
                children: copy.controlsHint
            }, void 0, false, {
                fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/workspaces/131/src/components/catalog/material-viewer-experience.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=workspaces_131_src_0bffb9a9._.js.map