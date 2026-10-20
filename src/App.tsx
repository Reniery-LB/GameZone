import React, { useState } from 'react';
import { ScreenType, Game, CartItem, RewardItem, UserProfile } from './types';
import {
  INITIAL_GAMES,
  INITIAL_CART,
  INITIAL_USER,
  INITIAL_REWARDS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { HomeScreen } from './screens/HomeScreen';
import { GameDetailScreen } from './screens/GameDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ScannerScreen } from './screens/ScannerScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AuthScreen } from './screens/AuthScreen';
import { FlutterCodeHub } from './components/FlutterCodeHub';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inicio');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['inicio']);
  const [selectedGameId, setSelectedGameId] = useState<string>('turbo-circuit');
  const [showFlutterHub, setShowFlutterHub] = useState<boolean>(false);

  // Application state
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [rewards, setRewards] = useState<RewardItem[]>(INITIAL_REWARDS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const navigateTo = (screen: ScreenType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // Remove current
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen || 'inicio');
    } else {
      setCurrentScreen('inicio');
    }
  };

  const handleSelectGame = (gameId: string) => {
    setSelectedGameId(gameId);
    navigateTo('detalle');
  };

  const handleAddToCart = (game: Game) => {
    const existingIndex = cart.findIndex((item) => item.gameId === game.id);
    if (existingIndex >= 0) {
      showToast(`"${game.title}" ya está en tu carrito`);
      return;
    }

    const newItem: CartItem = {
      id: `cart-item-${Date.now()}`,
      gameId: game.id,
      title: game.title,
      edition: game.edition || 'Edición Digital',
      price: game.price,
      originalPrice: game.originalPrice,
      discount: game.discountPercentage ? `-${game.discountPercentage}%` : undefined,
      platform: game.platforms[0] || 'PC Digital',
      image: game.image,
      isGift: false,
      immediateDelivery: true,
    };

    setCart((prev) => [newItem, ...prev]);
  };

  const handleBuyNow = (game: Game) => {
    handleAddToCart(game);
    navigateTo('carrito');
  };

  const handleToggleFavorite = (gameId: string) => {
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, isFavorite: !g.isFavorite } : g))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleGift = (itemId: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isGift: !item.isGift } : item))
    );
  };

  const handleCompleteCheckout = () => {
    // Add purchased games to user's library and add Z-Coins reward
    setUser((prev) => ({
      ...prev,
      gamesCount: prev.gamesCount + cart.length,
      pointsCount: prev.pointsCount + 150,
      zCoins: prev.zCoins + 80,
    }));
    setCart([]);
  };

  const handleRedeemCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    const newReward: RewardItem = {
      id: `rew-${Date.now()}`,
      title: clean.includes('XP')
        ? 'Paquete de Experiencia Épica'
        : clean.includes('ZCOINS')
        ? 'Bolsa de 1,000 Z-Coins'
        : clean.includes('PASS')
        ? 'Pase de Temporada Adicional'
        : 'Recompensa Canjeada Especial',
      code: clean,
      statusText: 'Canjeado con éxito',
      dateText: 'Ahora',
      subtext: 'Activado en tu inventario',
      icon: clean.includes('XP') ? 'bolt' : clean.includes('ZCOINS') ? 'monetization_on' : 'loyalty',
      badgeText: clean.includes('XP') ? '+1,000 XP' : clean.includes('ZCOINS') ? '+1,000 ZC' : 'Canjeado',
      badgeType: clean.includes('XP') ? 'xp' : 'success',
    };

    setRewards((prev) => [newReward, ...prev]);

    if (clean.includes('ZCOINS')) {
      setUser((prev) => ({ ...prev, zCoins: prev.zCoins + 1000 }));
    } else {
      setUser((prev) => ({ ...prev, pointsCount: prev.pointsCount + 500 }));
    }

    showToast(`¡Código ${clean} canjeado con éxito!`);
  };

  const handleUpdateAvatar = (newAvatarUrl: string) => {
    setUser((prev) => ({ ...prev, avatar: newAvatarUrl }));
  };

  const handleLoginSuccess = (identifier: string) => {
    setUser((prev) => ({
      ...prev,
      name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      gamertag: identifier.startsWith('@') ? identifier : `@${identifier}`,
    }));
    navigateTo('inicio');
  };

  const selectedGame = games.find((g) => g.id === selectedGameId) || games[0];

  return (
    <div className="min-h-screen bg-[#13121b] text-[#e5e0ee] flex flex-col items-center selection:bg-[#7c3aed] selection:text-white">
      {/* Sticky Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        cartCount={cart.length}
        user={user}
        showBack={['detalle', 'carrito', 'login', 'register'].includes(currentScreen)}
        onBack={handleBack}
      />

      {/* Main Content Area */}
      <main className="w-full flex-1 pt-16 flex flex-col items-center">
        {currentScreen === 'inicio' && (
          <HomeScreen
            games={games}
            onSelectGame={handleSelectGame}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleFavorite={handleToggleFavorite}
            showToast={showToast}
          />
        )}

        {currentScreen === 'detalle' && (
          <GameDetailScreen
            game={selectedGame}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            showToast={showToast}
            onBack={handleBack}
          />
        )}

        {currentScreen === 'carrito' && (
          <CartScreen
            cartItems={cart}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onToggleGift={handleToggleGift}
            onCompleteCheckout={handleCompleteCheckout}
            onNavigateToLibrary={() => navigateTo('biblioteca')}
            onContinueShopping={() => navigateTo('inicio')}
            showToast={showToast}
          />
        )}

        {currentScreen === 'biblioteca' && (
          <LibraryScreen
            games={games}
            onSelectGame={handleSelectGame}
            showToast={showToast}
          />
        )}

        {currentScreen === 'escaner' && (
          <ScannerScreen
            rewards={rewards}
            onRedeemCode={handleRedeemCode}
            showToast={showToast}
            onNavigateToCart={() => navigateTo('carrito')}
          />
        )}

        {currentScreen === 'perfil' && (
          <ProfileScreen
            user={user}
            onUpdateAvatar={handleUpdateAvatar}
            onNavigate={navigateTo}
            showToast={showToast}
            onLogout={() => navigateTo('login')}
          />
        )}

        {(currentScreen === 'login' || currentScreen === 'register') && (
          <AuthScreen
            initialMode={currentScreen}
            onLoginSuccess={handleLoginSuccess}
            onExploreAsGuest={() => navigateTo('inicio')}
            showToast={showToast}
          />
        )}
      </main>

      {/* Bottom Floating Navigation (Visible on Main Tab Screens) */}
      <BottomNav currentScreen={currentScreen} onNavigate={navigateTo} />

      {/* Floating Flutter Code Inspector Button */}
      <button
        onClick={() => setShowFlutterHub(true)}
        className="fixed bottom-24 right-4 z-40 px-3.5 py-2 rounded-full bg-[#1c1a24]/95 border border-[#7c3aed]/50 text-[#d2bbff] shadow-xl hover:bg-[#201e28] active:scale-95 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
        type="button"
        title="Ver código fuente en Flutter"
      >
        <svg className="w-4 h-4 fill-current text-[#4cd7f6]" viewBox="0 0 24 24">
          <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zM14.314 8.7L8.6 14.414 12.3 18.114 21.686 8.7h-7.372zM14.314 17.4L12.3 19.414 16.886 24h7.372l-9.944-6.6z" />
        </svg>
        <span className="text-xs font-bold font-mono">Flutter 3 Code</span>
      </button>

      {/* Flutter Inspector Modal */}
      <FlutterCodeHub
        isOpen={showFlutterHub}
        onClose={() => setShowFlutterHub(false)}
        showToast={showToast}
      />

      {/* Reusable Toast Alert */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
