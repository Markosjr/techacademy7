import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing, typography } from '@/theme';

export default function HomeScreen() {
  const [exampleText, setExampleText] = useState('');

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.introduction}>
          <Text style={styles.title}>FixFlow</Text>
          <Text style={styles.description}>Gestão de solicitações de manutenção</Text>
          <Text style={styles.status}>Aplicação em desenvolvimento</Text>
        </View>

        <View style={styles.preview}>
          <AppInput
            label="Campo de demonstração"
            placeholder="Digite para experimentar"
            value={exampleText}
            onChangeText={setExampleText}
          />
          <AppButton
            title="Limpar campo"
            onPress={() => setExampleText('')}
            disabled={!exampleText}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  introduction: {
    gap: spacing.sm,
  },
  title: {
    color: colors.primary,
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
  },
  description: {
    color: colors.text,
    fontSize: typography.body.fontSize,
  },
  status: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
  },
  preview: {
    gap: spacing.lg,
  },
});
