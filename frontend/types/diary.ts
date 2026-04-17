/**
 * Types for the Historial / Diario de Evolucion module.
 * Derived from domains.json — historial module entities.
 */

export type EstadoSalud = "mejor" | "igual" | "peor"

export interface EntradaDiario {
  id: string
  consulta_id: string
  estado: EstadoSalud
  sintomas: string[] | null
  texto_usuario: string | null
  fecha_entrada: string // ISO datetime
  ultima_actualizacion: string | null // ISO datetime
}

export interface EntradaDiarioCreate {
  consulta_id: string
  estado: EstadoSalud
  sintomas?: string[]
  texto_usuario?: string
}

export interface EntradaDiarioUpdate {
  estado?: EstadoSalud
  sintomas?: string[]
  texto_usuario?: string
}

/** Timeline item for displaying diary entries in case detail */
export interface DiaryTimelineItem {
  id: string
  date: string
  estado: EstadoSalud
  sintomas: string[]
  nota: string | null
}
