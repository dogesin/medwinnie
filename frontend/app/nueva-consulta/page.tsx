"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Send,
  Paperclip,
  X,
  ImageIcon,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const SUGGESTIONS = [
  "Me dieron un diagnóstico y no lo entiendo",
  "Quiero saber para qué es mi medicamento",
  "Tengo síntomas y no sé qué tengo",
  "Me hicieron análisis y quiero entenderlos",
]

type Message = {
  role: "winnie" | "user"
  content: string
  image?: string
}

const WINNIE_INTRO: Message = {
  role: "winnie",
  content: "¡Hola! Soy Winnie. Cuéntame qué tienes — puedes escribir tu diagnóstico, síntomas, o subir una foto de tu receta médica. Estoy aquí para explicártelo en lenguaje simple.",
}

export default function NuevaConsultaPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([WINNIE_INTRO])
  const [input, setInput] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const canSend = (input.trim().length > 0 || !!image) && !loading

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function handleSuggestion(text: string) {
    setInput(text)
    textareaRef.current?.focus()
  }

  async function handleSend() {
    if (!canSend) return

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      image: image ?? undefined,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setImage(null)
    setImageName(null)
    setLoading(true)

    // Simulate processing → redirect to analysis
    setTimeout(() => {
      router.push("/analysis-loading")
    }, 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      {/* ── Messages ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-xl flex-col gap-6">
          {messages.map((msg, i) =>
            msg.role === "winnie" ? (
              <WinnieMessage key={i} content={msg.content} isFirst={i === 0} />
            ) : (
              <UserMessage key={i} content={msg.content} image={msg.image} />
            )
          )}

          {/* Suggestions — only show after intro if no user message yet */}
          {messages.length === 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground px-1">
                Sugerencias
              </p>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Loading dots */}
          {loading && (
            <div className="flex items-center gap-2">
              <WinnieAvatar />
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                <span className="size-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0ms]" />
                <span className="size-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:150ms]" />
                <span className="size-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input ─────────────────────────────────────── */}
      <div className="border-t bg-background px-4 py-3">
        <div className="mx-auto max-w-xl">
          {/* Image preview */}
          {image && (
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2">
              <ImageIcon className="size-4 shrink-0 text-primary" />
              <span className="flex-1 truncate text-xs text-foreground">{imageName}</span>
              <button
                onClick={() => { setImage(null); setImageName(null) }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          {/* Input row */}
          <div className="flex items-end gap-2">
            {/* Attach */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-xl text-muted-foreground hover:text-primary"
              onClick={() => fileRef.current?.click()}
              type="button"
            >
              <Paperclip className="size-5" />
            </Button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu diagnóstico o síntomas..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background transition-colors max-h-32"
              style={{ lineHeight: "1.5" }}
            />

            {/* Send */}
            <Button
              size="icon"
              disabled={!canSend}
              onClick={handleSend}
              className="shrink-0 rounded-xl"
            >
              <Send className="size-4" />
            </Button>
          </div>

          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Winnie da información general, no reemplaza a tu médico.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ───────────────────────────────────── */

function WinnieAvatar() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
      <Sparkles className="size-4 text-primary" />
    </div>
  )
}

function WinnieMessage({ content, isFirst }: { content: string; isFirst: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <WinnieAvatar />
      <div className="flex flex-col gap-1">
        {isFirst && (
          <span className="text-xs font-semibold text-primary">Winnie</span>
        )}
        <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground max-w-sm">
          {content}
        </div>
      </div>
    </div>
  )
}

function UserMessage({ content, image }: { content: string; image?: string }) {
  return (
    <div className="flex justify-end">
      <div className="flex max-w-sm flex-col items-end gap-1.5">
        {image && (
          <img
            src={image}
            alt="Receta adjunta"
            className="rounded-2xl rounded-br-sm object-cover max-h-48 border"
          />
        )}
        {content && (
          <div className="rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">
            {content}
          </div>
        )}
      </div>
    </div>
  )
}
