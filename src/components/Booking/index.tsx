import { Card } from '@rneui/base';
import React from 'react';
import { Text } from 'react-native';

import { IBooking } from '../../interface';
import { getDayWithSuffix } from '../../utils/time';

interface Props {
  booking: IBooking;
}

export function Booking({ booking }: Props) {
  const bookingStatus = booking.status === '1' ? 'Pending' : 'Approved';
  const getDateString = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${getDayWithSuffix(day)} ${month} ${year}`;

    return formattedDate;
  };

  return (
    <Card key={booking.id}>
      <Card.Title>{booking.booking_id}</Card.Title>
      <Card.Divider />
      <Text>
        Name: {booking.first_name} {booking.last_name}
      </Text>
      <Text>Email: {booking.email}</Text>
      <Text>Seat: {booking.seat_nr}</Text>
      <Text>Status: {bookingStatus}</Text>
      <Text>Booking date: {getDateString(booking.booking_date)}</Text>
      <Text>Booking approved date: {getDateString(booking.booking_confirm_date)}</Text>
      <Text>Custom fields: {JSON.stringify(booking.custom_field_data)}</Text>
      <Text>Booker email: {booking.booker_email}</Text>
      <Text>Calendar date: {booking.calendar_date}</Text>
    </Card>
  );
}
