import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoginComponents from "../../components/login";

import { Image } from 'expo-image';

import Logo from '../../../assets/logo.png'

export default function Login() {
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={Logo}
            contentFit="contain"
            transition={1000}
          />
          <Text style={styles.subTitilo}>Plantamos uma vida melhor!</Text>
        </View>
        <View style={styles.green}></View>
        <LoginComponents />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 120,
    width: 220
  },
  subTitilo: {
    color: '#52B032',
    fontWeight: '600'
  },
  containerImage: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    position: 'absolute',
    top: 0
  },
  green: {
    backgroundColor: '#52B032',
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
});
