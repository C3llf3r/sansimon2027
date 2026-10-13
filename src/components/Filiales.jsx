import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Search, ArrowRight, Sparkles } from 'lucide-react';

const FILIALES_DATABASE = [
  {
    id: 'sucre',
    name: 'Sucre',
    country: 'Bolivia',
    continent: 'bolivia',
    flag: '🇧🇴',
    role: 'Sede Matriz & Cuna de la Fraternidad',
    founded: '1996 (Fundación)',
    desc: 'El corazón y origen de nuestra historia. Hogar de las directivas fundadoras, ensayos centrales y la custodia de la promesa de fe.',
    isMain: true,
  },
  {
    id: 'oruro',
    name: 'Oruro',
    country: 'Bolivia',
    continent: 'bolivia',
    flag: '🇧🇴',
    role: 'Santuario del Socavón',
    founded: 'Entrada Magistral',
    desc: 'El destino sagrado de nuestra peregrinación anual y la pasarela del mejor Carnaval del mundo, donde San Simón Sucre consagra su devoción.',
    isMain: false,
  },
  {
    id: 'la-paz',
    name: 'La Paz',
    country: 'Bolivia',
    continent: 'bolivia',
    flag: '🇧🇴',
    role: 'Sede Departamental',
    founded: 'Activa',
    desc: 'Representación oficial en la sede de gobierno, con bloques destacados en festivales culturales y festividades patronales andinas.',
    isMain: false,
  },
  {
    id: 'cochabamba',
    name: 'Cochabamba',
    country: 'Bolivia',
    continent: 'bolivia',
    flag: '🇧🇴',
    role: 'Filial Valle',
    founded: 'Activa',
    desc: 'Punto de integración nacional para universitarios y fraternos del centro del país con constante actividad coreográfica.',
    isMain: false,
  },
  {
    id: 'santa-cruz',
    name: 'Santa Cruz',
    country: 'Bolivia',
    continent: 'bolivia',
    flag: '🇧🇴',
    role: 'Filial Oriente',
    founded: 'Activa',
    desc: 'Comunidad vibrante de fraternos en el oriente boliviano, participando activamente en encuentros y ensayos de coordinación.',
    isMain: false,
  },
  {
    id: 'potosi',
    name: 'Potosí',
    country: 'Bolivia',
    continent: 'bolivia',
    flag: '🇧🇴',
    role: 'Filial Imperial',
    founded: 'Activa',
    desc: 'Fraternidad hermana conectada por la historia minera y la devoción tradicional a través de la festividad de Ch\'utillos.',
    isMain: false,
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    continent: 'america',
    flag: '🇦🇷',
    role: 'Filial Internacional',
    founded: 'Pilar Cono Sur',
    desc: 'Una de las comunidades más numerosas y apasionadas fuera de Bolivia, protagonista del Desfile de la Integración Latinoamericana.',
    isMain: false,
  },
  {
    id: 'lima',
    name: 'Lima',
    country: 'Perú',
    continent: 'america',
    flag: '🇵🇪',
    role: 'Embajada Cultural',
    founded: 'Binacional',
    desc: 'Encuentros binacionales de caporales y participación destacada en festivales de danza en la costa y sierra peruana.',
    isMain: false,
  },
  {
    id: 'santiago',
    name: 'Santiago & Norte',
    country: 'Chile',
    continent: 'america',
    flag: '🇨🇱',
    role: 'Filial Andina',
    founded: 'Activa',
    desc: 'Presencia constante en los carnavales del norte chileno (Arica e Iquique) y grupos de ensayo consolidados en la capital.',
    isMain: false,
  },
  {
    id: 'usa',
    name: 'Virginia & Miami',
    country: 'Estados Unidos',
    continent: 'america',
    flag: '🇺🇸',
    role: 'Filial Norteamérica',
    founded: 'Hispanidad',
    desc: 'Representando con orgullo la tricolor boliviana en desfiles hispanos de Washington D.C., Virginia y Florida.',
    isMain: false,
  },
  {
    id: 'madrid-barcelona',
    name: 'Madrid & Barcelona',
    country: 'España',
    continent: 'europa',
    flag: '🇪🇸',
    role: 'Coordinación Europea',
    founded: 'Sede Europa',
    desc: 'El corazón de San Simón Sucre en el continente europeo. Ensayos permanentes y participación en pasacalles interculturales.',
    isMain: false,
  },
  {
    id: 'milan',
    name: 'Milán & Bérgamo',
    country: 'Italia',
    continent: 'europa',
    flag: '🇮🇹',
    role: 'Filial Italia',
    founded: 'Activa',
    desc: 'Comunidad fervorosa en el norte de Italia que reúne a compatriotas para mantener viva la promesa a la Virgen del Socavón.',
    isMain: false,
  },
  {
    id: 'ginebra',
    name: 'Ginebra',
    country: 'Suiza',
    continent: 'europa',
    flag: '🇨🇭',
    role: 'Filial Suiza',
    founded: 'Activa',
    desc: 'Difusión de la danza y la elegancia del caporal ante auditorios internacionales y festivales de diversidad cultural.',
    isMain: false,
  },
  {
    id: 'londres',
    name: 'Londres',
    country: 'Reino Unido',
    continent: 'europa',
    flag: '🇬🇧',
    role: 'Comunidad Británica',
    founded: 'Activa',
    desc: 'Presencia de fraternos activos en eventos de la comunidad latinoamericana en el Reino Unido.',
    isMain: false,
  },
];

const TABS = [
  { id: 'todos', label: 'Todas las Sedes', count: FILIALES_DATABASE.length },
  { id: 'bolivia', label: 'Bolivia (Sede Matriz)', count: 6 },
  { id: 'america', label: 'América', count: 4 },
  { id: 'europa', label: 'Europa', count: 4 },
];

export default function Filiales({ onOpenForm }) {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiliales = useMemo(() => {
    return FILIALES_DATABASE.filter((f) => {
      const matchesTab = activeTab === 'todos' || f.continent === activeTab;
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section id="filiales" className="py-24 px-4 md:px-8 bg-simonDeep relative border-t border-white/10 overflow-hidden">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-simonBlue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-simonRed/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-simonGold text-xs uppercase tracking-widest font-bold mb-3 px-3.5 py-1.5 rounded-full bg-simonGold/10 border border-simonGold/20">
              <Globe size={14} className="text-simonGold" />
              <span>Directorio Oficial de Presencia Global</span>
            </div>
            
            <h2 className="font-editorial-title text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-4">
              La familia que<br />
              <span className="text-champagne">tú eliges.</span>
            </h2>
            
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              De Sucre para el mundo: más de 14 ciudades conectadas por el mismo latido, el mismo paso y la misma promesa de fe.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-2 self-start lg:self-auto bg-black/60 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-widest text-white">
              {FILIALES_DATABASE.length} Filiales Oficiales Activas
            </span>
          </div>
        </div>

        {/* Controls Bar: Tabs & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-10 pb-6 border-b border-white/10">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-simonRed border-simonGold text-white shadow-[0_0_15px_rgba(164,29,33,0.5)]'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-black/40 text-simonGold' : 'bg-white/10 text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] md:w-72">
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ciudad o país..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:border-simonGold focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Filiales Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredFiliales.map((filial) => (
              <motion.div
                key={filial.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`p-6 md:p-7 rounded-3xl border transition-all flex flex-col justify-between group shadow-xl ${
                  filial.isMain
                    ? 'bg-gradient-to-br from-simonRed/30 via-simonDark to-simonDeep border-simonGold/60 shadow-[0_10px_35px_rgba(164,29,33,0.35)]'
                    : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/8'
                }`}
              >
                <div>
                  {/* Top Bar with Flag & Role */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl drop-shadow-md">{filial.flag}</span>
                      <div>
                        <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide leading-none">
                          {filial.name}
                        </h3>
                        <span className="text-xs text-gray-400 font-sans font-medium">
                          {filial.country}
                        </span>
                      </div>
                    </div>

                    {filial.isMain ? (
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-simonRed text-white px-2.5 py-1 rounded-full shadow-md border border-simonRedLight">
                        Sede Matriz
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-black/50 text-simonGold px-2.5 py-1 rounded-full border border-white/10">
                        {filial.founded}
                      </span>
                    )}
                  </div>

                  <span className="text-xs uppercase font-bold tracking-wider text-simonGold block mb-2">
                    {filial.role}
                  </span>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans mb-6">
                    {filial.desc}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <MapPin size={14} className={filial.isMain ? "text-simonRed" : "text-gray-400"} />
                    <span>Convocatoria Oruro 2027</span>
                  </div>

                  <button
                    onClick={onOpenForm}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-simonRed text-white text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer group-hover:bg-simonRed"
                  >
                    <span>Unirme</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state if search has no results */}
        {filteredFiliales.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
            <Globe size={40} className="text-gray-500 mx-auto mb-3" />
            <h4 className="font-bebas text-2xl text-white">No se encontraron filiales</h4>
            <p className="text-xs text-gray-400 mt-1">
              No hay sedes que coincidan con "{searchQuery}". Intenta buscar por país o continente.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('todos'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-simonRed text-white text-xs font-bold uppercase tracking-wider"
            >
              Ver todas las sedes
            </button>
          </div>
        )}

        {/* Banner: ¿Quieres fundar una filial en tu ciudad? */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-simonRed/20 via-black/50 to-simonBlue/20 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-simonGold/10 border border-simonGold/30 flex items-center justify-center text-simonGold shrink-0">
              <Sparkles size={28} />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-simonGold block">
                Expansión Internacional San Simón Sucre
              </span>
              <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                ¿VIVES EN EL EXTERIOR Y QUIERES FUNDAR UNA FILIAL?
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                La directiva central brinda asesoramiento y acreditación oficial para abrir bloques en nuevas ciudades del mundo.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenForm}
            className="px-6 py-3.5 rounded-xl bg-simonGold hover:bg-yellow-400 text-simonDeep font-grotesk text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg cursor-pointer transition-all hover:scale-105"
          >
            <span>Iniciar Acreditación</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
