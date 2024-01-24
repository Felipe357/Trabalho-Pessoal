import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  View,
  ScrollView,
} from "react-native";

export default function LoginComponents() {

  const navigation = useNavigation();

  const goLoader = () => {
    navigation.navigate('Loader')

    setTimeout(() => {
      navigation.navigate('HomeComponents')
    }, 1000)
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.containerLogin}>
          <TextInput
            style={styles.loginInput}
            placeholder="Usuário"
            placeholderTextColor={'#000'}
          />
          <TextInput
            style={styles.loginInput}
            placeholder="Senha"
            placeholderTextColor={'#000'}
          />
          <TouchableOpacity style={styles.loginButton} onPress={goLoader}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                fontWeight: '700',
                letterSpacing: 1.5,
              }}
            >
              Acessar
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLogin: {
    backgroundColor: '#FFF',
    height: 350,
    width: 300,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 200
  },
  loginInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    width: '65%',
    height: 40,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#52B032',
    height: 50,
    width: 200,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
