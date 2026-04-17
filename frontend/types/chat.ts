/**
 * Types for the Chat / Dudas module.
 * Derived from domains.json — chat module entities.
 */

export interface PreguntaChat {
  id: string
  consulta_id: string
  pregunta_usuario: string
  respuesta_ai: string
  contextual: boolean
  fecha_creacion: string // ISO datetime
}

export interface PreguntaChatCreate {
  consulta_id: string
  pregunta_usuario: string
}

export interface PreguntaChatResponse {
  id: string
  pregunta_usuario: string
  respuesta_ai: string
  contextual: boolean
  fecha_creacion: string
}

/** Suggested question shown when opening a case chat */
export interface SuggestedQuestion {
  id: string
  text: string
  category: "medicamento" | "cuidados" | "general" | "alerta"
}

/** Chat thread state for a specific consultation */
export interface ChatThread {
  consulta_id: string
  messages: PreguntaChat[]
  suggestedQuestions: SuggestedQuestion[]
  isLoading: boolean
}
