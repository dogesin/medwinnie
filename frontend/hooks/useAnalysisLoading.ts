"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  runAnalysisPipeline,
  ANALYSIS_STEPS,
  DUMMY_SOURCE,
} from "@/lib/analysis-loading.dummy"
import type { AnalysisProgress, AnalysisSource, AnalysisStep } from "@/types/analysis-loading"

const INITIAL_PROGRESS: AnalysisProgress = {
  percent: 0,
  status: "idle",
  message: "",
  currentStepIndex: 0,
}

export function useAnalysisLoading() {
  const [progress, setProgress] = useState<AnalysisProgress>(INITIAL_PROGRESS)
  const [source] = useState<AnalysisSource>(DUMMY_SOURCE)
  const [steps] = useState<AnalysisStep[]>(ANALYSIS_STEPS)
  const hasStarted = useRef(false)

  const startAnalysis = useCallback(() => {
    setProgress({
      percent: 0,
      status: "processing",
      message: ANALYSIS_STEPS[0].description,
      currentStepIndex: 0,
    })

    runAnalysisPipeline((p) => {
      setProgress(p)
    })
  }, [])

  // Auto-start the analysis when the hook mounts
  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    startAnalysis()
  }, [startAnalysis])

  const isProcessing = progress.status === "processing"
  const isComplete = progress.status === "complete" && progress.percent === 100
  const isError = progress.status === "error"

  return {
    progress,
    source,
    steps,
    isProcessing,
    isComplete,
    isError,
    startAnalysis,
  }
}
