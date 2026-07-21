import 'package:flutter/material.dart';

import '../widgets/section_header.dart';
import '../widgets/placeholder_card.dart';

/// Cards section — placeholder for managing bank cards.
class CardsSection extends StatelessWidget {
  const CardsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: const <Widget>[
        SectionHeader(
          title: 'Cards',
          subtitle: 'Manage your debit and credit cards',
        ),
        SizedBox(height: 20),
        PlaceholderCard(
          icon: Icons.credit_card,
          title: 'Your cards',
          description: 'Card management will appear here.',
          height: 180,
        ),
        SizedBox(height: 16),
        PlaceholderCard(
          icon: Icons.add_card,
          title: 'Add a new card',
          description: 'Ordering a new card will be available soon.',
          height: 160,
        ),
      ],
    );
  }
}
