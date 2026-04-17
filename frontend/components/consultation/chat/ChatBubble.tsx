"use client"

import { cn } from "@/lib/utils"
import { MarkdownText } from "@/components/consultation/MarkdownText"
import { Stethoscope } from "lucide-react"
import type { ChatMessage } from "@/types/consultation"

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user"

  const formattedTime = new Date(message.timestamp).toLocaleTimeString(
    "es-MX",
    { hour: "2-digit", minute: "2-digit" }
  )

  return (
    <div
      className={cn(
        "flex gap-2.5 max-w-[90%] sm:max-w-[80%]",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar — only for assistant */}
      {!isUser && (
        <div className="flex items-start pt-0.5 shrink-0">
          <div className="flex items-center justify-center size-7 rounded-lg bg-primary/10 text-primary">
            <Stethoscope className="size-3.5" />
          </div>
        </div>
      )}

      {/* Bubble */}
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-card ring-1 ring-foreground/10 rounded-bl-md"
          )}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <MarkdownText text={message.content} />
          )}
        </div>
        <span
          className={cn(
            "text-[10px] text-muted-foreground px-1",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  )
}
