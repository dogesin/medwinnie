"use client"

import { useRouter } from "next/navigation"
import { useConsultation } from "@/hooks/useConsultation"
import { SaveConfirmation } from "@/components/consultation/SaveConfirmation"
import { Skeleton } from "@/components/ui/skeleton"

export default function SaveCasePage() {
  const router = useRouter()
  const { medicalCase, isLoading, error } = useConsultation("case-001")

  // ─── Loading state ────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col items-center gap-6 min-h-[60vh] justify-center">
          <Skeleton className="size-16 rounded-2xl" />
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>
    )
  }

  // ─── Error state ──────────────────────────────────────────
  if (error || !medicalCase) {
    return (
      <div className="min-h-screen bg-background">
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
              No pudimos guardar tu caso
            </h2>
            <p className="text-sm text-muted-foreground">
              {error?.message ??
                "Ocurrió un error inesperado. Intenta de nuevo."}
            </p>
            <button
              onClick={() => router.push("/result")}
              className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Volver al resultado
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Save confirmation ────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-2xl mx-auto px-4 py-6">
        <SaveConfirmation
          medicalCase={medicalCase}
          onConfirm={() => router.push("/history")}
          onDismiss={() => router.push("/result")}
        />
      </div>
    </div>
  )
}
