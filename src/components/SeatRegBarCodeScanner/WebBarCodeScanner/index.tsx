import { Html5Qrcode } from 'html5-qrcode';
import React, { useEffect, useImperativeHandle, useRef, forwardRef, useState } from 'react';
import { translate } from '../../../service/translation';

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
              translate(
                'No camera was found. Please connect a camera or use a different device.',
                'cameraNotFound'
              )
            );
          } else if (err.name === 'NotAllowedError') {
            setErrorMessage(
               translate(
                'Camera access was denied. Please allow camera permissions.',
                'cameraAccessDenied'
              )
            );
          } else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            setErrorMessage(
              translate(
                'Camera access requires HTTPS.',
                'cameraRequiresHttps'
              )
            );
          } else {
            setErrorMessage(
              translate(
                'Unable to start the camera. Please try again.',
                'cameraStartFailed'
              )
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
