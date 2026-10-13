import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, Calendar, Award } from 'lucide-react';

export default function Hero({ onOpenForm, onOpenMemberPortal }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Cuenta regresiva
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-11-12T08:00:00');
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-simonDeep md:min-h-screen md:flex md:flex-col md:justify-center md:items-center md:pt-24 md:pb-16 md:px-8">
      
      {/* ========================================================
          VIDEO STAGE (Mitad Superior en Móvil / Fondo Inmersivo en Desktop)
          ======================================================== */}
      <div className="relative w-full h-[48vh] min-h-[320px] max-h-[460px] md:h-full md:max-h-none md:min-h-0 md:absolute md:inset-0 md:z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover brightness-100 contrast-[1.02] md:brightness-[0.42] md:contrast-[1.12] transition-all duration-700"
        >
          <source src="/img/logo.mp4" type="video/mp4" />
        </video>

        {/* Desktop Keynote Atmospheric Depth Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081026] via-[#081026]/85 to-transparent pointer-events-none hidden md:block" />

        {/* Mobile Cinema Soft Fade (Estilo A: Fundido continuo superior e inferior) */}
        {/* Fade superior para el navbar en móvil */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#081026]/90 via-[#081026]/40 to-transparent pointer-events-none md:hidden" />
        {/* Fade inferior suave que funde el video al fondo de la sección de texto */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#081026] via-[#081026]/75 to-transparent pointer-events-none md:hidden" />

        {/* Floating Sound Toggle - Apple Circular Control Chip */}
        <button
          onClick={toggleAudio}
          className="absolute bottom-5 right-5 md:bottom-auto md:top-20 md:right-10 z-20 w-11 h-11 rounded-full bg-[#081026]/80 backdrop-blur-2xl border border-white/20 text-white/90 hover:text-white hover:border-white/40 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xl"
          title={isMuted ? "Activar Audio" : "Silenciar Audio"}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} className="text-simonGold animate-pulse" />}
        </button>
      </div>

      {/* ========================================================
          MAIN CONTENT CONTAINER (Mitad Inferior en Móvil / Columnas en Desktop)
          ======================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 px-4 sm:px-6 md:px-6 -mt-8 md:mt-4 pb-14 md:pb-0">
        
        {/* Left Column: Keynote Editorial Presentation */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-superstar text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.98] text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
          >
            <span className="font-exclamation">¡</span>NO ES MAGIA, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-simonRed to-red-400">
              ES SUCRE<span className="font-exclamation">!</span>
            </span>
          </motion.h1>

          <div className="w-16 md:w-24 h-[1.5px] bg-gradient-to-r from-simonRed to-transparent my-4 opacity-90" />

          {/* Apple 17px body standard with 1.47 relaxed leading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/85 text-[16px] sm:text-[19px] font-normal leading-[1.47] tracking-[-0.015em] drop-shadow-md"
          >
            De Sucre para el mundo. La fraternidad de caporales más imponente de Bolivia abre su convocatoria oficial hacia el <strong className="text-simonGold font-semibold">Carnaval de Oruro 2027</strong>.
          </motion.p>

          {/* Action Buttons - Apple Signature Pill CTAs */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 w-full">
            <button
              onClick={onOpenForm}
              className="px-6 py-3.5 rounded-full bg-simonRed hover:bg-simonRedLight text-white font-sans text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(229,71,55,0.4)] active:scale-[0.96] transition-transform duration-150 cursor-pointer group"
            >
              <span>Quiero ser Simón de corazón</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenMemberPortal}
              className="px-5 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white/90 font-sans text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2 backdrop-blur-xl active:scale-[0.96] transition-transform duration-150 cursor-pointer"
            >
              <Award size={16} className="text-simonGold" />
              <span>Soy Simón (Portal Fraterno)</span>
            </button>
          </div>

          {/* Countdown Card - Apple Keynote Spec Tile */}
          <div className="mt-8 sm:mt-9 w-full max-w-md bg-[#0D1527]/75 backdrop-blur-2xl border border-white/[0.08] rounded-[22px] p-4.5 shadow-[0_20px_50px_rgba(8,16,38,0.8)]">
            <div className="flex items-center justify-between gap-2 mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-simonGold">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> Entrevistas de Admisión
              </span>
              <span className="text-white/40">12 y 13 Noviembre</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'DÍAS', val: timeLeft.days },
                { label: 'HORAS', val: timeLeft.hours },
                { label: 'MIN', val: timeLeft.minutes },
                { label: 'SEG', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/[0.06] rounded-[14px] p-2.5 text-center">
                  <div className="font-bebas text-2xl sm:text-3xl font-bold text-white leading-none">
                    {item.val}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Emblema Oficial Conmemorativo 30 Años (Apple Single Product Presentation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:w-auto flex flex-col items-center justify-center relative select-none shrink-0 mt-4 lg:mt-0"
        >
          {/* Ambient Warm Golden Ground Reflection */}
          <div className="absolute inset-0 max-w-[340px] max-h-[340px] m-auto bg-simonGold/10 rounded-full blur-[90px] pointer-events-none" />
          
          <img
            src="/30.png"
            alt="30 Años San Simón Sucre"
            className="w-full max-w-[240px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] h-auto object-contain apple-product-shadow transition-transform duration-500 animate-float"
          />

          <div className="mt-3.5 flex items-center gap-2 text-simonGold text-[11px] uppercase tracking-widest font-semibold opacity-85">
            <span className="w-5 h-[1px] bg-gradient-to-r from-transparent to-simonGold/60" />
            <span>1996 · 30 AÑOS · 2026</span>
            <span className="w-5 h-[1px] bg-gradient-to-l from-transparent to-simonGold/60" />
          </div>
        </motion.div>

      </div>

    </section>
  );
}
