import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UserCheck, UserPlus } from 'lucide-react';

export default function Navbar({ onOpenForm, onOpenMemberPortal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '30 Años', href: '#historia' },
    { label: 'Momentos', href: '#momentos' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-2.5 bg-[#081026]/85 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/img/icono.svg" 
            alt="Caporales San Simón Sucre" 
            className="w-9 h-9 md:w-10 md:h-10 object-contain drop-shadow-[0_0_12px_rgba(229,71,55,0.6)] group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col">
            <span className="font-varsity-override text-xl md:text-2xl tracking-wide uppercase font-bold text-white leading-none">
              San Simón <span className="text-simonRed">Sucre</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
              Desde 1996 · Rumbo a Oruro 2027
            </span>
          </div>
        </a>

        {/* Desktop Nav - Apple 12px link standard */}
        <nav className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-widest font-medium text-white/70">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="hover:text-white transition-colors duration-200 py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-simonGold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons - Apple Pill Format with active:scale-95 */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenMemberPortal}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] uppercase tracking-wider font-semibold text-white/80 border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] hover:text-white hover:border-white/20 active:scale-95 transition-all cursor-pointer"
          >
            <UserCheck size={13} className="text-simonGold" />
            <span>Soy Simón</span>
          </button>

          <button
            onClick={onOpenForm}
            className="flex items-center gap-2 px-4.5 py-2 rounded-full text-[12px] uppercase tracking-wider font-semibold text-white bg-simonRed hover:bg-simonRedLight shadow-[0_2px_14px_rgba(229,71,55,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus size={13} />
            <span>Quiero ser Simón</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full text-white/70 hover:text-white bg-white/5 border border-white/10 active:scale-95 transition-transform"
          aria-label="Abrir Menú"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-2.5 pt-3 border-t border-white/[0.08] flex flex-col gap-2.5 pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-wider font-medium text-white/75 hover:text-white py-2 px-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenMemberPortal(); }}
                className="w-full py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-center text-white/80 bg-white/[0.08] border border-white/15 active:scale-95 transition-transform"
              >
                Soy Simón de corazón (Portal)
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenForm(); }}
                className="w-full py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-center text-white bg-simonRed shadow-[0_4px_16px_rgba(164,29,33,0.4)] active:scale-95 transition-transform"
              >
                Quiero ser Simón (Convocatoria 2027)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
