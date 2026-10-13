import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';

const CATEGORIES = [
  { id: 'todos', label: 'Todo el Archivo' },
  { id: 'oruro', label: 'Carnaval de Oruro' },
  { id: 'tropas', label: 'Tropas & Pasos' },
  { id: 'figuras', label: 'Figuras & Bloques' },
  { id: 'ensayos', label: 'Ensayos & Convivencia' },
];

const GALLERY_ITEMS = [
  { id: 1, src: '/fotos/h/0010.webp', title: 'Peregrinación al Socavón', cat: 'oruro', orientation: 'h', desc: 'Entrada majestuosa de Caporales San Simón Sucre en Oruro.' },
  { id: 2, src: '/fotos/v/0004.webp', title: 'Porte y Tradición', cat: 'figuras', orientation: 'v', desc: 'Detalle de traje bordado y devoción en el rostro.' },
  { id: 3, src: '/fotos/h/0025.webp', title: 'Fuerza de la Tropa Central', cat: 'tropas', orientation: 'h', desc: 'Cascabeles al unísono retumbando en la Avenida Cívica.' },
  { id: 4, src: '/fotos/v/0008.webp', title: 'Cadencia de Cholitas', cat: 'tropas', orientation: 'v', desc: 'Gracia, polleras al viento y el clásico paso simón.' },
  { id: 5, src: '/fotos/h/0034.webp', title: 'Noche de Magia en Oruro', cat: 'oruro', orientation: 'h', desc: 'Luces, juego pirotécnico y emoción al culminar el recorrido.' },
  { id: 6, src: '/fotos/v/0012.webp', title: 'Fuerza de Machas', cat: 'figuras', orientation: 'v', desc: 'Elegancia y liderazgo al frente de la fraternidad.' },
  { id: 7, src: '/fotos/h/0015.webp', title: 'Hermandad de Filiales', cat: 'ensayos', orientation: 'h', desc: 'Encuentro nacional de fraternos previos a la entrada.' },
  { id: 8, src: '/fotos/v/0017.webp', title: 'Chinas Simón Sucre', cat: 'figuras', orientation: 'v', desc: 'El donaire y la sonrisa que distingue a Sucre.' },
  { id: 9, src: '/fotos/h/0006.webp', title: 'El Gran Convite', cat: 'oruro', orientation: 'h', desc: 'La promesa de fe ante la mamita del Socavón.' },
  { id: 10, src: '/fotos/v/0019.webp', title: 'Mística de los Jayas', cat: 'figuras', orientation: 'v', desc: 'Máscaras tradicionales y la presencia imponente del bloque de los Jayas.' },
  { id: 11, src: '/fotos/h/0020.webp', title: 'El Color de la Pasión', cat: 'ensayos', orientation: 'h', desc: 'Mística y preparación en los ensayos de fin de semana.' },
  { id: 12, src: '/fotos/v/0023.webp', title: 'Hermandad de los Jayas', cat: 'figuras', orientation: 'v', desc: 'La alegría y el porte de nuestros danzantes custodiados por los Jayas.' },
];

export default function GalleryLightbox() {
  const [selectedCat, setSelectedCat] = useState('todos');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const filteredPhotos = selectedCat === 'todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.cat === selectedCat);

  const handleOpen = (idx) => {
    setActivePhotoIndex(idx);
  };

  const handleClose = () => {
    setActivePhotoIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="momentos" className="py-24 px-4 md:px-8 bg-simonDeep relative border-t border-white/[0.08]">
      
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-72 bg-simonRed/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header - Apple Keynote Gallery Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-simonGold text-[11px] uppercase tracking-widest font-semibold mb-2">
              <Camera size={13} />
              <span>Archivo Oficial en Alta Definición</span>
            </div>
            <h2 className="font-editorial-title text-4xl sm:text-6xl tracking-tight leading-none mb-3">
              <span className="text-white block">Momentos mágicos.</span>
              <span className="text-champagne block">Nuestra memoria viva.</span>
            </h2>
            <p className="text-white/75 font-normal leading-[1.47] text-[17px] max-w-xl tracking-[-0.015em]">
              Cada fotografía captura un latido, un salto y una promesa de fe. Haz clic en cualquier imagen para abrir el visor inmersivo en pantalla completa.
            </p>
          </div>

          {/* Filter Pills - Apple Signature Capsule Chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer border active:scale-95 ${
                  selectedCat === cat.id
                    ? 'bg-simonRed border-simonRed text-white shadow-[0_2px_14px_rgba(229,71,55,0.4)]'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Container - Apple Museum Photography Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleOpen(idx)}
              className={`group relative rounded-[20px] overflow-hidden bg-[#0D1527]/70 border border-white/[0.08] shadow-lg cursor-pointer ${
                photo.orientation === 'v' ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081026] via-[#081026]/30 to-transparent opacity-65 group-hover:opacity-90 transition-opacity" />

              {/* Quick View Icon - 44px chip */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#081026]/70 backdrop-blur-xl text-white/80 opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 flex items-center justify-center">
                <Maximize2 size={14} />
              </div>

              {/* Photo Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <span className="text-[9px] uppercase font-semibold tracking-widest text-simonGold bg-[#081026]/85 px-2.5 py-0.5 rounded-full border border-white/[0.08]">
                  {photo.cat.toUpperCase()}
                </span>
                <h4 className="font-bebas text-2xl text-white mt-1.5 leading-tight group-hover:text-simonGold transition-colors">
                  {photo.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL - Apple Immersive Viewer */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081026]/96 backdrop-blur-3xl"
          >
            {/* Top Close Button - 44x44 Apple chip */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer border border-white/20 flex items-center justify-center"
              title="Cerrar (Esc)"
            >
              <X size={20} />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#081026]/80 hover:bg-simonRed active:scale-95 text-white transition-all cursor-pointer border border-white/20 flex items-center justify-center shadow-lg"
              title="Anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#081026]/80 hover:bg-simonRed active:scale-95 text-white transition-all cursor-pointer border border-white/20 flex items-center justify-center shadow-lg"
              title="Siguiente"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            >
              <motion.img
                key={filteredPhotos[activePhotoIndex].src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredPhotos[activePhotoIndex].src}
                alt={filteredPhotos[activePhotoIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-[22px] shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/[0.12]"
              />

              {/* Lightbox Footer Info */}
              <div className="mt-4 text-center max-w-xl px-4">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-simonGold bg-white/[0.08] px-3 py-0.5 rounded-full border border-white/[0.08]">
                  Foto {activePhotoIndex + 1} de {filteredPhotos.length}
                </span>
                <h3 className="font-bebas text-2xl md:text-3xl text-white mt-1.5 tracking-wide">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
                <p className="text-[14px] text-white/70 mt-1 font-normal">
                  {filteredPhotos[activePhotoIndex].desc}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
