import { IConnection } from '../interface';

export function removeNonAlpanumeric(input: string) {
  return input.replace(/\W/g, '');
}
export function getConnectionKey(connectionData: IConnection) {
  const siteUrl = removeNonAlpanumeric(connectionData.siteUrl);

  return `${siteUrl}_${connectionData.apiTokenId}`;
}
