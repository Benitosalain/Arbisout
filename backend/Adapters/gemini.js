import fetch from "node-fetch";

export async function fetchGeminiTicker(symbol) {
  const url = `https://api.gemini.com/v1/pubticker/${symbol}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    }
  });
  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }
  const data = await res.json();
  return parseFloat(data.last);
}

export function geminiSymbol(standardSymbol) {
  return standardSymbol.replace("-", "").toLowerCase(); // BTC-USDT => btcusdt
}
