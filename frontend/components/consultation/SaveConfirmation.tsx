"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, Pill, Calendar, ArrowRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import type { MedicalCase } from "@/types/consultation"

type SavePhase = "saving" | "saved"

interface SaveConfirmationProps {
  medicalCase: MedicalCase
  onConfirm: () => void
  onDismiss: () => void
}

export function SaveConfirmation({
  medicalCase,
  onConfirm,
  onDismiss,
}: SaveConfirmationProps) {
  const [phase, setPhase] = useState<SavePhase>("saving")

  // Simulate auto-save with a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("saved")
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const formattedDate = new Date(
    medicalCase.consultation_date
  ).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const medicationCount = medicalCase.medications.length

  // ─── Saving phase ───────────────────────────────────────────
  if (phase === "saving") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary">
            <Spinner className="size-8" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-semibold">Guardando tu caso...</h2>
            <p className="text-sm text-muted-foreground">
              Estamos guardando tu consulta y medicamentos en tu historial
              personal.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ─── Saved (success) phase ──────────────────────────────────
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Success icon + message */}
        <div className="flex flex-col items-center gap-3 text-center animate-in fade-in-0 zoom-in-95 duration-300">
          <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary">
            <CheckCircle className="size-8" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-semibold">Caso guardado</h2>
            <p className="text-sm text-muted-foreground">
              Tu caso se guardó automáticamente en tu historial. Puedes
              consultarlo cuando quieras.
            </p>
          </div>
        </div>

        {/* Case summary card */}
        <Card className="w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-300 delay-100 fill-mode-backwards">
          <CardHeader>
            <CardTitle>{medicalCase.diagnosis}</CardTitle>
            <CardDescription>
              Resumen de tu consulta guardada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {/* Date */}
              <div className="flex items-center gap-2.5 text-sm">
                <div className="flex items-center justify-center size-8 rounded-lg bg-muted">
                  <Calendar className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    Fecha de consulta
                  </span>
                  <span className="font-medium">{formattedDate}</span>
                </div>
              </div>

              {/* Medications */}
              <div className="flex items-center gap-2.5 text-sm">
                <div className="flex items-center justify-center size-8 rounded-lg bg-muted">
                  <Pill className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    Medicamentos
                  </span>
                  <span className="font-medium">
                    {medicationCount}{" "}
                    {medicationCount === 1 ? "medicamento" : "medicamentos"}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2.5 text-sm">
                <div className="flex items-center justify-center size-8 rounded-lg bg-muted">
                  <Clock className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Estado</span>
                  <Badge variant="secondary" className="w-fit mt-0.5">
                    En tratamiento
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={onConfirm}>
              Ver en mi historial
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={onDismiss}
            >
              Volver al resultado
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
