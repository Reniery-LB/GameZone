import 'package:flutter/material.dart';
import '../models/game_models.dart';
import '../theme/app_theme.dart';

class HomeScreen extends StatefulWidget {
  final List<Game> games;
  final Function(Game) onSelectGame;
  final Function(Game) onAddToCart;
  final Function(Game) onBuyNow;
  final Function(String) onToggleFavorite;
  final Function(String) onShowSnackBar;

  const HomeScreen({
    super.key,
    required this.games,
    required this.onSelectGame,
    required this.onAddToCart,
    required this.onBuyNow,
    required this.onToggleFavorite,
    required this.onShowSnackBar,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _selectedCategory = 'Todos';
  String _searchQuery = '';
  final TextEditingController _searchController = TextEditingController();

  final List<Map<String, dynamic>> _categories = [
    {'id': 'Todos', 'label': 'Todos', 'icon': Icons.grid_view},
    {'id': 'Acción', 'label': 'Acción', 'icon': Icons.sports_martial_arts},
    {'id': 'RPG', 'label': 'RPG', 'icon': Icons.security},
    {'id': 'Carreras', 'label': 'Carreras', 'icon': Icons.sports_motorsports},
    {'id': 'Cyberpunk', 'label': 'Cyberpunk', 'icon': Icons.memory},
    {'id': 'Estrategia', 'label': 'Estrategia', 'icon': Icons.shield},
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final galaxyRaiders = widget.games.firstWhere(
      (g) => g.id == 'galaxy-raiders',
      orElse: () => widget.games[0],
    );
    final neonNexus = widget.games.firstWhere(
      (g) => g.id == 'neon-nexus',
      orElse: () => widget.games[1],
    );
    final turboCircuit = widget.games.firstWhere(
      (g) => g.id == 'turbo-circuit',
      orElse: () => widget.games[2],
    );

    final filteredGames = widget.games.where((g) {
      final matchesCat = _selectedCategory == 'Todos' ||
          g.category == _selectedCategory ||
          g.genreTags.contains(_selectedCategory);
      final matchesSearch = _searchQuery.isEmpty ||
          g.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          g.genreTags.any((t) => t.toLowerCase().contains(_searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    }).toList();

    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      children: [
        // Greeting & Notifications
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      '¡Hola de nuevo, Alex! ',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const Text('⚡', style: TextStyle(fontSize: 20)),
                  ],
                ),
                const SizedBox(height: 2),
                Text(
                  'Descubre los mejores lanzamientos y ofertas',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: GameZoneColors.surfaceContainerHigh,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.3),
                    blurRadius: 8,
                  ),
                ],
              ),
              child: IconButton(
                padding: EdgeInsets.zero,
                icon: const Icon(Icons.notifications_active, color: GameZoneColors.primary, size: 20),
                onPressed: () => widget.onShowSnackBar('Drop de fin de semana: +250 Z-Coins activo'),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),

        // Search Bar & Filter Button
        Row(
          children: [
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: GameZoneColors.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: GameZoneColors.surfaceContainerHigh),
                ),
                child: TextField(
                  controller: _searchController,
                  style: const TextStyle(color: GameZoneColors.onSurface, fontSize: 14),
                  decoration: InputDecoration(
                    hintText: 'Buscar juegos, géneros, DLC...',
                    hintStyle: const TextStyle(color: GameZoneColors.outline, fontSize: 14),
                    prefixIcon: const Icon(Icons.search, color: GameZoneColors.outline, size: 22),
                    suffixIcon: _searchQuery.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.close, color: GameZoneColors.outline, size: 18),
                            onPressed: () {
                              _searchController.clear();
                              setState(() => _searchQuery = '');
                            },
                          )
                        : IconButton(
                            icon: const Icon(Icons.mic, color: GameZoneColors.outlineVariant, size: 20),
                            onPressed: () => widget.onShowSnackBar('Búsqueda por voz activada'),
                          ),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  ),
                  onChanged: (val) => setState(() => _searchQuery = val),
                ),
              ),
            ),
            const SizedBox(width: 8),
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: GameZoneColors.surfaceContainerHigh,
                borderRadius: BorderRadius.circular(16),
              ),
              child: IconButton(
                icon: const Icon(Icons.tune, color: GameZoneColors.primary, size: 22),
                onPressed: () => widget.onShowSnackBar('Filtros avanzados listos'),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),

        // Categories Chips
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: _categories.map((cat) {
              final isSelected = _selectedCategory == cat['id'];
              return Padding(
                padding: const EdgeInsets.only(right: 8),
                child: FilterChip(
                  showCheckmark: false,
                  selected: isSelected,
                  backgroundColor: GameZoneColors.surfaceContainer,
                  selectedColor: GameZoneColors.primaryContainer,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                  side: BorderSide.none,
                  labelPadding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                  avatar: Icon(
                    cat['icon'] as IconData,
                    size: 16,
                    color: isSelected ? Colors.white : GameZoneColors.onSurfaceVariant,
                  ),
                  label: Text(
                    cat['label'] as String,
                    style: TextStyle(
                      color: isSelected ? Colors.white : GameZoneColors.onSurfaceVariant,
                      fontWeight: FontWeight.w600,
                      fontSize: 12,
                    ),
                  ),
                  onSelected: (_) => setState(() => _selectedCategory = cat['id']),
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 20),

        if (_searchQuery.isNotEmpty || _selectedCategory != 'Todos') ...[
          // Search/Filtered results
          Text('Resultados (${filteredGames.length})', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 12),
          ...filteredGames.map((game) => _buildCompactGameCard(context, game)),
        ] else ...[
          // Novedades y Destacados Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: GameZoneColors.tertiary,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text('Novedades y Destacados', style: Theme.of(context).textTheme.headlineSmall),
                ],
              ),
              TextButton(
                onPressed: () => setState(() => _selectedCategory = 'Acción'),
                child: const Row(
                  children: [
                    Text('Ver más', style: TextStyle(color: GameZoneColors.primary, fontSize: 12)),
                    Icon(Icons.arrow_forward, size: 14, color: GameZoneColors.primary),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),

          // Hero Card: Galaxy Raiders
          _buildHeroCard(context, galaxyRaiders),
          const SizedBox(height: 24),

          // En Oferta Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.local_fire_department, color: GameZoneColors.tertiary, size: 20),
                  const SizedBox(width: 6),
                  Text('En Oferta', style: Theme.of(context).textTheme.headlineSmall),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: GameZoneColors.errorContainer,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Text(
                  'Termina en 14h',
                  style: TextStyle(color: GameZoneColors.onErrorContainer, fontSize: 11, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Oferta Card: Neon Nexus
          _buildDealCard(context, neonNexus),
          const SizedBox(height: 24),

          // Más Populares Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.trending_up, color: GameZoneColors.secondary, size: 20),
                  const SizedBox(width: 6),
                  Text('Más Populares', style: Theme.of(context).textTheme.headlineSmall),
                ],
              ),
              TextButton(
                onPressed: () => setState(() => _selectedCategory = 'Carreras'),
                child: const Text('Ver ranking', style: TextStyle(color: GameZoneColors.primary, fontSize: 12)),
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Popular Card: Turbo Circuit
          _buildPopularCard(context, turboCircuit),
        ],
        const SizedBox(height: 32),
      ],
    );
  }

  Widget _buildHeroCard(BuildContext context, Game game) {
    return Card(
      elevation: 8,
      shadowColor: Colors.black54,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      color: GameZoneColors.surfaceContainer,
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => widget.onSelectGame(game),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                AspectRatio(
                  aspectRatio: 4 / 3,
                  child: Image.network(
                    game.image,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      color: GameZoneColors.surfaceContainerLowest,
                      child: const Icon(Icons.videogame_asset, size: 48, color: GameZoneColors.primary),
                    ),
                  ),
                ),
                Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                        colors: [
                          GameZoneColors.surfaceContainer,
                          GameZoneColors.surfaceContainer.withOpacity(0.4),
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: 12,
                  left: 12,
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: GameZoneColors.surfaceContainerHighest.withOpacity(0.9),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: const Text(
                          'ACCIÓN SCI-FI',
                          style: TextStyle(color: GameZoneColors.tertiary, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: GameZoneColors.secondaryContainer.withOpacity(0.9),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: const Text(
                          'Nuevo',
                          style: TextStyle(color: GameZoneColors.onSecondaryContainer, fontSize: 10),
                        ),
                      ),
                    ],
                  ),
                ),
                Positioned(
                  top: 12,
                  right: 12,
                  child: Container(
                    decoration: BoxDecoration(
                      color: GameZoneColors.surfaceContainerHighest.withOpacity(0.8),
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: Icon(
                        game.isFavorite ? Icons.favorite : Icons.favorite_border,
                        color: game.isFavorite ? GameZoneColors.error : Colors.white,
                        size: 20,
                      ),
                      onPressed: () => widget.onToggleFavorite(game.id),
                    ),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(game.title, style: Theme.of(context).textTheme.headlineMedium),
                            Text(game.subtitle ?? '', style: Theme.of(context).textTheme.bodySmall),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: GameZoneColors.surfaceContainerHigh,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.star, color: Colors.amber, size: 16),
                            const SizedBox(width: 4),
                            Text(game.rating.toString(), style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Text('PRECIO DIGITAL', style: TextStyle(color: GameZoneColors.outline, fontSize: 10, fontWeight: FontWeight.bold)),
                            FittedBox(
                              fit: BoxFit.scaleDown,
                              alignment: Alignment.centerLeft,
                              child: Text(
                                '\$${game.price.toStringAsFixed(2)} MXN',
                                style: const TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 18),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            decoration: BoxDecoration(
                              color: GameZoneColors.surfaceContainerHigh,
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: IconButton(
                              icon: const Icon(Icons.add_shopping_cart, color: GameZoneColors.primary, size: 20),
                              onPressed: () {
                                widget.onAddToCart(game);
                                widget.onShowSnackBar('¡${game.title} añadido al carrito!');
                              },
                            ),
                          ),
                          const SizedBox(width: 8),
                          ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: GameZoneColors.primaryContainer,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            ),
                            onPressed: () => widget.onBuyNow(game),
                            icon: const Icon(Icons.bolt, size: 18),
                            label: const Text('Comprar', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDealCard(BuildContext context, Game game) {
    return Card(
      elevation: 6,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      color: GameZoneColors.surfaceContainer,
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => widget.onSelectGame(game),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Stack(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(14),
                    child: SizedBox(
                      width: 100,
                      height: 100,
                      child: Image.network(game.image, fit: BoxFit.cover),
                    ),
                  ),
                  Positioned(
                    top: 6,
                    left: 6,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: GameZoneColors.error,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        '-${game.discountPercentage}%',
                        style: const TextStyle(color: GameZoneColors.onError, fontSize: 10, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(game.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                        ),
                        IconButton(
                          icon: Icon(
                            game.isFavorite ? Icons.favorite : Icons.favorite_border,
                            color: game.isFavorite ? GameZoneColors.error : GameZoneColors.outline,
                            size: 18,
                          ),
                          onPressed: () => widget.onToggleFavorite(game.id),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        const Icon(Icons.star, color: Colors.amber, size: 14),
                        const SizedBox(width: 3),
                        Text(game.rating.toString(), style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        const SizedBox(width: 6),
                        const Text('• Distrito 7', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: GameZoneColors.surfaceContainerHigh,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text('Cyberpunk', style: TextStyle(color: GameZoneColors.tertiary, fontSize: 10)),
                        ),
                        const SizedBox(width: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: GameZoneColors.surfaceContainerHigh,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text('RPG', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 10)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (game.originalPrice != null)
                              Text(
                                '\$${game.originalPrice!.toStringAsFixed(2)}',
                                style: const TextStyle(color: GameZoneColors.outline, fontSize: 11, decoration: TextDecoration.lineThrough),
                              ),
                            Text(
                              '\$${game.price.toStringAsFixed(2)} MXN',
                              style: const TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                          ],
                        ),
                        Container(
                          width: 36,
                          height: 36,
                          decoration: BoxDecoration(
                            color: GameZoneColors.primaryContainer,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: IconButton(
                            padding: EdgeInsets.zero,
                            icon: const Icon(Icons.shopping_bag, color: Colors.white, size: 18),
                            onPressed: () {
                              widget.onAddToCart(game);
                              widget.onShowSnackBar('¡${game.title} agregado!');
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPopularCard(BuildContext context, Game game) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      color: GameZoneColors.surfaceContainer,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: () => widget.onSelectGame(game),
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(14),
                child: SizedBox(
                  width: 80,
                  height: 80,
                  child: Image.network(game.image, fit: BoxFit.cover),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: GameZoneColors.secondaryContainer,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text('Carreras', style: TextStyle(color: GameZoneColors.onSecondaryContainer, fontSize: 10)),
                        ),
                        const SizedBox(width: 6),
                        const Icon(Icons.star, color: Colors.amber, size: 13),
                        Text(' ${game.rating}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(game.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                    Text(game.subtitle ?? '', maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: GameZoneColors.outline, fontSize: 11)),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('\$${game.price.toStringAsFixed(2)}', style: const TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 14)),
                  const Text('MXN', style: TextStyle(color: GameZoneColors.outline, fontSize: 10)),
                  const SizedBox(height: 4),
                  Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: GameZoneColors.surfaceContainerHighest,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: IconButton(
                      padding: EdgeInsets.zero,
                      icon: const Icon(Icons.add, color: GameZoneColors.primary, size: 18),
                      onPressed: () {
                        widget.onAddToCart(game);
                        widget.onShowSnackBar('¡${game.title} en cesta!');
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCompactGameCard(BuildContext context, Game game) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: GameZoneColors.surfaceContainer,
      child: ListTile(
        onTap: () => widget.onSelectGame(game),
        leading: ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: Image.network(game.image, width: 50, height: 50, fit: BoxFit.cover),
        ),
        title: Text(game.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text('\$${game.price.toStringAsFixed(2)} MXN', style: const TextStyle(color: GameZoneColors.primary, fontSize: 12)),
        trailing: IconButton(
          icon: const Icon(Icons.add_shopping_cart, color: GameZoneColors.primary, size: 20),
          onPressed: () {
            widget.onAddToCart(game);
            widget.onShowSnackBar('¡${game.title} agregado!');
          },
        ),
      ),
    );
  }
}
