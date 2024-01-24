import React from "react";
import { Button, View } from "react-native";

export default function Carrinho({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Menu Inícial')}
        title="Carrinho"
      />
    </View>
  );
}