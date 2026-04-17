// Types for the Consulta module — derived from Database & Domain Blueprints

export type HealthStatus = "mejor" | "igual" | "peor"
export type CaseStatus = "en_tratamiento" | "completado" | "archivado"
export type SourceType = "upload_photo" | "manual_text"

export interface Medication {
  id: string
  case_id: string
  name: string
  dosage: string | null
  frequency: string | null
  duration: string | null
  purpose: string        // para_que_sirve
  how_it_works: string   // que_hace
  how_to_take: string    // como_tomarlo
  important_consideration: string | null // consideraciones
  order_index: number
  created_at: string
  updated_at: string
}

export interface AnalysisResult {
  que_tienes: string          // Diagnóstico explicado
  por_que_pasa: string        // Por qué pasa esto
  medicamentos: string        // Resumen de medicamentos (bloques detallados en Medication[])
  por_que_tratamiento: string // Por qué este tratamiento
  que_cuidar: string          // Cuidados y recomendaciones
  ojo_con_esto: string        // Señales de alerta / red flags
  estudios_pendientes: string | null // Estudios que faltan (opcional)
  que_preguntar: string       // Preguntas para tu médico
  en_corto: string            // Resumen rápido
}

export type QuestionStatus = "pending" | "answered" | "rejected"

export interface CaseQuestion {
  id: string
  case_id: string
  user_id: string
  question_text: string
  answer_text: string | null
  ai_context: Record<string, unknown> | null
  status: QuestionStatus
  created_at: string
  answered_at: string | null
  updated_at: string
}

/** Chat message (display-oriented wrapper around CaseQuestion) */
export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  status: QuestionStatus
}

export interface MedicalCase {
  id: string
  user_id: string
  diagnosis: string
  diagnosis_raw: string
  analysis_result: AnalysisResult
  status: CaseStatus
  current_health_status: HealthStatus | null
  consultation_date: string
  last_diary_entry_at: string | null
  last_diary_health_status: HealthStatus | null
  diary_entry_count: number
  question_count: number
  source_type: SourceType
  source_image_path: string | null
  medications: Medication[]
  created_at: string
  updated_at: string
}
