import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchAscendexTickers() {
  const url = "https://ascendex.com/api/pro/v1/ticker";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`AscendEX API error: ${res.status}`);
  const { data } = await res.json();
  return Object.fromEntries(data.map(t => [t.symbol, parseFloat(t.close)]));
}

export async function fetchAscendexTicker(symbol) {
  const url = `https://ascendex.com/api/pro/v1/ticker?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`AscendEX API error: ${res.status}`);
  const { data } = await res.json();
  return parseFloat(data.close);
}

export function ascendexSymbol(standardSymbol) {
  // Always use canonical symbol for migrations like MATIC->POL
  const canonical = canonicalizeSymbol(standardSymbol);
  // AscendEX uses "BASE/QUOTE" format
  return canonical.replace("-", "/");
}