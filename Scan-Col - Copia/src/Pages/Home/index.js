import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
export default function Home({ navigation }) {


    const startScanning = () => {
        navigation.navigate('Buscar')
    };

    return (
        <View style={styles.container}>




            <TouchableOpacity onPress={startScanning} style={styles.btnScan} >
                <Text style={styles.textScan}>Iniciar escaneamento</Text>
                <Image style={styles.imgScan} source={require('../../../assets/logo-folha.png')} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnScan: {
        position: "absolute",
        bottom: 25,
        height: "8%",
        width: "66%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    textScan: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 1
    },
    imgScan: {
        height: 18,
        width: 30
    }
});
