"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

// Common symptoms grouped for quick selection
const COMMON_SYMPTOMS = [
  "Dolor de cabeza",
  "Fiebre",
  "Náuseas",
  "Cansancio",
  "Dolor muscular",
  "Mareo",
  "Dolor de estómago",
  "Tos",
  "Dificultad para dormir",
  "Falta de apetito",
  "Dolor de garganta",
  "Congestión nasal",
  "Escalofríos",
  "Sed excesiva",
  "Inflamación",
]

interface SymptomChipsProps {
  selected: string[]
  onChange: (symptoms: string[]) => void
}

export function SymptomChips({ selected, onChange }: SymptomChipsProps) {
  function toggleSymptom(symptom: string) {
    if (selected.includes(symptom)) {
      onChange(selected.filter((s) => s !== symptom))
    } else {
      onChange([...selected, symptom])
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-foreground">
          ¿Tienes algún síntoma?
        </h2>
        <p className="text-sm text-muted-foreground">
          Selecciona los que apliquen (opcional)
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {COMMON_SYMPTOMS.map((symptom) => {
          const isSelected = selected.includes(symptom)
          return (
            <button
              key={symptom}
              type="button"
              onClick={() => toggleSymptom(symptom)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-full"
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1.5 text-sm transition-all select-none h-auto",
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-muted text-foreground"
                )}
              >
                {isSelected && <Check data-icon="inline-start" />}
                {symptom}
              </Badge>
            </button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {selected.length} síntoma{selected.length !== 1 ? "s" : ""}{" "}
          seleccionado{selected.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  )
}
