import { useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import TokenActions from '../../components/Actions/TokenActions';
import Connection from '../../components/Connection';
import { ConnectionOptions } from '../../components/ConnectionOptions';
import { AppContext } from '../../context/AppContextProvider';

function Home() {
  const { state } = useContext(AppContext);
  const [showOptions, setShowOptions] = useState(false);

  const onOptionsPress = (tokenData) => {
    setShowOptions(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {state?.tokenData.map((token, i) => (
          <Connection key={i} tokenData={token} optionsPress={onOptionsPress} />
        ))}
      </ScrollView>
      <ActionWrapper>
        <TokenActions />
      </ActionWrapper>
      <ConnectionOptions isVisible={showOptions} setShowOptions={setShowOptions} />
    </View>
  );
}

export default Home;
