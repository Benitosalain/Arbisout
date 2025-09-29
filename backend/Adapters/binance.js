// Binance Spot Exchange Adapter
import { canonicalizeSymbol } from "../symbol-mapping.js";

// Fetch all spot tickers (prices for every symbol)
export async function fetchBinanceTickers() {
  const url = "https://api.binance.com/api/v3/ticker/price";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance API error: ${res.status}`);
  const data = await res.json();

  // Build object like { "BTC-USDT": 65000, "ETH-BTC": 0.055, ... }
  return Object.fromEntries(
    data.map(t => [canonicalizeSymbol(t.symbol), parseFloat(t.price)])
  );
}

// Fetch price for a single symbol (spot only)
export async function fetchBinanceTicker(symbol) {
  const rawSymbol = binanceSymbol(symbol);
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${rawSymbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.price);
}

// Convert canonical symbol (BTC-USDT) to Binance's format (BTCUSDT)
export function binanceSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  return canonical.replace("-", "");
}

// Fetch Binance spot metadata (symbols, filters, etc.)
export async function fetchBinanceExchangeInfo() {
  const url = "https://api.binance.com/api/v3/exchangeInfo";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance API error: ${res.status}`);
  const data = await res.json();

  // Return array of available trading pairs in canonical format
  return data.symbols.map(s => `${s.baseAsset}-${s.quoteAsset}`);
}
