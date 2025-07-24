export async function fetchBybitTickers() {
  const url = "https://api.bybit.com/v5/market/tickers?category=spot";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bybit API error: ${res.status}`);
  const { result } = await res.json();
  return Object.fromEntries(result.list.map(t => [t.symbol, parseFloat(t.lastPrice)]));
}

export async function fetchBybitTicker(symbol) {
  const url = `https://api.bybit.com/v5/market/ticker?category=spot&symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bybit API error: ${res.status}`);
  const { result } = await res.json();
  return parseFloat(result.list[0].lastPrice);
}

export function bybitSymbol(standardSymbol) {
  // Bybit uses "BTCUSDT" format
  return standardSymbol.replace("-", "");
}