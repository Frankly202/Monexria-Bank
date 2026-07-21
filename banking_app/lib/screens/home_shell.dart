import 'package:flutter/material.dart';

import '../theme.dart';
import 'dashboard_section.dart';
import 'cards_section.dart';
import 'payments_section.dart';
import 'profile_section.dart';

/// Top-level shell that hosts the 4 sections and the responsive navigation bar.
///
/// On compact (mobile / narrow web) viewports it shows a bottom [NavigationBar];
/// on wider viewports it shows a side [NavigationRail] so the layout stays
/// comfortable on the web.
class HomeShell extends StatefulWidget {
  const HomeShell({super.key});

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _NavItem {
  const _NavItem({
    required this.label,
    required this.icon,
    required this.selectedIcon,
    required this.builder,
  });

  final String label;
  final IconData icon;
  final IconData selectedIcon;
  final WidgetBuilder builder;
}

class _HomeShellState extends State<HomeShell> {
  int _selectedIndex = 0;

  static final List<_NavItem> _sections = <_NavItem>[
    _NavItem(
      label: 'Dashboard',
      icon: Icons.dashboard_outlined,
      selectedIcon: Icons.dashboard,
      builder: (_) => const DashboardSection(),
    ),
    _NavItem(
      label: 'Cards',
      icon: Icons.credit_card_outlined,
      selectedIcon: Icons.credit_card,
      builder: (_) => const CardsSection(),
    ),
    _NavItem(
      label: 'Payments',
      icon: Icons.swap_horiz_outlined,
      selectedIcon: Icons.swap_horiz,
      builder: (_) => const PaymentsSection(),
    ),
    _NavItem(
      label: 'Profile',
      icon: Icons.person_outline,
      selectedIcon: Icons.person,
      builder: (_) => const ProfileSection(),
    ),
  ];

  void _onDestinationSelected(int index) {
    setState(() => _selectedIndex = index);
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= Breakpoints.compact;

    final content = SafeArea(
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(
            maxWidth: Breakpoints.maxContentWidth,
          ),
          child: _sections[_selectedIndex].builder(context),
        ),
      ),
    );

    if (isWide) {
      return Scaffold(
        body: Row(
          children: <Widget>[
            NavigationRail(
              selectedIndex: _selectedIndex,
              onDestinationSelected: _onDestinationSelected,
              labelType: NavigationRailLabelType.all,
              leading: const _RailLogo(),
              destinations: <NavigationRailDestination>[
                for (final item in _sections)
                  NavigationRailDestination(
                    icon: Icon(item.icon),
                    selectedIcon: Icon(item.selectedIcon),
                    label: Text(item.label),
                  ),
              ],
            ),
            const VerticalDivider(width: 1),
            Expanded(child: content),
          ],
        ),
      );
    }

    return Scaffold(
      body: content,
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: _onDestinationSelected,
        destinations: <Widget>[
          for (final item in _sections)
            NavigationDestination(
              icon: Icon(item.icon),
              selectedIcon: Icon(item.selectedIcon),
              label: item.label,
            ),
        ],
      ),
    );
  }
}

class _RailLogo extends StatelessWidget {
  const _RailLogo();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 24),
      child: CircleAvatar(
        radius: 22,
        backgroundColor: colorScheme.primary,
        child: Icon(Icons.account_balance, color: colorScheme.onPrimary),
      ),
    );
  }
}
