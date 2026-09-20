import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export function Badge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'success' | 'danger' }) {
  return <View style={[styles.badge, tone === 'success' && styles.success, tone === 'danger' && styles.danger]}>
    <Text style={[styles.text, tone !== 'default' && styles.light]}>{label}</Text>
  </View>;
}
const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', backgroundColor: '#E4EBF2', borderRadius: 14, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  success: { backgroundColor: colors.success }, danger: { backgroundColor: colors.danger },
  text: { color: colors.text, fontSize: typography.caption.fontSize, fontWeight: '600' }, light: { color: colors.onPrimary },
});
