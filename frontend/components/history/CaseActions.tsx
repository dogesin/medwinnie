"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Share2, Plus } from "lucide-react"

interface CaseActionsProps {
  onUpdateStatus: () => void
  onShare: () => void
  onNewConsultation: () => void
}

export function CaseActions({
  onUpdateStatus,
  onShare,
  onNewConsultation,
}: CaseActionsProps) {
  return (
    <div className="flex flex-col gap-2 pb-6">
      <Button className="w-full rounded-xl" onClick={onUpdateStatus}>
        <RefreshCw className="size-4" />
        ¿Cómo me siento hoy?
      </Button>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="rounded-xl" onClick={onShare}>
          <Share2 className="size-4" />
          Compartir
        </Button>
        <Button variant="outline" className="rounded-xl" onClick={onNewConsultation}>
          <Plus className="size-4" />
          Nueva consulta
        </Button>
      </div>
    </div>
  )
}
