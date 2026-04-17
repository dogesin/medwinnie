"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useDiaryEntry } from "@/hooks/useDiaryEntry"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Stethoscope,
  AlertTriangle,
  PenLine,
} from "lucide-react"
import type { HealthStatus } from "@/types/medical-case"

// ─── Health status options ──────────────────────────────
const STATUS_OPTIONS = [
  {
    value: "mejor" as HealthStatus,
    label: "Mejor",
    emoji: "😊",
    activeClasses: "border-emerald-500 bg-emerald-50 text-emerald-700",
  },
  {
    value: "igual" as HealthStatus,
    label: "Igual",
    emoji: "😐",
    activeClasses: "border-amber-500 bg-amber-50 text-amber-700",
  },
  {
    value: "peor" as HealthStatus,
    label: "Peor",
    emoji: "😞",
    activeClasses: "border-red-500 bg-red-50 text-red-700",
  },
] as const

export default function AddDiaryEntryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { medicalCase, isLoading, isSubmitting, submitted, error, submitEntry } =
    useDiaryEntry(id)

  const [selectedStatus, setSelectedStatus] = useState<HealthStatus | null>(
    null
  )
  const [note, setNote] = useState("")

  // ─── Loading skeleton ───────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    )
  }

  // ─── Error state ────────────────────────────────────────
  if (error || !medicalCase) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="flex flex-col items-center gap-3 text-center max-w-md">
            <div className="flex items-center justify-center size-16 rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="size-8" />
            </div>
            <h2 className="text-lg font-semibold">
              No pudimos cargar este caso
            </h2>
            <p className="text-sm text-muted-foreground">
              {error?.message ??
                "Ocurrió un error inesperado. Intenta de nuevo."}
            </p>
            <Link
              href="/history"
              className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Volver al historial
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── Success state ──────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[70vh] gap-6">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 text-primary animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="size-10" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-300">
              ¡Entrada guardada!
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
              Tu entrada al diario fue registrada. Sigue escribiendo para llevar
              un mejor control de tu evolución.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              className="w-full"
              size="lg"
              render={<Link href={`/history/${id}`} />}
            >
              <BookOpen data-icon="inline-start" />
              Ver detalle del caso
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              render={<Link href="/history" />}
            >
              Volver al historial
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Form helpers ───────────────────────────────────────
  const canSubmit = selectedStatus !== null && note.trim().length > 0

  function handleSubmit() {
    if (!selectedStatus) return
    submitEntry(selectedStatus, note)
  }

  // ─── Main form view ────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href={`/history/${id}`}
            className="inline-flex items-center justify-center size-8 rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span className="sr-only">Volver al caso</span>
          </Link>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary shrink-0">
              <PenLine className="size-4" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              Agregar al Diario
            </h1>
          </div>
        </div>

        {/* Case context card */}
        <Card>
          <CardContent className="pt-1">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary shrink-0">
                <Stethoscope className="size-5" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {medicalCase.diagnosis}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {medicalCase.status === "en_tratamiento"
                      ? "En tratamiento"
                      : medicalCase.status === "completado"
                        ? "Completado"
                        : "Archivado"}
                  </Badge>
                  {medicalCase.diary_entry_count > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {medicalCase.diary_entry_count}{" "}
                      {medicalCase.diary_entry_count === 1
                        ? "entrada"
                        : "entradas"}{" "}
                      en el diario
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Quick health status */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-foreground">
              ¿Cómo te sientes hoy?
            </h2>
            <p className="text-sm text-muted-foreground">
              Selecciona tu estado para acompañar esta entrada
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                  selectedStatus === option.value
                    ? option.activeClasses
                    : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Diary note — main focus */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-foreground">
              Escribe tu entrada
            </h2>
            <p className="text-sm text-muted-foreground">
              Cuenta cómo te has sentido, qué ha cambiado o cualquier detalle
              importante de tu día
            </p>
          </div>
          <Textarea
            placeholder="Ej: Hoy me sentí con más energía que ayer. Dormí bien y el dolor ha bajado bastante. Sigo tomando el medicamento como me indicaron..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={6}
            className="resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Tip: Escribe con detalle para que puedas comparar tu progreso
              después
            </p>
            {note.length > 0 && (
              <p className="text-xs text-muted-foreground shrink-0 ml-4">
                {note.length} caracteres
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3 pt-2 pb-8">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Guardando...
              </>
            ) : (
              <>
                <PenLine data-icon="inline-start" />
                Guardar entrada
              </>
            )}
          </Button>

          {!canSubmit && (
            <p className="text-xs text-muted-foreground text-center">
              {!selectedStatus
                ? "Selecciona cómo te sientes para continuar"
                : "Escribe algo en tu diario para continuar"}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
