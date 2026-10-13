import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenForm, onOpenMemberPortal, onOpenAdmin }) {
  return (
    <footer className="bg-[#050B1A] border-t border-white/[0.08] text-white/60 py-16 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-simonRed/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        
        {/* Brand identity column */}
        <div className="md:col-span-5 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/img/icono.png" 
              alt="San Simón Sucre" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(229,71,55,0.6)]" 
            />
            <span className="font-varsity-override text-2xl font-bold text-white tracking-wider">
              SAN SIMÓN <span className="text-simonRed">SUCRE</span>
            </span>
          </div>

          <p className="text-[14px] text-white/60 leading-relaxed max-w-sm mb-4 font-normal">
            Fraternidad Folclórica y Cultural Caporales Universitarios San Simón Sucre. Fundada en 1996. 30 años de fe, tradición y excelencia rumbo al Carnaval de Oruro 2027.
          </p>

          <span className="text-[11px] uppercase font-semibold tracking-widest text-simonGold bg-[#081026] border border-white/[0.08] px-3.5 py-1 rounded-full">
            ¡No es magia, es Sucre!
          </span>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="font-sans text-[12px] uppercase font-semibold text-white/90 tracking-widest mb-4 border-b border-white/[0.08] pb-2">
            Navegación & Enlaces
          </h4>
          <ul className="space-y-2.5 text-[13px] text-white/60 font-medium">
            <li>
              <a href="#historia" className="hover:text-white transition-colors duration-200">30 Años de Historia</a>
            </li>
            <li>
              <a href="#momentos" className="hover:text-white transition-colors duration-200">Momentos Mágicos (HD)</a>
            </li>
            <li>
              <button onClick={onOpenMemberPortal} className="hover:text-white transition-colors duration-200 text-left uppercase cursor-pointer">
                Portal Fraterno "Soy Simón"
              </button>
            </li>
            <li>
              <button onClick={onOpenForm} className="text-simonRed hover:text-red-400 transition-colors duration-200 text-left uppercase cursor-pointer font-semibold">
                Convocatoria Oruro 2027
              </button>
            </li>
            {onOpenAdmin && (
              <li className="pt-1.5 border-t border-white/[0.06]">
                <button onClick={onOpenAdmin} className="text-white/40 hover:text-simonGold transition-colors duration-200 text-left uppercase cursor-pointer flex items-center gap-1.5 text-[12px]">
                  <span>🔒 Panel Secretaría</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Social Networks & Contact */}
        <div className="md:col-span-4">
          <h4 className="font-sans text-[12px] uppercase font-semibold text-white/90 tracking-widest mb-4 border-b border-white/[0.08] pb-2">
            Redes Oficiales
          </h4>
          <div className="grid grid-cols-2 gap-2.5 text-[12px] font-medium">
            <a
              href="https://www.facebook.com/caporalessansimonsucreoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[16px] bg-[#0D1527]/60 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-[#0D1527]/90 active:scale-95 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-blue-400 transition-colors">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <span>Facebook</span>
              </div>
              <ArrowUpRight size={13} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="https://www.instagram.com/caporales_san_simon_sucre/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[16px] bg-[#0D1527]/60 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-[#0D1527]/90 active:scale-95 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-pink-400 transition-colors">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </div>
              <ArrowUpRight size={13} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="https://www.tiktok.com/@caporalessansimonsucre"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[16px] bg-[#0D1527]/60 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-[#0D1527]/90 active:scale-95 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 group-hover:text-cyan-400 transition-colors">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.86-4.49V8.91a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.86-.34z"/>
                </svg>
                <span>TikTok</span>
              </div>
              <ArrowUpRight size={13} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="https://www.youtube.com/@caporalessansimonsucre6828"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[16px] bg-[#0D1527]/60 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-[#0D1527]/90 active:scale-95 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 group-hover:text-red-400 transition-colors">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </div>
              <ArrowUpRight size={13} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          <div className="mt-3.5 p-3.5 rounded-[16px] bg-white/[0.03] border border-white/[0.08] text-[12px] text-white/70">
            <span className="font-semibold text-white">Sede Matriz:</span> Sucre, Bolivia.<br />
            Entrevistas de Admisión: 12 y 13 de Noviembre.
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[12px] text-white/40 gap-4">
        <span>© 1996 - 2026 Fraternidad Folclórica Caporales Universitarios San Simón Sucre. Todos los derechos reservados.</span>
      </div>

    </footer>
  );
}
