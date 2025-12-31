import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import { BookingsActions } from '../../components/Actions/BookingsActions';
import { ActiveSearchNotification } from '../../components/ActiveSearchNotification';
import { Bookings } from '../../components/Bookings';
import { DateTimePicker } from '../../components/DateTimePicker';
import SearchModal from '../../components/SearchModal';
import { SEATREG_GREEN, SEATREG_REQUIRED_API_VERSION } from '../../constants';
import { useGetRequest } from '../../hooks/useGetRequest';
import { bookingsReducer, initState } from '../../reducers/BookingsReducer';
import { ParamList } from '../../types';
import { getDateStringForBE } from '../../utils/time';

function BookingsPage() {
  const {
    params: { tokenData },
  } = useRoute<RouteProp<ParamList, 'Bookings'>>();
  const [searchOpen, setSearchOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, initState);
  const { data, loading, error, reload } = useGetRequest(
    `${tokenData.siteUrl}/wp-json/seatreg/v1/bookings?api_token=${encodeURIComponent(
      tokenData.apiToken
    )}&calendar_date=${encodeURIComponent(
      getDateStringForBE(calendarDate)
    )}&seatreg_api=${encodeURIComponent(SEATREG_REQUIRED_API_VERSION)}`
  );
  const navigation = useNavigation();
  const displayBookingStatusColors = tokenData.bookingStatusColors;

  useEffect(() => {
    navigation.setOptions({
      title: `${tokenData.registrationName} bookings`,
    });
  }, [navigation, tokenData.registrationName]);

  if (loading) {
    return (
      <View style={styles.centerWrap}>
        <Text style={{ marginBottom: 6 }}>Loading bookings</Text>
        <ActivityIndicator size="large" color={SEATREG_GREEN} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerWrap}>
        <Text style={{ marginBottom: 6, textAlign: 'center' }}>{error}</Text>
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
      {data.options.usingCalendar && (
        <DateTimePicker calendarDate={calendarDate} setCalendarDate={setCalendarDate} />
      )}
      <ScrollView>
        <Bookings bookings={data.bookings} searchValue={bookingsState.searchParams.searchValue} displayBookingStatusColors={displayBookingStatusColors} />
      </ScrollView>
      <ActionWrapper>
        <BookingsActions openSearch={() => setSearchOpen(true)} refreshBookings={reload} />
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
  centerWrap: {
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
