"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Camera, X, ArrowLeft, ImageIcon, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NuevaConsultaPage() {
  const router = useRouter()
  const [diagnosis, setDiagnosis] = useState("")
  const [rxMode, setRxMode] = useState<"photo" | "text">("photo")
  const [image, setImage] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const [medsText, setMedsText] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const hasRx = rxMode === "photo" ? !!image : medsText.trim().length > 0
  const canContinue = diagnosis.trim().length > 0 && hasRx

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function handleNext() {
    if (!canContinue) return
    sessionStorage.setItem("winnie_diagnosis", diagnosis.trim())
    sessionStorage.setItem("winnie_prescription_text", medsText.trim())
    if (image) sessionStorage.setItem("winnie_prescription_image", image)
    router.push("/nueva-consulta/confirmar")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Back */}
      <div className="px-5 pt-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> Inicio
        </Link>
      </div>

      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
            Paso 1 de 2
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Nueva consulta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Necesitamos dos cosas para explicarte bien tu caso.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto w-full max-w-md flex-1 px-5 pt-5 pb-32 flex flex-col gap-5">

        {/* ── Section 1: Diagnosis ──────────────────── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              1
            </span>
            <label className="text-sm font-semibold text-foreground">
              ¿Qué diagnóstico te dieron?
            </label>
            <span className="ml-auto text-xs text-destructive font-medium">Requerido</span>
          </div>
          <div
            className={cn(
              "overflow-hidden rounded-2xl border bg-background transition-colors focus-within:border-primary/50",
              diagnosis.trim() ? "border-primary/40" : "border-border"
            )}
          >
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Ej: Faringitis bacteriana, gastritis leve, cistitis…"
              rows={3}
              className="w-full resize-none px-4 pt-4 pb-2 text-sm outline-none placeholder:text-muted-foreground bg-transparent"
            />
            <p className="px-4 pb-3 text-[11px] text-muted-foreground">
              Escribe exactamente lo que te dijo el médico
            </p>
          </div>
        </div>

        {/* ── Section 2: Prescription ───────────────── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              2
            </span>
            <label className="text-sm font-semibold text-foreground">
              Tu receta médica
            </label>
            <span className="ml-auto text-xs text-destructive font-medium">Requerido</span>
          </div>

          {/* Toggle: photo / text */}
          <div className="flex rounded-xl border border-border bg-muted/30 p-1 gap-1">
            <button
              onClick={() => setRxMode("photo")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-all",
                rxMode === "photo"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Camera className="size-4" />
              Subir foto
            </button>
            <button
              onClick={() => setRxMode("text")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-all",
                rxMode === "text"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="size-4" />
              Escribir
            </button>
          </div>

          {/* Photo mode */}
          {rxMode === "photo" && (
            <>
              {!image ? (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/20 px-6 py-8 text-center transition-colors hover:border-primary/40 hover:bg-primary/5 active:scale-[0.99]"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-background shadow-sm">
                    <Camera className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Sube la foto de tu receta
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      JPG, PNG o HEIC — toca para elegir
                    </p>
                  </div>
                </button>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-primary/40 bg-muted/20">
                  <img src={image} alt="Receta" className="w-full max-h-52 object-contain" />
                  <div className="flex items-center gap-2 border-t border-border px-3 py-2">
                    <ImageIcon className="size-3.5 shrink-0 text-primary" />
                    <span className="flex-1 truncate text-xs text-muted-foreground">
                      {imageName}
                    </span>
                    <button
                      onClick={() => {
                        setImage(null)
                        setImageName(null)
                        if (fileRef.current) fileRef.current.value = ""
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Text mode */}
          {rxMode === "text" && (
            <div
              className={cn(
                "overflow-hidden rounded-2xl border bg-background transition-colors focus-within:border-primary/50",
                medsText.trim() ? "border-primary/40" : "border-border"
              )}
            >
              <textarea
                value={medsText}
                onChange={(e) => setMedsText(e.target.value)}
                placeholder="Ej: Amoxicilina 500mg cada 8h, Ibuprofeno 400mg si hay dolor…"
                rows={4}
                className="w-full resize-none px-4 pt-4 pb-2 text-sm outline-none placeholder:text-muted-foreground bg-transparent"
              />
              <p className="px-4 pb-3 text-[11px] text-muted-foreground">
                Incluye nombre y dosis de cada medicamento
              </p>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm px-5 py-4">
        <div className="mx-auto max-w-md flex flex-col gap-2">
          {!canContinue && (
            <p className="text-center text-xs text-muted-foreground">
              {!diagnosis.trim()
                ? "Escribe tu diagnóstico para continuar"
                : "Agrega tu receta para continuar"}
            </p>
          )}
          <Button
            size="lg"
            className="w-full rounded-xl"
            disabled={!canContinue}
            onClick={handleNext}
          >
            Siguiente
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
