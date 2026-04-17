"use client"

import { useState } from "react"
import { useMedicalCases } from "@/hooks/useMedicalCases"
import { CaseCard } from "@/components/history/CaseCard"
import { HistorySearchBar } from "@/components/history/HistorySearchBar"
import { HistoryFilters } from "@/components/history/HistoryFilters"
import { CaseListSkeleton } from "@/components/history/CaseListSkeleton"
import { EmptyHistory } from "@/components/history/EmptyHistory"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import type { CaseStatus } from "@/types/medical-case"
import Link from "next/link"

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center size-8 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span className="sr-only">Volver</span>
              </Link>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Mi Historial
                </h1>
                <p className="text-sm text-muted-foreground">
                  {counts.total}{" "}
                  {counts.total === 1 ? "caso guardado" : "casos guardados"}
                </p>
              </div>
            </div>
            <Link
              href="/upload-recipe"
              className="inline-flex items-center justify-center h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] font-medium bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              <Plus className="size-3.5" data-icon="inline-start" />
              Nuevo
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex flex-col gap-5">
          {/* Search */}
          <HistorySearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Filters */}
          <HistoryFilters
            value={statusFilter}
            onChange={setStatusFilter}
            counts={counts}
          />

          {/* Error state */}
          {error && !isLoading && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
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
            <div className="flex flex-col gap-4">
              {items.map((medicalCase) => (
                <CaseCard key={medicalCase.id} medicalCase={medicalCase} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
