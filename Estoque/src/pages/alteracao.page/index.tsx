import { Button, View } from "react-native";

export default function Alteracao({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onPress={() => navigation.navigate('Menu Inícial')}
            title="Alteração"
          />
        </View>
      );
}