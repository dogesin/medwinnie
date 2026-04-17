// ============================================================
// Global Domain Types — derived from .nativa/blueprints/domains.json
// ============================================================

// ── Auth Module ──────────────────────────────────────────────

export interface User {
  id: string
  email: string
  telefono: string | null
  nombre_completo: string | null
  fecha_registro: string // ISO datetime
  activo: boolean
}

// ── Consultas Module ─────────────────────────────────────────

export type TipoEntrada = "foto_receta" | "texto_manual"
export type NivelDetalle = "simple" | "medio" | "detallado"

export interface Consulta {
  id: string
  user_id: string
  tipo_entrada: TipoEntrada
  contenido_original: string
  imagen_url: string | null
  diagnostico: string
  por_que_pasa: string
  por_que_tratamiento: string
  que_cuidar: string
  ojo_con_esto: string
  estudios_pendientes: string | null
  que_preguntar: string
  en_corto: string
  nivel_detalle: NivelDetalle | null
  fecha_creacion: string // ISO datetime
  fecha_actualizacion: string | null
  guardada: boolean
}

export interface Medicamento {
  id: string
  consulta_id: string
  nombre: string
  para_que_sirve: string
  que_hace: string
  como_tomarlo: string
  consideraciones: string | null
  dosis: string | null
  frecuencia: string | null
  duracion_tratamiento: string | null
}

// ── Historial Module ─────────────────────────────────────────

export type EstadoSalud = "mejor" | "igual" | "peor"

export interface EntradaDiario {
  id: string
  consulta_id: string
  estado: EstadoSalud
  sintomas: string[] | null
  texto_usuario: string | null
  fecha_entrada: string // ISO datetime
  ultima_actualizacion: string | null
}

// ── Chat Module ──────────────────────────────────────────────

export interface PreguntaChat {
  id: string
  consulta_id: string
  pregunta_usuario: string
  respuesta_ai: string
  contextual: boolean
  fecha_creacion: string // ISO datetime
}

// ── Notificaciones Module ────────────────────────────────────

export type TipoNotificacion = "recordatorio" | "seguimiento" | "alerta" | "info"

export interface Notificacion {
  id: string
  user_id: string
  consulta_id: string | null
  tipo: TipoNotificacion
  titulo: string
  descripcion: string
  enviada: boolean
  leida: boolean
  fecha_programada: string // ISO datetime
  fecha_envio: string | null
}

// ── Navigation ───────────────────────────────────────────────

export interface NavItem {
  title: string
  url: string
  icon: string
  color?: string
  badge?: string | number
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

// ── Per-module type re-exports ───────────────────────────────

export type {
  HealthStatus,
  CaseStatus,
  SourceType,
  Medication,
  AnalysisResult,
  QuestionStatus,
  CaseQuestion,
  ChatMessage,
  MedicalCase,
} from "./consultation"

export type {
  MedicalCaseCreate,
  MedicalCaseUpdate,
  MedicalCaseEditData,
  DiaryEntry,
  DiaryEntryCreate,
} from "./medical-case"

export type {
  RecipeFile,
  RecipeUploadPayload,
  RecipeUploadResult,
  UploadProgress,
} from "./upload-recipe"

export type {
  DiagnosisExample,
  WriteDiagnosisPayload,
  WriteDiagnosisResult,
  DiagnosisProgress,
} from "./write-diagnosis"

export type {
  AnalysisStep,
  AnalysisProgress,
  AnalysisSource,
} from "./analysis-loading"
