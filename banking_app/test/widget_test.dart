// Basic smoke tests for the banking app shell.

import 'package:flutter_test/flutter_test.dart';

import 'package:banking_app/main.dart';

void main() {
  testWidgets('Dashboard renders with all navigation sections', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const BankingApp());
    await tester.pumpAndSettle();

    // Dashboard is the default section.
    expect(find.text('Welcome back'), findsOneWidget);

    // The four navigation destinations are present.
    expect(find.text('Dashboard'), findsWidgets);
    expect(find.text('Tracker'), findsWidgets);
    expect(find.text('Authentication'), findsWidgets);
    expect(find.text('Verification'), findsWidgets);
  });

  testWidgets('Tapping a destination switches sections', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const BankingApp());
    await tester.pumpAndSettle();

    await tester.tap(find.text('Authentication').first);
    await tester.pumpAndSettle();

    expect(find.text('Sign in securely to your account'), findsOneWidget);
  });

  testWidgets('Dashboard widget navigates to a linked section', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const BankingApp());
    await tester.pumpAndSettle();

    // Tapping the balance card opens the Verification section.
    await tester.tap(find.text('Total balance'));
    await tester.pumpAndSettle();

    expect(
      find.text('Verify your identity to unlock all features'),
      findsOneWidget,
    );
  });
}
