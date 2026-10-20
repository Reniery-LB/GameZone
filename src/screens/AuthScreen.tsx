import React, { useState } from 'react';
import { GAMEZONE_LOGO, COMMUNITY_AVATARS } from '../data/mockData';

interface AuthScreenProps {
  initialMode?: 'login' | 'register';
  onLoginSuccess: (userIdentifier: string) => void;
  onExploreAsGuest: () => void;
  showToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onExploreAsGuest,
  showToast,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form states
  const [identifier, setIdentifier] = useState<string>('alex_gamer');
  const [password, setPassword] = useState<string>('AlexGamer2024!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberSession, setRememberSession] = useState<boolean>(true);

  // Register form states
  const [regGamertag, setRegGamertag] = useState<string>('ShadowGamer99');
  const [regEmail, setRegEmail] = useState<string>('alex@ejemplo.com');
  const [regPassword, setRegPassword] = useState<string>('GameMaster99!');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('GameMaster99!');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true);
  const [acceptNewsletter, setAcceptNewsletter] = useState<boolean>(true);

  // Password strength logic
  const hasLength = regPassword.length >= 8;
  const hasCaps = /[A-Z]/.test(regPassword);
  const hasNum = /[0-9]/.test(regPassword);
  const strengthScore = (hasLength ? 1 : 0) + (hasCaps ? 1 : 0) + (hasNum ? 1 : 0);

  const getStrengthLabel = () => {
    if (strengthScore <= 1) return { text: 'Débil', color: 'text-[#ffb4ab]' };
    if (strengthScore === 2) return { text: 'Media', color: 'text-[#d2bbff]' };
    return { text: '¡Excelente!', color: 'text-[#4cd7f6]' };
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      showToast('Por favor ingresa tu usuario o correo');
      return;
    }
    showToast(`¡Bienvenido de nuevo, ${identifier}!`);
    onLoginSuccess(identifier);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      showToast('Debes aceptar los Términos de Servicio');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showToast('Las contraseñas no coinciden');
      return;
    }
    showToast(`¡Cuenta creada con éxito! +500 XP acreditados.`);
    onLoginSuccess(regGamertag);
  };

  const handleSocialAuth = (provider: 'Google' | 'Apple') => {
    showToast(`Iniciando sesión segura con ${provider}...`);
    setTimeout(() => {
      onLoginSuccess(provider === 'Google' ? 'Alex Google' : 'Alex Apple');
    }, 700);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 animate-in fade-in duration-300">
      {mode === 'login' ? (
        /* LOGIN VIEW */
        <div className="flex flex-col items-center">
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute -top-10 w-48 h-48 bg-[#7c3aed]/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-28 right-0 w-32 h-32 bg-[#4cd7f6]/10 rounded-full blur-2xl pointer-events-none -z-10" />

          {/* Centered Brand Header */}
          <div className="flex flex-col items-center text-center mt-3 mb-6">
            <div className="relative flex items-center justify-center p-2 mb-2">
              <div className="absolute inset-0 bg-[#7c3aed]/30 rounded-3xl blur-xl scale-95" />
              <div className="relative w-24 h-24 rounded-3xl bg-[#201e28] flex items-center justify-center shadow-[0_12px_36px_-6px_rgba(124,58,237,0.35)] overflow-hidden border border-[#7c3aed]/30">
                <img
                  alt="GameZone Brand Emblem"
                  className="w-20 h-20 object-contain drop-shadow-md"
                  src={GAMEZONE_LOGO}
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a2933] text-[#d2bbff] mb-2 shadow-sm border border-[#35333e]">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sports_esports
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider">Next-Gen Gaming</span>
            </div>

            <h2 className="font-bold text-3xl text-[#e5e0ee] tracking-tight font-headline">GameZone</h2>
            <p className="text-xs text-[#ccc3d8] mt-1 max-w-[260px]">
              Tu tienda de videojuegos definitiva y biblioteca digital
            </p>
          </div>

          {/* Login Form Card */}
          <form
            onSubmit={handleLoginSubmit}
            className="w-full bg-[#201e28] p-5 rounded-3xl shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)] flex flex-col gap-4 relative overflow-hidden border border-[#2a2933]"
          >
            {/* Top subtle highlight shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d2bbff]/30 to-transparent" />

            {/* Input: Email / Username */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold text-[#ccc3d8] flex items-center justify-between"
                htmlFor="username-field"
              >
                <span>Usuario o correo</span>
                <span className="text-[#4cd7f6] text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
                  Seguro
                </span>
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-[#958da1]">
                  <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                </div>
                <input
                  className="w-full pl-11 pr-4 py-3 bg-[#1c1a24] text-[#e5e0ee] placeholder:text-[#958da1]/70 text-xs rounded-2xl outline-none focus:bg-[#0e0d16] border border-[#35333e] focus:border-[#7c3aed] transition-all"
                  id="username-field"
                  placeholder="ej. alex_gamer o alex@gamezone.com"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input: Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#ccc3d8]" htmlFor="password-field">
                  Contraseña
                </label>
                <button
                  className="text-[11px] text-[#d2bbff] hover:underline cursor-pointer"
                  onClick={() => showToast('Se envió un enlace para restablecer tu contraseña')}
                  type="button"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-[#958da1]">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  className="w-full pl-11 pr-12 py-3 bg-[#1c1a24] text-[#e5e0ee] placeholder:text-[#958da1]/70 text-xs rounded-2xl outline-none focus:bg-[#0e0d16] border border-[#35333e] focus:border-[#7c3aed] transition-all"
                  id="password-field"
                  placeholder="••••••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  aria-label="Alternar visibilidad de contraseña"
                  className="absolute right-3 p-1.5 rounded-xl text-[#958da1] hover:text-[#e5e0ee] active:scale-95 transition-all cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember device quick toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div className="relative inline-flex items-center">
                  <input
                    checked={rememberSession}
                    onChange={(e) => setRememberSession(e.target.checked)}
                    className="sr-only"
                    type="checkbox"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      rememberSession ? 'bg-[#7c3aed]' : 'bg-[#35333e]'
                    }`}
                  >
                    <div
                      className={`absolute top-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-200 shadow-md ${
                        rememberSession ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                </div>
                <span className="text-xs text-[#ccc3d8]">Recordar sesión</span>
              </label>

              <span className="text-[11px] text-[#958da1] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                256-bit
              </span>
            </div>

            {/* Primary Action CTA */}
            <button
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#7c3aed] hover:bg-[#732ee4] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(124,58,237,0.45)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.6)] active:scale-[0.98] transition-all cursor-pointer"
              type="submit"
            >
              <span>Iniciar sesión</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            {/* Visual Separator */}
            <div className="flex items-center my-1">
              <div className="flex-grow h-px bg-[#35333e]" />
              <span className="px-3 text-[10px] font-bold text-[#958da1] uppercase tracking-wider">
                o continúa con
              </span>
              <div className="flex-grow h-px bg-[#35333e]" />
            </div>

            {/* Quick Social Access Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#2a2933] text-[#e5e0ee] text-xs font-semibold hover:bg-[#35333e] active:scale-95 transition-all shadow-sm cursor-pointer"
                onClick={() => handleSocialAuth('Google')}
                type="button"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="truncate">Google</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#2a2933] text-[#e5e0ee] text-xs font-semibold hover:bg-[#35333e] active:scale-95 transition-all shadow-sm cursor-pointer"
                onClick={() => handleSocialAuth('Apple')}
                type="button"
              >
                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.79.93-2.83-.9.04-1.98.6-2.63 1.35-.57.65-1.06 1.72-.93 2.73 1 .08 2.01-.5 2.63-1.25Z" />
                </svg>
                <span className="truncate">Apple</span>
              </button>
            </div>
          </form>

          {/* Guest Play Mode Shortcut Card */}
          <div
            className="w-full mt-4 p-3.5 bg-[#1c1a24] rounded-2xl flex items-center justify-between border border-[#2a2933] cursor-pointer hover:bg-[#201e28] transition-all"
            onClick={onExploreAsGuest}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#007184]/30 flex items-center justify-center text-[#4cd7f6]">
                <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-xs text-[#e5e0ee]">Modo Explorador</span>
                <span className="text-[11px] text-[#ccc3d8]">Accede sin iniciar sesión</span>
              </div>
            </div>

            <button
              className="w-9 h-9 rounded-full bg-[#2a2933] flex items-center justify-center text-[#e5e0ee] hover:text-[#d2bbff] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Registration Link Footer */}
          <div className="mt-5 text-center flex flex-col items-center gap-1.5">
            <p className="text-xs text-[#ccc3d8]">
              ¿No tienes cuenta?
              <button
                className="font-bold text-[#d2bbff] hover:text-white underline decoration-[#7c3aed] underline-offset-4 ml-1 cursor-pointer"
                onClick={() => setMode('register')}
                type="button"
              >
                Registrarse
              </button>
            </p>
            <span className="text-[10px] text-[#958da1]">
              Al continuar aceptas los Términos y Política de GameZone
            </span>
          </div>
        </div>
      ) : (
        /* REGISTER VIEW */
        <div className="flex flex-col items-center">
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute -top-12 w-64 h-64 bg-[#7c3aed]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 -right-10 w-44 h-44 bg-[#007184]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Gamified Badge Header */}
          <div className="relative z-10 flex flex-col items-center text-center pt-2">
            <div className="relative mb-2 group">
              <div className="absolute inset-0 bg-[#7c3aed]/40 rounded-2xl blur-lg" />
              <div className="relative w-16 h-16 rounded-2xl bg-[#2a2933] flex items-center justify-center shadow-xl border border-[#7c3aed]/30">
                <span
                  className="material-symbols-outlined text-[36px] text-[#d2bbff]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sports_esports
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#4cd7f6] text-[#003640] rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </div>
            </div>

            <h2 className="font-bold text-3xl text-[#e5e0ee] tracking-tight font-headline">
              Crear Cuenta
            </h2>
            <p className="text-xs text-[#ccc3d8] mt-1 max-w-[300px]">
              Únete a la comunidad definitiva de gamers en GameZone
            </p>

            {/* Gamer XP Welcome Pill */}
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4f319c]/30 text-[#cebdff] shadow-sm border border-[#7c3aed]/30">
              <span
                className="material-symbols-outlined text-[16px] text-[#cebdff]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider">
                +500 XP Iniciales Gratis
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form
            onSubmit={handleRegisterSubmit}
            className="flex flex-col gap-4 mt-5 w-full relative z-10"
          >
            {/* Gamertag Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#e5e0ee]" htmlFor="gamertag">
                  Nombre de usuario o Gamertag
                </label>
                <span className="text-[11px] font-bold text-[#4cd7f6]">Disponible</span>
              </div>

              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#958da1] text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  className="w-full bg-[#1c1a24] text-[#e5e0ee] placeholder:text-[#958da1]/60 text-xs pl-11 pr-4 py-3 rounded-xl border border-[#35333e] focus:border-[#7c3aed] outline-none transition-all"
                  id="gamertag"
                  placeholder="ej. ShadowGamer99"
                  required
                  type="text"
                  value={regGamertag}
                  onChange={(e) => setRegGamertag(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#e5e0ee]" htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#958da1] text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  className="w-full bg-[#1c1a24] text-[#e5e0ee] placeholder:text-[#958da1]/60 text-xs pl-11 pr-4 py-3 rounded-xl border border-[#35333e] focus:border-[#7c3aed] outline-none transition-all"
                  id="email"
                  placeholder="alex@ejemplo.com"
                  required
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input with Strength Checker */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#e5e0ee]" htmlFor="password">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#958da1] text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  className="w-full bg-[#1c1a24] text-[#e5e0ee] placeholder:text-[#958da1]/60 text-xs pl-11 pr-12 py-3 rounded-xl border border-[#35333e] focus:border-[#7c3aed] outline-none transition-all"
                  id="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <button
                  aria-label="Mostrar u ocultar contraseña"
                  className="absolute right-2.5 w-9 h-9 flex items-center justify-center rounded-lg text-[#958da1] hover:text-[#e5e0ee] transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Password Strength Meter */}
              <div className="bg-[#1c1a24] p-3 rounded-xl flex flex-col gap-2 mt-1 border border-[#2a2933]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#ccc3d8]">Nivel de seguridad</span>
                  <span className={`text-[11px] font-bold ${getStrengthLabel().color}`}>
                    {getStrengthLabel().text}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 w-full h-1.5">
                  <div
                    className={`rounded-full h-full transition-all ${
                      strengthScore >= 1 ? 'bg-[#7c3aed]' : 'bg-[#35333e]'
                    }`}
                  />
                  <div
                    className={`rounded-full h-full transition-all ${
                      strengthScore >= 2 ? 'bg-[#7c3aed]' : 'bg-[#35333e]'
                    }`}
                  />
                  <div
                    className={`rounded-full h-full transition-all ${
                      strengthScore >= 3 ? 'bg-[#4cd7f6]' : 'bg-[#35333e]'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-1 mt-1">
                  <div
                    className={`flex items-center gap-1 ${
                      hasLength ? 'text-[#e5e0ee]' : 'text-[#958da1]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        hasLength ? 'text-[#4cd7f6]' : 'text-[#958da1]'
                      }`}
                    >
                      {hasLength ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className="text-[11px]">8+ chars</span>
                  </div>

                  <div
                    className={`flex items-center gap-1 ${
                      hasCaps ? 'text-[#e5e0ee]' : 'text-[#958da1]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        hasCaps ? 'text-[#4cd7f6]' : 'text-[#958da1]'
                      }`}
                    >
                      {hasCaps ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className="text-[11px]">1 Mayús</span>
                  </div>

                  <div
                    className={`flex items-center gap-1 ${
                      hasNum ? 'text-[#e5e0ee]' : 'text-[#958da1]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        hasNum ? 'text-[#4cd7f6]' : 'text-[#958da1]'
                      }`}
                    >
                      {hasNum ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className="text-[11px]">1 Número</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#e5e0ee]" htmlFor="confirm-password">
                Confirmar contraseña
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#958da1] text-[20px] pointer-events-none">
                  verified_user
                </span>
                <input
                  className="w-full bg-[#1c1a24] text-[#e5e0ee] placeholder:text-[#958da1]/60 text-xs pl-11 pr-4 py-3 rounded-xl border border-[#35333e] focus:border-[#7c3aed] outline-none transition-all"
                  id="confirm-password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Checkboxes & Policies */}
            <div className="flex flex-col gap-2 mt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="sr-only"
                  type="checkbox"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    acceptTerms ? 'bg-[#7c3aed]' : 'bg-[#2a2933]'
                  }`}
                >
                  {acceptTerms && (
                    <span className="material-symbols-outlined text-[16px] text-white font-bold">
                      check
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#ccc3d8]">
                  Acepto los <span className="text-[#d2bbff] underline">Términos de Servicio</span> y
                  la <span className="text-[#d2bbff] underline">Política de Privacidad</span> de
                  GameZone.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  checked={acceptNewsletter}
                  onChange={(e) => setAcceptNewsletter(e.target.checked)}
                  className="sr-only"
                  type="checkbox"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    acceptNewsletter ? 'bg-[#7c3aed]' : 'bg-[#2a2933]'
                  }`}
                >
                  {acceptNewsletter && (
                    <span className="material-symbols-outlined text-[16px] text-white font-bold">
                      check
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#ccc3d8]">
                  Deseo recibir ofertas exclusivas, drops y noticias de lanzamientos gaming.
                </span>
              </label>
            </div>

            {/* Primary CTA */}
            <button
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#732ee4] to-[#7c3aed] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#7c3aed]/40 active:scale-[0.98] transition-all cursor-pointer"
              type="submit"
            >
              <span>Crear cuenta gratis</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative flex items-center justify-center my-5 w-full">
            <div className="w-full h-px bg-[#35333e]" />
            <span className="absolute px-3 bg-[#13121b] text-[#958da1] text-[10px] font-bold uppercase tracking-wider">
              O regístrate con
            </span>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#1c1a24] hover:bg-[#201e28] text-xs font-semibold text-[#e5e0ee] active:scale-[0.98] transition-all shadow-sm cursor-pointer border border-[#2a2933]"
              onClick={() => handleSocialAuth('Google')}
              type="button"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                  fill="#EA4335"
                />
                <path
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  fill="#4285F4"
                />
                <path
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.6.4-2.4L1.6 7C.6 9 0 10.5 0 12.3s.6 3.3 1.6 5.3l3.7-2.9z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 23.6c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 20.8 7.4 23.6 12 23.6z"
                  fill="#34A853"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#1c1a24] hover:bg-[#201e28] text-xs font-semibold text-[#e5e0ee] active:scale-[0.98] transition-all shadow-sm cursor-pointer border border-[#2a2933]"
              onClick={() => handleSocialAuth('Apple')}
              type="button"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.93-2.84-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.71-.93 2.72 1 .08 2.01-.48 2.63-1.23z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Recent Gamers Joining Micro-Ticker */}
          <div className="mt-5 p-3 rounded-2xl bg-[#1c1a24] flex items-center justify-between w-full border border-[#2a2933]">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {COMMUNITY_AVATARS.map((avatar, idx) => (
                  <img
                    key={idx}
                    alt="Gamer Community"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#13121b]"
                    src={avatar}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e5e0ee]">1,420+ gamers</span>
                <span className="text-[10px] text-[#958da1]">unidos hoy</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#4cd7f6]">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
              <span className="text-[11px] font-semibold">En vivo</span>
            </div>
          </div>

          {/* Footer Navigation Link */}
          <div className="mt-5 text-center">
            <p className="text-xs text-[#ccc3d8]">
              ¿Ya tienes cuenta?
              <button
                className="text-[#d2bbff] hover:text-white font-bold ml-1 inline-flex items-center gap-0.5 cursor-pointer"
                onClick={() => setMode('login')}
                type="button"
              >
                <span>Iniciar sesión</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
