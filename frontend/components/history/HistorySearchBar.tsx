"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface HistorySearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function HistorySearchBar({ value, onChange }: HistorySearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder="Buscar diagnóstico..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 rounded-xl bg-muted/40 border-transparent focus:border-primary/30 focus:bg-background"
      />
    </div>
  )
}
