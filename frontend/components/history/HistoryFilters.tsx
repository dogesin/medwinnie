"use client"

import { cn } from "@/lib/utils"
import type { CaseStatus } from "@/types/medical-case"

type FilterValue = CaseStatus | "todos"

interface HistoryFiltersProps {
  value: FilterValue
  onChange: (value: FilterValue) => void
  counts: {
    total: number
    borrador: number
    enTratamiento: number
    completado: number
    archivado: number
  }
}

const filters: { value: FilterValue; label: string; countKey: keyof HistoryFiltersProps["counts"] }[] = [
  { value: "todos", label: "Todos", countKey: "total" },
  { value: "borrador", label: "Borradores", countKey: "borrador" },
  { value: "en_tratamiento", label: "En tratamiento", countKey: "enTratamiento" },
  { value: "completado", label: "Completados", countKey: "completado" },
  { value: "archivado", label: "Archivados", countKey: "archivado" },
]

export function HistoryFilters({
  value,
  onChange,
  counts,
}: HistoryFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
            value === filter.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/60 text-muted-foreground hover:bg-muted"
          )}
        >
          {filter.label}
          <span
            className={cn(
              "text-[11px]",
              value === filter.value
                ? "text-primary-foreground/70"
                : "text-muted-foreground/60"
            )}
          >
            {counts[filter.countKey]}
          </span>
        </button>
      ))}
    </div>
  )
}
