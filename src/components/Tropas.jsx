import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';

const TROPAS_DATA = [
  {
    id: 'tropa-machos',
    name: 'Tropa Machos',
    category: 'Tropa Central',
    icon: '🛡️',
    motto: 'El retumbar del cascabel y la devoción eterna',
    desc: 'El corazón imponente de la fraternidad. Destaca por la fuerza en el salto, la gallardía del paso al unísono y el compás marcial de los cascabeles de bronce.',
    color: 'from-amber-500/20 to-simonRed/20',
    borderColor: 'border-amber-500/30',
  },
  {
    id: 'tropa-cholitas',
    name: 'Tropa Cholitas',
    category: 'Tropa Central',
    icon: '🌹',
    motto: 'Cadencia, dulzura y altivez de la mujer boliviana',
    desc: 'Elegancia pura en la entrada. Con polleras al viento, botas estilizadas y una sonrisa que contagia fervor en cada kilómetro del recorrido.',
    color: 'from-rose-500/20 to-simonRed/20',
    borderColor: 'border-rose-500/30',
  },
  {
    id: 'chinas',
    name: 'Figura Chinas',
    category: 'Figuras Exclusivas',
    icon: '👑',
    motto: 'Elegancia, ritmo y garbo en cada giro',
    desc: 'La máxima expresión del ritmo y la gracia femenina. Sus trajes deslumbran con pedrería fina y un donaire inigualable al compás de la banda.',
    color: 'from-yellow-500/20 to-simonGold/20',
    borderColor: 'border-simonGold/30',
  },
  {
    id: 'machas',
    name: 'Figura Machas',
    category: 'Figuras Exclusivas',
    icon: '⚔️',
    motto: 'Liderazgo, destreza y gallardía sin límites',
    desc: 'Mujeres con porte imponente que dominan el paso del caporal con botas altas, sombrero y la energía que guía a las tropas en la pista.',
    color: 'from-red-500/20 to-simonRed/30',
    borderColor: 'border-simonRed/40',
  },
  {
    id: 'kachas',
    name: 'Kachas & Acróbatas',
    category: 'Bloque Especial',
    icon: '⚡',
    motto: 'Agilidad acrobática, saltos y carisma total',
    desc: 'Los reyes del aire. Protagonistas de los saltos mortales, acrobacias sincronizadas y la euforia que levanta las graderías del Carnaval de Oruro.',
    color: 'from-blue-500/20 to-simonBlue/30',
    borderColor: 'border-blue-500/40',
  },
  {
    id: 'charcas',
    name: 'Bloque Charcas',
    category: 'Tradición e Historia',
    icon: '✨',
    motto: 'Brillo histórico y devoción a Sucre',
    desc: 'Un homenaje vivo a nuestras raíces en la histórica cuna de Charcas. Tradición, disciplina folclórica y un profundo sentimiento simón.',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'jayass',
    name: 'Jayass',
    category: 'Fuerza Escénica',
    icon: '🔥',
    motto: 'Potencia escénica y pasión indomable',
    desc: 'Presencia magnética en cada presentación. Un bloque reconocido por su dinamismo en coreografía y la entrega absoluta en cada presentación oficial.',
    color: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 'kachamozas',
    name: 'Kachamozas',
    category: 'Bloque Selecto',
    icon: '💃',
    motto: 'Sincronía impecable y alegría contagiosa',
    desc: 'Representan la juventud y el dinamismo de la nueva era de San Simón Sucre, combinando tradición con coreografías de vanguardia.',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
];

export default function Tropas({ onOpenForm }) {
  const [activeTropa, setActiveTropa] = useState(TROPAS_DATA[0]);

  return (
    <section id="bloques" className="py-24 px-4 md:px-8 bg-simonDark relative overflow-hidden border-t border-white/10">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-simonRed/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-simonBlue/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-simonGold text-xs uppercase tracking-widest font-bold mb-2">
              <Flame size={14} className="text-simonRed" />
              <span>Cuerpo de Danzantes Oficial</span>
            </div>
            <h2 className="font-editorial-title text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-4">
              Una familia.<br />
              <span className="text-champagne">Nuestra identidad.</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Conoce las tropas, figuras y bloques de Caporales San Simón Sucre.
            </p>
          </div>

          <button
            onClick={onOpenForm}
            className="px-5 py-3 rounded-xl bg-simonRed hover:bg-simonRedLight text-white font-grotesk text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all self-start md:self-auto cursor-pointer"
          >
            <span>Postula a tu Bloque</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Interactive Grid of Tropas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TROPAS_DATA.map((tropa) => {
            const isSelected = activeTropa.id === tropa.id;
            return (
              <motion.div
                key={tropa.id}
                whileHover={{ y: -4 }}
                onClick={() => setActiveTropa(tropa)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br ' + tropa.color + ' border-simonGold shadow-[0_10px_30px_rgba(212,175,55,0.25)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{tropa.icon}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-black/40 text-gray-300 border border-white/10">
                      {tropa.category}
                    </span>
                  </div>

                  <h3 className="font-bebas text-2xl text-white tracking-wide leading-tight">
                    {tropa.name}
                  </h3>
                  
                  <p className="text-xs text-simonGold font-semibold mt-1 mb-3">
                    "{tropa.motto}"
                  </p>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-3">
                    {tropa.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-gray-400 group-hover:text-white">
                  <span>Convocatoria 2027</span>
                  <span className="text-simonGold flex items-center gap-1">
                    Ver más <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Tropa Spotlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTropa.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-8 p-6 md:p-8 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center text-3xl shrink-0">
                {activeTropa.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bebas text-3xl text-white">
                    {activeTropa.name}
                  </h4>
                  <span className="text-xs uppercase font-bold tracking-widest text-simonGold bg-simonGold/10 border border-simonGold/30 px-2.5 py-0.5 rounded-full">
                    {activeTropa.category}
                  </span>
                </div>
                <p className="text-sm text-gray-200 mt-1 max-w-2xl leading-relaxed">
                  {activeTropa.desc}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenForm}
              className="px-6 py-3.5 rounded-xl bg-simonRed hover:bg-simonRedLight text-white font-grotesk text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
            >
              <span>Postular a {activeTropa.name}</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
