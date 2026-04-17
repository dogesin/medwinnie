"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  RefreshCw,
  MessageCircle,
  Pencil,
  Share2,
  Plus,
} from "lucide-react"

interface CaseActionsProps {
  onUpdateStatus: () => void
  onAskQuestion: () => void
  onEdit: () => void
  onShare: () => void
  onNewConsultation: () => void
}

export function CaseActions({
  onUpdateStatus,
  onAskQuestion,
  onEdit,
  onShare,
  onNewConsultation,
}: CaseActionsProps) {
  return (
    <Card>
      <CardContent className="pt-1">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Acciones
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="default"
              className="h-auto py-3 flex-col gap-1.5"
              onClick={onUpdateStatus}
            >
              <RefreshCw className="size-5" />
              <span className="text-xs font-medium">Actualizar estado</span>
            </Button>
            <Button
              variant="secondary"
              className="h-auto py-3 flex-col gap-1.5"
              onClick={onAskQuestion}
            >
              <MessageCircle className="size-5" />
              <span className="text-xs font-medium">Preguntar</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-3 flex-col gap-1.5"
              onClick={onEdit}
            >
              <Pencil className="size-5" />
              <span className="text-xs font-medium">Editar caso</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-3 flex-col gap-1.5"
              onClick={onShare}
            >
              <Share2 className="size-5" />
              <span className="text-xs font-medium">Compartir</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            className="w-full"
            onClick={onNewConsultation}
          >
            <Plus data-icon="inline-start" />
            Nueva consulta
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
