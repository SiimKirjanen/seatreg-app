import { Dialog, Icon } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { AppContext } from '../../context/AppContext';

export function NotificationBell() {
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const {
    state: { globalConfig },
  } = useContext(AppContext);

  return (
    <View>
      <TouchableOpacity onPress={() => setNotificationsVisible(true)}>
        <Icon name="bell-o" type="font-awesome" />
      </TouchableOpacity>

      <Dialog
        isVisible={notificationsVisible}
        onBackdropPress={() => setNotificationsVisible(false)}>
        <Dialog.Title title="System alerts" />
        <ScrollView>
          {globalConfig.alerts.map((alert, i) => {
            return (
              <Text key={i}>
                <Text style={{ fontWeight: 'bold' }}>
                  {alert.date}
                  {'\n'}
                </Text>
                <Text>
                  {alert.text}
                  {'\n'}
                </Text>
              </Text>
            );
          })}
        </ScrollView>
      </Dialog>
    </View>
  );
}
