import { Dialog } from '@rneui/themed';
import React from 'react';

interface Props {
  isVisible: boolean;
  setShowOptions: Function;
  removeToken: Function;
}

export function ConnectionOptions({ isVisible, setShowOptions, removeToken }: Props) {
  return (
    <Dialog isVisible={isVisible} onBackdropPress={() => setShowOptions(false)}>
      <Dialog.Title title="Options" />
      <Dialog.Actions>
        <Dialog.Button title="Remove connection" onPress={() => removeToken()} />
      </Dialog.Actions>
    </Dialog>
  );
}
