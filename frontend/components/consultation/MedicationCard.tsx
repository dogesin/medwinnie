"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, Pill, Clock, CalendarDays, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Medication } from "@/types/consultation"

interface MedicationCardProps {
  medication: Medication
}

export function MedicationCard({ medication }: MedicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary shrink-0">
              <Pill className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-base">{medication.name}</CardTitle>
              <div className="flex flex-wrap items-center gap-1.5">
                {medication.dosage && (
                  <Badge variant="secondary">{medication.dosage}</Badge>
                )}
                {medication.frequency && (
                  <Badge variant="outline">{medication.frequency}</Badge>
                )}
              </div>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "size-5 text-muted-foreground transition-transform duration-200 shrink-0",
              isExpanded && "rotate-180"
            )}
          />
        </button>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Duration badge */}
            {medication.duration && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4" />
                <span>Duración: {medication.duration}</span>
              </div>
            )}

            {/* Purpose */}
            <div className="flex flex-col gap-1.5">
              <h4 className="text-sm font-medium text-foreground">
                ¿Para qué sirve?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {medication.purpose}
              </p>
            </div>

            <Separator />

            {/* How it works */}
            <div className="flex flex-col gap-1.5">
              <h4 className="text-sm font-medium text-foreground">
                ¿Qué hace en tu cuerpo?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {medication.how_it_works}
              </p>
            </div>

            <Separator />

            {/* How to take */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" />
                <h4 className="text-sm font-medium text-foreground">
                  ¿Cómo tomarlo?
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {medication.how_to_take}
              </p>
            </div>

            {/* Important consideration */}
            {medication.important_consideration && (
              <>
                <Separator />
                <div className="flex flex-col gap-1.5 rounded-lg bg-destructive/5 p-3 ring-1 ring-destructive/15">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5 text-destructive" />
                    <h4 className="text-sm font-medium text-destructive">
                      Importante
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {medication.important_consideration}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
