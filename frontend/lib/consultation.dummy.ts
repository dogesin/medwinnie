import type { MedicalCase, Medication } from "@/types/consultation"

// ─── Medications ─────────────────────────────────────────────
const DUMMY_MEDICATIONS: Medication[] = [
  {
    id: "med-001",
    case_id: "case-001",
    name: "Amoxicilina",
    dosage: "500 mg",
    frequency: "Cada 8 horas",
    duration: "7 días",
    purpose:
      "Eliminar la bacteria que está causando la infección en tu garganta. Es un antibiótico que ataca directamente al microorganismo responsable.",
    how_it_works:
      "Entra en tu cuerpo y destruye la pared de las bacterias, impidiendo que se reproduzcan. Con el tiempo, tu sistema inmune termina de limpiar la infección.",
    how_to_take:
      "Tómalo con un vaso lleno de agua, preferiblemente con alimento para evitar malestar estomacal. No lo mastiques. Completa todos los 7 días aunque te sientas mejor antes.",
    important_consideration:
      "No tomes alcohol durante el tratamiento. Si eres alérgico a la penicilina, avísale a tu médico de inmediato. Puede causar diarrea leve.",
    order_index: 0,
    created_at: "2026-04-15T10:30:00Z",
    updated_at: "2026-04-15T10:30:00Z",
  },
  {
    id: "med-002",
    case_id: "case-001",
    name: "Ibuprofeno",
    dosage: "400 mg",
    frequency: "Cada 6 horas (si hay dolor)",
    duration: "3-5 días",
    purpose:
      "Reducir el dolor de garganta, la inflamación y la fiebre. Es un antiinflamatorio que te hará sentir más cómodo mientras el antibiótico hace efecto.",
    how_it_works:
      "Bloquea unas sustancias llamadas prostaglandinas que causan inflamación, dolor y fiebre. No cura la infección, pero te ayuda a estar más cómodo.",
    how_to_take:
      "Siempre tómalo después de comer algo, nunca con el estómago vacío. Puedes tomarlo con agua o jugo. No excedas 3 tomas al día.",
    important_consideration:
      "Si tienes problemas de estómago o gastritis, consulta a tu médico antes de tomarlo. No lo mezcles con aspirina.",
    order_index: 1,
    created_at: "2026-04-15T10:30:00Z",
    updated_at: "2026-04-15T10:30:00Z",
  },
  {
    id: "med-003",
    case_id: "case-001",
    name: "Paracetamol",
    dosage: "500 mg",
    frequency: "Cada 6 horas (alterno con ibuprofeno)",
    duration: "3-5 días",
    purpose:
      "Controlar la fiebre y el malestar general. Se puede alternar con el ibuprofeno para mantener la temperatura estable sin exceder dosis de ninguno.",
    how_it_works:
      "Actúa en el cerebro reduciendo la percepción del dolor y regulando la temperatura corporal. Es muy seguro cuando se respeta la dosis.",
    how_to_take:
      "Puedes tomarlo con o sin alimento. Trágalo entero con agua. No tomes más de 4 gramos al día (8 tabletas de 500 mg).",
    important_consideration:
      "Evita tomarlo si consumes alcohol frecuentemente. El exceso puede dañar el hígado. No lo combines con otros medicamentos que contengan paracetamol (como antigripales).",
    order_index: 2,
    created_at: "2026-04-15T10:30:00Z",
    updated_at: "2026-04-15T10:30:00Z",
  },
]

// ─── Medical Case ────────────────────────────────────────────
const DUMMY_CASE: MedicalCase = {
  id: "case-001",
  user_id: "user-001",
  diagnosis: "Faringitis bacteriana aguda",
  diagnosis_raw:
    "Dx: Faringitis aguda bacteriana. Tx: Amoxicilina 500mg c/8h x 7 días. Ibuprofeno 400mg c/6h PRN. Paracetamol 500mg c/6h alterno.",
  analysis_result: {
    que_tienes:
      "Tienes una **faringitis bacteriana aguda**, que es una infección en la garganta causada por bacterias (probablemente estreptococo). Es diferente a un resfriado común porque la causa es una bacteria, no un virus, y por eso necesita antibiótico.\n\nTus síntomas principales — dolor intenso al tragar, inflamación de las amígdalas y posiblemente fiebre — son señales claras de esta infección. Es una condición muy común y tratable.",
    por_que_pasa:
      "La faringitis bacteriana ocurre cuando bacterias (generalmente *Streptococcus pyogenes*) se instalan en tu garganta y provocan una respuesta inflamatoria.\n\n**¿Cómo se contagia?**\n- Gotitas al hablar, toser o estornudar de alguien infectado\n- Compartir vasos, cubiertos o alimentos\n- Tocarte la boca o nariz después de tocar superficies contaminadas\n\n**¿Por qué a ti?** El estrés, falta de sueño, cambios bruscos de temperatura o tener las defensas bajas pueden hacer que seas más susceptible. No es tu culpa — es algo que le pasa a millones de personas cada año.",
    medicamentos:
      "Tu tratamiento incluye 3 medicamentos que trabajan en equipo: un antibiótico que ataca la causa (Amoxicilina), un antiinflamatorio que reduce el dolor y la fiebre (Ibuprofeno), y un analgésico complementario (Paracetamol). Es importante respetar los horarios y completar el antibiótico aunque te sientas mejor.",
    por_que_tratamiento:
      "Tu médico eligió este tratamiento por varias razones:\n\n1. **Amoxicilina** es el antibiótico de primera línea para faringitis bacteriana — es efectivo, seguro y bien tolerado\n2. **Ibuprofeno + Paracetamol** en alternancia te permiten mantener el dolor y la fiebre controlados las 24 horas sin exceder la dosis de ninguno\n3. **7 días de antibiótico** es el tiempo estándar para eliminar completamente la bacteria y prevenir complicaciones como fiebre reumática\n\nEste esquema es el más recomendado por las guías médicas para tu tipo de infección.",
    que_cuidar:
      "Para recuperarte más rápido y evitar complicaciones:\n\n- **Descansa** lo más que puedas los primeros 2-3 días\n- **Toma muchos líquidos** — agua, té con miel, caldos tibios. Evita bebidas muy frías o muy calientes\n- **Alimentos suaves** — sopas, purés, yogurt. Evita alimentos ácidos, picantes o ásperos\n- **Gárgaras con agua tibia y sal** — media cucharadita de sal en un vaso de agua tibia, 3-4 veces al día\n- **No compartas vasos ni cubiertos** para no contagiar a otros\n- **Lávate las manos** frecuentemente, especialmente después de toser o estornudar\n- **Evita fumar** o estar en ambientes con humo — irrita más la garganta",
    ojo_con_esto:
      "Busca atención médica urgente si presentas cualquiera de estas señales:\n\n🔴 **Ve a urgencias si:**\n- No puedes tragar ni siquiera líquidos\n- Tienes dificultad para respirar o sientes que se te cierra la garganta\n- Fiebre mayor a 39.5°C que no baja con medicamento\n- Aparece un sarpullido o manchas rojas en la piel\n\n🟡 **Regresa con tu médico si:**\n- Después de 48-72 horas con antibiótico no mejoras nada\n- El dolor empeora en lugar de mejorar\n- Aparecen síntomas nuevos como dolor de oído, tos con flema verde, o rigidez en el cuello\n- Notas manchas blancas grandes en las amígdalas",
    estudios_pendientes: null,
    que_preguntar:
      "En tu próxima consulta o si hablas con tu médico, estas preguntas pueden ser útiles:\n\n1. ¿Necesito un cultivo de garganta o prueba rápida de estreptococo para confirmar?\n2. ¿Cuánto tiempo seré contagioso después de iniciar el antibiótico?\n3. Si soy alérgico a algo, ¿hay alternativas al antibiótico?\n4. ¿Debo hacer una consulta de seguimiento después de terminar los 7 días?\n5. ¿Cómo puedo prevenir que esto me vuelva a pasar?\n6. ¿Es normal que el dolor no mejore completamente en las primeras 24 horas?",
    en_corto:
      "**Tienes una infección de garganta por bacteria** que se cura con antibiótico en 7 días. Toma tu Amoxicilina cada 8 horas sin falta (aunque te sientas mejor), alterna Ibuprofeno y Paracetamol para el dolor, descansa mucho y toma líquidos tibios. Deberías sentir mejoría en 2-3 días. Si después de 3 días no mejoras o empeoras, regresa con tu médico.",
  },
  status: "en_tratamiento",
  current_health_status: null,
  consultation_date: "2026-04-15",
  last_diary_entry_at: null,
  last_diary_health_status: null,
  diary_entry_count: 0,
  question_count: 0,
  source_type: "manual_text",
  source_image_path: null,
  medications: DUMMY_MEDICATIONS,
  created_at: "2026-04-15T10:30:00Z",
  updated_at: "2026-04-15T10:30:00Z",
}

// ─── Exports (simulate async API) ───────────────────────────
export async function getCase(id: string): Promise<MedicalCase> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { ...DUMMY_CASE, id }
}

export async function getMedications(caseId: string): Promise<Medication[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return DUMMY_MEDICATIONS.map((m) => ({ ...m, case_id: caseId }))
}

export async function saveCase(_id: string): Promise<{ saved: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { saved: true }
}
