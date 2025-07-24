// Kraken Exchange Adapter

// Map standard symbols to Kraken format
const KRAKEN_MAP = {
  "BTC-USDT": "XXBTZUSD",
  "ETH-USDT": "XETHZUSD",
  "LTC-USDT": "XLTCZUSD",
  "SOL-USDT": "SOLUSD",
  "XRP-USDT": "XXRPZUSD",
  "DOGE-USDT": "DOGEUSD",
  "ADA-USDT": "ADAUSD",
  "DOT-USDT": "DOTUSD"
};

export function krakenSymbol(standardSymbol) {
  return KRAKEN_MAP[standardSymbol] || null;
}

export async function fetchKrakenTicker(symbol) {
  // symbol is Kraken-format, e.g. XXBTZUSD
  const url = `https://api.kraken.com/0/public/Ticker?pair=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Kraken API error: ${res.status}`);
  const data = await res.json();
  const key = Object.keys(data.result)[0];
  return parseFloat(data.result[key].c[0]);
}

export async function fetchKrakenTickers() {
  // Fetch all supported pairs and prices (limited by Kraken API)
  // For simplicity, you can fetch individually as above for now
  return null;
}