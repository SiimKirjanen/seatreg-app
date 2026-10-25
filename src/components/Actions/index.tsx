import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ActionWrapper({ children }) {
  // Android draws edge-to-edge, so keep the actions above the system navigation bar
  const { bottom } = useSafeAreaInsets();

  return <View style={[styles.container, { paddingBottom: 10 + bottom }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
});
