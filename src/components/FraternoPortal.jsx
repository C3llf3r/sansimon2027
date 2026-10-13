import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle2, Download, Share2 } from 'lucide-react';

export default function FraternoPortal({ isOpen, onClose, fraternoData, onLogout }) {
  const [selectedTab, setSelectedTab] = useState('card'); // card | merits | identity

  const demoFraterno = {
    nombre: 'ALEJANDRO VARGAS C.',
    codigo: 'SS-SUC-1996-0842',
    tropa: 'TROPA MACHOS',
    antiguedad: '6 AÑOS (DESDE 2021)',
    rango: 'FRATERNO CONSAGRADO',
    asistencias: '18 / 18 (100%)',
    cuotas: 'AL DÍA',
    convite: 'HABILITADO PARA ORURO 2027',
  };

  const fraterno = fraternoData || demoFraterno;

  const badges = [
    { name: 'Primer Convite 2026', desc: 'Asistencia impecable al recorrido del Socavón', icon: '🕯️', earned: true },
    { name: 'Entrada Triunfal', desc: 'Recorrido completo en el Sábado de Peregrinación', icon: '👑', earned: true },
    { name: 'Fuerza & Ensayo', desc: 'Más de 50 horas de ensayo técnico acumuladas', icon: '⚡', earned: true },
    { name: 'Embajada Cultural', desc: 'Participación en filial internacional', icon: '🌎', earned: false },
  ];

  const merchandising = [
    { item: 'Bandera Oficial Tricolor / Simón', desc: 'Emblema sagrado que abre nuestro paso en Oruro.', icon: '🚩' },
    { item: 'Polera Conmemorativa 30 Años', desc: 'Diseño de colección con tipografía Varsity oficial.', icon: '👕' },
    { item: 'Chamarra de Viaje Simón Sucre', desc: 'Térmica de alta resistencia para el frío de Oruro.', icon: '🧥' },
    { item: 'Traje Oficial Carnaval 2027', desc: 'Bordado en hilo de oro, cascabeles forjados y botas a medida.', icon: '✨' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-[#081026]/95 border border-white/[0.12] rounded-[28px] overflow-hidden shadow-[0_30px_90px_rgba(8,16,38,0.95)] my-8 backdrop-blur-2xl"
      >
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <img 
              src="/img/icono.webp" 
              alt="San Simón Sucre" 
              className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(229,71,55,0.6)]" 
              onError={(e) => { e.currentTarget.src = '/img/icono.png'; }}
            />
            <div>
              <h3 className="font-bebas text-2xl text-white tracking-wide leading-none">
                ESPACIO FRATERNO · <span className="text-simonRed">SOY SIMÓN DE CORAZÓN</span>
              </h3>
              <p className="text-[11px] text-white/50 uppercase tracking-widest font-semibold">
                Portal Oficial de Acreditación y Mérito Institucional
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-full text-white/60 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer text-xs font-semibold"
                title="Cambiar fraterno o cerrar sesión"
              >
                Cerrar Sesión
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs"
              title="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-4 flex gap-2 border-b border-white/10 bg-black/30">
          <button
            onClick={() => setSelectedTab('card')}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              selectedTab === 'card'
                ? 'border-simonGold text-simonGold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Credencial Digital 3D
          </button>
          <button
            onClick={() => setSelectedTab('merits')}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              selectedTab === 'merits'
                ? 'border-simonGold text-simonGold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Asistencias & Méritos
          </button>
          <button
            onClick={() => setSelectedTab('identity')}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              selectedTab === 'identity'
                ? 'border-simonGold text-simonGold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Indumentaria & Trajes
          </button>
        </div>

        {/* Body Container */}
        <div className="p-6">
          
          {/* TAB 1: 3D HOLOGRAPHIC ID CARD */}
          {selectedTab === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* The Holographic Card */}
              <div className="md:col-span-7 flex justify-center">
                <div className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-br from-simonRed via-simonDark to-simonDeep border-2 border-simonGold/50 shadow-[0_15px_40px_rgba(229,71,55,0.35)] relative overflow-hidden group">
                  {/* Holographic shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/20 flex items-center justify-center p-1">
                        <img src="/img/icono.webp" alt="San Simón Sucre" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = '/img/icono.png'; }} />
                      </div>
                      <span className="font-varsity-override text-lg font-bold text-white tracking-wider">
                        SAN SIMÓN <span className="text-simonRedLight">SUCRE</span>
                      </span>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest bg-black/60 px-2 py-1 rounded text-simonGold border border-simonGold/30">
                      OFICIAL 2027
                    </span>
                  </div>

                  <div className="flex gap-4 items-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/20 flex items-center justify-center text-3xl shrink-0">
                      👑
                    </div>
                    <div>
                      <h4 className="font-bebas text-2xl text-white tracking-wide leading-tight">
                        {fraterno.nombre}
                      </h4>
                      <p className="text-xs text-simonGold font-semibold">
                        {fraterno.tropa}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        COD: {fraterno.codigo}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/50 p-3 rounded-xl border border-white/10 mb-4">
                    <div>
                      <span className="text-gray-400 block text-[9px] uppercase">Rango</span>
                      <strong className="text-white">{fraterno.rango}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[9px] uppercase">Antigüedad</span>
                      <strong className="text-white">{fraterno.antiguedad}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                      <CheckCircle2 size={16} />
                      <span>{fraterno.convite}</span>
                    </div>
                    <QrCode size={34} className="text-white/80" />
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                    Estatus de Temporada
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bebas text-white">Rumbo a Oruro 2027</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Activo
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-gray-300 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Asistencia a Ensayos:</span>
                      <strong className="text-white">{fraterno.asistencias}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cuotas Ordinarias:</span>
                      <strong className="text-emerald-400">{fraterno.cuotas}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => alert('Descargando tu Credencial Oficial en alta resolución')}
                    className="w-full py-3.5 rounded-full bg-simonRed hover:bg-simonRedLight text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.96] transition-transform cursor-pointer shadow-[0_4px_16px_rgba(229,71,55,0.4)]"
                  >
                    <Download size={16} /> Descargar Credencial Oficial
                  </button>
                  <button
                    onClick={() => alert('Enlace de verificación copiado al portapapeles')}
                    className="w-full py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer border border-white/10"
                  >
                    <Share2 size={15} /> Compartir Código de Verificación
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MERITS & BADGES */}
          {selectedTab === 'merits' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border flex items-start gap-4 ${
                    b.earned
                      ? 'bg-white/5 border-simonGold/40'
                      : 'bg-white/2 border-white/5 opacity-60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bebas text-xl text-white tracking-wide">
                        {b.name}
                      </h4>
                      {b.earned ? (
                        <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Desbloqueada
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                          En progreso
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 mt-1">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MERCHANDISING & SUITS */}
          {selectedTab === 'identity' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {merchandising.map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-simonRed/20 border border-simonRed/30 flex items-center justify-center text-xl shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="font-bebas text-xl text-simonGold tracking-wide">
                      {m.item}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>San Simón Sucre · Sistema Oficial de Fraternos</span>
          <span className="text-simonGold font-bold">Carnaval de Oruro 2027</span>
        </div>

      </motion.div>
    </div>
  );
}
