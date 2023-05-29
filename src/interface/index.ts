export interface IBooking {
  id: string;
  registration_code: string;
  first_name: string;
  last_name: string;
  email: string;
  seat_id: string;
  seat_nr: string;
  room_uuid: string;
  booking_date: number;
  booking_confirm_date: number;
  custom_field_data: object;
  status: number;
  booking_id: string;
  booker_email: string;
  calendar_date: string;
}

export interface IToken {
  apiToken: string;
  apiTokenId: number;
  registrationName: string;
  siteUrl: string;
}
