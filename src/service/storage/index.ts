import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { SECURE_STORE_KEY, STORED_CONNECTIONS } from '../../constants';
import { IConnection, IToken } from '../../interface';

export async function getStoredApiTokenData() {
  try {
    const storedConnectionsData: IConnection[] = [];
    const storedConnections = await getStoredConnections();

    for (const [key, value] of storedConnections) {
      const result = await SecureStore.getItemAsync(`${SECURE_STORE_KEY}_${key}`);

      if (result) {
        const tokenData = JSON.parse(result);

        storedConnectionsData.push({ ...tokenData, pushNotifications: value.pushNotifications });
      }
    }

    return storedConnectionsData;
  } catch (e) {
    alert(e.message);
  }
}

async function getStoredConnections() {
  const result = await AsyncStorage.getItem(STORED_CONNECTIONS);

  return result ? new Map<string, IConnection>(JSON.parse(result)) : new Map();
}

export async function storeApiTokenData(tokenData: IToken) {
  try {
    const storedConnections = await getStoredConnections();

    storedConnections.set(tokenData.apiTokenId, {
      pushNotifications: false,
    });
    await SecureStore.setItemAsync(
      `${SECURE_STORE_KEY}_${tokenData.apiTokenId}`,
      JSON.stringify(tokenData)
    );
    await storeConnections(storedConnections);
  } catch (e) {
    alert(e.message);
  }
}

async function storeConnections(tokenIds) {
  const value = JSON.stringify(Array.from(tokenIds));

  await AsyncStorage.setItem(STORED_CONNECTIONS, value);
}

export async function removeApiTokenFromStorage(tokenData: IToken) {
  try {
    const storedConnections = await getStoredConnections();

    await SecureStore.deleteItemAsync(`${SECURE_STORE_KEY}_${tokenData.apiTokenId}`);

    storedConnections.delete(tokenData.apiTokenId);

    await storeConnections(storedConnections);
  } catch (e) {
    alert(e.message);
  }
}

export async function clearAllStorage() {
  try {
    const tokenIdsSet = await getStoredConnections();

    for (const tokenId of tokenIdsSet) {
      await SecureStore.deleteItemAsync(`${SECURE_STORE_KEY}_${tokenId}`);
    }
    await AsyncStorage.removeItem(STORED_CONNECTIONS);
  } catch (e) {
    alert(e.message);
  }
}
