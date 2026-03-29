import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
    <View style={styles.container}>
      <View>
        <Text>Confirmar Reserva</Text>
        <View style={styles.infos}>
          <Text>Sala: {classRoomNumber} | Carteira: {selectedDesk}</Text>
        </View>
      </View>

      <View>
        <View>
          <Text>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do aluno"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text>RM</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o RM"
            value={rm}
            onChangeText={setRm}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text>Horário de Entrada</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 08:00"
            value={entryTime}
            onChangeText={setEntryTime}
          />
        </View>

        <View>
          <Text>Horário de Saída</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 12:00"
            value={exitTime}
            onChangeText={setExitTime}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          isFormIncomplete 
            ? styles.submitButtonDisabled 
            : styles.submitButtonAbled
        ]}
        disabled={isFormIncomplete}
        onPress={handleFinalizeReservation}
      >
        <Text style={styles.submitText}>Finalizar Reserva</Text>
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  infos: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submitButtonAbled: {
    backgroundColor: "#E83D84",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: "#573e48",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});