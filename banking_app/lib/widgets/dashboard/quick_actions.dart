import 'package:flutter/material.dart';

/// Dashboard widget #2 — a row of quick action buttons.
///
/// Buttons are placeholders and do not perform any action yet.
class QuickActions extends StatelessWidget {
  const QuickActions({super.key});

  static const List<({IconData icon, String label})> _actions =
      <({IconData icon, String label})>[
        (icon: Icons.north_east, label: 'Send'),
        (icon: Icons.south_west, label: 'Request'),
        (icon: Icons.add_card, label: 'Top up'),
        (icon: Icons.receipt_long, label: 'Pay bill'),
      ];

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: Text(
                'Quick actions',
                style: textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                for (final action in _actions)
                  Column(
                    children: <Widget>[
                      IconButton.filledTonal(
                        onPressed: () {},
                        icon: Icon(action.icon),
                        color: colorScheme.onSecondaryContainer,
                      ),
                      const SizedBox(height: 6),
                      Text(action.label, style: textTheme.labelMedium),
                    ],
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
