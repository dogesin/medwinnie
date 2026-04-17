import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CaseListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="rounded-xl p-4">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3.5 w-14" />
          </div>
        </Card>
      ))}
    </div>
  )
}
