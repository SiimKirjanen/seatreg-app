import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { STORED_CONNECTIONS, STORED_GLOBAL_CONFIG } from '../../constants';
import { initState } from '../../context/AppContext';
import { IConnection, IGlobalConfig, IStoredConnection, IToken } from '../../interface';
import { getConnectionKey } from '../../utils/strings';
import { secureDeleteItem, secureGetItem, secureSetItem } from './secureStorage';

export async function getGlobalConfig() {
  try {
    const result = await AsyncStorage.getItem(STORED_GLOBAL_CONFIG);

    return result ? JSON.parse(result) : initState.globalConfig;
  } catch (e) {
    alert(e.message);
  }
}

export async function setGlobalConfig(value: IGlobalConfig) {
  try {
    await AsyncStorage.setItem(STORED_GLOBAL_CONFIG, JSON.stringify(value));
  } catch (e) {
    alert(e.message);
  }
}

export async function getStoredApiTokenData() {
  try {
    const storedConnectionsData: IConnection[] = [];
    const storedConnections = await getStoredConnections();

    for (const [key, value] of storedConnections) {
      const result = await secureGetItem(`${key}`);

      if (result) {
        const tokenData: IToken = JSON.parse(result);

        storedConnectionsData.push({
          ...tokenData,
          localNotifications: value.localNotifications,
          siteUrl: value.siteUrl,
          registrationName: value.registrationName,
          bookings: value.bookings,
          requestFailCounter: value.requestFailCounter,
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
      requestFailCounter: connectionData.requestFailCounter,
    });

    await secureSetItem(
      connectionKey,
      JSON.stringify(connectionData)
    );
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

    await secureDeleteItem(`${connectionKey}`);
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
      requestFailCounter: connectionData.requestFailCounter,
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
      await secureDeleteItem(`${key}`);
    }
    await AsyncStorage.removeItem(STORED_CONNECTIONS);
  } catch (e) {
    alert(e.message);
  }
}
