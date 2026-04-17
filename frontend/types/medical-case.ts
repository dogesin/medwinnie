// Types derived from database.json — medical_cases table
// Enums: case_status, health_status

export type CaseStatus = "en_tratamiento" | "completado" | "archivado"
export type HealthStatus = "mejor" | "igual" | "peor"

export interface MedicalCase {
  id: string
  user_id: string
  diagnosis: string
  diagnosis_raw: string
  analysis_result: Record<string, unknown>
  status: CaseStatus
  current_health_status: HealthStatus | null
  consultation_date: string // ISO date
  last_diary_entry_at: string | null // ISO datetime
  last_diary_health_status: HealthStatus | null
  diary_entry_count: number
  question_count: number
  source_type: "upload_photo" | "manual_text"
  source_image_path: string | null
  created_at: string // ISO datetime
  updated_at: string // ISO datetime
  deleted_at: string | null
}

export interface MedicalCaseCreate {
  diagnosis: string
  diagnosis_raw: string
  analysis_result: Record<string, unknown>
  consultation_date: string
  source_type: "upload_photo" | "manual_text"
  source_image_path?: string
}

export interface MedicalCaseUpdate {
  status?: CaseStatus
  current_health_status?: HealthStatus
}

// Medication type for display within a case
export interface Medication {
  id: string
  case_id: string
  name: string
  dosage: string | null
  frequency: string | null
  duration: string | null
  purpose: string | null
  order_index: number
}

// Diary entry type
export interface DiaryEntry {
  id: string
  case_id: string
  user_id: string
  health_status: HealthStatus
  symptoms: string[] | null
  note: string | null
  entry_date: string
  created_at: string
}

export interface DiaryEntryCreate {
  case_id: string
  health_status: HealthStatus
  symptoms?: string[]
  note?: string
  entry_date: string
}
