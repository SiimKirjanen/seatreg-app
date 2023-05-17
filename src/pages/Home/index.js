import { View, Text, ScrollView } from 'react-native';
import BottomAction from '../../components/BottomAction';
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
      <BottomAction />
    </View>
  );
}

export default Home;