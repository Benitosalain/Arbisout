export async function fetchProbitTickers() {
  const url = "https://api.probit.com/api/exchange/v1/ticker";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`ProBit API error: ${res.status}`);
  const { data } = await res.json();
  return Object.fromEntries(data.map(t => [t.market_id.replace("-", ""), parseFloat(t.last)]));
}

export async function fetchProbitTicker(symbol) {
  const url = `https://api.probit.com/api/exchange/v1/ticker?market_ids=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`ProBit API error: ${res.status}`);
  const { data } = await res.json();
  return parseFloat(data[0].last);
}

export function probitSymbol(standardSymbol) {
  // ProBit uses "BTC-USDT"
  return standardSymbol;
}