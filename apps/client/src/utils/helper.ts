export function isValidUrl(string: string) {
  try {
    const data = new URL(string);
    return !!data;
  } catch (err) {
    return false;
  }
}
