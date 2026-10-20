import React, { useState } from 'react';
import { UserProfile, ScreenType } from '../types';
import { COMMUNITY_AVATARS } from '../data/mockData';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateAvatar: (newAvatarUrl: string) => void;
  onNavigate: (screen: ScreenType) => void;
  showToast: (msg: string) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateAvatar,
  onNavigate,
  showToast,
  onLogout,
}) => {
  const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
  const [flashMode, setFlashMode] = useState<'auto' | 'on' | 'off'>('auto');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [showAccountModal, setShowAccountModal] = useState<string | null>(null);

  const handleCapturePhoto = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      // Pick a fresh avatar or simulated captured selfie
      const randomAvatar =
        COMMUNITY_AVATARS[Math.floor(Math.random() * COMMUNITY_AVATARS.length)];
      onUpdateAvatar(randomAvatar);
      setShowCameraModal(false);
      showToast('Avatar actualizado con éxito');
    }, 200);
  };

  const handleSelectFromGallery = () => {
    const nextAvatar = COMMUNITY_AVATARS[0];
    onUpdateAvatar(nextAvatar);
    setShowCameraModal(false);
    showToast('Foto de perfil importada desde galería');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 animate-in fade-in duration-300">
      {/* Profile Header Block */}
      <div className="relative flex flex-col items-center pt-2">
        {/* Glow backdrop */}
        <div className="absolute -top-12 w-64 h-64 bg-[#7c3aed]/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Avatar with gradient ring */}
        <div
          className="relative group cursor-pointer mb-3"
          onClick={() => setShowCameraModal(true)}
        >
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#7c3aed] via-[#d2bbff] to-[#4cd7f6] shadow-[0_0_24px_rgba(124,58,237,0.45)] transition-transform duration-300 group-hover:scale-105">
            <img
              alt={user.name}
              className="w-full h-full rounded-full object-cover bg-[#2a2933]"
              src={user.avatar}
            />
          </div>
          <button
            className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
            aria-label="Abrir cámara de avatar"
            onClick={(e) => {
              e.stopPropagation();
              setShowCameraModal(true);
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>
        </div>

        {/* User Identity */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h1 className="font-bold text-2xl text-[#e5e0ee] font-headline">{user.name}</h1>
          <span
            className="material-symbols-outlined text-[#4cd7f6] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
        </div>

        <span className="text-xs font-semibold text-[#ccc3d8] mb-2">{user.gamertag}</span>

        {/* VIP Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4f319c]/60 text-[#cebdff] mb-4 shadow-sm border border-[#7c3aed]/30">
          <span
            className="material-symbols-outlined text-[16px] text-[#4cd7f6]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            military_tech
          </span>
          <span className="text-[11px] font-bold tracking-wider uppercase">
            Miembro VIP Nivel {user.vipLevel}
          </span>
        </div>

        {/* Stats Row */}
        <div className="w-full grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#201e28] border border-[#2a2933] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.45)] mb-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-[#d2bbff]">
              <span className="material-symbols-outlined text-[18px]">sports_esports</span>
              <span className="font-bold text-lg text-[#e5e0ee] font-headline">{user.gamesCount}</span>
            </div>
            <span className="text-[11px] text-[#ccc3d8]">Juegos</span>
          </div>

          <div className="flex flex-col items-center text-center border-x border-[#2a2933]">
            <div className="flex items-center gap-1 text-[#4cd7f6]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                emoji_events
              </span>
              <span className="font-bold text-lg text-[#e5e0ee] font-headline">
                {user.trophiesCount}
              </span>
            </div>
            <span className="text-[11px] text-[#ccc3d8]">Trofeos</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-[#cebdff]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="font-bold text-lg text-[#e5e0ee] font-headline">
                {user.pointsCount.toLocaleString()}
              </span>
            </div>
            <span className="text-[11px] text-[#ccc3d8]">Puntos</span>
          </div>
        </div>

        {/* Edit Photo Primary Button */}
        <button
          className="w-full h-12 rounded-full bg-[#7c3aed] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(124,58,237,0.35)] active:scale-[0.98] transition-all cursor-pointer hover:bg-[#732ee4]"
          onClick={() => setShowCameraModal(true)}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          <span>Editar Foto de Perfil</span>
        </button>
      </div>

      {/* Vault & Settings Section */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Bóveda de Recompensas Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#201e28] to-[#2a2933] p-5 shadow-[0_10px_30px_-4px_rgba(124,58,237,0.22)] border border-[#7c3aed]/30">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#007184]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10 mb-4">
            <div>
              <span className="text-[11px] font-bold text-[#4cd7f6] uppercase tracking-wider block mb-0.5">
                Bóveda de Recompensas
              </span>
              <h2 className="font-bold text-lg text-[#e5e0ee] font-headline">Mis Recompensas</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#35333e]/80 flex items-center justify-center text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[22px]">loyalty</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-4 relative z-10">
            <span className="font-bold text-4xl text-[#e5e0ee] tracking-tight font-headline">
              {user.zCoins.toLocaleString()}
            </span>
            <span className="text-sm text-[#d2bbff] font-bold">Z-Coins</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#1c1a24] flex items-center justify-between gap-3 mb-4 relative z-10 border border-[#2a2933]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4f319c] flex items-center justify-center text-[#bea8ff]">
                <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
              </div>
              <div>
                <div className="font-semibold text-xs text-[#e5e0ee] leading-tight">
                  Pase Épico Mensual
                </div>
                <div className="text-[11px] text-[#ccc3d8]">
                  Vence en {user.monthlyPassExpiresDays} días
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('¡Pase Épico canjeado! Recompensas añadidas a tu inventario.')}
              className="px-3.5 py-1.5 rounded-full bg-[#4f319c] hover:bg-[#7c3aed] text-white text-[11px] font-semibold active:opacity-80 transition-all cursor-pointer"
              type="button"
            >
              Canjear
            </button>
          </div>

          <button
            className="w-full h-12 rounded-full bg-[#35333e] text-[#d2bbff] hover:text-white text-xs font-bold flex items-center justify-center gap-2 active:bg-[#201e28] transition-colors relative z-10 shadow-sm cursor-pointer"
            onClick={() => onNavigate('escaner')}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] text-[#4cd7f6]">
              qr_code_scanner
            </span>
            <span>Escanear QR de Recompensas</span>
          </button>
        </div>

        {/* Configuración de Cuenta */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-[11px] font-bold text-[#ccc3d8] uppercase tracking-wider px-2">
            Configuración de Cuenta
          </span>

          <div className="flex flex-col rounded-2xl bg-[#201e28] overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.45)] border border-[#2a2933]">
            {/* Row 1 */}
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#2a2933] transition-colors active:bg-[#35333e] text-left cursor-pointer border-b border-[#2a2933]/60"
              onClick={() => setShowAccountModal('seguridad')}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2a2933] flex items-center justify-center text-[#d2bbff]">
                  <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                </div>
                <div>
                  <div className="font-semibold text-xs text-[#e5e0ee]">Seguridad y Acceso</div>
                  <div className="text-[11px] text-[#ccc3d8]">2FA activado, Contraseña</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#958da1] text-[20px]">
                chevron_right
              </span>
            </button>

            {/* Row 2 */}
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#2a2933] transition-colors active:bg-[#35333e] text-left cursor-pointer border-b border-[#2a2933]/60"
              onClick={() => setShowAccountModal('notificaciones')}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2a2933] flex items-center justify-center text-[#4cd7f6]">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div>
                  <div className="font-semibold text-xs text-[#e5e0ee]">Notificaciones</div>
                  <div className="text-[11px] text-[#ccc3d8]">Alertas de drops y torneos</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#958da1] text-[20px]">
                chevron_right
              </span>
            </button>

            {/* Row 3 */}
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#2a2933] transition-colors active:bg-[#35333e] text-left cursor-pointer border-b border-[#2a2933]/60"
              onClick={() => setShowAccountModal('pagos')}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2a2933] flex items-center justify-center text-[#cebdff]">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                </div>
                <div>
                  <div className="font-semibold text-xs text-[#e5e0ee]">Métodos de Pago</div>
                  <div className="text-[11px] text-[#ccc3d8]">Visa •••• 8842</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#958da1] text-[20px]">
                chevron_right
              </span>
            </button>

            {/* Row 4: Logout / Switch Account */}
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#2a2933] transition-colors active:bg-[#35333e] text-left cursor-pointer text-[#ffb4ab]"
              onClick={onLogout}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#93000a]/20 flex items-center justify-center text-[#ffb4ab]">
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </div>
                <div>
                  <div className="font-semibold text-xs">Cerrar Sesión / Cambiar Cuenta</div>
                  <div className="text-[11px] text-[#ccc3d8]">Conectado como {user.name}</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Account Settings Sheet Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#201e28] p-5 flex flex-col gap-4 border border-[#2a2933]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#e5e0ee] capitalize">
                {showAccountModal === 'seguridad'
                  ? 'Seguridad y Acceso'
                  : showAccountModal === 'notificaciones'
                  ? 'Preferencias de Notificaciones'
                  : 'Métodos de Pago'}
              </h3>
              <button
                onClick={() => setShowAccountModal(null)}
                className="text-[#958da1] hover:text-[#e5e0ee] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-xs text-[#ccc3d8] flex flex-col gap-3">
              {showAccountModal === 'seguridad' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1a24]">
                    <span>Autenticación de 2 Factores (2FA)</span>
                    <span className="text-[#4cd7f6] font-bold">Activada</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1a24]">
                    <span>Último cambio de contraseña</span>
                    <span className="text-[#958da1]">Hace 2 meses</span>
                  </div>
                </>
              )}

              {showAccountModal === 'notificaciones' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1a24]">
                    <span>Alertas de Torneos y Eventos</span>
                    <span className="text-[#d2bbff] font-bold">Activadas</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1a24]">
                    <span>Drops y Descuentos Relámpago</span>
                    <span className="text-[#d2bbff] font-bold">Activadas</span>
                  </div>
                </>
              )}

              {showAccountModal === 'pagos' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1a24]">
                    <span>Visa terminada en 8842</span>
                    <span className="text-[#4cd7f6] font-bold">Principal</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1a24]">
                    <span>Google Pay / Apple Pay</span>
                    <span className="text-[#d2bbff] font-bold">Vinculado</span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => {
                showToast('Ajustes guardados correctamente');
                setShowAccountModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#7c3aed] text-white text-xs font-bold hover:bg-[#732ee4] transition-colors cursor-pointer"
              type="button"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}

      {/* Interactive Camera Avatar Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#13121b]/95 backdrop-blur-2xl transition-all duration-300 animate-in fade-in">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between px-4 py-4 max-w-md mx-auto">
            <button
              className="w-11 h-11 rounded-full bg-[#2a2933]/80 text-[#e5e0ee] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              onClick={() => {
                const modes: ('auto' | 'on' | 'off')[] = ['auto', 'on', 'off'];
                const next = modes[(modes.indexOf(flashMode) + 1) % modes.length];
                setFlashMode(next);
                showToast(`Modo flash: ${next.toUpperCase()}`);
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">
                {flashMode === 'auto' ? 'flash_auto' : flashMode === 'on' ? 'flash_on' : 'flash_off'}
              </span>
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-[#d2bbff] uppercase tracking-widest">
                Cámara Avatar
              </span>
              <span className="text-xs text-[#ccc3d8]">Modo Retrato</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="w-11 h-11 rounded-full bg-[#2a2933]/80 text-[#e5e0ee] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
                onClick={() => {
                  setIsFlipped(!isFlipped);
                  showToast('Cámara volteada');
                }}
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">flip_camera_ios</span>
              </button>

              <button
                className="w-11 h-11 rounded-full bg-[#35333e] text-[#e5e0ee] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
                onClick={() => setShowCameraModal(false)}
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
          </div>

          {/* Camera Viewfinder */}
          <div className="relative flex-1 mx-4 max-w-md w-full self-center flex flex-col items-center justify-center min-h-[360px] rounded-3xl overflow-hidden bg-[#0e0d16] shadow-2xl border border-[#2a2933]">
            <img
              alt="Visor de cámara"
              className={`absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 ${
                isFlipped ? '-scale-x-105 scale-y-105' : 'scale-105'
              }`}
              src={user.avatar}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#13121b]/40 via-transparent to-[#13121b]/70 pointer-events-none" />

            {/* Grid */}
            <div className="absolute inset-6 rounded-2xl pointer-events-none overflow-hidden flex flex-col justify-between">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 opacity-20">
                <div className="bg-[#d2bbff]/20 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/10 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/20 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/10 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/30 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/10 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/20 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/10 m-0.5 rounded-sm" />
                <div className="bg-[#d2bbff]/20 m-0.5 rounded-sm" />
              </div>
            </div>

            {/* Face ring guide */}
            <div className="relative z-10 w-56 h-56 rounded-full flex items-center justify-center shadow-[0_0_0_9999px_rgba(15,14,23,0.65)]">
              <div className="absolute inset-0 rounded-full bg-[#7c3aed]/15 animate-pulse" />
              <div className="w-48 h-48 rounded-full border border-dashed border-[#d2bbff]/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#d2bbff]/40 text-[48px]">face</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 text-center bg-[#1c1a24]/90 backdrop-blur-md py-2 px-3 rounded-full border border-[#2a2933]">
              <p className="text-[11px] font-semibold text-[#e5e0ee]">
                Centra tu rostro para actualizar tu avatar de jugador
              </p>
            </div>

            {/* Shutter flash overlay */}
            {isFlashing && (
              <div className="absolute inset-0 bg-white pointer-events-none z-30 animate-out fade-out duration-150" />
            )}
          </div>

          {/* Bottom Action Area */}
          <div className="w-full px-4 pt-5 pb-8 flex flex-col gap-3 max-w-md mx-auto">
            <div className="flex items-center justify-around">
              {/* Gallery button */}
              <button
                className="flex flex-col items-center gap-1 text-[#ccc3d8] hover:text-[#e5e0ee] active:scale-95 transition-all cursor-pointer"
                onClick={handleSelectFromGallery}
                type="button"
              >
                <div className="w-12 h-12 rounded-full bg-[#2a2933] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px] text-[#4cd7f6]">
                    photo_library
                  </span>
                </div>
                <span className="text-[11px] font-semibold">Galería</span>
              </button>

              {/* Shutter capture button */}
              <button
                className="relative group p-1 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#d2bbff] to-[#4cd7f6] shadow-[0_0_24px_rgba(124,58,237,0.55)] active:scale-90 transition-transform cursor-pointer"
                onClick={handleCapturePhoto}
                type="button"
                aria-label="Tomar foto de avatar"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-[#13121b] flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-[#7c3aed] flex items-center justify-center text-white group-hover:bg-[#732ee4] transition-colors">
                    <span className="material-symbols-outlined text-[30px]">camera</span>
                  </div>
                </div>
              </button>

              {/* Filter button */}
              <button
                className="flex flex-col items-center gap-1 text-[#ccc3d8] hover:text-[#e5e0ee] active:scale-95 transition-all cursor-pointer"
                onClick={() => showToast('Filtro Cyber-Neon aplicado al visor')}
                type="button"
              >
                <div className="w-12 h-12 rounded-full bg-[#2a2933] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px] text-[#cebdff]">tune</span>
                </div>
                <span className="text-[11px] font-semibold">Filtros</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
