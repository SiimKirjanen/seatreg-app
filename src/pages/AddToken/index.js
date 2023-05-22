import { useState } from 'react';
import { Input, Button } from '@rneui/themed';
import { View, Text } from 'react-native';

const STEP_1 = 1;
const STEP_2 = 2;

function AddToken() {
    const [step, setStep] = useState(STEP_1);
    const [siteURL, setSiteURL] = useState('');
    const [loading, setLoading] = useState(false);

    function validateURL() {
      setStep(2);
    }

    function saveToken() {
      setLoading(true);
    }

    if(step === STEP_1) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Enter site URL</Text>
          <Input
            onChangeText={setSiteURL}
            value={siteURL}
            placeholder='Enter'
          />
          <Button title="Next" onPress={validateURL}/>
        </View>
      );
    }

    if(step === STEP_2) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Add token</Text>
          <Input
            onChangeText={setSiteURL}
            value={siteURL}
            placeholder='Enter'
          />
          <View style={{ flexDirection: 'row', columnGap: 16 }}>
            <Button title="Back" onPress={() => setStep(1)} />
            <Button title='Save' onPress={saveToken} loading={loading} />
          </View>
        </View>
      );
  }
}

export default AddToken;