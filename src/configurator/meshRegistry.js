// Registry for configurable mesh groups in the interior model.
export const MeshRegistry = {
  seats: [],
  doorTrim: [],
  dashboard: [],
  steeringWheel: [],
};

const seatKeywords = [
  "seat",
  "upholstery",
  "cushion",
  "headrest",
  "backrest",
  "bolster",
  "armrest",
  "bench",
  "leather",
  "alcantara",
];

const doorKeywords = ["door", "panel", "trim"];
const dashboardKeywords = ["dash", "dashboard", "instrument", "console"];
const steeringKeywords = ["steering", "wheel"];

function getMeshSignature(mesh) {
  const meshName = mesh.name?.toLowerCase?.() ?? "";
  const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  const materialNames = sourceMaterials
    .map((material) => material?.name?.toLowerCase?.() ?? "")
    .join(" ");

  return `${meshName} ${materialNames}`;
}

function addUnique(targetArray, mesh) {
  if (!targetArray.includes(mesh)) {
    targetArray.push(mesh);
  }
}

// Clears all registries before loading a new model.
export function clearMeshRegistry() {
  Object.values(MeshRegistry).forEach((group) => {
    group.length = 0;
  });
}

// Classifies and stores meshes so configurator modules can target them.
export function registerMesh(mesh) {
  const signature = getMeshSignature(mesh);

  if (seatKeywords.some((keyword) => signature.includes(keyword))) {
    addUnique(MeshRegistry.seats, mesh);
  }

  if (doorKeywords.some((keyword) => signature.includes(keyword))) {
    addUnique(MeshRegistry.doorTrim, mesh);
  }

  if (dashboardKeywords.some((keyword) => signature.includes(keyword))) {
    addUnique(MeshRegistry.dashboard, mesh);
  }

  if (steeringKeywords.some((keyword) => signature.includes(keyword))) {
    addUnique(MeshRegistry.steeringWheel, mesh);
  }
}
