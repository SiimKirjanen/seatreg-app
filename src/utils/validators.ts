export function isValidHttpsUrl(input: string) {
  try {
    const url = new URL(input);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}