import React, { useState } from 'react';
import { Game } from '../types';

interface LibraryScreenProps {
  games: Game[];
  onSelectGame: (gameId: string) => void;
  showToast: (msg: string) => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  games,
  onSelectGame,
  showToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'installed' | 'cloud' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNeonDownloading, setIsNeonDownloading] = useState<boolean>(true);
  const [neonProgress, setNeonProgress] = useState<number>(74);

  const galaxyRaiders = games.find((g) => g.id === 'galaxy-raiders') || games[0];
  const turboCircuit = games.find((g) => g.id === 'turbo-circuit') || games[2];
  const neonNexus = games.find((g) => g.id === 'neon-nexus') || games[1];
  const shadowProtocol = games.find((g) => g.id === 'shadow-protocol') || games[3];

  const toggleDownload = () => {
    setIsNeonDownloading(!isNeonDownloading);
    showToast(isNeonDownloading ? 'Descarga pausada' : 'Descarga reanudada (45.2 MB/s)');
    if (!isNeonDownloading) {
      setNeonProgress((prev) => Math.min(100, prev + 5));
    }
  };

  const handleLaunchGame = (title: string) => {
    showToast(`Iniciando ${title}... Sincronizando datos en la nube.`);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 animate-in fade-in duration-300">
      {/* Header & Status Area */}
      <div className="pt-2 pb-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-[#e5e0ee] tracking-tight font-headline">
              Mi Biblioteca
            </h1>
            <p className="text-[11px] font-semibold text-[#ccc3d8] uppercase tracking-wider">
              18 Juegos Adquiridos
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              aria-label="Buscar juegos"
              className="w-10 h-10 rounded-full bg-[#201e28] flex items-center justify-center text-[#ccc3d8] hover:text-[#e5e0ee] active:scale-95 transition-all shadow-sm cursor-pointer"
              onClick={() => {
                const el = document.getElementById('library-search-input');
                el?.focus();
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button
              aria-label="Ordenar y filtrar"
              className="w-10 h-10 rounded-full bg-[#201e28] flex items-center justify-center text-[#ccc3d8] hover:text-[#e5e0ee] active:scale-95 transition-all shadow-sm cursor-pointer"
              onClick={() => showToast('Opciones de ordenamiento: Por horas jugadas')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="relative w-full">
          <div className="relative flex items-center bg-[#1c1a24] rounded-xl px-3.5 py-2.5 border border-[#2a2933]">
            <span className="material-symbols-outlined text-[#958da1] text-[20px] mr-2">search</span>
            <input
              id="library-search-input"
              className="bg-transparent border-none outline-none text-xs text-[#e5e0ee] placeholder:text-[#958da1] w-full"
              placeholder="Buscar por título, género o saga..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#958da1] hover:text-[#e5e0ee] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            ) : (
              <span className="material-symbols-outlined text-[#958da1] text-[18px]">
                filter_list
              </span>
            )}
          </div>
        </div>

        {/* Filter Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 whitespace-nowrap">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/25 font-bold'
                : 'bg-[#201e28] text-[#ccc3d8] hover:text-[#e5e0ee]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">apps</span>
            <span>Todos (18)</span>
          </button>

          <button
            onClick={() => setFilter('installed')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              filter === 'installed'
                ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/25 font-bold'
                : 'bg-[#201e28] text-[#ccc3d8] hover:text-[#e5e0ee]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">download_done</span>
            <span>Instalados (6)</span>
          </button>

          <button
            onClick={() => setFilter('cloud')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              filter === 'cloud'
                ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/25 font-bold'
                : 'bg-[#201e28] text-[#ccc3d8] hover:text-[#e5e0ee]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">cloud</span>
            <span>Nube (12)</span>
          </button>

          <button
            onClick={() => setFilter('favorites')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              filter === 'favorites'
                ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/25 font-bold'
                : 'bg-[#201e28] text-[#ccc3d8] hover:text-[#e5e0ee]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">favorite</span>
            <span>Favoritos (4)</span>
          </button>
        </div>
      </div>

      {/* Featured Spotlight: Continuar Jugando */}
      <div className="my-2">
        <div className="relative overflow-hidden rounded-3xl bg-[#201e28] shadow-xl border border-[#2a2933]">
          {/* Glow ambient light backing */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7c3aed]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Banner Artwork Container */}
          <div
            className="relative w-full h-48 overflow-hidden cursor-pointer group"
            onClick={() => onSelectGame(galaxyRaiders.id)}
          >
            <img
              alt="Galaxy Raiders Artwork"
              className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-700"
              src={galaxyRaiders.bannerImage || galaxyRaiders.image}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201e28] via-[#201e28]/60 to-transparent" />

            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#35333e]/80 backdrop-blur-md px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
              <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider">
                Jugado Recientemente
              </span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#0e0d16]/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[#ccc3d8]">
              <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">schedule</span>
              <span className="text-[11px] font-semibold">42h jugadas</span>
            </div>
          </div>

          {/* Card Body Content */}
          <div className="p-4 pt-1 flex flex-col gap-3 relative">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h2 className="font-bold text-xl text-[#e5e0ee] tracking-tight font-headline">
                  {galaxyRaiders.title}
                </h2>
                <p className="text-xs text-[#ccc3d8]">Táctico Sci-Fi • PlayStation 5 / PC</p>
              </div>
              <div className="flex items-center gap-1 bg-[#4f319c]/50 px-2.5 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[16px] text-[#cebdff]">
                  military_tech
                </span>
                <span className="text-xs font-bold text-[#cebdff]">Nvl. 38</span>
              </div>
            </div>

            {/* Achievement Tracker Progress */}
            <div className="bg-[#1c1a24] rounded-2xl p-3 flex flex-col gap-2 border border-[#2a2933]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">
                    emoji_events
                  </span>
                  <span className="text-xs font-semibold text-[#e5e0ee]">Progreso de Logros</span>
                </div>
                <span className="text-xs text-[#d2bbff] font-bold">68% (34/50)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#35333e] overflow-hidden relative">
                <div className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#d2bbff] to-[#4cd7f6] w-[68%] transition-all duration-1000" />
              </div>
            </div>

            {/* Launch CTA */}
            <button
              onClick={() => handleLaunchGame(galaxyRaiders.title)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#7c3aed] hover:bg-[#732ee4] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#7c3aed]/30 active:scale-[0.98] transition-all cursor-pointer"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              <span>Continuar Jugando</span>
            </button>
          </div>
        </div>
      </div>

      {/* Library List Header */}
      <div className="pt-4 pb-2 flex items-center justify-between">
        <h3 className="font-bold text-base text-[#e5e0ee]">Títulos Instalados y Remotos</h3>
        <button
          onClick={() => showToast('Cambiando a vista de cuadrícula')}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#d2bbff] hover:text-[#e5e0ee] transition-colors cursor-pointer"
          type="button"
        >
          <span>Vista detallada</span>
          <span className="material-symbols-outlined text-[16px]">view_agenda</span>
        </button>
      </div>

      {/* Games Vertical List */}
      <div className="flex flex-col gap-3">
        {/* Item 1: Turbo Circuit */}
        <div
          className="p-3 rounded-2xl bg-[#201e28] hover:bg-[#2a2933] transition-colors shadow-sm flex flex-col gap-2 border border-[#2a2933]/50 cursor-pointer"
          onClick={() => onSelectGame(turboCircuit.id)}
        >
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative shadow-inner bg-[#0e0d16]">
              <img
                alt="Turbo Circuit Cover"
                className="w-full h-full object-cover"
                src={turboCircuit.image}
                loading="lazy"
              />
              <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#13121b]" />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#e5e0ee] truncate leading-tight">
                  {turboCircuit.title}
                </h4>
                <button
                  aria-label="Opciones de juego"
                  className="text-[#ccc3d8] hover:text-[#e5e0ee] p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('Propiedades de Turbo Circuit');
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              <span className="text-xs text-[#4cd7f6] flex items-center gap-1 mt-0.5 font-medium">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Listo para jugar • v1.4.2
              </span>

              <div className="flex items-center gap-2 mt-1.5 text-[#ccc3d8] text-[11px]">
                <span className="flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]">history</span>
                  12h jugadas
                </span>
                <span>•</span>
                <span className="text-[#cebdff] font-semibold">Multiplayer</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#2a2933]/50">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-[#35333e] text-[#ccc3d8] text-[10px] font-semibold">
                SSD: 64.2 GB
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#35333e] text-[#4cd7f6] text-[10px] font-semibold">
                Nube OK
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLaunchGame(turboCircuit.title);
              }}
              className="px-4 py-1.5 rounded-xl bg-[#7c3aed] text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-[#7c3aed]/20 active:scale-95 transition-all cursor-pointer"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              <span>Jugar</span>
            </button>
          </div>
        </div>

        {/* Item 2: Neon Nexus: 2084 (Downloading) */}
        <div
          className="p-3 rounded-2xl bg-[#201e28] hover:bg-[#2a2933] transition-colors shadow-sm flex flex-col gap-2 relative overflow-hidden border border-[#2a2933]/50 cursor-pointer"
          onClick={() => onSelectGame(neonNexus.id)}
        >
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-[#0e0d16]">
              <img
                alt="Neon Nexus: 2084 Cover"
                className="w-full h-full object-cover"
                src={neonNexus.image}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0e0d16]/60 flex items-center justify-center backdrop-blur-[1px]">
                <span
                  className={`material-symbols-outlined text-[#d2bbff] text-[24px] ${
                    isNeonDownloading ? 'animate-spin' : ''
                  }`}
                >
                  sync
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#e5e0ee] truncate leading-tight">
                  {neonNexus.title}
                </h4>
                <button
                  aria-label="Opciones de juego"
                  className="text-[#ccc3d8] hover:text-[#e5e0ee] p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('Propiedades de descarga Neon Nexus');
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              <span className="text-xs text-[#d2bbff] flex items-center gap-1 mt-0.5 font-semibold">
                <span className="material-symbols-outlined text-[14px]">download</span>
                {isNeonDownloading
                  ? `Descargando (${neonProgress}%)`
                  : `Descarga en Pausa (${neonProgress}%)`}
              </span>

              <div className="flex items-center gap-2 mt-1.5 text-[#ccc3d8] text-[11px]">
                <span>{isNeonDownloading ? '45.2 MB/s' : '0 KB/s'}</span>
                <span>•</span>
                <span className="text-[#4cd7f6]">
                  {isNeonDownloading ? '4 min restantes' : 'En espera'}
                </span>
              </div>
            </div>
          </div>

          {/* Live Download Progress Line */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="w-full h-2 rounded-full bg-[#35333e] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#7c3aed] transition-all duration-300"
                style={{ width: `${neonProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#ccc3d8]">59.2 GB / 80.0 GB</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDownload();
                }}
                className="px-3 py-1 rounded-lg bg-[#35333e] hover:bg-[#3a3842] text-[#e5e0ee] text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isNeonDownloading ? 'pause' : 'play_arrow'}
                </span>
                <span>{isNeonDownloading ? 'Pausar' : 'Reanudar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Item 3: Shadow Protocol: Strike (Cloud/Install) */}
        <div
          className="p-3 rounded-2xl bg-[#201e28] hover:bg-[#2a2933] transition-colors shadow-sm flex flex-col gap-2 border border-[#2a2933]/50 cursor-pointer"
          onClick={() => onSelectGame(shadowProtocol.id)}
        >
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-[#0e0d16]">
              <img
                alt="Shadow Protocol: Strike"
                className="w-full h-full object-cover"
                src={shadowProtocol.image}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#13121b]/40" />
              <div className="absolute bottom-1 right-1 bg-[#0e0d16]/90 rounded px-1 py-0.5 flex items-center">
                <span className="material-symbols-outlined text-[#cebdff] text-[12px]">
                  cloud_queue
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#e5e0ee] truncate leading-tight">
                  {shadowProtocol.title}
                </h4>
                <button
                  aria-label="Opciones de juego"
                  className="text-[#ccc3d8] hover:text-[#e5e0ee] p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('Propiedades de Shadow Protocol');
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4f319c]/40 text-[#cebdff] text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[11px]">cloud</span>
                  En la nube
                </span>
                <span className="text-xs text-[#ccc3d8]">48.0 GB</span>
              </div>

              <div className="flex items-center gap-2 mt-1.5 text-[#ccc3d8] text-[11px]">
                <span>Última partida: Hace 3d</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#2a2933]/50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLaunchGame('Shadow Protocol Cloud Stream');
              }}
              className="text-[#cebdff] hover:text-[#e5e0ee] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">stream</span>
              <span>Jugar en Cloud</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showToast('Iniciando descarga local de Shadow Protocol (48 GB)');
              }}
              className="px-4 py-1.5 rounded-xl bg-[#2a2933] text-[#d2bbff] hover:bg-[#7c3aed] hover:text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">install_mobile</span>
              <span>Instalar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Player Statistics & Quick Telemetry Bento */}
      <div className="mt-6 mb-2">
        <div className="p-4 rounded-3xl bg-[#1c1a24] border border-[#2a2933] shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#ccc3d8] uppercase tracking-wider">
              Estadísticas del Perfil
            </span>
            <span className="material-symbols-outlined text-[#d2bbff] text-[20px]">insights</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Stat Tile 1: Total Hours */}
            <div className="p-3 rounded-2xl bg-[#201e28] flex items-center gap-3 border border-[#2a2933]">
              <div className="w-10 h-10 rounded-xl bg-[#4f319c]/60 text-[#cebdff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">timer</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xl text-[#e5e0ee] leading-tight font-headline">
                  184 h
                </span>
                <span className="text-[11px] text-[#ccc3d8] truncate">Tiempo Total</span>
              </div>
            </div>

            {/* Stat Tile 2: Trophies */}
            <div className="p-3 rounded-2xl bg-[#201e28] flex items-center gap-3 border border-[#2a2933]">
              <div className="w-10 h-10 rounded-xl bg-[#007184]/60 text-[#4cd7f6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">military_tech</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xl text-[#e5e0ee] leading-tight font-headline">
                  45
                </span>
                <span className="text-[11px] text-[#ccc3d8] truncate">Trofeos Ganados</span>
              </div>
            </div>
          </div>

          {/* Dynamic Progress Banner */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#13121b]">
                  #1
                </div>
                <div className="inline-block h-6 w-6 rounded-full bg-[#4f319c] text-[#cebdff] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#13121b]">
                  #2
                </div>
                <div className="inline-block h-6 w-6 rounded-full bg-[#007184] text-[#4cd7f6] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#13121b]">
                  #3
                </div>
              </div>
              <span className="text-xs text-[#ccc3d8]">Top 5% de jugadores GameZone</span>
            </div>
            <span className="material-symbols-outlined text-[#958da1] text-[18px]">
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
