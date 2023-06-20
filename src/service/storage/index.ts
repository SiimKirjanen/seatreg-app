import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { STORED_CONNECTIONS } from '../../constants';
import { IConnection, IStoredConnection, IToken } from '../../interface';
import { getConnectionKey } from '../../utils/strings';

export async function getStoredApiTokenData() {
  try {
    const storedConnectionsData: IConnection[] = [];
    const storedConnections = await getStoredConnections();

    for (const [key, value] of storedConnections) {
      const result = await SecureStore.getItemAsync(`${key}`);

      if (result) {
        const tokenData: IToken = JSON.parse(result);

        storedConnectionsData.push({
          ...tokenData,
          localNotifications: value.localNotifications,
          siteUrl: value.siteUrl,
          registrationName: value.registrationName,
          bookings: value.bookings,
        });
      }
    }

    return storedConnectionsData;
  } catch (e) {
    alert(e.message);
  }
}

async function getStoredConnections(): Promise<Map<string, IStoredConnection>> {
  const result = await AsyncStorage.getItem(STORED_CONNECTIONS);

  return result ? new Map(JSON.parse(result)) : new Map();
}

export async function storeApiTokenData(connectionData: IConnection) {
  try {
    const storedConnections = await getStoredConnections();
    const connectionKey = getConnectionKey(connectionData);

    storedConnections.set(connectionKey, {
      localNotifications: connectionData.localNotifications,
      registrationName: connectionData.registrationName,
      siteUrl: connectionData.siteUrl,
      apiTokenId: connectionData.apiTokenId,
      bookings: connectionData.bookings,
    });
    await SecureStore.setItemAsync(`${connectionKey}`, JSON.stringify(connectionData));
    await storeConnections(storedConnections);
  } catch (e) {
    alert(e.message);
  }
}

async function storeConnections(tokenIds: Map<string, IStoredConnection>) {
  const value = JSON.stringify(Array.from(tokenIds));

  await AsyncStorage.setItem(STORED_CONNECTIONS, value);
}

export async function removeConnectionFromStorage(tokenData: IConnection) {
  try {
    const storedConnections = await getStoredConnections();
    const connectionKey = getConnectionKey(tokenData);

    await SecureStore.deleteItemAsync(`${connectionKey}`);

    storedConnections.delete(connectionKey);

    await storeConnections(storedConnections);
  } catch (e) {
    alert(e.message);
  }
}

export async function updateConnection(connectionData: IConnection) {
  try {
    const storedConnections = await getStoredConnections();
    const connectionKey = getConnectionKey(connectionData);

    const storedConnection = storedConnections.get(connectionKey);

    storedConnections.set(connectionKey, {
      ...storedConnection,
      localNotifications: connectionData.localNotifications,
      bookings: connectionData.bookings,
    });

    await storeConnections(storedConnections);
  } catch (e) {
    alert(e.message);
  }
}

export async function clearAllStorage() {
  try {
    const storedConnections = await getStoredConnections();

    for (const [key] of storedConnections) {
      await SecureStore.deleteItemAsync(`${key}`);
    }
    await AsyncStorage.removeItem(STORED_CONNECTIONS);
  } catch (e) {
    alert(e.message);
  }
}
