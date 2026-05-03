import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    setFeedback('');

    if (!email || !password) {
      return setFeedback("Preencha e-mail e senha.");
    }

    try {
      const userKey = `@user_${email.toLowerCase()}`;
      const storedUser = await AsyncStorage.getItem(userKey);
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        if (userData.password === password) {
          await login(userData); 
        } else {
          setFeedback("Senha incorreta.");
        }
      } else {
        setFeedback("Usuário não cadastrado.");
      }
    } catch (e) {
      setFeedback("Falha na autenticação.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LOGIN</Text>
        </View>

        <View style={styles.contentWrapper}>
          {feedback !== '' && (
            <Text style={styles.errorText}>{feedback}</Text>
          )}

          <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#aaa" autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#aaa" secureTextEntry onChangeText={setPassword} />
          
          <TouchableOpacity style={styles.buttonMain} onPress={handleLogin}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.linkText}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#0B0B0F' },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 100 },
  header: { marginBottom: 50 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', letterSpacing: 4 },
  contentWrapper: { width: '100%' },
  input: { width: '100%', height: 55, backgroundColor: '#1A1A22', borderRadius: 8, paddingHorizontal: 16, color: '#fff', marginBottom: 20, borderWidth: 1, borderColor: '#2A2A35' },
  buttonMain: { width: '100%', height: 55, backgroundColor: '#E83D84', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 2 },
  linkText: { color: '#E83D84', textAlign: 'center', marginTop: 25, fontSize: 16 },
  errorText: { color: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.1)', textAlign: 'center', marginBottom: 15, fontSize: 14, fontWeight: 'bold', padding: 10, borderRadius: 8 }
});