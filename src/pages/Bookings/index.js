import { View, Text, ScrollView } from 'react-native';
import { ActionWrapper } from '../../components/Actions';
import { BookingsActions } from '../../components/Actions/BookingsActions';

function Bookings() {
    return (
        <View style={{flex: 1}}>
          <ScrollView>
            <Text>Bookings</Text>
          </ScrollView>
          <ActionWrapper>
            <BookingsActions />
          </ActionWrapper>
        </View>
    );
}

export default Bookings;