import { SafeAreaView, StyleSheet, View } from "react-native"

import Logo from "../../../assets/logo.png"
import { Image } from "expo-image"
import { useEffect, useState } from "react"

export default function Loader() {
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        const rotationInterval = setInterval(() => {
            setRotation(rotation => (rotation + 5) % 360)
        }, 10)
        rotationInterval
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <View style={styles.container}>
                <View style={[styles.loader, { transform: [{ rotate: `${rotation}deg` }] }]}></View>
                <View style={styles.containerImage}>
                    <Image style={styles.image} source={Logo} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#52B032",
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        height: 300,
        width: 300,
        borderWidth: 5,
        borderRadius: 300,
        borderRightColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        borderTopColor: '#F35900',
        position: 'absolute'
    },
    containerImage: {
        width: 280, 
        height: 280,
        borderRadius: 290,
        backgroundColor: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        position: 'absolute',
        height: 75,
        width: 200,
        top: 90
    },
})