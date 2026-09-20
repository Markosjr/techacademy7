import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  danger: { backgroundColor: colors.danger },
  pressed: {
    opacity: 0.85,
  },
  title: {
    color: colors.onPrimary,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
  },
  secondaryTitle: { color: colors.primary },
});
