import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useAuth } from '@/contexts/AuthContext';
import { colors, spacing, typography } from '@/theme';
import { getApiErrorMessage } from '@/utils/api-error';

export default function LoginScreen() {
  const { registered } = useLocalSearchParams<{ registered?: string }>();
  const { signIn } = useAuth(); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function submit() {
    if (!email.trim() || !password) { setError('Informe e-mail e senha.'); return; }
    setLoading(true); setError('');
    try { await signIn({ email: email.trim(), password }); } catch (e) { setError(getApiErrorMessage(e, 'Não foi possível entrar.')); } finally { setLoading(false); }
  }
  return <ScreenContainer><View style={styles.content}><View><Text style={styles.title}>FixFlow</Text><Text style={styles.subtitle}>Entre para acompanhar solicitações de manutenção.</Text></View>
    <View style={styles.form}><AppInput label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" />
      <AppInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry autoComplete="current-password" onSubmitEditing={() => void submit()} />
      {registered === '1' && !error && <Text accessibilityRole="alert" style={styles.success}>Conta criada. Entre com seu e-mail e senha.</Text>}
      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}<AppButton title="Entrar" onPress={() => void submit()} loading={loading} />
      <Link href="/(auth)/register" asChild><AppButton title="Criar conta" onPress={() => undefined} variant="secondary" /></Link></View></View></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { flex: 1, justifyContent: 'center', gap: spacing.xl }, title: { color: colors.primary, fontSize: typography.title.fontSize, fontWeight: '700' }, subtitle: { color: colors.textSecondary, fontSize: typography.body.fontSize, marginTop: spacing.sm }, form: { gap: spacing.md }, error: { color: colors.danger }, success: { color: colors.success } });
