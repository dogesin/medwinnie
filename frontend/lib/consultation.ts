import type { MedicalCase, Medication } from "@/types/consultation"

// TODO: wire up after backend is ready. Hooks currently import from .dummy.ts

function apiFetch<T>(_url: string, _options?: RequestInit): Promise<T> {
  throw new Error("Not implemented — use consultation.dummy.ts for now")
}

export function getCase(id: string): Promise<MedicalCase> {
  return apiFetch<MedicalCase>(`/cases/${id}`)
}

export function getMedications(caseId: string): Promise<Medication[]> {
  return apiFetch<Medication[]>(`/cases/${caseId}/medications`)
}

export function saveCase(id: string): Promise<{ saved: boolean }> {
  return apiFetch<{ saved: boolean }>(`/cases/${id}/save`, { method: "POST" })
}
