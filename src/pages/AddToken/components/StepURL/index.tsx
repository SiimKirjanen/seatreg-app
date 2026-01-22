import { Input, Button } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { ADD_CONNECTION_STEP_2, SEATREG_REQUIRED_API_VERSION } from '../../../../constants';
import { isValidHttpsUrl } from '../../../../utils/validators';
import { translate } from '../../../../service/translation';

interface Props {
  parentStyles: any;
  setSiteURL: Function;
  siteURL: string;
  setStep: Function;
}

export function StepURL({ parentStyles, setSiteURL, siteURL, setStep }: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setUrl(siteURL);
  }, []);

  const validateURL = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${siteURL}/wp-json/seatreg/v1/echo?seatreg_api=${encodeURIComponent(
          SEATREG_REQUIRED_API_VERSION
        )}`
      );

      if (response.ok) {
        setSiteURL(url);
        setStep(ADD_CONNECTION_STEP_2);
      } else {
        alert(translate(
          'An error occurred: %s. Please try again', 
          'errorMessage',
          response.status
        ));
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
      setIsValid(true);
      setErrorMessage('');
      setSiteURL(input);
    } else {
      setIsValid(false);
      setErrorMessage(translate('Please enter correct HTTPS site URL', 'enterCorrectHttpsUrl'));
    }
  };

  return (
    <View style={parentStyles.stepWrap}>
      <Text style={parentStyles.stepText}>
        {translate('Please enter the root URL of your WordPress site where SeatReg plugin is activated', 'enterWPSiteUrl')}
      </Text>
      <Input
        onChangeText={urlInputChange}
        value={url}
        placeholder={translate('Enter here', 'enterHere')}
        errorMessage={errorMessage}
        inputStyle={parentStyles.inputText}
        inputMode="url"
        autoCapitalize="none"
      />
      <Button title={translate('Next', 'next')} onPress={validateURL} loading={loading} disabled={!isValid} />
    </View>
  );
}
