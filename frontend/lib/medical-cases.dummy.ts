import type {
  MedicalCase,
  MedicalCaseCreate,
  MedicalCaseUpdate,
  MedicalCaseEditData,
  Medication,
  DiaryEntry,
  DiaryEntryCreate,
} from "@/types/medical-case"

// ---------------------------------------------------------------------------
// Realistic dummy data matching the Database Blueprint field names
// ---------------------------------------------------------------------------

const DUMMY_MEDICATIONS: Medication[] = [
  {
    id: "med-1a",
    case_id: "case-1",
    name: "Amoxicilina",
    dosage: "500 mg",
    frequency: "Cada 8 horas",
    duration: "7 días",
    purpose: "Combatir la infección bacteriana en la garganta",
    order_index: 0,
  },
  {
    id: "med-1b",
    case_id: "case-1",
    name: "Ibuprofeno",
    dosage: "400 mg",
    frequency: "Cada 6 horas si hay dolor",
    duration: "5 días",
    purpose: "Reducir dolor e inflamación",
    order_index: 1,
  },
  {
    id: "med-2a",
    case_id: "case-2",
    name: "Omeprazol",
    dosage: "20 mg",
    frequency: "Una vez al día en ayunas",
    duration: "14 días",
    purpose: "Reducir la acidez y proteger el estómago",
    order_index: 0,
  },
  {
    id: "med-3a",
    case_id: "case-3",
    name: "Loratadina",
    dosage: "10 mg",
    frequency: "Una vez al día",
    duration: "10 días",
    purpose: "Controlar los síntomas de alergia",
    order_index: 0,
  },
  {
    id: "med-3b",
    case_id: "case-3",
    name: "Fluticasona nasal",
    dosage: "2 disparos por fosa",
    frequency: "Una vez al día",
    duration: "14 días",
    purpose: "Desinflamar la mucosa nasal",
    order_index: 1,
  },
  {
    id: "med-4a",
    case_id: "case-4",
    name: "Metformina",
    dosage: "850 mg",
    frequency: "Dos veces al día con alimentos",
    duration: "Continuo",
    purpose: "Regular los niveles de azúcar en sangre",
    order_index: 0,
  },
  {
    id: "med-5a",
    case_id: "case-5",
    name: "Naproxeno",
    dosage: "250 mg",
    frequency: "Cada 12 horas",
    duration: "5 días",
    purpose: "Aliviar dolor muscular e inflamación",
    order_index: 0,
  },
  {
    id: "med-5b",
    case_id: "case-5",
    name: "Ciclobenzaprina",
    dosage: "10 mg",
    frequency: "Antes de dormir",
    duration: "7 días",
    purpose: "Relajar los músculos contracturados",
    order_index: 1,
  },
  {
    id: "med-draft-a",
    case_id: "case-draft",
    name: "Naproxeno",
    dosage: "500 mg",
    frequency: "Cada 12 horas si hay crisis",
    duration: "5 días",
    purpose: "Aliviar el dolor de cabeza durante el ataque",
    order_index: 0,
  },
  {
    id: "med-draft-b",
    case_id: "case-draft",
    name: "Sumatriptán",
    dosage: "50 mg",
    frequency: "Al primer signo de migraña",
    duration: "Máximo 2 veces por semana",
    purpose: "Detener el ataque de migraña",
    order_index: 1,
  },
]

const DUMMY_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: "diary-1a",
    case_id: "case-1",
    user_id: "user-1",
    health_status: "igual",
    symptoms: ["dolor de garganta", "fiebre leve"],
    note: "Segundo día de antibiótico, todavía me duele un poco pero baja la fiebre.",
    entry_date: "2026-04-11",
    created_at: "2026-04-11T20:00:00Z",
  },
  {
    id: "diary-1b",
    case_id: "case-1",
    user_id: "user-1",
    health_status: "mejor",
    symptoms: ["dolor leve"],
    note: "Ya casi no me duele, puedo tragar mejor. Sigo con el tratamiento.",
    entry_date: "2026-04-14",
    created_at: "2026-04-14T18:30:00Z",
  },
  {
    id: "diary-2a",
    case_id: "case-2",
    user_id: "user-1",
    health_status: "mejor",
    symptoms: [],
    note: "Menos agruras que antes, sobre todo en las mañanas.",
    entry_date: "2026-04-05",
    created_at: "2026-04-05T09:00:00Z",
  },
  {
    id: "diary-4a",
    case_id: "case-4",
    user_id: "user-1",
    health_status: "igual",
    symptoms: ["sed excesiva", "cansancio"],
    note: "Me siento igual, tengo que seguir con la dieta. Mañana vuelvo al doctor.",
    entry_date: "2026-03-20",
    created_at: "2026-03-20T21:00:00Z",
  },
]

const DUMMY_CASES: MedicalCase[] = [
  {
    id: "case-draft",
    user_id: "user-1",
    diagnosis: "Migraña con aura",
    diagnosis_raw:
      "Migraña con aura. Naproxeno 500mg c/12h para crisis. Sumatriptán 50mg al inicio del ataque. Evitar desencadenantes conocidos.",
    analysis_result: {
      en_corto: "Tienes migraña con aura — dolores de cabeza intensos que vienen acompañados de síntomas visuales. Hay medicamentos específicos para detener el ataque.",
      que_tienes: "La migraña con aura es un tipo de cefalea intensa precedida por síntomas neurológicos temporales (el 'aura'): destellos visuales, puntos ciegos o sensaciones de hormigueo. Dura entre 4 y 72 horas si no se trata.",
      por_que_pasa: "Involucra cambios en la actividad eléctrica del cerebro y en los vasos sanguíneos craneales. Puede haber desencadenantes como estrés, falta de sueño, ciertos alimentos o cambios hormonales.",
      por_que_tratamiento: "El naproxeno reduce la inflamación general durante la crisis. El sumatriptán actúa directamente sobre los receptores de serotonina del cerebro para detener el mecanismo del ataque de migraña.",
      medicamentos: "**Naproxeno 500mg** cada 12 horas durante la crisis. **Sumatriptán 50mg** al primer signo del ataque — máximo 2 veces por semana para evitar cefalea por rebote.",
      que_cuidar: "Identifica y evita tus desencadenantes personales. Mantén horarios regulares de sueño y comidas. Descansa en un lugar oscuro y silencioso durante el ataque. Lleva un diario de migrañas.",
      ojo_con_esto: "Acude a urgencias si el dolor de cabeza es el más intenso de tu vida ('en trueno'), aparece con fiebre, rigidez de nuca, confusión, problemas de visión persistentes o debilidad en un lado del cuerpo.",
      estudios_pendientes: "Tu médico podría solicitar una resonancia magnética si las crisis son muy frecuentes o cambian de patrón, para descartar otras causas.",
      que_preguntar: "¿Con qué frecuencia es normal tener migraña? ¿Cuándo debo considerar un tratamiento preventivo diario? ¿Qué alimentos o hábitos debo cambiar?",
    },
    status: "borrador",
    current_health_status: null,
    consultation_date: "2026-04-17",
    last_diary_entry_at: null,
    last_diary_health_status: null,
    diary_entry_count: 0,
    question_count: 0,
    source_type: "manual_text",
    source_image_path: null,
    created_at: "2026-04-17T14:00:00Z",
    updated_at: "2026-04-17T14:00:00Z",
    deleted_at: null,
  },
  {
    id: "case-1",
    user_id: "user-1",
    diagnosis: "Faringitis bacteriana",
    diagnosis_raw:
      "Faringitis aguda de probable origen bacteriano. Se indica amoxicilina 500mg c/8h por 7 días e ibuprofeno para dolor.",
    analysis_result: {
      en_corto: "Tienes una infección bacteriana en la garganta. Con antibiótico y reposo estarás bien en unos días.",
      que_tienes: "La faringitis bacteriana es una infección causada por bacterias (generalmente *Streptococcus*) que inflama la garganta. Es diferente de un resfrío común — necesita antibiótico para curar.",
      por_que_pasa: "Las bacterias se contagian por contacto con gotitas de saliva de alguien infectado. Tu sistema inmune reaccionó causando inflamación, dolor y fiebre.",
      por_que_tratamiento: "La amoxicilina mata la bacteria directamente. El ibuprofeno reduce la inflamación y el dolor mientras el antibiótico hace efecto. Es importante terminar el ciclo completo aunque te sientas mejor.",
      medicamentos: "**Amoxicilina 500mg** cada 8 horas por 7 días — el antibiótico principal. **Ibuprofeno 400mg** cada 6 horas si hay dolor o fiebre.",
      que_cuidar: "Descansa, toma líquidos tibios (agua, caldos, té) y evita alimentos irritantes como picante o muy ácidos. No dejes el antibiótico aunque te sientas mejor.",
      ojo_con_esto: "Ve al médico si la fiebre sube de 39°C, aparece sarpullido, dificultad para respirar o tragar saliva, o si no mejoras después de 3 días de antibiótico.",
      estudios_pendientes: null,
      que_preguntar: "¿Necesito prueba de estreptococo? ¿Qué pasa si olvido una dosis? ¿Puedo volver al trabajo/escuela?",
    },
    status: "en_tratamiento",
    current_health_status: "mejor",
    consultation_date: "2026-04-10",
    last_diary_entry_at: "2026-04-14T18:30:00Z",
    last_diary_health_status: "mejor",
    diary_entry_count: 2,
    question_count: 3,
    source_type: "upload_photo",
    source_image_path: "/uploads/receta-case1.jpg",
    created_at: "2026-04-10T10:30:00Z",
    updated_at: "2026-04-14T18:30:00Z",
    deleted_at: null,
  },
  {
    id: "case-2",
    user_id: "user-1",
    diagnosis: "Gastritis leve",
    diagnosis_raw:
      "Gastritis superficial. Omeprazol 20mg en ayunas por 14 días. Dieta blanda.",
    analysis_result: {
      en_corto: "Tienes gastritis leve — inflamación del estómago por acidez. Con medicamento y dieta blanda mejoras rápido.",
      que_tienes: "La gastritis es una irritación del revestimiento del estómago. En tu caso es leve y superficial, causada por exceso de ácido.",
      por_que_pasa: "El estómago produce demasiado ácido, que irrita su propio revestimiento. Puede ser por estrés, comidas irritantes, café o tomar medicamentos con el estómago vacío.",
      por_que_tratamiento: "El omeprazol reduce la producción de ácido para que el estómago pueda sanar. La dieta blanda evita que nuevos irritantes dañen la mucosa.",
      medicamentos: "**Omeprazol 20mg** en ayunas, 30 min antes de desayunar, por 14 días.",
      que_cuidar: "Come despacio, en porciones pequeñas. Evita café, alcohol, picante y cítricos. No acostarse inmediatamente después de comer.",
      ojo_con_esto: "Consulta si aparece vómito con sangre, heces negras, dolor intenso que no cede, o si no mejoras en 5 días.",
      estudios_pendientes: "Si los síntomas persisten, tu médico puede solicitar una endoscopía para descartar úlcera.",
      que_preguntar: "¿Cuánto tiempo debo seguir la dieta? ¿Puedo tomar ibuprofeno si me duele algo? ¿Debo hacerme la prueba de H. pylori?",
    },
    status: "completado",
    current_health_status: "mejor",
    consultation_date: "2026-04-01",
    last_diary_entry_at: "2026-04-05T09:00:00Z",
    last_diary_health_status: "mejor",
    diary_entry_count: 1,
    question_count: 1,
    source_type: "manual_text",
    source_image_path: null,
    created_at: "2026-04-01T14:00:00Z",
    updated_at: "2026-04-05T09:00:00Z",
    deleted_at: null,
  },
  {
    id: "case-3",
    user_id: "user-1",
    diagnosis: "Rinitis alérgica estacional",
    diagnosis_raw:
      "Rinitis alérgica. Loratadina 10mg/día y fluticasona nasal 2 disparos/fosa.",
    analysis_result: {
      en_corto: "Tu nariz reacciona exageradamente al polen de la temporada. Los medicamentos controlan los síntomas mientras dure la estación.",
      que_tienes: "La rinitis alérgica estacional es una reacción del sistema inmune al polen. Tu cuerpo lo identifica como amenaza y libera histamina, causando congestión, estornudos y ojos llorosos.",
      por_que_pasa: "En primavera aumenta el polen en el aire. Si eres alérgico, tu sistema inmune sobrereacciona cada vez que lo respiras.",
      por_que_tratamiento: "La loratadina bloquea la histamina para reducir síntomas generales. La fluticasona nasal reduce la inflamación directamente en la mucosa nasal.",
      medicamentos: "**Loratadina 10mg** una vez al día (mejor por la mañana). **Fluticasona nasal** 2 disparos por cada fosa nasal, una vez al día.",
      que_cuidar: "Mantén ventanas cerradas por las mañanas (pico de polen). Dúchate al llegar a casa. Usa lentes de sol en exteriores.",
      ojo_con_esto: "Consulta si tienes dificultad para respirar, silbidos en el pecho, o si los síntomas empeoran mucho — podría desarrollarse asma.",
      estudios_pendientes: "Considera prueba de alergia (prick test) para identificar exactamente a qué eres alérgico.",
      que_preguntar: "¿Cuánto tiempo debo usar la fluticasona? ¿Puedo tomar la loratadina todo el año? ¿Vale la pena la inmunoterapia?",
    },
    status: "en_tratamiento",
    current_health_status: null,
    consultation_date: "2026-04-15",
    last_diary_entry_at: null,
    last_diary_health_status: null,
    diary_entry_count: 0,
    question_count: 0,
    source_type: "upload_photo",
    source_image_path: "/uploads/receta-case3.jpg",
    created_at: "2026-04-15T11:00:00Z",
    updated_at: "2026-04-15T11:00:00Z",
    deleted_at: null,
  },
  {
    id: "case-4",
    user_id: "user-1",
    diagnosis: "Diabetes tipo 2 — control inicial",
    diagnosis_raw:
      "Diabetes mellitus tipo 2 de reciente diagnóstico. Metformina 850mg c/12h. Dieta y ejercicio.",
    analysis_result: {
      en_corto: "Tu cuerpo no regula bien el azúcar en la sangre. Con medicamento, dieta y ejercicio puedes controlarlo muy bien.",
      que_tienes: "La diabetes tipo 2 significa que tus células no responden bien a la insulina, la hormona que regula el azúcar. El azúcar se acumula en la sangre en lugar de entrar a las células.",
      por_que_pasa: "Combinación de predisposición genética con factores de estilo de vida: exceso de carbohidratos refinados, sedentarismo, sobrepeso. Es un diagnóstico reciente, por eso el tratamiento es relativamente simple.",
      por_que_tratamiento: "La metformina ayuda a que tus células respondan mejor a la insulina y reduce la producción de glucosa en el hígado. Es el medicamento de primera línea más seguro y estudiado.",
      medicamentos: "**Metformina 850mg** dos veces al día, con el desayuno y la cena. Tomarlo con alimentos reduce los efectos digestivos.",
      que_cuidar: "Ejercicio moderado 30 minutos al día (caminar sirve). Reducir azúcares simples (refrescos, pan blanco, dulces). Medir glucosa en ayunas idealmente cada mañana.",
      ojo_con_esto: "Ve al médico si tienes glucosa en ayunas mayor a 250, mucha sed y orina frecuente, visión borrosa repentina, o heridas que no sanan.",
      estudios_pendientes: "Hemoglobina glucosilada (HbA1c) en 3 meses para ver el control. Perfil de lípidos y función renal anual.",
      que_preguntar: "¿Cuál es mi meta de glucosa en ayunas? ¿Cuándo podría necesitar insulina? ¿Puedo revertir la diabetes con cambios de estilo de vida?",
    },
    status: "en_tratamiento",
    current_health_status: "igual",
    consultation_date: "2026-03-15",
    last_diary_entry_at: "2026-03-20T21:00:00Z",
    last_diary_health_status: "igual",
    diary_entry_count: 1,
    question_count: 5,
    source_type: "upload_photo",
    source_image_path: "/uploads/receta-case4.jpg",
    created_at: "2026-03-15T09:00:00Z",
    updated_at: "2026-03-20T21:00:00Z",
    deleted_at: null,
  },
  {
    id: "case-5",
    user_id: "user-1",
    diagnosis: "Contractura muscular lumbar",
    diagnosis_raw:
      "Contractura muscular lumbar por esfuerzo. Naproxeno 250mg c/12h y ciclobenzaprina 10mg por la noche.",
    analysis_result: {
      en_corto: "Los músculos de tu espalda baja se tensaron por un esfuerzo. Con medicamento y reposo relativo mejoras en pocos días.",
      que_tienes: "Una contractura muscular es cuando el músculo se contrae involuntariamente y no puede relajarse. En la zona lumbar es muy común y causa dolor intenso al moverse.",
      por_que_pasa: "Un movimiento brusco, cargar peso de forma incorrecta o mantenerse mucho tiempo en la misma postura provoca que las fibras musculares se tensionen en exceso.",
      por_que_tratamiento: "El naproxeno reduce la inflamación y el dolor. La ciclobenzaprina relaja directamente el músculo contracturado, por eso se toma por la noche — tiene efecto sedante.",
      medicamentos: "**Naproxeno 250mg** cada 12 horas con alimentos. **Ciclobenzaprina 10mg** solo antes de dormir (causa somnolencia).",
      que_cuidar: "Aplica calor seco (cojín térmico) 15-20 min, 3 veces al día. Reposo relativo — no en cama todo el día, camina despacio. Evita cargar objetos pesados.",
      ojo_con_esto: "Consulta si el dolor baja por la pierna (ciática), si tienes entumecimiento, o si el dolor no mejora en 5 días.",
      estudios_pendientes: null,
      que_preguntar: "¿Debo hacer fisioterapia? ¿Cuándo puedo retomar el ejercicio? ¿Hay ejercicios que me ayuden a prevenir esto?",
    },
    status: "archivado",
    current_health_status: "mejor",
    consultation_date: "2026-02-20",
    last_diary_entry_at: null,
    last_diary_health_status: null,
    diary_entry_count: 0,
    question_count: 2,
    source_type: "manual_text",
    source_image_path: null,
    created_at: "2026-02-20T16:00:00Z",
    updated_at: "2026-03-01T12:00:00Z",
    deleted_at: null,
  },
]

// ---------------------------------------------------------------------------
// Dummy API functions
// ---------------------------------------------------------------------------

export async function getMedicalCases(): Promise<MedicalCase[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 600))
  return DUMMY_CASES
}

export async function getMedicalCase(id: string): Promise<MedicalCase> {
  await new Promise((r) => setTimeout(r, 400))
  return DUMMY_CASES.find((c) => c.id === id) ?? DUMMY_CASES[0]
}

export async function createMedicalCase(
  data: MedicalCaseCreate
): Promise<MedicalCase> {
  return {
    ...data,
    id: `case-${Date.now()}`,
    user_id: "user-1",
    status: "en_tratamiento",
    current_health_status: null,
    last_diary_entry_at: null,
    last_diary_health_status: null,
    diary_entry_count: 0,
    question_count: 0,
    source_image_path: data.source_image_path ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  }
}

export async function updateMedicalCase(
  id: string,
  data: MedicalCaseUpdate
): Promise<MedicalCase> {
  const existing = DUMMY_CASES.find((c) => c.id === id) ?? DUMMY_CASES[0]
  return { ...existing, ...data, updated_at: new Date().toISOString() }
}

export async function deleteMedicalCase(_id: string): Promise<void> {
  // no-op in dummy mode
}

export async function editMedicalCase(
  id: string,
  data: MedicalCaseEditData
): Promise<MedicalCase> {
  await new Promise((r) => setTimeout(r, 1000))
  const existing = DUMMY_CASES.find((c) => c.id === id) ?? DUMMY_CASES[0]
  return {
    ...existing,
    diagnosis: data.diagnosis,
    diagnosis_raw: data.diagnosis_raw,
    consultation_date: data.consultation_date,
    updated_at: new Date().toISOString(),
  }
}

// Get initial symptoms associated with a case (from the first diary entry or default)
const CASE_SYMPTOMS: Record<string, string[]> = {
  "case-1": ["dolor de garganta", "fiebre leve", "dificultad para tragar"],
  "case-2": ["acidez estomacal", "dolor de estómago", "náuseas"],
  "case-3": ["congestión nasal", "estornudos", "ojos llorosos"],
  "case-4": ["sed excesiva", "cansancio", "visión borrosa"],
  "case-5": ["dolor muscular", "rigidez lumbar", "dolor al moverse"],
}

export async function getCaseSymptomsForEdit(
  caseId: string
): Promise<string[]> {
  await new Promise((r) => setTimeout(r, 200))
  return CASE_SYMPTOMS[caseId] ?? []
}

export async function getMedicationsForCase(
  caseId: string
): Promise<Medication[]> {
  await new Promise((r) => setTimeout(r, 200))
  return DUMMY_MEDICATIONS.filter((m) => m.case_id === caseId)
}

export async function getDiaryEntriesForCase(
  caseId: string
): Promise<DiaryEntry[]> {
  await new Promise((r) => setTimeout(r, 200))
  return DUMMY_DIARY_ENTRIES.filter((d) => d.case_id === caseId)
}

export async function createDiaryEntry(
  data: DiaryEntryCreate
): Promise<DiaryEntry> {
  await new Promise((r) => setTimeout(r, 800))
  return {
    id: `diary-${Date.now()}`,
    case_id: data.case_id,
    user_id: "user-1",
    health_status: data.health_status,
    symptoms: data.symptoms ?? null,
    note: data.note ?? null,
    entry_date: data.entry_date,
    created_at: new Date().toISOString(),
  }
}
