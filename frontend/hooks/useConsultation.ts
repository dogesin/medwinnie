"use client"

import { useState, useEffect, useCallback } from "react"
import { getCase, saveCase } from "@/lib/consultation.dummy"
import type { MedicalCase } from "@/types/consultation"

export function useConsultation(caseId: string = "case-001") {
  const [medicalCase, setMedicalCase] = useState<MedicalCase | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

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

  useEffect(() => {
    fetchCase()
  }, [fetchCase])

  const handleSave = useCallback(async () => {
    if (!medicalCase) return
    setIsSaving(true)
    try {
      await saveCase(medicalCase.id)
      setIsSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsSaving(false)
    }
  }, [medicalCase])

  return {
    medicalCase,
    isLoading,
    error,
    isSaving,
    isSaved,
    refresh: fetchCase,
    save: handleSave,
  }
}
