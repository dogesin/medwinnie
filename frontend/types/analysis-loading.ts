/**
 * Types for the Analysis Loading (Analizando) module.
 * Represents the animated loading state while Winnie processes a consultation.
 */

/** A single step in the analysis pipeline */
export interface AnalysisStep {
  id: string
  label: string
  description: string
  icon: "scan" | "pill" | "brain" | "sparkles" | "check"
  durationMs: number
}

/** Overall analysis progress state */
export interface AnalysisProgress {
  /** 0–100 overall percentage */
  percent: number
  /** Current status of the analysis */
  status: "idle" | "processing" | "complete" | "error"
  /** Human-readable message for the current step */
  message: string
  /** Index of the currently active step (0-based) */
  currentStepIndex: number
}

/** The source input that triggered the analysis */
export interface AnalysisSource {
  type: "upload_photo" | "manual_text"
  /** A preview of the input (OCR text or user-written text) */
  preview: string
}
