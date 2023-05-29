import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { SECURE_STORE_KEY, STORED_API_TOKEN_IDS } from '../../constants';
import { IToken } from '../../interface';

export async function getStoredApiTokenData() {
  try {
    const storedApiTokenData = [];
    const tokenIds = await getStoredApiTokenIds();

    for (const tokenId of tokenIds) {
      const result = await SecureStore.getItemAsync(`${SECURE_STORE_KEY}_${tokenId}`);
      if (result) {
        storedApiTokenData.push(JSON.parse(result));
      }
    }

    return storedApiTokenData;
  } catch (e) {
    alert(e.message);
  }
}

export async function getStoredApiTokenIds() {
  const result = await AsyncStorage.getItem(STORED_API_TOKEN_IDS);

  return result ? new Set(JSON.parse(result)) : new Set();
}

export async function storeApiTokenIds(tokenIds) {
  const value = JSON.stringify(Array.from(tokenIds));

  await AsyncStorage.setItem(STORED_API_TOKEN_IDS, value);
}

export async function storeApiTokenData(tokenData: IToken) {
  try {
    const tokenIdsSet = await getStoredApiTokenIds();

    tokenIdsSet.add(tokenData.apiTokenId);
    await SecureStore.setItemAsync(
      `${SECURE_STORE_KEY}_${tokenData.apiTokenId}`,
      JSON.stringify(tokenData)
    );
    await storeApiTokenIds(tokenIdsSet);
  } catch (e) {
    alert(e.message);
  }
}

export async function removeStoredApiIds() {
  await AsyncStorage.removeItem(STORED_API_TOKEN_IDS);
}
