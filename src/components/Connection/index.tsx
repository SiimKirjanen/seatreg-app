import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Button } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { AppContext } from '../../context/AppContext';
import { IConnection } from '../../interface';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { removeConnectionFromStorage } from '../../service/storage';
import ConfirmDialog from '../ConfirmDialog';

interface Props {
  tokenData: IConnection;
  optionsPress: Function;
}

function Connection({ tokenData, optionsPress }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { dispatch } = useContext(AppContext);
  const toast = useToast();

  const confirmDeleteAlert = () => {
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    await removeConnectionFromStorage(tokenData);
    dispatch({
      type: ACTION_TYPE.REMOVE_CONNECTION_ACTION,
      payload: tokenData,
    });
    toast.show('Connection removed', { type: 'success' });
    setShowDeleteDialog(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Card.Title>{tokenData.registrationName}</Card.Title>
        <Card.Divider />
        <Text style={styles.siteUrl}>{tokenData.siteUrl}</Text>
        <View style={styles.buttonWrap}>
          <Button title="Options" onPress={() => optionsPress(tokenData)} />
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
      <ConfirmDialog
        visible={showDeleteDialog}
        title="Delete connection"
        message="Are you sure?"
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
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
