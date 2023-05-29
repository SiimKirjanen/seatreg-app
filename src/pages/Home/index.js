import { useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { ActionWrapper } from '../../components/Actions';
import TokenActions from '../../components/Actions/TokenActions';
import Connection from '../../components/Connection';
import { ConnectionOptions } from '../../components/ConnectionOptions';
import { AppContext } from '../../context/AppContextProvider';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { remoteApiTokenFromStorage } from '../../service/secureStore';

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [showOptions, setShowOptions] = useState(false);
  const [activeToken, setActiveToken] = useState(null);
  const toast = useToast();

  const onOptionsPress = (tokenData) => {
    setActiveToken(tokenData);
    setShowOptions(true);
  };

  const onRemoveToken = async () => {
    await remoteApiTokenFromStorage(activeToken);
    console.log('rem');
    dispatch({ type: ACTION_TYPE.REMOVE_TOKEN_ACTION, payload: activeToken });
    setShowOptions(false);
    setActiveToken(false);
    toast.show('Connection removed', {
      type: 'success',
    });
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
      <ConnectionOptions
        isVisible={showOptions}
        setShowOptions={setShowOptions}
        removeToken={onRemoveToken}
      />
    </View>
  );
}

export default Home;
