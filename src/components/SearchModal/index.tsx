import { SearchBar, Dialog, Button } from '@rneui/themed';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { SEATREG_GREEN } from '../../constants';
import { ISearch } from '../../interface';
import { ACTION_TYPE } from '../../reducers/BookingsReducer';
import { SeatRegBarCodeScanner } from '../BarCodeScanner';

interface Props {
  searchOpen: boolean;
  setSearchOpen: Function;
  searchParams: ISearch;
  bookingsDispatch: Function;
}

function SearchModal({ searchOpen, setSearchOpen, searchParams, bookingsDispatch }: Props) {
  const [search, setSearch] = useState('');
  const [barCodeScannerOpen, setBarCodeScannerOpen] = useState(false);
  const toast = useToast();

  const onbarCodeScanned = (scanningResults) => {
    setBarCodeScannerOpen(false);
    setSearch(scanningResults.data);
  };

  const closeModal = () => {
    setBarCodeScannerOpen(false);
    setSearchOpen(false);
  };

  const applySearch = () => {
    bookingsDispatch({
      type: ACTION_TYPE.UPDATE_SEARCH,
      payload: search,
    });
    closeModal();
  };

  const clearSearch = () => {
    setSearch('');
    bookingsDispatch({
      type: ACTION_TYPE.UPDATE_SEARCH,
      payload: '',
    });
    closeModal();
    toast.show('Search cleared', {
      type: 'success',
    });
  };

  return (
    <Dialog isVisible={searchOpen} onBackdropPress={closeModal}>
      <Dialog.Title title="Booking search" />
      <SearchBar
        lightTheme
        placeholder="Search"
        onChangeText={(search) => setSearch(search)}
        containerStyle={{ marginBottom: 12 }}
        inputStyle={{ color: 'black', fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        value={search}
      />
      <View style={{ marginBottom: 26 }}>
        {barCodeScannerOpen ? (
          <>
            <SeatRegBarCodeScanner barCodeScanned={onbarCodeScanned} />
            <Button title="Close QR scanner" onPress={() => setBarCodeScannerOpen(false)} />
          </>
        ) : (
          <Button title="Scan QR" onPress={() => setBarCodeScannerOpen(true)} />
        )}
      </View>

      <View style={styles.buttonsWrap}>
        <Button title="Close" onPress={closeModal} />
        <Button title="Clear" onPress={clearSearch} color="error" />
        <Button title="Apply" onPress={applySearch} color={SEATREG_GREEN} />
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 12,
  },
});

export default SearchModal;
