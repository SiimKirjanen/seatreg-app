import React, { forwardRef } from 'react';
import { Platform } from 'react-native';
import { NatineBarCodeScanner } from './NatineBarCodeScanner';
import { WebBarCodeScanner, WebBarCodeScannerRef } from './WebBarCodeScanner';
import { BarcodeScanningResult } from 'expo-camera';

export interface SeatRegBarCodeScannerRef {
  stop?: () => Promise<void>;
}

interface Props {
  onScan: (value: string) => void;
}

export const SeatRegBarCodeScanner = forwardRef<SeatRegBarCodeScannerRef, Props>(
  ({ onScan }, ref) => {

    if (Platform.OS === 'web') {
      return <WebBarCodeScanner ref={ref as React.Ref<WebBarCodeScannerRef>} onScan={onScan} />;
    }

    return <NatineBarCodeScanner barCodeScanned={(scanningResults: BarcodeScanningResult) => {
        onScan(scanningResults.data);
    }} />;
  }
);