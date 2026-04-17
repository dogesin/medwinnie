"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useAnalysisLoading } from "@/hooks/useAnalysisLoading"
import { AnalysisHero } from "@/components/analysis-loading/AnalysisHero"
import { AnalysisStepList } from "@/components/analysis-loading/AnalysisStepList"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function AnalysisLoadingPage() {
  const {
    progress,
    source,
    steps,
    isProcessing,
    isComplete,
  } = useAnalysisLoading()

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-lg items-center gap-3 px-4">
          <div className="flex flex-1 flex-col">
            <h1 className="text-sm font-semibold text-foreground">
              Analizando
            </h1>
            <p className="text-xs text-muted-foreground">
              Winnie está procesando tu consulta
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-8">
        {/* Animated hero with circular progress */}
        <AnalysisHero
          isComplete={isComplete}
          percent={progress.percent}
        />

        {/* Linear progress bar */}
        <div className="flex flex-col gap-2">
          <Progress value={progress.percent} />
          <p className="text-center text-xs text-muted-foreground">
            {progress.message}
          </p>
        </div>

        {/* Step-by-step breakdown card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Sparkles className="size-4 text-primary" />
              {isComplete ? "Análisis completado" : "Procesando tu consulta"}
            </CardTitle>
            <CardDescription>
              {isComplete
                ? "Todos los pasos se completaron exitosamente"
                : "Winnie analiza paso a paso tu información médica"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalysisStepList
              steps={steps}
              currentStepIndex={progress.currentStepIndex}
              isComplete={isComplete}
            />
          </CardContent>
        </Card>

        {/* Source preview card */}
        <Card size="sm">
          <CardContent>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {source.type === "upload_photo"
                  ? "Receta subida"
                  : "Texto enviado"}
              </p>
              <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                {source.preview}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Spacer pushes CTA to bottom */}
        <div className="flex-1" />

        {/* Bottom CTA — only visible when complete */}
        <div className="sticky bottom-0 border-t border-border bg-background/95 px-0 py-4 backdrop-blur-sm">
          {isComplete ? (
            <Link href="/history/case-draft" className="block">
              <Button className="w-full" size="lg">
                <Sparkles data-icon="inline-start" />
                Ver mi explicación
              </Button>
            </Link>
          ) : (
            <Button className="w-full" size="lg" disabled>
              {isProcessing ? "Analizando..." : "Preparando..."}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
