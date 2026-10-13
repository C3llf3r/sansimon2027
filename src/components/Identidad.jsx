import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const EMBLEMS = [
  {
    symbol: '🚩',
    title: 'La Bandera Oficial',
    subtitle: 'Rojo Pasión y Azul Simón',
    desc: 'Los colores emblemáticos nacidos en Sucre. El rojo representa el corazón, fervor y sacrificio de los danzantes; el azul evoca la fidelidad, devoción a la Virgen y la hermandad universitaria.',
  },
  {
    symbol: '🔔',
    title: 'Los Cascabeles de Bronce',
    subtitle: 'El sonido inconfundible del compás',
    desc: 'Forjados artesanalmente para cada bota. Al caminar y saltar, decenas de cascabeles al unísono marcan el ritmo militar del caporal que estremece las calles de Oruro.',
  },
  {
    symbol: '👑',
    title: 'Trajes de Alta Costura',
    subtitle: 'Bordados en hilo de oro y pedrería',
    desc: 'Cada temporada se concibe un diseño de gala único, fusionando iconografía prehispánica y barroca con cortes estilizados confeccionados por los mejores maestros bordadores de Bolivia.',
  },
  {
    symbol: '🦅',
    title: 'El Escudo San Simón',
    subtitle: 'Sello de Honor y Pertenencia',
    desc: 'Símbolo de tres décadas de gloria. Llevar el escudo en el pecho significa un compromiso de honor, respeto a las tradiciones y hermandad con cada filial en el mundo.',
  },
];

export default function Identidad() {
  return (
    <section id="identidad" className="py-24 px-4 md:px-8 bg-simonDeep relative border-t border-white/10 overflow-hidden">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-simonRed/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-simonGold text-xs uppercase tracking-widest font-bold mb-2">
            <Shield size={14} className="text-simonGold" />
            <span>Símbolos, Tradición y Valores</span>
          </div>
          <h2 className="font-editorial-title text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-4">
            Nuestra esencia<br />
            <span className="text-champagne">se reconoce.</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal">
            San Simón Sucre no es únicamente una danza: es un sentimiento transmitido de generación en generación a través de sus símbolos sagrados.
          </p>
        </div>

        {/* Emblems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EMBLEMS.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-simonGold/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                  {item.symbol}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-simonGold block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-bebas text-2xl text-white tracking-wide leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span>Tradición Sucre</span>
                <span className="font-bold text-simonGold">1996 - 2027</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lema Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-simonRed/30 via-simonDark to-simonBlue/30 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <img 
              src="/img/icono.webp" 
              alt="San Simón Sucre" 
              className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(164,29,33,0.8)]" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = '/img/icono.png'; }}
            />
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-simonGold block">
                Lema Institucional
              </span>
              <h4 className="font-superstar text-2xl sm:text-3xl text-white tracking-wide">
                ¡NO ES MAGIA, ES SUCRE!
              </h4>
            </div>
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-gray-300 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
            Fraternidad Folclórica y Cultural desde 1996
          </span>
        </div>

      </div>
    </section>
  );
}
