import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Badge } from '@/components/Badge';
import { colors, spacing, typography } from '@/theme';
import type { RequestListItem } from '@/types/domain';
import { formatDateTime } from '@/utils/format-date';
import { priorityLabels, statusLabels } from '@/utils/labels';

export function RequestCard({ request, onPress }: { request: RequestListItem; onPress(): void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`Abrir solicitação ${request.title}`} onPress={onPress}
    style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
    <Text style={styles.title}>{request.title}</Text>
    {request.createdBy && <Text style={styles.secondary}>Solicitante: {request.createdBy.name}</Text>}
    <Text style={styles.secondary}>{request.category.name} · {formatDateTime(request.createdAt)}</Text>
    <View style={styles.badges}><Badge label={statusLabels[request.status]} tone={request.status === 'CONCLUIDA' ? 'success' : request.status === 'CANCELADA' ? 'danger' : 'default'} /><Badge label={priorityLabels[request.priority]} /></View>
  </Pressable>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.md, padding: spacing.md, gap: spacing.sm },
  pressed: { opacity: 0.75 }, title: { color: colors.text, fontSize: 18, fontWeight: '700' },
  secondary: { color: colors.textSecondary, fontSize: typography.caption.fontSize }, badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
