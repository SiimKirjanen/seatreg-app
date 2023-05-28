import { FAB } from '@rneui/themed';
import React from 'react';

import { SEATREG_GREEN } from '../../../constants';

export function BookingsActions({ onPress }) {
  return (
    <FAB
      loading={false}
      icon={{ name: 'search', color: 'white' }}
      color={SEATREG_GREEN}
      onPress={onPress}
    />
  );
}
