import React, { useState } from 'react';

interface FlutterFile {
  name: string;
  path: string;
  category: 'Entry' | 'Theme' | 'Screens' | 'Models' | 'Config';
  code: string;
}

const FLUTTER_FILES: FlutterFile[] = [
  {
    name: 'main.dart',
    path: 'lib/main.dart',
    category: 'Entry',
    code: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'data/game_data.dart';
import 'models/game_models.dart';
import 'screens/main_screen.dart';
import 'screens/auth_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: GameZoneColors.surface,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const GameZoneApp());
}

class GameZoneApp extends StatefulWidget {
  const GameZoneApp({super.key});

  @override
  State<GameZoneApp> createState() => _GameZoneAppState();
}

class _GameZoneAppState extends State<GameZoneApp> {
  bool _isAuthenticated = true;
  late UserProfile _user;

  @override
  void initState() {
    super.initState();
    _user = getInitialUser();
  }

  void _loginUser(String identifier) {
    setState(() {
      _user.name = identifier;
      _user.gamertag = '@\$identifier';
      _isAuthenticated = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GameZone',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: _isAuthenticated
          ? MainScreen(
              user: _user,
              onLogout: () => setState(() => _isAuthenticated = false),
            )
          : AuthScreen(
              onLoginSuccess: _loginUser,
              onExploreAsGuest: () => setState(() => _isAuthenticated = true),
              onShowSnackBar: (msg) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(msg)),
                );
              },
            ),
    );
  }
}`,
  },
  {
    name: 'app_theme.dart',
    path: 'lib/theme/app_theme.dart',
    category: 'Theme',
    code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class GameZoneColors {
  static const Color surface = Color(0xFF13121B);
  static const Color surfaceContainerLow = Color(0xFF1C1A24);
  static const Color surfaceContainer = Color(0xFF201E28);
  static const Color surfaceContainerHigh = Color(0xFF2A2933);
  static const Color surfaceContainerHighest = Color(0xFF35333E);
  static const Color onSurface = Color(0xFFE5E0EE);
  static const Color onSurfaceVariant = Color(0xFFCCC3D8);
  static const Color primary = Color(0xFFD2BBFF);
  static const Color primaryContainer = Color(0xFF7C3AED);
  static const Color secondary = Color(0xFFCEBDFF);
  static const Color secondaryContainer = Color(0xFF4F319C);
  static const Color tertiary = Color(0xFF4CD7F6);
  static const Color tertiaryContainer = Color(0xFF007184);
  static const Color error = Color(0xFFFFB4AB);
  static const Color outline = Color(0xFF958DA1);
}

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: GameZoneColors.surface,
      textTheme: TextTheme(
        displayLarge: GoogleFonts.outfit(fontSize: 40, fontWeight: FontWeight.bold, color: GameZoneColors.onSurface),
        headlineMedium: GoogleFonts.outfit(fontSize: 24, fontWeight: FontWeight.w600, color: GameZoneColors.onSurface),
        headlineSmall: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.w600, color: GameZoneColors.onSurface),
        titleMedium: GoogleFonts.plusJakartaSans(fontSize: 16, fontWeight: FontWeight.w600, color: GameZoneColors.onSurface),
        bodyMedium: GoogleFonts.plusJakartaSans(fontSize: 14, color: GameZoneColors.onSurfaceVariant),
        bodySmall: GoogleFonts.plusJakartaSans(fontSize: 12, color: GameZoneColors.onSurfaceVariant),
      ),
    );
  }
}`,
  },
  {
    name: 'home_screen.dart',
    path: 'lib/screens/home_screen.dart',
    category: 'Screens',
    code: `// HomeScreen en Flutter con Categorías, Tarjeta Hero Galaxy Raiders,
// Oferta Neon Nexus 2084 con temporizador y Turbo Circuit TOP 3
// (Ver código completo en /flutter_app/lib/screens/home_screen.dart)`,
  },
  {
    name: 'cart_screen.dart',
    path: 'lib/screens/cart_screen.dart',
    category: 'Screens',
    code: `// CartScreen en Flutter con módulo interactivo Z-Coins Gamer Club,
// Switch canjeador de 1,000 Z-Coins (-$100 MXN), cupones,
// métodos de pago y modal de compra confirmada.
// (Ver código completo en /flutter_app/lib/screens/cart_screen.dart)`,
  },
  {
    name: 'game_detail_screen.dart',
    path: 'lib/screens/game_detail_screen.dart',
    category: 'Screens',
    code: `// GameDetailScreen en Flutter con cover hero, selector de plataformas,
// acordeones animados (Características Clave y Gameplay), desglose de reseñas
// y barra inferior fija de agregar al carrito.
// (Ver código completo en /flutter_app/lib/screens/game_detail_screen.dart)`,
  },
  {
    name: 'library_screen.dart',
    path: 'lib/screens/library_screen.dart',
    category: 'Screens',
    code: `// LibraryScreen en Flutter con Spotlight de Galaxy Raiders (Logros 68%),
// títulos instalados, descarga simulada interactiva (Pausar/Reanudar)
// y bento de estadísticas del jugador.
// (Ver código completo en /flutter_app/lib/screens/library_screen.dart)`,
  },
  {
    name: 'scanner_screen.dart',
    path: 'lib/screens/scanner_screen.dart',
    category: 'Screens',
    code: `// ScannerScreen en Flutter con HUD cibernético, animación de rayo láser con
// AnimationController, linterna interactiva y canje manual de códigos PIN.
// (Ver código completo en /flutter_app/lib/screens/scanner_screen.dart)`,
  },
  {
    name: 'profile_screen.dart',
    path: 'lib/screens/profile_screen.dart',
    category: 'Screens',
    code: `// ProfileScreen en Flutter con avatar degradado VIP Nvl 42,
// modal de cámara de retrato, bóveda de 3,450 Z-Coins y ajustes de cuenta 2FA.
// (Ver código completo en /flutter_app/lib/screens/profile_screen.dart)`,
  },
  {
    name: 'pubspec.yaml',
    path: 'pubspec.yaml',
    category: 'Config',
    code: `name: gamezone
description: "GameZone - Next-Gen Gaming Hub en Flutter con Material 3."
version: 1.0.0+1
environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1

flutter:
  uses-material-design: true`,
  },
];

interface FlutterCodeHubProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const FlutterCodeHub: React.FC<FlutterCodeHubProps> = ({ isOpen, onClose, showToast }) => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(selectedFile.code);
    setCopied(true);
    showToast(`Código de ${selectedFile.name} copiado`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl h-[85vh] rounded-3xl bg-[#1c1a24] border border-[#7c3aed]/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#201e28] border-b border-[#2a2933] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7c3aed] flex items-center justify-center text-white shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zM14.314 8.7L8.6 14.414 12.3 18.114 21.686 8.7h-7.372zM14.314 17.4L12.3 19.414 16.886 24h7.372l-9.944-6.6z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#e5e0ee] flex items-center gap-2">
                GameZone en Flutter 3
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#007184] text-[#b7efff]">
                  PROYECTO COMPLETO
                </span>
              </h2>
              <p className="text-xs text-[#ccc3d8]">Archivos listos en el directorio /flutter_app</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2933] text-[#ccc3d8] hover:text-white flex items-center justify-center cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-56 bg-[#13121b] border-r border-[#2a2933] p-3 overflow-y-auto flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#958da1] uppercase tracking-wider px-2 py-1">
              Archivos Flutter Dart
            </span>
            {FLUTTER_FILES.map((file) => {
              const isSelected = selectedFile.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7c3aed] text-white shadow-md'
                      : 'text-[#ccc3d8] hover:bg-[#201e28] hover:text-[#e5e0ee]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {file.name.endsWith('.yaml') ? 'description' : 'code'}
                  </span>
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}

            <div className="mt-4 p-2.5 rounded-xl bg-[#201e28] border border-[#2a2933] text-[11px] text-[#ccc3d8]">
              <span className="font-bold text-[#4cd7f6] block mb-1">Para ejecutar en terminal:</span>
              <code className="text-[#d2bbff] block font-mono text-[10px]">cd flutter_app</code>
              <code className="text-[#d2bbff] block font-mono text-[10px]">flutter pub get</code>
              <code className="text-[#d2bbff] block font-mono text-[10px]">flutter run</code>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-[#0e0d16] overflow-hidden">
            <div className="px-4 py-2 bg-[#1c1a24] border-b border-[#2a2933] flex items-center justify-between">
              <span className="text-xs font-mono text-[#d2bbff]">{selectedFile.path}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2a2933] hover:bg-[#35333e] text-xs font-semibold text-[#e5e0ee] transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copiado' : 'Copiar Código'}</span>
              </button>
            </div>

            <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-[#e5e0ee] leading-relaxed select-text">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
