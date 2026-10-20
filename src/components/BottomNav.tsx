import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // Hide bottom nav on detail, auth, and full cart if desirable, but as shown in designs:
  // Inicio, Biblioteca, Escanear, and Perfil have the full bottom nav!
  const isTabScreen = ['inicio', 'biblioteca', 'escaner', 'perfil'].includes(currentScreen);

  if (!isTabScreen) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#1c1a24]/90 backdrop-blur-xl border-t border-[#2a2933]/80 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
      aria-label="Navegación principal"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onNavigate('inicio')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[48px] transition-all cursor-pointer ${
            currentScreen === 'inicio'
              ? 'text-[#d2bbff] font-bold scale-105'
              : 'text-[#ccc3d8] hover:text-[#e5e0ee]'
          }`}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentScreen === 'inicio' ? 'material-symbols-fill' : ''
            }`}
          >
            sports_esports
          </span>
          <span className="text-[11px] font-semibold tracking-tight">Inicio</span>
        </button>

        {/* Tab 2: Biblioteca */}
        <button
          onClick={() => onNavigate('biblioteca')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[48px] transition-all cursor-pointer ${
            currentScreen === 'biblioteca'
              ? 'text-[#d2bbff] font-bold scale-105'
              : 'text-[#ccc3d8] hover:text-[#e5e0ee]'
          }`}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentScreen === 'biblioteca' ? 'material-symbols-fill' : ''
            }`}
          >
            video_library
          </span>
          <span className="text-[11px] font-semibold tracking-tight">Biblioteca</span>
        </button>

        {/* Tab 3: Center Elevated Action Button (Escanear) */}
        <button
          onClick={() => onNavigate('escaner')}
          className="flex flex-col items-center justify-center -mt-6 min-w-[56px] min-h-[48px] group cursor-pointer active:scale-90 transition-transform"
          type="button"
          aria-label="Abrir escáner de recompensas"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-[0_8px_24px_rgba(124,58,237,0.5)] ${
              currentScreen === 'escaner'
                ? 'bg-gradient-to-tr from-[#7c3aed] to-[#4cd7f6] ring-3 ring-[#4cd7f6] text-white scale-105'
                : 'bg-[#7c3aed] hover:bg-[#732ee4] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
          </div>
          <span
            className={`text-[11px] font-semibold mt-1 tracking-tight ${
              currentScreen === 'escaner' ? 'text-[#4cd7f6] font-bold' : 'text-[#ccc3d8]'
            }`}
          >
            Escanear
          </span>
        </button>

        {/* Tab 4: Perfil */}
        <button
          onClick={() => onNavigate('perfil')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[48px] transition-all cursor-pointer ${
            currentScreen === 'perfil'
              ? 'text-[#d2bbff] font-bold scale-105'
              : 'text-[#ccc3d8] hover:text-[#e5e0ee]'
          }`}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentScreen === 'perfil' ? 'material-symbols-fill' : ''
            }`}
          >
            person
          </span>
          <span className="text-[11px] font-semibold tracking-tight">Perfil</span>
        </button>
      </div>
    </nav>
  );
};
