import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ICON_SIZE, SEATREG_GREEN } from '../../../constants'; 

function TokenActions() {
    const navigation = useNavigation();

    return (
        <FontAwesome name="plus-circle" size={ICON_SIZE} color={SEATREG_GREEN} onPress={() => navigation.navigate('AddToken')}/>
    );
}

export default TokenActions;