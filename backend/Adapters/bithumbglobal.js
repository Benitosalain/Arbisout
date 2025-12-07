// Bithumb Global Adapter

export async function fetchBithumbGlobalTicker(symbol) {
  // Bithumb Global uses "BTC-USDT" format
  const url = `https://api.bithumb.com/v1/spot/ticker?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bithumb Global API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.data[0].close);
}

export function bithumbGlobalSymbol(standardSymbol) {
  // Bithumb Global uses "BTC-USDT" format
  return standardSymbol;

}
