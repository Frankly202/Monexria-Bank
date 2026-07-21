import 'package:flutter/material.dart';

import '../widgets/section_header.dart';

/// Profile section — placeholder for account settings and preferences.
class ProfileSection extends StatelessWidget {
  const ProfileSection({super.key});

  static const List<({IconData icon, String title})> _tiles =
      <({IconData icon, String title})>[
        (icon: Icons.person_outline, title: 'Personal details'),
        (icon: Icons.security_outlined, title: 'Security'),
        (icon: Icons.notifications_outlined, title: 'Notifications'),
        (icon: Icons.help_outline, title: 'Help & support'),
      ];

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    return ListView(
      padding: const EdgeInsets.all(20),
      children: <Widget>[
        const SectionHeader(
          title: 'Profile',
          subtitle: 'Account settings and preferences',
        ),
        const SizedBox(height: 20),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: <Widget>[
                CircleAvatar(
                  radius: 32,
                  backgroundColor: colorScheme.primaryContainer,
                  child: Icon(
                    Icons.person,
                    size: 32,
                    color: colorScheme.onPrimaryContainer,
                  ),
                ),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      'Account holder',
                      style: textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      'placeholder@example.com',
                      style: textTheme.bodyMedium?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Card(
          child: Column(
            children: <Widget>[
              for (final tile in _tiles)
                ListTile(
                  leading: Icon(tile.icon),
                  title: Text(tile.title),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {},
                ),
            ],
          ),
        ),
      ],
    );
  }
}
