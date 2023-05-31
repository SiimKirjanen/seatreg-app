import { URL } from 'react-native-url-polyfill';

export function isValidHttpsUrl(input: string) {
  let url;

  try {
    url = new URL(input);
  } catch {
    return false;
  }

  return url.protocol === 'https:';
}
