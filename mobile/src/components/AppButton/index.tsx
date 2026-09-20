import { ActivityIndicator, Pressable, Text } from 'react-native';

import { colors } from '@/theme';

import { styles } from './styles';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

export function AppButton({ title, onPress, disabled = false, loading = false, variant = 'primary' }: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}>
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.primary : colors.onPrimary} />
      ) : (
        <Text style={[styles.title, variant === 'secondary' && styles.secondaryTitle]}>{title}</Text>
      )}
    </Pressable>
  );
}
