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
    expect(find.text('Cards'), findsWidgets);
    expect(find.text('Payments'), findsWidgets);
    expect(find.text('Profile'), findsWidgets);
  });

  testWidgets('Tapping a destination switches sections', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const BankingApp());
    await tester.pumpAndSettle();

    await tester.tap(find.text('Cards').first);
    await tester.pumpAndSettle();

    expect(find.text('Manage your debit and credit cards'), findsOneWidget);
  });
}
