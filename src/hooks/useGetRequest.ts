import { useState, useEffect } from 'react';

import { IBooking } from '../interface';

interface IRegistrationOptions {
  calendarDates: string[];
  usingCalendar: boolean;
}

interface IBookingResponse {
  options: IRegistrationOptions;
  message: string;
  bookings: IBooking[];
}

interface BookingsState {
  bookings: IBooking[];
  options: IRegistrationOptions;
}

export const useGetRequest = (resource: string) => {
  const [data, setData] = useState<BookingsState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(resource);
        const responseData: IBookingResponse = await response.json();

        if (response.ok) {
          setData({
            bookings: responseData.bookings,
            options: {
              usingCalendar: !!+responseData.options.usingCalendar,
              calendarDates: responseData.options.calendarDates,
            },
          });
        } else {
          setError(responseData?.message || 'Request failed');
        }
      } catch {
        setError(
          'Unable to Establish Connection. Check your internet connection and verify the website availability'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [resource, refreshTrigger]);

  const reload = () => {
    setRefreshTrigger({});
  };

  return { data, loading, error, reload };
};
