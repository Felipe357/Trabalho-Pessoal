import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Home() {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    const [codigo, setCodigo] = useState("")


    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setIsScanning(false);
        setCodigo(data)
    };

    const startScanning = () => {
        setScanned(false);
        setIsScanning(true);
    };

    const stopScanning = () => {
        setIsScanning(false);
    };

    if (hasPermission === null) {
        return <Text>Solicitando permissão da câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso a câmera</Text>;
    }

    return (
        <View style={styles.container}>
            {isScanning ? (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            ) : (

                <View style={styles.card}>
                    <View style={styles.pessoa}>
                        <Text style={styles.nome}>Colaborador</Text>
                        <Text style={styles.nome}>{codigo}</Text>
                    </View>
                    <View style={styles.pessoa}>
                        <Text style={styles.nome}>Conjuge</Text>
                    </View>
                    <View style={styles.pessoa}>
                        <Text style={styles.nome}>Dependente</Text>
                    </View>
                    <View style={styles.pessoa}>
                        <Text style={styles.nome}>Dependente</Text>
                    </View>
                </View>

            )}

            {isScanning ? (
                <TouchableOpacity onPress={stopScanning} style={styles.btnScan} >
                    <Text style={styles.textScan}>Parar escaneamento</Text>
                    <Image style={styles.imgScan} source={require('../../../assets/logo-folha.png')} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={startScanning} style={styles.btnScan} >
                    <Text style={styles.textScan}>Iniciar escaneamento</Text>
                    <Image style={styles.imgScan} source={require('../../../assets/logo-folha.png')} />
                </TouchableOpacity>
            )}


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
      },
      card: {
        height: "60%",
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: 20
      },
      pessoa: {
        height: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
      },
      nome: {
        fontSize: 16,
      }
});