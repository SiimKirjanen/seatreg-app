import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BORDER_COLOR } from '../../constants';

function Connection({title}) {
  const navigation = useNavigation();

    return (
        <View style={styles.wrap}>
          <View style={{flexGrow: 1}}>
            <TouchableOpacity onPress={() => navigation.navigate('Bookings')}>
              <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrap}>
            <TouchableOpacity onPress={() => navigation.navigate('AddToken')} style={styles.btn}>
                <FontAwesome name="gear" size={20} style={styles.icon} />
              </TouchableOpacity>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginBottom: 12,
    flexDirection: 'row', 
    alignItems: 'stretch'
  },
  text: {
    fontSize: 40,
    textAlign: 'center'
  },
  btn: {
    backgroundColor: '#ccc', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  iconWrap: {
   
    width: 50,
  }
});

export default Connection;