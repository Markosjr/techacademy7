import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type Option<T extends string> = { value: T; label: string };
type Props<T extends string> = { label: string; options: Option<T>[]; value: T; onChange(value: T): void; disabled?: boolean };

export function ChoiceChips<T extends string>({ label, options, value, onChange, disabled }: Props<T>) {
  return <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.options}>{options.map((option) => {
      const selected = option.value === value;
      return <Pressable key={option.value} accessibilityRole="radio" accessibilityState={{ checked: selected, disabled }}
        accessibilityLabel={`${label}: ${option.label}`} disabled={disabled} onPress={() => onChange(option.value)}
        style={[styles.chip, selected && styles.selected, disabled && styles.disabled]}>
        <Text style={[styles.text, selected && styles.selectedText]}>{option.label}</Text>
      </Pressable>;
    })}</View>
  </View>;
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm }, label: { color: colors.text, fontSize: typography.label.fontSize, fontWeight: '600' },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  selected: { borderColor: colors.primary, backgroundColor: colors.primary }, selectedText: { color: colors.onPrimary },
  disabled: { opacity: 0.6 }, text: { color: colors.text, fontSize: typography.caption.fontSize },
});
