import React, { useState } from 'react';
import { Game } from '../types';

interface HomeScreenProps {
  games: Game[];
  onSelectGame: (gameId: string) => void;
  onAddToCart: (game: Game) => void;
  onBuyNow: (game: Game) => void;
  onToggleFavorite: (gameId: string) => void;
  showToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  games,
  onSelectGame,
  onAddToCart,
  onBuyNow,
  onToggleFavorite,
  showToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');

  const categories = [
    { id: 'Todos', label: 'Todos', icon: 'grid_view' },
    { id: 'Acción', label: 'Acción', icon: 'sports_martial_arts' },
    { id: 'RPG', label: 'RPG', icon: 'swords' },
    { id: 'Carreras', label: 'Carreras', icon: 'sports_motorsports' },
    { id: 'Cyberpunk', label: 'Cyberpunk', icon: 'memory' },
    { id: 'Estrategia', label: 'Estrategia', icon: 'shield' },
  ];

  const galaxyRaiders = games.find((g) => g.id === 'galaxy-raiders') || games[0];
  const neonNexus = games.find((g) => g.id === 'neon-nexus') || games[1];
  const turboCircuit = games.find((g) => g.id === 'turbo-circuit') || games[2];

  // Filtered games if searching or filtering
  const filteredGames = games.filter((game) => {
    const matchesCat =
      selectedCategory === 'Todos' ||
      game.category === selectedCategory ||
      game.genreTags.includes(selectedCategory);
    const matchesSearch =
      searchQuery.trim() === '' ||
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genreTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (priceSort === 'asc') return a.price - b.price;
    if (priceSort === 'desc') return b.price - a.price;
    return 0;
  });

  const isFilteringActive = searchQuery.trim() !== '' || selectedCategory !== 'Todos';

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 gap-5 pt-2 pb-28">
      {/* Saludo & Header de bienvenida */}
      <section className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-2xl text-[#e5e0ee] tracking-tight font-headline">
              ¡Hola de nuevo, Alex!
            </span>
            <span className="text-[#4cd7f6] select-none animate-pulse text-[20px]">⚡</span>
          </div>
          <p className="text-sm text-[#ccc3d8]">Descubre los mejores lanzamientos y ofertas</p>
        </div>

        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#2a2933] text-[#d2bbff] hover:bg-[#35333e] active:scale-95 transition-all shadow-md cursor-pointer"
          aria-label="Notificaciones"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">notifications_active</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4cd7f6]" />
        </button>
      </section>

      {/* Notifications Drawer / Flyout */}
      {showNotifications && (
        <div className="rounded-2xl bg-[#201e28] border border-[#7c3aed]/40 p-4 shadow-xl flex flex-col gap-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#d2bbff] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">campaign</span>
              Novedades GameZone
            </span>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-[#958da1] hover:text-[#e5e0ee] text-xs font-semibold cursor-pointer"
              type="button"
            >
              Cerrar
            </button>
          </div>
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#1c1a24]">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">bolt</span>
            <div>
              <p className="text-xs font-semibold text-[#e5e0ee]">¡Drop de Fin de Semana Activado!</p>
              <p className="text-[11px] text-[#ccc3d8]">Doble XP y +250 Z-Coins en Galaxy Raiders hasta el domingo.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#1c1a24]">
            <span className="material-symbols-outlined text-[#cebdff] text-[20px]">sports_esports</span>
            <div>
              <p className="text-xs font-semibold text-[#e5e0ee]">Torneo Turbo Circuit Tokio</p>
              <p className="text-[11px] text-[#ccc3d8]">Inscripciones abiertas. Bolsa de premios $50,000 MXN.</p>
            </div>
          </div>
        </div>
      )}

      {/* Buscador Moderno & Botón de Filtros */}
      <section className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-[#1c1a24] rounded-xl px-3.5 py-2.5 gap-2.5 border border-[#2a2933] focus-within:border-[#7c3aed] transition-all">
          <span className="material-symbols-outlined text-[#958da1] text-[22px]">search</span>
          <input
            className="w-full bg-transparent text-[#e5e0ee] placeholder:text-[#958da1] text-sm focus:outline-none"
            placeholder="Buscar juegos, géneros, DLC..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#958da1] hover:text-[#e5e0ee] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          ) : (
            <button
              onClick={() => showToast('Escuchando búsqueda por voz...')}
              className="material-symbols-outlined text-[#4a4455] text-[20px] cursor-pointer hover:text-[#e5e0ee] transition-colors"
              type="button"
              aria-label="Búsqueda por voz"
            >
              mic
            </button>
          )}
        </div>
        <button
          aria-label="Abrir filtros"
          className={`w-12 h-11 flex items-center justify-center rounded-xl bg-[#2a2933] hover:bg-[#35333e] active:scale-95 transition-all shadow-sm cursor-pointer ${
            showFilterModal || priceSort !== 'default' ? 'ring-2 ring-[#7c3aed] text-[#4cd7f6]' : 'text-[#d2bbff]'
          }`}
          onClick={() => setShowFilterModal(!showFilterModal)}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">tune</span>
        </button>
      </section>

      {/* Filter modal / drawer */}
      {showFilterModal && (
        <div className="rounded-2xl bg-[#201e28] p-4 border border-[#2a2933] flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#d2bbff] uppercase tracking-wider">
              Ordenar por precio
            </span>
            <button
              onClick={() => {
                setPriceSort('default');
                setShowFilterModal(false);
              }}
              className="text-xs text-[#958da1] hover:text-[#e5e0ee] cursor-pointer"
              type="button"
            >
              Limpiar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setPriceSort('asc');
                setShowFilterModal(false);
                showToast('Ordenado: Menor precio');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                priceSort === 'asc'
                  ? 'bg-[#7c3aed] text-white'
                  : 'bg-[#1c1a24] text-[#ccc3d8] hover:text-[#e5e0ee]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              Menor precio
            </button>
            <button
              onClick={() => {
                setPriceSort('desc');
                setShowFilterModal(false);
                showToast('Ordenado: Mayor precio');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                priceSort === 'desc'
                  ? 'bg-[#7c3aed] text-white'
                  : 'bg-[#1c1a24] text-[#ccc3d8] hover:text-[#e5e0ee]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              Mayor precio
            </button>
          </div>
        </div>
      )}

      {/* Píldoras de Categorías con Scroll Horizontal */}
      <section className="-mx-4 overflow-x-auto scrollbar-none px-4 py-1">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/30'
                    : 'bg-[#201e28] text-[#ccc3d8] hover:text-[#e5e0ee] hover:bg-[#2a2933]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* If actively searching or filtering by price/category */}
      {isFilteringActive && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#e5e0ee]">
              Resultados ({sortedGames.length})
            </span>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
                setPriceSort('default');
              }}
              className="text-xs text-[#d2bbff] hover:underline cursor-pointer"
              type="button"
            >
              Restablecer
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {sortedGames.map((game) => (
              <div
                key={game.id}
                className="w-full rounded-2xl bg-[#201e28] p-3 flex items-center gap-3 shadow-md hover:bg-[#2a2933] transition-all cursor-pointer"
                onClick={() => onSelectGame(game.id)}
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#0e0d16] shrink-0">
                  <img
                    alt={game.title}
                    className="w-full h-full object-cover"
                    src={game.image}
                    loading="lazy"
                  />
                  {game.badge && (
                    <div className="absolute bottom-1 right-1 bg-[#35333e]/90 rounded px-1 text-[10px] text-[#4cd7f6] font-bold">
                      {game.badge}
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#4f319c] text-[#bea8ff] text-[10px] font-semibold">
                      {game.category}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs text-[#e5e0ee] font-semibold">{game.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-[#e5e0ee] truncate mt-1">{game.title}</h3>
                  <p className="text-xs text-[#958da1] truncate">{game.subtitle || game.description}</p>
                </div>
                <div className="flex flex-col items-end justify-center shrink-0">
                  <span className="font-bold text-sm text-[#d2bbff]">${game.price.toFixed(2)}</span>
                  <span className="text-[10px] text-[#958da1]">MXN</span>
                  <button
                    aria-label={`Agregar ${game.title}`}
                    className="mt-1 w-8 h-8 rounded-lg bg-[#35333e] text-[#d2bbff] hover:bg-[#7c3aed] hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(game);
                      showToast(`¡${game.title} en cesta!`);
                    }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            ))}
            {sortedGames.length === 0 && (
              <div className="text-center py-10 text-[#958da1] text-sm">
                No encontramos juegos que coincidan con tu búsqueda.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Standard Sections if not filtering, or below search */}
      {!isFilteringActive && (
        <>
          {/* Novedades y Destacados (Featured Hero) */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
                <h2 className="font-bold text-lg text-[#e5e0ee] font-headline">
                  Novedades y Destacados
                </h2>
              </div>
              <button
                onClick={() => setSelectedCategory('Acción')}
                className="text-xs font-semibold text-[#d2bbff] flex items-center gap-0.5 hover:underline cursor-pointer"
                type="button"
              >
                <span>Ver más</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Hero Card Mech (Galaxy Raiders) */}
            <div
              className="relative w-full rounded-3xl overflow-hidden bg-[#201e28] shadow-xl border border-[#2a2933]/50 cursor-pointer group"
              onClick={() => onSelectGame(galaxyRaiders.id)}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  alt="Galaxy Raiders Mech Combat"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={galaxyRaiders.image}
                  loading="lazy"
                />
                {/* Scrim degradado cinematográfico */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#201e28] via-[#201e28]/40 to-transparent" />

                {/* Floating Badges Top */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#35333e]/90 backdrop-blur-md text-[#4cd7f6] text-[11px] font-bold uppercase tracking-wider shadow-md">
                    Acción Sci-Fi
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#4f319c]/90 text-[#bea8ff] text-[11px] font-semibold">
                    Nuevo
                  </span>
                </div>

                <button
                  aria-label="Añadir a lista de deseos"
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-[#35333e]/80 backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer ${
                    galaxyRaiders.isFavorite ? 'text-[#ffb4ab]' : 'text-white hover:text-[#d2bbff]'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(galaxyRaiders.id);
                    showToast(
                      galaxyRaiders.isFavorite
                        ? 'Eliminado de tu lista de deseos'
                        : '¡Guardado en tu lista de deseos!'
                    );
                  }}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={galaxyRaiders.isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Hero Card Details & CTA */}
              <div className="p-4 flex flex-col gap-3 -mt-4 relative z-10">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-xl text-[#e5e0ee] leading-tight font-headline">
                      {galaxyRaiders.title}
                    </h3>
                    <p className="text-xs text-[#ccc3d8]">Lucha titánica mecha en planetas distantes</p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#2a2933] px-2.5 py-1 rounded-xl shadow-sm">
                    <span
                      className="material-symbols-outlined text-amber-400 text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-xs font-semibold text-[#e5e0ee]">
                      {galaxyRaiders.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-[#958da1] uppercase tracking-wider">
                      Precio digital
                    </span>
                    <span className="text-lg font-bold text-[#d2bbff]">
                      ${galaxyRaiders.price.toFixed(2)} MXN
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Agregar Galaxy Raiders al carrito"
                      className="w-11 h-11 rounded-2xl bg-[#2a2933] hover:bg-[#35333e] text-[#d2bbff] flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(galaxyRaiders);
                        showToast('¡Galaxy Raiders añadido al carrito!');
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[22px]">add_shopping_cart</span>
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-2xl bg-[#7c3aed] hover:bg-[#732ee4] text-white text-sm font-semibold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(124,58,237,0.4)] active:scale-95 transition-all cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBuyNow(galaxyRaiders);
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                      <span>Comprar ahora</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* En Oferta (Special Deals) */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">
                  local_fire_department
                </span>
                <h2 className="font-bold text-lg text-[#e5e0ee] font-headline">En Oferta</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#93000a] text-[#ffdad6] text-[11px] font-bold">
                Termina en 14h
              </span>
            </div>

            {/* Oferta Card: Cyberpunk Neon Nexus */}
            <div
              className="relative w-full rounded-2xl bg-[#201e28] p-4 flex flex-col gap-3 shadow-lg overflow-hidden border border-[#2a2933]/50 cursor-pointer group"
              onClick={() => onSelectGame(neonNexus.id)}
            >
              {/* Glow ambient violeta sutil */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#7c3aed]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex gap-3.5">
                {/* Thumbnail con badge de descuento */}
                <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-[#0e0d16]">
                  <img
                    alt="Neon Nexus 2084 Cyberpunk Combat"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={neonNexus.image}
                    loading="lazy"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#ffb4ab] text-[#690005] text-[11px] font-bold shadow-md">
                    -{neonNexus.discountPercentage}%
                  </div>
                </div>

                {/* Info principal */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-bold text-base text-[#e5e0ee] truncate leading-tight">
                        {neonNexus.title}
                      </h3>
                      <button
                        aria-label="Favorito"
                        className={`transition-colors p-0.5 active:scale-90 cursor-pointer ${
                          neonNexus.isFavorite ? 'text-[#ffb4ab]' : 'text-[#958da1] hover:text-[#ffb4ab]'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(neonNexus.id);
                          showToast(
                            neonNexus.isFavorite
                              ? 'Eliminado de favoritos'
                              : '¡Agregado a favoritos!'
                          );
                        }}
                        type="button"
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={neonNexus.isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          favorite
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="material-symbols-outlined text-amber-400 text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs text-[#e5e0ee] font-semibold">{neonNexus.rating}</span>
                      <span className="text-[#958da1] text-[12px]">•</span>
                      <span className="text-xs text-[#ccc3d8] truncate">Distrito 7</span>
                    </div>
                  </div>

                  {/* Badges de género */}
                  <div className="flex items-center gap-1.5 flex-wrap my-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#2a2933] text-[#4cd7f6] text-[11px] font-semibold">
                      Cyberpunk
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#2a2933] text-[#ccc3d8] text-[11px] font-semibold">
                      RPG
                    </span>
                  </div>

                  {/* Precios y Acción */}
                  <div className="flex items-end justify-between mt-1">
                    <div className="flex flex-col">
                      <span className="text-xs line-through text-[#958da1]">
                        ${neonNexus.originalPrice?.toFixed(2)}
                      </span>
                      <span className="font-bold text-sm text-[#d2bbff] leading-none">
                        ${neonNexus.price.toFixed(2)} MXN
                      </span>
                    </div>

                    <button
                      aria-label="Añadir Neon Nexus al carrito"
                      className="w-9 h-9 rounded-xl bg-[#7c3aed] text-white flex items-center justify-center active:scale-95 shadow-md hover:bg-[#732ee4] transition-all cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(neonNexus);
                        showToast('¡Neon Nexus agregado al carrito!');
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección Más Populares */}
          <section className="flex flex-col gap-2 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#cebdff] text-[20px]">
                  trending_up
                </span>
                <h2 className="font-bold text-lg text-[#e5e0ee] font-headline">Más Populares</h2>
              </div>
              <button
                onClick={() => setSelectedCategory('Carreras')}
                className="text-xs font-semibold text-[#d2bbff] hover:underline cursor-pointer"
                type="button"
              >
                Ver ranking
              </button>
            </div>

            {/* Mini Tarjeta Turbo Circuit */}
            <div
              className="w-full rounded-2xl bg-[#201e28] p-3 flex items-center gap-3 shadow-md hover:bg-[#2a2933] transition-colors border border-[#2a2933]/50 cursor-pointer"
              onClick={() => onSelectGame(turboCircuit.id)}
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#0e0d16] shrink-0">
                <img
                  alt="Turbo Circuit Urban Racing"
                  className="w-full h-full object-cover"
                  src={turboCircuit.image}
                  loading="lazy"
                />
                <div className="absolute bottom-1 right-1 bg-[#35333e]/90 rounded px-1 text-[10px] text-[#4cd7f6] font-bold">
                  TOP 3
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#4f319c] text-[#bea8ff] text-[10px] font-semibold">
                    Carreras
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-xs text-[#e5e0ee] font-semibold">
                      {turboCircuit.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#e5e0ee] truncate mt-1">
                  {turboCircuit.title}
                </h3>
                <p className="text-xs text-[#958da1] truncate">
                  {turboCircuit.subtitle || 'Personalización extrema y multijugador'}
                </p>
              </div>

              <div className="flex flex-col items-end justify-center pr-1 shrink-0">
                <span className="font-bold text-sm text-[#d2bbff]">
                  ${turboCircuit.price.toFixed(2)}
                </span>
                <span className="text-[10px] text-[#958da1]">MXN</span>
                <button
                  aria-label="Agregar Turbo Circuit"
                  className="mt-1.5 w-8 h-8 rounded-lg bg-[#35333e] text-[#d2bbff] hover:bg-[#7c3aed] hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(turboCircuit);
                    showToast('¡Turbo Circuit en cesta!');
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
