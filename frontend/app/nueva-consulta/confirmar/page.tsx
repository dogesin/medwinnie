"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Check,
  Plus,
  Search,
  X,
  Sparkles,
  Stethoscope,
  Pill,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ── Catálogo de medicamentos ────────────────────────────────
const ALL_MEDS = [
  "Amoxicilina", "Azitromicina", "Ciprofloxacino", "Claritromicina",
  "Ampicilina", "Doxiciclina", "Eritromicina", "Cefalexina",
  "Ibuprofeno", "Paracetamol", "Naproxeno", "Diclofenaco",
  "Ketorolaco", "Metamizol", "Aspirina", "Meloxicam",
  "Omeprazol", "Pantoprazol", "Ranitidina", "Metoclopramida",
  "Sucralfato", "Domperidona", "Bismuto",
  "Loratadina", "Cetirizina", "Fexofenadina", "Desloratadina",
  "Metformina", "Glibenclamida", "Atorvastatina", "Rosuvastatina",
  "Losartán", "Enalapril", "Amlodipino", "Metoprolol",
  "Prednisona", "Dexametasona", "Budesonida", "Fluticasona",
  "Salbutamol", "Montelukast", "Ipratropio", "Beclometasona",
  "Sumatriptán", "Tramadol", "Gabapentina", "Pregabalina",
  "Clonazepam", "Alprazolam", "Sertralina", "Escitalopram",
  "Fluconazol", "Metronidazol", "Nistatina", "Clindamicina",
  "Insulina", "Levotiroxina", "Vitamina D", "Hierro",
]

// ── Diagnósticos comunes para sugerencias ──────────────────
const COMMON_DIAGNOSES = [
  "Faringitis", "Amigdalitis", "Sinusitis", "Otitis",
  "Bronquitis", "Neumonía", "Gripe", "COVID-19",
  "Gastritis", "Reflujo", "Colitis", "Úlcera gástrica",
  "Infección urinaria", "Cistitis", "Pielonefritis",
  "Rinitis alérgica", "Urticaria", "Dermatitis",
  "Diabetes tipo 2", "Hipertensión", "Hipotiroidismo",
  "Migraña", "Lumbalgia", "Cervicalgia", "Artritis",
  "Anemia", "Ansiedad", "Depresión", "Insomnio",
]

// ── Detección simple de medicamentos en texto ──────────────
function detectMeds(text: string): string[] {
  if (!text) return []
  return ALL_MEDS.filter((m) =>
    text.toLowerCase().includes(m.toLowerCase())
  )
}

export default function ConfirmarConsultaPage() {
  const router = useRouter()
  const [diagnosis, setDiagnosis] = useState("")
  const [editingDx, setEditingDx] = useState(false)
  const [dxQuery, setDxQuery] = useState("")
  const [selectedMeds, setSelectedMeds] = useState<Set<string>>(new Set())
  const [medsQuery, setMedsQuery] = useState("")
  const [showMedsSearch, setShowMedsSearch] = useState(false)
  const dxInputRef = useRef<HTMLInputElement>(null)
  const medsInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedDx = sessionStorage.getItem("winnie_diagnosis") || ""
    const savedText = sessionStorage.getItem("winnie_prescription_text") || ""
    setDiagnosis(savedDx)
    setDxQuery(savedDx)
    const detected = detectMeds(savedText)
    setSelectedMeds(new Set(detected))
  }, [])

  useEffect(() => {
    if (editingDx) dxInputRef.current?.focus()
  }, [editingDx])

  useEffect(() => {
    if (showMedsSearch) medsInputRef.current?.focus()
  }, [showMedsSearch])

  function toggleMed(med: string) {
    setSelectedMeds((prev) => {
      const next = new Set(prev)
      if (next.has(med)) next.delete(med)
      else next.add(med)
      return next
    })
  }

  // Sugerencias de diagnóstico filtradas
  const dxSuggestions = dxQuery.trim()
    ? COMMON_DIAGNOSES.filter((d) =>
        d.toLowerCase().includes(dxQuery.toLowerCase())
      ).slice(0, 6)
    : COMMON_DIAGNOSES.slice(0, 8)

  // Medicamentos disponibles (sin los ya seleccionados)
  const availableMeds = medsQuery.trim()
    ? ALL_MEDS.filter(
        (m) =>
          m.toLowerCase().includes(medsQuery.toLowerCase()) &&
          !selectedMeds.has(m)
      )
    : ALL_MEDS.filter((m) => !selectedMeds.has(m)).slice(0, 16)

  const canAnalyze = diagnosis.trim().length > 0 && selectedMeds.size > 0

  function handleAnalyze() {
    sessionStorage.setItem("winnie_diagnosis_clean", diagnosis)
    sessionStorage.setItem(
      "winnie_medications",
      JSON.stringify([...selectedMeds])
    )
    router.push("/analysis-loading")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto w-full max-w-md px-5 pt-5 pb-36 flex flex-col gap-6">
        {/* Back + step */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> Regresar
          </button>
          <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
            Paso 2 de 2
          </span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Confirma tu caso</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Verifica el diagnóstico y selecciona tus medicamentos.
          </p>
        </div>

        {/* ── Diagnóstico ──────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Stethoscope className="size-3.5" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Diagnóstico</h2>
          </div>

          {!editingDx ? (
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5">
              <p className="flex-1 text-sm font-medium text-foreground">
                {diagnosis || <span className="text-muted-foreground italic">Sin diagnóstico</span>}
              </p>
              <button
                onClick={() => setEditingDx(true)}
                className="shrink-0 text-xs text-primary hover:text-primary/80 font-medium"
              >
                Editar
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 rounded-2xl border border-primary/50 bg-background px-4 py-3 focus-within:border-primary transition-colors">
                <input
                  ref={dxInputRef}
                  value={dxQuery}
                  onChange={(e) => setDxQuery(e.target.value)}
                  placeholder="Ej: Faringitis bacteriana…"
                  className="flex-1 text-sm outline-none bg-transparent"
                />
                {dxQuery && (
                  <button onClick={() => setDxQuery("")}>
                    <X className="size-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {dxSuggestions.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDiagnosis(d)
                      setDxQuery(d)
                      setEditingDx(false)
                    }}
                    className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    {d}
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="self-start rounded-xl"
                onClick={() => {
                  if (dxQuery.trim()) setDiagnosis(dxQuery.trim())
                  setEditingDx(false)
                }}
              >
                Confirmar
              </Button>
            </div>
          )}
        </section>

        {/* ── Medicamentos ─────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Pill className="size-3.5" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">Medicamentos</h2>
            </div>
            {selectedMeds.size > 0 && (
              <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                {selectedMeds.size} seleccionado{selectedMeds.size !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground -mt-1">
            Toca para seleccionar todos los que te recetaron
          </p>

          {/* Selected chips */}
          {selectedMeds.size > 0 && (
            <div className="flex flex-wrap gap-2">
              {[...selectedMeds].map((med) => (
                <button
                  key={med}
                  onClick={() => toggleMed(med)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-all active:scale-95"
                >
                  <Check className="size-3.5" />
                  {med}
                  <X className="size-3 opacity-70" />
                </button>
              ))}
            </div>
          )}

          {/* Divider if there are selections */}
          {selectedMeds.size > 0 && availableMeds.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] text-muted-foreground">agregar más</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

          {/* Available chips */}
          {!showMedsSearch && (
            <div className="flex flex-wrap gap-2">
              {availableMeds.map((med) => (
                <button
                  key={med}
                  onClick={() => toggleMed(med)}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all active:scale-95"
                >
                  <Plus className="size-3 text-muted-foreground" />
                  {med}
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          {showMedsSearch ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-primary/50 bg-background px-3 py-2.5 focus-within:border-primary transition-colors">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  ref={medsInputRef}
                  value={medsQuery}
                  onChange={(e) => setMedsQuery(e.target.value)}
                  placeholder="Buscar medicamento…"
                  className="flex-1 text-sm outline-none bg-transparent"
                />
                <button
                  onClick={() => {
                    setShowMedsSearch(false)
                    setMedsQuery("")
                  }}
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableMeds.map((med) => (
                  <button
                    key={med}
                    onClick={() => {
                      toggleMed(med)
                      setMedsQuery("")
                      setShowMedsSearch(false)
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <Plus className="size-3 text-muted-foreground" />
                    {med}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowMedsSearch(true)}
              className={cn(
                "inline-flex items-center gap-1.5 self-start rounded-full border border-dashed px-3 py-1.5 text-sm transition-all",
                "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              <Search className="size-3.5" />
              Buscar medicamento
            </button>
          )}
        </section>
      </div>

      {/* ── Sticky CTA ────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm px-5 py-4">
        <div className="mx-auto max-w-md flex flex-col gap-2">
          {!canAnalyze && (
            <p className="text-center text-xs text-muted-foreground">
              {selectedMeds.size === 0
                ? "Selecciona al menos un medicamento"
                : "Confirma tu diagnóstico para continuar"}
            </p>
          )}
          <Button
            size="lg"
            className="w-full rounded-xl"
            disabled={!canAnalyze}
            onClick={handleAnalyze}
          >
            <Sparkles className="size-4" />
            Analizar mi caso
          </Button>
        </div>
      </div>
    </div>
  )
}
