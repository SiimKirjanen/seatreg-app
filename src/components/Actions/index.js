import { StyleSheet, View } from 'react-native';

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
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingBottom: 20, 
        paddingTop: 8, 
        borderTopWidth: 1,
        borderColor: '#ccc'
    }
});