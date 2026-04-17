import type { CaseQuestion, ChatMessage } from "@/types/consultation"

// ─── Suggested Questions (history-aware, reference diary & evolution) ────────
export const DUMMY_HISTORY_SUGGESTED_QUESTIONS: Record<string, string[]> = {
  "case-1": [
    "Ya me siento mejor, ¿puedo dejar el antibiótico antes?",
    "¿Es normal seguir con dolor leve después de 4 días?",
    "Mi diario dice que mejoré, ¿cuándo puedo retomar ejercicio?",
    "¿Necesito otra consulta de seguimiento?",
    "¿Qué pasa si olvido una dosis a estas alturas del tratamiento?",
  ],
  "case-2": [
    "¿Puedo dejar el omeprazol si ya no tengo agruras?",
    "¿Cuánto tiempo tarda en sanar la gastritis por completo?",
    "¿Puedo volver a tomar café después del tratamiento?",
  ],
  "case-3": [
    "¿La rinitis alérgica se cura o solo se controla?",
    "¿Puedo combinar la loratadina con otro antihistamínico?",
    "¿Cuánto tiempo debo usar la fluticasona nasal?",
  ],
  "case-4": [
    "Mi diario dice que sigo igual, ¿es normal con la metformina?",
    "¿Cuánto tiempo tarda la metformina en regular mi azúcar?",
    "¿Qué nivel de glucosa en ayunas debo buscar?",
    "¿Puedo hacer ejercicio intenso con diabetes tipo 2?",
    "¿Qué alimentos debo evitar absolutamente?",
  ],
  "case-5": [
    "¿Cuándo puedo volver a cargar peso después de una contractura?",
    "¿Es normal que el dolor regrese al dejar el naproxeno?",
  ],
}

// ─── Existing Q&A History (enriched with diary/evolution context) ────────────
const DUMMY_HISTORY_QUESTIONS: Record<string, CaseQuestion[]> = {
  "case-1": [
    {
      id: "hq-001",
      case_id: "case-1",
      user_id: "user-1",
      question_text: "Llevo 4 días con el antibiótico y mi diario dice que mejoré. ¿Puedo dejar de tomarlo?",
      answer_text:
        "**No, es muy importante que completes los 7 días completos** de amoxicilina, aunque ya te sientas mejor.\n\nVeo que en tu diario registraste mejoría el día 4, lo cual es excelente y significa que el antibiótico está funcionando. Sin embargo, dejar el tratamiento antes de tiempo puede:\n\n- Permitir que las bacterias restantes se fortalezcan\n- Causar que la infección regrese, posiblemente más difícil de tratar\n- Contribuir a la resistencia antibiótica\n\n**Te faltan solo 3 días más.** Sigue con el horario de cada 8 horas y termina el tratamiento completo.",
      ai_context: null,
      status: "answered",
      created_at: "2026-04-14T19:00:00Z",
      answered_at: "2026-04-14T19:00:04Z",
      updated_at: "2026-04-14T19:00:04Z",
    },
    {
      id: "hq-002",
      case_id: "case-1",
      user_id: "user-1",
      question_text: "¿El ibuprofeno puedo seguir tomándolo si ya no me duele tanto?",
      answer_text:
        "Como ya no tienes tanto dolor, puedes reducir gradualmente el ibuprofeno:\n\n1. **Si el dolor es leve o casi nulo** → puedes dejar de tomarlo. El ibuprofeno es \"a demanda\" en tu receta (cada 6 horas *si hay dolor*)\n2. **Si tienes molestias ocasionales** → tómalo solo cuando lo necesites, no de forma preventiva\n\n**Importante:** A diferencia del antibiótico, el ibuprofeno no necesita completarse en días fijos. Es un antiinflamatorio para el confort.\n\nSi el dolor regresa con intensidad, retoma el ibuprofeno y anota en tu diario cómo te sentiste.",
      ai_context: null,
      status: "answered",
      created_at: "2026-04-15T10:30:00Z",
      answered_at: "2026-04-15T10:30:05Z",
      updated_at: "2026-04-15T10:30:05Z",
    },
  ],
  "case-4": [
    {
      id: "hq-003",
      case_id: "case-4",
      user_id: "user-1",
      question_text: "Llevo un mes con metformina y mi diario dice que sigo igual. ¿Es normal?",
      answer_text:
        "Sí, es completamente normal. La metformina trabaja de forma gradual y los cambios pueden tomar entre **4 a 12 semanas** para ser notables.\n\nVeo en tu historial que registraste sed excesiva y cansancio. Estos síntomas deberían ir mejorando conforme:\n\n- Tu cuerpo se adapta al medicamento\n- Los niveles de glucosa se estabilizan\n- Mantienes la dieta y el ejercicio recomendados\n\n**Lo que puedes hacer:**\n- Mide tu glucosa en ayunas cada mañana y anótala en tu diario\n- Busca que esté entre **80-130 mg/dL** en ayunas\n- Si después de 8 semanas no ves mejoría, tu médico podría ajustar la dosis\n\nNo te desanimes — el control de la diabetes es un proceso gradual.",
      ai_context: null,
      status: "answered",
      created_at: "2026-03-21T09:15:00Z",
      answered_at: "2026-03-21T09:15:06Z",
      updated_at: "2026-03-21T09:15:06Z",
    },
  ],
}

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

// ─── Simulated AI Responses (history-aware) ─────────────────
const DUMMY_AI_RESPONSES: Record<string, string> = {
  "Ya me siento mejor, ¿puedo dejar el antibiótico antes?":
    "**No, debes completar los 7 días completos.** Aunque tu diario muestra mejoría (lo cual es genial), las bacterias que quedan pueden volverse resistentes si suspendes el antibiótico antes de tiempo.\n\nTe quedan pocos días — sigue con el horario de cada 8 horas y termina el ciclo completo.",
  "¿Es normal seguir con dolor leve después de 4 días?":
    "Sí, es normal tener **molestias leves residuales** hasta el día 5 o 6 del tratamiento. Tu diario muestra buena evolución (de \"igual\" a \"mejor\"), lo cual indica que el antibiótico está haciendo su trabajo.\n\nSi el dolor leve persiste después de terminar los 7 días de amoxicilina, sería bueno revisarlo con tu médico.",
  "Mi diario dice que mejoré, ¿cuándo puedo retomar ejercicio?":
    "Veo que tu última entrada del diario marca mejoría. Para retomar ejercicio:\n\n**Ahora (durante el antibiótico):**\n- Caminatas suaves están bien\n- Evita ejercicio intenso\n\n**Después de terminar el tratamiento (día 8+):**\n- Si no tienes fiebre ni dolor → puedes retomar gradualmente\n- Empieza con 50% de tu intensidad normal\n- Aumenta gradualmente durante la semana\n\nEscucha a tu cuerpo y anota en tu diario cómo te sientes después de cada sesión.",
  "¿Necesito otra consulta de seguimiento?":
    "Basándome en tu evolución:\n\n**No necesitas consulta urgente** si:\n- Tu diario sigue mostrando mejoría\n- Completaste los 7 días de antibiótico\n- No tienes fiebre ni dolor intenso\n\n**Sí agenda consulta** si:\n- Después de terminar el tratamiento, los síntomas regresan\n- Aparece fiebre mayor a 38.5°C\n- El dolor de garganta empeora en lugar de mejorar\n\nTu evolución actual se ve bien según tu diario.",
  "Mi diario dice que sigo igual, ¿es normal con la metformina?":
    "Sí, es completamente esperable. La metformina requiere **4 a 12 semanas** para mostrar resultados consistentes.\n\nTu diario registra que sigues con sed excesiva y cansancio — estos síntomas mejorarán gradualmente conforme se estabilice tu glucosa.\n\n**Recomendaciones:**\n- Mide tu glucosa en ayunas diario y anótala\n- Mantén la dieta baja en azúcares\n- 30 minutos de caminata diaria marcan gran diferencia\n\nSi después de 8 semanas tu glucosa no baja de 130 mg/dL en ayunas, tu médico podría ajustar la dosis.",
  "¿Cuánto tiempo tarda la metformina en regular mi azúcar?":
    "La metformina actúa en varias fases:\n\n**Semana 1-2:** Tu cuerpo se adapta al medicamento. Puedes sentir molestias digestivas leves.\n\n**Semana 2-4:** Los niveles de glucosa empiezan a bajar gradualmente.\n\n**Semana 4-12:** Los efectos completos se hacen evidentes. Tu glucosa en ayunas debería estar entre **80-130 mg/dL**.\n\nEs un proceso gradual. Lo más importante es combinar el medicamento con los cambios de hábitos que te indicaron.",
}

// ─── Exports (simulate async API) ───────────────────────────
export async function getHistoryChatMessages(
  caseId: string
): Promise<ChatMessage[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const questions = DUMMY_HISTORY_QUESTIONS[caseId] ?? []
  return questionsToChatMessages(questions)
}

export async function getHistorySuggestedQuestions(
  caseId: string
): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [...(DUMMY_HISTORY_SUGGESTED_QUESTIONS[caseId] ?? DUMMY_HISTORY_SUGGESTED_QUESTIONS["case-1"])]
}

export async function sendHistoryQuestion(
  _caseId: string,
  questionText: string
): Promise<ChatMessage> {
  // Simulate AI thinking (1.5–3s)
  await new Promise((resolve) =>
    setTimeout(resolve, 1500 + Math.random() * 1500)
  )

  const answer =
    DUMMY_AI_RESPONSES[questionText] ??
    `Gracias por tu pregunta. Revisé tu historial completo, incluyendo tu diario de evolución y medicamentos.\n\nEsta es una pregunta importante. Te recomiendo que la comentes con tu médico en tu próxima consulta, ya que podría depender de factores específicos de tu caso y cómo has evolucionado.\n\nMientras tanto, sigue registrando cómo te sientes en tu diario — eso ayuda a tener un mejor panorama de tu evolución.`

  return {
    id: `hq-${Date.now()}-a`,
    role: "assistant",
    content: answer,
    timestamp: new Date().toISOString(),
    status: "answered",
  }
}
