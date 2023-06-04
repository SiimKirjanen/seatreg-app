import { Card } from '@rneui/base';
import React from 'react';
import { Text, View } from 'react-native';

import { IBooking, ICustomField } from '../../interface';
import { getDateString } from '../../utils/time';

interface Props {
  booking: IBooking;
}

function CustomFields({ fields }) {
  if (!fields?.length) {
    return null;
  }

  return (
    <View>
      <Text>Custom fields:</Text>
      {fields.map((field: ICustomField, i) => (
        <Text key={i} style={{ paddingLeft: 32 }}>
          {field.label}: {field.value}
        </Text>
      ))}
    </View>
  );
}

function CalendarDate({ dateString }) {
  if (!dateString) {
    return null;
  }
  return <Text>Calendar date: {getDateString(new Date(dateString).getTime() / 1000)}</Text>;
}

export function Booking({ booking }: Props) {
  const bookingStatus = booking.status === '1' ? 'Pending' : 'Approved';
  const customFields = JSON.parse(booking.custom_field_data);

  return (
    <Card key={booking.id}>
      <Card.Title>{booking.booking_id}</Card.Title>
      <Card.Divider />
      <Text>
        Name: {booking.first_name} {booking.last_name}
      </Text>
      <Text>Seat: {booking.seat_nr}</Text>
      <Text>Email: {booking.email}</Text>
      <Text>Booker email: {booking.booker_email}</Text>
      <Text>Status: {bookingStatus}</Text>
      <Text>Booking date: {getDateString(booking.booking_date)}</Text>
      <Text>Booking approved date: {getDateString(booking.booking_confirm_date)}</Text>
      <CustomFields fields={customFields} />
      <CalendarDate dateString={booking.calendar_date} />
    </Card>
  );
}
