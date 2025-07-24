// HitBTC Exchange Adapter

export async function fetchHitbtcTicker(symbol) {
  const url = `https://api.hitbtc.com/api/2/public/ticker/${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HitBTC API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.last);
}

export function hitbtcSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "BTCUSDT"
  return standardSymbol.replace("-", "");
}