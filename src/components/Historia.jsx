import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TIMELINE_EVENTS = [
  {
    year: '1996',
    title: 'El Origen de la Pasión',
    desc: 'Nace en la histórica ciudad blanca de Sucre la Fraternidad Folclórica Caporales Universitarios San Simón Sucre, fundada por jóvenes devotos impulsados por la fe y el arte.',
    tag: 'Fundación'
  },
  {
    year: '2005',
    title: 'Consagración Nacional',
    desc: 'Primeros grandes galardones en el Carnaval de Oruro y la consolidación de tropas legendarias con un estilo inconfundible de zapateo y gallardía.',
    tag: 'Oruro'
  },
  {
    year: '2016',
    title: 'Expansión Internacional',
    desc: 'Apertura de filiales oficiales en Sudamérica y Europa, llevando la tricolor boliviana y el orgullo de Sucre a los escenarios más prestigiosos.',
    tag: 'Global'
  },
  {
    year: '2026',
    title: '30 Años de Grandeza',
    desc: 'Tres décadas forjando hermandad, devoción a la Virgen del Socavón y marcando el estándar dorado del caporal en todo el mundo.',
    tag: 'Aniversario'
  },
  {
    year: '2027',
    title: 'El Gran Desafío Oruro 2027',
    desc: 'La convocatoria más grande de la historia de la fraternidad con nuevas tropas, trajes de alta costura folclórica y un espectáculo sin precedentes.',
    tag: 'Futuro'
  }
];

export default function Historia() {
  const [activeYearIndex, setActiveYearIndex] = useState(3); // 2026 por defecto

  return (
    <section id="historia" className="py-24 px-4 md:px-8 bg-[#070d20] relative overflow-hidden border-t border-white/[0.08]">
      
      {/* Decorative ambient subtle lights */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-simonRed/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-simonBlue/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header - Apple Keynote Title Cadence */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center text-simonGold text-[11px] uppercase tracking-widest font-semibold mb-2">
            <span>Legado Histórico Institucional</span>
          </div>
          <h2 className="font-editorial-title text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-4">
            30 años de<br />
            <span className="text-champagne">magia y pasión.</span>
          </h2>
          <p className="text-white/75 text-[17px] sm:text-[18px] leading-[1.47] font-normal tracking-[-0.015em]">
            Nuestra trayectoria no se cuenta con palabras: se siente en cada pisada, en cada lágrima al llegar a la Virgen del Socavón y en tres décadas de consagración ininterrumpida.
          </p>
        </div>

        {/* Year Selector Rail - Apple Pill/Card Grammar */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 gap-3 no-scrollbar">
          {TIMELINE_EVENTS.map((ev, idx) => (
            <button
              key={ev.year}
              onClick={() => setActiveYearIndex(idx)}
              className={`flex-1 min-w-[130px] p-4.5 rounded-[20px] border transition-all duration-200 cursor-pointer text-left relative active:scale-[0.98] ${
                activeYearIndex === idx
                  ? 'bg-white/[0.08] border-simonGold/50 shadow-[0_10px_30px_rgba(212,168,83,0.18)]'
                  : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20'
              }`}
            >
              <div className="text-[10px] uppercase font-semibold tracking-wider text-simonGold">
                {ev.tag}
              </div>
              <div className="font-bebas text-3xl text-white mt-1">
                {ev.year}
              </div>
              {activeYearIndex === idx && (
                <motion.div
                  layoutId="activeTimelineGlow"
                  className="absolute bottom-0 inset-x-5 h-[2px] bg-simonGold rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Featured Event Showcase - Apple Museum Feature Card */}
        <div className="mt-8 p-8 md:p-12 rounded-[28px] bg-[#0D1527]/75 backdrop-blur-2xl border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-[0_20px_50px_rgba(8,16,38,0.7)]">
          <div className="md:col-span-8">
            <span className="text-[11px] uppercase font-semibold tracking-widest text-simonRed px-3.5 py-1 rounded-full bg-simonRed/10 border border-simonRed/25">
              Hito Histórico #{activeYearIndex + 1}
            </span>
            <h3 className="font-bebas text-4xl sm:text-5xl text-white mt-4 tracking-wide">
              {TIMELINE_EVENTS[activeYearIndex].year} · {TIMELINE_EVENTS[activeYearIndex].title}
            </h3>
            <p className="text-white/80 text-[17px] md:text-[18px] mt-3 leading-[1.47] font-normal tracking-[-0.015em]">
              {TIMELINE_EVENTS[activeYearIndex].desc}
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              <span className="text-simonGold font-bold">
                Tradición San Simón
              </span>
              <span>·</span>
              <span>Fe y Devoción</span>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center items-center">
            <div className="relative w-full max-w-[280px] flex justify-center items-center">
              <img
                src="/30.png"
                alt="30 Años San Simón Sucre"
                className="w-full h-auto max-h-[260px] object-contain apple-product-shadow transition-transform duration-500 animate-float"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
