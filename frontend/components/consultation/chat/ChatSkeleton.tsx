"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ChatSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header skeleton */}
      <div className="border-b bg-background">
        <div className="w-full max-w-2xl mx-auto flex items-center gap-3 px-4 py-3">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-9 rounded-xl" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>

      {/* Messages skeleton */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        {/* User message */}
        <div className="flex justify-end">
          <Skeleton className="h-10 w-56 rounded-2xl rounded-br-md" />
        </div>
        {/* AI reply */}
        <div className="flex gap-2.5">
          <Skeleton className="size-7 rounded-lg shrink-0" />
          <Skeleton className="h-28 w-72 rounded-2xl rounded-bl-md" />
        </div>
        {/* User message */}
        <div className="flex justify-end">
          <Skeleton className="h-12 w-64 rounded-2xl rounded-br-md" />
        </div>
        {/* AI reply */}
        <div className="flex gap-2.5">
          <Skeleton className="size-7 rounded-lg shrink-0" />
          <Skeleton className="h-36 w-80 rounded-2xl rounded-bl-md" />
        </div>
      </div>

      {/* Input skeleton */}
      <div className="border-t bg-background">
        <div className="w-full max-w-2xl mx-auto px-4 py-3">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
