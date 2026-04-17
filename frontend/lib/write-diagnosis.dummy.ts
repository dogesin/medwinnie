import type {
  DiagnosisExample,
  WriteDiagnosisPayload,
  WriteDiagnosisResult,
  DiagnosisProgress,
} from "@/types/write-diagnosis"

/**
 * Dummy data and simulated API calls for the Write Diagnosis module.
 * All functions simulate network delays for realistic prototyping.
 */

/** Guided examples the user can tap to autofill the text area */
export const DIAGNOSIS_EXAMPLES: DiagnosisExample[] = [
  {
    id: "ex-1",
    label: "Infeccion de garganta",
    description: "Diagnostico con tratamiento de antibiotico",
    text: "Me diagnosticaron faringitis bacteriana. Me recetaron Amoxicilina 500mg cada 8 horas por 7 dias e Ibuprofeno 400mg cada 6 horas si tengo dolor o fiebre.",
    category: "both",
  },
  {
    id: "ex-2",
    label: "Gastritis",
    description: "Tratamiento con protector gastrico",
    text: "Tengo gastritis cronica. El doctor me receto Omeprazol 20mg en ayunas por 30 dias y me dijo que evite alimentos irritantes, cafe y alcohol.",
    category: "both",
  },
  {
    id: "ex-3",
    label: "Solo diagnostico",
    description: "Sin medicamentos, solo nombre de condicion",
    text: "Me dijeron que tengo sindrome de colon irritable y que debo mejorar mi alimentacion y manejar el estres.",
    category: "diagnosis",
  },
  {
    id: "ex-4",
    label: "Solo medicamentos",
    description: "Receta sin diagnostico claro",
    text: "Me recetaron Metformina 850mg cada 12 horas, Losartan 50mg una vez al dia y Atorvastatina 20mg por las noches.",
    category: "treatment",
  },
  {
    id: "ex-5",
    label: "Infeccion urinaria",
    description: "Antibiotico con indicaciones especificas",
    text: "Diagnostico: infeccion de vias urinarias. Tratamiento: Trimetoprim/Sulfametoxazol 160/800mg cada 12 horas por 5 dias. Tomar mucha agua y evitar retener la orina.",
    category: "both",
  },
]

/** Simulates submitting a manual diagnosis text for AI analysis */
export async function submitDiagnosis(
  _payload: WriteDiagnosisPayload,
  onProgress?: (progress: DiagnosisProgress) => void
): Promise<WriteDiagnosisResult> {
  const steps: DiagnosisProgress[] = [
    { percent: 15, status: "processing", message: "Analizando texto..." },
    { percent: 40, status: "processing", message: "Identificando diagnostico..." },
    { percent: 65, status: "processing", message: "Procesando medicamentos..." },
    { percent: 85, status: "processing", message: "Generando explicacion..." },
    { percent: 100, status: "complete", message: "Listo!" },
  ]

  for (const step of steps) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    onProgress?.(step)
  }

  return {
    id: `case-${Date.now()}`,
    diagnosis_raw: _payload.diagnosis_raw,
    source_type: "manual_text",
    status: "completed",
    created_at: new Date().toISOString(),
  }
}

/** Returns the list of guided examples */
export function getDiagnosisExamples(): DiagnosisExample[] {
  return DIAGNOSIS_EXAMPLES
}
