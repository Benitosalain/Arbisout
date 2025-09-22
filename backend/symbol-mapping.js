// Only use for exceptions/aliases (e.g., POL-USDT → MATICUSDT on Binance)
export const pricesByExchange = {
  Binance: {
    // Example alias:
    'POL-USDT': 'MATICUSDT',
    // Add more aliases as needed
  },
  Kraken: {},         // Uses normalizeKraken
  Bitfinex: {},       // Uses normalizeBitfinex
  Huobi: {},          // Uses normalizeHuobi
  OKEx: {},
  Gateio: {},
  KuCoin: {},
  Coinbase: {},
  Bitrue: {},
  BithumbGlobal: {},
  Bitmart: {},
  XTcom: {},
  Deribit: {},
  CryptoComEnhanced: {},
  AscendEX: {},
  BinanceUS: {},
  Bitstamp: {},
  CoinbasePro: {},
  CryptoCom: {},
  Gemini: {},
  HitBTC: {},
  LBANK: {},
  OneInch: {},
  PancakeSwap: {},
  Phemex: {},
  Poloniex: {},
  Probit: {},
  SushiSwap: {},
  Uniswap: {},
  WhiteBIT: {},
  MEXC: {},
  Bitget: {},
  Bybit: {},
};

// =====================
// Symbol Normalizers
// =====================

// Kraken: e.g. XXBTZUSD → BTC-USD
export function normalizeKraken(rawSymbol) {
  // Spot: XXBTZUSD, XETHZUSD, XLTCZUSD, etc.
  // Futures: XBTUSD, ETHUSD, etc.
  // Map XBT → BTC, XETH → ETH, etc.
  let s = rawSymbol
    .replace(/^XBT/, "BTC")
    .replace(/^XETH/, "ETH")
    .replace(/^X/, "")
    .replace(/^Z/, "");
  // Find quote
  const match = s.match(/([A-Z]+)(USD|USDT|EUR|GBP|JPY)$/);
  if (!match) return null;
  const base = match[1];
  const quote = match[2];
  return `${base}-${quote}`;
}

// Bitfinex: e.g. tBTCUSD → BTC-USD, tETHBTC → ETH-BTC
export function normalizeBitfinex(rawSymbol) {
  // Only process symbols starting with 't'
  if (!rawSymbol.startsWith("t")) return null;
  // Some pairs are 6 chars, some are longer (e.g. tDOGE:USD)
  const pair = rawSymbol.slice(1);
  if (pair.length === 6) {
    const base = pair.slice(0, 3);
    const quote = pair.slice(3);
    return `${base}-${quote}`;
  }
  // Handle longer pairs (e.g. tDOGE:USD)
  const [base, quote] = pair.split(":");
  if (base && quote) return `${base}-${quote}`;
  return null;
}

// Huobi: e.g. btcusdt → BTC-USDT, ethbtc → ETH-BTC
export function normalizeHuobi(rawSymbol) {
  // Most are 6 chars, but some can be longer (e.g. btcusdt, ethbtc, etc.)
  if (rawSymbol.length < 6) return null;
  // Try to split at last 4 chars (usdt, btc, etc.)
  const quote = rawSymbol.slice(-4).toUpperCase();
  const base = rawSymbol.slice(0, rawSymbol.length - 4).toUpperCase();
  return `${base}-${quote}`;
}

// =====================
// Canonicalizer (optional utility)
// =====================

// Converts any symbol to canonical "BASE-QUOTE" (e.g., btcusdt → BTC-USDT)
export function canonicalizeSymbol(symbol) {
  if (!symbol) return null;
  // Already canonical
  if (symbol.includes("-")) return symbol.toUpperCase();
  // Try to split at common quote suffixes
  const QUOTES = ["USDT", "USDC", "USD", "BTC", "ETH", "BNB", "EUR", "GBP", "JPY"];
  for (const q of QUOTES) {
    if (symbol.toUpperCase().endsWith(q)) {
      const base = symbol.slice(0, -q.length).toUpperCase();
      return `${base}-${q}`;
    }
  }
  return symbol.toUpperCase();
}
