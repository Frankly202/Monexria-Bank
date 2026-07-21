import 'package:flutter/material.dart';

import '../theme.dart';
import '../widgets/section_header.dart';
import '../widgets/dashboard/balance_card.dart';
import '../widgets/dashboard/quick_actions.dart';
import '../widgets/dashboard/spending_overview.dart';
import '../widgets/dashboard/recent_transactions.dart';

/// Dashboard section — hosts the 4 dashboard widgets in a responsive layout.
///
/// The four widgets are [BalanceCard], [QuickActions], [SpendingOverview] and
/// [RecentTransactions]. On wide viewports the bottom two are shown side by
/// side; on narrow viewports everything stacks vertically.
class DashboardSection extends StatelessWidget {
  const DashboardSection({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= Breakpoints.medium;

    return ListView(
      padding: const EdgeInsets.all(20),
      children: <Widget>[
        const SectionHeader(
          title: 'Welcome back',
          subtitle: 'Here is your financial overview',
        ),
        const SizedBox(height: 20),
        const BalanceCard(),
        const SizedBox(height: 16),
        const QuickActions(),
        const SizedBox(height: 16),
        if (isWide)
          const IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Expanded(child: SpendingOverview()),
                SizedBox(width: 16),
                Expanded(child: RecentTransactions()),
              ],
            ),
          )
        else ...<Widget>[
          const SpendingOverview(),
          const SizedBox(height: 16),
          const RecentTransactions(),
        ],
      ],
    );
  }
}
