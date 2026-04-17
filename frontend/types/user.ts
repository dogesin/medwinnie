/**
 * Types for the User / Auth module.
 * Derived from domains.json — auth module entities.
 */

export interface User {
  id: string
  email: string
  telefono: string | null
  nombre_completo: string | null
  fecha_registro: string // ISO datetime
  activo: boolean
}

export interface UserCreate {
  email: string
  telefono?: string
  nombre_completo?: string
}

export interface UserUpdate {
  telefono?: string
  nombre_completo?: string
  activo?: boolean
}

export interface AuthSession {
  user: User
  accessToken: string
  refreshToken: string
  expiresAt: string // ISO datetime
}
