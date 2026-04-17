"use client"

import { useState, useCallback } from "react"
import {
  submitDiagnosis,
  getDiagnosisExamples,
} from "@/lib/write-diagnosis.dummy"
import type {
  DiagnosisExample,
  WriteDiagnosisResult,
  DiagnosisProgress,
} from "@/types/write-diagnosis"

const MIN_TEXT_LENGTH = 10

export function useWriteDiagnosis() {
  const [text, setText] = useState("")
  const [progress, setProgress] = useState<DiagnosisProgress>({
    percent: 0,
    status: "idle",
    message: "",
  })
  const [result, setResult] = useState<WriteDiagnosisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [examples] = useState<DiagnosisExample[]>(getDiagnosisExamples)

  const isValid = text.trim().length >= MIN_TEXT_LENGTH
  const isProcessing = progress.status === "processing"
  const isComplete = progress.status === "complete"

  const selectExample = useCallback((example: DiagnosisExample) => {
    setText(example.text)
    setError(null)
    setResult(null)
    setProgress({ percent: 0, status: "idle", message: "" })
  }, [])

  const clearText = useCallback(() => {
    setText("")
    setError(null)
    setResult(null)
    setProgress({ percent: 0, status: "idle", message: "" })
  }, [])

  const submit = useCallback(async () => {
    const trimmed = text.trim()
    if (trimmed.length < MIN_TEXT_LENGTH) {
      setError(
        `Escribe al menos ${MIN_TEXT_LENGTH} caracteres para que Winnie pueda ayudarte.`
      )
      return
    }

    setError(null)
    setProgress({ percent: 0, status: "processing", message: "Iniciando..." })

    try {
      const submitResult = await submitDiagnosis(
        {
          source_type: "manual_text",
          diagnosis_raw: trimmed,
        },
        (p) => setProgress(p)
      )
      setResult(submitResult)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el texto"
      )
      setProgress({ percent: 0, status: "error", message: "Error" })
    }
  }, [text])

  return {
    text,
    setText,
    progress,
    result,
    error,
    examples,
    isValid,
    isProcessing,
    isComplete,
    selectExample,
    clearText,
    submit,
  }
}
