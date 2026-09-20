import { Stack } from 'expo-router';
import { colors } from '@/theme';
export default function AppLayout(){return <Stack screenOptions={{headerStyle:{backgroundColor:colors.surface},headerTintColor:colors.text,headerBackTitle:'Voltar'}}><Stack.Screen name="index" options={{headerShown:false}}/><Stack.Screen name="requests/index" options={{title:'Solicitações'}}/><Stack.Screen name="requests/new" options={{title:'Nova solicitação'}}/><Stack.Screen name="requests/[id]" options={{title:'Detalhes'}}/><Stack.Screen name="requests/[id]/edit" options={{title:'Editar solicitação'}}/></Stack>}
