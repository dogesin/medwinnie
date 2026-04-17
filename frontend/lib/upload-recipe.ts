import type {
  RecipeUploadPayload,
  RecipeUploadResult,
  UploadProgress,
} from "@/types/upload-recipe"

// TODO: wire up after backend is ready. Hooks currently import from .dummy.ts

/** Upload a recipe file for AI analysis */
export async function uploadRecipe(
  _payload: RecipeUploadPayload,
  _onProgress?: (progress: UploadProgress) => void
): Promise<RecipeUploadResult> {
  // TODO: POST /api/cases with multipart form data
  throw new Error("Not implemented — use upload-recipe.dummy.ts")
}

/** Validate a recipe file server-side */
export async function validateRecipeFile(
  _file: File
): Promise<{ valid: boolean; error?: string }> {
  // TODO: POST /api/cases/validate
  throw new Error("Not implemented — use upload-recipe.dummy.ts")
}
