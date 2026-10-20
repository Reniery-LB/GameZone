import 'package:flutter/material.dart';
import '../models/game_models.dart';
import '../theme/app_theme.dart';

class GameDetailScreen extends StatefulWidget {
  final Game game;
  final Function(Game) onAddToCart;
  final Function(String) onToggleFavorite;
  final Function(String) onShowSnackBar;
  final VoidCallback onBack;

  const GameDetailScreen({
    super.key,
    required this.game,
    required this.onAddToCart,
    required this.onToggleFavorite,
    required this.onShowSnackBar,
    required this.onBack,
  });

  @override
  State<GameDetailScreen> createState() => _GameDetailScreenState();
}

class _GameDetailScreenState extends State<GameDetailScreen> {
  late String _selectedPlatform;
  bool _isFeaturesOpen = true;
  bool _isGameplayOpen = false;
  bool _isAdding = false;

  @override
  void initState() {
    super.initState();
    _selectedPlatform = widget.game.platforms.first;
  }

  void _handleAddToCart() {
    setState(() => _isAdding = true);
    widget.onAddToCart(widget.game);
    widget.onShowSnackBar('¡${widget.game.title} agregado al carrito!');
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) setState(() => _isAdding = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    final game = widget.game;

    return Scaffold(
      backgroundColor: GameZoneColors.surface,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: GameZoneColors.onSurface, size: 20),
          onPressed: widget.onBack,
        ),
        title: const Text('Detalle De Juego', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: Icon(
              game.isFavorite ? Icons.favorite : Icons.favorite_border,
              color: game.isFavorite ? GameZoneColors.error : GameZoneColors.primary,
            ),
            onPressed: () {
              widget.onToggleFavorite(game.id);
              widget.onShowSnackBar(game.isFavorite ? 'Eliminado de favoritos' : '¡Guardado en favoritos!');
            },
          ),
          IconButton(
            icon: const Icon(Icons.share, color: GameZoneColors.onSurfaceVariant, size: 20),
            onPressed: () => widget.onShowSnackBar('Enlace de ${game.title} copiado'),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: GameZoneColors.surface.withOpacity(0.95),
          border: const Border(top: BorderSide(color: GameZoneColors.surfaceContainerHigh)),
        ),
        child: SafeArea(
          child: Row(
            children: [
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Precio Final', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                  Text(
                    '\$${game.price.toStringAsFixed(0)}',
                    style: const TextStyle(color: GameZoneColors.onSurface, fontWeight: FontWeight.bold, fontSize: 20),
                  ),
                ],
              ),
              const SizedBox(width: 16),
              Expanded(
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _isAdding ? GameZoneColors.tertiaryContainer : GameZoneColors.primaryContainer,
                    foregroundColor: _isAdding ? GameZoneColors.onTertiary : Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                  onPressed: _isAdding ? null : _handleAddToCart,
                  icon: Icon(_isAdding ? Icons.check_circle : Icons.shopping_bag, size: 20),
                  label: Text(_isAdding ? '¡Agregado al carrito!' : 'Agregar al carrito', style: const TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ),
      body: ListView(
        padding: EdgeInsets.zero,
        children: [
          // Hero Cover Image
          Stack(
            children: [
              SizedBox(
                height: 280,
                width: double.infinity,
                child: Image.network(
                  game.bannerImage ?? game.image,
                  fit: BoxFit.cover,
                ),
              ),
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.bottomCenter,
                      end: Alignment.topCenter,
                      colors: [
                        GameZoneColors.surface,
                        GameZoneColors.surface.withOpacity(0.4),
                        Colors.transparent,
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                bottom: 12,
                left: 16,
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: GameZoneColors.surfaceContainerHigh.withOpacity(0.9),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.star, color: GameZoneColors.tertiary, size: 16),
                          const SizedBox(width: 4),
                          Text('${game.rating} (${game.ratingCount ?? "1.4k"})', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: GameZoneColors.tertiaryContainer.withOpacity(0.9),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Text('VERIFICADO', style: TextStyle(color: GameZoneColors.onTertiaryContainer, fontSize: 11, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ],
          ),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Genre tags
                Wrap(
                  spacing: 6,
                  children: game.genreTags
                      .map((tag) => Chip(
                            label: Text(tag, style: const TextStyle(fontSize: 11, color: GameZoneColors.primary)),
                            backgroundColor: GameZoneColors.primaryContainer.withOpacity(0.2),
                            side: BorderSide.none,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ))
                      .toList(),
                ),
                const SizedBox(height: 8),

                // Title & Price
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(game.title, style: Theme.of(context).textTheme.headlineMedium),
                          Text(game.edition ?? '', style: Theme.of(context).textTheme.bodySmall),
                        ],
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text('\$${game.price.toStringAsFixed(2)}', style: const TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 22)),
                        const Text('MXN', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Platforms
                const Text('Plataformas Disponibles', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 12, fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  children: game.platforms.map((plat) {
                    final isSelected = _selectedPlatform == plat;
                    return ChoiceChip(
                      selected: isSelected,
                      label: Text(plat, style: TextStyle(color: isSelected ? Colors.white : GameZoneColors.onSurface, fontSize: 12)),
                      selectedColor: GameZoneColors.primaryContainer,
                      backgroundColor: GameZoneColors.surfaceContainerLow,
                      side: BorderSide.none,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      onSelected: (_) => setState(() => _selectedPlatform = plat),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 16),

                // Quick Specs
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: GameZoneColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildSpecItem(Icons.groups, 'Modo', game.specs.mode, GameZoneColors.primary),
                      _buildSpecItem(Icons.speed, 'Gráficos', game.specs.graphics, GameZoneColors.tertiary),
                      _buildSpecItem(Icons.storage, 'Espacio', game.specs.space, GameZoneColors.secondary),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Accordion 1: Características
                _buildAccordion(
                  title: 'Características Clave',
                  icon: Icons.verified,
                  isOpen: _isFeaturesOpen,
                  onToggle: () => setState(() => _isFeaturesOpen = !_isFeaturesOpen),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(game.description, style: const TextStyle(fontSize: 12, color: GameZoneColors.onSurfaceVariant)),
                      const SizedBox(height: 8),
                      ...game.keyFeatures.map((feat) => Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.check_circle, color: GameZoneColors.tertiary, size: 16),
                                const SizedBox(width: 8),
                                Expanded(child: Text(feat, style: const TextStyle(fontSize: 12, color: GameZoneColors.onSurfaceVariant))),
                              ],
                            ),
                          )),
                    ],
                  ),
                ),
                const SizedBox(height: 10),

                // Accordion 2: Gameplay & Modos
                _buildAccordion(
                  title: 'Gameplay & Modos',
                  icon: Icons.sports_motorsports,
                  isOpen: _isGameplayOpen,
                  onToggle: () => setState(() => _isGameplayOpen = !_isGameplayOpen),
                  child: Text(
                    game.gameplayModes ?? 'Física y simulación de alta precisión.',
                    style: const TextStyle(fontSize: 12, color: GameZoneColors.onSurfaceVariant),
                  ),
                ),
                const SizedBox(height: 20),

                // Reviews
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Reseñas de Jugadores', style: Theme.of(context).textTheme.headlineSmall),
                    const Text('Ver todas (1,428)', style: TextStyle(color: GameZoneColors.primary, fontSize: 12)),
                  ],
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: GameZoneColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    children: [
                      Column(
                        children: [
                          Text(game.rating.toString(), style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                          const Row(
                            children: [
                              Icon(Icons.star, color: GameZoneColors.tertiary, size: 16),
                              Icon(Icons.star, color: GameZoneColors.tertiary, size: 16),
                              Icon(Icons.star, color: GameZoneColors.tertiary, size: 16),
                              Icon(Icons.star, color: GameZoneColors.tertiary, size: 16),
                              Icon(Icons.star_half, color: GameZoneColors.tertiary, size: 16),
                            ],
                          ),
                          const Text('92% recomiendan', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                        ],
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          children: [
                            _buildRatingBar('5★', 0.82, '82%'),
                            _buildRatingBar('4★', 0.12, '12%'),
                            _buildRatingBar('3★', 0.04, '4%'),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSpecItem(IconData icon, String label, String value, Color color) {
    return Column(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
      ],
    );
  }

  Widget _buildAccordion({
    required String title,
    required IconData icon,
    required bool isOpen,
    required VoidCallback onToggle,
    required Widget child,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: GameZoneColors.surfaceContainerLow,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          ListTile(
            leading: Icon(icon, color: GameZoneColors.primary, size: 20),
            title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
            trailing: Icon(isOpen ? Icons.expand_less : Icons.expand_more, color: GameZoneColors.onSurfaceVariant),
            onTap: onToggle,
          ),
          if (isOpen) Padding(padding: const EdgeInsets.fromLTRB(16, 0, 16, 16), child: child),
        ],
      ),
    );
  }

  Widget _buildRatingBar(String label, double ratio, String percent) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: GameZoneColors.onSurfaceVariant)),
          const SizedBox(width: 6),
          Expanded(
            child: LinearProgressIndicator(
              value: ratio,
              backgroundColor: GameZoneColors.surfaceContainerHighest,
              color: GameZoneColors.primary,
              minHeight: 6,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
          const SizedBox(width: 6),
          Text(percent, style: const TextStyle(fontSize: 11, color: GameZoneColors.onSurfaceVariant)),
        ],
      ),
    );
  }
}
