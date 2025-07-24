// Gate.io Exchange Adapter
import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchGateioTicker(symbol) {
  const url = `https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Gate.io API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data[0].last);
}

export function gateioSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  // Gate.io uses "BTC_USDT" format
  return canonical.replace("-", "_");
}