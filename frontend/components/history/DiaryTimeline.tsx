"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Minus, TrendingDown, Plus, Pencil } from "lucide-react"
import type { DiaryEntry, HealthStatus } from "@/types/medical-case"

interface DiaryTimelineProps {
  entries: DiaryEntry[]
  onAddEntry: () => void
}

function healthConfig(status: HealthStatus) {
  switch (status) {
    case "mejor":
      return { icon: TrendingUp, label: "Mejor", dot: "bg-emerald-500", badge: "default" as const }
    case "igual":
      return { icon: Minus, label: "Igual", dot: "bg-amber-500", badge: "secondary" as const }
    case "peor":
      return { icon: TrendingDown, label: "Peor", dot: "bg-red-500", badge: "destructive" as const }
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">¿Cómo vas?</h2>
          {entries.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {entries.length} {entries.length === 1 ? "actualización" : "actualizaciones"}
            </p>
          )}
        </div>
        <Button variant="outline" size="sm" className="rounded-xl" onClick={onAddEntry}>
          <Plus className="size-3.5" />
          Agregar actualización
        </Button>
      </div>

      {/* Empty state */}
      {entries.length === 0 && (
        <button
          onClick={onAddEntry}
          className="group w-full rounded-xl border border-dashed border-border px-4 py-6 text-center transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <Pencil className="mx-auto mb-2 size-5 text-muted-foreground/50 transition-colors group-hover:text-primary/50" />
          <p className="text-sm font-medium text-foreground">
            Toca para agregar tu primera nota
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ¿Mejoraste? ¿Tienes alguna duda? Escríbelo aquí.
          </p>
        </button>
      )}

      {/* Timeline */}
      {entries.length > 0 && (
        <div className="relative">
          <div className="absolute left-[14px] top-3 bottom-3 w-px bg-border" />

          <div className="flex flex-col gap-3">
            {entries.map((entry, index) => {
              const cfg = healthConfig(entry.health_status)
              const Icon = cfg.icon
              return (
                <div key={entry.id} className="relative pl-9">
                  {/* Dot */}
                  <div className="absolute left-0 top-3 flex size-[28px] items-center justify-center rounded-full bg-background border-2 border-border">
                    <div className={`size-2 rounded-full ${cfg.dot}`} />
                  </div>

                  <Card className={index === 0 ? "border-primary/20" : ""}>
                    <CardContent className="py-3 px-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {formatEntryDate(entry.entry_date)} · {formatTime(entry.created_at)}
                        </span>
                        <Badge variant={cfg.badge} className="gap-1 text-xs">
                          <Icon className="size-3" />
                          {cfg.label}
                        </Badge>
                      </div>

                      {entry.note && (
                        <p className="text-sm text-foreground leading-relaxed">
                          {entry.note}
                        </p>
                      )}

                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {entry.symptoms.map((s) => (
                            <Badge key={s} variant="outline" className="text-xs font-normal">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
