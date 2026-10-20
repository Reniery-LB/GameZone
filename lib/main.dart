import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'data/game_data.dart';
import 'firebase_options.dart';
import 'screens/auth_screen.dart';
import 'screens/main_screen.dart';
import 'theme/app_theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  String? firebaseError;
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (error, stackTrace) {
    firebaseError = error.toString();
    debugPrint('Firebase initialization failed: $error\n$stackTrace');
  }

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: GameZoneColors.surface,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(GameZoneApp(firebaseError: firebaseError));
}

class GameZoneApp extends StatefulWidget {
  final String? firebaseError;

  const GameZoneApp({super.key, this.firebaseError});

  @override
  State<GameZoneApp> createState() => _GameZoneAppState();
}

class _GameZoneAppState extends State<GameZoneApp> {
  final _messengerKey = GlobalKey<ScaffoldMessengerState>();
  bool _guestMode = false;

  void _showSnackBar(String message) {
    _messengerKey.currentState
      ?..hideCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text(message)));
  }

  Future<void> _signOut() async {
    try {
      await FirebaseAuth.instance.signOut();
    } on FirebaseAuthException catch (error) {
      _showSnackBar(error.message ?? 'No se pudo cerrar la sesión.');
    }
  }

  void _logout() {
    if (_guestMode) {
      setState(() => _guestMode = false);
      return;
    }
    _signOut();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GameZone',
      debugShowCheckedModeBanner: false,
      scaffoldMessengerKey: _messengerKey,
      theme: AppTheme.darkTheme,
      home: widget.firebaseError != null
          ? _FirebaseSetupError(message: widget.firebaseError!)
          : _guestMode
              ? MainScreen(user: getInitialUser(), onLogout: _logout)
              : StreamBuilder<User?>(
                  stream: FirebaseAuth.instance.userChanges(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Scaffold(
                        body: Center(child: CircularProgressIndicator()),
                      );
                    }

                    if (snapshot.hasError) {
                      return _FirebaseSetupError(
                        message: snapshot.error.toString(),
                      );
                    }

                    final user = snapshot.data;
                    if (user == null) {
                      return AuthScreen(
                        onExploreAsGuest: () => setState(() => _guestMode = true),
                        onShowSnackBar: _showSnackBar,
                      );
                    }

                    final profile = getInitialUser();
                    final displayName = user.displayName?.trim().isNotEmpty == true
                        ? user.displayName!.trim()
                        : (user.email?.split('@').first ?? 'Usuario');
                    profile.name = displayName;
                    profile.gamertag = '@$displayName';

                    return MainScreen(user: profile, onLogout: _logout);
                  },
                ),
    );
  }
}

class _FirebaseSetupError extends StatelessWidget {
  final String message;

  const _FirebaseSetupError({required this.message});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GameZoneColors.surface,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.cloud_off, size: 48, color: GameZoneColors.error),
              const SizedBox(height: 16),
              const Text(
                'No se pudo conectar con Firebase',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text(
                'Revisa la configuración de Firebase para esta plataforma.',
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              SelectableText(message, textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }
}
