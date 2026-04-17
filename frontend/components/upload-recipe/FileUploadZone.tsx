"use client"

import { useCallback, useRef, useState } from "react"
import { Camera, Upload, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function FileUploadZone({ onFileSelect, disabled }: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      onFileSelect(files[0])
    },
    [onFileSelect]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragOver(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (!disabled) handleFiles(e.dataTransfer.files)
    },
    [disabled, handleFiles]
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            if (!disabled) inputRef.current?.click()
          }
        }}
        className={cn(
          "group relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-accent/50",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
          <Upload className="size-6 text-primary" />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-medium text-foreground">
            Arrastra tu receta aquí
          </p>
          <p className="text-xs text-muted-foreground">
            o haz clic para seleccionar un archivo
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          JPG, PNG, HEIC, WebP o PDF — máximo 10 MB
        </p>
      </div>

      {/* Action buttons row */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => cameraRef.current?.click()}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-accent/50",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          <Camera className="size-4 text-primary" />
          Tomar foto
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-accent/50",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          <FileText className="size-4 text-primary" />
          Subir archivo
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/webp,application/pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
