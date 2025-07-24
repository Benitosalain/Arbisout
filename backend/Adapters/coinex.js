// CoinEx Exchange Adapter

export async function fetchCoinexTicker(symbol) {
  const url = `https://api.coinex.com/v1/market/ticker?market=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinEx API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.data.ticker.last);
}

export function coinexSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "BTCUSDT"
  return standardSymbol.replace("-", "");
}