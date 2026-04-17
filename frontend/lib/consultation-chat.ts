import type { ChatMessage } from "@/types/consultation"
import { apiFetch } from "@/lib/api"

// TODO: wire up after backend is ready. Hooks currently import from .dummy.ts

export function getChatMessages(caseId: string): Promise<ChatMessage[]> {
  return apiFetch<ChatMessage[]>(`/cases/${caseId}/questions`)
}

export function getSuggestedQuestions(caseId: string): Promise<string[]> {
  return apiFetch<string[]>(`/cases/${caseId}/questions/suggestions`)
}

export function sendQuestion(
  caseId: string,
  questionText: string
): Promise<ChatMessage> {
  return apiFetch<ChatMessage>(`/cases/${caseId}/questions`, {
    method: "POST",
    body: JSON.stringify({ question_text: questionText }),
  })
}
