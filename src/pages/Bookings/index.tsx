import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useReducer } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import { BookingsActions } from '../../components/Actions/BookingsActions';
import { ActiveSearchNotification } from '../../components/ActiveSearchNotification';
import { Booking } from '../../components/Booking';
import SearchModal from '../../components/SearchModal';
import { IBooking } from '../../interface';
import { bookingsReducer, initState } from '../../reducers/BookingsReducer';
import { ParamList } from '../../types';
import { searchMatch } from '../../utils/search';

function Bookings() {
  const {
    params: { tokenData },
  } = useRoute<RouteProp<ParamList, 'Bookings'>>();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, initState);

  const bookingsFiltering = (booking: IBooking) => {
    const searchValue = bookingsState.searchParams.searchValue;

    if (searchValue) {
      if (!searchMatch(booking, searchValue)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    async function getBookings() {
      try {
        setLoading(true);
        const response = await (
          await fetch(
            `${tokenData.siteUrl}/wp-json/seatreg/v1/bookings?api_token=${tokenData.apiToken}`
          )
        ).json();

        if (response.message === 'ok') {
          setBookings(response.bookings);
        } else {
          alert('Error');
        }
      } catch (error) {
        console.log(error);
        alert('error');
      } finally {
        setLoading(false);
      }
    }
    getBookings();
  }, [tokenData.apiToken]);

  return (
    <View style={{ flex: 1 }}>
      {loading && <Text>Loading</Text>}
      {bookingsState.searchParams.searchValue && (
        <ActiveSearchNotification
          activeSearch={bookingsState.searchParams}
          onPress={() => setSearchOpen(true)}
        />
      )}
      <ScrollView>
        {bookings.filter(bookingsFiltering).map((booking) => (
          <Booking booking={booking} key={booking.id} />
        ))}
      </ScrollView>
      <ActionWrapper>
        <BookingsActions onPress={() => setSearchOpen(true)} />
      </ActionWrapper>
      <SearchModal
        searchParams={bookingsState.searchParams}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        bookingsDispatch={bookingsDispatch}
      />
    </View>
  );
}

export default Bookings;
