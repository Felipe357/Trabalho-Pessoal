import { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import cookieImg from '../../assets/cookie.png';

export default function Login({ navigation }) {

    return (
        <View style={style.main}>
            <View style={style.container}>
                <Image style={style.cookie} source={cookieImg} />
                <View style={style.viewInputs}>
                    <TextInput placeholderTextColor={"#FFFFFF80"} style={style.inputs} placeholder="Celular" />
                    <TextInput placeholderTextColor={"#FFFFFF80"} style={style.inputs} placeholder="Senha" />
                    <TouchableOpacity style={style.botao}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7613'
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        height: '45%',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px'
    },
    cookie: {
        width: '100px',
        height: '100px',
        marginBottom: '15px'
    },
    viewInputs: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '35%'
    },
    inputs: {
        width: '200px',
        height: '35px',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '10px',
        backgroundColor: '#FF7613'
    },
    botao: {
        width: '150px',
        height: '30px',
        marginTop: '15px',
        borderRadius: '10px',
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    }
})