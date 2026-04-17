"use client"

import { useState, useCallback } from "react"
import { getMedicalCase, createDiaryEntry } from "@/lib/medical-cases.dummy"
import type {
  MedicalCase,
  HealthStatus,
  DiaryEntryCreate,
} from "@/types/medical-case"

interface UseDiaryEntryReturn {
  medicalCase: MedicalCase | null
  isLoading: boolean
  isSubmitting: boolean
  submitted: boolean
  error: Error | null
  submitEntry: (healthStatus: HealthStatus, note: string) => Promise<void>
}

export function useDiaryEntry(caseId: string): UseDiaryEntryReturn {
  const [medicalCase, setMedicalCase] = useState<MedicalCase | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Fetch the case on mount
  const fetchCase = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getMedicalCase(caseId)
      setMedicalCase(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [caseId])

  // Run fetchCase on mount
  useState(() => {
    fetchCase()
  })

  const submitEntry = useCallback(
    async (healthStatus: HealthStatus, note: string) => {
      setIsSubmitting(true)
      setError(null)
      try {
        const today = new Date().toISOString().split("T")[0]

        const diaryData: DiaryEntryCreate = {
          case_id: caseId,
          health_status: healthStatus,
          note: note.trim() || undefined,
          entry_date: today,
        }

        await createDiaryEntry(diaryData)
        setSubmitted(true)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setIsSubmitting(false)
      }
    },
    [caseId]
  )

  return {
    medicalCase,
    isLoading,
    isSubmitting,
    submitted,
    error,
    submitEntry,
  }
}
