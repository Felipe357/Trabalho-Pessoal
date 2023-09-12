import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Buscar({ navigation }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false)
    const [isScanned, setIsScanned] = useState(true)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setIsScanned(false)
        setScanned(true)
        goValidar(data)
    };

    const stopScanning = () => {
        navigation.navigate('Home')
    };

    if (hasPermission === null) {
        return <Text>Solicitando permissão da câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso a câmera</Text>;
    }

    const goValidar = (e) => {
        navigation.navigate('Validar', {codigo:e})
    }

    return (
        <View style={styles.container}>

            {
                isScanned ? (
                    <BarCodeScanner
                        onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                ) : (
                    <></>
                )
            }

            <TouchableOpacity onPress={stopScanning} style={styles.btnScan} >
                <Text style={styles.textScan}>Parar escaneamento</Text>
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