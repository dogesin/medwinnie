"use client"

import { useState, useCallback } from "react"
import {
  getMedicalCase,
  editMedicalCase,
  getCaseSymptomsForEdit,
} from "@/lib/medical-cases.dummy"
import type { MedicalCase, MedicalCaseEditData } from "@/types/medical-case"

interface UseEditCaseReturn {
  medicalCase: MedicalCase | null
  initialSymptoms: string[]
  isLoading: boolean
  isSubmitting: boolean
  submitted: boolean
  error: Error | null
  submitEdit: (data: MedicalCaseEditData) => Promise<void>
}

export function useEditCase(caseId: string): UseEditCaseReturn {
  const [medicalCase, setMedicalCase] = useState<MedicalCase | null>(null)
  const [initialSymptoms, setInitialSymptoms] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Fetch the case and its symptoms on mount
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [caseData, symptoms] = await Promise.all([
        getMedicalCase(caseId),
        getCaseSymptomsForEdit(caseId),
      ])
      setMedicalCase(caseData)
      setInitialSymptoms(symptoms)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [caseId])

  // Run fetchData on mount
  useState(() => {
    fetchData()
  })

  const submitEdit = useCallback(
    async (data: MedicalCaseEditData) => {
      setIsSubmitting(true)
      setError(null)
      try {
        await editMedicalCase(caseId, data)
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
    initialSymptoms,
    isLoading,
    isSubmitting,
    submitted,
    error,
    submitEdit,
  }
}
