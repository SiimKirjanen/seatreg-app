import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { StepToken } from './components/StepToken';
import { StepURL } from './components/StepURL';

export const STEP_1 = 1;
export const STEP_2 = 2;

function AddToken() {
  const [step, setStep] = useState(STEP_1);
  const [siteURL, setSiteURL] = useState(
    'https://62f0-2001-7d0-843c-1a80-2152-f535-fa32-48a4.ngrok-free.app'
  );

  if (step === STEP_1) {
    return (
      <StepURL
        wrapStyles={styles.stepWrap}
        siteURL={siteURL}
        setSiteURL={setSiteURL}
        setStep={setStep}
      />
    );
  } else {
    return <StepToken wrapStyles={styles.stepWrap} setStep={setStep} siteURL={siteURL} />;
  }
}

const styles = StyleSheet.create({
  stepWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddToken;
