"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ExplanationBlock } from "./ExplanationBlock"
import { MedicationCard } from "./MedicationCard"
import { MarkdownText } from "./MarkdownText"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal } from "lucide-react"
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
} from "lucide-react"
import type { MedicalCase } from "@/types/consultation"

interface ResultExplanationProps {
  medicalCase: MedicalCase
  onAdjustLevel: () => void
}

export function ResultExplanation({
  medicalCase,
  onAdjustLevel,
}: ResultExplanationProps) {
  const { analysis_result, medications } = medicalCase
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-6">
      {/* Summary card (always visible) */}
      <Card className="border-primary/20 bg-primary/5 ring-primary/20">
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
              <MarkdownText text={analysis_result.en_corto} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs navigation */}
      <div className="flex items-center justify-between">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex items-center justify-between gap-2">
            <TabsList variant="line" className="w-fit">
              <TabsTrigger value="overview">Tu diagnóstico</TabsTrigger>
              <TabsTrigger value="medications">
                Medicamentos
                <Badge variant="secondary" className="ml-1 text-xs px-1.5">
                  {medications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="care">Cuidados</TabsTrigger>
            </TabsList>

            <Button
              variant="ghost"
              size="sm"
              onClick={onAdjustLevel}
              className="hidden sm:inline-flex"
            >
              <SlidersHorizontal data-icon="inline-start" />
              Nivel
            </Button>
          </div>

          {/* ─── TAB: Diagnóstico ────────────────────────── */}
          <TabsContent value="overview">
            <div className="flex flex-col gap-4 mt-4">
              <ExplanationBlock
                icon={<Stethoscope className="size-4" />}
                title="¿Qué tienes?"
                subtitle="Tu diagnóstico explicado"
              >
                <MarkdownText text={analysis_result.que_tienes} />
              </ExplanationBlock>

              <ExplanationBlock
                icon={<HelpCircle className="size-4" />}
                title="¿Por qué pasa?"
                subtitle="Causas y contexto de tu condición"
              >
                <MarkdownText text={analysis_result.por_que_pasa} />
              </ExplanationBlock>

              <ExplanationBlock
                icon={<ShieldCheck className="size-4" />}
                title="¿Por qué este tratamiento?"
                subtitle="La razón detrás de cada decisión médica"
              >
                <MarkdownText text={analysis_result.por_que_tratamiento} />
              </ExplanationBlock>
            </div>
          </TabsContent>

          {/* ─── TAB: Medicamentos ───────────────────────── */}
          <TabsContent value="medications">
            <div className="flex flex-col gap-4 mt-4">
              {/* Medication summary */}
              <ExplanationBlock
                icon={<Pill className="size-4" />}
                title="Tu tratamiento"
                subtitle="Resumen de tus medicamentos"
                variant="info"
              >
                <MarkdownText text={analysis_result.medicamentos} />
              </ExplanationBlock>

              {/* Individual medication cards */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Detalle por medicamento ({medications.length})
                </h3>
                {medications
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((med) => (
                    <MedicationCard key={med.id} medication={med} />
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* ─── TAB: Cuidados ───────────────────────────── */}
          <TabsContent value="care">
            <div className="flex flex-col gap-4 mt-4">
              <ExplanationBlock
                icon={<Heart className="size-4" />}
                title="¿Qué cuidar?"
                subtitle="Recomendaciones para tu recuperación"
              >
                <MarkdownText text={analysis_result.que_cuidar} />
              </ExplanationBlock>

              <ExplanationBlock
                icon={<AlertTriangle className="size-4" />}
                title="Ojo con esto"
                subtitle="Señales de alerta que no debes ignorar"
                variant="warning"
              >
                <MarkdownText text={analysis_result.ojo_con_esto} />
              </ExplanationBlock>

              {analysis_result.estudios_pendientes && (
                <ExplanationBlock
                  icon={<FlaskConical className="size-4" />}
                  title="Estudios pendientes"
                  subtitle="Análisis o estudios sugeridos"
                >
                  <MarkdownText text={analysis_result.estudios_pendientes} />
                </ExplanationBlock>
              )}

              <ExplanationBlock
                icon={<MessageSquareText className="size-4" />}
                title="¿Qué preguntar?"
                subtitle="Preguntas útiles para tu próxima consulta"
              >
                <MarkdownText text={analysis_result.que_preguntar} />
              </ExplanationBlock>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile adjust level button */}
      <div className="sm:hidden">
        <Button
          variant="outline"
          className="w-full"
          onClick={onAdjustLevel}
        >
          <SlidersHorizontal data-icon="inline-start" />
          Ajustar nivel de detalle
        </Button>
      </div>
    </div>
  )
}
