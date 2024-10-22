import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export function SeatRegBarCodeScanner({ barCodeScanned }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text style={styles.infoText}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.infoText}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner style={styles.camera} onBarCodeScanned={barCodeScanned} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginBottom: 12,
  },
  camera: {
    width: 'auto',
    height: 300,
  },
  buttonContainer: {
    borderWidth: 1,
  },
  infoText: {
    marginBottom: 4,
  },
});
