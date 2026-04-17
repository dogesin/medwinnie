"use client"

import Link from "next/link"
import { Plus, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DoctorIllustration } from "@/components/doctor-illustration"

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <DoctorIllustration />

      <div className="mt-2 mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Hola, soy <span className="text-primary">Winnie</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tu salud, explicada en lenguaje simple
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button
          size="lg"
          className="w-full rounded-2xl py-6 text-base shadow-sm shadow-primary/20"
          render={<Link href="/nueva-consulta" />}
        >
          <Plus className="size-5" />
          Agregar consulta
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full rounded-2xl py-6 text-base text-muted-foreground"
          render={<Link href="/history" />}
        >
          <History className="size-5" />
          Mi historial
        </Button>
      </div>
    </div>
  )
}
