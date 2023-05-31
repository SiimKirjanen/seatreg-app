import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input, Button } from '@rneui/themed';
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { ADD_CONNECTION_STEP_1 } from '../../../../constants';
import { AppContext } from '../../../../context/AppContextProvider';
import { PageNames } from '../../../../enum';
import { ACTION_TYPE } from '../../../../reducers/AppContextReducer';
import { storeApiTokenData } from '../../../../service/storage';

interface Props {
  parentStyles: any;
  setStep: Function;
  siteURL: string;
}

export function StepToken({ parentStyles, setStep, siteURL }: Props) {
  const [loading, setLoading] = useState(false);
  const [apiToken, setApiToken] = useState('8285278186');
  const { dispatch } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();

  const saveToken = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${siteURL}/wp-json/seatreg/v1/validate-token?api_token=${apiToken}`
      );
      const responseData = await response.json();

      if (response.ok) {
        const payload = {
          apiToken: responseData.apiToken,
          registrationName: responseData.registrationName,
          apiTokenId: responseData.id,
          siteUrl: siteURL,
        };

        dispatch({
          type: ACTION_TYPE.ADD_TOKEN_ACTION,
          payload,
        });
        storeApiTokenData(payload);
        toast.show('Connection added', {
          type: 'success',
        });
        navigation.navigate(PageNames.Home);
      } else {
        alert(responseData?.message || 'Request failed');
      }
    } catch {
      alert('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={parentStyles.stepWrap}>
      <Text style={parentStyles.stepText}>Enter SeatReg public API token</Text>
      <Input
        onChangeText={setApiToken}
        value={apiToken}
        placeholder="Enter API token"
        inputStyle={parentStyles.inputText}
      />
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => setStep(ADD_CONNECTION_STEP_1)} />
        <Button title="Save" onPress={saveToken} loading={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    columnGap: 16,
  },
});
