import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Button } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { IToken } from '../../interface';

interface Props {
  tokenData: IToken;
  optionsPress: Function;
}

function Connection({ tokenData, optionsPress }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
          <Button title="Options" onPress={() => optionsPress(tokenData)} />
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
