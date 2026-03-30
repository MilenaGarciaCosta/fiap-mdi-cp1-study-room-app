import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SuccessModal from "./components/alert/alert";

export default function StudentInfoForm() {
  const router = useRouter();
  const { classRoomNumber, selectedDesk } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [rm, setRm] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isFormIncomplete = !name || !rm || !entryTime || !exitTime;

  const handleFinalizeReservation = () => {
    setIsModalVisible(true);
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
            style={styles.input}
            placeholder="Digite o nome do aluno"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>RM</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o RM"
            placeholderTextColor="#666"
            value={rm}
            onChangeText={setRm}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Entrada</Text>
            <TextInput
              style={styles.input}
              placeholder="08:00"
              placeholderTextColor="#666"
              value={entryTime}
              onChangeText={setEntryTime}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Saída</Text>
            <TextInput
              style={styles.input}
              placeholder="12:00"
              placeholderTextColor="#666"
              value={exitTime}
              onChangeText={setExitTime}
            />
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