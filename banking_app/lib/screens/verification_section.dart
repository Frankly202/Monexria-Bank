import 'package:flutter/material.dart';

import '../widgets/section_header.dart';

/// Verification section — placeholder client identity verification (KYC) flow.
///
/// Steps and statuses are static placeholders; document upload and checks will
/// be implemented later.
class VerificationSection extends StatelessWidget {
  const VerificationSection({super.key});

  static const List<({IconData icon, String title, String subtitle})> _steps =
      <({IconData icon, String title, String subtitle})>[
        (
          icon: Icons.badge_outlined,
          title: 'Personal details',
          subtitle: 'Name, date of birth and address',
        ),
        (
          icon: Icons.credit_card_outlined,
          title: 'Upload ID document',
          subtitle: 'Passport, driver license or national ID',
        ),
        (
          icon: Icons.face_outlined,
          title: 'Selfie / liveness check',
          subtitle: 'Confirm you match your document',
        ),
        (
          icon: Icons.home_outlined,
          title: 'Proof of address',
          subtitle: 'Recent utility bill or bank statement',
        ),
      ];

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return ListView(
      padding: const EdgeInsets.all(20),
      children: <Widget>[
        const SectionHeader(
          title: 'Verification',
          subtitle: 'Verify your identity to unlock all features',
        ),
        const SizedBox(height: 20),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Icon(Icons.pending_outlined, color: colorScheme.primary),
                    const SizedBox(width: 8),
                    Text(
                      'Verification pending',
                      style: textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: const LinearProgressIndicator(
                    value: 0.0,
                    minHeight: 8,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '0 of ${_steps.length} steps completed',
                  style: textTheme.bodySmall?.copyWith(
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Card(
          child: Column(
            children: <Widget>[
              for (int i = 0; i < _steps.length; i++)
                ListTile(
                  leading: CircleAvatar(
                    backgroundColor: colorScheme.surfaceContainerHighest,
                    child: Icon(_steps[i].icon, color: colorScheme.onSurface),
                  ),
                  title: Text(_steps[i].title),
                  subtitle: Text(_steps[i].subtitle),
                  trailing: Chip(
                    label: const Text('Pending'),
                    visualDensity: VisualDensity.compact,
                    backgroundColor: colorScheme.secondaryContainer,
                    side: BorderSide.none,
                  ),
                  onTap: () {},
                ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        FilledButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.verified_user_outlined),
          label: const Padding(
            padding: EdgeInsets.symmetric(vertical: 12),
            child: Text('Start verification'),
          ),
        ),
      ],
    );
  }
}
