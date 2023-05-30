import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { IBooking } from '../../interface';
import { searchMatch } from '../../utils/search';
import { Booking } from '../Booking';

interface Props {
  bookings: IBooking[];
  searchValue: string;
}

export function Bookings({ bookings, searchValue }: Props) {
  const bookingsFiltering = (booking: IBooking) => {
    if (searchValue) {
      if (!searchMatch(booking, searchValue)) {
        return false;
      }
    }
    return true;
  };
  const filteredBookings = bookings.filter(bookingsFiltering);

  if (filteredBookings.length === 0) {
    return <Text style={{fontSize: 18}}>No results</Text>;
  }

  return (
    <View>
      {filteredBookings.map((booking) => (
        <Booking booking={booking} key={booking.id} />
      ))}
    </View>
  );
}
