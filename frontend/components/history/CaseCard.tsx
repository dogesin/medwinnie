"use client"

import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  FileText,
  MessageCircle,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Minus,
  TrendingDown,
  Camera,
  PenLine,
} from "lucide-react"
import type { MedicalCase, CaseStatus, HealthStatus } from "@/types/medical-case"

interface CaseCardProps {
  medicalCase: MedicalCase
}

function statusConfig(status: CaseStatus) {
  switch (status) {
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
      return <TrendingUp className="text-emerald-600" />
    case "igual":
      return <Minus className="text-amber-500" />
    case "peor":
      return <TrendingDown className="text-red-500" />
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

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr))
}

function formatRelativeDate(dateStr: string | null) {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return "Hoy"
  if (days === 1) return "Ayer"
  if (days < 7) return `Hace ${days} días`
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`
  return formatDate(dateStr)
}

export function CaseCard({ medicalCase }: CaseCardProps) {
  const statusCfg = statusConfig(medicalCase.status)

  return (
    <Link href={`/history/${medicalCase.id}`} className="block group">
      <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/30 group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold leading-snug truncate">
                {medicalCase.diagnosis}
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-1">
                <Calendar className="shrink-0" />
                {formatDate(medicalCase.consultation_date)}
              </CardDescription>
            </div>
            <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          {/* Health status + source type */}
          <div className="flex items-center gap-4 text-sm">
            {medicalCase.current_health_status ? (
              <div className="flex items-center gap-1.5">
                {healthIcon(medicalCase.current_health_status)}
                <span className="text-muted-foreground">
                  {healthLabel(medicalCase.current_health_status)}
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground text-xs italic">
                Sin actualización
              </span>
            )}

            <div className="flex items-center gap-1 text-muted-foreground">
              {medicalCase.source_type === "upload_photo" ? (
                <Camera className="shrink-0" />
              ) : (
                <PenLine className="shrink-0" />
              )}
              <span className="text-xs">
                {medicalCase.source_type === "upload_photo"
                  ? "Foto"
                  : "Texto"}
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="shrink-0" />
              <span>
                {medicalCase.diary_entry_count}{" "}
                {medicalCase.diary_entry_count === 1 ? "entrada" : "entradas"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="shrink-0" />
              <span>
                {medicalCase.question_count}{" "}
                {medicalCase.question_count === 1 ? "pregunta" : "preguntas"}
              </span>
            </div>
            {medicalCase.last_diary_entry_at && (
              <div className="flex items-center gap-1 ml-auto">
                <FileText className="shrink-0" />
                <span>{formatRelativeDate(medicalCase.last_diary_entry_at)}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-primary hover:text-primary"
          >
            Ver detalle
            <ChevronRight data-icon="inline-end" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
