import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import Desk from "./components/desk/desk";

export default function MapaSala(){
    const router = useRouter();
    const { classRoomNumber } = useLocalSearchParams();
    const [selectedDesk, setSelectedDesk] = useState();

    return(
        <View style={styles.container}>
            <Text>Sala N°{classRoomNumber}</Text>

            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.classroomMap}>
                <View style={styles.column}>
                    {[1, 2, 3, 4].map(row => (
                        <View key={`col1-row${row}`} style={styles.row}>
                            {[1, 2, 3, 4].map(col => (
                                <Desk key={`col1-${row}-${col}`} deskId={`A${row}${col}`} selectedDesk={selectedDesk} setSelectedDesk={setSelectedDesk}/>
                            ))}
                        </View>
                    ))}
                </View>
                <View style={styles.column}>
                    {[1, 2, 3, 4].map(row => (
                        <View key={`col2-row${row}`} style={styles.row}>
                            {[1, 2, 3].map(col => (
                                <Desk key={`col2-${row}-${col}`} deskId={`B${row}${col}`} selectedDesk={selectedDesk} setSelectedDesk={setSelectedDesk}/>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
            </ScrollView>

            <TouchableOpacity style={styles.reserveButton} onPress={()=> router.push({
                pathname: '/', // Adicionar rota da tela de sala apra tela de informações do aluno
                params: {classRoomNumber, selectedDesk}
            })}>
                <Text style={styles.reserveText}>Reservar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flex: 1,
        marginBottom: 12,
    },
    classroomMap: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    column: {
        gap: 6,
    },
    row: {
        flexDirection: 'row',
        gap: 6,
    },
    reserveButton: {
        backgroundColor: '#E83D84',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reserveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});