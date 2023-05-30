import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { NOTIFICATION_BLUE } from '../../constants';
import { ISearch } from '../../interface';

interface Props {
  activeSearch: ISearch;
  onPress: Function;
}

export function ActiveSearchNotification({ activeSearch, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={() => onPress()}>
        <Text style={styles.text}>Booking filtering is active</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 6,
    backgroundColor: NOTIFICATION_BLUE,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
