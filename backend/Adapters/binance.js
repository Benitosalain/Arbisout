// Binance Exchange Adapter
import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchBinanceTickers() {
  const url = "https://api.binance.com/api/v3/ticker/price";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance API error: ${res.status}`);
  const data = await res.json();
  // Returns: { BTCUSDT: 105000, ... }
  return Object.fromEntries(data.map(t => [t.symbol, parseFloat(t.price)]));
}

export async function fetchBinanceTicker(symbol) {
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.price);
}

export function binanceSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  // Binance uses "BTCUSDT" format
  return canonical.replace("-", "");
}