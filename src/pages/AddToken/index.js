import { useContext, useState } from 'react';
import { Input, Button } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContextProvider';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';

const STEP_1 = 1;
const STEP_2 = 2;

function AddToken() {
    const [step, setStep] = useState(STEP_1);
    const [siteURL, setSiteURL] = useState('');
    const [apiToken, setApiToken] = useState('');
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AppContext);
    const navigation = useNavigation();

    async function validateURL() {
      try {
        setLoading(true);
        const response = await (await fetch(
          'https://7270-2001-7d0-843c-1a80-3417-f226-bca8-e94a.ngrok-free.app/wp-json/seatreg/v1/echo',
        )).json();

        if( response.message === 'ok' ) {
          setStep(2);
        }else {
          alert('Error');
        }
      }catch(error) {
        alert('Error');
      }finally {
        setLoading(false);
      }
    }

    async function saveToken() {
      try {
        setLoading(true);
        const response = await (await fetch(
          `https://7270-2001-7d0-843c-1a80-3417-f226-bca8-e94a.ngrok-free.app/wp-json/seatreg/v1/validate-token?api_token=${apiToken}`,
        )).json();
        
        console.log(response);
        if(response.message === 'ok') {
          dispatch({
            type: ACTION_TYPE.ADD_TOKEN_ACTION,
            payload: {
              apiToken: response.apiToken,
              title: 'test'
            }
          });
          navigation.navigate('Home');
        }else {
          alert('Error');
        }

      }catch(error) {
        console.log(error)
        alert('error');
      }finally {
        setLoading(false);
      }
    }

    if(step === STEP_1) {
      return (
        <View style={styles.stepWrap}>
          <Text>Enter site URL</Text>
          <Input
            onChangeText={setSiteURL}
            value={siteURL}
            placeholder='Enter URL'
          />
          <Button title="Next" onPress={validateURL} loading={loading}/>
        </View>
      );
    }

    if(step === STEP_2) {
      return (
        <View style={styles.stepWrap}>
          <Text>Add token</Text>
          <Input
            onChangeText={setApiToken}
            value={apiToken}
            placeholder='Enter API token'
          />
          <View style={styles.buttonRow}>
            <Button title="Back" onPress={() => setStep(STEP_1)} />
            <Button title='Save' onPress={saveToken} loading={loading} />
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  stepWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    columnGap: 16 
  }
});

export default AddToken;