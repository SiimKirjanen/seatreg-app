import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Button } from '@rneui/themed';
import React, { useContext } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { AppContext } from '../../context/AppContextProvider';
import { IConnection } from '../../interface';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { removeConnectionFromStorage } from '../../service/storage';

interface Props {
  tokenData: IConnection;
  optionsPress: Function;
}

function Connection({ tokenData }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { dispatch } = useContext(AppContext);
  const toast = useToast();

  const confirmDeleteAlert = () => {
    Alert.alert('Delete connection', 'Are you sure?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await removeConnectionFromStorage(tokenData);
          dispatch({ type: ACTION_TYPE.REMOVE_CONNECTION_ACTION, payload: tokenData });
          toast.show('Connection removed', {
            type: 'success',
          });
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Card.Title>{tokenData.registrationName}</Card.Title>
        <Card.Divider />
        <Text style={styles.siteUrl}>{tokenData.siteUrl}</Text>
        <View style={styles.buttonWrap}>
          <Button
            title="Bookings"
            onPress={() =>
              navigation.navigate('Bookings', {
                tokenData,
              })
            }
          />
          <Button title="Remove" onPress={confirmDeleteAlert} color="error" />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  siteUrl: {
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonWrap: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'flex-end',
  },
});

export default Connection;
