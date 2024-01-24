import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const DateTimePickerComponent: React.FC = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dataValue, setDataValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(isFocus || dataValue !== '' ? -12 : 15, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDataValue(format(date, "'Dia' dd/MM/yyyy 'às' HH:mm", { locale: ptBR}))
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, isFocus && { borderColor: '#52B032', borderWidth: 1 }]} onPress={() => showDatePicker()}>
        <Text>{dataValue}</Text>
      </TouchableOpacity>
      <Animated.Text style={[styles.inputLabel, labelStyle, isFocus && { color: '#52B032' }]}>Data de Entrega</Animated.Text>
      <DateTimePickerModal
        minimumDate={new Date()}
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={'Confirmar'}
        cancelTextIOS={'Cancelar'}
        display='inline'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  inputLabel: {
    position: 'absolute',
    left: 15,
    color: '#000',
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    fontSize: 16
  },
  button: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    color: '#000',
    justifyContent: 'center'
  },
})

export default DateTimePickerComponent;
