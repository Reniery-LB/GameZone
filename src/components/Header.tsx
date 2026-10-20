import React from 'react';
import { ScreenType, UserProfile } from '../types';
import { GAMEZONE_LOGO } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  user: UserProfile;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  user,
  title,
  showBack = false,
  onBack,
}) => {
  const getScreenTitle = () => {
    if (title) return title;
    switch (currentScreen) {
      case 'inicio':
        return 'Inicio';
      case 'biblioteca':
        return 'Biblioteca';
      case 'escaner':
        return 'Escanear';
      case 'perfil':
        return 'Perfil';
      case 'carrito':
        return 'Carrito De Compras';
      case 'detalle':
        return 'Detalle De Juego';
      case 'login':
        return 'Iniciar sesión';
      case 'register':
        return 'Registrarse';
      default:
        return 'GameZone';
    }
  };

  const isStackScreen = currentScreen === 'carrito' || currentScreen === 'detalle' || currentScreen === 'login' || currentScreen === 'register' || showBack;

  return (
    <header className="fixed top-0 w-full z-50 bg-[#13121b]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] pt-safe border-b border-[#201e28]/60">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-2 min-w-0">
          {isStackScreen ? (
            <button
              aria-label="Volver"
              className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full text-[#e5e0ee] hover:text-[#d2bbff] hover:bg-[#201e28] active:scale-90 transition-all cursor-pointer"
              onClick={onBack ? onBack : () => onNavigate('inicio')}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
          ) : null}

          <div
            className="flex items-center gap-2 cursor-pointer select-none truncate"
            onClick={() => onNavigate('inicio')}
          >
            <img
              alt="GameZone Logo"
              className="h-7 w-auto object-contain shrink-0"
              src={GAMEZONE_LOGO}
              onError={(e) => {
                // Fallback SVG icon if external host is slow
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {isStackScreen ? (
              <h1 className="font-semibold text-base text-[#e5e0ee] truncate ml-0.5">
                {getScreenTitle()}
              </h1>
            ) : (
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#e5e0ee] leading-none tracking-tight font-headline">
                  GameZone
                </span>
                <span className="text-[11px] font-semibold text-[#d2bbff] uppercase tracking-wider">
                  {getScreenTitle()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Cart Icon Button */}
          <button
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer active:scale-95 ${
              currentScreen === 'carrito'
                ? 'bg-[#7c3aed]/20 text-[#d2bbff]'
                : 'text-[#ccc3d8] hover:text-[#e5e0ee] hover:bg-[#201e28]'
            }`}
            onClick={() => onNavigate('carrito')}
            aria-label="Ver carrito de compras"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7c3aed] text-white text-[10px] flex items-center justify-center font-bold shadow-[0_0_8px_rgba(124,58,237,0.8)]">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar Button */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer active:scale-95 transition-transform"
            onClick={() => onNavigate('perfil')}
            aria-label="Ver mi perfil"
            type="button"
          >
            <img
              alt={user.name}
              className={`w-8 h-8 rounded-full object-cover transition-all ${
                currentScreen === 'perfil'
                  ? 'ring-2 ring-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.7)]'
                  : 'ring-1.5 ring-[#d2bbff]/40 hover:ring-[#d2bbff]'
              }`}
              src={user.avatar}
              onError={(e) => {
                // Fallback avatar
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
