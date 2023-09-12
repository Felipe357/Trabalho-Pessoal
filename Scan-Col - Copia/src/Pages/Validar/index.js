import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import CustomCheckBox from '../../components/checkBox/index'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Validar({ navigation, route }) {

    const { codigo } = route.params;
    const [colaborador, setColaborador] = useState({ nome: '', id_filial: '', cracha: '', dependentes: [] });

    const carregarColaborador = () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Insomnia/2023.5.7' },
            body: JSON.stringify({
                "cracha": codigo
            })
        };

        fetch('http://192.168.1.195:3000/eventos/colaborador/buscar', options)
            .then(response => response.json())
            .then(data => {
                setColaborador(data.colaborador[0]);
            })
            .catch(error => {
                console.error('Erro ao carregar colaborador:', error);
            });
    }

    useEffect(() => {
        carregarColaborador();
    }, []);

    const home = () => {
        navigation.navigate('Home')
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>

                <View style={styles.colaborador}>
                    <Text style={[styles.nome, { fontWeight: 600, fontSize: 20, width: "100%", textAlign: "center" }]}>{colaborador.nome}</Text>
                    <View style={styles.infoCol} >
                        <Text style={[styles.nome, { fontWeight: 500, fontSize: 20, width: "100%", textAlign: "center" }]}>{colaborador.id_filial}</Text>
                        <Text style={[styles.nome, { fontWeight: 500, fontSize: 20, width: "100%", textAlign: "center" }]}>{colaborador.cracha}</Text>
                    </View>
                </View>

                <View style={styles.viewTitulo}>
                    <Text style={styles.titulo}>Acompanhante</Text>
                </View>

                <View style={styles.dependente}>
                    {colaborador.dependentes.find(d => d.cf === false) ? (
                        <>
                            <Text style={styles.nome}>{colaborador.dependentes.find(d => d.cf === false).nome}</Text>
                            <CustomCheckBox />
                        </>
                    ) : (
                        <>
                            <Text style={styles.nome}>Sem Acompanhante</Text>
                            <Text>----</Text>
                        </>
                    )}
                </View>

                <View style={styles.viewTitulo}>
                    <Text style={styles.titulo}>Dependentes</Text>
                </View>

                <ScrollView>

                    {
                        colaborador.dependentes.map((d) => {
                            if (d.cf == true) {
                                return (

                                    <View style={styles.dependente}>
                                        <Text style={styles.nome}>{d.nome}</Text>
                                        <CustomCheckBox />
                                    </View>

                                )
                            }

                        })
                    }


                </ScrollView>

            </View>

            <TouchableOpacity onPress={home} style={styles.btnScan} >
                <Text style={styles.textScan}>Salvar</Text>
                <Image style={styles.imgScan} source={require('../../../assets/logo-folha.png')} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20
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
        height: "85%",
        width: "90%",
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        gap: 20,
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    colaborador: {
        height: 80,
        width: "100%",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoCol: {
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    dependente: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10
    },
    nome: {
        fontSize: 16,
        width: "60%",
        flexWrap: "wrap"
    },
    viewTitulo: {
        height: 60,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "#919191",
        borderTopWidth: 2,
    },
    titulo: {
        fontSize: 20,
    }
});