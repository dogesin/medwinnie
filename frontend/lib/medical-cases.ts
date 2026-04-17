import { apiFetch } from "./api"
import type {
  MedicalCase,
  MedicalCaseCreate,
  MedicalCaseUpdate,
  Medication,
  DiaryEntry,
  DiaryEntryCreate,
} from "@/types/medical-case"

// TODO: wire up after backend is ready. Hooks currently import from .dummy.ts

export function getMedicalCases(): Promise<MedicalCase[]> {
  return apiFetch<MedicalCase[]>("/medical-cases")
}

export function getMedicalCase(id: string): Promise<MedicalCase> {
  return apiFetch<MedicalCase>(`/medical-cases/${id}`)
}

export function createMedicalCase(
  data: MedicalCaseCreate
): Promise<MedicalCase> {
  return apiFetch<MedicalCase>("/medical-cases", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateMedicalCase(
  id: string,
  data: MedicalCaseUpdate
): Promise<MedicalCase> {
  return apiFetch<MedicalCase>(`/medical-cases/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export function deleteMedicalCase(id: string): Promise<void> {
  return apiFetch<void>(`/medical-cases/${id}`, { method: "DELETE" })
}

export function getMedicationsForCase(caseId: string): Promise<Medication[]> {
  return apiFetch<Medication[]>(`/medical-cases/${caseId}/medications`)
}

export function getDiaryEntriesForCase(caseId: string): Promise<DiaryEntry[]> {
  return apiFetch<DiaryEntry[]>(`/medical-cases/${caseId}/diary-entries`)
}

export function createDiaryEntry(data: DiaryEntryCreate): Promise<DiaryEntry> {
  return apiFetch<DiaryEntry>(`/medical-cases/${data.case_id}/diary-entries`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}
