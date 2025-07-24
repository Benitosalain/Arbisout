// KuCoin Exchange Adapter

export async function fetchKucoinTicker(symbol) {
  const url = `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`KuCoin API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.data.price);
}

export function kucoinSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "BTC-USDT"
  return standardSymbol;
}