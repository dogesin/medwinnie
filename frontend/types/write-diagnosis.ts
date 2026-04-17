/**
 * Types for the Write Diagnosis (Escribir Diagnostico) module.
 * Derived from the Database Blueprint: medical_cases table (source_type = "manual_text").
 */

/** A guided example the user can tap to autofill the textarea */
export interface DiagnosisExample {
  id: string
  label: string
  description: string
  text: string
  category: "diagnosis" | "treatment" | "both"
}

/** Payload sent when submitting a manual diagnosis text */
export interface WriteDiagnosisPayload {
  source_type: "manual_text"
  diagnosis_raw: string
}

/** Response after a manual diagnosis is submitted for analysis */
export interface WriteDiagnosisResult {
  id: string
  diagnosis_raw: string
  source_type: "manual_text"
  status: "processing" | "completed" | "error"
  created_at: string
}

/** Processing progress state */
export interface DiagnosisProgress {
  percent: number
  status: "idle" | "processing" | "complete" | "error"
  message: string
}
