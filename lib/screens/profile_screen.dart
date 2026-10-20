import 'package:flutter/material.dart';
import '../models/game_models.dart';
import '../theme/app_theme.dart';

class ProfileScreen extends StatelessWidget {
  final UserProfile user;
  final Function(String) onUpdateAvatar;
  final VoidCallback onNavigateToScanner;
  final VoidCallback onLogout;
  final Function(String) onShowSnackBar;

  const ProfileScreen({
    super.key,
    required this.user,
    required this.onUpdateAvatar,
    required this.onNavigateToScanner,
    required this.onLogout,
    required this.onShowSnackBar,
  });

  void _showCameraDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: GameZoneColors.surfaceContainerHigh,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: GameZoneColors.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 16),
            const Text('Actualizar Foto de Perfil', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 20),
            ListTile(
              leading: const CircleAvatar(
                backgroundColor: GameZoneColors.primaryContainer,
                child: Icon(Icons.camera_alt, color: Colors.white),
              ),
              title: const Text('Tomar foto con Cámara'),
              subtitle: const Text('Modo Retrato Gaming'),
              onTap: () {
                Navigator.of(ctx).pop();
                onShowSnackBar('¡Foto tomada! Avatar actualizado');
              },
            ),
            ListTile(
              leading: const CircleAvatar(
                backgroundColor: GameZoneColors.secondaryContainer,
                child: Icon(Icons.photo_library, color: Colors.white),
              ),
              title: const Text('Elegir de Galería'),
              subtitle: const Text('Formatos PNG, JPG'),
              onTap: () {
                Navigator.of(ctx).pop();
                onShowSnackBar('Foto de perfil actualizada desde galería');
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      children: [
        // Avatar with gradient border
        Center(
          child: Stack(
            children: [
              Container(
                width: 112,
                height: 112,
                padding: const EdgeInsets.all(4),
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: [GameZoneColors.primaryContainer, GameZoneColors.primary, GameZoneColors.tertiary],
                  ),
                ),
                child: CircleAvatar(
                  backgroundImage: NetworkImage(user.avatar),
                  backgroundColor: GameZoneColors.surfaceContainerHigh,
                ),
              ),
              Positioned(
                bottom: 0,
                right: 0,
                child: Container(
                  width: 36,
                  height: 36,
                  decoration: const BoxDecoration(
                    color: GameZoneColors.primaryContainer,
                    shape: BoxShape.circle,
                  ),
                  child: IconButton(
                    padding: EdgeInsets.zero,
                    icon: const Icon(Icons.photo_camera, size: 18, color: Colors.white),
                    onPressed: () => _showCameraDialog(context),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),

        // User info
        Center(
          child: Column(
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(user.name, style: Theme.of(context).textTheme.headlineMedium),
                  const SizedBox(width: 6),
                  const Icon(Icons.verified, color: GameZoneColors.tertiary, size: 20),
                ],
              ),
              Text(user.gamertag, style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 13)),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: GameZoneColors.secondaryContainer.withOpacity(0.6),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.military_tech, color: GameZoneColors.tertiary, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      'MIEMBRO VIP NIVEL ${user.vipLevel}',
                      style: const TextStyle(color: GameZoneColors.secondary, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Stats Card
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: GameZoneColors.surfaceContainer,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatItem(Icons.sports_esports, user.gamesCount.toString(), 'Juegos', GameZoneColors.primary),
              _buildStatItem(Icons.emoji_events, user.trophiesCount.toString(), 'Trofeos', GameZoneColors.tertiary),
              _buildStatItem(Icons.stars, user.pointsCount.toString(), 'Puntos', GameZoneColors.secondary),
            ],
          ),
        ),
        const SizedBox(height: 16),

        ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            backgroundColor: GameZoneColors.primaryContainer,
            foregroundColor: Colors.white,
            minimumSize: const Size.fromHeight(48),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          ),
          onPressed: () => _showCameraDialog(context),
          icon: const Icon(Icons.photo_camera),
          label: const Text('Editar Foto de Perfil', style: TextStyle(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 20),

        // Bóveda de Recompensas
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [GameZoneColors.surfaceContainer, GameZoneColors.surfaceContainerHigh],
            ),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('BÓVEDA DE RECOMPENSAS', style: TextStyle(color: GameZoneColors.tertiary, fontSize: 10, fontWeight: FontWeight.bold)),
                  Icon(Icons.loyalty, color: GameZoneColors.tertiary),
                ],
              ),
              const SizedBox(height: 4),
              const Text('Mis Recompensas', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              const SizedBox(height: 8),
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(user.zCoins.toString(), style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),
                  const SizedBox(width: 8),
                  const Text('Z-Coins', style: TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 16)),
                ],
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: GameZoneColors.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        color: GameZoneColors.secondaryContainer,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.confirmation_number, color: GameZoneColors.onSecondaryContainer, size: 20),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Pase Épico Mensual', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          Text('Vence en ${user.monthlyPassExpiresDays} días', style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: GameZoneColors.secondaryContainer,
                        foregroundColor: GameZoneColors.onSecondaryContainer,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      onPressed: () => onShowSnackBar('Pase canjeado con éxito'),
                      child: const Text('Canjear', style: TextStyle(fontSize: 11)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: GameZoneColors.surfaceContainerHighest,
                  foregroundColor: GameZoneColors.primary,
                  minimumSize: const Size.fromHeight(46),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                ),
                onPressed: onNavigateToScanner,
                icon: const Icon(Icons.qr_code_scanner, color: GameZoneColors.tertiary),
                label: const Text('Escanear QR de Recompensas', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Account settings
        const Text('CONFIGURACIÓN DE CUENTA', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 10, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            color: GameZoneColors.surfaceContainer,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.lock_reset, color: GameZoneColors.primary),
                title: const Text('Seguridad y Acceso', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                subtitle: const Text('2FA activado, Contraseña', style: TextStyle(fontSize: 11)),
                trailing: const Icon(Icons.chevron_right, color: GameZoneColors.outline),
                onTap: () => onShowSnackBar('Ajustes de seguridad 2FA'),
              ),
              const Divider(color: GameZoneColors.surfaceContainerHigh, height: 1),
              ListTile(
                leading: const Icon(Icons.notifications_active, color: GameZoneColors.tertiary),
                title: const Text('Notificaciones', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                subtitle: const Text('Alertas de drops y torneos', style: TextStyle(fontSize: 11)),
                trailing: const Icon(Icons.chevron_right, color: GameZoneColors.outline),
                onTap: () => onShowSnackBar('Preferencias de notificaciones'),
              ),
              const Divider(color: GameZoneColors.surfaceContainerHigh, height: 1),
              ListTile(
                leading: const Icon(Icons.credit_card, color: GameZoneColors.secondary),
                title: const Text('Métodos de Pago', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                subtitle: const Text('Visa •••• 8842', style: TextStyle(fontSize: 11)),
                trailing: const Icon(Icons.chevron_right, color: GameZoneColors.outline),
                onTap: () => onShowSnackBar('Tarjetas guardadas'),
              ),
              const Divider(color: GameZoneColors.surfaceContainerHigh, height: 1),
              ListTile(
                leading: const Icon(Icons.logout, color: GameZoneColors.error),
                title: const Text('Cerrar Sesión', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: GameZoneColors.error)),
                trailing: const Icon(Icons.chevron_right, color: GameZoneColors.outline),
                onTap: onLogout,
              ),
            ],
          ),
        ),
        const SizedBox(height: 32),
      ],
    );
  }

  Widget _buildStatItem(IconData icon, String value, String label, Color color) {
    return Column(
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 18),
            const SizedBox(width: 4),
            Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          ],
        ),
        Text(label, style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
      ],
    );
  }
}
