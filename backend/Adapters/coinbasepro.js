import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchCoinbaseProTickers() {
  const url = "https://api.exchange.coinbase.com/products";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Coinbase Pro API error: ${res.status}`);
  const data = await res.json();
  // You may want to fetch /ticker for each product_id for real prices
  return Object.fromEntries(data.map(t => [t.id, null]));
}

export async function fetchCoinbaseProTicker(symbol) {
  const url = `https://api.exchange.coinbase.com/products/${symbol}/ticker`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Coinbase Pro API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.price);
}

export function coinbaseProSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  // Coinbase Pro uses "BTC-USDT" format
  return canonical;
}