import React, { useState } from 'react';
import { Game } from '../types';
import { REVIEWS } from '../data/mockData';

interface GameDetailScreenProps {
  game: Game;
  onAddToCart: (game: Game) => void;
  onToggleFavorite: (gameId: string) => void;
  showToast: (msg: string) => void;
  onBack: () => void;
}

export const GameDetailScreen: React.FC<GameDetailScreenProps> = ({
  game,
  onAddToCart,
  onToggleFavorite,
  showToast,
  onBack,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>(game.platforms[0] || 'PS5');
  const [isAccordion1Open, setIsAccordion1Open] = useState<boolean>(true);
  const [isAccordion2Open, setIsAccordion2Open] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${game.title} en GameZone`,
          text: `¡Echa un vistazo a ${game.title} por $${game.price.toFixed(2)} MXN!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Enlace del juego copiado al portapapeles');
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart({ ...game, platforms: [selectedPlatform] });
    showToast(`¡${game.title} añadido al carrito!`);
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pb-28 pt-0 animate-in fade-in duration-300">
      {/* Hero Media Showcase */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#0e0d16]">
        <img
          alt={`${game.title} cover preview`}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700 hover:scale-100"
          src={game.bannerImage || game.image}
        />

        {/* Gradient Overlay Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13121b] via-[#13121b]/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#13121b]/80 to-transparent" />

        {/* Floating Top Media Quick Actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            aria-label="Añadir a lista de deseos"
            className={`w-11 h-11 rounded-full bg-[#201e28]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-[#2a2933] active:scale-90 shadow-md cursor-pointer ${
              game.isFavorite ? 'text-[#ffb4ab]' : 'text-[#d2bbff]'
            }`}
            onClick={() => {
              onToggleFavorite(game.id);
              showToast(
                game.isFavorite
                  ? 'Eliminado de tu lista de deseos'
                  : '¡Guardado en tu lista de deseos!'
              );
            }}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={game.isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {game.isFavorite ? 'favorite' : 'favorite_border'}
            </span>
          </button>

          <button
            aria-label="Compartir juego"
            className="w-11 h-11 rounded-full bg-[#201e28]/80 backdrop-blur-md text-[#ccc3d8] hover:text-[#e5e0ee] flex items-center justify-center transition-all duration-300 hover:bg-[#2a2933] active:scale-90 shadow-md cursor-pointer"
            onClick={handleShare}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">share</span>
          </button>
        </div>

        {/* Metacritic & Rating Floating Badge over Image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a2933]/90 backdrop-blur-md shadow-md border border-[#35333e]">
            <span
              className="material-symbols-outlined text-[16px] text-[#4cd7f6]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-xs font-bold text-[#e5e0ee]">{game.rating}</span>
            <span className="text-[11px] text-[#ccc3d8]">({game.ratingCount || '1.4k'})</span>
          </div>
          {game.verified && (
            <div className="px-2.5 py-1.5 rounded-full bg-[#007184]/80 backdrop-blur-md text-[#b7efff] text-[11px] font-bold tracking-wider">
              VERIFICADO
            </div>
          )}
        </div>
      </div>

      {/* Main Game Info Container */}
      <div className="px-4 flex flex-col gap-5 -mt-2 relative z-20">
        {/* Title, Genres & Pricing Section */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            {game.genreTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#7c3aed]/25 border border-[#7c3aed]/40 text-[#d2bbff] text-[11px] font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-start justify-between gap-3 mt-1">
            <div className="flex flex-col min-w-0">
              <h2 className="font-bold text-2xl text-[#e5e0ee] tracking-tight font-headline">
                {game.title}
              </h2>
              <span className="text-xs text-[#ccc3d8]">
                {game.edition || 'Edición Digital E-Sports • Lanzamiento 2024'}
              </span>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="font-bold text-2xl text-[#d2bbff] tracking-tight font-headline">
                ${game.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-[#ccc3d8]">MXN</span>
            </div>
          </div>
        </div>

        {/* Supported Platforms Grid Badges */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-[#ccc3d8]">Plataformas Disponibles</span>
          <div className="flex items-center gap-2 flex-wrap">
            {game.platforms.map((platform) => {
              const isSelected = selectedPlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/30 ring-1 ring-[#d2bbff]'
                      : 'bg-[#1c1a24] text-[#e5e0ee] hover:bg-[#201e28]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">
                    {platform === 'PS5'
                      ? 'sports_esports'
                      : platform === 'Xbox Series X'
                      ? 'videogame_asset'
                      : platform === 'PC Digital'
                      ? 'laptop_chromebook'
                      : 'gamepad'}
                  </span>
                  <span>{platform}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Specs Horizontal Grid */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#1c1a24] border border-[#2a2933]">
          <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#201e28]/70">
            <span className="material-symbols-outlined text-[20px] text-[#d2bbff] mb-1">groups</span>
            <span className="text-[11px] text-[#ccc3d8]">Modo</span>
            <span className="text-xs font-semibold text-[#e5e0ee] truncate w-full">
              {game.specs.mode}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#201e28]/70">
            <span className="material-symbols-outlined text-[20px] text-[#4cd7f6] mb-1">speed</span>
            <span className="text-[11px] text-[#ccc3d8]">Gráficos</span>
            <span className="text-xs font-semibold text-[#e5e0ee] truncate w-full">
              {game.specs.graphics}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#201e28]/70">
            <span className="material-symbols-outlined text-[20px] text-[#cebdff] mb-1">
              hard_drive
            </span>
            <span className="text-[11px] text-[#ccc3d8]">Espacio</span>
            <span className="text-xs font-semibold text-[#e5e0ee] truncate w-full">
              {game.specs.space}
            </span>
          </div>
        </div>

        {/* Expandable Accordions for Details */}
        <div className="flex flex-col gap-2">
          {/* Section 1: Características */}
          <div className="rounded-2xl bg-[#1c1a24] border border-[#2a2933] overflow-hidden transition-all duration-300">
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              onClick={() => setIsAccordion1Open(!isAccordion1Open)}
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#7c3aed]/30 flex items-center justify-center text-[#d2bbff]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </span>
                <span className="font-semibold text-sm text-[#e5e0ee]">Características Clave</span>
              </div>
              <span
                className={`material-symbols-outlined text-[#ccc3d8] text-[22px] transition-transform duration-300 ${
                  isAccordion1Open ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {isAccordion1Open && (
              <div className="px-4 pb-4 flex flex-col gap-2 animate-in fade-in duration-200">
                <p className="text-xs text-[#ccc3d8] leading-relaxed">{game.description}</p>
                <ul className="flex flex-col gap-1.5 mt-1 text-xs text-[#ccc3d8]">
                  {game.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#4cd7f6] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 2: Gameplay y Modos */}
          <div className="rounded-2xl bg-[#1c1a24] border border-[#2a2933] overflow-hidden transition-all duration-300">
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              onClick={() => setIsAccordion2Open(!isAccordion2Open)}
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#4f319c]/40 flex items-center justify-center text-[#cebdff]">
                  <span className="material-symbols-outlined text-[18px]">sports_motorsports</span>
                </span>
                <span className="font-semibold text-sm text-[#e5e0ee]">Gameplay & Modos</span>
              </div>
              <span
                className={`material-symbols-outlined text-[#ccc3d8] text-[22px] transition-transform duration-300 ${
                  isAccordion2Open ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {isAccordion2Open && (
              <div className="px-4 pb-4 flex flex-col gap-2 animate-in fade-in duration-200">
                <p className="text-xs text-[#ccc3d8] leading-relaxed">
                  {game.gameplayModes ||
                    'Física de conducción reactiva y simulación aerodinámica de precisión milimétrica. Personaliza el rendimiento de escape, suspensión y telemetría de neumáticos para cada circuito.'}
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#201e28] text-[#e5e0ee] text-[11px] font-semibold">
                    Temporadas E-Sports
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#201e28] text-[#e5e0ee] text-[11px] font-semibold">
                    Desafío Contrarreloj
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Reviews Showcase Section */}
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-[#e5e0ee] font-headline">Reseñas de Jugadores</h3>
            <span className="text-xs font-semibold text-[#d2bbff]">
              Ver todas ({game.ratingCount || '1,428'})
            </span>
          </div>

          {/* Rating Breakdown Mini Panel */}
          <div className="p-4 rounded-2xl bg-[#1c1a24] border border-[#2a2933] flex items-center gap-4">
            <div className="flex flex-col items-center justify-center pr-3 border-r border-[#2a2933]">
              <span className="font-bold text-3xl text-[#e5e0ee] font-headline">{game.rating}</span>
              <div className="flex text-[#4cd7f6] my-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-[#ccc3d8] whitespace-nowrap">92% recomiendan</span>
            </div>

            {/* Rating Bars */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#ccc3d8] text-[11px]">
                <span className="w-4">5★</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#35333e] overflow-hidden">
                  <div className="h-full bg-[#7c3aed] rounded-full w-[82%]" />
                </div>
                <span className="w-7 text-right">82%</span>
              </div>
              <div className="flex items-center gap-2 text-[#ccc3d8] text-[11px]">
                <span className="w-4">4★</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#35333e] overflow-hidden">
                  <div className="h-full bg-[#cebdff] rounded-full w-[12%]" />
                </div>
                <span className="w-7 text-right">12%</span>
              </div>
              <div className="flex items-center gap-2 text-[#ccc3d8] text-[11px]">
                <span className="w-4">3★</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#35333e] overflow-hidden">
                  <div className="h-full bg-[#35333e] rounded-full w-[4%]" />
                </div>
                <span className="w-7 text-right">4%</span>
              </div>
            </div>
          </div>

          {/* Review Cards */}
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="p-3.5 rounded-2xl bg-[#1c1a24] border border-[#2a2933] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-[#7c3aed]/40"
                    src={rev.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#e5e0ee]">{rev.author}</span>
                    <span className="text-[11px] text-[#958da1]">Jugó {rev.hoursPlayed} horas</span>
                  </div>
                </div>
                <div className="flex text-[#4cd7f6]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#ccc3d8] italic">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fixed Cart Floating Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#13121b]/95 backdrop-blur-xl pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.6)] border-t border-[#2a2933]">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#ccc3d8]">Precio Final</span>
            <span className="font-bold text-xl text-[#e5e0ee] leading-tight font-headline">
              ${game.price.toFixed(0)}
            </span>
          </div>

          <button
            className={`flex-1 h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all duration-200 active:scale-95 cursor-pointer ${
              isAdding
                ? 'bg-[#007184] text-[#b7efff]'
                : 'bg-[#7c3aed] hover:bg-[#732ee4] text-white'
            }`}
            onClick={handleAddToCart}
            disabled={isAdding}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAdding ? 'check_circle' : 'shopping_bag'}
            </span>
            <span>{isAdding ? '¡Agregado al carrito!' : 'Agregar al carrito'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
