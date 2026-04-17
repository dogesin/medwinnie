"use client"

import { ArrowLeft, PenLine, Send, Sparkles } from "lucide-react"
import Link from "next/link"
import { useWriteDiagnosis } from "@/hooks/useWriteDiagnosis"
import { ExampleCards } from "@/components/write-diagnosis/ExampleCards"
import { DiagnosisTextarea } from "@/components/write-diagnosis/DiagnosisTextarea"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function WriteDiagnosisPage() {
  const {
    text,
    setText,
    progress,
    result,
    error,
    examples,
    isValid,
    isProcessing,
    isComplete,
    selectExample,
    clearText,
    submit,
  } = useWriteDiagnosis()

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-lg items-center gap-3 px-4">
          <Link href="/">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft />
            </Button>
          </Link>
          <div className="flex flex-1 flex-col">
            <h1 className="text-sm font-semibold text-foreground">
              Escribir Diagnostico
            </h1>
            <p className="text-xs text-muted-foreground">
              Describe tu diagnostico o tratamiento
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-5 px-4 py-6">
        {/* Intro card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenLine className="size-4 text-primary" />
              Escribe o pega tu informacion
            </CardTitle>
            <CardDescription>
              Escribe lo que te dijo el doctor, los medicamentos que te
              recetaron, o ambos. Winnie te lo explicara en lenguaje simple.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Step number={1} text="Escribe tu diagnostico, tratamiento o ambos" />
              <Step number={2} text="Winnie analiza la informacion medica" />
              <Step
                number={3}
                text="Recibe una explicacion clara y facil de entender"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Textarea section */}
        <DiagnosisTextarea
          value={text}
          onChange={setText}
          onClear={clearText}
          disabled={isProcessing}
          error={error}
        />

        {/* Examples section */}
        {!isComplete && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Ejemplos guiados — toca uno para usarlo
              </p>
              <ExampleCards
                examples={examples}
                onSelect={selectExample}
                disabled={isProcessing}
              />
            </div>
          </>
        )}

        {/* Processing progress */}
        {isProcessing && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="size-2 animate-pulse rounded-full bg-primary" />
                  <p className="text-sm font-medium text-foreground">
                    {progress.message}
                  </p>
                </div>
                <Progress value={progress.percent} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {progress.percent}% completado
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success state */}
        {isComplete && result && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">
                Texto procesado!
              </CardTitle>
              <CardDescription>
                Winnie analizo tu informacion exitosamente. Toca &quot;Ver
                explicacion&quot; para entender tu diagnostico y tratamiento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-background/80 p-3 text-xs text-muted-foreground">
                <p className="mb-1 font-medium text-foreground">
                  Texto enviado:
                </p>
                <p className="line-clamp-4">{result.diagnosis_raw}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Spacer pushes submit to bottom */}
        <div className="flex-1" />

        {/* Submit button */}
        <div className="sticky bottom-0 border-t border-border bg-background/95 px-0 py-4 backdrop-blur-sm">
          {isComplete && result ? (
            <Link href="/result" className="block">
              <Button className="w-full" size="lg">
                <Sparkles data-icon="inline-start" />
                Ver explicacion
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full"
              size="lg"
              disabled={!isValid || isProcessing}
              onClick={submit}
            >
              {isProcessing ? (
                <>Analizando...</>
              ) : (
                <>
                  <Send data-icon="inline-start" />
                  Analizar texto
                </>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

/** Step indicator helper component */
function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {number}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground pt-0.5">
        {text}
      </p>
    </div>
  )
}
