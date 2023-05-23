import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { ActionWrapper } from '../../components/Actions';
import { BookingsActions } from '../../components/Actions/BookingsActions';

function Bookings() {
  const { params } = useRoute();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBookings() {

      console.log('bookings');
      console.log(params.apiToken);
      try {
        setLoading(true);
        const response = await (await fetch(
          `https://b65f-2001-7d0-843c-1a80-cd4b-4fd-58b0-4c07.ngrok-free.app/wp-json/seatreg/v1/bookings?api_token=${params.apiToken}`,
        )).json();
        
        console.log(response);
        if(response.message === 'ok') {
          setBookings(response.bookings);
        }else {
          alert('Error');
        }
      }catch(error) {
        console.log(error)
        alert('error');
      }finally {
        setLoading(false);
      }
    }
    getBookings();
  }, [params.apiToken]);

    return (
        <View style={{flex: 1}}>
          <ScrollView>
            {loading && <Text>Loading</Text>}
            {bookings.map((booking) => {
              return <Text>
                {booking.id}
              </Text>
            })}
          </ScrollView>
          <ActionWrapper>
            <BookingsActions />
          </ActionWrapper>
        </View>
    );
}

export default Bookings;