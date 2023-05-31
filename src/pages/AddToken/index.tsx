import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input, Button } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { AppContext } from '../../context/AppContextProvider';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { storeApiTokenData } from '../../service/storage';

const STEP_1 = 1;

function AddToken() {
  const [step, setStep] = useState(STEP_1);
  const [siteURL, setSiteURL] = useState(
    'https://62f0-2001-7d0-843c-1a80-2152-f535-fa32-48a4.ngrok-free.app'
  );
  const [apiToken, setApiToken] = useState('8285278186');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();

  async function validateURL() {
    try {
      setLoading(true);
      const response = await (await fetch(`${siteURL}/wp-json/seatreg/v1/echo`)).json();

      if (response.message === 'ok') {
        setStep(2);
      } else {
        alert('not ok');
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  async function saveToken() {
    try {
      setLoading(true);
      const response = await (
        await fetch(`${siteURL}/wp-json/seatreg/v1/validate-token?api_token=${apiToken}`)
      ).json();

      if (response.message === 'ok') {
        const payload = {
          apiToken: response.apiToken,
          registrationName: response.registrationName,
          apiTokenId: response.id,
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
        navigation.navigate('Connections');
      } else {
        alert('Error');
      }
    } catch {
      alert('error');
    } finally {
      setLoading(false);
    }
  }

  if (step === STEP_1) {
    return (
      <View style={styles.stepWrap}>
        <Text>Enter site URL</Text>
        <Input onChangeText={setSiteURL} value={siteURL} placeholder="Enter URL" />
        <Button title="Next" onPress={validateURL} loading={loading} />
      </View>
    );
  } else {
    return (
      <View style={styles.stepWrap}>
        <Text>Add token</Text>
        <Input onChangeText={setApiToken} value={apiToken} placeholder="Enter API token" />
        <View style={styles.buttonRow}>
          <Button title="Back" onPress={() => setStep(STEP_1)} />
          <Button title="Save" onPress={saveToken} loading={loading} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stepWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    columnGap: 16,
  },
});

export default AddToken;
