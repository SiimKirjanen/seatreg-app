import { RouteProp, useRoute } from '@react-navigation/native';
import { Card } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import { BookingsActions } from '../../components/Actions/BookingsActions';
import SearchModal from '../../components/SearchModal';
import { IBooking } from '../../interface';
import { ParamList } from '../../types';

function Bookings() {
  const {
    params: { tokenData },
  } = useRoute<RouteProp<ParamList, 'Bookings'>>();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    async function getBookings() {
      try {
        setLoading(true);
        const response = await (
          await fetch(
            `${tokenData.siteUrl}/wp-json/seatreg/v1/bookings?api_token=${tokenData.apiToken}`
          )
        ).json();

        if (response.message === 'ok') {
          setBookings(response.bookings);
        } else {
          alert('Error');
        }
      } catch (error) {
        console.log(error);
        alert('error');
      } finally {
        setLoading(false);
      }
    }
    getBookings();
  }, [tokenData.apiToken]);

  return (
    <View style={{ flex: 1 }}>
      {loading && <Text>Loading</Text>}
      <ScrollView>
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <Card.Title>{booking.booking_id}</Card.Title>
            <Card.Divider />
            <Text>
              Name: {booking.first_name} {booking.last_name}
            </Text>
            <Text>Email: {booking.email}</Text>
            <Text>Seat: {booking.seat_nr}</Text>
            <Text>Status: {booking.status}</Text>
          </Card>
        ))}
      </ScrollView>
      <ActionWrapper>
        <BookingsActions onPress={() => setSearchOpen(true)} />
      </ActionWrapper>
      <SearchModal searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </View>
  );
}

export default Bookings;
