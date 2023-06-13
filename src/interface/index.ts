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

export interface IToken {
  apiToken: string;
  apiTokenId: string;
}

export interface IConnection extends IToken {
  pushNotifications: boolean;
  registrationName: string;
  siteUrl: string;
}

export interface IStoredConnection {
  pushNotifications: boolean;
  registrationName: string;
  siteUrl: string;
  apiTokenId: string;
}

export interface ISearch {
  searchValue: string;
}

export interface ICustomField {
  label: string;
  value: string;
}
