import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, X, AudioLines, AudioLinesOff } from 'lucide-react';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="h-screen w-full bg-simonDark relative font-sans text-simonLight overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed z-50 w-full px-6 md:px-12 py-2 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <img src="/img/icono.png" alt="Caporales San Simón" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(164,29,33,0.5)]" />
          <span className="font-varsity-override text-2xl tracking-[0.1em] uppercase hidden sm:block pt-1 font-bold">San Simón <span className="text-simonRed">Sucre</span></span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <a href="https://www.facebook.com/caporalessansimonsucreoficial" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-simonRed transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(164,29,33,0.8)] hover:scale-110 transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/caporales_san_simon_sucre/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-simonRed transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(164,29,33,0.8)] hover:scale-110 transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://www.tiktok.com/@caporalessansimonsucre" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-simonRed transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(164,29,33,0.8)] hover:scale-110 transform">
            <svg width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.2 10.1c0 .22-.18.401-.4.39a8 8 0 0 1-3.362-.93c-.281-.15-.638.045-.638.364V15.5a6 6 0 1 1-6.4-5.987a.38.38 0 0 1 .4.387v2.8c0 .22-.18.397-.398.433A2.4 2.4 0 1 0 12.2 15.5V2.9a.4.4 0 0 1 .4-.4h2.8a.43.43 0 0 1 .418.4a4.4 4.4 0 0 0 3.983 3.982c.22.02.4.197.4.418z"/></svg>
          </a>
          <a href="https://www.youtube.com/@caporalessansimonsucre6828" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-simonRed transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(164,29,33,0.8)] hover:scale-110 transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
          </a>
        </div>
      </nav>

      {/* BACKGROUND / VIDEO CONTAINER */}
      {/* MOBILE: relative, aspect-video, starts below navbar. DESKTOP: fixed, full screen, behind everything */}
      <div className="w-full relative md:absolute md:inset-0 z-0 aspect-video md:aspect-auto md:h-screen mt-[78px] md:mt-0 bg-black">
        <video 
          ref={videoRef}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.1) brightness(0.50)" }}
        >
          <source src="/img/logo.mp4" type="video/mp4" />
        </video>
        {/* Gradients to blend video perfectly */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-simonDark via-simonDark/80 to-transparent z-10 pointer-events-none" />
        <div className="block md:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-simonDark to-transparent z-10 pointer-events-none" />
      </div>

      {/* HERO CONTENT */}
      <main className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left h-full md:h-screen px-4 md:px-16 pt-6 md:pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start relative"
        >
          <h1 className="font-varsity-override text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            CONVOCATORIA
          </h1>
          <h2 className="font-varsity-override text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest mt-2 md:mt-4 text-simonRed drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            2K27
          </h2>
          
          <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-simonRed to-transparent my-4 md:my-6 opacity-80 md:ml-0 md:bg-gradient-to-r md:from-simonRed md:to-transparent"></div>

          <p className="text-[16px] font-sans text-gray-200 max-w-xl font-light leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
            Caporales Universitarios San Simón Sucre te abre sus puertas. Sé parte de la agrupación folclórica más grande e imponente de Bolivia rumbo al 2027. ¡Ven y vive la verdadera pasión del caporal!
          </p>

          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(164,29,33,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="mt-8 md:mt-10 bg-simonRed text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-[14px] md:text-lg uppercase tracking-widest flex items-center gap-3 transition-all relative overflow-hidden group shadow-[0_10px_30px_rgba(164,29,33,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Postular Ahora <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform"/>
          </motion.button>

        </motion.div>
      </main>

      {/* END OF MAIN CONTENT */}

      {/* REGISTRATION MODAL WITH GLASSMORPHISM */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsFormOpen(false)} 
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 40 }} 
              className="bg-black/50 backdrop-blur-2xl border border-white/10 border-t-white/20 border-l-white/20 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]"
            >
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
                <div>
                  <h2 className="font-varsity-override text-3xl tracking-wider uppercase text-white font-bold drop-shadow-md">Registro <span className="text-simonRed">2K27</span></h2>
                  <p className="text-gray-400 text-[14px] mt-1">Únete a los 30 Años de Locura.</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-white transition bg-white/5 hover:bg-simonRed/80 p-2 rounded-full"><X size={24}/></button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <form 
                  className="flex flex-col gap-6" 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    const fd = new FormData(e.target);
                    const mensaje = `¡Hola! Quiero postular a Caporales San Simón Sucre 2027.%0A%0A*Mis Datos:*%0A👤 *Nombres:* ${fd.get('nombres')} ${fd.get('apellidos')}%0A🪪 *C.I.:* ${fd.get('ci')}%0A📱 *Mi celular:* ${fd.get('celular')}%0A🕺 *Postulo a:* ${fd.get('tropa')}%0A%0A¡Quedo a la espera de las instrucciones para la inscripción!`;
                    window.open(`https://wa.me/59174455333?text=${mensaje}`, '_blank');
                    setIsFormOpen(false);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2"><label className="text-[14px] font-bold text-gray-300 uppercase tracking-wider">Nombres</label><input name="nombres" type="text" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-simonRed focus:bg-white/10 transition-all shadow-inner" placeholder="Ej. Juan Carlos" /></div>
                    <div className="space-y-2"><label className="text-[14px] font-bold text-gray-300 uppercase tracking-wider">Apellidos</label><input name="apellidos" type="text" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-simonRed focus:bg-white/10 transition-all shadow-inner" placeholder="Ej. Perez" /></div>
                    <div className="space-y-2"><label className="text-[14px] font-bold text-gray-300 uppercase tracking-wider">C.I.</label><input name="ci" type="text" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-simonRed focus:bg-white/10 transition-all shadow-inner" placeholder="1234567" /></div>
                    <div className="space-y-2"><label className="text-[14px] font-bold text-gray-300 uppercase tracking-wider">WhatsApp</label><input name="celular" type="tel" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-simonRed focus:bg-white/10 transition-all shadow-inner" placeholder="71234567" /></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[14px] font-bold text-gray-300 uppercase tracking-wider">Selecciona tu Tropa</label>
                    <div className="relative">
                      <select name="tropa" required defaultValue="" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-simonRed focus:bg-white/10 transition-all appearance-none cursor-pointer shadow-inner">
                        <option value="" disabled className="text-black">Elige una opción...</option>
                        <option value="Bloque Machos" className="text-black">Bloque Machos</option>
                        <option value="Bloque Cholitas" className="text-black">Bloque Cholitas</option>
                        <option value="Bloque Kachas" className="text-black">Bloque Kachas</option>
                        <option value="Bloque Jayas" className="text-black">Bloque Jayas</option>
                        <option value="Aún no estoy seguro" className="text-black">Aún no estoy seguro / Nuevo</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronRight size={18} className="rotate-90"/>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-6 border-t border-white/10">
                    <motion.button 
                      whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(164,29,33,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="w-full bg-simonRed text-white rounded-xl py-4 font-bold text-lg uppercase tracking-widest transition-all"
                    >
                      Confirmar y Postular
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOTON FLOTANTE DE AUDIO */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAudio}
        aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
        className="fixed bottom-6 right-6 z-40 bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 hover:border-simonRed text-white p-3.5 md:p-4 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(164,29,33,0.6)] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
      >
        {isMuted ? (
          <AudioLinesOff size={22} className="text-gray-300 group-hover:text-simonRed transition-colors" />
        ) : (
          <AudioLines size={22} className="text-simonRed animate-pulse" />
        )}
        <span className="text-xs uppercase tracking-wider font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-gray-200">
          {isMuted ? "Activar audio" : "Silenciar"}
        </span>
      </motion.button>

    </div>
  );
}
