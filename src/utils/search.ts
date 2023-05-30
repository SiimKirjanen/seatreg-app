import { IBooking } from '../interface';

export const searchMatch = (booking: IBooking, searchValue: string) => {
  //Name search
  if (`${booking.first_name} ${booking.last_name}`.includes(searchValue)) {
    return true;
  }
  //Email search
  if (booking.email.includes(searchValue)) {
    return true;
  }
  //Booking ID search
  if (booking.booking_id.includes(searchValue)) {
    return true;
  }

  return false;
};
