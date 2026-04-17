"use client"

import { FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { RecipeFile } from "@/types/upload-recipe"

interface ImagePreviewProps {
  file: RecipeFile
  onRemove: () => void
  disabled?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ImagePreview({ file, onRemove, disabled }: ImagePreviewProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Preview area */}
      <div className="relative flex items-center justify-center bg-muted/30">
        {file.type === "image" && file.previewUrl ? (
          <img
            src={file.previewUrl}
            alt="Vista previa de receta"
            className="max-h-[300px] w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <FileText className="size-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Documento PDF
            </p>
          </div>
        )}

        {/* Remove button */}
        <Button
          variant="secondary"
          size="icon-sm"
          onClick={onRemove}
          disabled={disabled}
          className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <X />
        </Button>
      </div>

      {/* File info bar */}
      <div className="flex items-center gap-3 border-t border-border px-4 py-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="size-4 text-primary" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
          <p className="truncate text-sm font-medium text-foreground">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>
    </div>
  )
}
