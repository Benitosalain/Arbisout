// Bitrue Adapter

export async function fetchBitrueTicker(symbol) {
  // Bitrue uses "BTCUSDT" format
  const url = `https://www.bitrue.com/api/v1/ticker/price?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bitrue API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.price);
}

export function bitrueSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "BTCUSDT"
  return standardSymbol.replace("-", "");
}