import '../models/game_models.dart';

const String kLogoUrl =
    'https://picsum.photos/seed/gamezone_logo/200/200';

const String kDefaultAvatarUrl =
    'https://picsum.photos/seed/avatar1/200/200';

List<Game> getInitialGames() => [
      Game(
        id: 'turbo-circuit',
        title: 'Turbo Circuit',
        subtitle: 'Personalización extrema y multijugador',
        edition: 'Edición Digital E-Sports • Lanzamiento 2024',
        releaseYear: '2024',
        price: 599.0,
        rating: 4.7,
        ratingCount: '1.4k',
        genreTags: ['Carreras', 'Simulación', 'Popular'],
        category: 'Carreras',
        image:
            'https://picsum.photos/seed/turbo_circuit/400/600',
        bannerImage:
            'https://picsum.photos/seed/turbo_circuit_banner/800/400',
        description:
            'Compite en circuitos urbanos y de alta velocidad por metrópolis globales como Tokio, Nueva York y Mónaco. Experimenta física de conducción reactiva y simulación aerodinámica de precisión milimétrica.',
        keyFeatures: [
          'Más de 140 vehículos hiperdeportivos licenciados.',
          'Modo Carrera profesional con contratos de patrocinadores reales.',
          'Multijugador local en pantalla dividida y lobbies en línea de 24 autos.',
        ],
        gameplayModes:
            'Física de conducción reactiva y simulación aerodinámica de precisión milimétrica.',
        platforms: ['PS5', 'Xbox Series X', 'PC Digital', 'Switch'],
        specs: const GameSpecs(
          mode: 'Multi y Solo',
          graphics: '4K 60FPS',
          space: '65 GB',
        ),
        isInstalled: true,
        installSize: 'SSD: 64.2 GB',
        hoursPlayed: 12,
        version: 'v1.4.2',
        badge: 'TOP 3',
      ),
      Game(
        id: 'galaxy-raiders',
        title: 'Galaxy Raiders',
        subtitle: 'Lucha titánica mecha en planetas distantes',
        edition: 'Edición Táctica Sci-Fi • PlayStation 5 / PC',
        releaseYear: '2024',
        price: 899.0,
        rating: 4.9,
        ratingCount: '2.8k',
        genreTags: ['Acción Sci-Fi', 'Nuevo', 'Táctico'],
        category: 'Acción',
        image:
            'https://picsum.photos/seed/galaxy_raiders/400/600',
        bannerImage:
            'https://picsum.photos/seed/galaxy_raiders_banner/800/400',
        description:
            'Despliega mechas colosales fuertemente armados en frentes interplanetarios hostiles. Combina armamento balístico pesado, escudos cuánticos de energía y maniobras orbitales dinámicas.',
        keyFeatures: [
          'Guerra mecha a escala colosal con destrucción de entorno procedural.',
          'Campaña cooperativa de hasta 4 pilotos en escuadrón.',
          'Árbol de tecnología militar modular con más de 300 componentes customizables.',
        ],
        platforms: ['PS5', 'PC Digital', 'Xbox Series X'],
        specs: const GameSpecs(
          mode: 'Co-op y PvP',
          graphics: 'Ray Tracing 4K',
          space: '78 GB',
        ),
        isInstalled: true,
        hoursPlayed: 42,
        level: 38,
        achievements: const GameAchievements(current: 34, total: 50),
        isFavorite: true,
      ),
      Game(
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
        genreTags: ['Cyberpunk', 'RPG', 'Oferta'],
        category: 'Cyberpunk',
        image:
            'https://picsum.photos/seed/neon_nexus/400/600',
        bannerImage:
            'https://picsum.photos/seed/neon_nexus_banner/800/400',
        description:
            'Recorre los callejones empapados en lluvia de Neo-Kyoto y el infame Distrito 7. Conviértete en un mercenario mejorado cibernéticamente con katana de plasma y hackeo cerebral directo.',
        keyFeatures: [
          'Combate visceral cuerpo a cuerpo y tiroteos tácticos cibernéticos.',
          'Narrativa ramificada con 12 finales y decisiones de sindicatos corporativos.',
        ],
        platforms: ['PC Digital', 'PS5', 'Xbox Series X'],
        specs: const GameSpecs(
          mode: 'Solo Story',
          graphics: '4K DLSS 3.5',
          space: '80 GB',
        ),
        isDownloading: true,
        downloadProgress: 74,
      ),
      Game(
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
        genreTags: ['Estrategia', 'Sigilo', 'Cloud Ready'],
        category: 'Estrategia',
        image:
            'https://picsum.photos/seed/shadow_protocol/400/600',
        description:
            'Infiltra complejos de máxima seguridad utilizando camuflaje holográfico y drones de reconocimiento táctico.',
        keyFeatures: [
          'Misiones dinámicas no lineales.',
          'Soporte completo de juego en la nube GameZone Cloud Stream.',
        ],
        platforms: ['PC Digital', 'Cloud', 'PS5'],
        specs: const GameSpecs(
          mode: 'Sigilo Táctico',
          graphics: '1080p Cloud / 4K',
          space: '48 GB',
        ),
        isCloud: true,
        lastPlayed: 'Hace 3d',
      ),
    ];

List<CartItem> getInitialCart() => [
      CartItem(
        id: 'cart-1',
        gameId: 'turbo-circuit',
        title: 'Turbo Circuit',
        edition: 'Edición Digital Deluxe',
        price: 599.0,
        platform: 'PS5',
        image:
            'https://picsum.photos/seed/turbo_circuit/400/600',
      ),
      CartItem(
        id: 'cart-2',
        gameId: 'neon-nexus',
        title: 'Neon Nexus: 2084',
        edition: 'Pase de Temporada',
        price: 349.0,
        originalPrice: 499.0,
        discount: '-30%',
        platform: 'PC Digital',
        image:
            'https://picsum.photos/seed/neon_nexus/400/600',
      ),
    ];

List<RewardItem> getInitialRewards() => [
      RewardItem(
        id: 'rew-1',
        title: 'Pase de Batalla - Temporada 4',
        code: 'GZ-9984',
        statusText: 'Canjeado con éxito',
        dateText: 'Hace 2h',
        subtext: 'Activado en tu cuenta principal',
        iconName: 'military_tech',
        badgeText: 'Canjeado con éxito',
        badgeType: 'success',
      ),
      RewardItem(
        id: 'rew-2',
        title: 'Skin Exclusiva Mech Titan',
        code: 'TITAN-XP',
        statusText: 'Disponible en inventario cosmético',
        dateText: 'Ayer',
        subtext: 'Galaxy Raiders',
        iconName: 'redeem',
        badgeText: '+500 Puntos XP',
        badgeType: 'xp',
      ),
      RewardItem(
        id: 'rew-3',
        title: 'Cupón 20% de Descuento',
        code: 'SUMMER-20',
        statusText: 'Listo para usar en Carrito',
        dateText: '12 Jun',
        subtext: 'Aplicable a títulos seleccionados',
        iconName: 'local_offer',
        badgeText: 'Fin de mes',
        badgeType: 'discount',
      ),
    ];

UserProfile getInitialUser() => UserProfile(
      name: 'Alex Vance',
      gamertag: '@alexvance_gamer',
      avatar: kDefaultAvatarUrl,
      vipLevel: 42,
      gamesCount: 18,
      trophiesCount: 45,
      pointsCount: 1250,
      zCoins: 3450,
      monthlyPassExpiresDays: 12,
    );
