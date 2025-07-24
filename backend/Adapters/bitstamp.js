// Bitstamp Exchange Adapter

export async function fetchBitstampTicker(symbol) {
  const url = `https://www.bitstamp.net/api/v2/ticker/${symbol}/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bitstamp API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.last);
}

export function bitstampSymbol(standardSymbol) {
  // Converts "BTC-USD" to "btcusd"
  return standardSymbol.replace("-", "").toLowerCase();
}