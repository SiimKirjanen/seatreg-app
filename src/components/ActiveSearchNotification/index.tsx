import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { NOTIFICATION_BLUE } from '../../constants';
import { ISearch } from '../../interface';
import { translate } from '../../service/translation';

interface Props {
  activeSearch: ISearch;
  onPress: Function;
}

export function ActiveSearchNotification({ activeSearch, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={() => onPress()}>
        <Text style={styles.text}>
          {translate('Booking filtering is active', 'bookingFilteringActive')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 6,
    backgroundColor: NOTIFICATION_BLUE,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
