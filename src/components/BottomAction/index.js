import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BottomAction() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Button color="#61B329" title="Add token" onPress={() => navigation.navigate('AddToken')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingBottom: 30, 
        paddingTop: 20, 
        borderTopWidth: 1,
        borderColor: '#ccc'
    }
  });

export default BottomAction;