import React, { useState, useEffect } from 'react';
import { RewardItem } from '../types';

interface ScannerScreenProps {
  rewards: RewardItem[];
  onRedeemCode: (code: string) => void;
  showToast: (msg: string) => void;
  onNavigateToCart: () => void;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({
  rewards,
  onRedeemCode,
  showToast,
  onNavigateToCart,
}) => {
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const [showCodeInputModal, setShowCodeInputModal] = useState<boolean>(false);
  const [manualCode, setManualCode] = useState<string>('');
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [isSimulatingScan, setIsSimulatingScan] = useState<boolean>(false);

  const toggleFlash = () => {
    setFlashOn(!flashOn);
    showToast(flashOn ? 'Linterna apagada' : 'Linterna encendida');
  };

  const handleSimulateScan = (sampleCode: string, name: string) => {
    setIsSimulatingScan(true);
    showToast(`Escaneando código QR: ${name}...`);
    setTimeout(() => {
      setIsSimulatingScan(false);
      onRedeemCode(sampleCode);
    }, 1500);
  };

  const handleManualRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) {
      showToast('Por favor escribe un código o PIN');
      return;
    }
    const code = manualCode.trim().toUpperCase();
    onRedeemCode(code);
    setManualCode('');
    setShowCodeInputModal(false);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 gap-5 animate-in fade-in duration-300">
      {/* Header Contextual */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#d2bbff] text-[20px]">
            qr_code_scanner
          </span>
          <span className="text-[11px] font-bold text-[#d2bbff] uppercase tracking-widest">
            Scanner Activo
          </span>
        </div>
        <h1 className="font-bold text-2xl text-[#e5e0ee] font-headline">Escáner de Recompensas</h1>
        <p className="text-xs text-[#ccc3d8]">Canjea códigos y bonificaciones exclusivas al instante.</p>
      </div>

      {/* Viewport de Cámara / HUD de Escaneo */}
      <div className="relative w-full aspect-square max-w-[340px] mx-auto rounded-3xl bg-[#0e0d16] overflow-hidden shadow-2xl flex items-center justify-center border border-[#2a2933]">
        {/* Fondo de vista previa de cámara simulada con textura cyberpunk sutil */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-500 scale-105 ${
            flashOn ? 'opacity-70 brightness-125' : 'opacity-40'
          }`}
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMONRSCSgL0GSsgHKZMopWv7Und-o-iF_5p9eMv-9ad9c91JttqvlfnDVZ-WHhCjti3Iu40HlRy5QrKo2CpD3EpSIZUpPNb4jzgXN2rGXBZZKliMTc4epUrXtqNa2pS4zYoYS1HrT5ejSQRSoBXkuprG5RE42MypVXwHBBXgKj9-9CUz6vRQDSSyNFrqLfZZAL6ZpTwAhzoWvnqFL4-4Z7mGfc8q0HFp12_N92lpaFtNoj8clW7BbO')`,
          }}
        />

        {/* Malla de visor / Grid Overlay semitransparente */}
        <div className="absolute inset-0 bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

        {/* Scrim oscuro perimetral tipo visor HUD */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#13121b]/70 via-transparent to-[#13121b]/80 pointer-events-none" />

        {/* Retícula / Marco de Enfoque Activo */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Esquinas brillantes violeta / MD3 Accent */}
          <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-xl border-t-[3.5px] border-l-[3.5px] border-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.7)]" />
          <div className="absolute top-0 right-0 w-8 h-8 rounded-tr-xl border-t-[3.5px] border-r-[3.5px] border-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.7)]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 rounded-bl-xl border-b-[3.5px] border-l-[3.5px] border-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.7)]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-br-xl border-b-[3.5px] border-r-[3.5px] border-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.7)]" />

          {/* Mira central / Retícula sutil */}
          <div className="w-12 h-12 flex items-center justify-center opacity-30">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[28px]">
              filter_center_focus
            </span>
          </div>

          {/* Láser de Escaneo Animado Continuo */}
          <div className="absolute left-1 right-1 h-[2.5px] bg-gradient-to-r from-transparent via-[#4cd7f6] to-transparent shadow-[0_0_15px_#4cd7f6] pointer-events-none animate-laser" />

          {/* Indicador de Detección de Código */}
          <div className="absolute bottom-3 px-3 py-1 rounded-full bg-[#2a2933]/90 backdrop-blur-md flex items-center gap-1.5 shadow-md border border-[#35333e]">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
            <span className="text-[11px] font-semibold text-[#e5e0ee]">
              {isSimulatingScan ? 'Decodificando QR...' : 'Buscando QR...'}
            </span>
          </div>
        </div>

        {/* Controles HUD Flotantes (Linterna / Flash y Ajustes de Enfoque) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            aria-label="Encender Linterna"
            className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg cursor-pointer ${
              flashOn
                ? 'bg-[#4cd7f6] text-[#003640] shadow-[0_0_15px_#4cd7f6]'
                : 'bg-[#2a2933]/80 backdrop-blur-md text-[#e5e0ee]'
            }`}
            onClick={toggleFlash}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {flashOn ? 'flash_on' : 'flash_off'}
            </span>
          </button>

          <button
            aria-label="Auto Enfoque"
            className="w-10 h-10 rounded-full bg-[#2a2933]/80 backdrop-blur-md text-[#e5e0ee] flex items-center justify-center active:scale-90 transition-transform shadow-lg cursor-pointer"
            onClick={() => showToast('Enfoque automático recalibrado')}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
          </button>
        </div>

        {/* Indicador de Sensor CAM 01 */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2a2933]/80 backdrop-blur-md text-[#ccc3d8] text-[11px] font-semibold border border-[#35333e]">
          <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">videocam</span>
          <span>CAM 01</span>
        </div>
      </div>

      {/* Instrucción Directa y Acción de Galería */}
      <div className="flex flex-col items-center text-center gap-2 -mt-1">
        <p className="text-sm font-semibold text-[#e5e0ee] max-w-[280px]">
          Apunta tu cámara a un código QR de recompensas
        </p>

        {/* Botón Galería con opciones demo */}
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#201e28] text-[#d2bbff] hover:bg-[#2a2933] text-xs font-semibold active:scale-95 transition-all shadow-sm cursor-pointer border border-[#2a2933]"
            onClick={() => handleSimulateScan('GZ-ZCOINS-500', 'Bolsa 500 Z-Coins')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
            <span>Elegir foto de la galería</span>
          </button>
        </div>
      </div>

      {/* Entrada Manual / Voucher rápido */}
      <div className="bg-[#1c1a24] p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-sm border border-[#2a2933]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#201e28] flex items-center justify-center text-[#d2bbff] shrink-0">
            <span className="material-symbols-outlined text-[22px]">keyboard</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-xs text-[#e5e0ee] truncate">
              ¿Tienes un código alfanumérico?
            </span>
            <span className="text-[11px] text-[#ccc3d8] truncate">
              Escribe el PIN de tu tarjeta o cupón
            </span>
          </div>
        </div>

        <button
          className="px-3.5 py-1.5 rounded-lg bg-[#4f319c] hover:bg-[#7c3aed] text-white text-xs font-semibold whitespace-nowrap active:scale-95 transition-transform cursor-pointer"
          onClick={() => setShowCodeInputModal(true)}
          type="button"
        >
          Ingresar
        </button>
      </div>

      {/* Sección: Recompensas Recientes y Confirmadas */}
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d2bbff] text-[20px]">verified</span>
            <h2 className="font-bold text-sm text-[#e5e0ee]">Recompensas Recientes</h2>
          </div>
          <span className="text-xs text-[#ccc3d8] font-semibold">
            {rewards.length} Canjeadas
          </span>
        </div>

        {/* Lista de tarjetas de recompensas */}
        <div className="flex flex-col gap-2.5">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="p-3.5 rounded-2xl bg-[#201e28] flex flex-col gap-2 shadow-sm border border-[#2a2933]/60 transition-transform active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      reward.badgeType === 'success'
                        ? 'bg-[#7c3aed] text-white'
                        : reward.badgeType === 'xp'
                        ? 'bg-[#4f319c] text-white'
                        : 'bg-[#2a2933] text-[#4cd7f6]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{reward.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-xs text-[#e5e0ee] truncate">{reward.title}</h3>
                    <p className="text-[11px] text-[#ccc3d8]">
                      Código: <span className="font-semibold text-[#d2bbff]">{reward.code}</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    reward.badgeType === 'success'
                      ? 'bg-[#007184] text-[#b7efff]'
                      : reward.badgeType === 'xp'
                      ? 'bg-[#7c3aed] text-white'
                      : 'bg-[#35333e] text-[#ccc3d8]'
                  }`}
                >
                  {reward.badgeType === 'success' && (
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  )}
                  {reward.badgeType === 'xp' && (
                    <span className="material-symbols-outlined text-[13px]">bolt</span>
                  )}
                  {reward.badgeType === 'discount' && (
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                  )}
                  {reward.badgeText}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[#ccc3d8] text-[11px]">
                <span
                  className={
                    reward.badgeType === 'discount'
                      ? 'text-[#4cd7f6] font-semibold cursor-pointer hover:underline'
                      : ''
                  }
                  onClick={() => {
                    if (reward.badgeType === 'discount') {
                      onNavigateToCart();
                    }
                  }}
                >
                  {reward.subtext}
                </span>
                <span className="text-[#958da1]">{reward.dateText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón de Ayuda e Información */}
      <div className="flex justify-center pt-1">
        <button
          className="inline-flex items-center gap-2 py-2 px-4 rounded-full text-[#cebdff] hover:text-white text-xs font-semibold active:bg-[#201e28] transition-colors cursor-pointer"
          onClick={() => setShowHelpModal(true)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">help_outline</span>
          <span>¿Dónde encuentro códigos QR?</span>
        </button>
      </div>

      {/* Manual Code Input Modal */}
      {showCodeInputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#201e28] p-5 flex flex-col gap-4 border border-[#2a2933]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#e5e0ee]">Canjear Código o PIN</h3>
              <button
                onClick={() => setShowCodeInputModal(false)}
                className="text-[#958da1] hover:text-[#e5e0ee] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleManualRedeem} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#ccc3d8] font-medium" htmlFor="code-pin-input">
                  Código de activación
                </label>
                <input
                  id="code-pin-input"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#1c1a24] text-sm text-[#e5e0ee] font-mono tracking-widest uppercase placeholder:text-[#958da1] focus:outline-none border border-[#35333e] focus:border-[#7c3aed]"
                  placeholder="EJ. GZ-2024-XP"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowCodeInputModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#ccc3d8] hover:text-[#e5e0ee] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-xs font-bold shadow-md shadow-[#7c3aed]/30 active:scale-95 transition-all cursor-pointer"
                >
                  Canjear Ahora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#201e28] p-5 flex flex-col gap-4 border border-[#2a2933]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">info</span>
                <h3 className="font-bold text-base text-[#e5e0ee]">Dónde encontrar códigos QR</h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-[#958da1] hover:text-[#e5e0ee] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-xs text-[#ccc3d8] leading-relaxed flex flex-col gap-2.5">
              <p>
                <strong>1. Tarjetas de regalo físicas:</strong> Raspa el reverso de tu tarjeta GameZone
                y enfoca el código QR.
              </p>
              <p>
                <strong>2. Eventos y Streams Oficiales:</strong> Durante transmisiones en Twitch o YouTube,
                los creadores asociados publican códigos QR de drops limitados.
              </p>
              <p>
                <strong>3. Entradas a Torneos:</strong> Cada pase presencial incluye un código QR de
                insignia digital exclusiva.
              </p>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#2a2933] text-[#d2bbff] text-xs font-bold hover:bg-[#35333e] transition-colors cursor-pointer"
              type="button"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
