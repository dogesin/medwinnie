"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  ChevronRight,
  TrendingUp,
  Minus,
  TrendingDown,
  BookOpen,
  Clock,
} from "lucide-react"
import type { MedicalCase, CaseStatus, HealthStatus } from "@/types/medical-case"

interface CaseCardProps {
  medicalCase: MedicalCase
}

function statusConfig(status: CaseStatus) {
  switch (status) {
    case "borrador":
      return { label: "Borrador", className: "bg-amber-50 text-amber-700 border-amber-200" }
    case "en_tratamiento":
      return { label: "En tratamiento", className: "bg-primary/10 text-primary border-primary/20" }
    case "completado":
      return { label: "Completado", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    case "archivado":
      return { label: "Archivado", className: "bg-muted text-muted-foreground border-border" }
  }
}

function healthIndicator(status: HealthStatus | null) {
  switch (status) {
    case "mejor":
      return { icon: TrendingUp, label: "Mejor", className: "text-emerald-600" }
    case "igual":
      return { icon: Minus, label: "Igual", className: "text-amber-500" }
    case "peor":
      return { icon: TrendingDown, label: "Peor", className: "text-red-500" }
    default:
      return null
  }
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr))
}

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (mins < 60) return "hace un momento"
  if (hours < 24) return `hace ${hours}h`
  if (days === 1) return "ayer"
  if (days < 7) return `hace ${days} días`
  if (days < 30) return `hace ${Math.floor(days / 7)} sem.`
  return formatDate(dateStr)
}

export function CaseCard({ medicalCase }: CaseCardProps) {
  const statusCfg = statusConfig(medicalCase.status)
  const health = healthIndicator(medicalCase.current_health_status)
  const hasDiary = medicalCase.diary_entry_count > 0

  return (
    <Link href={`/history/${medicalCase.id}`} className="block group">
      <Card className="relative overflow-hidden rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20 active:scale-[0.99]">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 pr-6">
          <h3 className="text-base font-semibold leading-snug">
            {medicalCase.diagnosis}
          </h3>
          <Badge
            variant="outline"
            className={`shrink-0 text-[11px] font-medium ${statusCfg.className}`}
          >
            {statusCfg.label}
          </Badge>
        </div>

        {/* Meta row */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {formatDate(medicalCase.consultation_date)}
          </span>

          {health && (
            <span className={`flex items-center gap-1 font-medium ${health.className}`}>
              <health.icon className="size-3" />
              {health.label}
            </span>
          )}

          {hasDiary && (
            <span className="flex items-center gap-1 text-primary/70">
              <BookOpen className="size-3" />
              {medicalCase.diary_entry_count}{" "}
              {medicalCase.diary_entry_count === 1 ? "entrada" : "entradas"}
            </span>
          )}
        </div>

        {/* Last update */}
        {medicalCase.last_diary_entry_at && (
          <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground/70">
            <Clock className="size-3" />
            Actualizado {relativeTime(medicalCase.last_diary_entry_at)}
          </div>
        )}

        {/* Arrow */}
        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/0 transition-all group-hover:text-muted-foreground" />
      </Card>
    </Link>
  )
}
