import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Desk({ deskId, selectedDesk, setSelectedDesk }) {
  const toggleDesk = (deskId) => {
    setSelectedDesk(deskId);
  };
  return (
    <TouchableOpacity
      style={[
        styles.desk,
        selectedDesk === deskId ? styles.deskSelected : styles.deskDefault,
      ]}
      onPress={() => toggleDesk(deskId)}
    >
      <Text style={styles.deskText}>{deskId}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    desk: {
        width: 40,
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#999',
    },
    deskDefault: {
        backgroundColor: '#b0b0b0',
    },
    deskSelected: {
        backgroundColor: '#4caf50',
    },
    deskText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#fff',
    }
})