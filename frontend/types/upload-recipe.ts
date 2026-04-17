/**
 * Types for the Upload Recipe (Subir Receta) module.
 * Derived from the Database Blueprint: medical_cases table.
 */

/** Represents a file selected by the user for upload */
export interface RecipeFile {
  id: string
  file: File | null
  name: string
  size: number
  type: "image" | "pdf" | "unknown"
  previewUrl: string | null
}

/** Payload sent when submitting a recipe for analysis */
export interface RecipeUploadPayload {
  source_type: "upload_photo" | "manual_text"
  file: File | null
  diagnosis_raw: string
}

/** Response after a recipe is successfully submitted for analysis */
export interface RecipeUploadResult {
  id: string
  diagnosis_raw: string
  source_type: "upload_photo" | "manual_text"
  source_image_path: string | null
  status: "processing" | "completed" | "error"
  created_at: string
}

/** Upload progress state */
export interface UploadProgress {
  percent: number
  status: "idle" | "uploading" | "processing" | "complete" | "error"
  message: string
}
