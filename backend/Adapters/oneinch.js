import { canonicalizeSymbol } from "../symbol-mapping.js";

export async function fetchOneInchPrice(symbol, chainId = 1) {
  // chainId: 1 = Ethereum, 56 = BNB, 137 = Polygon, etc.
  const [base, quote] = symbol.split("-");
  const url = `https://api.1inch.dev/swap/v5.2/${chainId}/quote?src=${base}&dst=${quote}&amount=1000000000000000000`;
  const res = await fetch(url, {
    headers: { Authorization: "Bearer YOUR_1INCH_API_KEY" }
  });
  if (!res.ok) throw new Error(`1inch API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.toTokenAmount) / 1e6; // Adjust decimals as needed
}

export function oneInchSymbol(standardSymbol) {
  const canonical = canonicalizeSymbol(standardSymbol);
  return canonical;
}