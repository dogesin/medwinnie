"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// ── Casos guardados (placeholder — reemplazar con datos reales) ──
const savedCases = [
  { id: "1", title: "Infección urinaria", date: "12 Abr 2026", url: "/history/1" },
  { id: "2", title: "Dolor lumbar crónico", date: "8 Abr 2026", url: "/history/2" },
  { id: "3", title: "Gripa y congestión", date: "1 Abr 2026", url: "/history/3" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ── Brand Header ────────────────────────────── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              tooltip="Winnie"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Heart className="size-4" strokeWidth={2.5} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">Winnie</span>
                <span className="truncate text-xs text-muted-foreground">
                  Tu salud, explicada
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── Nuevo Caso ──────────────────────────────── */}
      <div className="px-3 pt-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 rounded-lg text-sm"
          render={<Link href="/nueva-consulta" />}
        >
          <Plus className="size-4" />
          Nuevo Caso
        </Button>
      </div>

      {/* ── Casos Guardados ───────────────────────────── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mis Casos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedCases.map((caso) => (
                <SidebarMenuItem key={caso.id}>
                  <SidebarMenuButton
                    render={<Link href={caso.url} />}
                    isActive={pathname === caso.url}
                    tooltip={caso.title}
                    className="h-auto py-2"
                  >
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <div className="grid flex-1 text-left leading-tight">
                      <span className="truncate text-sm">{caso.title}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {caso.date}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
