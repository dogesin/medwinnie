"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { SendHorizonal } from "lucide-react"

interface ChatInputProps {
  onSend: (text: string) => void
  isSending: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  isSending,
  placeholder = "Escribe tu duda aquí...",
}: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || isSending) return
    onSend(trimmed)
    setValue("")
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [value, isSending, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  // Auto-resize textarea
  const handleInput = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [])

  return (
    <div className="sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-end gap-2 rounded-xl border bg-card px-3 py-2 ring-1 ring-foreground/10 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/30 transition-all">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={placeholder}
            disabled={isSending}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground outline-none disabled:opacity-50 min-h-[24px] max-h-[120px]"
          />
          <Button
            size="icon-sm"
            onClick={handleSubmit}
            disabled={!value.trim() || isSending}
            className="shrink-0"
          >
            {isSending ? (
              <div className="size-3.5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
            ) : (
              <SendHorizonal className="size-3.5" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-1.5">
          Winnie da información general, no reemplaza a tu médico.
        </p>
      </div>
    </div>
  )
}
