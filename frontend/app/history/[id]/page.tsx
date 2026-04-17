"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { useCaseDetail } from "@/hooks/useCaseDetail"
import { CaseDetailHeader } from "@/components/history/CaseDetailHeader"
import { DiaryTimeline } from "@/components/history/DiaryTimeline"
import { CaseActions } from "@/components/history/CaseActions"
import { CaseDetailSkeleton } from "@/components/history/CaseDetailSkeleton"
import { ExplanationBlock } from "@/components/consultation/ExplanationBlock"
import { MedicationCard } from "@/components/consultation/MedicationCard"
import { MarkdownText } from "@/components/consultation/MarkdownText"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Stethoscope,
  HelpCircle,
  Pill,
  ShieldCheck,
  Heart,
  AlertTriangle,
  FlaskConical,
  MessageSquareText,
  Zap,
  RefreshCw,
  ImageIcon,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import type { HealthStatus } from "@/types/medical-case"
import type { AnalysisResult } from "@/types/consultation"

const SUGGESTED_QUESTIONS = [
  "¿Cuánto tiempo dura el tratamiento?",
  "¿Hay efectos secundarios que deba vigilar?",
  "¿Cuándo debo volver al médico?",
  "¿Puedo hacer ejercicio con esta condición?",
]

export default function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { medicalCase, medications, diaryEntries, isLoading, error } =
    useCaseDetail(id)

  const [updateSheetOpen, setUpdateSheetOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<HealthStatus | null>(null)
  const [updateNote, setUpdateNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // ─── Loading state ────────────────────────────────────────
  if (isLoading) {
    return <CaseDetailSkeleton />
  }

  // ─── Error state ──────────────────────────────────────────
  if (error || !medicalCase) {
    return (
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
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // Cast analysis_result to the AnalysisResult shape for display
  const analysis = medicalCase.analysis_result as unknown as AnalysisResult | null

  function handleUpdateStatus() {
    setUpdateSheetOpen(true)
  }

  function handleSubmitUpdate() {
    if (!selectedStatus) return
    setIsSubmitting(true)
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false)
      setUpdateSheetOpen(false)
      setShowSuccess(true)
      setSelectedStatus(null)
      setUpdateNote("")
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  function handleAskQuestion() {
    router.push(`/history/${id}/chat`)
  }

  function handleEdit() {
    router.push(`/history/${id}/edit`)
  }

  function handleShare() {
    if (!medicalCase) return
    if (navigator.share) {
      navigator.share({
        title: medicalCase.diagnosis,
        text: `Caso: ${medicalCase.diagnosis}`,
      })
    } else {
      window.alert("Enlace copiado al portapapeles (simulado)")
    }
  }

  function handleNewConsultation() {
    router.push("/nueva-consulta")
  }

  function handleAddDiaryEntry() {
    router.push(`/history/${id}/diary`)
  }

  const isDraft = medicalCase.status === "borrador"

  // ─── Main view ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Success toast */}
        {showSuccess && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="size-4" />
            Estado actualizado correctamente
          </div>
        )}

        {/* Back link */}
        <Link
          href="/history"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> Mi Historial
        </Link>

        {/* Draft banner */}
        {isDraft && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <AlertTriangle className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-amber-900">
                  Borrador — pendiente de confirmar
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Revisa la explicación, pregúntale a Winnie lo que necesites y guárdala cuando estés listo.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header with case info */}
        <CaseDetailHeader medicalCase={medicalCase} />

        {/* Explanation tabs — only show if analysis data exists with full blocks */}
        {analysis && analysis.en_corto ? (
          <>
            {/* Quick summary card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-1">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-primary/15 text-primary shrink-0 mt-0.5">
                    <Zap className="size-5" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">En corto</h3>
                      <Badge variant="outline" className="text-xs">
                        Resumen
                      </Badge>
                    </div>
                    <MarkdownText text={analysis.en_corto} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accordion */}
            <Accordion openMultiple defaultValue={[]}>
              {medicalCase.source_type === "upload_photo" && (
                <AccordionItem value="receta" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <ImageIcon className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">Receta original</p>
                        <p className="text-xs text-muted-foreground">La imagen que subiste</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    {medicalCase.source_image_path ? (
                      <img
                        src={medicalCase.source_image_path}
                        alt="Receta médica"
                        className="w-full rounded-xl border object-contain max-h-96"
                        onError={(e) => {
                          const target = e.currentTarget
                          target.style.display = "none"
                          target.nextElementSibling?.removeAttribute("hidden")
                        }}
                      />
                    ) : null}
                    <div
                      hidden={!!medicalCase.source_image_path}
                      className="flex flex-col items-center gap-2 py-8 text-center text-muted-foreground"
                    >
                      <ImageIcon className="size-8 opacity-30" />
                      <p className="text-sm">Imagen no disponible</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {analysis.que_tienes && (
                <AccordionItem value="que_tienes" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Stethoscope className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">¿Qué tienes?</p>
                        <p className="text-xs text-muted-foreground">Tu diagnóstico explicado</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-1">
                    <MarkdownText text={analysis.que_tienes} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {analysis.por_que_pasa && (
                <AccordionItem value="por_que_pasa" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <HelpCircle className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">¿Por qué pasa?</p>
                        <p className="text-xs text-muted-foreground">Causas y contexto de tu condición</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-1">
                    <MarkdownText text={analysis.por_que_pasa} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {analysis.por_que_tratamiento && (
                <AccordionItem value="por_que_tratamiento" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <ShieldCheck className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">¿Por qué este tratamiento?</p>
                        <p className="text-xs text-muted-foreground">La razón detrás de cada decisión médica</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-1">
                    <MarkdownText text={analysis.por_que_tratamiento} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {(analysis.medicamentos || medications.length > 0) && (
                <AccordionItem value="medicamentos" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Pill className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">Medicamentos</p>
                        <p className="text-xs text-muted-foreground">
                          {medications.length > 0 ? `${medications.length} medicamento${medications.length !== 1 ? "s" : ""}` : "Tu tratamiento"}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <div className="flex flex-col gap-3">
                      {analysis.medicamentos && (
                        <MarkdownText text={analysis.medicamentos} />
                      )}
                      {medications.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {medications
                            .sort((a, b) => a.order_index - b.order_index)
                            .map((med) => (
                              <MedicationCard
                                key={med.id}
                                medication={{
                                  ...med,
                                  purpose: med.purpose ?? "",
                                  how_it_works: "",
                                  how_to_take: "",
                                  important_consideration: null,
                                  created_at: "",
                                  updated_at: "",
                                }}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {analysis.que_cuidar && (
                <AccordionItem value="que_cuidar" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Heart className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">¿Qué cuidar?</p>
                        <p className="text-xs text-muted-foreground">Recomendaciones para tu recuperación</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-1">
                    <MarkdownText text={analysis.que_cuidar} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {analysis.ojo_con_esto && (
                <AccordionItem value="ojo_con_esto" className="border border-amber-200 bg-amber-50/50 rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <AlertTriangle className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">Ojo con esto</p>
                        <p className="text-xs text-muted-foreground">Señales de alerta que no debes ignorar</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-1">
                    <MarkdownText text={analysis.ojo_con_esto} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {analysis.estudios_pendientes && (
                <AccordionItem value="estudios_pendientes" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FlaskConical className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">Estudios pendientes</p>
                        <p className="text-xs text-muted-foreground">Análisis o estudios sugeridos</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-1">
                    <MarkdownText text={analysis.estudios_pendientes} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {analysis.que_preguntar && (
                <AccordionItem value="que_preguntar" className="border rounded-xl mb-2 px-1 not-last:border-b">
                  <AccordionTrigger className="px-3 hover:no-underline">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MessageSquareText className="size-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">¿Qué preguntar?</p>
                        <p className="text-xs text-muted-foreground">Preguntas útiles para tu próxima consulta</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-1">
                    <MarkdownText text={analysis.que_preguntar} />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </>
        ) : (
          /* Fallback: show simple summary from the basic analysis_result */
          <Card>
            <CardContent className="pt-1">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Resumen del diagnóstico</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {medicalCase.diagnosis_raw}
                </p>
                {medicalCase.analysis_result &&
                  typeof medicalCase.analysis_result === "object" &&
                  "resumen" in medicalCase.analysis_result && (
                    <p className="text-sm text-foreground">
                      {String((medicalCase.analysis_result as Record<string, unknown>).resumen)}
                    </p>
                  )}
                {medicalCase.analysis_result &&
                  typeof medicalCase.analysis_result === "object" &&
                  "cuidados" in medicalCase.analysis_result && (
                    <div className="mt-2">
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Cuidados:
                      </h4>
                      <ul className="list-disc pl-4 text-sm text-foreground space-y-0.5">
                        {(
                          (medicalCase.analysis_result as Record<string, unknown>)
                            .cuidados as string[]
                        ).map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Pregúntale a Winnie ───────────────────── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold">Pregúntale a Winnie</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Conoce tu diagnóstico y puede resolver tus dudas
              </p>
            </div>
            {medicalCase.question_count > 0 && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {medicalCase.question_count}{" "}
                {medicalCase.question_count === 1 ? "pregunta" : "preguntas"}
              </span>
            )}
          </div>

          {/* Suggested question chips */}
          <div className="flex flex-col gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => router.push(`/history/${id}/chat`)}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <MessageCircle className="size-4 shrink-0 text-primary/50" />
                <span className="flex-1">{q}</span>
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Open full chat */}
          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => router.push(`/history/${id}/chat`)}
          >
            <MessageCircle className="size-4" />
            Abrir chat completo
          </Button>
        </div>

        {/* Guardar en historial (solo borradores) */}
        {isDraft && (
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">¿Todo claro?</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Guarda esta consulta en tu historial para poder hacerle seguimiento con tu diario de salud.
              </p>
            </div>
            <Button
              className="w-full rounded-xl"
              onClick={() => router.push("/history")}
            >
              <CheckCircle2 className="size-4" />
              Guardar en mi historial
            </Button>
            <button
              onClick={() => router.push("/history")}
              className="text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Descartar borrador
            </button>
          </div>
        )}

        {/* Diary + Actions (solo casos confirmados) */}
        {!isDraft && (
          <>
            <DiaryTimeline entries={diaryEntries} onAddEntry={handleAddDiaryEntry} />
            <CaseActions
              onUpdateStatus={handleUpdateStatus}
              onShare={handleShare}
              onNewConsultation={handleNewConsultation}
            />
          </>
        )}

        {/* Update Status Sheet */}
        <Sheet open={updateSheetOpen} onOpenChange={setUpdateSheetOpen}>
          <SheetContent side="bottom" className="rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>¿Cómo te sientes?</SheetTitle>
              <SheetDescription>
                Actualiza tu estado para llevar un seguimiento de tu evolución
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-5 py-4">
              {/* Health status toggles */}
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    {
                      value: "mejor" as HealthStatus,
                      label: "Mejor",
                      emoji: "😊",
                      color: "border-emerald-500 bg-emerald-50 text-emerald-700",
                    },
                    {
                      value: "igual" as HealthStatus,
                      label: "Igual",
                      emoji: "😐",
                      color: "border-amber-500 bg-amber-50 text-amber-700",
                    },
                    {
                      value: "peor" as HealthStatus,
                      label: "Peor",
                      emoji: "😞",
                      color: "border-red-500 bg-red-50 text-red-700",
                    },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                      selectedStatus === option.value
                        ? option.color
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Note */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="update-note"
                  className="text-sm font-medium text-foreground"
                >
                  ¿Algo que quieras agregar? (opcional)
                </label>
                <Textarea
                  id="update-note"
                  placeholder="Ej: Hoy me sentí con más energía..."
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmitUpdate}
                disabled={!selectedStatus || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar actualización"
                )}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
