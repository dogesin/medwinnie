"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { useEditCase } from "@/hooks/useEditCase"
import { SymptomChips } from "@/components/history/SymptomChips"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  ArrowLeft,
  CheckCircle2,
  Stethoscope,
  PenLine,
  Calendar,
  FileText,
  AlertTriangle,
  ShieldAlert,
  BookOpen,
} from "lucide-react"
import type { MedicalCaseEditData } from "@/types/medical-case"

export default function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const {
    medicalCase,
    initialSymptoms,
    isLoading,
    isSubmitting,
    submitted,
    error,
    submitEdit,
  } = useEditCase(id)

  // Form state — initialized from the loaded case
  const [diagnosis, setDiagnosis] = useState("")
  const [diagnosisRaw, setDiagnosisRaw] = useState("")
  const [consultationDate, setConsultationDate] = useState("")
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [initialized, setInitialized] = useState(false)

  // Populate form once data is loaded
  useEffect(() => {
    if (medicalCase && !initialized) {
      setDiagnosis(medicalCase.diagnosis)
      setDiagnosisRaw(medicalCase.diagnosis_raw)
      setConsultationDate(medicalCase.consultation_date)
      setSymptoms(initialSymptoms)
      setInitialized(true)
    }
  }, [medicalCase, initialSymptoms, initialized])

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
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-lg" />
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
              Caso actualizado
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
              Los cambios en tu caso fueron guardados correctamente. La
              explicación de Winnie no fue modificada.
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

  // ─── Validation ────────────────────────────────────────
  const diagnosisTrimmed = diagnosis.trim()
  const diagnosisRawTrimmed = diagnosisRaw.trim()
  const canSubmit =
    diagnosisTrimmed.length > 0 &&
    diagnosisRawTrimmed.length > 0 &&
    consultationDate.length > 0

  // Check if any changes were made
  const hasChanges =
    diagnosis !== medicalCase.diagnosis ||
    diagnosisRaw !== medicalCase.diagnosis_raw ||
    consultationDate !== medicalCase.consultation_date ||
    JSON.stringify(symptoms.sort()) !==
      JSON.stringify([...initialSymptoms].sort())

  function handleSubmit() {
    if (!canSubmit) return

    const editData: MedicalCaseEditData = {
      diagnosis: diagnosisTrimmed,
      diagnosis_raw: diagnosisRawTrimmed,
      consultation_date: consultationDate,
      symptoms,
    }

    submitEdit(editData)
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
              Editar caso
            </h1>
          </div>
        </div>

        {/* AI disclaimer */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-1">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-amber-100 text-amber-600 shrink-0">
                <ShieldAlert className="size-5" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-amber-800">
                  La explicación de Winnie no se modificará
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Puedes editar el contexto, síntomas y detalles de tu caso. La
                  explicación generada por IA permanecerá sin cambios.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current case context card */}
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
                  <Badge variant="secondary" className="text-xs">
                    {medicalCase.source_type === "upload_photo"
                      ? "Desde foto"
                      : "Texto manual"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Diagnosis field */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="size-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Diagnóstico
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            El nombre o título principal de tu diagnóstico
          </p>
          <Input
            placeholder="Ej: Faringitis bacteriana"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
          {diagnosisTrimmed.length === 0 && initialized && (
            <p className="text-xs text-destructive">
              El diagnóstico es requerido
            </p>
          )}
        </div>

        <Separator />

        {/* Context / diagnosis_raw field */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Contexto original
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            El texto original de tu receta, diagnóstico o indicaciones del
            médico
          </p>
          <Textarea
            placeholder="Ej: Faringitis aguda de probable origen bacteriano. Se indica amoxicilina 500mg c/8h por 7 días..."
            value={diagnosisRaw}
            onChange={(e) => setDiagnosisRaw(e.target.value)}
            rows={5}
            className="resize-none"
          />
          <div className="flex items-center justify-between">
            {diagnosisRawTrimmed.length === 0 && initialized && (
              <p className="text-xs text-destructive">
                El contexto es requerido
              </p>
            )}
            {diagnosisRaw.length > 0 && (
              <p className="text-xs text-muted-foreground ml-auto">
                {diagnosisRaw.length} caracteres
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Consultation date */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Fecha de consulta
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            La fecha en la que visitaste al médico
          </p>
          <Input
            type="date"
            value={consultationDate}
            onChange={(e) => setConsultationDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <Separator />

        {/* Symptoms */}
        <SymptomChips selected={symptoms} onChange={setSymptoms} />

        <Separator />

        {/* Submit section */}
        <div className="flex flex-col gap-3 pt-2 pb-8">
          {hasChanges && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <PenLine className="size-4 text-primary shrink-0" />
              <p className="text-xs text-primary font-medium">
                Tienes cambios sin guardar
              </p>
            </div>
          )}

          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!canSubmit || !hasChanges || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Guardando cambios...
              </>
            ) : (
              <>
                <PenLine data-icon="inline-start" />
                Guardar cambios
              </>
            )}
          </Button>

          {!canSubmit && (
            <p className="text-xs text-muted-foreground text-center">
              Completa los campos requeridos para guardar
            </p>
          )}

          {canSubmit && !hasChanges && (
            <p className="text-xs text-muted-foreground text-center">
              No hay cambios para guardar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
