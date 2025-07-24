import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchUniswapPrice(symbol) {
  // 1inch aggregator API for Uniswap v2/v3 price quotes
  // symbol: "ETH-USDT" → "ETH" and "USDT"
  const [base, quote] = symbol.split("-");
  const url = `https://api.1inch.dev/swap/v5.2/1/quote?src=${base}&dst=${quote}&amount=1000000000000000000`;
  const res = await fetch(url, {
    headers: { Authorization: "Bearer YOUR_1INCH_API_KEY" }
  });
  if (!res.ok) throw new Error(`1inch API error: ${res.status}`);
  const data = await res.json();
  // Return price per 1 base token in quote token
  return parseFloat(data.toTokenAmount) / 1e6; // Adjust decimals as needed
}

export function uniswapSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  return canonical;
}