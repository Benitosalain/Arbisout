import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchMexcTickers() {
  const url = "https://api.mexc.com/api/v3/ticker/price";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MEXC API error: ${res.status}`);
  const data = await res.json();
  return Object.fromEntries(data.map(t => [t.symbol, parseFloat(t.price)]));
}

export async function fetchMexcTicker(symbol) {
  const url = `https://api.mexc.com/api/v3/ticker/price?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MEXC API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.price);
}

export function mexcSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  // MEXC uses "BTCUSDT" format
  return canonical.replace("-", "");
}