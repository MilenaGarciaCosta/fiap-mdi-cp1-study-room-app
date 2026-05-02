import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const router = useRouter();

  const handleRegister = async () => {
    setFeedback({ message: '', type: '' }); // Limpa o erro anterior
    const { name, email, password, confirm } = form;
    const emailRegex = /\S+@\S+\.\S+/;

    // Validações rigorosas com feedback na tela
    if (!name || !email) {
      return setFeedback({ message: "Preencha nome e e-mail.", type: 'error' });
    }
    if (!emailRegex.test(email)) {
      return setFeedback({ message: "Formato de e-mail inválido.", type: 'error' });
    }
    if (password.length < 6) {
      return setFeedback({ message: "A senha deve ter no mínimo 6 caracteres.", type: 'error' });
    }
    if (password !== confirm) {
      return setFeedback({ message: "As senhas não são idênticas.", type: 'error' });
    }

    try {
      // Salva os dados no AsyncStorage usando o e-mail como chave
      const userKey = `@user_${email.toLowerCase()}`;
      const userData = JSON.stringify({ name, email: email.toLowerCase(), password });
      
      await AsyncStorage.setItem(userKey, userData);
      
      // Feedback de sucesso
      setFeedback({ message: "Cadastro realizado com sucesso! Redirecionando...", type: 'success' });
      
      // Aguarda 1.5 segundos para o usuário ler a mensagem e envia para o login
      setTimeout(() => {
        router.replace('/login');
      }, 1500);

    } catch (e) {
      setFeedback({ message: "Falha técnica ao salvar os dados.", type: 'error' });
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>CADASTRO</Text>
        </View>

        <View style={styles.contentWrapper}>
          {/* Caixa de Mensagem de Erro/Sucesso */}
          {feedback.message !== '' && (
            <Text style={[styles.feedbackText, feedback.type === 'error' ? styles.errorText : styles.successText]}>
              {feedback.message}
            </Text>
          )}

          <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor="#aaa" onChangeText={t => setForm({...form, name: t})} />
          <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#aaa" autoCapitalize="none" keyboardType="email-address" onChangeText={t => setForm({...form, email: t})} />
          <TextInput style={styles.input} placeholder="Senha (mínimo 6 caracteres)" placeholderTextColor="#aaa" secureTextEntry onChangeText={t => setForm({...form, password: t})} />
          <TextInput style={styles.input} placeholder="Confirmação de senha" placeholderTextColor="#aaa" secureTextEntry onChangeText={t => setForm({...form, confirm: t})} />
          
          <TouchableOpacity style={styles.buttonMain} onPress={handleRegister}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#0B0B0F' },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 60 },
  header: { marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  contentWrapper: { width: '100%' },
  input: { width: '100%', height: 55, backgroundColor: '#1A1A22', borderRadius: 8, paddingHorizontal: 16, color: '#fff', marginBottom: 15, borderWidth: 1, borderColor: '#2A2A35' },
  buttonMain: { width: '100%', height: 55, backgroundColor: '#E83D84', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#E83D84', textAlign: 'center', marginTop: 25, fontSize: 16 },
  feedbackText: { textAlign: 'center', marginBottom: 15, fontSize: 14, fontWeight: 'bold', padding: 10, borderRadius: 8 },
  errorText: { color: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.1)' },
  successText: { color: '#00C851', backgroundColor: 'rgba(0, 200, 81, 0.1)' }
});