import { Card } from '@rneui/base';
import React from 'react';
import { Text, View } from 'react-native';

import { IBooking, ICustomField } from '../../../interface';
import { getDateString } from '../../../utils/time';
import { SEATREG_BOOKING_PENDING, SEATREG_GREEN } from '../../../constants';

interface Props {
  booking: IBooking;
  displayBookingStatusColors: boolean;
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

export function Booking({ booking, displayBookingStatusColors }: Props) {
  const bookingStatus = booking.status === '1' ? 'Pending' : 'Approved';
  const statusColor =
  displayBookingStatusColors
    ? booking.status === '1'
      ? SEATREG_BOOKING_PENDING
      : SEATREG_GREEN
    : undefined;
  const customFields = JSON.parse(booking.custom_field_data);

  return (
    <Card key={booking.id}>
      <Card.Title numberOfLines={2} ellipsizeMode="tail" style={statusColor ? { color: statusColor } : undefined}>{booking.booking_id}</Card.Title>
      <Text style={statusColor ? { color: statusColor, fontWeight: '600' } : undefined}>Status: {bookingStatus}</Text>
      <Card.Divider />
      <Text>
        Name: {booking.first_name} {booking.last_name}
      </Text>
      <Text>Seat: {booking.seat_nr}</Text>
      <Text>Room: {booking.room_name}</Text>
      <Text>Email: {booking.email}</Text>
      <Text>Booker email: {booking.booker_email}</Text>
      <Text>Booking date: {getDateString(booking.booking_date)}</Text>
      <Text>Booking approved date: {getDateString(booking.booking_confirm_date)}</Text>
      <CustomFields fields={customFields} />
      <CalendarDate dateString={booking.calendar_date} />
    </Card>
  );
}
