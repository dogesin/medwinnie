"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { getMedicalCases } from "@/lib/medical-cases.dummy"
import type { MedicalCase, CaseStatus } from "@/types/medical-case"

interface UseMedicalCasesOptions {
  searchQuery?: string
  statusFilter?: CaseStatus | "todos"
}

export function useMedicalCases(options: UseMedicalCasesOptions = {}) {
  const { searchQuery = "", statusFilter = "todos" } = options

  const [items, setItems] = useState<MedicalCase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getMedicalCases()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Client-side filtering
  const filtered = useMemo(() => {
    let result = items

    // Filter by status
    if (statusFilter !== "todos") {
      result = result.filter((c) => c.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.diagnosis.toLowerCase().includes(q) ||
          c.diagnosis_raw.toLowerCase().includes(q)
      )
    }

    // Sort by consultation date descending (most recent first)
    return result.sort(
      (a, b) =>
        new Date(b.consultation_date).getTime() -
        new Date(a.consultation_date).getTime()
    )
  }, [items, searchQuery, statusFilter])

  const counts = useMemo(() => {
    const total = items.length
    const enTratamiento = items.filter(
      (c) => c.status === "en_tratamiento"
    ).length
    const completado = items.filter((c) => c.status === "completado").length
    const archivado = items.filter((c) => c.status === "archivado").length
    return { total, enTratamiento, completado, archivado }
  }, [items])

  return { items: filtered, allItems: items, isLoading, error, refresh, counts }
}
