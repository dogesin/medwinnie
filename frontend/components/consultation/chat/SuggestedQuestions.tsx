"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface SuggestedQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
  disabled?: boolean
}

export function SuggestedQuestions({
  questions,
  onSelect,
  disabled,
}: SuggestedQuestionsProps) {
  if (questions.length === 0) return null

  return (
    <div className="flex flex-col gap-2 px-1">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <Sparkles className="size-3" />
        <span>Preguntas sugeridas</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((question) => (
          <Button
            key={question}
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onSelect(question)}
            className="h-auto py-1.5 px-3 text-xs text-left whitespace-normal leading-snug font-normal"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  )
}
