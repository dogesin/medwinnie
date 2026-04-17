"use client"

import { Stethoscope } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5 mr-auto max-w-[80%]">
      <div className="flex items-start pt-0.5 shrink-0">
        <div className="flex items-center justify-center size-7 rounded-lg bg-primary/10 text-primary">
          <Stethoscope className="size-3.5" />
        </div>
      </div>
      <div className="rounded-2xl rounded-bl-md bg-card ring-1 ring-foreground/10 px-4 py-3">
        <div className="flex items-center gap-1">
          <div className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
          <div className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
          <div className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
