import 'dart:io';
import 'package:flutter/material.dart';
import '../models/game_models.dart';
import '../theme/app_theme.dart';
import '../data/game_data.dart';
import 'home_screen.dart';
import 'library_screen.dart';
import 'scanner_screen.dart';
import 'profile_screen.dart';
import 'game_detail_screen.dart';
import 'cart_screen.dart';

class MainScreen extends StatefulWidget {
  final UserProfile user;
  final VoidCallback onLogout;

  const MainScreen({
    super.key,
    required this.user,
    required this.onLogout,
  });

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  Game? _selectedGame;
  bool _showingCart = false;

  late List<Game> _games;
  late List<CartItem> _cartItems;
  late List<RewardItem> _rewards;
  late UserProfile _currentUser;

  @override
  void initState() {
    super.initState();
    _games = getInitialGames();
    _cartItems = getInitialCart();
    _rewards = getInitialRewards();
    _currentUser = widget.user;
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: GameZoneColors.tertiary, size: 18),
            const SizedBox(width: 8),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: GameZoneColors.surfaceContainerHigh,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _addToCart(Game game) {
    if (_cartItems.any((c) => c.gameId == game.id)) {
      _showSnackBar('"${game.title}" ya está en tu carrito');
      return;
    }
    setState(() {
      _cartItems.add(
        CartItem(
          id: 'cart-${DateTime.now().millisecondsSinceEpoch}',
          gameId: game.id,
          title: game.title,
          edition: game.edition ?? 'Edición Digital',
          price: game.price,
          originalPrice: game.originalPrice,
          platform: game.platforms.first,
          image: game.image,
        ),
      );
    });
  }

  void _buyNow(Game game) {
    _addToCart(game);
    setState(() => _showingCart = true);
  }

  void _toggleFavorite(String gameId) {
    setState(() {
      final g = _games.firstWhere((item) => item.id == gameId);
      g.isFavorite = !g.isFavorite;
    });
  }

  void _redeemCode(String code) {
    setState(() {
      _rewards.insert(
        0,
        RewardItem(
          id: 'rew-${DateTime.now().millisecondsSinceEpoch}',
          title: code.contains('XP')
              ? 'Paquete de Experiencia Épica'
              : (code.contains('ZCOIN') ? 'Bolsa de 1,000 Z-Coins' : 'Recompensa Canjeada'),
          code: code,
          statusText: 'Canjeado con éxito',
          dateText: 'Ahora',
          subtext: 'Activado en tu inventario',
          iconName: 'redeem',
          badgeText: code.contains('XP') ? '+1,000 XP' : '+1,000 ZC',
          badgeType: code.contains('XP') ? 'xp' : 'success',
        ),
      );
      if (code.contains('ZCOIN')) {
        _currentUser.zCoins += 1000;
      } else {
        _currentUser.pointsCount += 500;
      }
    });
    _showSnackBar('¡Código $code canjeado exitosamente!');
  }

  ImageProvider _getAvatarProvider(String avatar) {
    if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
      return NetworkImage(avatar);
    }
    return FileImage(File(avatar));
  }

  @override
  Widget build(BuildContext context) {
    // Stack detail screen
    if (_selectedGame != null) {
      return GameDetailScreen(
        game: _selectedGame!,
        onAddToCart: _addToCart,
        onToggleFavorite: _toggleFavorite,
        onShowSnackBar: _showSnackBar,
        onBack: () => setState(() => _selectedGame = null),
      );
    }

    // Stack cart screen
    if (_showingCart) {
      return CartScreen(
        cartItems: _cartItems,
        onRemoveItem: (id) => setState(() => _cartItems.removeWhere((i) => i.id == id)),
        onClearCart: () => setState(() => _cartItems.clear()),
        onCheckoutComplete: () {
          setState(() {
            _currentUser.gamesCount += _cartItems.length;
            _currentUser.zCoins += 80;
            _cartItems.clear();
          });
        },
        onNavigateToLibrary: () => setState(() {
          _showingCart = false;
          _currentIndex = 1;
        }),
        onShowSnackBar: _showSnackBar,
        onBack: () => setState(() => _showingCart = false),
      );
    }

    final pages = [
      HomeScreen(
        games: _games,
        onSelectGame: (g) => setState(() => _selectedGame = g),
        onAddToCart: _addToCart,
        onBuyNow: _buyNow,
        onToggleFavorite: _toggleFavorite,
        onShowSnackBar: _showSnackBar,
      ),
      LibraryScreen(
        games: _games,
        onSelectGame: (g) => setState(() => _selectedGame = g),
        onShowSnackBar: _showSnackBar,
      ),
      ScannerScreen(
        rewards: _rewards,
        onRedeemCode: _redeemCode,
        onShowSnackBar: _showSnackBar,
        onNavigateToCart: () => setState(() => _showingCart = true),
      ),
      ProfileScreen(
        user: _currentUser,
        onUpdateAvatar: (url) => setState(() => _currentUser.avatar = url),
        onNavigateToScanner: () => setState(() => _currentIndex = 2),
        onLogout: widget.onLogout,
        onShowSnackBar: _showSnackBar,
      ),
    ];

    String getTitle() {
      switch (_currentIndex) {
        case 0:
          return 'Inicio';
        case 1:
          return 'Biblioteca';
        case 2:
          return 'Escanear';
        case 3:
          return 'Perfil';
        default:
          return 'GameZone';
      }
    }

    return Scaffold(
      backgroundColor: GameZoneColors.surface,
      appBar: AppBar(
        backgroundColor: GameZoneColors.surface.withOpacity(0.95),
        title: Row(
          children: [
            Image.network(kLogoUrl, height: 28, fit: BoxFit.contain),
            const SizedBox(width: 8),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('GameZone', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(getTitle().toUpperCase(), style: const TextStyle(color: GameZoneColors.primary, fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
        actions: [
          // Shopping bag with badge
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.shopping_bag_outlined, color: GameZoneColors.onSurfaceVariant),
                onPressed: () => setState(() => _showingCart = true),
              ),
              if (_cartItems.isNotEmpty)
                Positioned(
                  top: 8,
                  right: 8,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: const BoxDecoration(
                      color: GameZoneColors.primaryContainer,
                      shape: BoxShape.circle,
                    ),
                    child: Text(
                      _cartItems.length.toString(),
                      style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
            ],
          ),
          // User avatar
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: InkWell(
              onTap: () => setState(() => _currentIndex = 3),
              child: CircleAvatar(
                radius: 16,
                backgroundImage: _getAvatarProvider(_currentUser.avatar),
              ),
            ),
          ),
        ],
      ),
      body: pages[_currentIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: GameZoneColors.surfaceContainerLow.withOpacity(0.95),
          border: const Border(top: BorderSide(color: GameZoneColors.surfaceContainerHigh)),
        ),
        child: SafeArea(
          child: SizedBox(
            height: 76,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(0, Icons.sports_esports, 'Inicio'),
                _buildNavItem(1, Icons.video_library, 'Biblioteca'),
                _buildCenterNavButton(2),
                _buildNavItem(3, Icons.person, 'Perfil'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _currentIndex == index;
    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            color: isSelected ? GameZoneColors.primary : GameZoneColors.onSurfaceVariant,
            size: 24,
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(
              color: isSelected ? GameZoneColors.primary : GameZoneColors.onSurfaceVariant,
              fontSize: 11,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCenterNavButton(int index) {
    final isSelected = _currentIndex == index;
    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      child: Transform.translate(
        offset: const Offset(0, -6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [GameZoneColors.primaryContainer, GameZoneColors.tertiary],
                ),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: GameZoneColors.primaryContainer.withOpacity(0.5),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: const Icon(Icons.qr_code_scanner, color: Colors.white, size: 28),
            ),
            const SizedBox(height: 4),
            Text(
              'Escanear',
              style: TextStyle(
                color: isSelected ? GameZoneColors.tertiary : GameZoneColors.onSurfaceVariant,
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
