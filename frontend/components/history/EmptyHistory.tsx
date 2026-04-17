import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"

interface EmptyHistoryProps {
  /** True when there are no cases at all; false when filters yield no results */
  isAbsoluteEmpty: boolean
}

export function EmptyHistory({ isAbsoluteEmpty }: EmptyHistoryProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center size-16 rounded-full bg-muted mb-4">
          <FileText className="text-muted-foreground" />
        </div>

        {isAbsoluteEmpty ? (
          <>
            <p className="text-lg font-medium">Aún no tienes casos guardados</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Sube una receta o escribe tu diagnóstico para que Winnie te lo
              explique.
            </p>
            <div className="flex gap-3 mt-6">
              <Link
                href="/upload-recipe"
                className="inline-flex items-center justify-center h-8 gap-1.5 px-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
              >
                <Plus className="size-4" data-icon="inline-start" />
                Subir receta
              </Link>
              <Link
                href="/write-diagnosis"
                className="inline-flex items-center justify-center h-8 gap-1.5 px-2.5 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted transition-colors"
              >
                Escribir diagnóstico
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg font-medium">Sin resultados</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              No encontramos casos que coincidan con tu búsqueda o filtro.
              Intenta con otros términos.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
