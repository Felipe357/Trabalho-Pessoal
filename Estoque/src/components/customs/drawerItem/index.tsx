import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface Props {
    label: string,
    onPress: () => void,
    icon: ImageSourcePropType,
    isActive: boolean,
    type: boolean
}

const CustomDrawerItem = ({ label, onPress, icon, isActive, type } : Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.Item, isActive ? { backgroundColor: '#52B03240' } : {}]}>
            <View style={[styles.body, type ? { width: '90%' } : {}]}>
                <Image source={icon} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={label !== 'Sair' ? { width: '65%'} : {} }>{label}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    Item: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10
    }
})

export default CustomDrawerItem