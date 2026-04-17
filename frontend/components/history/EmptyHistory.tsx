import { Button } from "@/components/ui/button"
import { FileText, Upload, PenLine } from "lucide-react"
import Link from "next/link"

interface EmptyHistoryProps {
  isAbsoluteEmpty: boolean
}

export function EmptyHistory({ isAbsoluteEmpty }: EmptyHistoryProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex items-center justify-center size-14 rounded-2xl bg-muted mb-4">
        <FileText className="size-6 text-muted-foreground" />
      </div>

      {isAbsoluteEmpty ? (
        <>
          <p className="text-lg font-semibold">Aún no tienes casos</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Sube una receta o escribe tu diagnóstico para que Winnie te lo
            explique.
          </p>
          <div className="flex gap-3 mt-6">
            <Button size="sm" className="rounded-xl" render={<Link href="/upload-recipe" />}>
              <Upload className="size-3.5" />
              Subir receta
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              render={<Link href="/write-diagnosis" />}
            >
              <PenLine className="size-3.5" />
              Escribir diagnóstico
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg font-semibold">Sin resultados</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            No encontramos casos que coincidan con tu búsqueda o filtro.
          </p>
        </>
      )}
    </div>
  )
}
