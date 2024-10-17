import { Camera, CameraType } from 'expo-camera/legacy';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export function BarCodeScanner({ barCodeScanned }) {
  const [type] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} onBarCodeScanned={barCodeScanned} />
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
});
