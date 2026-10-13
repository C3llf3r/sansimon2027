import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Send, Phone, User, MapPin, X, Sparkles } from 'lucide-react';

// Regla oficial San Simón Sucre: Postulantes nuevos solo pueden aspirar a Machos o Cholitas
const TROPAS = [
  { id: 'machos', name: 'Tropa Machos', icon: '⚔️', desc: 'Fuerza & Cascabel' },
  { id: 'cholitas', name: 'Tropa Cholitas', icon: '💃', desc: 'Cadencia & Gracia' },
];

const SEDES = [
  { id: 'Sucre', label: 'Sucre (Sede Matriz)' },
  { id: 'Oruro', label: 'Oruro' },
  { id: 'La Paz', label: 'La Paz' },
  { id: 'Cochabamba', label: 'Cochabamba' },
  { id: 'Santa Cruz', label: 'Santa Cruz' },
  { id: 'Potosi', label: 'Potosí' },
  { id: 'Tarija', label: 'Tarija' },
  { id: 'Exterior', label: 'Filial Internacional' },
];

export default function ConvocatoriaModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Datos & Bloque | 2: Pase Confirmado
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: 'Sucre',
    tropa: 'machos',
  });

  const [admissionCode] = useState(() => `#ADM-2027-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.telefono.trim()) {
      alert('Por favor, ingresa tu nombre y número de teléfono.');
      return;
    }

    const selectedTropaObj = TROPAS.find(t => t.id === formData.tropa);

    // Registro automático en el padrón de secretaría
    fetch('/postulantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        codigo: admissionCode,
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.trim(),
        sede: formData.ciudad,
        tropa: selectedTropaObj?.name || 'Tropa Machos',
        estado: 'Pendiente',
        origen: 'Formulario Web Oficial',
      }),
    }).catch(err => console.error('[Postulante Save Error]', err));

    setStep(2);
  };

  const handleWhatsApp = () => {
    const selectedTropaObj = TROPAS.find(t => t.id === formData.tropa);
    const mensaje = encodeURIComponent(
      `🔴🔵 ¡CONFIRMACIÓN DE POSTULACIÓN - SAN SIMÓN SUCRE! 🔴🔵\n\n` +
      `¡Hola San Simón Sucre! Confirmo mi postulación oficial al Carnaval de Oruro 2027.\n\n` +
      `🪪 *CÓDIGO:* ${admissionCode}\n` +
      `👤 *NOMBRE:* ${formData.nombre}\n` +
      `📞 *TELÉFONO:* ${formData.telefono}\n` +
      `📍 *SEDE:* ${formData.ciudad}\n` +
      `🔵🔴 *BLOQUE:* ${selectedTropaObj?.name || 'Tropa Machos'}\n\n` +
      `Quedo a la espera de mis indicaciones y rol de entrevistas.`
    );
    window.open(`https://api.whatsapp.com/send?phone=59170322221&text=${mensaje}`, '_blank');
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden">
      
      {/* Telón de fondo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-transparent cursor-pointer"
      />

      {/* Modal / Bottom Sheet Nativo */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative z-10 w-full max-w-lg bg-[#081026] border-t sm:border border-white/10 rounded-t-[26px] sm:rounded-[28px] overflow-hidden shadow-[0_-15px_45px_rgba(8,16,38,0.95)] max-h-[92vh] flex flex-col"
      >
        {/* Manija táctil superior (Solo móvil) */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-2.5 mb-0.5 sm:hidden" />

        {/* Header Compacto */}
        <div className="px-5 py-3 sm:px-6 sm:py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <img
              src="/img/icono.png"
              alt="San Simón Sucre"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_0_10px_rgba(229,71,55,0.6)]"
            />
            <div>
              <h3 className="font-varsity-override text-base sm:text-lg font-bold text-white tracking-wide leading-none uppercase">
                CONVOCATORIA <span className="text-simonRed">ORURO 2027</span>
              </h3>
              <span className="text-[10px] uppercase tracking-wider text-simonGold font-semibold">
                {step === 1 ? 'Paso 1: Postulación Oficial' : 'Paso 2: Pase de Admisión'}
              </span>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white/70 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs"
            title="Cerrar (Esc)"
          >
            <X size={15} />
          </button>
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          
          {/* ========================================================
              PASO 1: SELECCIÓN RÁPIDA & DATOS (Cero Scroll en Móvil)
              ======================================================== */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* 1. Selector de Tropa (2 Botones Segmentados Exclusivos) */}
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-simonGold mb-1.5">
                  Elige tu Tropa de Postulación *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TROPAS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, tropa: t.id })}
                      className={`py-2.5 px-3 rounded-2xl border text-center transition-all duration-150 cursor-pointer active:scale-95 flex flex-col items-center justify-center ${
                        formData.tropa === t.id
                          ? 'bg-simonRed/20 border-simonGold shadow-[0_0_15px_rgba(212,168,83,0.25)]'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{t.icon}</span>
                        <span className="font-bebas text-lg sm:text-xl text-white tracking-wide leading-none">
                          {t.name}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-white/50 mt-0.5 font-medium">
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Campo: Nombre Completo */}
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-[13px] sm:text-[14px] focus:border-simonGold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 3. Campo: Teléfono WhatsApp & Sede en 2 columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1">
                    WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+591 7..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-[13px] sm:text-[14px] focus:border-simonGold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1">
                    Sede de Postulación
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <select
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0D1527] border border-white/10 text-white text-[13px] sm:text-[14px] focus:border-simonGold focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {SEDES.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Aviso breve de fechas */}
              <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px] text-white/70">
                <span className="text-simonGold font-semibold">Audiciones Oficiales:</span>
                <span className="text-white/60 font-medium">12 y 13 de Noviembre</span>
              </div>

              {/* Botón de Envío Principal */}
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-full bg-simonRed hover:bg-simonRedLight text-white font-sans text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.96] transition-transform cursor-pointer shadow-[0_4px_16px_rgba(229,71,55,0.4)]"
              >
                <span>Generar Pase de Admisión</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}

          {/* ========================================================
              PASO 2: PASE DIGITAL CONFIRMADO (Listo para WhatsApp)
              ======================================================== */}
          {step === 2 && (
            <div className="space-y-4 text-center">
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mx-auto">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                  ¡POSTULACIÓN REGISTRADA!
                </h4>
                <p className="text-[12px] text-white/70 mt-0.5 leading-relaxed max-w-xs mx-auto">
                  Tu pase digital está listo. Confírmalo ahora por WhatsApp con Secretaría para recibir tu rol de horarios.
                </p>
              </div>

              {/* Tarjeta Pase Digital Tipo Ticket */}
              <div className="p-4 rounded-2xl bg-[#0D1527] border border-simonGold/40 text-left shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-white/[0.08] pb-2.5 mb-2.5">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-simonGold block">
                      PASE OFICIAL DE POSTULANTE
                    </span>
                    <h5 className="font-bebas text-xl text-white leading-tight">
                      {formData.nombre.toUpperCase()}
                    </h5>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-simonGold bg-white/[0.06] px-2 py-0.5 rounded-md border border-white/10">
                    {admissionCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase font-semibold">Bloque</span>
                    <strong className="text-white">
                      {TROPAS.find(t => t.id === formData.tropa)?.name}
                    </strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase font-semibold">Sede</span>
                    <strong className="text-white">{formData.ciudad}</strong>
                  </div>
                </div>

                <div className="mt-2.5 p-2 rounded-xl bg-simonRed/15 border border-simonRed/25 text-[10px] text-white/80">
                  📅 <strong>Entrevistas:</strong> 12 y 13 Noviembre · Indumentaria deportiva.
                </div>
              </div>

              {/* Botón de Enlace WhatsApp */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.96] transition-transform cursor-pointer shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
                >
                  <Send size={15} />
                  <span>Confirmar por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-2 rounded-full bg-white/[0.04] text-white/50 text-[11px] font-semibold uppercase tracking-wider hover:text-white transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
}
