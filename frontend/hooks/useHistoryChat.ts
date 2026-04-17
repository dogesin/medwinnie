"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getHistoryChatMessages,
  getHistorySuggestedQuestions,
  sendHistoryQuestion,
} from "@/lib/history-chat.dummy"
import type { ChatMessage } from "@/types/consultation"

export function useHistoryChat(caseId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // ─── Fetch initial messages & suggestions ─────────────────
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [msgs, suggestions] = await Promise.all([
        getHistoryChatMessages(caseId),
        getHistorySuggestedQuestions(caseId),
      ])
      setMessages(msgs)
      setSuggestedQuestions(suggestions)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [caseId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ─── Send a question ──────────────────────────────────────
  const send = useCallback(
    async (questionText: string) => {
      if (!questionText.trim() || isSending) return

      setIsSending(true)
      setError(null)

      // Optimistically add user message
      const userMsg: ChatMessage = {
        id: `hq-${Date.now()}-q`,
        role: "user",
        content: questionText.trim(),
        timestamp: new Date().toISOString(),
        status: "pending",
      }
      setMessages((prev) => [...prev, userMsg])

      // Remove used suggestion
      setSuggestedQuestions((prev) =>
        prev.filter((q) => q !== questionText.trim())
      )

      try {
        const aiResponse = await sendHistoryQuestion(caseId, questionText.trim())
        setMessages((prev) => [...prev, aiResponse])
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setIsSending(false)
      }
    },
    [caseId, isSending]
  )

  return {
    messages,
    suggestedQuestions,
    isLoading,
    isSending,
    error,
    send,
    refresh: fetchData,
  }
}
