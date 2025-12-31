import { Dialog, Switch, Text } from '@rneui/themed';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { AppContext } from '../../context/AppContext';
import { IConnection } from '../../interface';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { registerForPushNotificationsAsync, registerForWebNotificationsAsync } from '../../service/notification';
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
        await registerForWebNotificationsAsync();
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
          options: {
            localNotifications: value,
          }
        },
      });
      updateConnection(payLoad);
      toast.show('Options updated', {
        type: 'success',
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const toggleBookingStatusColors = async (value: boolean) => {
    try {
      const payLoad = {
        ...activeConnection,
        bookingStatusColors: value,
      };

      dispatch({
        type: ACTION_TYPE.CHANGE_CONNECTION_OPTIONS,
        payload: {
          activeOptionConnectionKey,
          options: {
            bookingStatusColors: value,
          }
        },
      });
      updateConnection(payLoad);
      toast.show('Options updated', {
        type: 'success',
      });
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <Dialog isVisible={isVisible} onBackdropPress={() => closeOptions()}>
      <Dialog.Title title="Options" titleStyle={{ textAlign: 'center' }} />

      <View style={styles.actionWrap}>
        <Text>Enable booking notifications</Text>
        <Switch
          value={activeConnection?.localNotifications}
          onValueChange={toggleNotifications}
        />
      </View>
      <View style={styles.actionWrap}>
        <Text>Enable booking status colors</Text>
        <Switch
          value={activeConnection?.bookingStatusColors}
          onValueChange={toggleBookingStatusColors}
        />
      </View>

    </Dialog>
  );
}

const styles = StyleSheet.create({
  actionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 12,
  }
});
