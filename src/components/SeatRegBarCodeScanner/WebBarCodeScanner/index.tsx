import { Html5Qrcode } from 'html5-qrcode';
import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';

export interface WebBarCodeScannerRef {
  stop: () => Promise<void>;
}

interface Props {
  onScan: (value: string) => void;
}

export const WebBarCodeScanner = forwardRef<WebBarCodeScannerRef, Props>(
  ({ onScan }, ref) => {
    const scannerRef = useRef<Html5Qrcode | null>(null);
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
        .catch(console.error);

      return () => {};
    }, [onScan]);

    return <div id={elementId} />;
  }
);
