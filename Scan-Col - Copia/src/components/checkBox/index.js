import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importe um ícone que você deseja usar

export default function CustomCheckBox() {
  const [isSelected, setIsSelected] = useState(false);

  const toggleCheckBox = () => {
    setIsSelected(!isSelected);
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckBox}>
      <View style={[styles.checkbox, isSelected ? styles.checked : styles.unchecked]}>
        {isSelected && <FontAwesome name="check" size={16} color="#FFF" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    borderColor: "#fff",
    backgroundColor: '#52B032',
  },
  unchecked: {
    backgroundColor: '#FFF',
  }
});
