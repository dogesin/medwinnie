"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Minus,
  TrendingDown,
  Plus,
  BookOpen,
} from "lucide-react"
import type { DiaryEntry, HealthStatus } from "@/types/medical-case"

interface DiaryTimelineProps {
  entries: DiaryEntry[]
  onAddEntry: () => void
}

function healthIcon(status: HealthStatus) {
  switch (status) {
    case "mejor":
      return <TrendingUp className="size-4" />
    case "igual":
      return <Minus className="size-4" />
    case "peor":
      return <TrendingDown className="size-4" />
  }
}

function healthBadgeVariant(status: HealthStatus) {
  switch (status) {
    case "mejor":
      return "default" as const
    case "igual":
      return "secondary" as const
    case "peor":
      return "destructive" as const
  }
}

function healthLabel(status: HealthStatus) {
  switch (status) {
    case "mejor":
      return "Mejor"
    case "igual":
      return "Igual"
    case "peor":
      return "Peor"
  }
}

function formatEntryDate(dateStr: string) {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(dateStr))
}

function formatTime(dateStr: string) {
  return new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr))
}

export function DiaryTimeline({ entries, onAddEntry }: DiaryTimelineProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
            <BookOpen className="size-4" />
          </div>
          <h2 className="text-base font-semibold">Diario de evolución</h2>
        </div>
        <Button variant="outline" size="sm" onClick={onAddEntry}>
          <Plus data-icon="inline-start" />
          Agregar
        </Button>
      </div>

      {/* Empty state */}
      {entries.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-8">
            <div className="flex items-center justify-center size-12 rounded-2xl bg-muted text-muted-foreground">
              <BookOpen className="size-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Sin entradas aún
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Registra cómo te sientes para llevar un seguimiento de tu evolución
              </p>
            </div>
            <Button size="sm" onClick={onAddEntry}>
              <Plus data-icon="inline-start" />
              Primera entrada
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Timeline entries */}
      {entries.length > 0 && (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

          <div className="flex flex-col gap-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className="relative pl-10">
                {/* Timeline dot */}
                <div className="absolute left-0 top-3 flex items-center justify-center size-[30px] rounded-full bg-background border-2 border-primary/30">
                  <div className={`size-2.5 rounded-full ${
                    entry.health_status === "mejor"
                      ? "bg-emerald-500"
                      : entry.health_status === "igual"
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`} />
                </div>

                <Card className={index === 0 ? "border-primary/20 shadow-sm" : ""}>
                  <CardContent className="pt-1">
                    <div className="flex flex-col gap-2">
                      {/* Date + status row */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatEntryDate(entry.entry_date)} · {formatTime(entry.created_at)}
                        </span>
                        <Badge variant={healthBadgeVariant(entry.health_status)}>
                          {healthIcon(entry.health_status)}
                          <span className="ml-1">{healthLabel(entry.health_status)}</span>
                        </Badge>
                      </div>

                      {/* Note */}
                      {entry.note && (
                        <p className="text-sm text-foreground leading-relaxed">
                          {entry.note}
                        </p>
                      )}

                      {/* Symptoms */}
                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.symptoms.map((symptom) => (
                            <Badge
                              key={symptom}
                              variant="outline"
                              className="text-xs font-normal"
                            >
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
