import { Html5Qrcode } from 'html5-qrcode';
import React, { useEffect, useImperativeHandle, useRef, forwardRef, useState } from 'react';

export interface WebBarCodeScannerRef {
  stop: () => Promise<void>;
}

interface Props {
  onScan: (value: string) => void;
}

export const WebBarCodeScanner = forwardRef<WebBarCodeScannerRef, Props>(
  ({ onScan }, ref) => {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const elementId = 'html5-qr-code';

    useImperativeHandle(ref, () => ({
      async stop() {
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop();
          } catch {}
          scannerRef.current.clear();
          scannerRef.current = null;
        }
      },
    }));

    useEffect(() => {
      const scanner = new Html5Qrcode(elementId);
      scannerRef.current = scanner;

      scanner
        .start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: null },
          async (decodedText) => {
            await scanner.stop();
            scanner.clear();
            scannerRef.current = null;
            onScan(decodedText);
          },
          () => {}
        )
        .catch((err) => {
          console.error(err);
          
          if (err.name === 'NotFoundError') {
            setErrorMessage(
              'No camera was found. Please connect a camera or use a different device.'
            );
          } else if (err.name === 'NotAllowedError') {
            setErrorMessage(
              'Camera access was denied. Please allow camera permissions.'
            );
          } else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            setErrorMessage(
              'Camera access requires HTTPS.'
            );
          } else {
            setErrorMessage(
              'Unable to start the camera. Please try again.'
            );
          }
        });

      return () => {};
    }, [onScan]);

    if(errorMessage) {
       return <div style={{ color: 'red', textAlign: 'center', padding: '8px' }}>
          {errorMessage}
        </div>
    }

    return <div id={elementId} />;
  }
);
