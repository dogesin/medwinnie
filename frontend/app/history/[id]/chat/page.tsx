"use client"

import { use, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useCaseDetail } from "@/hooks/useCaseDetail"
import { useHistoryChat } from "@/hooks/useHistoryChat"
import { HistoryChatHeader } from "@/components/history/chat/HistoryChatHeader"
import { CaseContextCard } from "@/components/history/chat/CaseContextCard"
import { ChatBubble } from "@/components/consultation/chat/ChatBubble"
import { SuggestedQuestions } from "@/components/consultation/chat/SuggestedQuestions"
import { ChatInput } from "@/components/consultation/chat/ChatInput"
import { TypingIndicator } from "@/components/consultation/chat/TypingIndicator"
import { ChatSkeleton } from "@/components/consultation/chat/ChatSkeleton"
import { AlertTriangle, Stethoscope, BookOpen } from "lucide-react"

export default function HistoryCaseChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const {
    medicalCase,
    medications,
    diaryEntries,
    isLoading: caseLoading,
    error: caseError,
  } = useCaseDetail(id)
  const {
    messages,
    suggestedQuestions,
    isLoading: chatLoading,
    isSending,
    error: chatError,
    send,
  } = useHistoryChat(id)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [showContext, setShowContext] = useState(true)

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
  if (caseError || !medicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <div className="flex items-center justify-center size-16 rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-8" />
          </div>
          <h2 className="text-lg font-semibold">
            No pudimos cargar el chat
          </h2>
          <p className="text-sm text-muted-foreground">
            {caseError?.message ??
              chatError?.message ??
              "Ocurrió un error inesperado. Intenta de nuevo."}
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
      {/* Header with case context badges */}
      <HistoryChatHeader
        diagnosis={medicalCase.diagnosis}
        medicationCount={medications.length}
        diaryEntryCount={medicalCase.diary_entry_count}
        lastHealthStatus={medicalCase.last_diary_health_status}
        onBack={() => router.push(`/history/${id}`)}
      />

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
          {/* Case context card — collapsible */}
          {showContext && (
            <div className="flex flex-col gap-2">
              <CaseContextCard
                medicalCase={medicalCase}
                medications={medications}
                diaryEntries={diaryEntries}
              />
              <button
                onClick={() => setShowContext(false)}
                className="text-[10px] text-muted-foreground hover:text-foreground transition-colors self-center"
              >
                Ocultar contexto
              </button>
            </div>
          )}

          {/* Show context toggle when hidden */}
          {!showContext && (
            <button
              onClick={() => setShowContext(true)}
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors self-center flex items-center gap-1"
            >
              <BookOpen className="size-3" />
              Mostrar contexto del caso
            </button>
          )}

          {/* Empty state / Welcome */}
          {!hasMessages && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-primary/10 text-primary">
                <Stethoscope className="size-7" />
              </div>
              <div className="flex flex-col gap-1.5 max-w-sm">
                <h2 className="text-base font-semibold">
                  Pregúntale a Winnie sobre tu caso
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tengo el contexto completo de tu{" "}
                  <span className="font-medium text-foreground">
                    {medicalCase.diagnosis}
                  </span>
                  , tus {medications.length} medicamentos
                  {medicalCase.diary_entry_count > 0 && (
                    <>
                      {" "}y tu diario con{" "}
                      <span className="font-medium text-foreground">
                        {medicalCase.diary_entry_count}{" "}
                        {medicalCase.diary_entry_count === 1
                          ? "entrada"
                          : "entradas"}
                      </span>{" "}
                      de evolución
                    </>
                  )}
                  . Pregúntame lo que necesites.
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
          {chatError && (
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
      <ChatInput
        onSend={send}
        isSending={isSending}
        placeholder="Pregunta sobre tu caso, medicamentos o evolución..."
      />
    </div>
  )
}
