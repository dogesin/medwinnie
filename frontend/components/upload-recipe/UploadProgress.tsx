"use client"

import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { UploadProgress as UploadProgressType } from "@/types/upload-recipe"
import { cn } from "@/lib/utils"

interface UploadProgressProps {
  progress: UploadProgressType
}

export function UploadProgressBar({ progress }: UploadProgressProps) {
  if (progress.status === "idle") return null

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        {progress.status === "complete" ? (
          <CheckCircle2 className="size-5 text-primary" />
        ) : progress.status === "error" ? (
          <AlertCircle className="size-5 text-destructive" />
        ) : (
          <Loader2 className="size-5 animate-spin text-primary" />
        )}
        <span
          className={cn(
            "text-sm font-medium",
            progress.status === "error"
              ? "text-destructive"
              : "text-foreground"
          )}
        >
          {progress.message}
        </span>
      </div>
      <Progress value={progress.percent} />
    </div>
  )
}
