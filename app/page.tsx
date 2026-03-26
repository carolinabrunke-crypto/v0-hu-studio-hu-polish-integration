"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Play, CheckCircle2, AlertTriangle, Zap, Globe, Sparkles } from "lucide-react"

const slides = [
  {
    id: "cover",
    phase: null,
  },
  {
    id: "problem",
    phase: "01",
  },
  {
    id: "solution",
    phase: "02",
  },
  {
    id: "how",
    phase: "03",
  },
  {
    id: "team",
    phase: "04",
  },
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

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
        <div className="font-mono text-sm text-muted-foreground tracking-wider">hustudio</div>
        {slides[currentSlide].phase && (
          <div className="font-mono text-sm text-muted-foreground">
            Fase {slides[currentSlide].phase}
          </div>
        )}
      </header>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center px-8 py-24">
        {currentSlide === 0 && <CoverSlide />}
        {currentSlide === 1 && <ProblemSlide />}
        {currentSlide === 2 && <SolutionSlide />}
        {currentSlide === 3 && <HowItWorksSlide />}
        {currentSlide === 4 && <TeamSlide />}
      </div>

      {/* Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 px-8 py-6 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-mono text-sm">Anterior</span>
        </button>

        {/* Progress indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-accent w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="font-mono text-sm">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </main>
  )
}

function CoverSlide() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-8">
          by humand
        </span>
      </div>
      <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance">
        hustudio
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto text-balance">
        Automatización end-to-end para producción audiovisual con IA
      </p>
      <div className="mt-16 flex items-center justify-center gap-2 text-muted-foreground">
        <Play className="w-4 h-4" />
        <span className="font-mono text-sm">Presiona para comenzar</span>
      </div>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-12">
        <span className="text-accent font-mono text-sm">01</span>
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-2 text-balance">
          El problema
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
            <AlertTriangle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Proceso manual intensivo</h3>
              <p className="text-sm text-muted-foreground">
                Crear campañas audiovisuales globales requiere semanas de trabajo repetitivo
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
            <AlertTriangle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Errores costosos</h3>
              <p className="text-sm text-muted-foreground">
                Los errores en motion design se detectan tarde, causando re-renders innecesarios
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
            <AlertTriangle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Escalabilidad limitada</h3>
              <p className="text-sm text-muted-foreground">
                Adaptar contenido a múltiples idiomas y mercados multiplica el esfuerzo
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-7xl md:text-9xl font-light text-accent mb-4">80%</div>
            <p className="text-muted-foreground text-lg">
              del tiempo se va en tareas repetitivas
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-12">
        <span className="text-accent font-mono text-sm">02</span>
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-2 text-balance">
          La solución
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Pre-producción automatizada</h3>
              <p className="text-muted-foreground">
                De un brief o PDF a guion, storyboard, imágenes y locución alineados con tu marca
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Control de calidad con IA</h3>
              <p className="text-muted-foreground">
                Plugin de After Effects que detecta errores antes y después del render
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Localización global</h3>
              <p className="text-muted-foreground">
                Doblaje y subtitulado automático en múltiples idiomas
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-3xl" />
          <div className="relative bg-card border border-border rounded-2xl p-8">
            <div className="text-center">
              <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
              <div className="text-5xl font-light mb-2">10x</div>
              <p className="text-muted-foreground">más rápido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HowItWorksSlide() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-12">
        <span className="text-accent font-mono text-sm">03</span>
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-2 text-balance">
          Flujo de trabajo
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { num: "01", title: "Brief", desc: "Ingesta de documento estratégico" },
          { num: "02", title: "Guion", desc: "Generación automática con IA" },
          { num: "03", title: "Producción", desc: "Motion design con QA integrado" },
          { num: "04", title: "Global", desc: "Doblaje y subtítulos multi-idioma" },
        ].map((step, index) => (
          <div
            key={step.num}
            className="relative p-6 bg-card border border-border rounded-xl group hover:border-accent/50 transition-colors"
          >
            <span className="text-accent font-mono text-xs">{step.num}</span>
            <h3 className="font-medium text-lg mt-2 mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
            {index < 3 && (
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-card border border-accent/30 rounded-xl">
        <p className="text-center text-muted-foreground">
          <span className="text-foreground font-medium">Objetivo:</span> Reducir al máximo la tarea manual del equipo de multimedia, 
          permitiendo que los diseñadores se enfoquen en lo que mejor hacen: crear motion graphics de alta calidad.
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
    <div className="max-w-4xl mx-auto w-full text-center">
      <div className="mb-12">
        <span className="text-accent font-mono text-sm">04</span>
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-2">
          Equipo
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {team.map((member) => (
          <div
            key={member}
            className="p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-accent font-medium">
                {member.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <p className="text-sm font-medium">{member}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-8">
        <p className="text-muted-foreground font-mono text-sm">
          hustudio — by humand
        </p>
      </div>
    </div>
  )
}
