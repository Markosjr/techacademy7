import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { colors, spacing } from '@/theme';

export type SelectedRequestImage = {
  uri: string;
  fileName: string;
  mimeType: string;
  fileSize?: number;
};

type Props = { value: SelectedRequestImage | null; onChange(value: SelectedRequestImage | null): void; disabled?: boolean };
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 5 * 1024 * 1024;

export function RequestImagePicker({ value, onChange, disabled }: Props) {
  const [error, setError] = useState('');

  async function chooseImage() {
    setError('');
    if (Platform.OS !== 'web') {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setError('Permita o acesso às fotos para selecionar uma imagem.');
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
    if (result.canceled) return;
    const asset = result.assets[0];
    const fileName = asset.fileName ?? `imagem.${asset.mimeType === 'image/png' ? 'png' : asset.mimeType === 'image/webp' ? 'webp' : 'jpg'}`;
    const mimeType = asset.mimeType ?? '';
    if (!allowedMimeTypes.includes(mimeType)) {
      setError('Selecione uma imagem JPEG, JPG, PNG ou WEBP.');
      return;
    }
    if (asset.fileSize && asset.fileSize > maxSize) {
      setError('A imagem deve possuir no máximo 5 MB.');
      return;
    }
    onChange({ uri: asset.uri, fileName, mimeType, fileSize: asset.fileSize });
  }

  return <View style={styles.container}>
    <Text style={styles.label}>Imagem (opcional)</Text>
    {value ? <>
      <Image source={{ uri: value.uri }} style={styles.preview} resizeMode="cover" />
      <Text style={styles.fileName}>{value.fileName}</Text>
      <AppButton title="Remover imagem" variant="secondary" disabled={disabled} onPress={() => onChange(null)} />
    </> : <AppButton title="Selecionar imagem" variant="secondary" disabled={disabled} onPress={() => void chooseImage()} />}
    {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
  </View>;
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  label: { color: colors.text, fontWeight: '700' },
  preview: { width: '100%', height: 220, borderRadius: spacing.md, backgroundColor: colors.border },
  fileName: { color: colors.textSecondary },
  error: { color: colors.danger },
});
