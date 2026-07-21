import 'package:flutter/material.dart';

import '../widgets/section_header.dart';
import '../widgets/placeholder_card.dart';

/// Payments section — placeholder for transfers and payments.
class PaymentsSection extends StatelessWidget {
  const PaymentsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: const <Widget>[
        SectionHeader(title: 'Payments', subtitle: 'Send money and pay bills'),
        SizedBox(height: 20),
        PlaceholderCard(
          icon: Icons.swap_horiz,
          title: 'Transfers',
          description: 'Money transfers will be available here.',
          height: 160,
        ),
        SizedBox(height: 16),
        PlaceholderCard(
          icon: Icons.receipt_long,
          title: 'Bill payments',
          description: 'Bill payment functionality is coming soon.',
          height: 160,
        ),
      ],
    );
  }
}
