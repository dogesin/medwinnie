"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"

const routeTitles: Record<string, string> = {
  "/": "Inicio",
  "/upload-recipe": "Subir Receta",
  "/write-diagnosis": "Escribir Diagnóstico",
  "/analysis-loading": "Analizando...",
  "/result": "Explicación",
  "/result/chat": "Dudas sobre este caso",
  "/result/save": "Guardar Caso",
  "/result/followup": "Seguimiento",
  "/history": "Mi Historial",
  "/nueva-consulta": "Nueva Consulta",
}

export function SiteHeader() {
  const pathname = usePathname()

  const title =
    routeTitles[pathname] ??
    (pathname.startsWith("/history/") ? "Detalle del Caso" : "Winnie")

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4!" />
      <h1 className="text-sm font-semibold tracking-tight">{title}</h1>
    </header>
  )
}
