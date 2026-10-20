# 🎮 GameZone - Next-Gen Gaming Hub

[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.x-0175C2?logo=dart&logoColor=white)](https://dart.dev)
[![Material 3](https://img.shields.io/badge/Design-Material_3-7C3AED)](https://m3.material.io)
[![Style](https://img.shields.io/badge/Theme-Cyberpunk_Dark_OLED-4CD7F6)](https://github.com)
[![Firebase](https://img.shields.io/badge/Backend-Firebase_Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)

A cross-platform **Flutter** gaming application designed with **Material 3** and an immersive **Cyberpunk Dark OLED** aesthetic. **GameZone** brings together game discovery, an interactive digital storefront, cloud library management, reward QR/PIN scanning, and a gamified VIP rewards program.

---

## 🌟 Key Features & Implemented Screens

### 1. 🏠 Gaming Hub Home (`home_screen.dart`)
- **Gamer Header**: Profile status, drops notifications, and event announcements.
- **Dynamic Search & Filters**: Search games by name, category, or simulated voice search.
- **Category Navigation**: Quick filters for *All, Action, RPG, Racing, Cyberpunk, and Strategy*.
- **Hero Spotlight Card**: Interactive banner showcasing top-tier titles (e.g., *Galaxy Raiders*) with star ratings, pricing in MXN, and direct purchase triggers.
- **Flash Deals Section**: Limited-time discounts (e.g., *Neon Nexus: 2084* with 35% OFF and animated countdown badge).
- **Popular & Trending**: Curated rankings and top community picks (*Turbo Circuit* Top 3).

### 2. 🎮 Interactive Game Details (`game_detail_screen.dart`)
- **Cinematic Visuals**: Parallax cover art with gradient lighting.
- **Metacritic & Verified Badges**: Authentic score breakdown and verified game tag.
- **Multi-Platform Selector**: Toggle between *PS5, Xbox Series X, PC Digital, and Nintendo Switch*.
- **Hardware Performance Quick-Specs**: Direct stats on resolution/FPS (4K 60FPS), Ray Tracing, and storage requirements.
- **Expandable Accordions**: Smooth animated dropdowns for *Key Features* and *Gameplay & Modes*.
- **Community Reviews**: Rating distribution with progress bars and verified gamer feedback.
- **Sticky Purchase Bar**: Fixed bottom navigation showing final price and reactive "Add to Cart" button.

### 3. 🛒 Smart Shopping Cart (`cart_screen.dart`)
- **Cart Item Management**: Item deletion, quantity updates, and "Gift to a friend" options.
- **Z-Coins Gamer Club**: Interactive toggle to redeem 1,000 Z-Coins for a -$100 MXN instant discount.
- **Promo Coupon System**: Apply promotional voucher codes with real-time total recalculation.
- **Payment Method Selector**: Support for Credit/Debit Cards, Google Pay, and Apple Pay.
- **Order Summary**: Detailed pricing breakdown with taxes and VAT.
- **Purchase Confirmation Dialog**: Interactive modal with direct redirection to your Digital Library.

### 4. 📚 Digital Library & Cloud Streaming (`library_screen.dart`)
- **Status Filtering**: Filter by *All, Installed, Cloud Streaming, and Favorites*.
- **Spotlight Title**: Dynamic card featuring *Galaxy Raiders* with achievement progress tracking (68%) and "Continue Playing" CTA.
- **Installed Library**: Offline-ready games with version badges (*Turbo Circuit* v1.4.2).
- **Background Downloads**: Simulated active download (*Neon Nexus: 2084*) with progress bar and Pause / Resume controls.
- **Cloud Gaming Integration**: Instant stream launch for cloud-enabled games (*Shadow Protocol: Strike*).
- **Gamer Statistics Dashboard**: Real-time stats showing total hours played (184h) and trophies unlocked (45).

### 5. ⚡ Reward Scanner HUD (`scanner_screen.dart`)
- **Futuristic Scanner HUD**: Cyberpunk viewfinder with a continuous animated scanning laser beam.
- **Hardware Controls**: Flashlight / torch toggle with haptic feedback.
- **Gallery Image Import**: Scan QR codes and gift card barcodes directly from your device gallery.
- **Manual Code Voucher Redemption**: Alphanumeric dialog to redeem digital keys and gift card PINs.
- **Reward History**: Feed of claimed rewards, including XP boosts, Season Battle Passes, and store discounts.

### 6. 👤 Gamer Profile & VIP Rewards Vault (`profile_screen.dart`)
- **Profile Header**: Gamer avatar with dynamic gradient level ring and verified badge.
- **VIP Level & Metrics**: Level 42 Elite status with statistics (18 Games, 45 Trophies, 1,250 Rank Points).
- **Avatar Customization**: Interactive bottom sheet to capture or select a new profile photo via Camera or Gallery.
- **Z-Coins Rewards Vault**: Balance counter (3,450 Z-Coins) and instant redemption for the Epic Battle Pass.
- **Settings & Security**: Two-Factor Authentication (2FA), notification preferences, and saved payment methods.

### 7. 🔐 Authentication & Guest Mode (`auth_screen.dart`)
- **Dual Authentication**: Seamless switching between Login and Registration.
- **OAuth Providers**: One-tap sign-in with Google and Apple accounts.
- **Guest / Explorer Mode**: Browse the catalog, check features, and explore without an immediate login.
- **Password Strength Analyzer**: Interactive real-time security meter with a +500 XP registration welcome bonus.

---

## 🎨 Design System & Color Palette (`app_theme.dart`)

GameZone is built around a custom **Cyberpunk Dark OLED** design language:

| Token | Hex Code | Description |
|---|---|---|
| **Surface / Background** | `#13121B` | Deep OLED black with cool purple undertone |
| **Primary Container** | `#7C3AED` | Vibrant electric violet |
| **Primary Accent** | `#D2BBFF` | Soft glowing lavender for highlights |
| **Tertiary Accent** | `#4CD7F6` | Cyberpunk neon cyan |
| **Secondary Accent** | `#CEBDFF` | Subtle pastel lilac for secondary elements |
| **Typography** | Google Fonts | *Outfit* for modern titles & *Plus Jakarta Sans* for readable body text |

---

## 📁 Project Architecture

```
lib/
├── data/
│   └── game_data.dart            # Mock games catalogue, categories, and promotions
├── models/
│   └── game_models.dart          # Data models: GameItem, Review, CartItem, UserProfile
├── screens/
│   ├── auth_screen.dart          # Authentication & Guest login
│   ├── cart_screen.dart          # Shopping cart, discounts, and checkout
│   ├── game_detail_screen.dart   # Cinematic game details and platform selector
│   ├── home_screen.dart          # Main store discovery and hero banners
│   ├── library_screen.dart       # Installed games, downloads, and cloud streaming
│   ├── main_screen.dart          # Root navigation with glowing bottom bar
│   ├── profile_screen.dart       # Gamer profile, VIP rank, and rewards vault
│   └── scanner_screen.dart       # Cyberpunk laser HUD QR/code scanner
├── theme/
│   └── app_theme.dart            # Material 3 theme data, colors, and text styles
├── firebase_options.dart         # Generated Firebase configuration
└── main.dart                     # Application entry point & session state
```

---

## 🚀 Getting Started

### Prerequisites
- **Flutter SDK**: `>=3.0.0 <4.0.0`
- **Dart SDK**: Compatible with Flutter SDK
- **IDE**: Android Studio, Visual Studio Code, or IntelliJ IDEA with Flutter extensions
- **Target Platform**: Android, iOS, Windows, macOS, Linux, or Web (Google Chrome)

### 1. Clone the Repository
```bash
git clone https://github.com/Reniery-LB/GameZone.git
cd GameZone
```

### 2. Install Flutter Dependencies
```bash
flutter pub get
```

### 3. Run the App

#### Default device or connected emulator:
```bash
flutter run
```

#### Run on Google Chrome (Flutter Web):
```bash
flutter run -d chrome
```

#### Run on Windows Desktop:
```bash
flutter run -d windows
```

---

## 🔥 Firebase Configuration

GameZone includes Firebase Authentication integration:
- Android: `android/app/google-services.json`
- Cross-platform configuration: `lib/firebase_options.dart`

To link your own Firebase project:
```bash
flutterfire configure
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
