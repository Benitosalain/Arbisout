import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchSushiSwapPrice(symbol) {
  // 1inch aggregator API for SushiSwap (chainId 1)
  const [base, quote] = symbol.split("-");
  const url = `https://api.1inch.dev/swap/v5.2/1/quote?src=${base}&dst=${quote}&amount=1000000000000000000`;
  const res = await fetch(url, {
    headers: { Authorization: "Bearer YOUR_1INCH_API_KEY" }
  });
  if (!res.ok) throw new Error(`1inch API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.toTokenAmount) / 1e6; // Adjust decimals as needed
}

export function sushiSwapSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  return canonical;
}