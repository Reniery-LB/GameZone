export type ScreenType =
  | 'inicio'
  | 'biblioteca'
  | 'escaner'
  | 'perfil'
  | 'carrito'
  | 'detalle'
  | 'login'
  | 'register';

export interface Game {
  id: string;
  title: string;
  subtitle?: string;
  edition?: string;
  releaseYear?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  ratingCount?: string;
  verified?: boolean;
  genreTags: string[];
  category: 'Todos' | 'Acción' | 'RPG' | 'Carreras' | 'Cyberpunk' | 'Estrategia';
  image: string;
  bannerImage?: string;
  description: string;
  keyFeatures: string[];
  gameplayModes?: string;
  platforms: string[];
  specs: {
    mode: string;
    graphics: string;
    space: string;
  };
  isInstalled?: boolean;
  installSize?: string;
  downloadProgress?: number;
  isDownloading?: boolean;
  isCloud?: boolean;
  hoursPlayed?: number;
  level?: number;
  achievements?: {
    current: number;
    total: number;
  };
  lastPlayed?: string;
  version?: string;
  isFavorite?: boolean;
  isNew?: boolean;
  badge?: string;
}

export interface CartItem {
  id: string;
  gameId: string;
  title: string;
  edition: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  platform: string;
  image: string;
  isGift: boolean;
  immediateDelivery: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  code: string;
  statusText: string;
  dateText: string;
  subtext: string;
  icon: string;
  badgeText: string;
  badgeType: 'success' | 'xp' | 'discount';
}

export interface UserProfile {
  name: string;
  gamertag: string;
  avatar: string;
  vipLevel: number;
  gamesCount: number;
  trophiesCount: number;
  pointsCount: number;
  zCoins: number;
  monthlyPassExpiresDays: number;
  is2FAEnabled: boolean;
  paymentCard: {
    brand: string;
    last4: string;
    expiry: string;
    isPrimary: boolean;
  };
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  hoursPlayed: number;
  rating: number;
  comment: string;
}
