"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { CaseStatus } from "@/types/medical-case"

type FilterValue = CaseStatus | "todos"

interface HistoryFiltersProps {
  value: FilterValue
  onChange: (value: FilterValue) => void
  counts: {
    total: number
    enTratamiento: number
    completado: number
    archivado: number
  }
}

export function HistoryFilters({
  value,
  onChange,
  counts,
}: HistoryFiltersProps) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(v: string[]) => {
        // Prevent deselecting — default back to "todos"
        const selected = v[0] as FilterValue | undefined
        onChange(selected ?? "todos")
      }}
      className="justify-start flex-wrap"
    >
      <ToggleGroupItem value="todos" className="gap-1.5 text-sm">
        Todos
        <span className="text-xs text-muted-foreground">({counts.total})</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="en_tratamiento" className="gap-1.5 text-sm">
        En tratamiento
        <span className="text-xs text-muted-foreground">
          ({counts.enTratamiento})
        </span>
      </ToggleGroupItem>
      <ToggleGroupItem value="completado" className="gap-1.5 text-sm">
        Completados
        <span className="text-xs text-muted-foreground">
          ({counts.completado})
        </span>
      </ToggleGroupItem>
      <ToggleGroupItem value="archivado" className="gap-1.5 text-sm">
        Archivados
        <span className="text-xs text-muted-foreground">
          ({counts.archivado})
        </span>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
