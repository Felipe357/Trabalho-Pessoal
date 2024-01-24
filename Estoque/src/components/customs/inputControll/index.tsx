import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const InputComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    
    const [isFocus, setIsFocus] = useState(false);

    const labelStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withSpring(isFocus || inputValue !== '' ? -12 : 15, {
                        damping: 10,
                        stiffness: 100,
                    }),
                },
            ],
        };
    });

    return (
        <View style={styles.inputGroup}>
            <TextInput
                style={[styles.input, isFocus && { borderColor: '#52B032', borderWidth: 1 }]}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChangeText={(text) => setInputValue(text)}
                value={inputValue}
            />
            <Animated.Text style={[styles.inputLabel, labelStyle, isFocus && { color: '#52B032'}]}>Nome</Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        position: 'relative',
    },
    input: {
        width: 300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        color: '#000',
    },
    inputLabel: {
        position: 'absolute',
        left: 15,
        color: '#000',
        backgroundColor: '#FFF',
        paddingHorizontal: 5,
        fontSize: 16
    },
});

export default InputComponent;
