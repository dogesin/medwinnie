import { apiFetch } from "./api"
import type { AnalysisProgress } from "@/types/analysis-loading"

// TODO: wire up after backend is ready. Hook currently imports from .dummy.ts

/** Starts an analysis job on the backend and polls for progress */
export function startAnalysis(caseId: string): Promise<{ jobId: string }> {
  return apiFetch<{ jobId: string }>(`/cases/${caseId}/analyze`, {
    method: "POST",
  })
}

/** Polls the current status of an analysis job */
export function getAnalysisProgress(jobId: string): Promise<AnalysisProgress> {
  return apiFetch<AnalysisProgress>(`/analysis/${jobId}/progress`)
}
