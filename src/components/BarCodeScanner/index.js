import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function BarCodeScanner({barCodeScanned}) {
  const [type] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if( !permission?.granted ) {
      requestPermission();
    }
  }, [])

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} onBarCodeScanned={barCodeScanned}>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
    },
    camera: {
        width: 400,
        height: 400
    },
    buttonContainer: {
        borderWidth: 1
    }
});
