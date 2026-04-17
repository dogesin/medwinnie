import type {
  MedicalCase,
  MedicalCaseCreate,
  MedicalCaseUpdate,
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
    id: "case-1",
    user_id: "user-1",
    diagnosis: "Faringitis bacteriana",
    diagnosis_raw:
      "Faringitis aguda de probable origen bacteriano. Se indica amoxicilina 500mg c/8h por 7 días e ibuprofeno para dolor.",
    analysis_result: {
      resumen: "Infección bacteriana en la garganta",
      cuidados: ["Reposo", "Tomar líquidos tibios", "Evitar alimentos irritantes"],
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
      resumen: "Inflamación del estómago por acidez",
      cuidados: ["Evitar café", "No comer picante", "Cenar temprano"],
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
      resumen: "Alergia que inflama la nariz por cambio de estación",
      cuidados: [
        "Evitar polvo y polen",
        "Mantener ventanas cerradas por la mañana",
      ],
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
      resumen: "El cuerpo no procesa bien el azúcar, necesitas medicamento y cambio de hábitos",
      cuidados: [
        "Ejercicio 30 min diarios",
        "Reducir azúcares",
        "Medir glucosa en ayunas",
      ],
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
      resumen: "Músculos de la espalda baja contracturados por esfuerzo",
      cuidados: ["Reposo relativo", "Calor local", "Evitar cargar peso"],
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
