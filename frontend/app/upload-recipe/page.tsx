"use client"

import { ArrowLeft, Send, Sparkles } from "lucide-react"
import Link from "next/link"
import { useUploadRecipe } from "@/hooks/useUploadRecipe"
import { FileUploadZone } from "@/components/upload-recipe/FileUploadZone"
import { ImagePreview } from "@/components/upload-recipe/ImagePreview"
import { UploadProgressBar } from "@/components/upload-recipe/UploadProgress"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UploadRecipePage() {
  const {
    selectedFile,
    progress,
    result,
    error,
    selectFile,
    clearFile,
    submit,
  } = useUploadRecipe()

  const isUploading =
    progress.status === "uploading" || progress.status === "processing"
  const isComplete = progress.status === "complete"

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
              Subir Receta
            </h1>
            <p className="text-xs text-muted-foreground">
              Foto o archivo de receta médica
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
              <Sparkles className="size-4 text-primary" />
              ¿Cómo funciona?
            </CardTitle>
            <CardDescription>
              Sube una foto de tu receta médica y Winnie la analizará para
              explicarte todo en lenguaje simple.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Step number={1} text="Toma una foto o sube un archivo de tu receta" />
              <Step number={2} text="Winnie analiza los medicamentos e indicaciones" />
              <Step
                number={3}
                text="Recibe una explicación clara de tu tratamiento"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Upload area */}
        {!selectedFile ? (
          <FileUploadZone
            onFileSelect={selectFile}
            disabled={isUploading}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <ImagePreview
              file={selectedFile}
              onRemove={clearFile}
              disabled={isUploading}
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Progress */}
        <UploadProgressBar progress={progress} />

        {/* Success state */}
        {isComplete && result && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">
                ¡Receta procesada!
              </CardTitle>
              <CardDescription>
                Winnie analizó tu receta exitosamente. Toca "Ver explicación"
                para entender tu tratamiento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-background/80 p-3 text-xs text-muted-foreground">
                <p className="mb-1 font-medium text-foreground">
                  Texto detectado:
                </p>
                <p>{result.diagnosis_raw}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Spacer pushes submit to bottom */}
        <div className="flex-1" />

        {/* Submit button */}
        <div className="sticky bottom-0 border-t border-border bg-background/95 px-0 py-4 backdrop-blur-sm">
          {isComplete && result ? (
            <Link href={`/result`} className="block">
              <Button className="w-full" size="lg">
                <Sparkles data-icon="inline-start" />
                Ver explicación
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full"
              size="lg"
              disabled={!selectedFile || isUploading}
              onClick={submit}
            >
              {isUploading ? (
                <>Analizando...</>
              ) : (
                <>
                  <Send data-icon="inline-start" />
                  Analizar receta
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
      <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">
        {text}
      </p>
    </div>
  )
}
