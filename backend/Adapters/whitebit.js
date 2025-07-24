export async function fetchWhitebitTickers() {
  const url = "https://whitebit.com/api/v4/public/ticker";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WhiteBIT API error: ${res.status}`);
  const data = await res.json();
  return Object.fromEntries(Object.entries(data).map(([symbol, t]) => [symbol, parseFloat(t.last_price)]));
}

export async function fetchWhitebitTicker(symbol) {
  const url = `https://whitebit.com/api/v4/public/ticker?market=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WhiteBIT API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data[symbol].last_price);
}

export function whitebitSymbol(standardSymbol) {
  // WhiteBIT uses "BTC_USDT"
  return standardSymbol.replace("-", "_");
}