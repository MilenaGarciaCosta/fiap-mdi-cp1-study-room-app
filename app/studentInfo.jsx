import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import SuccessModal from "./components/alert/alert";
import { useAuth } from "../contexts/AuthContext";

const RM_STORAGE_KEY = "user_rm";

export default function StudentInfoForm() {
  const router = useRouter();
  const { classRoomNumber, selectedDesk } = useLocalSearchParams();

  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState("");
  const [rm, setRm] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");

  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Carrega o RM salvo de forma segura ao montar o componente
  useEffect(() => {
    const loadRm = async () => {
      try {
        const savedRm = await SecureStore.getItemAsync(RM_STORAGE_KEY);
        if (savedRm) {
          setRm(savedRm);
        }
      } catch (error) {
        console.error("Erro ao carregar RM:", error);
      }
    };
    loadRm();
  }, []);

  const isFormIncomplete = !name || !email || !rm || !entryTime || !exitTime;

  const validateForm = () => {
    let newErrors = {};

    // Validação de Nome
    const nameRegex = /^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/;
    if (!nameRegex.test(name.trim())) {
      newErrors.name = "Insira nome e sobrenome usando apenas letras.";
    }

    // Validação de E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = "Insira um e-mail válido.";
    }

    // Validação de RM
    const rmRegex = /^\d{6}$/;
    if (!rmRegex.test(rm.trim())) {
      newErrors.rm = "O RM deve conter exatamente 6 números.";
    }

    // Função auxiliar para converter "HH:MM" em minutos totais
    const parseTimeToMinutes = (timeStr) => {
      // Aceita formatos como "8:00", "08:00", "22:00"
      const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
      const match = timeStr.trim().match(timeRegex);
      
      if (!match) return null;

      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      return hours * 60 + minutes;
    };

    const entryMins = parseTimeToMinutes(entryTime);
    const exitMins = parseTimeToMinutes(exitTime);
    const minAllowedTime = 8 * 60; // 08:00 em minutos (480)
    const maxAllowedTime = 22 * 60; // 22:00 em minutos (1320)

    // Validar Entrada
    if (entryMins === null) {
      newErrors.entryTime = "Formato inválido.";
    } else if (entryMins < minAllowedTime || entryMins > maxAllowedTime) {
      newErrors.entryTime = "Apenas das 08:00 às 22:00.";
    }

    // Validar Saída
    if (exitMins === null) {
      newErrors.exitTime = "Formato inválido.";
    } else if (exitMins < minAllowedTime || exitMins > maxAllowedTime) {
      newErrors.exitTime = "Apenas das 08:00 às 22:00.";
    }

    // Validar Regra de 1 hora de diferença se ambos estiverem corretos
    if (entryMins !== null && exitMins !== null) {
      if (entryMins >= maxAllowedTime || exitMins <= minAllowedTime) {
         // Já tratado nas validações acima, evita conflitos visuais
      } else if (exitMins - entryMins < 60) {
        newErrors.exitTime = "Mínimo de 1h após a entrada.";
      }
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalizeReservation = async () => {
    try {
      // Salva o RM no cofre criptografado para reservas futuras
      await SecureStore.setItemAsync(RM_STORAGE_KEY, rm);
    } catch (error) {
      console.error("Erro ao salvar RM:", error);
    }
    if (validateForm()) {
      setIsModalVisible(true);
    }
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    router.replace("/");
  };

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Confirmar Reserva</Text>
        <Text style={styles.subtitle}>
          Preencha seus dados
        </Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Sala <Text style={styles.highlight}>{classRoomNumber}</Text>
        </Text>
        <Text style={styles.infoText}>
          Carteira <Text style={styles.highlight}>{selectedDesk}</Text>
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Digite o nome do aluno"
            placeholderTextColor="#666"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
            }}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Digite o e-mail"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
            }}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>RM</Text>
          <TextInput
            style={[styles.input, errors.rm && styles.inputError]}
            placeholder="Digite o RM (6 dígitos)"
            placeholderTextColor="#666"
            value={rm}
            onChangeText={(text) => {
              setRm(text);
              if (errors.rm) setErrors((prev) => ({ ...prev, rm: null }));
            }}
            keyboardType="numeric"
            maxLength={6}
          />
          {errors.rm && <Text style={styles.errorText}>{errors.rm}</Text>}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Entrada</Text>
            <TextInput
              style={[styles.input, errors.entryTime && styles.inputError]}
              placeholder="08:00"
              placeholderTextColor="#666"
              value={entryTime}
              onChangeText={(text) => {
                setEntryTime(text);
                if (errors.entryTime) setErrors((prev) => ({ ...prev, entryTime: null }));
              }}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Saída</Text>
            <TextInput
              style={[styles.input, errors.exitTime && styles.inputError]}
              placeholder="12:00"
              placeholderTextColor="#666"
              value={exitTime}
              onChangeText={(text) => {
                setExitTime(text);
                if (errors.exitTime) setErrors((prev) => ({ ...prev, exitTime: null }));
              }}
              keyboardType="numeric"
              maxLength={5}
            />
            {errors.exitTime && <Text style={styles.errorText}>{errors.exitTime}</Text>}
          </View>
        </View>

      </View>

      {/* Botão */}
      <TouchableOpacity
        style={[
          styles.button,
          isFormIncomplete && styles.buttonDisabled
        ]}
        disabled={isFormIncomplete}
        onPress={handleFinalizeReservation}
      >
        <Text style={styles.buttonText}>
          {isFormIncomplete
            ? "Preencha todos os campos"
            : "Finalizar Reserva"}
        </Text>
      </TouchableOpacity>

      <SuccessModal
        visible={isModalVisible}
        onClose={handleConfirm}
        name={name}
        rm={rm}
        email={email}
        entryTime={entryTime}
        exitTime={exitTime}
        classRoomNumber={classRoomNumber}
        selectedDesk={selectedDesk}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    padding: 20,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: "#1A1A22",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2A2A35",
  },

  infoText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },

  highlight: {
    color: "#E83D84",
    fontWeight: "bold",
  },

  form: {
    gap: 16,
  },

  inputGroup: {
    gap: 6,
  },

  label: {
    color: "#E83D84",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#1A1A22",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    fontSize: 16,
  },

  inputError: {
    borderColor: "#FF3333",
  },
  errorText: {
    color: "#FF3333",
    fontSize: 12,
    marginTop: -2,
    marginLeft: 4,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  button: {
    backgroundColor: "#E83D84",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#E83D84",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 40,
  },

  buttonDisabled: {
    backgroundColor: "#333",
    shadowOpacity: 0,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});