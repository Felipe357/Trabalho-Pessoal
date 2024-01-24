import React from 'react'
import { Button, View, TouchableWithoutFeedback, StyleSheet, Keyboard } from "react-native";
import InputComponent from '../../components/customs/inputControll';
import DateTimePickerComponent from '../../components/customs/dateTimeControll';
import NumericInputComponent from '../../components/customs/inputNumberControll';
import DropdownComponent from '../../components/customs/dropdownControll';

export default function Pedido({ navigation }) {
  const handlePressOutside = () => {
      Keyboard.dismiss(); 
  };
  
  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={styles.container}>
        <DropdownComponent />
        <DateTimePickerComponent />
        <NumericInputComponent placeholder="Quantidade" />
      </View>
    </TouchableWithoutFeedback>
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
  }
})
