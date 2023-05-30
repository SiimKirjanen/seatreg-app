import { Card } from '@rneui/base';
import React from 'react';
import { Text } from 'react-native';

import { IBooking } from '../../interface';

interface Props {
  booking: IBooking;
}

export function Booking({ booking }: Props) {
  return (
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
  );
}
