"use client"

import { useEffect, useRef } from "react"
import { useConsultation } from "@/hooks/useConsultation"
import { useConsultationChat } from "@/hooks/useConsultationChat"
import { ChatHeader } from "@/components/consultation/chat/ChatHeader"
import { ChatBubble } from "@/components/consultation/chat/ChatBubble"
import { SuggestedQuestions } from "@/components/consultation/chat/SuggestedQuestions"
import { ChatInput } from "@/components/consultation/chat/ChatInput"
import { TypingIndicator } from "@/components/consultation/chat/TypingIndicator"
import { ChatSkeleton } from "@/components/consultation/chat/ChatSkeleton"
import { Stethoscope } from "lucide-react"

export default function CaseChatPage() {
  const { medicalCase, isLoading: caseLoading } = useConsultation("case-001")
  const {
    messages,
    suggestedQuestions,
    isLoading: chatLoading,
    isSending,
    error,
    send,
  } = useConsultationChat("case-001")

  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isSending])

  // ─── Loading state ────────────────────────────────────────
  if (caseLoading || chatLoading) {
    return <ChatSkeleton />
  }

  // ─── Error state ──────────────────────────────────────────
  if (!medicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <div className="flex items-center justify-center size-16 rounded-2xl bg-destructive/10 text-destructive">
            <svg
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">
            No pudimos cargar el chat
          </h2>
          <p className="text-sm text-muted-foreground">
            {error?.message ?? "Ocurrió un error inesperado. Intenta de nuevo."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const hasMessages = messages.length > 0

  // ─── Main chat view ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <ChatHeader
        diagnosis={medicalCase.diagnosis}
        medicationCount={medicalCase.medications.length}
        onBack={() => window.history.back()}
      />

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
          {/* Empty state / Welcome */}
          {!hasMessages && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-primary/10 text-primary">
                <Stethoscope className="size-7" />
              </div>
              <div className="flex flex-col gap-1.5 max-w-sm">
                <h2 className="text-base font-semibold">
                  Pregúntale a Winnie
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tengo el contexto de tu diagnóstico de{" "}
                  <span className="font-medium text-foreground">
                    {medicalCase.diagnosis}
                  </span>{" "}
                  y tus {medicalCase.medications.length} medicamentos. Pregúntame
                  lo que necesites.
                </p>
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {/* Typing indicator */}
          {isSending && <TypingIndicator />}

          {/* Error banner */}
          {error && (
            <div className="mx-auto bg-destructive/10 text-destructive text-xs font-medium px-3 py-1.5 rounded-lg">
              Error al enviar. Intenta de nuevo.
            </div>
          )}

          {/* Suggested questions — at the end of chat */}
          {suggestedQuestions.length > 0 && (
            <div className="mt-2">
              <SuggestedQuestions
                questions={suggestedQuestions}
                onSelect={send}
                disabled={isSending}
              />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <ChatInput onSend={send} isSending={isSending} />
    </div>
  )
}
