import { Input, Button } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { isValidHttpsUrl } from '../../../../utils/validators';
import { STEP_2 } from '../../../AddToken';

interface Props {
  wrapStyles: any;
  setSiteURL: Function;
  siteURL: string;
  setStep: Function;
}

export function StepURL({ wrapStyles, setSiteURL, siteURL, setStep }: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrl(siteURL);
  }, []);

  const validateURL = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${siteURL}/wp-json/seatreg/v1/echo`);

      if (response.ok) {
        setSiteURL(url);
        setStep(STEP_2);
      } else {
        alert('Request failed');
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const urlInputChange = (input: string) => {
    setUrl(input);

    if (isValidHttpsUrl(input)) {
      setErrorMessage('');
      setSiteURL(input);
    } else {
      setErrorMessage('Please enter correct HTTPS site URL');
    }
  };

  return (
    <View style={wrapStyles}>
      <Text>Enter site URL</Text>
      <Input
        onChangeText={urlInputChange}
        value={url}
        placeholder="Enter here"
        errorMessage={errorMessage}
      />
      <Button title="Next" onPress={validateURL} loading={loading} />
    </View>
  );
}
