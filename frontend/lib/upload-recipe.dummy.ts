import type {
  RecipeUploadPayload,
  RecipeUploadResult,
  UploadProgress,
} from "@/types/upload-recipe"

/**
 * Dummy data and simulated API calls for the Upload Recipe module.
 * All functions simulate network delays for realistic prototyping.
 */

const DUMMY_RESULTS: RecipeUploadResult[] = [
  {
    id: "case-001",
    diagnosis_raw: "Amoxicilina 500mg c/8h x 7 días. Ibuprofeno 400mg c/6h por dolor.",
    source_type: "upload_photo",
    source_image_path: "/uploads/receta-001.jpg",
    status: "completed",
    created_at: "2026-04-17T10:30:00Z",
  },
  {
    id: "case-002",
    diagnosis_raw: "Omeprazol 20mg en ayunas. Metformina 850mg c/12h.",
    source_type: "upload_photo",
    source_image_path: "/uploads/receta-002.jpg",
    status: "completed",
    created_at: "2026-04-16T15:45:00Z",
  },
]

/** Simulates uploading a recipe file and creating a case */
export async function uploadRecipe(
  _payload: RecipeUploadPayload,
  onProgress?: (progress: UploadProgress) => void
): Promise<RecipeUploadResult> {
  // Simulate upload progress
  const steps: UploadProgress[] = [
    { percent: 10, status: "uploading", message: "Subiendo archivo..." },
    { percent: 30, status: "uploading", message: "Subiendo archivo..." },
    { percent: 60, status: "uploading", message: "Subiendo archivo..." },
    { percent: 80, status: "processing", message: "Procesando receta..." },
    { percent: 95, status: "processing", message: "Analizando contenido..." },
    { percent: 100, status: "complete", message: "¡Listo!" },
  ]

  for (const step of steps) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    onProgress?.(step)
  }

  return {
    ...DUMMY_RESULTS[0],
    id: `case-${Date.now()}`,
    created_at: new Date().toISOString(),
  }
}

/** Validates that a file is an accepted format */
export function validateRecipeFile(file: File): {
  valid: boolean
  error?: string
} {
  const MAX_SIZE = 10 * 1024 * 1024 // 10 MB
  const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/heic",
    "image/webp",
    "application/pdf",
  ]

  if (!ACCEPTED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Formato no soportado. Usa JPG, PNG, HEIC, WebP o PDF.",
    }
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: "El archivo es demasiado grande. Máximo 10 MB.",
    }
  }

  return { valid: true }
}
