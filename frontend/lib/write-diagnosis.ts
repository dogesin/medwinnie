import type {
  DiagnosisExample,
  WriteDiagnosisPayload,
  WriteDiagnosisResult,
  DiagnosisProgress,
} from "@/types/write-diagnosis"

// TODO: wire up after backend is ready. Hooks currently import from .dummy.ts

/** Submit a manual diagnosis text for AI analysis */
export async function submitDiagnosis(
  _payload: WriteDiagnosisPayload,
  _onProgress?: (progress: DiagnosisProgress) => void
): Promise<WriteDiagnosisResult> {
  // TODO: POST /api/cases with { source_type: "manual_text", diagnosis_raw }
  throw new Error("Not implemented — use write-diagnosis.dummy.ts")
}

/** Get guided diagnosis examples from server */
export async function getDiagnosisExamples(): Promise<DiagnosisExample[]> {
  // TODO: GET /api/diagnosis-examples
  throw new Error("Not implemented — use write-diagnosis.dummy.ts")
}
