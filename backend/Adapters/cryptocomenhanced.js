export async function fetchCryptoComTickers() {
  const url = "https://api.crypto.com/v2/public/get-ticker";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Crypto.com API error: ${res.status}`);
  const { result } = await res.json();
  return Object.fromEntries(result.data.map(t => [t.i, parseFloat(t.a)]));
}

export async function fetchCryptoComTicker(symbol) {
  const url = `https://api.crypto.com/v2/public/get-ticker?instrument_name=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Crypto.com API error: ${res.status}`);
  const { result } = await res.json();
  return parseFloat(result.data[0].a);
}

export function cryptoComSymbol(standardSymbol) {
  // Crypto.com uses "BTC_USDT"
  return standardSymbol.replace("-", "_");
}
