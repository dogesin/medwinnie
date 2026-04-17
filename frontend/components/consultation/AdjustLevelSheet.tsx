"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SlidersHorizontal, Check } from "lucide-react"

interface AdjustLevelSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const LEVELS = [
  {
    id: "simple",
    label: "Simple",
    description: "Explicación breve, lo esencial para entender tu diagnóstico y tratamiento.",
    icon: "🟢",
  },
  {
    id: "detailed",
    label: "Detallado",
    description: "Explicación completa con contexto médico y recomendaciones extendidas.",
    icon: "🟡",
  },
  {
    id: "technical",
    label: "Técnico",
    description: "Incluye terminología médica, mecanismos de acción y referencias clínicas.",
    icon: "🔵",
  },
]

export function AdjustLevelSheet({
  open,
  onOpenChange,
}: AdjustLevelSheetProps) {
  const [selectedLevel, setSelectedLevel] = useState("detailed")
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = () => {
    setIsApplying(true)
    // Simulate applying the level change
    setTimeout(() => {
      setIsApplying(false)
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            Nivel de detalle
          </SheetTitle>
          <SheetDescription>
            Ajusta qué tan detallada quieres la explicación.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 p-4">
          {LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                selectedLevel === level.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              )}
            >
              <span className="text-lg mt-0.5">{level.icon}</span>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{level.label}</span>
                  {selectedLevel === level.id && (
                    <Check className="size-4 text-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {level.description}
                </span>
              </div>
            </button>
          ))}
          <Button
            className="mt-2 w-full"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? "Aplicando..." : "Aplicar cambio"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
