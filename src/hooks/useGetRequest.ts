import { useState, useEffect } from 'react';

import { IBooking } from '../interface';

interface Response {
  success: boolean;
}

interface BookingsResponse extends Response {
  bookings?: IBooking[];
}

export const useGetRequest = (resource: string) => {
  const [data, setData] = useState<BookingsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(resource);
        const responseData = await response.json();

        if (response.ok) {
          setData(responseData);
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
