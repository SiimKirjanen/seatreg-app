import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ICON_SIZE, SEATREG_GREEN } from '../../../constants'; 

export function BookingsActions({onPress}) {
    return(
        <FontAwesome name="search" size={ICON_SIZE} color={SEATREG_GREEN} onPress={onPress} />
    );
}