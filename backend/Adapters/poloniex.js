export async function fetchPoloniexTickers() {
  const url = "https://api.poloniex.com/markets/ticker24h";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Poloniex API error: ${res.status}`);
  const data = await res.json();
  return Object.fromEntries(data.map(t => [t.symbol.replace("/", ""), parseFloat(t.last)]));
}

export async function fetchPoloniexTicker(symbol) {
  const url = `https://api.poloniex.com/markets/${symbol}/ticker24h`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Poloniex API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.last);
}

export function poloniexSymbol(standardSymbol) {
  // Poloniex uses "BTC_USDT" or "BTC-USDT"
  return standardSymbol.replace("-", "_");
}