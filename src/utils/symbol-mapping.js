export const SYMBOL_MAP = {
  'Binance': {
    'BTC-USDT': 'BTCUSDT',
    'ETH-USDT': 'ETHUSDT',
    'ETH-BTC':  'ETHBTC',      // <-- ADD THIS LINE
    'LTC-USDT': 'LTCUSDT',
    'XRP-USDT': 'XRPUSDT',
    'ADA-USDT': 'ADAUSDT',
    'SOL-USDT': 'SOLUSDT',
    'DOT-USDT': 'DOTUSDT',
    'DOGE-USDT': 'DOGEUSDT',
    'MATIC-USDT': 'MATICUSDT',
  },
  'Kraken': {
    'BTC-USDT': 'XXBTZUSD',   // Only USD, not USDT
    'ETH-USDT': 'XETHZUSD',
    'ETH-BTC':  'XETHXXBT',   // <-- ADD THIS LINE (Kraken uses XETHXXBT)
    'LTC-USDT': 'XLTCZUSD',
    'XRP-USDT': 'XXRPZUSD',
    'ADA-USDT': 'ADAUSD',
    'SOL-USDT': 'SOLUSD',
    'DOT-USDT': 'DOTUSD',
    'DOGE-USDT': 'DOGEUSD',
  },
  'Bitfinex': {
    'BTC-USDT': 'BTCUSD',
    'ETH-USDT': 'ETHUSD',
    'ETH-BTC':  'ETHBTC',     // <-- ADD THIS LINE
    'LTC-USDT': 'LTCUSD',
    'XRP-USDT': 'XRPUSD',
    'ADA-USDT': 'ADAUSD',
    'SOL-USDT': 'SOLUSD',
    'DOT-USDT': 'DOTUSD',
  },
  'Huobi': {
    'BTC-USDT': 'btcusdt',
    'ETH-USDT': 'ethusdt',
    'ETH-BTC':  'ethbtc',     // <-- ADD THIS LINE
    'LTC-USDT': 'ltcusdt',
    'XRP-USDT': 'xrpusdt',
    'ADA-USDT': 'adausdt',
    'SOL-USDT': 'solusdt',
    'DOT-USDT': 'dotusdt',
    'DOGE-USDT': 'dogeusdt',
  },
  'OKEx': {
    'BTC-USDT': 'BTC-USDT',
    'ETH-USDT': 'ETH-USDT',
    'ETH-BTC':  'ETH-BTC',    // <-- ADD THIS LINE
    'LTC-USDT': 'LTC-USDT',
    'XRP-USDT': 'XRP-USDT',
    'ADA-USDT': 'ADA-USDT',
    'SOL-USDT': 'SOL-USDT',
    'DOT-USDT': 'DOT-USDT',
    'DOGE-USDT': 'DOGE-USDT',
  },
  'Gate.io': {
    'BTC-USDT': 'BTC_USDT',
    'ETH-USDT': 'ETH_USDT',
    'ETH-BTC':  'ETH_BTC',    // <-- ADD THIS LINE
    'LTC-USDT': 'LTC_USDT',
    'XRP-USDT': 'XRP_USDT',
    'ADA-USDT': 'ADA_USDT',
    'SOL-USDT': 'SOL_USDT',
    'DOT-USDT': 'DOT_USDT',
    'DOGE-USDT': 'DOGE_USDT',
  },
  'KuCoin': {
    'BTC-USDT': 'BTC-USDT',
    'ETH-USDT': 'ETH-USDT',
    'ETH-BTC':  'ETH-BTC',    // <-- ADD THIS LINE
    'LTC-USDT': 'LTC-USDT',
    'XRP-USDT': 'XRP-USDT',
    'ADA-USDT': 'ADA-USDT',
    'SOL-USDT': 'SOL-USDT',
    'DOT-USDT': 'DOT-USDT',
    'DOGE-USDT': 'DOGE-USDT',
  },
  'Bitstamp': {
    'BTC-USDT': 'btcusd',
    'ETH-USDT': 'ethusd',
    'ETH-BTC':  'ethbtc',     // <-- ADD THIS LINE
    'LTC-USDT': 'ltcusd',
    'XRP-USDT': 'xrpusd',
    'ADA-USDT': 'adausd',
    'SOL-USDT': 'solusd',
    'DOT-USDT': 'dotusd',
    'DOGE-USDT': 'dogeusd',
    'MATIC-USDT': 'maticusd',
  },
  'Gemini': {
    'BTC-USDT': 'btcusd',
    'ETH-USDT': 'ethusd',
    'ETH-BTC':  'ethbtc',     // <-- ADD THIS LINE
    'LTC-USDT': 'ltcusd',
    'XRP-USDT': 'xrpusd',
    'DOT-USDT': 'dotusd',
    'DOGE-USDT': 'dogeusd',
    'MATIC-USDT': 'maticusd',
  },
  'HitBTC': {
    'BTC-USDT': 'BTCUSDT',
    'ETH-USDT': 'ETHUSDT',
    'ETH-BTC':  'ETHBTC',     // <-- ADD THIS LINE
    'LTC-USDT': 'LTCUSDT',
    'XRP-USDT': 'XRPUSDT',
    'ADA-USDT': 'ADAUSDT',
    'SOL-USDT': 'SOLUSDT',
    'DOT-USDT': 'DOTUSDT',
    'DOGE-USDT': 'DOGEUSDT',
  },
  'CoinEx': {
    'BTC-USDT': 'BTCUSDT',
    'ETH-USDT': 'ETHUSDT',
    'ETH-BTC':  'ETHBTC',     // <-- ADD THIS LINE
    'LTC-USDT': 'LTCUSDT',
    'XRP-USDT': 'XRPUSDT',
    'ADA-USDT': 'ADAUSDT',
    'SOL-USDT': 'SOLUSDT',
    'DOT-USDT': 'DOTUSDT',
    'DOGE-USDT': 'DOGEUSDT',
  },
  // ...repeat for all other exchanges you want to support
};

export const SYMBOL_ALIASES = {
  "MATIC": "POL",
  "LUNA": "LUNC",
  // Add more as needed
};

export function canonicalizeSymbol(symbol) {
  const [base, quote] = symbol.split("-");
  const baseAlias = SYMBOL_ALIASES[base] || base;
  const quoteAlias = SYMBOL_ALIASES[quote] || quote;
  return `${baseAlias}-${quoteAlias}`;
}