// Deribit Adapter (spot and perpetuals)

export async function fetchDeribitTicker(symbol) {
  // Deribit uses "BTC-USD" format for spot, "BTC-PERPETUAL" for perps
  const url = `https://www.deribit.com/api/v2/public/ticker?instrument_name=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Deribit API error: ${res.status}`);
  const data = await res.json();
  return parseFloat(data.result.last_price);
}

export function deribitSymbol(standardSymbol) {
  // Deribit uses "BTC-USD" for spot, "BTC-PERPETUAL" for perps
  return standardSymbol;
}