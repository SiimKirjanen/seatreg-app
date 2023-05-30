import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useReducer } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import { BookingsActions } from '../../components/Actions/BookingsActions';
import { ActiveSearchNotification } from '../../components/ActiveSearchNotification';
import { Bookings } from '../../components/Bookings';
import SearchModal from '../../components/SearchModal';
import { SEATREG_GREEN } from '../../constants';
import { IBooking } from '../../interface';
import { bookingsReducer, initState } from '../../reducers/BookingsReducer';
import { ParamList } from '../../types';

function BookingsPage() {
  const {
    params: { tokenData },
  } = useRoute<RouteProp<ParamList, 'Bookings'>>();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, initState);

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

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <Text style={{ marginBottom: 6 }}>Loading bookings</Text>
        <ActivityIndicator size="large" color={SEATREG_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.bookingsWrap}>
      {bookingsState.searchParams.searchValue && (
        <ActiveSearchNotification
          activeSearch={bookingsState.searchParams}
          onPress={() => setSearchOpen(true)}
        />
      )}
      <ScrollView>
        <Bookings bookings={bookings} searchValue={bookingsState.searchParams.searchValue} />
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

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingsWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookingsPage;
