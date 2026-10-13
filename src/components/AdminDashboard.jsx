import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Lock, KeyRound, ShieldCheck, Users, Globe, Download, RefreshCw, 
  Search, Filter, CheckCircle2, Clock, AlertCircle, Phone, ArrowUpRight, 
  Trash2, MapPin, Sparkles, MessageCircle, FileSpreadsheet, ChevronDown
} from 'lucide-react';

const ADMIN_PINS = ['2027', 'SIMON2027', 'SECRETARIA2027'];

// Base oficial de las 14 filiales para el Directorio de Administración
const DIRECTORIO_FILIALES = [
  { id: 'sucre', name: 'Sucre', country: 'Bolivia', region: 'bolivia', flag: '🇧🇴', role: 'Sede Matriz & Cuna de la Fraternidad', contacto: '+591 70322221', estado: 'Convocatoria Abierta', ensayos: 'Parque Bolívar / Coliseo Universitario' },
  { id: 'oruro', name: 'Oruro', country: 'Bolivia', region: 'bolivia', flag: '🇧🇴', role: 'Santuario del Socavón (Destino Oficial)', contacto: '+591 70322221', estado: 'Ensayos Rumbo a Oruro', ensayos: 'Av. Cívica / Explanada Socavón' },
  { id: 'la-paz', name: 'La Paz', country: 'Bolivia', region: 'bolivia', flag: '🇧🇴', role: 'Sede Departamental de Gobierno', contacto: '+591 70322221', estado: 'Convocatoria Abierta', ensayos: 'Plaza Bolivia / Miraflores' },
  { id: 'cochabamba', name: 'Cochabamba', country: 'Bolivia', region: 'bolivia', flag: '🇧🇴', role: 'Filial Valle & Corazón Universitario', contacto: '+591 70322221', estado: 'Convocatoria Abierta', ensayos: 'Cala Cala / Parque del Prado' },
  { id: 'santa-cruz', name: 'Santa Cruz', country: 'Bolivia', region: 'bolivia', flag: '🇧🇴', role: 'Filial Oriente & Integración', contacto: '+591 70322221', estado: 'Convocatoria Abierta', ensayos: 'Parque Urbano Central' },
  { id: 'potosi', name: 'Potosí', country: 'Bolivia', region: 'bolivia', flag: '🇧🇴', role: 'Filial Imperial (Ch\'utillos)', contacto: '+591 70322221', estado: 'Convocatoria Abierta', ensayos: 'Plaza 10 de Noviembre' },
  { id: 'tarija', name: 'Tarija', country: 'Bolivia', region: 'bolivia', flag: '🇧🇴', role: 'Filial Guadalquivir', contacto: '+591 70322221', estado: 'Convocatoria Abierta', ensayos: 'Parque Temático' },
  { id: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina', region: 'america', flag: '🇦🇷', role: 'Filial Cono Sur & Desfile Integración', contacto: '+591 70322221', estado: 'Coordinación Internacional', ensayos: 'Parque Rivadavia / Liniers' },
  { id: 'santiago', name: 'Santiago & Norte', country: 'Chile', region: 'america', flag: '🇨🇱', role: 'Filial Andina (Arica, Iquique, Stgo)', contacto: '+591 70322221', estado: 'Coordinación Internacional', ensayos: 'Parque O\'Higgins / Arica' },
  { id: 'lima', name: 'Lima', country: 'Perú', region: 'america', flag: '🇵🇪', role: 'Embajada Cultural Binacional', contacto: '+591 70322221', estado: 'Coordinación Internacional', ensayos: 'Campo de Marte' },
  { id: 'usa', name: 'Virginia & Miami', country: 'Estados Unidos', region: 'america', flag: '🇺🇸', role: 'Filial Norteamérica', contacto: '+591 70322221', estado: 'Coordinación Internacional', ensayos: 'Arlington / Washington D.C.' },
  { id: 'madrid', name: 'Madrid & Barcelona', country: 'España', region: 'europa', flag: '🇪🇸', role: 'Coordinación Central Europea', contacto: '+591 70322221', estado: 'Coordinación Europea', ensayos: 'Parque del Retiro / Tetuán' },
  { id: 'milan', name: 'Milán & Bérgamo', country: 'Italia', region: 'europa', flag: '🇮🇹', role: 'Filial Italia & Lombardía', contacto: '+591 70322221', estado: 'Coordinación Europea', ensayos: 'Parco Sempione' },
  { id: 'ginebra', name: 'Ginebra & Londres', country: 'Suiza & UK', region: 'europa', flag: '🇨🇭', role: 'Filial Suiza & Reino Unido', contacto: '+591 70322221', estado: 'Coordinación Europea', ensayos: 'Parc des Bastions' },
];

export default function AdminDashboard({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  
  // Tabs: 'postulantes' | 'directorio' | 'estadisticas'
  const [activeTab, setActiveTab] = useState('postulantes');

  // Datos de postulantes
  const [postulantes, setPostulantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroTropa, setFiltroTropa] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroRegionDir, setFiltroRegionDir] = useState('todos');
  const [busquedaDir, setBusquedaDir] = useState('');

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Cargar postulantes al autenticarse o abrir
  const fetchPostulantes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/postulantes');
      if (res.ok) {
        const data = await res.json();
        setPostulantes(data.postulantes || []);
      }
    } catch (err) {
      console.error('[Admin] Error cargando postulantes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchPostulantes();
    }
  }, [isOpen, isAuthenticated]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setPinError('');
    const clean = pinInput.trim().toUpperCase();
    if (ADMIN_PINS.includes(clean)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPinInput('');
    } else {
      setPinError('PIN de administración incorrecto. Consulta con Secretaría.');
    }
  };

  const handleLogoutAdmin = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Cambiar estado de un postulante
  const handleUpdateEstado = async (codigo, nuevoEstado) => {
    try {
      const res = await fetch(`/postulantes/${encodeURIComponent(codigo)}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (res.ok) {
        setPostulantes(prev => prev.map(p => p.codigo === codigo ? { ...p, estado: nuevoEstado } : p));
      }
    } catch (err) {
      console.error('[Admin] Error actualizando estado:', err);
    }
  };

  // Eliminar postulante
  const handleDeletePostulante = async (codigo, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar el registro de ${nombre} (${codigo})?`)) return;
    try {
      const res = await fetch(`/postulantes/${encodeURIComponent(codigo)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPostulantes(prev => prev.filter(p => p.codigo !== codigo));
      }
    } catch (err) {
      console.error('[Admin] Error eliminando postulante:', err);
    }
  };

  // Enviar mensaje de citación oficial por WhatsApp
  const handleContactarWhatsApp = (postulante) => {
    const cleanPhone = (postulante.telefono || '').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `🔴🔵 *CITACIÓN A ENTREVISTA - CAPORALES SAN SIMÓN SUCRE* 🔴🔵\n\n` +
      `¡Hola *${postulante.nombre}*! Te saludamos desde la Secretaría General de San Simón Sucre.\n\n` +
      `Confirmamos tu postulación oficial para el bloque *${postulante.tropa}* con el código *${postulante.codigo}*.\n\n` +
      `📅 *FECHAS DE AUDICIÓN:* 12 y 13 de Noviembre de 2026.\n` +
      `📍 *SEDE:* ${postulante.sede}\n` +
      `👟 *INDUMENTARIA:* Ropa deportiva cómoda para la prueba de coordinación y ritmo.\n` +
      `🪪 *REQUISITOS:* Cédula de Identidad original + 1 fotocopia.\n\n` +
      `Por favor confirma tu recepción respondiendo a este mensaje. ¡Rumbo a Oruro 2027! 🔵🔴`
    );
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${msg}`, '_blank');
  };

  // Exportar lista a CSV / Excel con UTF-8 BOM
  const handleExportCSV = () => {
    if (postulantes.length === 0) {
      alert('No hay postulantes registrados para exportar.');
      return;
    }

    const headers = ['Código Oficial', 'Nombre Completo', 'Bloque / Tropa', 'Sede', 'Teléfono', 'Email', 'Experiencia', 'Estado', 'Fecha Registro'];
    const rows = postulantes.map(p => [
      `"${p.codigo || ''}"`,
      `"${(p.nombre || '').replace(/"/g, '""')}"`,
      `"${p.tropa || ''}"`,
      `"${p.sede || ''}"`,
      `"${p.telefono || ''}"`,
      `"${p.email || ''}"`,
      `"${(p.experiencia || '').replace(/"/g, '""')}"`,
      `"${p.estado || 'Pendiente'}"`,
      `"${p.fechaRegistro ? new Date(p.fechaRegistro).toLocaleString('es-BO') : ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Postulantes_SanSimonSucre_Oruro2027_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtrado de postulantes
  const postulantesFiltrados = useMemo(() => {
    return postulantes.filter(p => {
      const matchTexto = 
        (p.nombre || '').toLowerCase().includes(filtroTexto.toLowerCase()) ||
        (p.codigo || '').toLowerCase().includes(filtroTexto.toLowerCase()) ||
        (p.telefono || '').includes(filtroTexto) ||
        (p.sede || '').toLowerCase().includes(filtroTexto.toLowerCase());

      const matchTropa = filtroTropa === 'todos' || (p.tropa || '').toLowerCase().includes(filtroTropa.toLowerCase());
      const matchEstado = filtroEstado === 'todos' || (p.estado || 'Pendiente') === filtroEstado;

      return matchTexto && matchTropa && matchEstado;
    });
  }, [postulantes, filtroTexto, filtroTropa, filtroEstado]);

  // Filtrado de directorio
  const directorioFiltrado = useMemo(() => {
    return DIRECTORIO_FILIALES.filter(f => {
      const matchTexto = 
        f.name.toLowerCase().includes(busquedaDir.toLowerCase()) ||
        f.country.toLowerCase().includes(busquedaDir.toLowerCase()) ||
        f.role.toLowerCase().includes(busquedaDir.toLowerCase());
      const matchRegion = filtroRegionDir === 'todos' || f.region === filtroRegionDir;
      return matchTexto && matchRegion;
    });
  }, [busquedaDir, filtroRegionDir]);

  // Métricas
  const totalPostulantes = postulantes.length;
  const totalSucre = postulantes.filter(p => (p.sede || '').toLowerCase().includes('sucre')).length;
  const totalFiliales = totalPostulantes - totalSucre;
  const totalAprobados = postulantes.filter(p => p.estado === 'Aprobado').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-7xl bg-[#081026] border border-white/[0.12] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(8,16,38,0.98)] my-4 flex flex-col max-h-[92vh]"
      >
        {/* ========================================================
            HEADER PRINCIPAL DEL PANEL
            ======================================================== */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3.5">
            <img
              src="/img/icono.webp"
              alt="San Simón Sucre"
              className="w-10 h-10 object-contain drop-shadow-[0_0_14px_rgba(229,71,55,0.7)]"
              onError={(e) => { e.currentTarget.src = '/img/icono.png'; }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-varsity-override text-lg sm:text-2xl font-bold text-white tracking-wide leading-none uppercase">
                  PANEL <span className="text-simonRed">ADMINISTRACIÓN</span> & SECRETARÍA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> En Vivo
                </span>
              </div>
              <p className="text-[11px] text-white/50 uppercase tracking-wider font-medium mt-0.5">
                Caporales San Simón Sucre · Gestión Oruro 2027
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isAuthenticated && (
              <button
                onClick={handleLogoutAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/60 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all cursor-pointer"
                title="Bloquear acceso de administración"
              >
                <Lock size={12} />
                <span>Bloquear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white/70 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              title="Cerrar panel (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ========================================================
            SI NO ESTÁ AUTENTICADO: PANTALLA DE ACCESO POR PIN
            ======================================================== */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-simonGold/10 border border-simonGold/30 flex items-center justify-center text-simonGold mb-6 shadow-lg">
              <KeyRound size={30} />
            </div>

            <h3 className="font-bebas text-3xl text-white tracking-wide">
              ACCESO RESTRINGIDO A SECRETARÍA
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1 mb-6 leading-relaxed">
              Ingresa el PIN institucional de directiva para desbloquear el padrón de postulantes y el directorio oficial.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="PIN de Administración"
                  className="w-full text-center tracking-[0.3em] font-mono text-lg py-3 px-4 rounded-2xl bg-[#0D1527] border border-white/15 text-white placeholder-white/30 focus:border-simonGold focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl flex items-center justify-center gap-2">
                  <AlertCircle size={14} />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-simonRed hover:bg-simonRedLight text-white font-sans text-xs uppercase font-bold tracking-wider transition-all shadow-[0_4px_20px_rgba(229,71,55,0.4)] cursor-pointer active:scale-95"
              >
                Desbloquear Panel
              </button>

              <p className="text-[11px] text-white/40 pt-2">
                PIN de acceso predeterminado: <strong className="text-simonGold">2027</strong>
              </p>
            </form>
          </div>
        ) : (
          /* ========================================================
              VISTA PRINCIPAL AUTENTICADA (TABS & CONTENIDO)
              ======================================================== */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* BARRA DE NAVEGACIÓN DE PESTAÑAS */}
            <div className="px-5 sm:px-8 border-b border-white/[0.08] flex items-center justify-between bg-black/20 shrink-0 overflow-x-auto">
              <div className="flex gap-2 sm:gap-4">
                <button
                  onClick={() => setActiveTab('postulantes')}
                  className={`py-3.5 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'postulantes'
                      ? 'border-simonGold text-simonGold'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <Users size={16} />
                  <span>Padrón de Postulantes</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white">
                    {postulantes.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('directorio')}
                  className={`py-3.5 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'directorio'
                      ? 'border-simonGold text-simonGold'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <Globe size={16} />
                  <span>Directorio de Filiales</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white">
                    14
                  </span>
                </button>
              </div>

              {/* Botones de acción rápida en la barra */}
              <div className="flex items-center gap-2 py-2">
                <button
                  onClick={fetchPostulantes}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  title="Actualizar datos del servidor"
                >
                  <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                  <span className="hidden sm:inline">Refrescar</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 rounded-xl bg-simonGold/15 hover:bg-simonGold text-simonGold hover:text-[#081026] border border-simonGold/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  title="Descargar lista de postulantes en formato CSV/Excel"
                >
                  <FileSpreadsheet size={14} />
                  <span>Exportar Excel</span>
                </button>
              </div>
            </div>

            {/* ========================================================
                CONTENIDO DE LA PESTAÑA: POSTULANTES
                ======================================================== */}
            {activeTab === 'postulantes' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Métricas Principales */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-[#0D1527] border border-white/[0.08] flex flex-col justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-white/50">Total Postulantes</span>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-bebas text-3xl sm:text-4xl text-white font-bold">{totalPostulantes}</span>
                      <Users size={20} className="text-simonRed" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D1527] border border-white/[0.08] flex flex-col justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-white/50">Sede Sucre (Matriz)</span>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-bebas text-3xl sm:text-4xl text-simonGold font-bold">{totalSucre}</span>
                      <MapPin size={20} className="text-simonGold" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D1527] border border-white/[0.08] flex flex-col justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-white/50">Otras Filiales</span>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-bebas text-3xl sm:text-4xl text-blue-400 font-bold">{totalFiliales}</span>
                      <Globe size={20} className="text-blue-400" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D1527] border border-white/[0.08] flex flex-col justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-white/50">Aprobados / Concluidos</span>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-bebas text-3xl sm:text-4xl text-emerald-400 font-bold">{totalAprobados}</span>
                      <CheckCircle2 size={20} className="text-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Barra de Filtros y Búsqueda */}
                <div className="p-4 rounded-2xl bg-[#0D1527]/80 border border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      value={filtroTexto}
                      onChange={(e) => setFiltroTexto(e.target.value)}
                      placeholder="Buscar por nombre, código (#ADM-2027), teléfono o ciudad..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/40 text-xs focus:border-simonGold focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto">
                    {/* Filtro por Tropa */}
                    <select
                      value={filtroTropa}
                      onChange={(e) => setFiltroTropa(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#081026] border border-white/15 text-white text-xs focus:border-simonGold focus:outline-none cursor-pointer"
                    >
                      <option value="todos">Todos los Bloques</option>
                      <option value="machos">Machos</option>
                      <option value="cholitas">Cholitas</option>
                      <option value="figura">Figuras (Chinas / Machas)</option>
                      <option value="jayas">Jayas</option>
                      <option value="kachas">Kachas & Charcas</option>
                    </select>

                    {/* Filtro por Estado */}
                    <select
                      value={filtroEstado}
                      onChange={(e) => setFiltroEstado(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#081026] border border-white/15 text-white text-xs focus:border-simonGold focus:outline-none cursor-pointer"
                    >
                      <option value="todos">Todos los Estados</option>
                      <option value="Pendiente">Pendientes</option>
                      <option value="Citado">Citados a Entrevista</option>
                      <option value="Aprobado">Aprobados Oruro 2027</option>
                      <option value="No presentado">No Presentados</option>
                    </select>
                  </div>
                </div>

                {/* Tabla de Postulantes */}
                <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0D1527]/50">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-white/80">
                      <thead className="bg-white/[0.03] border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                        <tr>
                          <th className="py-3 px-4">Código Oficial</th>
                          <th className="py-3 px-4">Postulante</th>
                          <th className="py-3 px-4">Bloque / Tropa</th>
                          <th className="py-3 px-4">Sede</th>
                          <th className="py-3 px-4">WhatsApp</th>
                          <th className="py-3 px-4">Fecha</th>
                          <th className="py-3 px-4">Estado</th>
                          <th className="py-3 px-4 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {postulantesFiltrados.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-white/40">
                              <Users size={32} className="mx-auto mb-2 opacity-50" />
                              <p className="text-sm font-medium">No se encontraron postulantes con esos filtros.</p>
                            </td>
                          </tr>
                        ) : (
                          postulantesFiltrados.map((p, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-simonGold whitespace-nowrap">
                                {p.codigo || `#ADM-2027-${idx + 1000}`}
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="font-semibold text-white">{p.nombre}</div>
                                {p.email && <div className="text-[10px] text-white/40">{p.email}</div>}
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap font-medium text-white/90">
                                {p.tropa}
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/70">
                                  <MapPin size={10} className="text-simonRed" />
                                  {p.sede}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleContactarWhatsApp(p)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all font-mono text-[11px] cursor-pointer"
                                  title="Abrir chat de WhatsApp para citar a entrevista"
                                >
                                  <MessageCircle size={12} />
                                  <span>{p.telefono || 'Sin teléfono'}</span>
                                </button>
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap text-white/50 text-[11px]">
                                {p.fechaRegistro ? new Date(p.fechaRegistro).toLocaleDateString('es-BO') : 'Reciente'}
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <select
                                  value={p.estado || 'Pendiente'}
                                  onChange={(e) => handleUpdateEstado(p.codigo, e.target.value)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer focus:outline-none ${
                                    p.estado === 'Aprobado'
                                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                      : p.estado === 'Citado'
                                      ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                                      : p.estado === 'No presentado'
                                      ? 'bg-red-500/15 text-red-400 border-red-500/30'
                                      : 'bg-simonGold/15 text-simonGold border-simonGold/30'
                                  }`}
                                >
                                  <option value="Pendiente" className="bg-[#081026] text-white">Pendiente</option>
                                  <option value="Citado" className="bg-[#081026] text-white">Citado</option>
                                  <option value="Aprobado" className="bg-[#081026] text-white">Aprobado</option>
                                  <option value="No presentado" className="bg-[#081026] text-white">No presentado</option>
                                </select>
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleContactarWhatsApp(p)}
                                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-emerald-500/20 text-white/60 hover:text-emerald-400 border border-white/10 transition-all cursor-pointer"
                                    title="Enviar citación por WhatsApp"
                                  >
                                    <MessageCircle size={13} />
                                  </button>

                                  <button
                                    onClick={() => handleDeletePostulante(p.codigo, p.nombre)}
                                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-white/60 hover:text-red-400 border border-white/10 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                CONTENIDO DE LA PESTAÑA: DIRECTORIO DE FILIALES
                ======================================================== */}
            {activeTab === 'directorio' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Cabecera del Directorio */}
                <div className="p-4 rounded-2xl bg-[#0D1527]/80 border border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      value={busquedaDir}
                      onChange={(e) => setBusquedaDir(e.target.value)}
                      placeholder="Buscar por sede, país o rol de filial..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/40 text-xs focus:border-simonGold focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto">
                    {[
                      { id: 'todos', label: 'Todas las Sedes (14)' },
                      { id: 'bolivia', label: '🇧🇴 Bolivia (7)' },
                      { id: 'america', label: '🌎 América (4)' },
                      { id: 'europa', label: '🇪🇺 Europa (3)' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setFiltroRegionDir(tab.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          filtroRegionDir === tab.id
                            ? 'bg-simonGold text-[#081026] font-bold'
                            : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grilla de Sedes del Directorio */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {directorioFiltrado.map(filial => (
                    <div
                      key={filial.id}
                      className="p-5 rounded-2xl bg-[#0D1527] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{filial.flag}</span>
                            <div>
                              <h4 className="font-varsity-override text-lg font-bold text-white tracking-wide leading-none">
                                {filial.name}
                              </h4>
                              <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">
                                {filial.country}
                              </span>
                            </div>
                          </div>

                          <span className={`px-2 py-0.5 rounded-md text-[9px] uppercase font-bold tracking-wider border ${
                            filial.id === 'sucre'
                              ? 'bg-simonRed/20 text-simonRed border-simonRed/30'
                              : 'bg-simonGold/15 text-simonGold border-simonGold/30'
                          }`}>
                            {filial.estado}
                          </span>
                        </div>

                        <p className="text-[11px] text-simonGold font-semibold mb-2">
                          {filial.role}
                        </p>

                        <div className="text-[11px] text-white/60 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.05] mb-4 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={11} className="text-simonRed shrink-0" />
                            <span className="truncate"><strong>Lugar de Ensayos:</strong> {filial.ensayos}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone size={11} className="text-emerald-400 shrink-0" />
                            <span><strong>Contacto Central:</strong> {filial.contacto}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                        <button
                          onClick={() => {
                            const msg = encodeURIComponent(`Hola Coordinación San Simón Sucre, solicito información sobre la filial ${filial.name} (${filial.country}).`);
                            window.open(`https://api.whatsapp.com/send?phone=59170322221&text=${msg}`, '_blank');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-emerald-500/20 text-white/80 hover:text-emerald-400 border border-white/10 text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <MessageCircle size={12} />
                          <span>Contactar Coordinación</span>
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`https://sansimonsucre.nerosystem.solutions`);
                            alert(`Enlace copiado para la filial ${filial.name}`);
                          }}
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-white/50 hover:text-white transition-all cursor-pointer"
                          title="Copiar enlace oficial"
                        >
                          <ArrowUpRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

      </motion.div>
    </div>
  );
}
