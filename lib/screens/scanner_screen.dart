import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import '../models/game_models.dart';
import '../theme/app_theme.dart';

class ScannerScreen extends StatefulWidget {
  final List<RewardItem> rewards;
  final Function(String) onRedeemCode;
  final Function(String) onShowSnackBar;
  final VoidCallback onNavigateToCart;

  const ScannerScreen({
    super.key,
    required this.rewards,
    required this.onRedeemCode,
    required this.onShowSnackBar,
    required this.onNavigateToCart,
  });

  @override
  State<ScannerScreen> createState() => _ScannerScreenState();
}

class _ScannerScreenState extends State<ScannerScreen> with SingleTickerProviderStateMixin {
  bool _flashOn = false;
  bool _isProcessingCode = false;
  late AnimationController _laserController;
  late Animation<double> _laserAnimation;
  late MobileScannerController _scannerController;
  final TextEditingController _pinController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _scannerController = MobileScannerController(
      detectionSpeed: DetectionSpeed.noDuplicates,
      returnImage: false,
    );
    _laserController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2200),
    )..repeat(reverse: true);
    _laserAnimation = Tween<double>(begin: 0.15, end: 0.85).animate(
      CurvedAnimation(parent: _laserController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _scannerController.dispose();
    _laserController.dispose();
    _pinController.dispose();
    super.dispose();
  }

  void _handleBarcodeDetected(BarcodeCapture capture) {
    if (_isProcessingCode) return;
    for (final barcode in capture.barcodes) {
      final code = barcode.rawValue;
      if (code != null && code.trim().isNotEmpty) {
        setState(() => _isProcessingCode = true);
        widget.onShowSnackBar('¡Código QR detectado: $code!');
        widget.onRedeemCode(code.trim());
        // Cool-off period before scanning again
        Future.delayed(const Duration(seconds: 3), () {
          if (mounted) {
            setState(() => _isProcessingCode = false);
          }
        });
        break;
      }
    }
  }

  Future<void> _pickImageFromGallery() async {
    try {
      final picker = ImagePicker();
      final XFile? file = await picker.pickImage(source: ImageSource.gallery);
      if (file == null) return;

      widget.onShowSnackBar('Analizando imagen de la galería...');
      final BarcodeCapture? capture = await _scannerController.analyzeImage(file.path);
      if (capture != null && capture.barcodes.isNotEmpty) {
        final code = capture.barcodes.first.rawValue;
        if (code != null && code.trim().isNotEmpty) {
          widget.onShowSnackBar('¡Código QR encontrado: $code!');
          widget.onRedeemCode(code.trim());
          return;
        }
      }
      widget.onShowSnackBar('No se detectó un código QR válido en la imagen');
    } catch (e) {
      widget.onShowSnackBar('Error al leer imagen: $e');
    }
  }

  void _showManualCodeDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: GameZoneColors.surfaceContainerHigh,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Text('Canjear Código o PIN', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        content: TextField(
          controller: _pinController,
          textCapitalization: TextCapitalization.characters,
          style: const TextStyle(fontWeight: FontWeight.bold, letterSpacing: 2),
          decoration: InputDecoration(
            hintText: 'EJ. GZ-2024-XP',
            hintStyle: const TextStyle(color: GameZoneColors.outline, letterSpacing: 1),
            filled: true,
            fillColor: GameZoneColors.surfaceContainer,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancelar', style: TextStyle(color: GameZoneColors.outline)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: GameZoneColors.primaryContainer,
              foregroundColor: Colors.white,
            ),
            onPressed: () {
              final code = _pinController.text.trim();
              if (code.isNotEmpty) {
                Navigator.of(ctx).pop();
                _pinController.clear();
                widget.onRedeemCode(code);
              }
            },
            child: const Text('Canjear'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      children: [
        Row(
          children: [
            const Icon(Icons.qr_code_scanner, color: GameZoneColors.primary, size: 20),
            const SizedBox(width: 6),
            Text('SCANNER ACTIVO', style: Theme.of(context).textTheme.labelSmall?.copyWith(color: GameZoneColors.primary)),
          ],
        ),
        const SizedBox(height: 2),
        Text('Escáner de Recompensas', style: Theme.of(context).textTheme.headlineMedium),
        const Text('Canjea códigos y bonificaciones exclusivas al instante.', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 12)),
        const SizedBox(height: 16),

        // Cyber Viewfinder HUD
        Center(
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              color: GameZoneColors.surfaceContainerLowest,
              borderRadius: BorderRadius.circular(28),
              boxShadow: const [BoxShadow(color: Colors.black54, blurRadius: 16)],
            ),
            child: Stack(
              children: [
                // Cam preview background with live MobileScanner
                Positioned.fill(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(28),
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        MobileScanner(
                          controller: _scannerController,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error) {
                            return Container(
                              color: const Color(0xFF161426),
                              padding: const EdgeInsets.all(16),
                              child: Center(
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    const Icon(Icons.videocam_off, color: GameZoneColors.error, size: 36),
                                    const SizedBox(height: 8),
                                    Text(
                                      'Cámara inactiva o sin permisos',
                                      style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 12, fontWeight: FontWeight.bold),
                                      textAlign: TextAlign.center,
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      'Concede permiso de cámara en Ajustes para escanear en vivo',
                                      style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 10),
                                      textAlign: TextAlign.center,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                          onDetect: _handleBarcodeDetected,
                        ),
                        // Tint overlay for cyberpunk look
                        Container(
                          color: _flashOn ? Colors.deepPurple.shade900.withOpacity(0.2) : Colors.black.withOpacity(0.12),
                        ),
                      ],
                    ),
                  ),
                ),

                // Corner brackets
                _buildCornerBracket(top: 24, left: 24, isTop: true, isLeft: true),
                _buildCornerBracket(top: 24, right: 24, isTop: true, isLeft: false),
                _buildCornerBracket(bottom: 24, left: 24, isTop: false, isLeft: true),
                _buildCornerBracket(bottom: 24, right: 24, isTop: false, isLeft: false),

                // Animated Laser
                AnimatedBuilder(
                  animation: _laserAnimation,
                  builder: (context, child) {
                    return Positioned(
                      top: 300 * _laserAnimation.value,
                      left: 30,
                      right: 30,
                      child: Container(
                        height: 3,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Colors.transparent, GameZoneColors.tertiary, Colors.transparent],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: GameZoneColors.tertiary.withOpacity(0.8),
                              blurRadius: 10,
                              spreadRadius: 2,
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),

                // Status Pill
                Positioned(
                  bottom: 16,
                  left: 0,
                  right: 0,
                  child: Center(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: GameZoneColors.surfaceContainerHigh.withOpacity(0.9),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.circle, color: _isProcessingCode ? GameZoneColors.secondary : GameZoneColors.tertiary, size: 8),
                          const SizedBox(width: 6),
                          Text(
                            _isProcessingCode ? 'Procesando código...' : 'Buscando QR...',
                            style: const TextStyle(color: Colors.white, fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),

                // Controls
                Positioned(
                  top: 16,
                  right: 16,
                  child: Container(
                    decoration: BoxDecoration(
                      color: _flashOn ? GameZoneColors.tertiary : GameZoneColors.surfaceContainerHigh.withOpacity(0.8),
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: Icon(
                        _flashOn ? Icons.flash_on : Icons.flash_off,
                        color: _flashOn ? GameZoneColors.onTertiary : Colors.white,
                        size: 20,
                      ),
                      onPressed: () async {
                        try {
                          await _scannerController.toggleTorch();
                          setState(() => _flashOn = !_flashOn);
                          widget.onShowSnackBar(_flashOn ? 'Linterna encendida' : 'Linterna apagada');
                        } catch (e) {
                          widget.onShowSnackBar('Error al controlar linterna: $e');
                        }
                      },
                    ),
                  ),
                ),
                Positioned(
                  top: 16,
                  left: 16,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: GameZoneColors.surfaceContainerHigh.withOpacity(0.8),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.videocam, color: GameZoneColors.tertiary, size: 14),
                        SizedBox(width: 4),
                        Text('CAM 01', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Helper instruction & Gallery button
        Center(
          child: Column(
            children: [
              const Text('Apunta tu cámara a un código QR de recompensas', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 8),
              OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                ),
                onPressed: _pickImageFromGallery,
                icon: const Icon(Icons.photo_library, size: 16, color: GameZoneColors.primary),
                label: const Text('Elegir foto de la galería', style: TextStyle(color: GameZoneColors.primary, fontSize: 12)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Manual alphanumeric code input card
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: GameZoneColors.surfaceContainerLow,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: GameZoneColors.surfaceContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.keyboard, color: GameZoneColors.primary, size: 20),
              ),
              const SizedBox(width: 12),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('¿Tienes un código alfanumérico?', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                    Text('Escribe el PIN de tu tarjeta o cupón', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                  ],
                ),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: GameZoneColors.secondaryContainer,
                  foregroundColor: GameZoneColors.onSecondaryContainer,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                ),
                onPressed: _showManualCodeDialog,
                child: const Text('Ingresar', style: TextStyle(fontSize: 12)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Recent Rewards
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(Icons.verified, color: GameZoneColors.primary, size: 18),
                const SizedBox(width: 6),
                Text('Recompensas Recientes', style: Theme.of(context).textTheme.titleMedium),
              ],
            ),
            Text('${widget.rewards.length} Canjeadas', style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
          ],
        ),
        const SizedBox(height: 8),

        ...widget.rewards.map((rew) => _buildRewardCard(rew)),
        const SizedBox(height: 24),
      ],
    );
  }

  Widget _buildCornerBracket({double? top, double? bottom, double? left, double? right, required bool isTop, required bool isLeft}) {
    return Positioned(
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      child: Container(
        width: 24,
        height: 24,
        decoration: BoxDecoration(
          border: Border(
            top: isTop ? const BorderSide(color: GameZoneColors.primary, width: 3) : BorderSide.none,
            bottom: !isTop ? const BorderSide(color: GameZoneColors.primary, width: 3) : BorderSide.none,
            left: isLeft ? const BorderSide(color: GameZoneColors.primary, width: 3) : BorderSide.none,
            right: !isLeft ? const BorderSide(color: GameZoneColors.primary, width: 3) : BorderSide.none,
          ),
        ),
      ),
    );
  }

  Widget _buildRewardCard(RewardItem item) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: GameZoneColors.surfaceContainer,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: item.badgeType == 'success'
                        ? GameZoneColors.primaryContainer
                        : (item.badgeType == 'xp' ? GameZoneColors.secondaryContainer : GameZoneColors.surfaceContainerHigh),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    item.badgeType == 'success'
                        ? Icons.military_tech
                        : (item.badgeType == 'xp' ? Icons.card_giftcard : Icons.local_offer),
                    color: Colors.white,
                    size: 22,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(item.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                      Text('Código: ${item.code}', style: const TextStyle(color: GameZoneColors.primary, fontSize: 11)),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: item.badgeType == 'success'
                        ? GameZoneColors.tertiaryContainer
                        : (item.badgeType == 'xp' ? GameZoneColors.primaryContainer : GameZoneColors.surfaceContainerHighest),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(item.badgeText, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(item.subtext, style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                Text(item.dateText, style: const TextStyle(color: GameZoneColors.outline, fontSize: 10)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
