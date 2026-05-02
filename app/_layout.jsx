import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Essa função roda apenas UMA vez quando o app inicia
    const checkLogin = async () => {
      try {
        const session = await AsyncStorage.getItem('@user_session');
        
        if (session) {
          // Se achou a sessão persistida, manda direto pro mapa (index)
          router.replace('/');
        } else {
          // Se não achou, manda pro login
          router.replace('/login');
        }
      } catch (error) {
        console.error("Erro ao checar sessão:", error);
      } finally {
        setIsReady(true); // Tira a tela de carregamento
      }
    };

    checkLogin();
  }, []); // A array vazia [] garante que ele só verifique ao abrir o app

  // Tela de loading enquanto o AsyncStorage pensa
  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0B0B0F', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E83D84" />
      </View>
    );
  }

  // Carrega as telas sem o cabeçalho padrão
  return <Stack screenOptions={{ headerShown: false }} />;
}