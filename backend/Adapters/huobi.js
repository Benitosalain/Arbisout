// Huobi Exchange Adapter

export async function fetchHuobiTicker(symbol) {
  const url = `https://api.huobi.pro/market/detail/merged?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Huobi API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.tick.close);
}

export function huobiSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "btcusdt"
  return standardSymbol.replace("-", "").toLowerCase();
}