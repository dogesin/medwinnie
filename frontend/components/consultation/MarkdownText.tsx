/**
 * Simple inline markdown renderer for bold (**text**), italic (*text*),
 * bullets, and line breaks. No external dependencies.
 */
import React from "react"

interface MarkdownTextProps {
  text: string
}

function parseLine(line: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  // Match **bold** and *italic*
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(line)) !== null) {
    // text before match
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index))
    }
    if (match[2]) {
      // bold
      nodes.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[2]}
        </strong>
      )
    } else if (match[3]) {
      // italic
      nodes.push(
        <em key={match.index} className="italic">
          {match[3]}
        </em>
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex))
  }
  return nodes
}

export function MarkdownText({ text }: MarkdownTextProps) {
  const blocks = text.split("\n")
  const elements: React.ReactNode[] = []
  let listItems: React.ReactNode[] = []
  let orderedItems: React.ReactNode[] = []

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-4 mb-3">
          {listItems}
        </ul>
      )
      listItems = []
    }
    if (orderedItems.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="list-decimal pl-4 mb-3">
          {orderedItems}
        </ol>
      )
      orderedItems = []
    }
  }

  blocks.forEach((line, i) => {
    const trimmed = line.trim()

    if (trimmed === "") {
      flushList()
      return
    }

    // Unordered list: - item
    if (/^[-•]\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[-•]\s+/, "")
      listItems.push(<li key={`li-${i}`} className="mb-1">{parseLine(content)}</li>)
      return
    }

    // Ordered list: 1. item
    if (/^\d+\.\s+/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s+/, "")
      orderedItems.push(<li key={`oli-${i}`} className="mb-1">{parseLine(content)}</li>)
      return
    }

    // Emoji heading lines (🔴, 🟡, etc.)
    if (/^[🔴🟡🟢🔵⚠️]/.test(trimmed)) {
      flushList()
      elements.push(
        <p key={`emoji-${i}`} className="font-medium text-foreground mb-2 mt-3">
          {parseLine(trimmed)}
        </p>
      )
      return
    }

    // Regular paragraph
    flushList()
    elements.push(
      <p key={`p-${i}`} className="mb-3 last:mb-0">
        {parseLine(trimmed)}
      </p>
    )
  })

  flushList()

  return <div className="text-sm leading-relaxed text-card-foreground/85">{elements}</div>
}
