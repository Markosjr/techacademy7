import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton'; import { Badge } from '@/components/Badge'; import { ChoiceChips } from '@/components/ChoiceChips'; import { LoadingState, MessageState } from '@/components/ScreenState'; import { ScreenContainer } from '@/components/ScreenContainer'; import { useAuth } from '@/contexts/AuthContext'; import { cancelRequest, changeRequestPriority, changeRequestStatus, getRequest } from '@/services/request.service'; import { colors, spacing, typography } from '@/theme'; import type { MaintenanceRequest, Priority } from '@/types/domain'; import { getApiErrorMessage } from '@/utils/api-error'; import { formatDateTime } from '@/utils/format-date'; import { nextAdminStatus, priorities, priorityLabels, statusLabels } from '@/utils/labels';
import { AppInput } from '@/components/AppInput';

export default function RequestDetailScreen(){
 const{id}=useLocalSearchParams<{id:string}>();const{user}=useAuth();const[item,setItem]=useState<MaintenanceRequest|null>(null);const[loading,setLoading]=useState(true);const[actionLoading,setActionLoading]=useState(false);const[error,setError]=useState('');const[note,setNote]=useState('');
 const load=useCallback(async()=>{setLoading(true);setError('');try{setItem(await getRequest(id));}catch(e){setError(getApiErrorMessage(e,'Não foi possível carregar a solicitação.'));}finally{setLoading(false);}},[id]);useFocusEffect(useCallback(()=>{void load();},[load]));
 async function run(action:()=>Promise<MaintenanceRequest>){setActionLoading(true);setError('');try{setItem(await action());}catch(e){setError(getApiErrorMessage(e));}finally{setActionLoading(false);}}
 if(loading)return <ScreenContainer><LoadingState/></ScreenContainer>;if(!item)return <ScreenContainer><MessageState message={error||'Solicitação não encontrada.'} retry={()=>void load()}/></ScreenContainer>;
 const canEdit=user?.role==='USER'&&item.status==='ABERTA';const canCancel=user?.role==='USER'&&(item.status==='ABERTA'||item.status==='EM_ANALISE');const next=user?.role==='ADMIN'?nextAdminStatus[item.status]:undefined;const terminal=item.status==='CONCLUIDA'||item.status==='CANCELADA';
 function confirmCancel(){
  const message='A solicitação permanecerá no histórico como cancelada.';
  if(Platform.OS==='web'){
   if(globalThis.confirm('Cancelar solicitação\n\n'+message)) void run(()=>cancelRequest(id));
   return;
  }
  Alert.alert('Cancelar solicitação',message,[{text:'Voltar',style:'cancel'},{text:'Cancelar solicitação',style:'destructive',onPress:()=>void run(()=>cancelRequest(id))}]);
 }
 return <ScreenContainer><ScrollView contentContainerStyle={styles.content}><View style={styles.section}><Text style={styles.title}>{item.title}</Text><View style={styles.badges}><Badge label={statusLabels[item.status]} tone={item.status==='CONCLUIDA'?'success':item.status==='CANCELADA'?'danger':'default'}/><Badge label={priorityLabels[item.priority]}/></View><Text style={styles.meta}>{item.category.name} · criada em {formatDateTime(item.createdAt)}</Text></View>
 <View style={styles.section}><Text style={styles.heading}>Descrição</Text><Text style={styles.body}>{item.description}</Text></View>{user?.role==='ADMIN'&&<View style={styles.section}><Text style={styles.heading}>Solicitante</Text><Text style={styles.body}>{item.createdBy.name}</Text><Text style={styles.meta}>{item.createdBy.email}</Text></View>}
 {!!error&&<Text accessibilityRole="alert" style={styles.error}>{error}</Text>}{canEdit&&<AppButton title="Editar" onPress={()=>router.push(`/requests/${id}/edit`)} variant="secondary"/>}{canCancel&&<AppButton title="Cancelar solicitação" onPress={confirmCancel} loading={actionLoading} variant="danger"/>}
 {user?.role==='ADMIN'&&!terminal&&<View style={styles.section}><Text style={styles.heading}>Prioridade administrativa</Text><ChoiceChips label="Prioridade" value={item.priority} disabled={actionLoading} onChange={(value:Priority)=>void run(()=>changeRequestPriority(id,value))} options={priorities.map(value=>({value,label:priorityLabels[value]}))}/></View>}
 {next&&<View style={styles.section}><Text style={styles.heading}>Próxima etapa</Text><Text style={styles.meta}>A observação é opcional.</Text><AppInput label="Observação da mudança" value={note} onChangeText={setNote} maxLength={500}/><AppButton title={next.label} loading={actionLoading} onPress={()=>void run(()=>changeRequestStatus(id,next.status,note.trim()||undefined))}/></View>}
 <View style={styles.section}><Text style={styles.heading}>Histórico</Text>{item.history.map(event=><View key={event.id} style={styles.history}><Text style={styles.historyTitle}>{statusLabels[event.newStatus]}</Text><Text style={styles.meta}>{formatDateTime(event.createdAt)} · {event.changedBy.name}</Text>{event.note&&<Text style={styles.body}>{event.note}</Text>}</View>)}</View></ScrollView></ScreenContainer>;
}

const styles=StyleSheet.create({content:{gap:spacing.lg,paddingBottom:spacing.xl},section:{backgroundColor:colors.surface,borderRadius:spacing.md,borderWidth:1,borderColor:colors.border,padding:spacing.md,gap:spacing.sm},title:{color:colors.text,fontSize:typography.title.fontSize,fontWeight:'700'},heading:{color:colors.text,fontSize:20,fontWeight:'700'},body:{color:colors.text,fontSize:typography.body.fontSize,lineHeight:24},meta:{color:colors.textSecondary,fontSize:typography.caption.fontSize},badges:{flexDirection:'row',gap:spacing.sm,flexWrap:'wrap'},error:{color:colors.danger},history:{borderLeftWidth:3,borderLeftColor:colors.primary,paddingLeft:spacing.md,gap:spacing.xs},historyTitle:{color:colors.text,fontWeight:'700'}});
