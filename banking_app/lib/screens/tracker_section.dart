import 'package:flutter/material.dart';

import '../widgets/section_header.dart';
import '../widgets/placeholder_card.dart';

/// Tracker section — placeholder for spending/goal tracking.
class TrackerSection extends StatelessWidget {
  const TrackerSection({super.key});

  static const List<({IconData icon, String label, double progress})>
  _categories = <({IconData icon, String label, double progress})>[
    (icon: Icons.restaurant_outlined, label: 'Food & drink', progress: 0.0),
    (icon: Icons.directions_car_outlined, label: 'Transport', progress: 0.0),
    (icon: Icons.shopping_bag_outlined, label: 'Shopping', progress: 0.0),
    (icon: Icons.bolt_outlined, label: 'Utilities', progress: 0.0),
  ];

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return ListView(
      padding: const EdgeInsets.all(20),
      children: <Widget>[
        const SectionHeader(
          title: 'Tracker',
          subtitle: 'Track your spending, budgets and goals',
        ),
        const SizedBox(height: 20),
        const PlaceholderCard(
          icon: Icons.savings_outlined,
          title: 'Monthly budget',
          description: 'Budget tracking will appear here.',
          height: 150,
        ),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  'Spending by category',
                  style: textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 16),
                for (final category in _categories)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Row(
                      children: <Widget>[
                        CircleAvatar(
                          backgroundColor: colorScheme.surfaceContainerHighest,
                          child: Icon(
                            category.icon,
                            color: colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(category.label, style: textTheme.bodyLarge),
                              const SizedBox(height: 6),
                              ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: LinearProgressIndicator(
                                  value: category.progress,
                                  minHeight: 6,
                                  backgroundColor:
                                      colorScheme.surfaceContainerHighest,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 12),
                        Text('\$0.00', style: textTheme.bodyMedium),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
