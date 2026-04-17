"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, BookOpen, CalendarDays, TrendingUp } from "lucide-react"
import type { MedicalCase, Medication, DiaryEntry, HealthStatus } from "@/types/medical-case"

interface CaseContextCardProps {
  medicalCase: MedicalCase
  medications: Medication[]
  diaryEntries: DiaryEntry[]
}

const statusEmoji: Record<HealthStatus, string> = {
  mejor: "😊",
  igual: "😐",
  peor: "😞",
}

const statusLabel: Record<HealthStatus, string> = {
  mejor: "Mejor",
  igual: "Igual",
  peor: "Peor",
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
  })
}

export function CaseContextCard({
  medicalCase,
  medications,
  diaryEntries,
}: CaseContextCardProps) {
  const lastEntry = diaryEntries[0] // already sorted desc in useCaseDetail
  const daysSinceConsultation = Math.floor(
    (Date.now() - new Date(medicalCase.consultation_date).getTime()) /
      (1000 * 60 * 60 * 24)
  )

  return (
    <Card className="border-primary/15 bg-primary/5">
      <CardContent className="pt-1 pb-3">
        <div className="flex flex-col gap-3">
          {/* Title row */}
          <div className="flex items-center gap-2">
            <TrendingUp className="size-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              Contexto de tu caso
            </span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Consultation date */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-6 rounded-md bg-primary/10 text-primary shrink-0">
                <CalendarDays className="size-3" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground">Consulta</span>
                <span className="text-xs font-medium truncate">
                  {formatDate(medicalCase.consultation_date)} · Día {daysSinceConsultation}
                </span>
              </div>
            </div>

            {/* Medications */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-6 rounded-md bg-primary/10 text-primary shrink-0">
                <Pill className="size-3" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground">Medicamentos</span>
                <span className="text-xs font-medium truncate">
                  {medications.map((m) => m.name).join(", ") || "Sin medicamentos"}
                </span>
              </div>
            </div>

            {/* Diary entries */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-6 rounded-md bg-primary/10 text-primary shrink-0">
                <BookOpen className="size-3" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground">Diario</span>
                <span className="text-xs font-medium">
                  {medicalCase.diary_entry_count}{" "}
                  {medicalCase.diary_entry_count === 1 ? "entrada" : "entradas"}
                </span>
              </div>
            </div>

            {/* Last status */}
            {lastEntry && (
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-6 rounded-md bg-primary/10 text-primary shrink-0">
                  <span className="text-xs">{statusEmoji[lastEntry.health_status]}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-muted-foreground">Último estado</span>
                  <span className="text-xs font-medium">
                    {statusLabel[lastEntry.health_status]} · {formatDate(lastEntry.entry_date)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Last diary note */}
          {lastEntry?.note && (
            <div className="rounded-lg bg-background/60 px-3 py-2 border border-primary/10">
              <p className="text-[11px] text-muted-foreground italic leading-relaxed line-clamp-2">
                &ldquo;{lastEntry.note}&rdquo;
              </p>
            </div>
          )}

          {/* Status badge */}
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              Winnie tiene el contexto completo de tu caso
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
