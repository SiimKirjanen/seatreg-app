import { Button } from '@rneui/themed';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, View, Text } from 'react-native';

export function SeatRegBarCodeScanner({ barCodeScanned }) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Text style={styles.infoText}>Requesting for camera permission</Text>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.grandPermissionsWrap}>
        <Text style={{ marginBottom: 2, textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 2, textAlign: 'center' }}>Scanning may take a few seconds.</Text>
      <CameraView
        style={styles.camera}
        onBarCodeScanned={barCodeScanned}
        barcodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
        onBarcodeScanned={barCodeScanned}
      />
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
  grandPermissionsWrap: {
    marginBottom: 4,
  },
});
