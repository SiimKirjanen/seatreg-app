export interface IBooking {
  id: string;
  registration_code: string;
  first_name: string;
  last_name: string;
  email: string;
  seat_id: string;
  seat_nr: string;
  room_uuid: string;
  room_name: string;
  booking_date: number;
  booking_confirm_date: number;
  custom_field_data: string;
  status: string;
  booking_id: string;
  booker_email: string;
  calendar_date: string;
}

export interface IStoredBooking {
  booking_id: string;
}

export interface IAlert {
  text: string;
  date: string;
}

export interface IToken {
  apiToken: string;
  apiTokenId: string;
}

export interface IGlobalConfig {
  alerts: IAlert[];
}

export interface IConnection extends IToken {
  localNotifications: boolean;
  registrationName: string;
  siteUrl: string;
  bookings: IStoredBooking[];
  requestFailCounter: number;
  bookingStatusColors: boolean;
}

export interface IStoredConnection {
  localNotifications: boolean;
  registrationName: string;
  siteUrl: string;
  apiTokenId: string;
  bookings: IStoredBooking[];
  requestFailCounter: number;
  bookingStatusColors: boolean;
}

export interface ISearch {
  searchValue: string;
}

export interface ICustomField {
  label: string;
  value: string;
}
