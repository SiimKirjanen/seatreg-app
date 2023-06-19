import { Dialog, Switch, Text } from '@rneui/themed';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { IConnection } from '../../interface';
import { AppContext } from '../../providers/AppContextProvider';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { getConnectionKey } from '../../utils/strings';

interface Props {
  isVisible: boolean;
  closeOptions: Function;
  activeOptionConnectionKey: null | string;
}

export function ConnectionOptions({ isVisible, closeOptions, activeOptionConnectionKey }: Props) {
  const { state, dispatch } = useContext(AppContext);
  const activeConnection = state.connectionData.find((connection: IConnection) => {
    return getConnectionKey(connection) === activeOptionConnectionKey;
  });

  const toggleChecked = (value: boolean) => {
    dispatch({
      type: ACTION_TYPE.CHANGE_CONNECTION_OPTIONS,
      payload: {
        activeOptionConnectionKey,
        localNotifications: value,
      },
    });
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={() => closeOptions()}>
      <Dialog.Title title="Options" />

      <Dialog.Actions>
        <View style={styles.actionWrap}>
          <Text>Enable booking notifications</Text>
          <Switch value={activeConnection?.localNotifications} onValueChange={toggleChecked} />
        </View>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  actionWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
