import 'package:flutter/material.dart';

/// Dashboard widget #3 — a placeholder chart summarising monthly spending.
///
/// The bars use static sample values; a real charting integration comes later.
class SpendingOverview extends StatelessWidget {
  const SpendingOverview({super.key, this.onTap});

  final VoidCallback? onTap;

  static const List<({String label, double value})> _bars =
      <({String label, double value})>[
        (label: 'Mon', value: 0.4),
        (label: 'Tue', value: 0.7),
        (label: 'Wed', value: 0.3),
        (label: 'Thu', value: 0.9),
        (label: 'Fri', value: 0.5),
        (label: 'Sat', value: 0.65),
        (label: 'Sun', value: 0.2),
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
              Text(
                'Spending overview',
                style: textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'This week',
                style: textTheme.bodySmall?.copyWith(
                  color: colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                height: 120,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: <Widget>[
                    for (final bar in _bars)
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: <Widget>[
                            Container(
                              margin: const EdgeInsets.symmetric(horizontal: 4),
                              height: 100 * bar.value,
                              decoration: BoxDecoration(
                                color: colorScheme.primary,
                                borderRadius: BorderRadius.circular(6),
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(bar.label, style: textTheme.labelSmall),
                          ],
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
