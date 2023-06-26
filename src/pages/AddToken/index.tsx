import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { StepToken } from './components/StepToken';
import { StepURL } from './components/StepURL';
import { ADD_CONNECTION_STEP_1 } from '../../constants';

function AddToken() {
  const [step, setStep] = useState(ADD_CONNECTION_STEP_1);
  const [siteURL, setSiteURL] = useState(
    'https://b098-2001-7d0-843c-1a80-64c5-cbcf-f747-5ff9.ngrok-free.app'
  );

  if (step === ADD_CONNECTION_STEP_1) {
    return (
      <StepURL parentStyles={styles} siteURL={siteURL} setSiteURL={setSiteURL} setStep={setStep} />
    );
  } else {
    return <StepToken parentStyles={styles} setStep={setStep} siteURL={siteURL} />;
  }
}

const styles = StyleSheet.create({
  stepWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AddToken;
