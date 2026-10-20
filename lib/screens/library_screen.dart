import 'package:flutter/material.dart';
import '../models/game_models.dart';
import '../theme/app_theme.dart';

class LibraryScreen extends StatefulWidget {
  final List<Game> games;
  final Function(Game) onSelectGame;
  final Function(String) onShowSnackBar;

  const LibraryScreen({
    super.key,
    required this.games,
    required this.onSelectGame,
    required this.onShowSnackBar,
  });

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  String _selectedFilter = 'all';
  bool _isDownloading = true;

  @override
  Widget build(BuildContext context) {
    final galaxyRaiders = widget.games.firstWhere((g) => g.id == 'galaxy-raiders', orElse: () => widget.games[0]);
    final turboCircuit = widget.games.firstWhere((g) => g.id == 'turbo-circuit', orElse: () => widget.games[2]);
    final neonNexus = widget.games.firstWhere((g) => g.id == 'neon-nexus', orElse: () => widget.games[1]);
    final shadowProtocol = widget.games.firstWhere((g) => g.id == 'shadow-protocol', orElse: () => widget.games[3]);

    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      children: [
        // Title & Search
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Mi Biblioteca', style: Theme.of(context).textTheme.headlineMedium),
                const Text('18 JUEGOS ADQUIRIDOS', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.search, color: GameZoneColors.onSurfaceVariant),
                  onPressed: () => widget.onShowSnackBar('Búsqueda en biblioteca'),
                ),
                IconButton(
                  icon: const Icon(Icons.tune, color: GameZoneColors.onSurfaceVariant),
                  onPressed: () => widget.onShowSnackBar('Filtro de biblioteca'),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 12),

        // Filter Pills
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildFilterChip('all', 'Todos (18)', Icons.apps),
              _buildFilterChip('installed', 'Instalados (6)', Icons.download_done),
              _buildFilterChip('cloud', 'Nube (12)', Icons.cloud),
              _buildFilterChip('favs', 'Favoritos (4)', Icons.favorite),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Spotlight Card: Galaxy Raiders
        Card(
          elevation: 6,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          color: GameZoneColors.surfaceContainer,
          clipBehavior: Clip.antiAlias,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(
                children: [
                  SizedBox(
                    height: 180,
                    width: double.infinity,
                    child: Image.network(
                      galaxyRaiders.bannerImage ?? galaxyRaiders.image,
                      fit: BoxFit.cover,
                    ),
                  ),
                  Positioned.fill(
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.bottomCenter,
                          end: Alignment.topCenter,
                          colors: [GameZoneColors.surfaceContainer, Colors.transparent],
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 12,
                    left: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: GameZoneColors.surfaceContainerHighest.withOpacity(0.9),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.circle, color: GameZoneColors.tertiary, size: 8),
                          SizedBox(width: 4),
                          Text('JUGADO RECIENTEMENTE', style: TextStyle(color: GameZoneColors.tertiary, fontSize: 9, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    top: 12,
                    right: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.7),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Text('42h jugadas', style: TextStyle(color: Colors.white, fontSize: 11)),
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
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(galaxyRaiders.title, style: Theme.of(context).textTheme.headlineSmall),
                            const Text('Táctico Sci-Fi • PlayStation 5 / PC', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: GameZoneColors.secondaryContainer.withOpacity(0.5),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Text('Nvl. 38', style: TextStyle(color: GameZoneColors.secondary, fontWeight: FontWeight.bold, fontSize: 11)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Achievement Progress
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: GameZoneColors.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Column(
                        children: [
                          const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Icon(Icons.emoji_events, color: GameZoneColors.tertiary, size: 16),
                                  SizedBox(width: 6),
                                  Text('Progreso de Logros', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                                ],
                              ),
                              Text('68% (34/50)', style: TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 11)),
                            ],
                          ),
                          const SizedBox(height: 8),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: const LinearProgressIndicator(
                              value: 0.68,
                              backgroundColor: GameZoneColors.surfaceContainerHighest,
                              color: GameZoneColors.primaryContainer,
                              minHeight: 6,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 12),

                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: GameZoneColors.primaryContainer,
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(46),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      onPressed: () => widget.onShowSnackBar('Iniciando Galaxy Raiders...'),
                      icon: const Icon(Icons.play_arrow),
                      label: const Text('Continuar Jugando', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Installed and Remote List
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Títulos Instalados y Remotos', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            TextButton(
              onPressed: () => widget.onShowSnackBar('Vista detallada activa'),
              child: const Text('Vista detallada', style: TextStyle(color: GameZoneColors.primary, fontSize: 12)),
            ),
          ],
        ),
        const SizedBox(height: 8),

        // Item 1: Turbo Circuit
        _buildLibraryItemCard(
          title: turboCircuit.title,
          image: turboCircuit.image,
          subtitle: 'Listo para jugar • v1.4.2',
          meta: '12h jugadas • Multiplayer',
          statusBadge: 'SSD: 64.2 GB',
          cloudBadge: 'Nube OK',
          actionButton: ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: GameZoneColors.primaryContainer,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () => widget.onShowSnackBar('Iniciando Turbo Circuit'),
            icon: const Icon(Icons.play_arrow, size: 16),
            label: const Text('Jugar', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
          ),
        ),
        const SizedBox(height: 10),

        // Item 2: Neon Nexus Downloading
        Card(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          color: GameZoneColors.surfaceContainer,
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              children: [
                Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: Image.network(neonNexus.image, width: 64, height: 64, fit: BoxFit.cover),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(neonNexus.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                          const SizedBox(height: 2),
                          Text(
                            _isDownloading ? 'Descargando (74%)' : 'Descarga en Pausa',
                            style: const TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 11),
                          ),
                          const SizedBox(height: 2),
                          const Text('45.2 MB/s • 4 min restantes', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                const LinearProgressIndicator(
                  value: 0.74,
                  backgroundColor: GameZoneColors.surfaceContainerHighest,
                  color: GameZoneColors.primaryContainer,
                  minHeight: 5,
                ),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('59.2 GB / 80.0 GB', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 10)),
                    OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      onPressed: () {
                        setState(() => _isDownloading = !_isDownloading);
                        widget.onShowSnackBar(_isDownloading ? 'Descarga reanudada' : 'Descarga pausada');
                      },
                      child: Text(_isDownloading ? 'Pausar' : 'Reanudar', style: const TextStyle(fontSize: 11)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 10),

        // Item 3: Shadow Protocol (Cloud)
        _buildLibraryItemCard(
          title: shadowProtocol.title,
          image: shadowProtocol.image,
          subtitle: 'En la nube • 48.0 GB',
          meta: 'Última partida: Hace 3d',
          statusBadge: 'Cloud Ready',
          cloudBadge: '48 GB',
          actionButton: Row(
            children: [
              TextButton.icon(
                onPressed: () => widget.onShowSnackBar('Transmitiendo desde GameZone Cloud'),
                icon: const Icon(Icons.stream, size: 14, color: GameZoneColors.secondary),
                label: const Text('Jugar en Cloud', style: TextStyle(color: GameZoneColors.secondary, fontSize: 11)),
              ),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: GameZoneColors.surfaceContainerHigh,
                  foregroundColor: GameZoneColors.primary,
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () => widget.onShowSnackBar('Descargando Shadow Protocol'),
                icon: const Icon(Icons.install_mobile, size: 14),
                label: const Text('Instalar', style: TextStyle(fontSize: 11)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Statistics Bento
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: GameZoneColors.surfaceContainerLow,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            children: [
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('ESTADÍSTICAS DEL PERFIL', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 10, fontWeight: FontWeight.bold)),
                  Icon(Icons.insights, color: GameZoneColors.primary, size: 18),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: GameZoneColors.surfaceContainer,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.timer, color: GameZoneColors.secondary),
                          SizedBox(width: 8),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('184 h', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                              Text('Tiempo Total', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 10)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: GameZoneColors.surfaceContainer,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.military_tech, color: GameZoneColors.tertiary),
                          SizedBox(width: 8),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('45', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                              Text('Trofeos', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 10)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
      ],
    );
  }

  Widget _buildFilterChip(String id, String label, IconData icon) {
    final isSelected = _selectedFilter == id;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        selected: isSelected,
        avatar: Icon(icon, size: 16, color: isSelected ? Colors.white : GameZoneColors.onSurfaceVariant),
        label: Text(label, style: TextStyle(color: isSelected ? Colors.white : GameZoneColors.onSurfaceVariant, fontSize: 11)),
        selectedColor: GameZoneColors.primaryContainer,
        backgroundColor: GameZoneColors.surfaceContainer,
        side: BorderSide.none,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        onSelected: (_) => setState(() => _selectedFilter = id),
      ),
    );
  }

  Widget _buildLibraryItemCard({
    required String title,
    required String image,
    required String subtitle,
    required String meta,
    required String statusBadge,
    required String cloudBadge,
    required Widget actionButton,
  }) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: GameZoneColors.surfaceContainer,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Image.network(image, width: 64, height: 64, fit: BoxFit.cover),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      const SizedBox(height: 2),
                      Text(subtitle, style: const TextStyle(color: GameZoneColors.tertiary, fontSize: 11)),
                      const SizedBox(height: 2),
                      Text(meta, style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: GameZoneColors.surfaceContainerHighest,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(statusBadge, style: const TextStyle(fontSize: 10, color: GameZoneColors.onSurfaceVariant)),
                ),
                actionButton,
              ],
            ),
          ],
        ),
      ),
    );
  }
}
