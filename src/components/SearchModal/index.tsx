import React from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

import { BarCodeScanner } from '../BarCodeScanner';

interface Props {
    searchOpen: boolean,
    setSearchOpen: Function
};

function SearchModal({searchOpen, setSearchOpen}: Props) {
    return <Modal  
        animationType="slide"
        transparent={false}
        visible={searchOpen}
        onRequestClose={() => {
            setSearchOpen(false);
        }}>
      <View style={styles.modal}>
        <Text>Modal</Text>
        <BarCodeScanner />
        <Button title='Close' onPress={() => setSearchOpen(false)} />
      </View>
  </Modal>
}

const styles = StyleSheet.create({
  modal: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default SearchModal;