import { SearchBar } from '@rneui/themed';
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

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={searchOpen}
      onRequestClose={() => {
        setSearchOpen(false);
      }}>
      <View style={styles.modal}>
        <Text>Booking search</Text>
        <SearchBar
          lightTheme={true}
          placeholder="Type Here..."
          onChangeText={(search) => setSearch(search)}
          containerStyle={{ width: '60%', marginBottom: 12 }}
          value={search}
        />
        {barCodeScannerOpen ? (
          <>
            <BarCodeScanner barCodeScanned={onbarCodeScanned} />
            <Button title="Close QR" onPress={() => setBarCodeScannerOpen(false)} />
          </>
        ) : (
          <Button title="Scan QR" onPress={() => setBarCodeScannerOpen(true)} />
        )}

        <View style={{ flexDirection: 'row' }}>
          <Button title="Close" onPress={() => setSearchOpen(false)} />
          <Button title="Apply" />
        </View>
      </View>
    </Modal>
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
