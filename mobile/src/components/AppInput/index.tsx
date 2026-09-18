import { Text, TextInput, type TextInputProps, View } from 'react-native';

import { colors } from '@/theme';

import { styles } from './styles';

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function AppInput({ label, error, style, ...inputProps }: AppInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...inputProps}
        accessibilityLabel={inputProps.accessibilityLabel ?? label}
        placeholderTextColor={inputProps.placeholderTextColor ?? colors.textSecondary}
        style={[styles.input, error ? styles.inputError : undefined, style]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
