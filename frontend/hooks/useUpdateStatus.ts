"use client"

import { useState, useCallback } from "react"
import {
  getMedicalCase,
  createDiaryEntry,
  updateMedicalCase,
} from "@/lib/medical-cases.dummy"
import type {
  MedicalCase,
  HealthStatus,
  DiaryEntryCreate,
} from "@/types/medical-case"

interface UseUpdateStatusReturn {
  medicalCase: MedicalCase | null
  isLoading: boolean
  isSubmitting: boolean
  submitted: boolean
  error: Error | null
  submitUpdate: (
    healthStatus: HealthStatus,
    symptoms: string[],
    note: string
  ) => Promise<void>
}

export function useUpdateStatus(caseId: string): UseUpdateStatusReturn {
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

  const submitUpdate = useCallback(
    async (healthStatus: HealthStatus, symptoms: string[], note: string) => {
      setIsSubmitting(true)
      setError(null)
      try {
        const today = new Date().toISOString().split("T")[0]

        const diaryData: DiaryEntryCreate = {
          case_id: caseId,
          health_status: healthStatus,
          symptoms: symptoms.length > 0 ? symptoms : undefined,
          note: note.trim() || undefined,
          entry_date: today,
        }

        // Create diary entry and update case status in parallel
        await Promise.all([
          createDiaryEntry(diaryData),
          updateMedicalCase(caseId, {
            current_health_status: healthStatus,
          }),
        ])

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
    submitUpdate,
  }
}
