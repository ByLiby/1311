import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

const PUBLIC_MODELS_DIR = path.join(process.cwd(), "public", "models");
const SUPPORTED_EXTENSIONS = [".glb", ".gltf", ".obj", ".fbx"] as const;

type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number];

type ModelCandidate = {
  absolutePath: string;
  relativePath: string;
  extension: SupportedExtension;
  size: number;
};

export type DiscoveredSeatModel = {
  modelPath: string;
  modelFolderPath: string;
  mtlPath?: string;
};

function toWebPath(relativePath: string) {
  return `/models/${relativePath.split(path.sep).join("/")}`;
}

async function collectFilesRecursive(rootDirectory: string) {
  const discovered: string[] = [];
  const queue: string[] = [rootDirectory];

  while (queue.length > 0) {
    const currentDirectory = queue.pop();
    if (!currentDirectory) {
      continue;
    }

    const entries = await fs.readdir(currentDirectory, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        queue.push(absolutePath);
        continue;
      }

      if (entry.isFile()) {
        discovered.push(absolutePath);
      }
    }
  }

  return discovered;
}

function extensionPriority(extension: SupportedExtension) {
  const index = SUPPORTED_EXTENSIONS.indexOf(extension);
  return SUPPORTED_EXTENSIONS.length - index;
}

function scoreCandidate(candidate: ModelCandidate) {
  const normalized = candidate.relativePath.toLowerCase();
  let score = extensionPriority(candidate.extension) * 100;

  if (normalized.includes("seat")) {
    score += 500;
  }
  if (normalized.includes("bmw")) {
    score += 120;
  }
  if (normalized.includes("chair")) {
    score += 80;
  }
  if (normalized.includes("interior")) {
    score -= 80;
  }

  score += Math.min(candidate.size / (1024 * 1024), 20);
  return score;
}

async function findAdjacentMtl(candidate: ModelCandidate, allFiles: string[]) {
  if (candidate.extension !== ".obj") {
    return undefined;
  }

  const objectDirectory = path.dirname(candidate.absolutePath);
  const objectNameWithoutExtension = path.basename(candidate.absolutePath, ".obj");
  const directMtlPath = path.join(objectDirectory, `${objectNameWithoutExtension}.mtl`);

  try {
    const stat = await fs.stat(directMtlPath);
    if (stat.isFile()) {
      return directMtlPath;
    }
  } catch {
    // Try fallbacks below.
  }

  const siblingMtl = allFiles.find((absolutePath) => {
    return path.dirname(absolutePath) === objectDirectory && path.extname(absolutePath).toLowerCase() === ".mtl";
  });

  return siblingMtl;
}

export async function discoverSeatModelInPublicModels(): Promise<DiscoveredSeatModel> {
  const allFiles = await collectFilesRecursive(PUBLIC_MODELS_DIR);
  const candidates: ModelCandidate[] = [];

  allFiles.forEach((absolutePath) => {
    const extension = path.extname(absolutePath).toLowerCase() as SupportedExtension;
    if (!SUPPORTED_EXTENSIONS.includes(extension)) {
      return;
    }

    const relativePath = path.relative(PUBLIC_MODELS_DIR, absolutePath);
    candidates.push({
      absolutePath,
      relativePath,
      extension,
      size: 0,
    });
  });

  if (candidates.length === 0) {
    throw new Error("No supported model file was found inside public/models.");
  }

  const candidatesWithSize = await Promise.all(
    candidates.map(async (candidate) => {
      const stats = await fs.stat(candidate.absolutePath);
      return { ...candidate, size: stats.size };
    }),
  );

  const selectedCandidate = [...candidatesWithSize].sort((candidateA, candidateB) => {
    const scoreDelta = scoreCandidate(candidateB) - scoreCandidate(candidateA);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return candidateB.size - candidateA.size;
  })[0];

  const relativeParts = selectedCandidate.relativePath.split(path.sep);
  const bundleRoot = relativeParts.length > 1 ? relativeParts[0] : "";
  const modelFolderPath = bundleRoot ? `/models/${bundleRoot}` : "/models";
  const mtlAbsolutePath = await findAdjacentMtl(selectedCandidate, allFiles);

  return {
    modelPath: toWebPath(selectedCandidate.relativePath),
    modelFolderPath,
    mtlPath: mtlAbsolutePath
      ? toWebPath(path.relative(PUBLIC_MODELS_DIR, mtlAbsolutePath))
      : undefined,
  };
}
