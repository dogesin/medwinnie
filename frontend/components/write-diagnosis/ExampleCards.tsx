"use client"

import { FileText, Pill, Stethoscope } from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DiagnosisExample } from "@/types/write-diagnosis"

interface ExampleCardsProps {
  examples: DiagnosisExample[]
  onSelect: (example: DiagnosisExample) => void
  disabled?: boolean
}

const categoryConfig: Record<
  DiagnosisExample["category"],
  { label: string; icon: typeof Stethoscope; variant: "default" | "secondary" }
> = {
  diagnosis: {
    label: "Diagnostico",
    icon: Stethoscope,
    variant: "secondary",
  },
  treatment: {
    label: "Tratamiento",
    icon: Pill,
    variant: "secondary",
  },
  both: {
    label: "Ambos",
    icon: FileText,
    variant: "default",
  },
}

export function ExampleCards({
  examples,
  onSelect,
  disabled = false,
}: ExampleCardsProps) {
  return (
    <div className="flex flex-col gap-2">
      {examples.map((example) => {
        const config = categoryConfig[example.category]
        const Icon = config.icon
        return (
          <Card
            key={example.id}
            className={`cursor-pointer transition-all duration-200 hover:border-primary/40 hover:bg-accent/50 active:scale-[0.98] ${
              disabled ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={() => !disabled && onSelect(example)}
          >
            <CardHeader className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <CardTitle className="text-sm">{example.label}</CardTitle>
                  <CardDescription className="text-xs">
                    {example.description}
                  </CardDescription>
                </div>
                <Badge variant={config.variant} className="text-[10px] shrink-0">
                  {config.label}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
