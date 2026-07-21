import 'package:flutter/material.dart';

import '../theme.dart';
import 'home_shell.dart';
import '../widgets/section_header.dart';
import '../widgets/dashboard/balance_card.dart';
import '../widgets/dashboard/quick_actions.dart';
import '../widgets/dashboard/spending_overview.dart';
import '../widgets/dashboard/recent_transactions.dart';

/// Dashboard section — hosts the 4 dashboard widgets in a responsive layout.
///
/// The four widgets are [BalanceCard], [QuickActions], [SpendingOverview] and
/// [RecentTransactions]. Each widget links to one of the three feature
/// sections via [onOpenSection]:
/// - Balance card → Verification
/// - Quick actions → Authentication
/// - Spending overview & Recent transactions → Tracker
///
/// On wide viewports the bottom two are shown side by side; on narrow viewports
/// everything stacks vertically.
class DashboardSection extends StatelessWidget {
  const DashboardSection({super.key, required this.onOpenSection});

  /// Callback that switches the app to the section with the given index.
  final void Function(int sectionIndex) onOpenSection;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= Breakpoints.medium;

    return ListView(
      padding: const EdgeInsets.all(20),
      children: <Widget>[
        const SectionHeader(
          title: 'Welcome back',
          subtitle: 'Tap a card to jump to a section',
        ),
        const SizedBox(height: 20),
        BalanceCard(onTap: () => onOpenSection(AppSection.verification)),
        const SizedBox(height: 16),
        QuickActions(onTap: () => onOpenSection(AppSection.authentication)),
        const SizedBox(height: 16),
        if (isWide)
          IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Expanded(
                  child: SpendingOverview(
                    onTap: () => onOpenSection(AppSection.tracker),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: RecentTransactions(
                    onTap: () => onOpenSection(AppSection.tracker),
                  ),
                ),
              ],
            ),
          )
        else ...<Widget>[
          SpendingOverview(onTap: () => onOpenSection(AppSection.tracker)),
          const SizedBox(height: 16),
          RecentTransactions(onTap: () => onOpenSection(AppSection.tracker)),
        ],
      ],
    );
  }
}
