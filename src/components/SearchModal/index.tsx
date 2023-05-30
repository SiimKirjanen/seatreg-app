import { SearchBar, Dialog } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

import { BarCodeScanner } from '../BarCodeScanner';

interface Props {
  searchOpen: boolean;
  setSearchOpen: Function;
}

function SearchModal({ searchOpen, setSearchOpen }: Props) {
  const [search, setSearch] = useState('');
  const [barCodeScannerOpen, setBarCodeScannerOpen] = useState(false);

  const onbarCodeScanned = (scanningResults) => {
    setBarCodeScannerOpen(false);
    setSearch(scanningResults.data);
  };

  const closeModal = () => {
    setBarCodeScannerOpen(false);
    setSearchOpen(false);
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
      <View style={{ marginBottom: 12 }}>
        {barCodeScannerOpen ? (
          <>
            <BarCodeScanner barCodeScanned={onbarCodeScanned} />
            <Button title="Close QR" onPress={() => setBarCodeScannerOpen(false)} />
          </>
        ) : (
          <Button title="Scan QR" onPress={() => setBarCodeScannerOpen(true)} />
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: 12 }}>
        <Button title="Close" onPress={closeModal} />
        <Button title="Apply" />
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});

export default SearchModal;
