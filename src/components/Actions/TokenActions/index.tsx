import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';
import React from 'react';

import { SEATREG_GREEN } from '../../../constants';
import { PageNames } from '../../../enum';

function TokenActions() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <FAB
      loading={false}
      icon={{ name: 'add', color: 'white' }}
      color={SEATREG_GREEN}
      onPress={() => navigation.navigate(PageNames.AddToken)}
    />
  );
}

export default TokenActions;
