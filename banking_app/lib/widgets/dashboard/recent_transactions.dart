import 'package:flutter/material.dart';

/// Dashboard widget #4 — a short list of recent transactions.
///
/// Uses placeholder entries until it is connected to a transactions service.
class RecentTransactions extends StatelessWidget {
  const RecentTransactions({super.key, this.onTap});

  final VoidCallback? onTap;

  static const List<
    ({IconData icon, String title, String subtitle, String amount})
  >
  _items = <({IconData icon, String title, String subtitle, String amount})>[
    (
      icon: Icons.local_cafe_outlined,
      title: 'Coffee shop',
      subtitle: 'Today',
      amount: '-\$0.00',
    ),
    (
      icon: Icons.shopping_bag_outlined,
      title: 'Groceries',
      subtitle: 'Yesterday',
      amount: '-\$0.00',
    ),
    (
      icon: Icons.attach_money,
      title: 'Salary',
      subtitle: 'This week',
      amount: '+\$0.00',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Card(
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    'Recent transactions',
                    style: textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  TextButton(onPressed: onTap, child: const Text('See all')),
                ],
              ),
              const SizedBox(height: 8),
              for (final item in _items)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  child: Row(
                    children: <Widget>[
                      CircleAvatar(
                        backgroundColor: colorScheme.surfaceContainerHighest,
                        child: Icon(item.icon, color: colorScheme.onSurface),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(item.title, style: textTheme.bodyLarge),
                            Text(
                              item.subtitle,
                              style: textTheme.bodySmall?.copyWith(
                                color: colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Text(
                        item.amount,
                        style: textTheme.bodyLarge?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
