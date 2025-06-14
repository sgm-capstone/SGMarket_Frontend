export function getMainRegion(fullAddress: string): string {
  const tokens = fullAddress.split(" ");
  return tokens.slice(0, 3).join(" ");
}
