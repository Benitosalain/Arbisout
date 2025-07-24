import { canonicalizeSymbol } from "../symbol-mapping.js";

// Bitfinex Exchange Adapter

export async function fetchBitfinexTicker(symbol) {
  const url = `https://api-pub.bitfinex.com/v2/ticker/t${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bitfinex API error: ${res.status}`);
  const data = await res.json();
  // data[6] is the last price according to Bitfinex API docs
  return parseFloat(data[6]);
}

export function bitfinexSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  // Converts "BTC-USD" to "BTCUSD"
  return canonical.replace("-", "");
}