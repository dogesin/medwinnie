/**
 * Types for the Notificaciones module.
 * Derived from domains.json — notificaciones module entities.
 */

export type NotificationType = "recordatorio_medicamento" | "seguimiento" | "alerta" | "sistema"

export interface Notification {
  id: string
  user_id: string
  consulta_id: string | null
  tipo: NotificationType
  titulo: string
  descripcion: string
  enviada: boolean
  leida: boolean
  fecha_programada: string // ISO datetime
  fecha_envio: string | null // ISO datetime
}

export interface NotificationCreate {
  consulta_id?: string
  tipo: NotificationType
  titulo: string
  descripcion: string
  fecha_programada: string
}

export interface NotificationUpdate {
  leida?: boolean
  enviada?: boolean
}
