"use client"

import { useState } from "react"
import { Sparkles, Globe, ChevronRight, ChevronLeft } from "lucide-react"

const slides = [
  { id: "cover", phase: null, title: null },
  { id: "problem", phase: "01", title: "PROBLEMA" },
  { id: "solution", phase: "02", title: "SOLUCIÓN" },
  { id: "flow", phase: "03", title: "FLUJO" },
  { id: "team", phase: "04", title: "EQUIPO" },
]

const navSteps = [
  { num: "01", label: "PROBLEMA" },
  { num: "02", label: "SOLUCIÓN" },
  { num: "03", label: "FLUJO" },
  { num: "04", label: "EQUIPO" },
]

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const currentPhase = slides[currentSlide].phase

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/3 w-64 h-64 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-muted-foreground/20">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute right-0 bottom-1/4 w-48 h-48 pointer-events-none opacity-30">
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary/30">
          <path d="M100,20 Q180,100 100,180 Q20,100 100,20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-background/80 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
              <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
              <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
              <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
            </div>
          </div>
          <span className="text-lg font-medium tracking-tight">
            hu<span className="text-primary">studio</span>
          </span>
        </div>

        {/* Navigation Steps */}
        {currentSlide > 0 && (
          <nav className="hidden md:flex items-center gap-0">
            {navSteps.map((step, index) => {
              const isActive = currentPhase === step.num
              const isPast = currentPhase && parseInt(currentPhase) > parseInt(step.num)
              const isLast = index === navSteps.length - 1

              return (
                <div key={step.num} className="flex items-center">
                  <button
                    onClick={() => setCurrentSlide(index + 1)}
                    className={`flex flex-col items-center gap-1 px-3 transition-all ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isPast
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.num}
                    </div>
                    <span className="text-[10px] tracking-wider text-muted-foreground">{step.label}</span>
                  </button>
                  {!isLast && (
                    <div className={`w-8 h-px ${isPast || isActive ? "bg-primary/40" : "bg-border"}`} />
                  )}
                </div>
              )
            })}
          </nav>
        )}

        {/* Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Activo</span>
          </div>
          <span className="text-sm text-muted-foreground">by HUMAND</span>
        </div>
      </header>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 pt-24 pb-20">
        {currentSlide === 0 && <CoverSlide onNext={nextSlide} />}
        {currentSlide === 1 && <ProblemSlide />}
        {currentSlide === 2 && <SolutionSlide />}
        {currentSlide === 3 && <FlowSlide />}
        {currentSlide === 4 && <TeamSlide />}
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 px-6 md:px-12 py-4 flex items-center justify-between bg-background/80 backdrop-blur-sm">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden md:inline">Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        >
          <span className="hidden md:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </main>
  )
}

function PhaseBadge({ phase, title }: { phase: string; title: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
      <Sparkles className="w-4 h-4" />
      <span>FASE {phase} - {title}</span>
    </div>
  )
}

function CoverSlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-balance">
        De brief a{" "}
        <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
          campaña global
        </span>
        <br />
        en minutos.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 text-balance">
        Ecosistema autónomo de producción audiovisual con IA. Automatiza pre-producción, control de calidad y localización.
      </p>
      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <span>Ver presentación</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="01" title="EL PROBLEMA" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-balance">
        El proceso manual{" "}
        <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
          consume al equipo.
        </span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
        Los equipos multimedia pierden semanas en tareas repetitivas que la IA puede automatizar.
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm mb-4">01</div>
          <h3 className="font-medium mb-2">Pre-producción lenta</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Guiones, storyboards y locuciones requieren semanas de trabajo manual.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm mb-4">02</div>
          <h3 className="font-medium mb-2">Errores costosos</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Errores en motion design detectados post-render causan re-trabajos.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm mb-4">03</div>
          <h3 className="font-medium mb-2">Escalar es multiplicar</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Adaptar a múltiples idiomas significa repetir todo el proceso.
          </p>
        </div>
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="02" title="LA SOLUCIÓN" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-balance">
        Automatización{" "}
        <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
          end-to-end.
        </span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
        hustudio combina generación de contenido con IA y control de calidad para motion design.
      </p>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium">Generación con IA</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            De un PDF a guion, storyboard, imágenes y locución alineados con tu brandbook. Automáticamente.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="font-medium">Control de calidad</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Plugin de After Effects que detecta errores antes del render. Sistema de feedback integrado.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium">Localización automática</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Doblaje de voz y subtitulado en múltiples idiomas. Escala la comunicación de Humand a nivel global.
          </p>
        </div>
      </div>
    </div>
  )
}

function FlowSlide() {
  const steps = [
    { num: "01", title: "Brief", desc: "PDF o texto estratégico" },
    { num: "02", title: "Guion", desc: "Generación automática" },
    { num: "03", title: "Storyboard", desc: "Imágenes + brandbook" },
    { num: "04", title: "Global", desc: "Doblaje + subtítulos" },
  ]

  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="03" title="EL FLUJO" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-balance">
        De brief a{" "}
        <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
          campaña global.
        </span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
        Cuatro pasos automatizados para reducir al máximo la tarea manual del equipo multimedia.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium mb-3">
                {step.num}
              </div>
              <h3 className="font-medium mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block w-12 h-px bg-border mx-2 mt-[-30px]" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 inline-block">
        <p className="text-sm text-foreground">
          <span className="font-medium">Objetivo:</span> El diseñador se enfoca solo en crear motion graphics de alta calidad.
        </p>
      </div>
    </div>
  )
}

function TeamSlide() {
  const team = [
    "Ariel Atar",
    "Iván Sevilla",
    "Manuel Vazquez",
    "Ivan Samaniego",
    "Milagros Suarez",
    "Mora Lopez Moret",
    "Santiago Slavtusky",
    "Carolina Brunke",
  ]

  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="04" title="EL EQUIPO" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-12 text-balance">
        El equipo{" "}
        <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
          detrás.
        </span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.map((member) => (
          <div
            key={member}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-primary text-sm font-medium">
                {member.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <p className="text-sm font-medium">{member}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          hustudio — by humand
        </p>
      </div>
    </div>
  )
}
