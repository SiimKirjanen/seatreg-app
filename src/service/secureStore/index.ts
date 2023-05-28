import * as SecureStore from 'expo-secure-store';

import { SECURE_STORE_KEY } from "../../constants";
import { IToken } from '../../interface';

export async function getStoredApiTokenData() {
    let result = await SecureStore.getItemAsync(SECURE_STORE_KEY);

    return result ? JSON.parse(result) : [];
}

export async function storeApiTokenData(tokenData: IToken) {
    const storedTokens = await getStoredApiTokenData();
    const combined = JSON.stringify([...storedTokens, tokenData]);

    await SecureStore.setItemAsync(SECURE_STORE_KEY, combined);
}