import { Dialog, Switch, Text } from '@rneui/themed';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { IConnection } from '../../interface';
import { AppContext } from '../../providers/AppContextProvider';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { registerForPushNotificationsAsync } from '../../service/notification';
import { updateConnection } from '../../service/storage';
import { getConnectionKey } from '../../utils/strings';
interface Props {
  isVisible: boolean;
  closeOptions: Function;
  activeOptionConnectionKey: null | string;
}

export function ConnectionOptions({ isVisible, closeOptions, activeOptionConnectionKey }: Props) {
  const { state, dispatch } = useContext(AppContext);
  const toast = useToast();
  const activeConnection: IConnection = state.connectionData.find((connection: IConnection) => {
    return getConnectionKey(connection) === activeOptionConnectionKey;
  });

  const toggleNotifications = async (value: boolean) => {
    try {
      if (value) {
        await registerForPushNotificationsAsync();
      }

      const payLoad = {
        ...activeConnection,
        localNotifications: value,
      };

      dispatch({
        type: ACTION_TYPE.CHANGE_CONNECTION_OPTIONS,
        payload: {
          activeOptionConnectionKey,
          localNotifications: value,
        },
      });
      updateConnection(payLoad);
      toast.show('Options updated', {
        type: 'success',
      });
    } catch (e) {}
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={() => closeOptions()}>
      <Dialog.Title title="Options" />

      <Dialog.Actions>
        <View style={styles.actionWrap}>
          <Text>Enable booking notifications</Text>
          <Switch
            value={activeConnection?.localNotifications}
            onValueChange={toggleNotifications}
          />
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
