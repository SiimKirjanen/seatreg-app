import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { ActionWrapper } from '../../components/Actions';
import { BookingsActions } from '../../components/Actions/BookingsActions';
import SearchModal from '../../components/SearchModal';
import { ParamList } from '../../types';
import { IBooking } from '../../interface';

function Bookings() {
  const { params: { apiToken, siteUrl } } = useRoute<RouteProp<ParamList, 'Bookings'>>();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    async function getBookings() {
      try {
        setLoading(true);
        const response = await (await fetch(
          `${siteUrl}/wp-json/seatreg/v1/bookings?api_token=${apiToken}`,
        )).json();
        
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
  }, [apiToken]);

    return (
        <View style={{flex: 1}}>
          <SearchModal searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
          <ScrollView>
            {loading && <Text>Loading</Text>}
            {bookings.map((booking) => {
              return <Text key={booking.id}>
                {booking.booking_id}
              </Text>
            })}
          </ScrollView>
          <ActionWrapper>
            <BookingsActions onPress={() => setSearchOpen(true)} />
          </ActionWrapper>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Bookings;