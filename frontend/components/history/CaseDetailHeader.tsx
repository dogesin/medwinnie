"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  Minus,
  TrendingDown,
  Camera,
  PenLine,
  BookOpen,
  MessageCircle,
} from "lucide-react"
import type { MedicalCase, CaseStatus, HealthStatus } from "@/types/medical-case"

interface CaseDetailHeaderProps {
  medicalCase: MedicalCase
}

function statusConfig(status: CaseStatus) {
  switch (status) {
    case "borrador":
      return { label: "Borrador", variant: "outline" as const }
    case "en_tratamiento":
      return { label: "En tratamiento", variant: "default" as const }
    case "completado":
      return { label: "Completado", variant: "secondary" as const }
    case "archivado":
      return { label: "Archivado", variant: "outline" as const }
  }
}

function healthIcon(status: HealthStatus | null) {
  switch (status) {
    case "mejor":
      return <TrendingUp className="size-4 text-emerald-600" />
    case "igual":
      return <Minus className="size-4 text-amber-500" />
    case "peor":
      return <TrendingDown className="size-4 text-red-500" />
    default:
      return null
  }
}

function healthLabel(status: HealthStatus | null) {
  switch (status) {
    case "mejor":
      return "Mejor"
    case "igual":
      return "Igual"
    case "peor":
      return "Peor"
    default:
      return "Sin registro"
  }
}

function healthColor(status: HealthStatus | null) {
  switch (status) {
    case "mejor":
      return "text-emerald-600"
    case "igual":
      return "text-amber-500"
    case "peor":
      return "text-red-500"
    default:
      return "text-muted-foreground"
  }
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr))
}

function daysSince(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function CaseDetailHeader({ medicalCase }: CaseDetailHeaderProps) {
  const statusCfg = statusConfig(medicalCase.status)
  const days = daysSince(medicalCase.consultation_date)

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <Link
          href="/history"
          className="inline-flex items-center justify-center size-8 rounded-lg text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span className="sr-only">Volver al historial</span>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold tracking-tight truncate">
            {medicalCase.diagnosis}
          </h1>
        </div>
        <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
      </div>

      {/* Summary card */}
      <Card>
        <CardContent className="pt-1">
          <div className="flex flex-col gap-3">
            {/* Date and source */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4 shrink-0" />
                <span>{formatDate(medicalCase.consultation_date)}</span>
                <span className="text-xs">({days === 0 ? "Hoy" : days === 1 ? "Ayer" : `Hace ${days} días`})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {medicalCase.source_type === "upload_photo" ? (
                  <Camera className="size-3.5 shrink-0" />
                ) : (
                  <PenLine className="size-3.5 shrink-0" />
                )}
                <span>
                  {medicalCase.source_type === "upload_photo" ? "Foto" : "Texto"}
                </span>
              </div>
            </div>

            {/* Health status */}
            <div className="flex items-center gap-2">
              {healthIcon(medicalCase.current_health_status)}
              <span className={`text-sm font-medium ${healthColor(medicalCase.current_health_status)}`}>
                {medicalCase.current_health_status
                  ? `Estado: ${healthLabel(medicalCase.current_health_status)}`
                  : "Sin actualización de estado"}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BookOpen className="size-3.5 shrink-0" />
                <span>
                  {medicalCase.diary_entry_count}{" "}
                  {medicalCase.diary_entry_count === 1 ? "entrada" : "entradas"} en diario
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="size-3.5 shrink-0" />
                <span>
                  {medicalCase.question_count}{" "}
                  {medicalCase.question_count === 1 ? "pregunta" : "preguntas"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
