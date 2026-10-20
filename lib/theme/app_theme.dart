import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class GameZoneColors {
  static const Color surface = Color(0xFF13121B);
  static const Color surfaceDim = Color(0xFF13121B);
  static const Color surfaceBright = Color(0xFF3A3842);
  static const Color surfaceContainerLowest = Color(0xFF0E0D16);
  static const Color surfaceContainerLow = Color(0xFF1C1A24);
  static const Color surfaceContainer = Color(0xFF201E28);
  static const Color surfaceContainerHigh = Color(0xFF2A2933);
  static const Color surfaceContainerHighest = Color(0xFF35333E);

  static const Color onSurface = Color(0xFFE5E0EE);
  static const Color onSurfaceVariant = Color(0xFFCCC3D8);
  static const Color outline = Color(0xFF958DA1);
  static const Color outlineVariant = Color(0xFF4A4455);

  static const Color primary = Color(0xFFD2BBFF);
  static const Color onPrimary = Color(0xFF3F008E);
  static const Color primaryContainer = Color(0xFF7C3AED);
  static const Color onPrimaryContainer = Color(0xFFEDE0FF);

  static const Color secondary = Color(0xFFCEBDFF);
  static const Color onSecondary = Color(0xFF381385);
  static const Color secondaryContainer = Color(0xFF4F319C);
  static const Color onSecondaryContainer = Color(0xFFBEA8FF);

  static const Color tertiary = Color(0xFF4CD7F6);
  static const Color onTertiary = Color(0xFF003640);
  static const Color tertiaryContainer = Color(0xFF007184);
  static const Color onTertiaryContainer = Color(0xFFB7EFFF);

  static const Color error = Color(0xFFFFB4AB);
  static const Color onError = Color(0xFF690005);
  static const Color errorContainer = Color(0xFF93000A);
  static const Color onErrorContainer = Color(0xFFFFDAD6);
}

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: GameZoneColors.surface,
      colorScheme: const ColorScheme.dark(
        surface: GameZoneColors.surface,
        onSurface: GameZoneColors.onSurface,
        onSurfaceVariant: GameZoneColors.onSurfaceVariant,
        primary: GameZoneColors.primary,
        onPrimary: GameZoneColors.onPrimary,
        primaryContainer: GameZoneColors.primaryContainer,
        onPrimaryContainer: GameZoneColors.onPrimaryContainer,
        secondary: GameZoneColors.secondary,
        onSecondary: GameZoneColors.onSecondary,
        secondaryContainer: GameZoneColors.secondaryContainer,
        onSecondaryContainer: GameZoneColors.onSecondaryContainer,
        tertiary: GameZoneColors.tertiary,
        onTertiary: GameZoneColors.onTertiary,
        tertiaryContainer: GameZoneColors.tertiaryContainer,
        onTertiaryContainer: GameZoneColors.onTertiaryContainer,
        error: GameZoneColors.error,
        onError: GameZoneColors.onError,
        outline: GameZoneColors.outline,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.outfit(
          fontSize: 40,
          fontWeight: FontWeight.bold,
          color: GameZoneColors.onSurface,
          letterSpacing: -0.8,
        ),
        headlineLarge: GoogleFonts.outfit(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: GameZoneColors.onSurface,
          letterSpacing: -0.5,
        ),
        headlineMedium: GoogleFonts.outfit(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: GameZoneColors.onSurface,
        ),
        headlineSmall: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: GameZoneColors.onSurface,
        ),
        titleMedium: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: GameZoneColors.onSurface,
        ),
        bodyLarge: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: GameZoneColors.onSurface,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          color: GameZoneColors.onSurfaceVariant,
        ),
        bodySmall: GoogleFonts.plusJakartaSans(
          fontSize: 12,
          fontWeight: FontWeight.normal,
          color: GameZoneColors.onSurfaceVariant,
        ),
        labelLarge: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: GameZoneColors.onSurface,
        ),
        labelMedium: GoogleFonts.plusJakartaSans(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: GameZoneColors.onSurface,
        ),
        labelSmall: GoogleFonts.plusJakartaSans(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          color: GameZoneColors.onSurfaceVariant,
          letterSpacing: 0.4,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: GameZoneColors.surface,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
      ),
    );
  }
}
