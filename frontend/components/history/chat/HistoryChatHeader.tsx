"use client"

import { ArrowLeft, Stethoscope, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { HealthStatus } from "@/types/medical-case"

interface HistoryChatHeaderProps {
  diagnosis: string
  medicationCount: number
  diaryEntryCount: number
  lastHealthStatus: HealthStatus | null
  onBack: () => void
}

const statusLabel: Record<HealthStatus, string> = {
  mejor: "Mejor",
  igual: "Igual",
  peor: "Peor",
}

const statusColor: Record<HealthStatus, string> = {
  mejor: "bg-emerald-100 text-emerald-700 border-emerald-200",
  igual: "bg-amber-100 text-amber-700 border-amber-200",
  peor: "bg-red-100 text-red-700 border-red-200",
}

export function HistoryChatHeader({
  diagnosis,
  medicationCount,
  diaryEntryCount,
  lastHealthStatus,
  onBack,
}: HistoryChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-auto flex items-center gap-3 px-4 py-3">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted shrink-0"
          aria-label="Volver al detalle del caso"
        >
          <ArrowLeft className="size-4" />
        </button>

        {/* Avatar */}
        <div className="flex items-center justify-center size-9 rounded-xl bg-primary/10 text-primary shrink-0">
          <Stethoscope className="size-4.5" />
        </div>

        {/* Title & metadata */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold truncate">
            Preguntas sobre tu caso
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-muted-foreground truncate">
              {diagnosis}
            </span>
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
              {medicationCount} med.
            </Badge>
            {diaryEntryCount > 0 && (
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 gap-0.5">
                <BookOpen className="size-2.5" />
                {diaryEntryCount}
              </Badge>
            )}
            {lastHealthStatus && (
              <Badge
                variant="outline"
                className={`text-[10px] h-4 px-1.5 border ${statusColor[lastHealthStatus]}`}
              >
                {statusLabel[lastHealthStatus]}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
