export async function fetchBinanceUSTickers() {
  const url = "https://api.binance.us/api/v3/ticker/price";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance US API error: ${res.status}`);
  const data = await res.json();
  return Object.fromEntries(data.map(t => [t.symbol, parseFloat(t.price)]));
}

export async function fetchBinanceUSTicker(symbol) {
  const url = `https://api.binance.us/api/v3/ticker/price?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance US API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.price);
}

export function binanceUSSymbol(standardSymbol) {
  // Binance US uses "BTCUSDT"
  return standardSymbol.replace("-", "");
}