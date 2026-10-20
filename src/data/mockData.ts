import { Game, CartItem, RewardItem, UserProfile, Review } from '../types';

export const GAMEZONE_LOGO =
  'https://lh3.googleusercontent.com/aida/AEtjO1VS914CTS1VCSL_u8W4S4UJZN2u8OvN8Z-y_0TX_ee2iqUG2osWjuRIaJ3JZR8cmN1dAI4-bfRVq9vf23Yu63YTlt86BLI2ezg_ICj3POQHwnPPnfDn3OP9rwmrufQ3ytv3IZ5lG1hv0xHOrxfQtu-57Wy8xKxxBl5ietVYCVeEtn928UkuTMITzN6KYkHWE_e7jAxbTexr6BGAkYYFwBodngYxXWfLKuipTH3AEuffwr3_G722GBGJVj0';

export const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD_yTO6_iP_RWMzBzO6o33op2O899qLPswfjDl0Fvn0rUtoc4vmi4KWw_7iWtznydY8T7PVyKybZ6YPKaMZJbn9GeZyoSH895w0KUv9o9X0U0hPmIn961nkYuQ6_87-Fy16qWX_8G0O1V6DO-wDWzBXUh0No6UfLaDdPR0eVoTo1fwhB_3Bt8OHxE45PewNe07RQZGkNHwmXQ_Yklyl2b1S_HEnYXS6FumCcLpiZZUtfSqIiIrIxuGP';

export const INITIAL_USER: UserProfile = {
  name: 'Alex Vance',
  gamertag: '@alexvance_gamer',
  avatar: DEFAULT_AVATAR,
  vipLevel: 42,
  gamesCount: 18,
  trophiesCount: 45,
  pointsCount: 1250,
  zCoins: 3450,
  monthlyPassExpiresDays: 12,
  is2FAEnabled: true,
  paymentCard: {
    brand: 'VISA',
    last4: '8842',
    expiry: '09/27',
    isPrimary: true,
  },
};

export const INITIAL_GAMES: Game[] = [
  {
    id: 'turbo-circuit',
    title: 'Turbo Circuit',
    subtitle: 'Personalización extrema y multijugador',
    edition: 'Edición Digital E-Sports • Lanzamiento 2024',
    releaseYear: '2024',
    price: 599.0,
    rating: 4.7,
    ratingCount: '1.4k',
    verified: true,
    genreTags: ['Carreras', 'Simulación', 'Popular'],
    category: 'Carreras',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnXPJyXc6_hWZ2nVNYTWMq4ZABhHfexaV_AdP1IY5ZhNRPMlmvffvR1cbMdtXHrXLTDHqmgzmXxRi-7E8kVFaUdJAU8hvLy8AWwijj9yg6XSiBFcC1WNp-mBOD0oYQLrsm6eGm--JwJ26c1zpptPsylO9EowwsmHCxK3o8H6YeIq5CRQj4QCuAr7n8TwPcu0wHkc9vBEB8s7kEG6_BBB9lPvyMSap8mA2qSerj2Y_C4Ei1_j6fXrE9G4yr0xE9UOLJ5w',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDknaghWoFU7LJQGOL16GYh4pyyYJ2eaUCib3VSuzq5NhcscjUmaCGVhiAgvx9ryRtIkH-YIwA8ml0FL4eQlxsRpkyeXjAEzE09QCByfj2NivBfbGAzYOB-S3KtDdHYg7VD4_a-PJ_wzBjAbUQLeSPuVhWgSVWo6Ds2o80x0daphx-_dFld5YmbqrFBQF5J-_IxqvuznO5kudveoXzVPGCgnQwozalf0lmnwTWt9u87lCtWMStOIxXm51gEmP9vYvkRHQ',
    description:
      'Compite en circuitos urbanos y de alta velocidad por metrópolis globales como Tokio, Nueva York y Mónaco. Experimenta física de conducción reactiva y simulación aerodinámica de precisión milimétrica.',
    keyFeatures: [
      'Más de 140 vehículos hiperdeportivos licenciados.',
      'Modo Carrera profesional con contratos de patrocinadores reales.',
      'Multijugador local en pantalla dividida y lobbies en línea de 24 autos.',
      'Personalización estética y calibración de telemetría por telemetría en tiempo real.',
    ],
    gameplayModes:
      'Física de conducción reactiva y simulación aerodinámica de precisión milimétrica. Personaliza el rendimiento de escape, suspensión y telemetría de neumáticos para cada circuito.',
    platforms: ['PS5', 'Xbox Series X', 'PC Digital', 'Switch'],
    specs: {
      mode: 'Multi y Solo',
      graphics: '4K 60FPS',
      space: '65 GB',
    },
    isInstalled: true,
    installSize: 'SSD: 64.2 GB',
    hoursPlayed: 12,
    version: 'v1.4.2',
    badge: 'TOP 3',
    isFavorite: false,
  },
  {
    id: 'galaxy-raiders',
    title: 'Galaxy Raiders',
    subtitle: 'Lucha titánica mecha en planetas distantes',
    edition: 'Edición Táctica Sci-Fi • PlayStation 5 / PC',
    releaseYear: '2024',
    price: 899.0,
    rating: 4.9,
    ratingCount: '2.8k',
    verified: true,
    genreTags: ['Acción Sci-Fi', 'Nuevo', 'Táctico'],
    category: 'Acción',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNjZ1-j2XaSNh97YfNA1txIudYkU5gNqv4m2uq-7QaruY1zSYIdDDBHXb0niivtic5qg10Q6A3sAiUSJZ_5CxDZY0kfH8QuZHZGwEZ-eGKdIBO2jJ3hnf8reDtFoZiYComvTUgVGN4I3Wjosb90aKWoGn4MZjjXZ40q7HwHg6Aqaa9mPGfny4iD6oKiSV2WxC9VtaGSNoZgxNmNgQmzBul03cBlEFUVNKyzSZg_GI9yyPdS1gR_VYz',
    bannerImage:
      'https://lh3.googleusercontent.com/aida/AEtjO1U2bUvAy9MtU741_anvHuQUSLbRM-Nv87PtHew3p8bbYOebZXpxD6_Gvnkv_eMMkieMdd_X9DlLF6vWHWWJMmjbMWMPOUvjB1hBW8FwOcuYp-qV6_U3Sp34TcrpBMj8osEFnEZzaBhdm5fCg6ITZQIQmEf7sFSb-yy_awuiu4iVAKZjR-F2giJOqlO-ykmtCA3ilgrIAbhikOmwV9vdr4NZrp8WWI4H1qpuNmQrsMhYKA8MY7S0MKCLUw',
    description:
      'Despliega mechas colosales fuertemente armados en frentes interplanetarios hostiles. Combina armamento balístico pesado, escudos cuánticos de energía y maniobras orbitales dinámicas.',
    keyFeatures: [
      'Guerra mecha a escala colosal con destrucción de entorno procedural.',
      'Campaña cooperativa de hasta 4 pilotos en escuadrón.',
      'Árbol de tecnología militar modular con más de 300 componentes customizables.',
    ],
    gameplayModes:
      'Incursiones cooperativas de asalto orbital, batallas territoriales PvP y modo supervivencia táctica.',
    platforms: ['PS5', 'PC Digital', 'Xbox Series X'],
    specs: {
      mode: 'Co-op y PvP',
      graphics: 'Ray Tracing 4K',
      space: '78 GB',
    },
    isInstalled: true,
    hoursPlayed: 42,
    level: 38,
    achievements: {
      current: 34,
      total: 50,
    },
    isNew: true,
    isFavorite: true,
  },
  {
    id: 'neon-nexus',
    title: 'Neon Nexus: 2084',
    subtitle: 'Distrito 7 • Cyberpunk RPG de acción',
    edition: 'Pase de Temporada & Juego Base',
    releaseYear: '2024',
    price: 779.0,
    originalPrice: 1199.0,
    discountPercentage: 35,
    rating: 4.8,
    ratingCount: '3.1k',
    verified: true,
    genreTags: ['Cyberpunk', 'RPG', 'Oferta'],
    category: 'Cyberpunk',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-TxxDCu1ykhWqwfPI-1UFjuwkCspwxPtjEH3uz_kZW-8kdhj5Cnz4x8GaRjrq4tRAdLojtHOnf_5I1AbbASRRq4LbvordRhsnhIEb7KHjToUDVoULWvlHXyofD8Fo2GspO0DEvyQP8XfmeOrlmFVQno9upxQtT8Hsl2fQOSzGEvy_dTYKQWO1zrkpVf3WECk2pI-ijHn9OJO5ziy8HGC-HOz_4V94EcUYrSknJPu7x6a_KsBTgNGS',
    bannerImage:
      'https://lh3.googleusercontent.com/aida/AEtjO1Wfqb2Pdk4YGBxNDs3Cfxw__YuFnGtDpvp055lQ2kdZMxln6jaubKY6wpxnwPzmigo7pQtlo1uC0Oissc-f2kN4uVwNB2Z3Wadaa2YcHy5A3rgK-jd95OmL2iyTkQtr3FBX74vhZEZcSeQ_i6RLwunSuyUmq9d4HTcUieX7CZn8wWj04-nth_ZnwCaIJwh1pnFRigDVE7bLrZOf6Q1rW9MK0o7XhSKKhlZX5WhrYMUqW9XEqQV0W-fnwQ',
    description:
      'Recorre los callejones empapados en lluvia de Neo-Kyoto y el infame Distrito 7. Conviértete en un mercenario mejorado cibernéticamente con katana de plasma y hackeo cerebral directo.',
    keyFeatures: [
      'Combate visceral cuerpo a cuerpo y tiroteos tácticos cibernéticos.',
      'Narrativa ramificada con 12 finales y decisiones de sindicatos corporativos.',
      'Banda sonora synthwave original inmersiva.',
    ],
    gameplayModes:
      'Modo historia inmersivo para un jugador con desafíos de ciber-arena y contratos semanales.',
    platforms: ['PC Digital', 'PS5', 'Xbox Series X'],
    specs: {
      mode: 'Solo Story',
      graphics: '4K DLSS 3.5',
      space: '80 GB',
    },
    isDownloading: true,
    downloadProgress: 74,
    isFavorite: false,
  },
  {
    id: 'shadow-protocol',
    title: 'Shadow Protocol: Strike',
    subtitle: 'Sigilo táctico y nano-armadura de vanguardia',
    edition: 'Operaciones Especiales Digital',
    releaseYear: '2023',
    price: 649.0,
    originalPrice: 899.0,
    discountPercentage: 28,
    rating: 4.5,
    ratingCount: '980',
    verified: true,
    genreTags: ['Estrategia', 'Sigilo', 'Cloud Ready'],
    category: 'Estrategia',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJkzQZCg-GwFwoL17feY9GUBSvbmkR6mXwQtaGsTDxE8IoTjoh2ZE6G-B96xnfPtCwXqLgPusEGa4eyxs4hI6HdTGweTWp6uYfn1XYenkzKe3LCyP8Roxf0iWPDDul7RP7NjYTGn_ATKbAkaOnthQ6MjVCk79-Q6VqeJkhmE5xRwwLgX4zRXM4LXuRTs6MBYkxu30X_36Uo-uCgB3zPE7cWGXJdbZPmNe1XqL4xM-WkKHmr-41rtlq',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJkzQZCg-GwFwoL17feY9GUBSvbmkR6mXwQtaGsTDxE8IoTjoh2ZE6G-B96xnfPtCwXqLgPusEGa4eyxs4hI6HdTGweTWp6uYfn1XYenkzKe3LCyP8Roxf0iWPDDul7RP7NjYTGn_ATKbAkaOnthQ6MjVCk79-Q6VqeJkhmE5xRwwLgX4zRXM4LXuRTs6MBYkxu30X_36Uo-uCgB3zPE7cWGXJdbZPmNe1XqL4xM-WkKHmr-41rtlq',
    description:
      'Infiltra complejos de máxima seguridad utilizando camuflaje holográfico y drones de reconocimiento táctico. Planifica cada movimiento o desata caos balístico controlado.',
    keyFeatures: [
      'Misiones dinámicas no lineales con múltiples vías de infiltración.',
      'Soporte completo de juego en la nube GameZone Cloud Stream.',
      'Modo cooperativo de asalto táctico a 2 jugadores.',
    ],
    platforms: ['PC Digital', 'Cloud', 'PS5'],
    specs: {
      mode: 'Sigilo Táctico',
      graphics: '1080p Cloud / 4K',
      space: '48 GB',
    },
    isCloud: true,
    lastPlayed: 'Hace 3d',
    isFavorite: false,
  },
];

export const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-item-1',
    gameId: 'turbo-circuit',
    title: 'Turbo Circuit',
    edition: 'Edición Digital Deluxe',
    price: 599.0,
    platform: 'PS5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHMafVM-zS7s7WAn7vzvJ2ijvHZViunOZc3bt7mivTihZo_GhDihyx-nyh-LwAF_XDVf03wRgwjh6cTrL2fzazSAUKTR3e12Yid9DpkxEsSBnh5kufpyRV1uTD1HpXXgRjtG5z8DYpjmK9O_-bkN5Q0j5uT6SxBazEbWrV4RVmZ2CCMDUPfs-axQ0m_37Rd8BOSZhLda9LNHGWNElhbNB2A1ahO3Hwguj5FJGxafAspO1DZ21WZDGN',
    isGift: false,
    immediateDelivery: true,
  },
  {
    id: 'cart-item-2',
    gameId: 'neon-nexus',
    title: 'Neon Nexus: 2084',
    edition: 'Pase de Temporada',
    price: 349.0,
    originalPrice: 499.0,
    discount: '-30%',
    platform: 'PC Digital',
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1Wfqb2Pdk4YGBxNDs3Cfxw__YuFnGtDpvp055lQ2kdZMxln6jaubKY6wpxnwPzmigo7pQtlo1uC0Oissc-f2kN4uVwNB2Z3Wadaa2YcHy5A3rgK-jd95OmL2iyTkQtr3FBX74vhZEZcSeQ_i6RLwunSuyUmq9d4HTcUieX7CZn8wWj04-nth_ZnwCaIJwh1pnFRigDVE7bLrZOf6Q1rW9MK0o7XhSKKhlZX5WhrYMUqW9XEqQV0W-fnwQ',
    isGift: false,
    immediateDelivery: true,
  },
];

export const INITIAL_REWARDS: RewardItem[] = [
  {
    id: 'rew-1',
    title: 'Pase de Batalla - Temporada 4',
    code: 'GZ-9984',
    statusText: 'Canjeado con éxito',
    dateText: 'Hace 2h',
    subtext: 'Activado en tu cuenta principal',
    icon: 'military_tech',
    badgeText: 'Canjeado con éxito',
    badgeType: 'success',
  },
  {
    id: 'rew-2',
    title: 'Skin Exclusiva Mech Titan',
    code: 'TITAN-XP',
    statusText: 'Disponible en inventario cosmético',
    dateText: 'Ayer',
    subtext: 'Galaxy Raiders',
    icon: 'featured_seasonal_and_gifts',
    badgeText: '+500 Puntos XP',
    badgeType: 'xp',
  },
  {
    id: 'rew-3',
    title: 'Cupón 20% de Descuento',
    code: 'SUMMER-20',
    statusText: 'Listo para usar en Carrito',
    dateText: '12 Jun',
    subtext: 'Aplicable a títulos seleccionados',
    icon: 'sell',
    badgeText: 'Fin de mes',
    badgeType: 'discount',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alex "Apex" R.',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDU9NJqUPSGBzlIc4MbB4dWt2MZt0zC6Bc-66MhXWbC0Cl-Cr_T3R3ZOqkxZ_up4USTfLk7P9KIFxd21awJhoF-OqxmE-Z1mvPQZwwfQZJkqH3703On-iMYuNd8u7FGlS3INuzz6Apd6nkObBKfnNLh8ufozV31KvwsX5QC0nvcx-YPMX_ECkDwLnQIz59pUg2_uBxswOmz8y1P5AEwgLGusWrXYxWC5VaJzHZqyR9us0gWH4lwMp5w',
    hoursPlayed: 48,
    rating: 5,
    comment:
      '"La sensación de velocidad en la pista de Tokio con lluvia es sencillamente una locura. La física con volante responde de manera increíble."',
  },
  {
    id: 'rev-2',
    author: 'Valeria_Drift',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcbpmwbbv6jHREFhEC6ruT5upKqymP-p5BX7ZXxCHx-OEwPeXtkzW6PVFDkIrHpD2tIkCXAkisnn5Pgv2aAO6Ttd2OEfiI9yGFSZ6AAyCGGrwdHzOFqMyhD-kQege7U5PM5TYQHW3NjhkhOZ3hohajhM49RnwB7bHZwf9KT7j9LAIbEXpHiUWjxmrlv3L5XMqSFCgePJokgUmbuUQaneNwjIA3uSE4Bh9lcOFOVKCqsEfx8c87VZpT',
    hoursPlayed: 112,
    rating: 5,
    comment:
      '"La personalización visual es enorme. Los servidores competitivos tienen cero lag. Indispensable si te gustan los simuladores de carreras."',
  },
];

export const COMMUNITY_AVATARS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCOELMIREwf1n4RsgSl9LBNAvlBHOSIuAZrsfhjWBb68wSY_4MJNxd8TtfZs_ODm-li-z14Igk6MceSF35DDIdokOMj8bk5UBlLm05zLkWd7xVVTkWaQMzYkgXE2kMNwvfEIriVWKRER5GBobsVLgFxtJLXxxVXSWCJ9Xnv7whQnqUsCkEwatRD-LHDIy1ektZxm5z1ZxvU2RCQxCruq37FBfX8BpszDsHr_1hUD2T4f-JsLXxQCsYA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBpfU67r0a4U1bmS36BU1K3kq0vUNNd0iydE7MJAvysJzx70fSkwR4maK34CIQ3F8GubR8-KlBMNGWoWtHrGK2XvblE8OM4brd6ksbDX-syI-CDle1bEwiN_vXZEZaR746RsX_N0s7Tc7zzURFEOnDzqSijKNnGE8RNiUr4VskJCZ93S5bIuGvRrUuBvTPKoqisXrk_cZaCkTYoty_hqJSlLyo6mCUyBh5DI8AHxcUyrYjjxciUNftP',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDv7hfhiqiZfMgmlkQniPZbWnLmwzbadVEK1hvvWrgCRVmkHE8-KN3xOVsC46tAlVv5rNTOEU9_Zm3MVYdn5k0xIV2LUbxmX0ipqusAMdfOWa2sGz68Z9QRVZv198CrM5yKtp9UhlC-ZHsWVT-81awp7E8i17RqEiampJOFWtfuYyXUWPA-6prhPpVF6xw62hznopRcV18sDmUBHIvRypVoR7OI-fgzFV8cq8Oq1u26cF2vZ1uN6UkG',
];
