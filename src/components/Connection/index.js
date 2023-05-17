import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Connection({title}) {
  const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          <Button title="Opensa" onPress={() => navigation.navigate('Bookings')} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    border: '1px solid red',
  },
  text: {
    fontSize: 60
  }
});

export default Connection;