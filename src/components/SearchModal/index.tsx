import { SearchBar, Dialog, Button } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { SEATREG_GREEN } from '../../constants';
import { ISearch } from '../../interface';
import { ACTION_TYPE } from '../../reducers/BookingsReducer';
import { WebBarCodeScannerRef } from '../SeatRegBarCodeScanner/WebBarCodeScanner';
import { SeatRegBarCodeScanner } from '../SeatRegBarCodeScanner';
import { translate } from '../../service/translation';

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
  const webScannerRef = useRef<WebBarCodeScannerRef>(null);

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
    toast.show(translate('Search cleared', 'searchCleared'), {
      type: 'success',
    });
  };

  return (
    <Dialog isVisible={searchOpen} onBackdropPress={closeModal}>
      <Dialog.Title title={translate('Booking search', 'bookingSearch')} />
      <SearchBar
        lightTheme
        placeholder={translate('Search', 'searchPlaceholder')}
        onChangeText={(search) => setSearch(search)}
        containerStyle={{ marginBottom: 12 }}
        inputStyle={{ color: 'black', fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        value={search}
      />
      <View style={{ marginBottom: 26 }}>
        {barCodeScannerOpen ? (
          <>
            <SeatRegBarCodeScanner
                ref={webScannerRef}
                onScan={(value) => {
                  setSearch(value);
                  setBarCodeScannerOpen(false);
                }}
              />
            <Button title={translate('Close QR scanner', 'closeQRScanner')} onPress={async () => {
              await webScannerRef.current?.stop();
              setBarCodeScannerOpen(false);
            }} 
            />
          </>
        ) : (
          <Button title={translate('Scan QR', 'scanQR')} onPress={() => setBarCodeScannerOpen(true)} />
        )}
      </View>

      <View style={styles.buttonsWrap}>
        <Button title={translate('Close', 'closeButton')} onPress={closeModal} />
        <Button title={translate('Clear', 'clearButton')} onPress={clearSearch} color="error" />
        <Button title={translate('Apply', 'applyButton')} onPress={applySearch} color={SEATREG_GREEN} />
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
