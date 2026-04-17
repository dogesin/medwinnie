"use client"

import { ArrowLeft, Stethoscope } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ChatHeaderProps {
  diagnosis: string
  medicationCount: number
  onBack: () => void
}

export function ChatHeader({
  diagnosis,
  medicationCount,
  onBack,
}: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-auto flex items-center gap-3 px-4 py-3">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted shrink-0"
          aria-label="Volver al resultado"
        >
          <ArrowLeft className="size-4" />
        </button>

        {/* Avatar */}
        <div className="flex items-center justify-center size-9 rounded-xl bg-primary/10 text-primary shrink-0">
          <Stethoscope className="size-4.5" />
        </div>

        {/* Title & subtitle */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate">
            Dudas sobre tu caso
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground truncate">
              {diagnosis}
            </span>
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
              {medicationCount} med.
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
