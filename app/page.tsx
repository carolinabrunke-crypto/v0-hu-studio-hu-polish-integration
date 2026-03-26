"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

const slides = [
  { id: "cover", phase: null, flowStep: null },
  { id: "problem", phase: "01", flowStep: 0 },
  { id: "solution", phase: "02", flowStep: 1 },
  { id: "how", phase: "03", flowStep: 2 },
  { id: "team", phase: "04", flowStep: 3 },
]

const flowSteps = [
  { num: "01", label: "Problema" },
  { num: "02", label: "Solución" },
  { num: "03", label: "Flujo" },
  { num: "04", label: "Equipo" },
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
  const currentFlowStep = slides[currentSlide].flowStep

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground tracking-wide">hustudio</div>
        {currentPhase && (
          <div className="text-9xl font-extralight text-muted-foreground/10 fixed top-4 left-6 md:left-12 select-none pointer-events-none">
            {currentPhase}
          </div>
        )}
      </header>

      {/* Slide Content */}
      <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-32">
        {currentSlide === 0 && <CoverSlide onNext={nextSlide} />}
        {currentSlide === 1 && <ProblemSlide />}
        {currentSlide === 2 && <SolutionSlide />}
        {currentSlide === 3 && <HowItWorksSlide />}
        {currentSlide === 4 && <TeamSlide />}
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 px-6 md:px-12 py-6 flex items-center justify-between border-t border-border bg-background/80 backdrop-blur-sm">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0 disabled:cursor-default"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Flow Progress */}
        <div className="flex items-center gap-1 md:gap-3">
          {flowSteps.map((step, index) => (
            <button
              key={step.num}
              onClick={() => setCurrentSlide(index + 1)}
              className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded transition-all ${
                currentFlowStep === index
                  ? "text-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              <span className={`text-xs font-mono ${currentFlowStep === index ? "text-accent" : ""}`}>
                {step.num}
              </span>
              <span className="text-xs hidden md:inline">{step.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </main>
  )
}

function CoverSlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          by humand
        </span>
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8 text-balance">
        hustudio
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl leading-relaxed text-balance">
        Ecosistema autónomo de producción audiovisual. 
        De un brief a campañas globales con IA.
      </p>
      <button
        onClick={onNext}
        className="mt-12 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <span>Comenzar</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-10">
        <span className="text-xs text-accent font-mono tracking-wider">Fase 01 · El problema</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight mt-3 text-balance leading-tight">
          El proceso manual<br />
          <span className="text-muted-foreground">consume al equipo.</span>
        </h2>
      </div>

      <div className="grid gap-6 md:gap-8">
        <div className="flex gap-4 md:gap-6">
          <span className="text-accent font-mono text-sm mt-1">01</span>
          <div>
            <h3 className="font-medium mb-1">Pre-producción interminable</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crear guiones, storyboards y locuciones para cada campaña requiere semanas de trabajo manual repetitivo.
            </p>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6">
          <span className="text-accent font-mono text-sm mt-1">02</span>
          <div>
            <h3 className="font-medium mb-1">Errores que cuestan caro</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Los errores en motion design se detectan después del render, causando re-trabajos costosos y frustrantes.
            </p>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6">
          <span className="text-accent font-mono text-sm mt-1">03</span>
          <div>
            <h3 className="font-medium mb-1">Escalar es multiplicar esfuerzo</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Adaptar videos a múltiples idiomas y mercados significa repetir todo el proceso una y otra vez.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-10">
        <span className="text-xs text-accent font-mono tracking-wider">Fase 02 · La solución</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight mt-3 text-balance leading-tight">
          Automatización end-to-end<br />
          <span className="text-muted-foreground">para producción audiovisual.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <h3 className="font-medium">Ingesta inteligente</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
              Un PDF o brief se transforma automáticamente en guion técnico, storyboard visual e imágenes alineadas con tu brandbook.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <h3 className="font-medium">Control de calidad con IA</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
              Plugin de After Effects que detecta errores antes y después del render. Sistema de feedback integrado para evitar re-renders.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <h3 className="font-medium">Localización automática</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
              Doblaje de voz y subtitulado en múltiples idiomas. Escala la comunicación de Humand a nivel global.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-extralight text-accent mb-2">10x</div>
            <p className="text-sm text-muted-foreground">más rápido que el proceso manual</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HowItWorksSlide() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-10">
        <span className="text-xs text-accent font-mono tracking-wider">Fase 03 · El flujo</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight mt-3 text-balance leading-tight">
          De brief a campaña global<br />
          <span className="text-muted-foreground">en cuatro pasos.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { num: "01", title: "Brief", desc: "Ingesta de PDF o texto estratégico" },
          { num: "02", title: "Guion", desc: "Generación automática con IA" },
          { num: "03", title: "Producción", desc: "Motion design con QA integrado" },
          { num: "04", title: "Global", desc: "Doblaje y subtítulos multi-idioma" },
        ].map((step) => (
          <div
            key={step.num}
            className="p-4 md:p-5 border border-border rounded-lg hover:border-accent/50 transition-colors"
          >
            <span className="text-accent font-mono text-xs">{step.num}</span>
            <h3 className="font-medium mt-2 mb-1">{step.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 border border-accent/30 rounded-lg bg-accent/5">
        <p className="text-sm text-muted-foreground text-center">
          <span className="text-foreground">Objetivo:</span> Reducir al máximo la tarea manual del equipo multimedia, 
          permitiendo enfocarse en crear motion graphics de alta calidad.
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
    <div className="w-full max-w-4xl">
      <div className="mb-10">
        <span className="text-xs text-accent font-mono tracking-wider">Fase 04 · Equipo</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight mt-3 text-balance">
          El equipo detrás.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {team.map((member) => (
          <div
            key={member}
            className="p-4 border border-border rounded-lg hover:border-accent/50 transition-colors text-center"
          >
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-accent text-xs font-medium">
                {member.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <p className="text-sm">{member}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          hustudio — by humand · 2026
        </p>
      </div>
    </div>
  )
}
