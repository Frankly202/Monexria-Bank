import 'package:flutter/material.dart';

/// Centralized theme configuration for the banking app.
class AppTheme {
  static const Color _seed = Color(0xFF1E5EFF);

  static ThemeData light() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: _seed,
      brightness: Brightness.light,
    );
    return _base(colorScheme);
  }

  static ThemeData dark() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: _seed,
      brightness: Brightness.dark,
    );
    return _base(colorScheme);
  }

  static ThemeData _base(ColorScheme colorScheme) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: colorScheme.surface,
      cardTheme: CardThemeData(
        elevation: 0,
        color: colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        clipBehavior: Clip.antiAlias,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: colorScheme.surface,
        elevation: 0,
        centerTitle: false,
      ),
    );
  }
}

/// Shared layout constants used across screens for a responsive experience.
class Breakpoints {
  static const double compact = 600;
  static const double medium = 1000;

  /// Content is centered and capped so the app looks good on wide web viewports.
  static const double maxContentWidth = 1100;
}
