export async function fetchLbankTickers() {
  const url = "https://api.lbank.info/v2/ticker.do?symbol=all";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`LBank API error: ${res.status}`);
  const { data } = await res.json();
  return Object.fromEntries(data.ticker.map(t => [t.symbol, parseFloat(t.latest)]));
}

export async function fetchLbankTicker(symbol) {
  const url = `https://api.lbank.info/v2/ticker.do?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`LBank API error: ${res.status}`);
  const { data } = await res.json();
  return parseFloat(data.ticker.latest);
}

export function lbankSymbol(standardSymbol) {
  // LBank uses lowercase, no dash: "btcusdt"
  return standardSymbol.replace("-", "").toLowerCase();
}