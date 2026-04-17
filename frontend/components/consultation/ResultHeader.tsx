"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bookmark,
  MessageCircle,
  Share2,
  ArrowLeft,
  Calendar,
} from "lucide-react"
import type { MedicalCase } from "@/types/consultation"

interface ResultHeaderProps {
  medicalCase: MedicalCase
  isSaving: boolean
  isSaved: boolean
  onSave: () => void
  onAskQuestion: () => void
  onShare: () => void
  onBack: () => void
}

const statusLabels: Record<string, string> = {
  en_tratamiento: "En tratamiento",
  completado: "Completado",
  archivado: "Archivado",
}

export function ResultHeader({
  medicalCase,
  isSaving,
  isSaved,
  onSave,
  onAskQuestion,
  onShare,
  onBack,
}: ResultHeaderProps) {
  const formattedDate = new Date(
    medicalCase.consultation_date
  ).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground w-fit"
      >
        <ArrowLeft className="size-4" />
        Volver
      </button>

      {/* Title area */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {medicalCase.diagnosis}
            </h1>
            <Badge variant="secondary">
              {statusLabels[medicalCase.status]}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="size-3.5" />
            <span>Consulta del {formattedDate}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
          >
            <Share2 data-icon="inline-start" />
            Compartir
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onAskQuestion}
          >
            <MessageCircle data-icon="inline-start" />
            Preguntar
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            disabled={isSaving || isSaved}
          >
            <Bookmark data-icon="inline-start" />
            {isSaving ? "Guardando..." : isSaved ? "Guardado" : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
