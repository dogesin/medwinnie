import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import type { ReactNode } from "react"

interface ExplanationBlockProps {
  icon: ReactNode
  title: string
  subtitle?: string
  children: ReactNode
  variant?: "default" | "warning" | "info"
}

const variantStyles = {
  default: "",
  warning:
    "border-destructive/20 bg-destructive/5 ring-destructive/20",
  info: "border-primary/20 bg-primary/5 ring-primary/20",
}

export function ExplanationBlock({
  icon,
  title,
  subtitle,
  children,
  variant = "default",
}: ExplanationBlockProps) {
  return (
    <Card className={variantStyles[variant]}>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary shrink-0">
            {icon}
          </div>
          <div className="flex flex-col gap-0.5">
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-card-foreground/85 leading-relaxed [&_strong]:text-card-foreground [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_p]:mb-3 [&_p:last-child]:mb-0">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
