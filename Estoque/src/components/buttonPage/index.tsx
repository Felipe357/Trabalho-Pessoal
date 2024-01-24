import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

import Lançamento from '../../../assets/box.png'
import Alteração from '../../../assets/return-box.png'
import Inventario from '../../../assets/checklists.png'
import Default from '../../../assets/default.png'

export default function ButtonPage({ titulo }: { titulo: never }) {
    const navigation = useNavigation();

    const goVendas = () => {
        navigation.navigate(titulo)
    };

    const returnImage = (image: string) => {
        switch (image) {
            case "Lançamento Estoque":
                return Lançamento;
            case "Alteração Estoque":
                return Alteração;
            case "Inventário":
                return Inventario;
            default:
                return Default;
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={goVendas}>
                <Image style={styles.image} source={returnImage(titulo)} />
                <Text style={styles.text}>{titulo}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    button: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 1.5,
        color: '#000',
        textAlign: 'center',
    },
    image: {
        height: 60,
        width: 60
    }
})