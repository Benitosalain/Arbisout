// XT.com Adapter

export async function fetchXTComTicker(symbol) {
  // XT.com uses "btc_usdt" format
  const url = `https://sapi.xt.com/v4/public/ticker/price?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`XT.com API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.result.price);
}

export function xtcomSymbol(standardSymbol) {
  // Converts "BTC-USDT" to "btc_usdt"
  return standardSymbol.replace("-", "_").toLowerCase();
}