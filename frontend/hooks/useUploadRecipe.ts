"use client"

import { useState, useCallback } from "react"
import {
  uploadRecipe,
  validateRecipeFile,
} from "@/lib/upload-recipe.dummy"
import type {
  RecipeFile,
  RecipeUploadResult,
  UploadProgress,
} from "@/types/upload-recipe"

export function useUploadRecipe() {
  const [selectedFile, setSelectedFile] = useState<RecipeFile | null>(null)
  const [progress, setProgress] = useState<UploadProgress>({
    percent: 0,
    status: "idle",
    message: "",
  })
  const [result, setResult] = useState<RecipeUploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selectFile = useCallback((file: File) => {
    const validation = validateRecipeFile(file)
    if (!validation.valid) {
      setError(validation.error ?? "Archivo inválido")
      return
    }

    setError(null)
    setResult(null)
    setProgress({ percent: 0, status: "idle", message: "" })

    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null

    setSelectedFile({
      id: `file-${Date.now()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type.startsWith("image/")
        ? "image"
        : file.type === "application/pdf"
          ? "pdf"
          : "unknown",
      previewUrl,
    })
  }, [])

  const clearFile = useCallback(() => {
    if (selectedFile?.previewUrl) {
      URL.revokeObjectURL(selectedFile.previewUrl)
    }
    setSelectedFile(null)
    setProgress({ percent: 0, status: "idle", message: "" })
    setResult(null)
    setError(null)
  }, [selectedFile])

  const submit = useCallback(async () => {
    if (!selectedFile?.file) {
      setError("Selecciona un archivo primero")
      return
    }

    setError(null)
    setProgress({ percent: 0, status: "uploading", message: "Iniciando..." })

    try {
      const uploadResult = await uploadRecipe(
        {
          source_type: "upload_photo",
          file: selectedFile.file,
          diagnosis_raw: "",
        },
        (p) => setProgress(p)
      )
      setResult(uploadResult)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar la receta"
      )
      setProgress({ percent: 0, status: "error", message: "Error" })
    }
  }, [selectedFile])

  return {
    selectedFile,
    progress,
    result,
    error,
    selectFile,
    clearFile,
    submit,
  }
}
