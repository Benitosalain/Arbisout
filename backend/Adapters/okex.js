// OKEx Exchange Adapter

export async function fetchOKExTicker(symbol) {
  const url = `https://www.okx.com/api/v5/market/ticker?instId=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OKEx API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.data[0].last);
}

export function okexSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "BTC-USDT"
  return standardSymbol;
}