import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const data = [
    { label: 'Felipe Augusto Ribeiro Serra', value: 'FS001' },
    { label: 'João da Silva', value: 'JS002' },
    { label: 'Maria Oliveira', value: 'MO003' },
    { label: 'Pedro Souza', value: 'PS004' },
    { label: 'Ana Santos', value: 'AS005' },
    { label: 'Lucas Pereira', value: 'LP006' },
    { label: 'Julia Mendes', value: 'JM007' },
    { label: 'Carlos Silva', value: 'CS008' },
    { label: 'Fernanda Lima', value: 'FL009' },
    { label: 'Rafael Oliveira', value: 'RO010' },
    { label: 'Camila Costa', value: 'CC011' },
    { label: 'Daniel Santos', value: 'DS012' },
    { label: 'Amanda Pereira', value: 'AP013' },
    { label: 'Gustavo Mendes', value: 'GM014' },
    { label: 'Isabella Souza', value: 'IS015' },
    { label: 'Marcos Lima', value: 'ML016' },
    { label: 'Larissa Costa', value: 'LC017' },
    { label: 'Eduardo Santos', value: 'ES018' },
    { label: 'Luana Oliveira', value: 'LO019' },
    { label: 'Vinicius Silva', value: 'VS020' },
  ];
  

const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const labelStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withSpring(isFocus || value ? -4 : 24, {
                        damping: 10,
                        stiffness: 100,
                    })
                },
                {
                    translateX: withSpring(isFocus || value ? -22 : 0, {
                        damping: 10,
                        stiffness: 100,
                    }),
                }
            ],
        };
    });

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#52B032', borderWidth: 1 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={''}
                searchPlaceholder="Buscar..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? '#52B032' : 'black'}
                        name="user"
                        size={20}
                    />
                )}
            />
            
            <Animated.Text style={[styles.label, labelStyle, isFocus && { color: '#52B032' }]}>Cliente</Animated.Text>
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        width: 300,
        height: 50,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 50,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});