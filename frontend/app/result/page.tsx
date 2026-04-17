"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useConsultation } from "@/hooks/useConsultation"
import { ResultHeader } from "@/components/consultation/ResultHeader"
import { ResultExplanation } from "@/components/consultation/ResultExplanation"
import { AdjustLevelSheet } from "@/components/consultation/AdjustLevelSheet"
import { ResultSkeleton } from "@/components/consultation/ResultSkeleton"

export default function ResultPage() {
  const router = useRouter()
  const { medicalCase, isLoading, error, isSaving, isSaved, save } =
    useConsultation("case-001")

  const [adjustLevelOpen, setAdjustLevelOpen] = useState(false)

  // ─── Loading state ────────────────────────────────────────
  if (isLoading) {
    return <ResultSkeleton />
  }

  // ─── Error state ──────────────────────────────────────────
  if (error || !medicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <div className="flex items-center justify-center size-16 rounded-2xl bg-destructive/10 text-destructive">
            <svg
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">
            No pudimos cargar tu resultado
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

  // ─── Main result view ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        <ResultHeader
          medicalCase={medicalCase}
          isSaving={isSaving}
          isSaved={isSaved}
          onSave={save}
          onAskQuestion={() => {
            router.push("/result/chat")
          }}
          onShare={() => {
            // Simulate share action
            if (navigator.share) {
              navigator.share({
                title: medicalCase.diagnosis,
                text: medicalCase.analysis_result.en_corto,
              })
            } else {
              window.alert("Enlace copiado al portapapeles (simulado)")
            }
          }}
          onBack={() => {
            window.history.back()
          }}
        />

        <ResultExplanation
          medicalCase={medicalCase}
          onAdjustLevel={() => setAdjustLevelOpen(true)}
        />

        {/* Adjust detail level sheet */}
        <AdjustLevelSheet
          open={adjustLevelOpen}
          onOpenChange={setAdjustLevelOpen}
        />
      </div>
    </div>
  )
}
