import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import TokenActions from '../../components/Actions/TokenActions';
import Connection from '../../components/Connection';
import { ConnectionOptions } from '../../components/ConnectionOptions';
import { SEATREG_GREEN } from '../../constants';
import { AppContext } from '../../context/AppContext';
import { IConnection } from '../../interface';
import { getConnectionKey } from '../../utils/strings';
import { translate } from '../../service/translation';

function Connections({ optionsPress }) {
  const { state } = useContext(AppContext);

  if (state.initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 6 }}>{translate('Initializing', 'initializing')}</Text>
        <ActivityIndicator size="large" color={SEATREG_GREEN} />
      </View>
    );
  }

  if (state?.connectionData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{translate('No connections', 'noConnections')}</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {state?.connectionData.map((token, i) => (
        <Connection key={i} tokenData={token} optionsPress={optionsPress} />
      ))}
    </ScrollView>
  );
}

function Home() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [activeOptionConnectionKey, setActiveOptionConnectionKey] = useState<null | string>(null);

  const openOptions = (tokenData: IConnection) => {
    setActiveOptionConnectionKey(getConnectionKey(tokenData));
    setShowOptions(true);
  };

  const closeOptions = () => {
    setShowOptions(false);
    setActiveOptionConnectionKey(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <Connections optionsPress={openOptions} />
      <ActionWrapper>
        <TokenActions />
      </ActionWrapper>
      <ConnectionOptions
        isVisible={showOptions}
        closeOptions={closeOptions}
        activeOptionConnectionKey={activeOptionConnectionKey}
      />
    </View>
  );
}

export default Home;
