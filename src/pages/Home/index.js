import { useContext } from 'react';
import { View, ScrollView } from 'react-native';

import { ActionWrapper } from '../../components/Actions';
import TokenActions from '../../components/Actions/TokenActions';
import Connection from '../../components/Connection';
import { AppContext } from '../../context/AppContextProvider';

function Home() {
  const { state } = useContext(AppContext);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {state?.apiTokens.map((token, i) => (
          <Connection key={i} title={token.title} apiToken={token.apiToken} siteUrl={token.siteUrl} />
        ))}
      </ScrollView>
      <ActionWrapper>
        <TokenActions />
      </ActionWrapper>
    </View>
  );
}

export default Home;