"use client"

import { useState } from "react"
import { useMedicalCases } from "@/hooks/useMedicalCases"
import { CaseCard } from "@/components/history/CaseCard"
import { HistorySearchBar } from "@/components/history/HistorySearchBar"
import { HistoryFilters } from "@/components/history/HistoryFilters"
import { CaseListSkeleton } from "@/components/history/CaseListSkeleton"
import { EmptyHistory } from "@/components/history/EmptyHistory"
import type { CaseStatus } from "@/types/medical-case"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<CaseStatus | "todos">(
    "todos"
  )

  const { items, allItems, isLoading, error, counts } = useMedicalCases({
    searchQuery,
    statusFilter,
  })

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mi Historial</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {counts.total}{" "}
            {counts.total === 1 ? "caso guardado" : "casos guardados"}
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-3">
          <HistorySearchBar value={searchQuery} onChange={setSearchQuery} />
          <HistoryFilters
            value={statusFilter}
            onChange={setStatusFilter}
            counts={counts}
          />
        </div>

        {/* Error state */}
        {error && !isLoading && (
          <div className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Error al cargar el historial: {error.message}
          </div>
        )}

        {/* Loading state */}
        {isLoading && <CaseListSkeleton />}

        {/* Empty state */}
        {!isLoading && !error && items.length === 0 && (
          <EmptyHistory isAbsoluteEmpty={allItems.length === 0} />
        )}

        {/* Case list */}
        {!isLoading && !error && items.length > 0 && (
          <div className="flex flex-col gap-3">
            {items.map((medicalCase) => (
              <CaseCard key={medicalCase.id} medicalCase={medicalCase} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
