import { View, ScrollView } from 'react-native';
import { ActionWrapper } from '../../components/Actions';
import TokenActions from '../../components/Actions/TokenActions';
import Connection from '../../components/Connection';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContextProvider';

function Home() {
  const {state} = useContext(AppContext);
  console.log('Home state', state);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {state?.apiTokens.map((token, i) => (
          <Connection key={i} title={token.title} />
        ))}
      </ScrollView>
      <ActionWrapper>
        <TokenActions />
      </ActionWrapper>
    </View>
  );
}

export default Home;