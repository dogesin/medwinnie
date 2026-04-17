import type { CaseQuestion, ChatMessage } from "@/types/consultation"

// ─── Suggested Questions ────────────────────────────────────
export const DUMMY_SUGGESTED_QUESTIONS: string[] = [
  "¿Puedo tomar el ibuprofeno con el estómago vacío?",
  "¿Cuánto tiempo tarda en hacer efecto el antibiótico?",
  "¿Qué pasa si olvido una dosis de amoxicilina?",
  "¿Puedo hacer ejercicio durante el tratamiento?",
  "¿Es contagiosa la faringitis bacteriana?",
]

// ─── Existing Q&A History ───────────────────────────────────
const DUMMY_QUESTIONS: CaseQuestion[] = [
  {
    id: "q-001",
    case_id: "case-001",
    user_id: "user-001",
    question_text: "¿Puedo tomar leche cuando tomo la amoxicilina?",
    answer_text:
      "Sí, puedes tomar leche con la amoxicilina sin problema. A diferencia de otros antibióticos (como las tetraciclinas), la amoxicilina no se ve afectada por los lácteos. De hecho, tomarla con alimento puede ayudar a reducir el malestar estomacal que a veces causa.\n\nLo que sí debes evitar es el alcohol durante todo el tratamiento, ya que puede reducir la efectividad del antibiótico y aumentar los efectos secundarios.",
    ai_context: null,
    status: "answered",
    created_at: "2026-04-15T14:20:00Z",
    answered_at: "2026-04-15T14:20:03Z",
    updated_at: "2026-04-15T14:20:03Z",
  },
  {
    id: "q-002",
    case_id: "case-001",
    user_id: "user-001",
    question_text: "¿Es normal que me duela el estómago con estos medicamentos?",
    answer_text:
      "Sí, es un efecto secundario bastante común, especialmente con la combinación de amoxicilina e ibuprofeno. Aquí te explico qué puedes hacer:\n\n**Para reducir las molestias:**\n- Siempre toma el ibuprofeno **después de comer**, nunca con el estómago vacío\n- La amoxicilina también es mejor tomarla con alimento\n- Puedes tomar un yogurt natural antes de los medicamentos para proteger un poco tu estómago\n\n**Cuándo preocuparte:**\n- Si el dolor de estómago es muy intenso o no mejora\n- Si notas sangre en las heces o vómito oscuro\n- Si tienes diarrea más de 3-4 veces al día\n\nSi las molestias son leves y manejables, es normal y deberían mejorar conforme tu cuerpo se adapte al tratamiento.",
    ai_context: null,
    status: "answered",
    created_at: "2026-04-15T16:45:00Z",
    answered_at: "2026-04-15T16:45:04Z",
    updated_at: "2026-04-15T16:45:04Z",
  },
]

// ─── Transform to ChatMessage[] for UI ──────────────────────
function questionsToChatMessages(questions: CaseQuestion[]): ChatMessage[] {
  const messages: ChatMessage[] = []
  for (const q of questions) {
    messages.push({
      id: `${q.id}-q`,
      role: "user",
      content: q.question_text,
      timestamp: q.created_at,
      status: q.status,
    })
    if (q.answer_text) {
      messages.push({
        id: `${q.id}-a`,
        role: "assistant",
        content: q.answer_text,
        timestamp: q.answered_at ?? q.created_at,
        status: q.status,
      })
    }
  }
  return messages
}

// ─── Simulated AI Response ──────────────────────────────────
const DUMMY_AI_RESPONSES: Record<string, string> = {
  "¿Puedo tomar el ibuprofeno con el estómago vacío?":
    "**No, no es recomendable.** El ibuprofeno puede irritar la mucosa del estómago, especialmente si lo tomas sin alimento. Siempre tómalo después de comer algo, aunque sea un bocado pequeño como una galleta o un plátano.\n\nSi tienes antecedentes de gastritis o úlceras, coméntalo con tu médico — podría recetarte un protector gástrico mientras dure el tratamiento.",
  "¿Cuánto tiempo tarda en hacer efecto el antibiótico?":
    "La amoxicilina empieza a combatir las bacterias desde la primera dosis, pero **notarás mejoría entre las 48 y 72 horas** de haber iniciado el tratamiento.\n\n**Es muy importante** que completes los 7 días completos aunque te sientas mejor antes. Si dejas el antibiótico antes de tiempo, las bacterias que quedan pueden volverse resistentes y la infección puede regresar más fuerte.\n\nSi después de 3 días no sientes ninguna mejoría, contacta a tu médico.",
  "¿Qué pasa si olvido una dosis de amoxicilina?":
    "Si olvidaste una dosis, tómala en cuanto te acuerdes. Sin embargo:\n\n- **Si ya casi es hora de la siguiente dosis** (faltan menos de 2 horas), sáltate la que olvidaste y continúa con tu horario normal\n- **Nunca tomes doble dosis** para compensar la que te faltó\n\nPara evitar olvidos, puedes poner alarmas en tu teléfono cada 8 horas. Muchas personas las programan a las 8:00, 16:00 y 00:00.",
  "¿Puedo hacer ejercicio durante el tratamiento?":
    "Depende de cómo te sientas:\n\n**Los primeros 2-3 días**, lo ideal es descansar. Tu cuerpo necesita energía para combatir la infección.\n\n**Después de 3 días**, si ya no tienes fiebre y te sientes con más energía, puedes hacer ejercicio **ligero** como caminar o estiramientos.\n\n**Evita** ejercicio intenso (correr, pesas, HIIT) hasta que termines el antibiótico y te sientas completamente recuperado. El ejercicio intenso puede debilitar temporalmente tu sistema inmune.\n\nEscucha a tu cuerpo — si te sientes agotado, descansa.",
  "¿Es contagiosa la faringitis bacteriana?":
    "**Sí, la faringitis bacteriana es contagiosa.** Se transmite por gotitas cuando hablas, toses o estornudas, y también por compartir vasos o cubiertos.\n\n**¿Cuánto tiempo eres contagioso?**\n- Sin antibiótico: puedes contagiar por 2-3 semanas\n- **Con antibiótico: dejas de ser contagioso después de 24-48 horas** de haber iniciado la amoxicilina\n\n**Mientras tanto:**\n- Evita besar o compartir vasos/cubiertos\n- Lávate las manos frecuentemente\n- Cubre tu boca al toser o estornudar\n- Usa cubrebocas si convives en espacios cerrados",
}

// ─── Exports (simulate async API) ───────────────────────────
export async function getChatMessages(
  _caseId: string
): Promise<ChatMessage[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return questionsToChatMessages(DUMMY_QUESTIONS)
}

export async function getSuggestedQuestions(
  _caseId: string
): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [...DUMMY_SUGGESTED_QUESTIONS]
}

export async function sendQuestion(
  _caseId: string,
  questionText: string
): Promise<ChatMessage> {
  // Simulate AI thinking (1.5-3s)
  await new Promise((resolve) =>
    setTimeout(resolve, 1500 + Math.random() * 1500)
  )

  const answer =
    DUMMY_AI_RESPONSES[questionText] ??
    `Gracias por tu pregunta. Basándome en tu diagnóstico de **faringitis bacteriana aguda** y tu tratamiento actual:\n\nEsta es una excelente pregunta. Te recomiendo que la comentes directamente con tu médico en tu próxima consulta, ya que podría depender de factores específicos de tu caso.\n\nMientras tanto, sigue tomando tus medicamentos según las indicaciones y no dudes en preguntar si tienes más dudas.`

  return {
    id: `q-${Date.now()}-a`,
    role: "assistant",
    content: answer,
    timestamp: new Date().toISOString(),
    status: "answered",
  }
}
