export async function fetchBitgetTickers() {
  const url = "https://api.bitget.com/api/spot/v1/market/tickers";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bitget API error: ${res.status}`);
  const { data } = await res.json();
  return Object.fromEntries(data.map(t => [t.symbol, parseFloat(t.close)]));
}

export async function fetchBitgetTicker(symbol) {
  const url = `https://api.bitget.com/api/spot/v1/market/ticker?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bitget API error: ${res.status}`);
  const { data } = await res.json();
  return parseFloat(data.close);
}

export function bitgetSymbol(standardSymbol) {
  // Bitget uses "BTCUSDT" format
  return standardSymbol.replace("-", "");
}