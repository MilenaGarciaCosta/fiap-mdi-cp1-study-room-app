import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SuccessModal({ 
  visible, 
  onClose, 
  name, 
  rm, 
  entryTime, 
  exitTime, 
  classRoomNumber, 
  selectedDesk 
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sucesso!</Text>
          
          <View style={styles.modalBody}>
            <Text>Reserva confirmada.</Text>
            <Text>Aluno: {name}</Text>
            <Text>RM: {rm}</Text>
            <Text>Horário: {entryTime} às {exitTime}</Text>
            <Text>Sala: {classRoomNumber}</Text>
            <Text>Carteira: {selectedDesk}</Text>
          </View>

          <TouchableOpacity
            style={styles.submitButtonAbled}
            onPress={onClose}
          >
            <Text style={styles.submitText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalBody: {
    marginBottom: 20,
    gap: 5,
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
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});