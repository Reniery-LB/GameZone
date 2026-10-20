import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import '../theme/app_theme.dart';

class AuthScreen extends StatefulWidget {
  final VoidCallback onExploreAsGuest;
  final Function(String) onShowSnackBar;

  const AuthScreen({
    super.key,
    required this.onExploreAsGuest,
    required this.onShowSnackBar,
  });

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool _isLogin = true;
  bool _obscurePassword = true;
  bool _rememberMe = true;
  bool _isLoading = false;
  bool _googleSignInInitialized = false;

  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _gamertagController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  void _showError(Object error, String action) {
    final String message;
    if (error is FirebaseAuthException) {
      message = switch (error.code) {
        'invalid-email' => 'El correo electrónico no tiene un formato válido.',
        'user-not-found' || 'wrong-password' || 'invalid-credential' =>
          'Correo o contraseña incorrectos.',
        'email-already-in-use' => 'Ese correo ya tiene una cuenta. Inicia sesión.',
        'weak-password' => 'La contraseña debe tener al menos 6 caracteres.',
        'operation-not-allowed' =>
          'Este método de acceso aún no está activado en Firebase.',
        'account-exists-with-different-credential' =>
          'Ese correo ya está asociado a otro método de acceso.',
        'network-request-failed' =>
          'Revisa tu conexión a internet e inténtalo de nuevo.',
        'too-many-requests' =>
          'Hubo demasiados intentos. Espera un momento y vuelve a intentar.',
        'popup-closed-by-user' || 'web-context-cancelled' =>
          'Se canceló el inicio de sesión.',
        _ => error.message ?? 'Ocurrió un error de autenticación.',
      };
    } else {
      final errStr = error.toString().toLowerCase();
      if (errStr.contains('cancel') || errStr.contains('dismissed')) {
        message = 'Se canceló el inicio de sesión.';
      } else {
        message = error.toString();
      }
    }
    widget.onShowSnackBar('$action: $message');
  }

  Future<void> _runAuthAction(
    Future<void> Function() action,
    String label,
  ) async {
    if (_isLoading) return;
    setState(() => _isLoading = true);
    try {
      if (kIsWeb) {
        await FirebaseAuth.instance.setPersistence(
          _rememberMe ? Persistence.LOCAL : Persistence.SESSION,
        );
      }
      await action();
    } catch (error) {
      _showError(error, label);
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    _gamertagController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _signInWithGoogle() async {
    if (!kIsWeb &&
        !const [
          TargetPlatform.android,
          TargetPlatform.iOS,
          TargetPlatform.macOS,
        ].contains(defaultTargetPlatform)) {
      widget.onShowSnackBar(
        'Google Sign-In no está disponible en Windows. Prueba en Android o continúa con correo.',
      );
      return;
    }
    await _runAuthAction(() async {
      late final UserCredential userCredential;
      if (kIsWeb) {
        userCredential = await FirebaseAuth.instance.signInWithPopup(GoogleAuthProvider());
      } else {
        final googleSignIn = GoogleSignIn.instance;
        if (!_googleSignInInitialized) {
          await googleSignIn.initialize(
            serverClientId: '18184194100-imlu27c6riqoa54jncngg7knsl8f10ag.apps.googleusercontent.com',
          );
          _googleSignInInitialized = true;
        }
        final googleUser = await googleSignIn.authenticate();
        final googleAuth = googleUser.authentication;
        final idToken = googleAuth.idToken;
        if (idToken == null) {
          throw FirebaseAuthException(
            code: 'missing-google-id-token',
            message: 'Google no devolvió un token. Revisa la configuración OAuth de Firebase.',
          );
        }
        final credential = GoogleAuthProvider.credential(idToken: idToken);
        userCredential = await FirebaseAuth.instance.signInWithCredential(credential);
      }
      if (userCredential.user == null) {
        throw FirebaseAuthException(
          code: 'missing-user',
          message: 'Google no devolvió una cuenta.',
        );
      }
    }, 'No se pudo iniciar sesión con Google');
  }

  Future<void> _signInWithFacebook() async {
    if (!kIsWeb &&
        !const [TargetPlatform.android, TargetPlatform.iOS].contains(defaultTargetPlatform)) {
      widget.onShowSnackBar('Facebook Sign-In está disponible en Android, iOS y web.');
      return;
    }
    await _runAuthAction(() async {
      if (kIsWeb) {
        await FirebaseAuth.instance.signInWithPopup(FacebookAuthProvider());
        return;
      }

      final result = await FacebookAuth.instance.login(
        permissions: const ['public_profile'],
      );
      if (result.status == LoginStatus.cancelled) return;
      if (result.status != LoginStatus.success || result.accessToken == null) {
        throw FirebaseAuthException(
          code: 'facebook-login-failed',
          message: result.message ?? 'Facebook no devolvió un token de acceso.',
        );
      }
      final credential = FacebookAuthProvider.credential(
        result.accessToken!.tokenString,
      );
      await FirebaseAuth.instance.signInWithCredential(credential);
    }, 'No se pudo iniciar sesión con Facebook');
  }

  Future<void> _signInWithGitHub() async {
    if (!kIsWeb &&
        !const [
          TargetPlatform.android,
          TargetPlatform.iOS,
          TargetPlatform.macOS,
        ].contains(defaultTargetPlatform)) {
      widget.onShowSnackBar('GitHub Sign-In está disponible en Android, iOS, macOS y web.');
      return;
    }
    await _runAuthAction(() async {
      final githubProvider = GithubAuthProvider();
      githubProvider.addScope('read:user');
      githubProvider.addScope('user:email');
      if (kIsWeb) {
        await FirebaseAuth.instance.signInWithPopup(githubProvider);
      } else {
        await FirebaseAuth.instance.signInWithProvider(githubProvider);
      }
    }, 'No se pudo iniciar sesión con GitHub');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GameZoneColors.surface,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 400),
              child: _isLogin ? _buildLoginView() : _buildRegisterView(),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLoginView() {
    return Column(
      children: [
        // Brand logo
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: GameZoneColors.surfaceContainer,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: GameZoneColors.primaryContainer.withOpacity(0.4)),
            boxShadow: [
              BoxShadow(
                color: GameZoneColors.primaryContainer.withOpacity(0.3),
                blurRadius: 20,
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: Image.asset(
              'assets/images/logo.png',
              fit: BoxFit.contain,
              errorBuilder: (context, error, stackTrace) => const Icon(Icons.videogame_asset, size: 40, color: GameZoneColors.primary),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: GameZoneColors.surfaceContainerHigh,
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.sports_esports, color: GameZoneColors.primary, size: 16),
              SizedBox(width: 4),
              Text('NEXT-GEN GAMING', style: TextStyle(color: GameZoneColors.primary, fontSize: 10, fontWeight: FontWeight.bold)),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Text('GameZone', style: Theme.of(context).textTheme.headlineLarge),
        const Text(
          'Tu tienda de videojuegos definitiva y biblioteca digital',
          textAlign: TextAlign.center,
          style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 12),
        ),
        const SizedBox(height: 24),

        // Form Card
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: GameZoneColors.surfaceContainer,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: GameZoneColors.surfaceContainerHigh),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Correo electrónico', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              const SizedBox(height: 6),
              TextField(
                controller: _usernameController,
                keyboardType: TextInputType.emailAddress,
                autofillHints: const [AutofillHints.username, AutofillHints.email],
                style: const TextStyle(fontSize: 13),
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.alternate_email, color: GameZoneColors.outline, size: 20),
                  filled: true,
                  fillColor: GameZoneColors.surfaceContainerLow,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 14),

              const Text('Contraseña', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              const SizedBox(height: 6),
              TextField(
                controller: _passwordController,
                autofillHints: const [AutofillHints.password],
                obscureText: _obscurePassword,
                style: const TextStyle(fontSize: 13),
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.lock, color: GameZoneColors.outline, size: 20),
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword ? Icons.visibility : Icons.visibility_off, color: GameZoneColors.outline, size: 20),
                    onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                  ),
                  filled: true,
                  fillColor: GameZoneColors.surfaceContainerLow,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 10),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Switch(
                        value: _rememberMe,
                        activeColor: Colors.white,
                        activeTrackColor: GameZoneColors.primaryContainer,
                        onChanged: (val) => setState(() => _rememberMe = val),
                      ),
                      const Text('Recordar sesión', style: TextStyle(fontSize: 12)),
                    ],
                  ),
                  const Text('256-bit SSL', style: TextStyle(color: GameZoneColors.outline, fontSize: 11)),
                ],
              ),
              const SizedBox(height: 16),

              if (_isLoading)
                const Center(child: CircularProgressIndicator())
              else
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: GameZoneColors.primaryContainer,
                    foregroundColor: Colors.white,
                    minimumSize: const Size.fromHeight(48),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                  ),
                  onPressed: () async {
                    final user = _usernameController.text.trim();
                    final password = _passwordController.text;
                    if (user.isEmpty || password.isEmpty) {
                      widget.onShowSnackBar('Escribe tu correo y contraseña.');
                      return;
                    }
                    await _runAuthAction(() async {
                      await FirebaseAuth.instance.signInWithEmailAndPassword(
                        email: user,
                        password: password,
                      );
                    }, 'No se pudo iniciar sesión');
                  },
                  icon: const Icon(Icons.arrow_forward),
                  label: const Text('Iniciar sesión', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              const SizedBox(height: 16),

              const Center(
                child: Text('O CONTINÚA CON', style: TextStyle(color: GameZoneColors.outline, fontSize: 10, fontWeight: FontWeight.bold)),
              ),
              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        padding: const EdgeInsets.symmetric(vertical: 10),
                      ),
                      onPressed: _isLoading ? null : _signInWithGoogle,
                      child: const Text('Google', style: TextStyle(color: Colors.white, fontSize: 12)),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        padding: const EdgeInsets.symmetric(vertical: 10),
                      ),
                      onPressed: _isLoading ? null : _signInWithFacebook,
                      child: const Text('Facebook', style: TextStyle(color: Colors.white, fontSize: 12)),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        padding: const EdgeInsets.symmetric(vertical: 10),
                      ),
                      onPressed: _isLoading ? null : _signInWithGitHub,
                      child: const Text('GitHub', style: TextStyle(color: Colors.white, fontSize: 12)),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),

        // Explorer mode
        InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: widget.onExploreAsGuest,
          child: Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: GameZoneColors.surfaceContainerLow,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Row(
              children: [
                Icon(Icons.rocket_launch, color: GameZoneColors.tertiary),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Modo Explorador', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                      Text('Accede sin iniciar sesión', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                    ],
                  ),
                ),
                Icon(Icons.chevron_right, color: GameZoneColors.outline),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),

        TextButton(
          onPressed: () => setState(() => _isLogin = false),
          child: const Text('¿No tienes cuenta? Registrarse', style: TextStyle(color: GameZoneColors.primary)),
        ),
      ],
    );
  }

  Widget _buildRegisterView() {
    return Column(
      children: [
        const Icon(Icons.sports_esports, color: GameZoneColors.primary, size: 48),
        const SizedBox(height: 8),
        Text('Crear Cuenta', style: Theme.of(context).textTheme.headlineLarge),
        const Text(
          'Únete a la comunidad definitiva de gamers en GameZone',
          textAlign: TextAlign.center,
          style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 12),
        ),
        const SizedBox(height: 10),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: GameZoneColors.secondaryContainer.withOpacity(0.5),
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Text('+500 XP INICIALES GRATIS', style: TextStyle(color: GameZoneColors.secondary, fontSize: 10, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 20),

        TextField(
          controller: _gamertagController,
          decoration: InputDecoration(
            labelText: 'Gamertag',
            prefixIcon: const Icon(Icons.badge, color: GameZoneColors.outline),
            filled: true,
            fillColor: GameZoneColors.surfaceContainerLow,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _emailController,
          keyboardType: TextInputType.emailAddress,
          autofillHints: const [AutofillHints.email],
          decoration: InputDecoration(
            labelText: 'Correo electrónico',
            prefixIcon: const Icon(Icons.mail, color: GameZoneColors.outline),
            filled: true,
            fillColor: GameZoneColors.surfaceContainerLow,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _passwordController,
          obscureText: _obscurePassword,
          autofillHints: const [AutofillHints.newPassword],
          decoration: InputDecoration(
            labelText: 'Contraseña',
            prefixIcon: const Icon(Icons.lock, color: GameZoneColors.outline),
            filled: true,
            fillColor: GameZoneColors.surfaceContainerLow,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
          ),
        ),
        const SizedBox(height: 16),

        if (_isLoading)
          const Center(child: CircularProgressIndicator())
        else
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: GameZoneColors.primaryContainer,
              foregroundColor: Colors.white,
              minimumSize: const Size.fromHeight(48),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
            ),
            onPressed: () async {
              final email = _emailController.text.trim();
              final password = _passwordController.text;
              final tag = _gamertagController.text.trim();
              if (tag.isEmpty || email.isEmpty || password.isEmpty) {
                widget.onShowSnackBar('Completa tu gamertag, correo y contraseña.');
                return;
              }
              if (password.length < 6) {
                widget.onShowSnackBar('La contraseña debe tener al menos 6 caracteres.');
                return;
              }
              await _runAuthAction(() async {
                final credential = await FirebaseAuth.instance
                    .createUserWithEmailAndPassword(email: email, password: password);
                await credential.user?.updateDisplayName(tag);
                await credential.user?.reload();
                widget.onShowSnackBar('¡Cuenta creada correctamente!');
              }, 'No se pudo crear la cuenta');
            },
            child: const Text('Crear cuenta gratis', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        const SizedBox(height: 16),

        TextButton(
          onPressed: () => setState(() => _isLogin = true),
          child: const Text('¿Ya tienes cuenta? Iniciar sesión', style: TextStyle(color: GameZoneColors.primary)),
        ),
      ],
    );
  }
}
