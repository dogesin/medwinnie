"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getMedicalCase,
  getMedicationsForCase,
  getDiaryEntriesForCase,
} from "@/lib/medical-cases.dummy"
import type { MedicalCase, Medication, DiaryEntry } from "@/types/medical-case"

interface UseCaseDetailReturn {
  medicalCase: MedicalCase | null
  medications: Medication[]
  diaryEntries: DiaryEntry[]
  isLoading: boolean
  error: Error | null
  refresh: () => Promise<void>
}

export function useCaseDetail(caseId: string): UseCaseDetailReturn {
  const [medicalCase, setMedicalCase] = useState<MedicalCase | null>(null)
  const [medications, setMedications] = useState<Medication[]>([])
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [caseData, meds, entries] = await Promise.all([
        getMedicalCase(caseId),
        getMedicationsForCase(caseId),
        getDiaryEntriesForCase(caseId),
      ])
      setMedicalCase(caseData)
      setMedications(meds)
      // Sort diary entries by date descending (most recent first)
      setDiaryEntries(
        entries.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [caseId])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { medicalCase, medications, diaryEntries, isLoading, error, refresh }
}
