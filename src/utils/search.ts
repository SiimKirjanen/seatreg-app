import { IBooking } from '../interface';

export const searchMatch = (booking: IBooking, searchValue: string) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  // Name search
  if (
    `${booking.first_name.toLowerCase()} ${booking.last_name.toLowerCase()}`.includes(
      lowerCaseSearchValue
    )
  ) {
    return true;
  }
  // Email search
  if (booking.email.toLowerCase().includes(lowerCaseSearchValue)) {
    return true;
  }
  // Booking ID search
  if (booking.booking_id.toLowerCase().includes(lowerCaseSearchValue)) {
    return true;
  }

  return false;
};
