import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, X, Award, ExternalLink, ShieldCheck, HeartHandshake, Trophy } from 'lucide-react';

const PILARES = [
  {
    tag: 'RECONOCIMIENTO NACIONAL',
    title: 'Distinciones de Honor',
    icon: <Award className="text-simonGold" size={28} />,
    desc: 'Condecoración oficial por la Cámara de Senadores del Estado Plurinacional de Bolivia, reconociendo el aporte cultural y la defensa del folclore nacional por tres décadas.',
    highlight: 'Cámara de Senadores de Bolivia',
  },
  {
    tag: 'HERMANDAD & RAÍCES',
    title: 'Alianzas & Colaboraciones',
    icon: <HeartHandshake className="text-simonRed" size={28} />,
    desc: 'Piezas e intercambios culturales históricos con agrupaciones legendarias como San Pedro y Cincani, forjando el respeto mutuo que trasciende generaciones.',
    highlight: 'San Pedro · Cincani',
  },
  {
    tag: 'PALMARÉS & LOGROS',
    title: 'Premios & Concursos',
    icon: <Trophy className="text-amber-400" size={28} />,
    desc: 'Primeros lugares y reconocimientos en las entradas folclóricas más exigentes de Bolivia y el exterior, avalando la excelencia coreográfica de nuestra sede y filiales.',
    highlight: 'Excelencia Oruro & Entradas Oficiales',
  },
];

export default function LaMagia() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoDriveUrl = "https://drive.google.com/file/d/1HszR9AMczjZE2152rQ4lmcEugvpESEm8/preview";

  return (
    <section id="magia" className="py-24 px-4 md:px-8 bg-simonDark relative overflow-hidden border-t border-white/10">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-simonRed/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-simonBlue/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-simonGold text-xs uppercase tracking-widest font-bold mb-3 px-3.5 py-1.5 rounded-full bg-simonGold/10 border border-simonGold/20">
            <Sparkles size={14} className="text-simonGold" />
            <span>Mística, Fe & 30 Años de Trayectoria</span>
          </div>
          
          <h2 className="font-editorial-title text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-4">
            De Sucre para<br />
            <span className="text-champagne">el mundo entero.</span>
          </h2>
          
          <p className="text-gray-200 text-base sm:text-lg mt-4 leading-relaxed font-light">
            <em>"Hay cosas que no se explican: se viven."</em> Desde 1996, Caporales San Simón Sucre reúne a generaciones alrededor del folclore, la devoción a la Virgen del Socavón y una promesa de hermandad eterna: <strong>La familia que tú eliges</strong>.
          </p>
        </div>

        {/* Video Documental Showcase */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)] mb-16 group">
          <div className="aspect-[21/9] min-h-[300px] w-full relative">
            <img
              src="/fotos/h/0010.webp"
              alt="30 Años de Magia - Caporales San Simón Sucre"
              className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&auto=format&fit=crop&q=80';
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-simonDeep via-black/40 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoOpen(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-simonRed/90 hover:bg-simonRed text-white flex items-center justify-center shadow-[0_0_40px_rgba(164,29,33,0.8)] border border-white/30 backdrop-blur-md cursor-pointer transition-all mb-4 group/btn"
                title="Reproducir Video Oficial"
              >
                <Play size={36} className="fill-white ml-1.5 group-hover/btn:scale-110 transition-transform" />
              </motion.button>

              <span className="text-xs uppercase font-bold tracking-widest text-simonGold bg-black/60 px-3 py-1 rounded-full border border-simonGold/30 mb-2">
                Documental Oficial 30 Años
              </span>
              <h3 className="font-bebas text-2xl sm:text-4xl text-white tracking-wide max-w-xl">
                Actividades y Memorias de Caporales San Simón Sucre
              </h3>
            </div>
          </div>
        </div>

        {/* 3 Pilares del Archivo de Honor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILARES.map((pilar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-simonGold/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {pilar.icon}
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-simonGold block mb-1">
                  {pilar.tag}
                </span>

                <h4 className="font-bebas text-2xl text-white tracking-wide mb-3">
                  {pilar.title}
                </h4>

                <p className="text-xs text-gray-300 leading-relaxed font-sans mb-4">
                  {pilar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                <span className="text-simonRed font-bold">{pilar.highlight}</span>
                <ShieldCheck size={16} className="text-simonGold" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* MODAL REPRODUCTOR DE VIDEO */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-simonDeep rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              {/* Header Modal */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-simonGold">
                    Archivo Audiovisual · 30 Años
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm font-bold"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Iframe Video */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={videoDriveUrl}
                  title="Video Oficial 30 Años San Simón Sucre"
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>

              {/* Footer Modal */}
              <div className="px-6 py-3.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>San Simón Sucre · Documental Histórico</span>
                <a
                  href="https://drive.google.com/file/d/1HszR9AMczjZE2152rQ4lmcEugvpESEm8/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-simonGold hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Abrir en Google Drive</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
