export async function fetchPhemexTickers() {
  const url = "https://api.phemex.com/md/spot/ticker/24hr/all";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Phemex API error: ${res.status}`);
  const { data } = await res.json();
  return Object.fromEntries(data.map(t => [t.symbol, parseFloat(t.lastEp) / 1e8]));
}

export async function fetchPhemexTicker(symbol) {
  const url = `https://api.phemex.com/md/spot/ticker/24hr?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Phemex API error: ${res.status}`);
  const { data } = await res.json();
  return parseFloat(data.lastEp) / 1e8;
}

export function phemexSymbol(standardSymbol) {
  // Phemex uses "BTCUSDT"
  return standardSymbol.replace("-", "");
}