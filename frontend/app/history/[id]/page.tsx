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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
  CheckCircle2,
} from "lucide-react"
import type { HealthStatus } from "@/types/medical-case"
import type { AnalysisResult } from "@/types/consultation"

export default function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { medicalCase, medications, diaryEntries, isLoading, error } =
    useCaseDetail(id)

  const [activeTab, setActiveTab] = useState("overview")
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
    window.alert("Navegando a: /upload-recipe")
  }

  function handleAddDiaryEntry() {
    router.push(`/history/${id}/diary`)
  }

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

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList variant="line" className="w-fit">
                <TabsTrigger value="overview">Diagnóstico</TabsTrigger>
                <TabsTrigger value="medications">
                  Medicamentos
                  <Badge variant="secondary" className="ml-1 text-xs px-1.5">
                    {medications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="care">Cuidados</TabsTrigger>
              </TabsList>

              {/* TAB: Diagnóstico */}
              <TabsContent value="overview">
                <div className="flex flex-col gap-4 mt-4">
                  {analysis.que_tienes && (
                    <ExplanationBlock
                      icon={<Stethoscope className="size-4" />}
                      title="¿Qué tienes?"
                      subtitle="Tu diagnóstico explicado"
                    >
                      <MarkdownText text={analysis.que_tienes} />
                    </ExplanationBlock>
                  )}

                  {analysis.por_que_pasa && (
                    <ExplanationBlock
                      icon={<HelpCircle className="size-4" />}
                      title="¿Por qué pasa?"
                      subtitle="Causas y contexto de tu condición"
                    >
                      <MarkdownText text={analysis.por_que_pasa} />
                    </ExplanationBlock>
                  )}

                  {analysis.por_que_tratamiento && (
                    <ExplanationBlock
                      icon={<ShieldCheck className="size-4" />}
                      title="¿Por qué este tratamiento?"
                      subtitle="La razón detrás de cada decisión médica"
                    >
                      <MarkdownText text={analysis.por_que_tratamiento} />
                    </ExplanationBlock>
                  )}
                </div>
              </TabsContent>

              {/* TAB: Medicamentos */}
              <TabsContent value="medications">
                <div className="flex flex-col gap-4 mt-4">
                  {analysis.medicamentos && (
                    <ExplanationBlock
                      icon={<Pill className="size-4" />}
                      title="Tu tratamiento"
                      subtitle="Resumen de tus medicamentos"
                      variant="info"
                    >
                      <MarkdownText text={analysis.medicamentos} />
                    </ExplanationBlock>
                  )}

                  {medications.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Detalle por medicamento ({medications.length})
                      </h3>
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
              </TabsContent>

              {/* TAB: Cuidados */}
              <TabsContent value="care">
                <div className="flex flex-col gap-4 mt-4">
                  {analysis.que_cuidar && (
                    <ExplanationBlock
                      icon={<Heart className="size-4" />}
                      title="¿Qué cuidar?"
                      subtitle="Recomendaciones para tu recuperación"
                    >
                      <MarkdownText text={analysis.que_cuidar} />
                    </ExplanationBlock>
                  )}

                  {analysis.ojo_con_esto && (
                    <ExplanationBlock
                      icon={<AlertTriangle className="size-4" />}
                      title="Ojo con esto"
                      subtitle="Señales de alerta que no debes ignorar"
                      variant="warning"
                    >
                      <MarkdownText text={analysis.ojo_con_esto} />
                    </ExplanationBlock>
                  )}

                  {analysis.estudios_pendientes && (
                    <ExplanationBlock
                      icon={<FlaskConical className="size-4" />}
                      title="Estudios pendientes"
                      subtitle="Análisis o estudios sugeridos"
                    >
                      <MarkdownText text={analysis.estudios_pendientes} />
                    </ExplanationBlock>
                  )}

                  {analysis.que_preguntar && (
                    <ExplanationBlock
                      icon={<MessageSquareText className="size-4" />}
                      title="¿Qué preguntar?"
                      subtitle="Preguntas útiles para tu próxima consulta"
                    >
                      <MarkdownText text={analysis.que_preguntar} />
                    </ExplanationBlock>
                  )}
                </div>
              </TabsContent>
            </Tabs>
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

        {/* Diary Timeline */}
        <DiaryTimeline entries={diaryEntries} onAddEntry={handleAddDiaryEntry} />

        {/* Actions */}
        <CaseActions
          onUpdateStatus={handleUpdateStatus}
          onAskQuestion={handleAskQuestion}
          onEdit={handleEdit}
          onShare={handleShare}
          onNewConsultation={handleNewConsultation}
        />

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
