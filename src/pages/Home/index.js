import { useContext, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import TokenActions from '../../components/Actions/TokenActions';
import Connection from '../../components/Connection';
import { ConnectionOptions } from '../../components/ConnectionOptions';
import { AppContext } from '../../context/AppContextProvider';

function Connections({ optionsPress }) {
  const { state } = useContext(AppContext);

  if (state?.connectionData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No connections</Text>
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
  const [showOptions, setShowOptions] = useState(false);

  const onOptionsPress = (tokenData) => {
    setShowOptions(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Connections optionsPress={onOptionsPress} />
      <ActionWrapper>
        <TokenActions />
      </ActionWrapper>
      <ConnectionOptions isVisible={showOptions} setShowOptions={setShowOptions} />
    </View>
  );
}

export default Home;
