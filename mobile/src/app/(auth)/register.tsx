import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton'; import { AppInput } from '@/components/AppInput'; import { ScreenContainer } from '@/components/ScreenContainer';
import { useAuth } from '@/contexts/AuthContext'; import { colors, spacing, typography } from '@/theme'; import { getApiErrorMessage } from '@/utils/api-error';

export default function RegisterScreen() {
  const { signUp } = useAuth(); const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [confirm,setConfirm]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  async function submit(){
    if(name.trim().length<2){setError('Informe um nome com pelo menos 2 caracteres.');return;} if(!/^\S+@\S+\.\S+$/.test(email.trim())){setError('Informe um e-mail válido.');return;} if(password.length<8){setError('A senha deve possuir pelo menos 8 caracteres.');return;} if(password!==confirm){setError('As senhas não conferem.');return;}
    setLoading(true);setError('');try{await signUp({name:name.trim(),email:email.trim(),password}); router.replace({pathname:'/(auth)/login',params:{registered:'1'}});}catch(e){setError(getApiErrorMessage(e,'Não foi possível criar a conta.'));}finally{setLoading(false);}
  }
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><Text style={styles.title}>Criar conta</Text><View style={styles.form}>
    <AppInput label="Nome" value={name} onChangeText={setName} autoComplete="name"/><AppInput label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email"/>
    <AppInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry autoComplete="new-password"/><AppInput label="Confirmar senha" value={confirm} onChangeText={setConfirm} secureTextEntry/>
    {!!error&&<Text accessibilityRole="alert" style={styles.error}>{error}</Text>}<AppButton title="Cadastrar" onPress={()=>void submit()} loading={loading}/><AppButton title="Voltar ao login" onPress={()=>router.back()} variant="secondary"/></View></ScrollView></ScreenContainer>;
}
const styles=StyleSheet.create({content:{flexGrow:1,justifyContent:'center',gap:spacing.xl},title:{color:colors.text,fontSize:typography.title.fontSize,fontWeight:'700'},form:{gap:spacing.md},error:{color:colors.danger}});
