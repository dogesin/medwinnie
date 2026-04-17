"use client"

import { useState, useCallback } from "react"
import { getCase } from "@/lib/consultation.dummy"
import { createDiaryEntry } from "@/lib/medical-cases.dummy"
import type { MedicalCase } from "@/types/consultation"
import type { HealthStatus } from "@/types/medical-case"

interface UseFollowupReturn {
  medicalCase: MedicalCase | null
  isLoading: boolean
  isSubmitting: boolean
  submitted: boolean
  error: Error | null
  submitFollowup: (
    healthStatus: HealthStatus,
    symptoms: string[],
    note: string
  ) => Promise<void>
}

export function useFollowup(caseId: string = "case-001"): UseFollowupReturn {
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
      const data = await getCase(caseId)
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

  const submitFollowup = useCallback(
    async (healthStatus: HealthStatus, symptoms: string[], note: string) => {
      setIsSubmitting(true)
      setError(null)
      try {
        const today = new Date().toISOString().split("T")[0]

        await createDiaryEntry({
          case_id: caseId,
          health_status: healthStatus,
          symptoms: symptoms.length > 0 ? symptoms : undefined,
          note: note.trim() || undefined,
          entry_date: today,
        })

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
    submitFollowup,
  }
}
