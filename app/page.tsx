"use client"

import { useState, useEffect } from "react"
import { Sparkles, Globe, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"

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

const LOGO_SQUARES = [
  { x: 2, y: 2, delay: "0s" },
  { x: 9, y: 2, delay: "0.55s" },
  { x: 9, y: 9, delay: "1.1s" },
  { x: 2, y: 9, delay: "1.65s" },
]

function LogoIcon() {
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #182D7A 0%, #2D4FA3 100%)",
        animation: "logoBreathe 3.5s ease-in-out infinite",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {LOGO_SQUARES.map((sq, i) => (
          <rect
            key={i}
            x={sq.x}
            y={sq.y}
            width="5"
            height="5"
            rx="1.5"
            fill="white"
            style={{
              animation: "logoChase 2.2s ease-in-out infinite",
              animationDelay: sq.delay,
            }}
          />
        ))}
      </svg>
      {/* Shimmer effect overlay */}
      <div
        className="absolute inset-0 w-[200%] h-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          animation: "shimmerSweep 4s ease-in-out infinite 1s",
        }}
      />
    </div>
  )
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setCurrentSlide(currentSlide + 1)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setIsAnimating(true)
      setCurrentSlide(currentSlide - 1)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  const currentPhase = slides[currentSlide].phase

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, isAnimating])

  return (
    <main className="min-h-screen text-foreground flex flex-col font-sans relative overflow-hidden"
      style={{ background: "#F7F7F7" }}>
      {/* Background decorative circles - rotating smoothly */}
      <div className={`absolute left-0 top-1/3 w-64 h-64 pointer-events-none opacity-20 transition-all duration-300 ${videoLightboxOpen ? 'blur-sm opacity-10' : ''}`}>
        <div style={{ animation: "spinSlow 90s linear infinite" }}>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#496BE3" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#496BE3" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex items-center justify-between backdrop-blur-sm transition-all duration-300 ${videoLightboxOpen ? 'blur-sm opacity-50' : ''}`}
        style={{
          background: "rgba(247, 247, 247, 0.85)",
          animation: "fadeIn 0.6s ease",
          borderBottom: "1px solid rgba(214, 225, 255, 0.4)",
          minHeight: "80px"
        }}>
        {/* Logo */}
        <div className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
          <LogoIcon />
          <div className="flex items-baseline" style={{ letterSpacing: "-0.03em" }}>
            <span className="text-[21px] font-light" style={{ color: "#182D7A" }}>
              hu
            </span>
            <span className="text-[21px] font-extrabold" style={{ color: "#182D7A" }}>
              studio
            </span>
          </div>
        </div>

        {/* Navigation Steps */}
        {currentSlide > 0 && (
          <nav className="hidden md:flex items-center gap-0" style={{ animation: "fadeIn 0.4s ease" }}>
            {navSteps.map((step, index) => {
              const isActive = currentPhase === step.num
              const isPast = currentPhase && parseInt(currentPhase) > parseInt(step.num)
              const isLast = index === navSteps.length - 1

              return (
                <div key={step.num} className="flex items-center">
                  <button
                    onClick={() => setCurrentSlide(index + 1)}
                    className={`flex flex-col items-center gap-1 px-3 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${isActive
                        ? "text-white shadow-lg"
                        : isPast
                          ? "text-white"
                          : "text-gray-500"
                        }`}
                      style={{
                        backgroundColor: isActive || isPast ? "#182D7A" : "#E8E8E8"
                      }}
                    >
                      {step.num}
                    </div>
                    <span className="text-[10px] tracking-wider" style={{ color: "#3A3A45" }}>
                      {step.label}
                    </span>
                  </button>
                  {!isLast && (
                    <div
                      className={`w-8 h-px transition-all duration-500`}
                      style={{
                        backgroundColor: isPast || isActive ? "#496BE3" : "#D6E1FF"
                      }}
                    />
                  )}
                </div>
              )
            })}
          </nav>
        )}

        {/* Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div
                className="absolute inset-0 w-2 h-2 rounded-full bg-green-500"
                style={{ animation: "pulseRing 2s ease-out infinite" }}
              />
            </div>
            <span className="text-sm" style={{ color: "#3A3A45" }}>Activo</span>
          </div>
          <span className="text-sm font-medium" style={{ color: "#182D7A" }}>by HUMAND</span>
        </div>
      </header>

      {/* Slide Content */}
      <div className={`flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 pt-24 pb-20 duration-300 ${videoLightboxOpen ? 'brightness-50' : ''}`}>
        <div key={currentSlide} style={{ animation: "fadeInBlur 0.55s ease forwards" }}>
          {currentSlide === 0 && <CoverSlide onNext={nextSlide} />}
          {currentSlide === 1 && <ProblemSlide />}
          {currentSlide === 2 && <SolutionSlide />}
          {currentSlide === 3 && <FlowSlide onVideoOpen={setVideoLightboxOpen} />}
          {currentSlide === 4 && <TeamSlide />}
        </div>
      </div>

      {/* Navigation Arrows - Centered vertically */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:scale-110 hover:bg-opacity-100 ${videoLightboxOpen ? 'blur-sm opacity-30' : ''}`}
        style={{
          backgroundColor: "rgba(214, 225, 255, 0.5)",
          color: "#182D7A"
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-110 hover:bg-opacity-100 ${videoLightboxOpen ? 'blur-sm opacity-30' : ''}`}
        style={{
          backgroundColor: "rgba(214, 225, 255, 0.5)",
          color: "#182D7A"
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Footer Navigation Dots */}
      <footer className={`fixed bottom-0 left-0 right-0 px-6 md:px-12 py-4 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${videoLightboxOpen ? 'blur-sm opacity-50' : ''}`}
        style={{
          background: "rgba(247, 247, 247, 0.85)",
          borderTop: "1px solid rgba(214, 225, 255, 0.4)"
        }}>
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 hover:scale-110 ${currentSlide === index ? "w-6" : "w-2"
                }`}
              style={{
                backgroundColor: currentSlide === index ? "#182D7A" : "#D6E1FF",
                animation: currentSlide === index ? "scaleIn 0.3s ease" : "none"
              }}
            />
          ))}
        </div>
      </footer>
    </main>
  )
}

function PhaseBadge({ phase, title }: { phase: string; title: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 relative overflow-hidden"
      style={{
        backgroundColor: "#D6E1FF",
        color: "#182D7A",
        animation: "popIn 0.5s ease"
      }}>
      <Sparkles className="w-4 h-4" style={{ animation: "sparkleScale 2s ease-in-out infinite" }} />
      <span>FASE {phase} — {title}</span>
      <div
        className="absolute inset-0 w-[200%] h-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          animation: "shimmerSweep 3s ease-in-out infinite 0.5s",
        }}
      />
    </div>
  )
}

function CoverSlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-balance"
        style={{
          color: "#182D7A",
          animation: "fadeInUp 0.8s ease"
        }}>
        De brief a{" "}
        <span
          className="bg-gradient-to-r from-[#182D7A] via-[#496BE3] to-[#182D7A] bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% auto",
            animation: "gradientFlow 5s ease infinite"
          }}
        >
          campaña global
        </span>
        <br />
        en minutos.
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 text-balance"
        style={{
          color: "#3A3A45",
          animation: "fadeInUp 0.8s ease 0.2s backwards"
        }}>
        Ecosistema autónomo de producción audiovisual con IA. Automatiza pre-producción, control de calidad y localización.
      </p>
      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:gap-3 relative overflow-hidden group"
        style={{
          backgroundColor: "#182D7A",
          color: "#FFFFFF",
          animation: "popIn 0.8s ease 0.4s backwards"
        }}
      >
        <span className="relative z-10">Ver presentación</span>
        <ChevronRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
        <div
          className="absolute inset-0 w-[200%] h-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            animation: "shimmerSweep 1.5s ease-in-out infinite",
          }}
        />
      </button>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="01" title="EL PROBLEMA" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-balance"
        style={{
          color: "#182D7A",
          animation: "fadeInUp 0.5s ease"
        }}>
        El proceso manual{" "}
        <span
          className="bg-gradient-to-r from-[#182D7A] via-[#496BE3] to-[#182D7A] bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% auto",
            animation: "gradientFlow 5s ease infinite"
          }}
        >
          consume al equipo.
        </span>
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-12"
        style={{
          color: "#3A3A45",
          animation: "fadeInUp 0.5s ease 0.1s backwards"
        }}>
        Los equipos multimedia pierden semanas en tareas repetitivas que la IA puede automatizar.
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        {[
          { num: "01", title: "Pre-producción lenta", desc: "Guiones, storyboards y locuciones requieren semanas de trabajo manual.", delay: "0.1s" },
          { num: "02", title: "Errores costosos", desc: "Errores en motion design detectados post-render causan re-trabajos.", delay: "0.2s" },
          { num: "03", title: "Escalar es multiplicar", desc: "Adaptar a múltiples idiomas significa repetir todo el proceso.", delay: "0.3s" }
        ].map((item, index) => (
          <div key={index}
            className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#D6E1FF",
              animation: `fadeInUp 0.6s ease ${item.delay} backwards`
            }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-4 relative"
              style={{
                backgroundColor: "#D6E1FF",
                color: "#182D7A"
              }}>
              {item.num}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ animation: "ringExpand 1.5s ease-out infinite" }}
              />
            </div>
            <h3 className="font-medium mb-2" style={{ color: "#182D7A" }}>{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#3A3A45" }}>
              {item.desc}
            </p>
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#496BE3] to-[#182D7A] opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ animation: "revealWidth 0.3s ease" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="02" title="LA SOLUCIÓN" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-balance"
        style={{
          color: "#182D7A",
          animation: "fadeInUp 0.5s ease"
        }}>
        Automatización{" "}
        <span
          className="bg-gradient-to-r from-[#182D7A] via-[#496BE3] to-[#182D7A] bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% auto",
            animation: "gradientFlow 5s ease infinite"
          }}
        >
          end-to-end.
        </span>
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-12"
        style={{
          color: "#3A3A45",
          animation: "fadeInUp 0.5s ease 0.1s backwards"
        }}>
        hustudio combina generación de contenido con IA y control de calidad para motion design.
      </p>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#D6E1FF",
            animation: "fadeInUp 0.6s ease 0.1s backwards"
          }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{
                backgroundColor: "#D6E1FF"
              }}>
              <Sparkles className="w-5 h-5" style={{ color: "#182D7A" }} />
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ animation: "ringExpand 1.5s ease-out infinite" }}
              />
            </div>
            <h3 className="font-medium" style={{ color: "#182D7A" }}>Generación con IA</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#3A3A45" }}>
            De un PDF a guion, storyboard, imágenes y locución alineados con tu brandbook. Automáticamente.
          </p>
          <div
            className="absolute inset-0 w-[200%] h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(73,107,227,0.05) 50%, transparent 100%)",
              animation: "shimmerSweep 2s ease-in-out infinite",
            }}
          />
        </div>
        <div className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#D6E1FF",
            animation: "fadeInUp 0.6s ease 0.2s backwards"
          }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{
                backgroundColor: "#D6E1FF"
              }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#182D7A" strokeWidth="2">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ animation: "ringExpand 1.5s ease-out infinite" }}
              />
            </div>
            <h3 className="font-medium" style={{ color: "#182D7A" }}>Control de calidad</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#3A3A45" }}>
            Plugin de After Effects que detecta errores antes del render. Sistema de feedback integrado.
          </p>
          <div
            className="absolute inset-0 w-[200%] h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(73,107,227,0.05) 50%, transparent 100%)",
              animation: "shimmerSweep 2s ease-in-out infinite 0.3s",
            }}
          />
        </div>
        <div className="p-6 rounded-2xl border md:col-span-2 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#D6E1FF",
            animation: "fadeInUp 0.6s ease 0.3s backwards"
          }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{
                backgroundColor: "#D6E1FF"
              }}>
              <Globe className="w-5 h-5" style={{ color: "#182D7A" }} />
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ animation: "ringExpand 1.5s ease-out infinite" }}
              />
            </div>
            <h3 className="font-medium" style={{ color: "#182D7A" }}>Localización automática</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#3A3A45" }}>
            Doblaje de voz y subtitulado en múltiples idiomas. Escala la comunicación de Humand a nivel global.
          </p>
          <div
            className="absolute inset-0 w-[200%] h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(73,107,227,0.05) 50%, transparent 100%)",
              animation: "shimmerSweep 2s ease-in-out infinite 0.6s",
            }}
          />
        </div>
      </div>
    </div>
  )
}

function FlowSlide({ onVideoOpen }: { onVideoOpen: (open: boolean) => void }) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const steps = [
    { num: "01", title: "Brief", desc: "PDF o texto estratégico", video: "/videos/Brief.mp4" },
    { num: "02", title: "Guion", desc: "Generación automática", video: "/videos/Guión.mp4" },
    { num: "03", title: "Storyboard", desc: "Imágenes + brandbook", video: "/videos/Storyboard.mp4" },
    { num: "04", title: "QA", desc: "Errores + feedback centralizado", videos: ["/videos/QA.mp4", "/videos/QA-2.mp4"] },
    { num: "05", title: "Global", desc: "Doblaje + subtítulos", video: "/videos/Global.mp4" },
  ]

  const handleStepClick = (stepNum: string) => {
    setSelectedStep(stepNum)
    onVideoOpen(true)
  }

  const handleCloseLightbox = () => {
    setSelectedStep(null)
    onVideoOpen(false)
  }

  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="03" title="EL FLUJO" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-balance"
        style={{
          color: "#182D7A",
          animation: "fadeInUp 0.5s ease"
        }}>
        De brief a{" "}
        <span
          className="bg-gradient-to-r from-[#182D7A] via-[#496BE3] to-[#182D7A] bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% auto",
            animation: "gradientFlow 5s ease infinite"
          }}
        >
          campaña global.
        </span>
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-12"
        style={{
          color: "#3A3A45",
          animation: "fadeInUp 0.5s ease 0.1s backwards"
        }}>
        Cinco pasos automatizados para reducir al máximo la tarea manual del equipo multimedia.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center group"
              style={{ animation: `popIn 0.6s ease ${index * 0.1}s backwards` }}>
              <button
                onClick={() => handleStepClick(step.num)}
                className="w-16 h-16 rounded-full text-white flex items-center justify-center text-lg font-medium mb-3 transition-all duration-300 hover:scale-110 hover:rotate-3 relative cursor-pointer"
                style={{
                  backgroundColor: "#182D7A",
                  boxShadow: "0 4px 14px rgba(24,45,122,0.3)"
                }}>
                {step.num}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ animation: "ringExpand 1.5s ease-out infinite" }}
                />
              </button>
              <h3 className="font-medium mb-1 transition-colors hover:text-[#496BE3]" style={{ color: "#182D7A" }}>{step.title}</h3>
              <p className="text-xs" style={{ color: "#3A3A45" }}>{step.desc}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className="hidden md:block w-12 h-px mx-2 mt-[-30px] relative overflow-hidden"
                style={{
                  backgroundColor: "#D6E1FF",
                  animation: `fadeIn 0.5s ease ${index * 0.1 + 0.3}s backwards`
                }}>
                <div
                  className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-[#496BE3] to-transparent"
                  style={{ animation: "shimmer 2s ease-in-out infinite" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl inline-block border relative overflow-hidden group"
        style={{
          backgroundColor: "#EEF2FF",
          borderColor: "#496BE3",
          animation: "scaleIn 0.6s ease 0.6s backwards"
        }}>
        <p className="text-sm relative z-10" style={{ color: "#182D7A" }}>
          <span className="font-medium">Objetivo:</span> El diseñador se enfoca solo en crear motion graphics de alta calidad.
        </p>
        <div
          className="absolute inset-0 w-[200%] h-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(73,107,227,0.1) 50%, transparent 100%)",
            animation: "shimmerSweep 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Video Lightbox */}
      {selectedStep && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-opacity-98"
          style={{
            animation: "fadeIn 0.3s ease",
            backdropFilter: "blur(10px)"
          }}
          onClick={handleCloseLightbox}
        >
          <div
            className="relative w-full h-full flex items-center justify-center p-16"
            style={{ animation: "scaleIn 0.4s ease" }}
          >
            {/* Close button - Top right corner, outside video */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90 hover:scale-110 z-20"
              style={{
                backgroundColor: "#182D7A",
                color: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(24,45,122,0.6)"
              }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video container - Maximum size */}
            <div
              className="relative w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Videos - Maximum fullscreen */}
              <div className={`relative rounded-2xl overflow-hidden w-full h-full ${selectedStep === "04" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex items-center justify-center"}`}
                style={{
                  boxShadow: "0 0 100px rgba(73,107,227,0.9), 0 0 200px rgba(73,107,227,0.6), 0 0 300px rgba(24,45,122,0.4)",
                  border: "4px solid rgba(73,107,227,0.6)"
                }}>
                {selectedStep === "04" ? (
                  // QA tiene dos videos
                  <>
                    <video
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      style={{ backgroundColor: "#000000" }}
                    >
                      <source src="/videos/QA.mp4" type="video/mp4" />
                    </video>
                    <video
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      style={{ backgroundColor: "#000000" }}
                    >
                      <source src="/videos/QA-2.mp4" type="video/mp4" />
                    </video>
                  </>
                ) : (
                  // Otros steps tienen un solo video
                  <video
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    style={{ backgroundColor: "#000000" }}
                  >
                    <source src={steps.find(s => s.num === selectedStep)?.video} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TeamSlide() {
  const team = [
    { name: "Ariel Atar", photo: "/team/ariel.jpeg" },
    { name: "Iván Sevilla", photo: "/team/ivan-sevilla.jpg" },
    { name: "Manuel Vazquez", photo: "/team/manuel.jpeg" },
    { name: "Ivan Samaniego", photo: "/team/ivan-samaniego.png" },
    { name: "Milagros Suarez", photo: "/team/milagros.jpg" },
    { name: "Mora Lopez Moret", photo: "/team/mora.png" },
    { name: "Santiago Slavtusky", photo: "/team/santiago.png" },
    { name: "Carolina Brunke", photo: "/team/carolina.jpeg" },
  ]

  return (
    <div className="w-full max-w-4xl text-center">
      <PhaseBadge phase="04" title="EL EQUIPO" />
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-12 text-balance"
        style={{
          color: "#182D7A",
          animation: "fadeInUp 0.5s ease"
        }}>
        El equipo{" "}
        <span
          className="bg-gradient-to-r from-[#182D7A] via-[#496BE3] to-[#182D7A] bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% auto",
            animation: "gradientFlow 5s ease infinite"
          }}
        >
          detrás.
        </span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.map((member, index) => (
          <div
            key={member.name}
            className="p-4 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#D6E1FF",
              animation: `popIn 0.5s ease ${index * 0.05}s backwards`
            }}
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-3 transition-all duration-300 group-hover:scale-110 relative overflow-hidden"
              style={{
                border: "2px solid #D6E1FF"
              }}>
              <Image
                src={member.photo}
                alt={member.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ animation: "ringExpand 1.5s ease-out infinite" }}
              />
            </div>
            <p className="text-sm font-medium" style={{ color: "#182D7A" }}>{member.name}</p>
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#496BE3] to-[#182D7A] opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ animation: "revealWidth 0.3s ease" }}
            />
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t" style={{ borderColor: "#D6E1FF" }}>
        <p className="text-sm font-medium"
          style={{
            color: "#182D7A",
            animation: "fadeIn 0.8s ease 1s backwards"
          }}>
          hustudio — by MultiDevs
        </p>
      </div>
    </div>
  )
}
