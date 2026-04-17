"use client"

import { X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface DiagnosisTextareaProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  disabled?: boolean
  error?: string | null
}

export function DiagnosisTextarea({
  value,
  onChange,
  onClear,
  disabled = false,
  error,
}: DiagnosisTextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="diagnosis-text"
          className="text-sm font-medium text-foreground"
        >
          Tu diagnostico o tratamiento
        </label>
        {value.length > 0 && !disabled && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 text-xs text-muted-foreground"
          >
            <X data-icon="inline-start" />
            Borrar
          </Button>
        )}
      </div>
      <Textarea
        id="diagnosis-text"
        placeholder="Escribe aqui lo que te dijo el doctor, los medicamentos que te recetaron, o pega el texto de tu receta..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={6}
        className="resize-none text-sm leading-relaxed"
        aria-invalid={!!error}
      />
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Escribe al menos 10 caracteres
          </p>
        )}
        <span className="text-xs tabular-nums text-muted-foreground">
          {value.length}
        </span>
      </div>
    </div>
  )
}
