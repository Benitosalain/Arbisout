// Bitmart Adapter

export async function fetchBitmartTicker(symbol) {
  // Bitmart uses "BTC_USDT" format
  const url = `https://api.bitmart.com/v2/ticker?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bitmart API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.ticker.last_price);
}

export function bitmartSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "BTC_USDT"
  return standardSymbol.replace("-", "_");
}