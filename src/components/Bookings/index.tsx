import React from 'react';
import { View, Text } from 'react-native';

import { Booking } from './Booking';
import { IBooking } from '../../interface';
import { searchMatch } from '../../utils/search';

interface Props {
  bookings: IBooking[];
  searchValue: string;
}

export const Bookings = React.memo(({ bookings, searchValue }: Props) => {
  const bookingsFiltering = (booking: IBooking) => {
    if (searchValue) {
      if (!searchMatch(booking, searchValue)) {
        return false;
      }
    }
    return true;
  };
  const filteredBookings = bookings.filter(bookingsFiltering);

  if (bookings.length === 0) {
    return <Text style={{ fontSize: 18, marginTop: 30 }}>No bookings</Text>;
  }

  if (filteredBookings.length === 0) {
    return <Text style={{ fontSize: 18, marginTop: 30 }}>No results</Text>;
  }

  return (
    <View>
      {filteredBookings.map((booking) => (
        <Booking booking={booking} key={booking.id} />
      ))}
    </View>
  );
});
