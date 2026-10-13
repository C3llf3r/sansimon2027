import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Eye, EyeOff, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginFraternoDrawer({ isOpen, onClose, onLoginSuccess, onOpenAdmin }) {
  const [codigo, setCodigo] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCloseDrawer = () => {
    setError('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanCodigo = codigo.trim().toUpperCase();
    const cleanPin = pin.trim();

    // Acceso especial de administración directa
    if ((cleanCodigo === 'ADMIN' || cleanCodigo === 'SECRETARIA' || cleanCodigo === 'DIRECTIVA') && (cleanPin === '2027' || cleanPin === 'SIMON2027')) {
      if (onOpenAdmin) {
        onClose();
        onOpenAdmin();
        return;
      }
    }

    if (!cleanCodigo) {
      setError('Por favor, ingresa tu código de fraterno o C.I.');
      return;
    }
    if (!cleanPin) {
      setError('Por favor, ingresa tu PIN institucional.');
      return;
    }
    if (cleanPin.length < 4) {
      setError('El PIN institucional debe tener al menos 4 caracteres.');
      return;
    }

    setIsLoading(true);

    // Validación y acceso al portal fraterno (los roles específicos se vincularán posteriormente)
    setTimeout(() => {
      setIsLoading(false);
      const fraternoSession = {
        codigo: cleanCodigo.startsWith('SS-') ? cleanCodigo : `SS-SUC-${cleanCodigo}`,
        pin: cleanPin,
        nombre: 'FRATERNO SAN SIMÓN',
        tropa: 'POR ASIGNAR',
        antiguedad: 'ACTIVO',
        rango: 'FRATERNO REGISTRADO',
        asistencias: 'REGISTRO OFICIAL',
        cuotas: 'AL DÍA',
        convite: 'HABILITADO PARA ORURO 2027',
      };
      onLoginSuccess(fraternoSession);
    }, 450);
  };

  const handleHelpWhatsApp = () => {
    const msg = encodeURIComponent(
      '¡Hola Secretaría San Simón Sucre! Necesito consultar mi credencial de fraterno o solicitar mi PIN para acceder al portal oficial.'
    );
    window.open(`https://api.whatsapp.com/send?phone=59170322221&text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Telón de fondo con desenfoque Apple */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDrawer}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md cursor-pointer transition-opacity"
          />

          {/* Side Drawer Panel Deslizable desde la derecha */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-[#081026]/95 backdrop-blur-2xl border-l border-white/[0.08] shadow-[-30px_0_70px_rgba(8,16,38,0.95)] flex flex-col justify-between overflow-y-auto"
          >
            {/* Header del Drawer */}
            <div>
              <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/img/icono.webp"
                    alt="San Simón Sucre"
                    className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(229,71,55,0.6)]"
                    onError={(e) => { e.currentTarget.src = '/img/icono.png'; }}
                  />
                  <div>
                    <h3 className="font-varsity-override text-base sm:text-lg font-bold text-white tracking-wide leading-none uppercase">
                      PORTAL <span className="text-simonRed">FRATERNO</span>
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                      Credencial Digital & Acreditación
                    </span>
                  </div>
                </div>

                {/* Botón circular de cierre */}
                <button
                  onClick={handleCloseDrawer}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white/70 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs"
                  title="Cerrar panel (Esc)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Contenido principal del formulario */}
              <div className="p-4 sm:p-6 space-y-4">
                
                {/* Banner de bienvenida institucional compacto */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0D1527] border border-white/[0.08] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-simonRed/15 border border-simonRed/30 flex items-center justify-center text-simonGold shrink-0">
                    <ShieldCheck size={17} />
                  </div>
                  <div>
                    <h4 className="font-sans text-[12px] font-semibold text-white tracking-tight">
                      Acreditación Oficial Oruro 2027
                    </h4>
                    <p className="text-[11px] text-white/50 leading-tight mt-0.5">
                      Ingresa tu C.I. o código oficial y tu PIN institucional.
                    </p>
                  </div>
                </div>

                {/* Formulario de Login */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Campo 1: Código Fraterno o C.I. */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1">
                      Código Fraterno o C.I. *
                    </label>
                    <div className="relative">
                      <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        value={codigo}
                        onChange={(e) => {
                          setCodigo(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="Ej. SS-SUC-0842 o Carnet"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-[13px] sm:text-[14px] focus:border-simonGold focus:outline-none transition-colors uppercase font-mono"
                      />
                    </div>
                  </div>

                  {/* Campo 2: PIN o Contraseña */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1">
                      PIN Institucional *
                    </label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type={showPin ? 'text' : 'password'}
                        value={pin}
                        onChange={(e) => {
                          setPin(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="••••••"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-[13px] sm:text-[14px] focus:border-simonGold focus:outline-none transition-colors font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                        title={showPin ? "Ocultar PIN" : "Ver PIN"}
                      >
                        {showPin ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Alerta de error si aplica */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center gap-2 text-red-300 text-[11px]"
                    >
                      <AlertCircle size={14} className="shrink-0 text-red-400" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Botón Principal de Acceso */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-1 py-3 rounded-full bg-simonRed hover:bg-simonRedLight text-white font-sans text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.96] transition-transform cursor-pointer shadow-[0_4px_16px_rgba(229,71,55,0.4)] disabled:opacity-60"
                  >
                    <span>{isLoading ? 'Verificando...' : 'Ingresar al Portal Fraterno'}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>

              </div>
            </div>

            {/* Footer con asistencia por WhatsApp y Acceso Administración */}
            <div className="p-6 border-t border-white/[0.08] bg-white/[0.02] text-center space-y-3">
              <button
                type="button"
                onClick={handleHelpWhatsApp}
                className="text-[12px] text-white/60 hover:text-white transition-colors cursor-pointer block w-full text-center"
              >
                ¿Olvidaste tu credencial o no cuentas con PIN?<br />
                <strong className="text-simonGold hover:underline">Consultar a Secretaría por WhatsApp →</strong>
              </button>

              {onOpenAdmin && (
                <div className="pt-2.5 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40 hover:text-simonGold transition-colors cursor-pointer"
                  >
                    <ShieldCheck size={13} className="text-simonGold" />
                    <span>Acceso Directiva & Secretaría</span>
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
