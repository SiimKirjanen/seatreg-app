import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ICON_SIZE, SEATREG_GREEN } from '../../../constants'; 

function TokenActions() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <FontAwesome name="plus-circle" size={ICON_SIZE} color={SEATREG_GREEN} onPress={() => navigation.navigate('AddToken')}/>
    );
}

export default TokenActions;