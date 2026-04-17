import type {
  AnalysisStep,
  AnalysisProgress,
  AnalysisSource,
} from "@/types/analysis-loading"

/**
 * Dummy data and simulated analysis pipeline for the Analysis Loading screen.
 * Simulates the multi-step AI processing flow with realistic delays.
 */

/** The ordered steps Winnie goes through when analyzing a consultation */
export const ANALYSIS_STEPS: AnalysisStep[] = [
  {
    id: "step-1",
    label: "Leyendo tu información",
    description: "Winnie está leyendo lo que compartiste...",
    icon: "scan",
    durationMs: 1800,
  },
  {
    id: "step-2",
    label: "Identificando medicamentos",
    description: "Reconociendo nombres, dosis y frecuencias...",
    icon: "pill",
    durationMs: 2200,
  },
  {
    id: "step-3",
    label: "Analizando tu diagnóstico",
    description: "Comprendiendo tu condición médica...",
    icon: "brain",
    durationMs: 2000,
  },
  {
    id: "step-4",
    label: "Preparando tu explicación",
    description: "Traduciendo todo a lenguaje simple...",
    icon: "sparkles",
    durationMs: 1500,
  },
  {
    id: "step-5",
    label: "¡Listo!",
    description: "Tu explicación está lista para ver",
    icon: "check",
    durationMs: 800,
  },
]

/** Dummy source input for display on the loading screen */
export const DUMMY_SOURCE: AnalysisSource = {
  type: "manual_text",
  preview:
    "Me diagnosticaron faringitis bacteriana. Me recetaron Amoxicilina 500mg cada 8 horas por 7 días...",
}

/**
 * Simulates running the full analysis pipeline.
 * Calls onProgress at each step to allow the UI to animate through states.
 */
export async function runAnalysisPipeline(
  onProgress: (progress: AnalysisProgress) => void
): Promise<void> {
  const totalDuration = ANALYSIS_STEPS.reduce((sum, s) => sum + s.durationMs, 0)
  let elapsed = 0

  for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
    const step = ANALYSIS_STEPS[i]
    const isLast = i === ANALYSIS_STEPS.length - 1

    onProgress({
      percent: Math.round((elapsed / totalDuration) * 100),
      status: isLast ? "complete" : "processing",
      message: step.description,
      currentStepIndex: i,
    })

    await new Promise((resolve) => setTimeout(resolve, step.durationMs))
    elapsed += step.durationMs
  }

  // Final 100% callback
  onProgress({
    percent: 100,
    status: "complete",
    message: "¡Tu explicación está lista!",
    currentStepIndex: ANALYSIS_STEPS.length - 1,
  })
}
