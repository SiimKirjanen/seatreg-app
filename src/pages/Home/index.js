import { View, ScrollView } from 'react-native';
import { ActionWrapper } from '../../components/Actions';
import TokenActions from '../../components/Actions/TokenActions';
import Connection from '../../components/Connection';

function Home() {
  const connections = [
    {
      title: 'Lan',
      id: 1
    },
    {
      title: 'Lan2',
      id: 2
    },
    {
      title: 'Lan3',
      id: 3
    }
  ];
  
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {connections.map((connection) => (
          <Connection key={connection.id} title={connection.title} />
        ))}
      </ScrollView>
      <ActionWrapper>
        <TokenActions />
      </ActionWrapper>
    </View>
  );
}

export default Home;