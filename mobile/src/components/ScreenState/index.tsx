import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { colors, spacing, typography } from '@/theme';

export function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  return <View style={styles.container}><ActivityIndicator color={colors.primary} /><Text style={styles.text}>{message}</Text></View>;
}
export function MessageState({ message, retry }: { message: string; retry?: () => void }) {
  return <View style={styles.container}><Text style={styles.text}>{message}</Text>{retry && <AppButton title="Tentar novamente" onPress={retry} variant="secondary" />}</View>;
}
const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.lg }, text: { color: colors.textSecondary, fontSize: typography.body.fontSize, textAlign: 'center' } });
