import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BORDER_COLOR } from '../../constants';

export function ActionWrapper({children}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingBottom: 20, 
        paddingTop: 8, 
        borderTopWidth: 1,
        borderColor: BORDER_COLOR
    }
});