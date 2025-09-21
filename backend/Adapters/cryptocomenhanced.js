import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchCryptoComEnhancedTicker(symbol) {
  const url = `https://api.crypto.com/v2/public/get-ticker?instrument_name=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Crypto.com API error: ${res.status}`);
  const { result } = await res.json();
  if (result && result.data && result.data.length > 0) {
    return parseFloat(result.data[0].a);
  }
  return null;
}

export function cryptoComEnhancedSymbol(standardSymbol) {
  // The Crypto.com API uses an underscore, e.g., BTC_USDT
  return standardSymbol.replace("-", "_");
}
