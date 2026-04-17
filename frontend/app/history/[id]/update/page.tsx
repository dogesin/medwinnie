"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useUpdateStatus } from "@/hooks/useUpdateStatus"
import { StatusSelector } from "@/components/history/StatusSelector"
import { SymptomChips } from "@/components/history/SymptomChips"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  ArrowLeft,
  CheckCircle2,
  Stethoscope,
  BookOpen,
  AlertTriangle,
} from "lucide-react"
import type { HealthStatus } from "@/types/medical-case"

export default function UpdateStatusPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { medicalCase, isLoading, isSubmitting, submitted, error, submitUpdate } =
    useUpdateStatus(id)

  const [selectedStatus, setSelectedStatus] = useState<HealthStatus | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [note, setNote] = useState("")

  // ─── Loading skeleton ────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    )
  }

  // ─── Error state ─────────────────────────────────────────
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
              {error?.message ?? "Ocurrió un error inesperado. Intenta de nuevo."}
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

  // ─── Success state ───────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[70vh] gap-6">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 text-primary animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="size-10" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-300">
              ¡Actualización guardada!
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
              Tu estado y entrada al diario fueron registrados. Esto nos ayuda a
              seguir tu evolución.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button className="w-full" size="lg" render={<Link href={`/history/${id}`} />}>
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

  // ─── Main form view ──────────────────────────────────────
  const canSubmit = selectedStatus !== null

  function handleSubmit() {
    if (!selectedStatus) return
    submitUpdate(selectedStatus, selectedSymptoms, note)
  }

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
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold tracking-tight">
              Actualizar estado
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
                  {medicalCase.current_health_status && (
                    <span className="text-xs text-muted-foreground">
                      Último estado:{" "}
                      <span className="font-medium capitalize">
                        {medicalCase.current_health_status}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Status selection */}
        <StatusSelector value={selectedStatus} onChange={setSelectedStatus} />

        <Separator />

        {/* Symptom chips */}
        <SymptomChips
          selected={selectedSymptoms}
          onChange={setSelectedSymptoms}
        />

        <Separator />

        {/* Diary note */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-foreground">
              Tu diario de evolución
            </h2>
            <p className="text-sm text-muted-foreground">
              Escribe cómo te has sentido, qué ha cambiado, o cualquier
              observación (opcional)
            </p>
          </div>
          <Textarea
            placeholder="Ej: Hoy me sentí con más energía, dormí mejor que ayer. Todavía tengo un poco de tos pero menos que antes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="resize-none"
          />
          {note.length > 0 && (
            <p className="text-xs text-muted-foreground text-right">
              {note.length} caracteres
            </p>
          )}
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
              "Guardar actualización"
            )}
          </Button>

          {!canSubmit && (
            <p className="text-xs text-muted-foreground text-center">
              Selecciona cómo te sientes para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
