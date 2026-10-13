import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Send, Phone, User, Mail, MapPin } from 'lucide-react';

const TROPAS = [
  { id: 'machos', name: 'Tropa Machos', desc: 'Fuerza, cascabel y gallardía' },
  { id: 'cholitas', name: 'Tropa Cholitas', desc: 'Cadencia, elegancia y tradición' },
  { id: 'chinas', name: 'Figura Chinas', desc: 'Ritmo imponente y donaire' },
  { id: 'machas', name: 'Figura Machas', desc: 'Destreza y liderazgo escénico' },
  { id: 'kachas', name: 'Kachas / Acróbatas', desc: 'Saltos y carisma total' },
  { id: 'charcas', name: 'Bloque Charcas', desc: 'Brillo y devoción folclórica' },
];

export default function ConvocatoriaModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Datos | 2: Tropa/Test | 3: Pase Confirmado
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: 'Sucre',
    tropa: 'machos',
    experiencia: 'Principiante (Con muchas ganas de aprender)',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [admissionCode] = useState(() => `#ADM-2027-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.nombre || !formData.telefono) {
        alert('Por favor, ingresa tu nombre y número de teléfono.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Registrar en el padrón de secretaría al completar el formulario
      const selectedTropaObj = TROPAS.find(t => t.id === formData.tropa);
      fetch('/postulantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo: admissionCode,
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          sede: formData.ciudad,
          tropa: selectedTropaObj?.name || formData.tropa,
          experiencia: formData.experiencia,
          estado: 'Pendiente',
          origen: 'Formulario Web Oficial'
        })
      }).catch(err => console.error('[Postulante Save Error]', err));

      setStep(3);
    }
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
      `🔵🔴 *BLOQUE:* ${selectedTropaObj?.name || formData.tropa}\n` +
      `⭐ *EXPERIENCIA:* ${formData.experiencia}\n\n` +
      `Quedo a la espera de mis indicaciones y enlace de grupo.`
    );
    window.open(`https://api.whatsapp.com/send?phone=59170322221&text=${mensaje}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-[#081026]/95 border border-white/[0.12] rounded-[28px] overflow-hidden shadow-[0_30px_90px_rgba(8,16,38,0.95)] my-6 backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-simonGold block">
              Proceso de Admisión · Paso {step} de 3
            </span>
            <h3 className="font-bebas text-2xl text-white tracking-wide">
              CONVOCATORIA <span className="text-simonRed">ORURO 2027</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/[0.04] h-1">
          <div
            className="bg-gradient-to-r from-simonRed to-simonGold h-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="text-[14px] text-white/70 leading-relaxed font-normal">
                Completa tus datos para agendar tu entrevista de admisión los días <strong>12 y 13 de Noviembre</strong>.
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1.5">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User size={17} className="absolute left-4 top-3.5 text-white/40" />
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-[14px] focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1.5">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={17} className="absolute left-4 top-3.5 text-white/40" />
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+591 7..."
                      className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-[14px] focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1.5">
                    Ciudad de Residencia
                  </label>
                  <div className="relative">
                    <MapPin size={17} className="absolute left-4 top-3.5 text-white/40" />
                    <select
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-full bg-[#0D1527] border border-white/[0.08] text-white text-[14px] focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Sucre">Sucre (Sede)</option>
                      <option value="Oruro">Oruro</option>
                      <option value="La Paz">La Paz</option>
                      <option value="Cochabamba">Cochabamba</option>
                      <option value="Santa Cruz">Santa Cruz</option>
                      <option value="Potosi">Potosí</option>
                      <option value="Exterior">Exterior (Internacional)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1.5">
                  Correo Electrónico (Opcional)
                </label>
                <div className="relative">
                  <Mail size={17} className="absolute left-4 top-3.5 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-[14px] focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-full bg-simonRed hover:bg-simonRedLight text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.96] transition-transform cursor-pointer shadow-[0_4px_16px_rgba(164,29,33,0.35)]"
              >
                <span>Continuar a Selección de Bloque</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* STEP 2: Tropa Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-[14px] text-white/70 leading-relaxed font-normal">
                Selecciona la tropa o bloque al que aspiras ingresar:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {TROPAS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, tropa: t.id })}
                    className={`p-3.5 rounded-[18px] border text-left transition-all duration-150 cursor-pointer active:scale-95 ${
                      formData.tropa === t.id
                        ? 'bg-simonRed/20 border-simonGold shadow-md'
                        : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="font-bebas text-lg text-white leading-tight">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-white/50 mt-0.5">
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-[11px] uppercase font-semibold tracking-wider text-white/60 mb-1.5">
                  ¿Tienes experiencia bailando caporal?
                </label>
                <select
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  className="w-full p-3 rounded-full bg-[#0D1527] border border-white/[0.08] text-white text-[14px] focus:border-white/30 focus:outline-none appearance-none cursor-pointer px-4"
                >
                  <option value="Principiante (Con muchas ganas de aprender)">Principiante (Desde cero, gran entusiasmo)</option>
                  <option value="Intermedio (He bailado en fraternidades locales)">Intermedio (He bailado en otras agrupaciones)</option>
                  <option value="Avanzado (He bailado en el Carnaval de Oruro)">Avanzado (He participado en Oruro)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-full bg-white/[0.06] text-white/70 text-[12px] font-semibold uppercase tracking-wider hover:bg-white/[0.1] active:scale-95 transition-transform cursor-pointer border border-white/[0.08]"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-2/3 py-3 rounded-full bg-simonRed hover:bg-simonRedLight text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.96] transition-transform cursor-pointer shadow-[0_4px_16px_rgba(229,71,55,0.4)]"
                >
                  <span>Generar Pase de Admisión</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Digital Pass & Confirmation */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mx-auto">
                <CheckCircle2 size={30} />
              </div>

              <div>
                <h4 className="font-bebas text-3xl text-white tracking-wide">
                  ¡POSTULACIÓN REGISTRADA CON ÉXITO!
                </h4>
                <p className="text-[13px] text-white/70 mt-1 max-w-sm mx-auto leading-relaxed">
                  Tu perfil para la Convocatoria Oruro 2027 ha sido pre-aprobado. Conserva este pase digital para tus entrevistas presenciales.
                </p>
              </div>

              {/* Digital Admission Ticket - Apple Wallet Style */}
              <div className="p-5 rounded-[22px] bg-[#0D1527]/90 border border-simonGold/40 text-left relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start border-b border-white/[0.08] pb-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-widest text-simonGold">
                      PASE OFICIAL DE POSTULANTE
                    </span>
                    <h5 className="font-bebas text-2xl text-white">
                      {formData.nombre.toUpperCase()}
                    </h5>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-white/80 bg-white/[0.08] px-2.5 py-1 rounded-full border border-white/10">
                    {admissionCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[12px] text-white/70 mb-3">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-medium">Bloque Elegido</span>
                    <strong className="text-white">
                      {TROPAS.find(t => t.id === formData.tropa)?.name}
                    </strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-medium">Sede de Postulación</span>
                    <strong className="text-white">{formData.ciudad}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-[14px] bg-simonRed/15 border border-simonRed/25 text-[11px] text-white/80">
                  📅 <strong>Fecha de entrevistas:</strong> 12 y 13 de Noviembre de 2026.<br />
                  📍 Lugar y horario asignado te serán confirmados por WhatsApp.
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.96] transition-transform cursor-pointer shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
                >
                  <Send size={16} />
                  <span>Confirmar Registro por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full bg-white/[0.06] text-white/60 text-[12px] font-semibold uppercase tracking-wider hover:bg-white/[0.1] hover:text-white active:scale-95 transition-all cursor-pointer border border-white/[0.08]"
                >
                  Cerrar y Volver al Sitio
                </button>
              </div>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
}
