import { StyleSheet, View } from "react-native";
import React from "react";
import ButtonPage from "../../components/buttonPage";

export default function Vendas({ navigation }) {
    const buttonTitles = ['Pedido', 'Carrinho']

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <ButtonPage titulo={buttonTitles[0] as never} />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonPage titulo={buttonTitles[1] as never} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'center',
        paddingTop: 50,
        gap: 40
    },
    buttonContainer: {
        height: 130,
        width: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})