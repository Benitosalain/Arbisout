import { pricesByExchange } from "./symbol-mapping.js";

export const EXCHANGES = [
  {
    name: 'Binance',
    api: 'https://api.binance.com/api/v3/ticker/price?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'POL-USDT', // <-- migrated from MATIC-USDT
      'SHIB-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'XMR-USDT', 'WBTC-USDT', 'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'SAND-USDT',
      'APE-USDT', 'GRT-USDT', 'ETC-USDT', 'NEAR-USDT', 'EGLD-USDT', 'ZEC-USDT', 'STX-USDT', 'ALGO-USDT',
      'SNX-USDT', 'RUNE-USDT', 'MKR-USDT', 'CRV-USDT', 'DYDX-USDT', 'LDO-USDT', '1INCH-USDT', 'COMP-USDT',
      // Cross-asset for triangles:
      'ETH-BTC', 'LTC-BTC', 'XRP-BTC', 'BNB-BTC', 'SOL-BTC', 'ADA-BTC'
    ]
  },
  {
    name: 'Kraken',
    api: 'https://api.kraken.com/0/public/Ticker?pair=',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'XRP-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'DOT-USD',
      'DOGE-USD', 'AVAX-USD', 'MATIC-USD', 'TRX-USD', 'LINK-USD', 'ATOM-USD', 'UNI-USD', 'XTZ-USD',
      'FIL-USD', 'EOS-USD', 'AAVE-USD', 'ETC-USD', 'NEAR-USD', 'ALGO-USD', 'ETH-BTC'
    ]
  },
  {
    name: 'Bitfinex',
    api: 'https://api.bitfinex.com/v1/pubticker/',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'XRP-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'DOT-USD',
      'DOGE-USD', 'AVAX-USD', 'MATIC-USD', 'TRX-USD', 'LINK-USD', 'ATOM-USD', 'UNI-USD', 'XTZ-USD',
      'FIL-USD', 'EOS-USD', 'AAVE-USD', 'ETC-USD', 'NEAR-USD', 'ALGO-USD', 'ETH-BTC'
    ]
  },
  {
    name: 'Huobi',
    api: 'https://api.huobi.pro/market/detail/merged?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'ETC-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'ETH-BTC'
    ]
  },
  {
    name: 'OKEx',
    api: 'https://www.okex.com/api/spot/v3/instruments/',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'ETC-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'ETH-BTC'
    ]
  },
  {
    name: 'Gate.io',
    api: 'https://api.gateio.ws/api/v4/spot/tickers?currency_pair=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'ETC-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'ETH-BTC'
    ]
  },
  {
    name: 'KuCoin',
    api: 'https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'ETC-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'ETH-BTC'
    ]
  },
  {
    name: 'Bitstamp',
    api: 'https://www.bitstamp.net/api/v2/ticker/',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'XRP-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'DOT-USD',
      'DOGE-USD', 'AVAX-USD', 'MATIC-USD', 'TRX-USD', 'LINK-USD', 'UNI-USD', 'XTZ-USD', 'FIL-USD',
      'EOS-USD', 'AAVE-USD', 'ETC-USD', 'ALGO-USD', 'ETH-BTC'
    ]
  },
  {
    name: 'Gemini',
    api: 'https://api.gemini.com/v1/pubticker/',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'XRP-USD', 'DOT-USD',
      'DOGE-USD', 'MATIC-USD', 'LINK-USD', 'UNI-USD', 'XTZ-USD', 'FIL-USD', 'EOS-USD', 'AAVE-USD',
      'ETC-USD', 'ALGO-USD', 'ETH-BTC'
    ]
  },
  {
    name: 'HitBTC',
    api: 'https://api.hitbtc.com/api/2/public/ticker/',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'ETC-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'ETH-BTC'
    ]
  },
  {
    name: 'CoinEx',
    api: 'https://api.coinex.com/v1/market/ticker?market=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'ETC-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'ETH-BTC'
    ]
  },
  // For all other exchanges, use dynamic expansion:
  {
    name: 'AscendEX',
    api: 'https://ascendex.com/api/pro/v1/ticker',
    symbols: Object.keys(pricesByExchange['AscendEX'] || {})
  },
  {
    name: 'BinanceUS',
    api: 'https://api.binance.us/api/v3/ticker/price',
    symbols: Object.keys(pricesByExchange['BinanceUS'] || {})
  },
  {
    name: 'Bitget',
    api: 'https://api.bitget.com/api/spot/v1/market/tickers',
    symbols: Object.keys(pricesByExchange['Bitget'] || {})
  },
  {
    name: 'Bybit',
    api: 'https://api.bybit.com/v5/market/tickers?category=spot',
    symbols: Object.keys(pricesByExchange['Bybit'] || {})
  },
  {
    name: 'CoinbasePro',
    api: 'https://api.exchange.coinbase.com/products',
    symbols: Object.keys(pricesByExchange['CoinbasePro'] || {})
  },
  {
    name: 'CryptoCom',
    api: 'https://api.crypto.com/v2/public/get-ticker',
    symbols: Object.keys(pricesByExchange['CryptoCom'] || {})
  },
  {
    name: 'LBank',
    api: 'https://api.lbank.info/v2/ticker.do?symbol=all',
    symbols: Object.keys(pricesByExchange['LBank'] || {})
  },
  {
    name: 'MEXC',
    api: 'https://api.mexc.com/api/v3/ticker/price',
    symbols: Object.keys(pricesByExchange['MEXC'] || {})
  },
  {
    name: 'OneInch',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: Object.keys(pricesByExchange['OneInch'] || {})
  },
  {
    name: 'PancakeSwap',
    api: 'https://api.1inch.dev/swap/v5.2/56/quote',
    symbols: Object.keys(pricesByExchange['PancakeSwap'] || {})
  },
  {
    name: 'Phemex',
    api: 'https://api.phemex.com/md/spot/ticker/24hr/all',
    symbols: Object.keys(pricesByExchange['Phemex'] || {})
  },
  {
    name: 'Poloniex',
    api: 'https://api.poloniex.com/markets/ticker24h',
    symbols: Object.keys(pricesByExchange['Poloniex'] || {})
  },
  {
    name: 'Probit',
    api: 'https://api.probit.com/api/exchange/v1/ticker',
    symbols: Object.keys(pricesByExchange['Probit'] || {})
  },
  {
    name: 'SushiSwap',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: Object.keys(pricesByExchange['SushiSwap'] || {})
  },
  {
    name: 'Uniswap',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: Object.keys(pricesByExchange['Uniswap'] || {})
  },
  {
    name: 'WhiteBIT',
    api: 'https://whitebit.com/api/v4/public/ticker',
    symbols: Object.keys(pricesByExchange['WhiteBIT'] || {})
  }
];
