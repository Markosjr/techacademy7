import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton'; import { AppInput } from '@/components/AppInput'; import { ChoiceChips } from '@/components/ChoiceChips';
import { RequestImagePicker, type SelectedRequestImage } from '@/components/RequestImagePicker';
import { listCategories } from '@/services/category.service'; import { colors, spacing } from '@/theme'; import type { Category, Priority, RequestPayload } from '@/types/domain'; import { getApiErrorMessage } from '@/utils/api-error'; import { priorities, priorityLabels } from '@/utils/labels';

type Props={initial?:RequestPayload;submitLabel:string;onSubmit(input:RequestPayload):Promise<void>;image?:SelectedRequestImage|null;onImageChange?(image:SelectedRequestImage|null):void};
export function RequestForm({initial,submitLabel,onSubmit,image,onImageChange}:Props){
 const [title,setTitle]=useState(initial?.title??''); const [description,setDescription]=useState(initial?.description??''); const [priority,setPriority]=useState<Priority>(initial?.priority??'MEDIA'); const [categoryId,setCategoryId]=useState(initial?.categoryId??''); const [categories,setCategories]=useState<Category[]>([]); const [loading,setLoading]=useState(false); const [loadingCategories,setLoadingCategories]=useState(true); const [error,setError]=useState('');
 useEffect(()=>{void listCategories().then(items=>{setCategories(items);if(!categoryId&&items[0])setCategoryId(items[0].id);}).catch(e=>setError(getApiErrorMessage(e,'Não foi possível carregar as categorias.'))).finally(()=>setLoadingCategories(false));},[categoryId]);
 async function submit(){if(title.trim().length<3){setError('O título deve possuir pelo menos 3 caracteres.');return;}if(description.trim().length<10){setError('A descrição deve possuir pelo menos 10 caracteres.');return;}if(!categoryId){setError('Selecione uma categoria.');return;}setLoading(true);setError('');try{await onSubmit({title:title.trim(),description:description.trim(),priority,categoryId});}catch(e){setError(getApiErrorMessage(e));}finally{setLoading(false);}}
 return <View style={styles.form}><AppInput label="Título" value={title} onChangeText={setTitle} maxLength={120}/><AppInput label="Descrição" value={description} onChangeText={setDescription} multiline numberOfLines={5} maxLength={2000} style={styles.description}/>
  <ChoiceChips<Priority> label="Prioridade" value={priority} onChange={setPriority} options={priorities.map(value=>({value,label:priorityLabels[value]}))}/>
  {loadingCategories?<Text style={styles.help}>Carregando categorias...</Text>:<ChoiceChips label="Categoria" value={categoryId} onChange={setCategoryId} options={categories.map(item=>({value:item.id,label:item.name}))}/>}
  {onImageChange&&<RequestImagePicker value={image??null} onChange={onImageChange} disabled={loading}/>}{!!error&&<Text accessibilityRole="alert" style={styles.error}>{error}</Text>}<AppButton title={submitLabel} onPress={()=>void submit()} loading={loading} disabled={loadingCategories}/></View>;
}
const styles=StyleSheet.create({form:{gap:spacing.md},description:{minHeight:120,textAlignVertical:'top'},help:{color:colors.textSecondary},error:{color:colors.danger}});
