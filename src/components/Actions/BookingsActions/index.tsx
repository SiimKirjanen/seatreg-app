import { FAB } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { NOTIFICATION_BLUE, SEATREG_GREEN } from '../../../constants';

interface Props {
  openSearch: Function;
  refreshBookings: Function;
}

export function BookingsActions({ openSearch, refreshBookings }: Props) {
  return (
    <View style={{ flexDirection: 'row', columnGap: 12 }}>
      <FAB
        loading={false}
        icon={{ name: 'refresh', color: 'white' }}
        color={NOTIFICATION_BLUE}
        onPress={() => refreshBookings()}
      />
      <FAB
        loading={false}
        icon={{ name: 'search', color: 'white' }}
        color={SEATREG_GREEN}
        onPress={() => openSearch()}
      />
    </View>
  );
}
