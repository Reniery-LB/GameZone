class Game {
  final String id;
  final String title;
  final String? subtitle;
  final String? edition;
  final String? releaseYear;
  final double price;
  final double? originalPrice;
  final int? discountPercentage;
  final double rating;
  final String? ratingCount;
  final bool verified;
  final List<String> genreTags;
  final String category;
  final String image;
  final String? bannerImage;
  final String description;
  final List<String> keyFeatures;
  final String? gameplayModes;
  final List<String> platforms;
  final GameSpecs specs;
  final bool isInstalled;
  final String? installSize;
  final int? downloadProgress;
  final bool isDownloading;
  final bool isCloud;
  final int? hoursPlayed;
  final int? level;
  final GameAchievements? achievements;
  final String? lastPlayed;
  final String? version;
  bool isFavorite;
  final String? badge;

  Game({
    required this.id,
    required this.title,
    this.subtitle,
    this.edition,
    this.releaseYear,
    required this.price,
    this.originalPrice,
    this.discountPercentage,
    required this.rating,
    this.ratingCount,
    this.verified = true,
    required this.genreTags,
    required this.category,
    required this.image,
    this.bannerImage,
    required this.description,
    required this.keyFeatures,
    this.gameplayModes,
    required this.platforms,
    required this.specs,
    this.isInstalled = false,
    this.installSize,
    this.downloadProgress,
    this.isDownloading = false,
    this.isCloud = false,
    this.hoursPlayed,
    this.level,
    this.achievements,
    this.lastPlayed,
    this.version,
    this.isFavorite = false,
    this.badge,
  });
}

class GameSpecs {
  final String mode;
  final String graphics;
  final String space;

  const GameSpecs({
    required this.mode,
    required this.graphics,
    required this.space,
  });
}

class GameAchievements {
  final int current;
  final int total;

  const GameAchievements({
    required this.current,
    required this.total,
  });
}

class CartItem {
  final String id;
  final String gameId;
  final String title;
  final String edition;
  final double price;
  final double? originalPrice;
  final String? discount;
  final String platform;
  final String image;
  bool isGift;
  final bool immediateDelivery;

  CartItem({
    required this.id,
    required this.gameId,
    required this.title,
    required this.edition,
    required this.price,
    this.originalPrice,
    this.discount,
    required this.platform,
    required this.image,
    this.isGift = false,
    this.immediateDelivery = true,
  });
}

class RewardItem {
  final String id;
  final String title;
  final String code;
  final String statusText;
  final String dateText;
  final String subtext;
  final String iconName;
  final String badgeText;
  final String badgeType; // 'success' | 'xp' | 'discount'

  RewardItem({
    required this.id,
    required this.title,
    required this.code,
    required this.statusText,
    required this.dateText,
    required this.subtext,
    required this.iconName,
    required this.badgeText,
    required this.badgeType,
  });
}

class UserProfile {
  String name;
  String gamertag;
  String avatar;
  int vipLevel;
  int gamesCount;
  int trophiesCount;
  int pointsCount;
  int zCoins;
  int monthlyPassExpiresDays;
  bool is2FAEnabled;

  UserProfile({
    required this.name,
    required this.gamertag,
    required this.avatar,
    required this.vipLevel,
    required this.gamesCount,
    required this.trophiesCount,
    required this.pointsCount,
    required this.zCoins,
    required this.monthlyPassExpiresDays,
    this.is2FAEnabled = true,
  });
}
