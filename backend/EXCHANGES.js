import { pricesByExchange } from "./symbol-mapping.js";

export const EXCHANGES = [
  {
    name: 'Binance',
    api: 'https://api.binance.com/api/v3/ticker/price?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'POL-USDT',
      'SHIB-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'XMR-USDT', 'WBTC-USDT', 'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'SAND-USDT',
      'APE-USDT', 'GRT-USDT', 'ETC-USDT', 'NEAR-USDT', 'EGLD-USDT', 'ZEC-USDT', 'STX-USDT', 'ALGO-USDT',
      'SNX-USDT', 'RUNE-USDT', 'MKR-USDT', 'CRV-USDT', 'DYDX-USDT', 'LDO-USDT', '1INCH-USDT', 'COMP-USDT',
      'ARB-USDT', 'TON-USDT', 'OP-USDT', 'USDC-USDT', 'DAI-USDT',
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'SOL-USD',
      // Cross-asset for triangles:
      'ETH-BTC', 'LTC-BTC', 'XRP-BTC', 'BNB-BTC', 'SOL-BTC', 'ADA-BTC', 'ARB-BTC', 'TON-BTC', 'OP-BTC'
    ]
  },
  {
    name: 'Kraken',
    api: 'https://api.kraken.com/0/public/Ticker?pair=',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'XRP-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'DOT-USD',
      'DOGE-USD', 'AVAX-USD', 'MATIC-USD', 'TRX-USD', 'LINK-USD', 'ATOM-USD', 'UNI-USD', 'XTZ-USD',
      'FIL-USD', 'EOS-USD', 'AAVE-USD', 'ETC-USD', 'NEAR-USD', 'ALGO-USD', 'ETH-BTC',
      // Additional pairs from symbols.json
      'COMP-USDT', 'MKR-USDT', 'ZEC-USDT',
      'BTC-EUR', 'ETH-EUR', 'LTC-EUR',
      'BTC-GBP', 'ETH-GBP', 'LTC-GBP',
      'BTC-JPY', 'ETH-JPY', 'LTC-JPY',
    ]
  },
  {
    name: 'Bitfinex',
    api: 'https://api.bitfinex.com/v1/pubticker/',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'XRP-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'DOT-USD',
      'DOGE-USD', 'AVAX-USD', 'MATIC-USD', 'TRX-USD', 'LINK-USD', 'ATOM-USD', 'UNI-USD', 'XTZ-USD',
      'FIL-USD', 'EOS-USD', 'AAVE-USD', 'ETC-USD', 'NEAR-USD', 'ALGO-USD', 'ETH-BTC',
      'COMP-USDT', 'MKR-USDT',
    ]
  },
  {
    name: 'Huobi',
    api: 'https://api.huobi.pro/market/detail/merged?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'SHIB-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'ETC-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'ETH-BTC', 'LTC-BTC', 'XRP-BTC', 'SOL-BTC', 'ADA-BTC',
      'COMP-USDT', 'MKR-USDT',
    ]
  },
  {
    name: 'OKEx',
    api: 'https://www.okex.com/api/spot/v3/instruments/',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'SHIB-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'SAND-USDT', 'APE-USDT', 'GRT-USDT',
      'ETC-USDT', 'NEAR-USDT', 'EGLD-USDT', 'ZEC-USDT', 'STX-USDT', 'ALGO-USDT', 'SNX-USDT', 'RUNE-USDT',
      'MKR-USDT', 'CRV-USDT', 'DYDX-USDT', 'LDO-USDT', '1INCH-USDT', 'COMP-USDT', 'ETH-BTC',
      'ARB-USDT', 'ARB-BTC', 'OP-USDT', 'OP-BTC', 'TON-USDT', 'TON-BTC',
      'OKB-USDT', 'OKB-BTC', 'OKB-ETH',
      'KCS-USDT', 'KCS-BTC', 'KCS-ETH',
      'HT-USDT', 'HT-BTC', 'HT-ETH',
      'DASH-USDT', 'DASH-BTC', 'DASH-ETH',
      'MANA-USDT', 'MANA-BTC', 'MANA-ETH',
      'AXS-USDT', 'AXS-BTC', 'AXS-ETH',
      'GALA-USDT', 'GALA-BTC', 'GALA-ETH',
      'AR-USDT', 'AR-BTC', 'AR-ETH',
      'LTC-BTC', 'XRP-BTC', 'BNB-BTC', 'SOL-BTC', 'ADA-BTC', 'WBTC-USDT'
    ]
  },
  {
    name: 'Gate.io',
    api: 'https://api.gateio.ws/api/v4/spot/tickers?currency_pair=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'SHIB-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'SAND-USDT', 'APE-USDT', 'GRT-USDT',
      'ETC-USDT', 'NEAR-USDT', 'EGLD-USDT', 'ZEC-USDT', 'STX-USDT', 'ALGO-USDT', 'SNX-USDT', 'RUNE-USDT',
      'MKR-USDT', 'CRV-USDT', 'DYDX-USDT', 'LDO-USDT', '1INCH-USDT', 'COMP-USDT', 'ETH-BTC'
    ]
  },
  {
    name: 'KuCoin',
    api: 'https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'BCH-USDT', 'BNB-USDT', 'SOL-USDT', 'ADA-USDT', 'XRP-USDT',
      'DOT-USDT', 'DOGE-USDT', 'AVAX-USDT', 'MATIC-USDT', 'SHIB-USDT', 'TRX-USDT', 'LINK-USDT', 'ATOM-USDT',
      'UNI-USDT', 'XTZ-USDT', 'FIL-USDT', 'EOS-USDT', 'AAVE-USDT', 'SAND-USDT', 'APE-USDT', 'GRT-USDT',
      'ETC-USDT', 'NEAR-USDT', 'EGLD-USDT', 'ZEC-USDT', 'STX-USDT', 'ALGO-USDT', 'SNX-USDT', 'RUNE-USDT',
      'MKR-USDT', 'CRV-USDT', 'DYDX-USDT', 'LDO-USDT', '1INCH-USDT', 'COMP-USDT', 'ETH-BTC',
      'ARB-USDT', 'ARB-BTC', 'TON-USDT', 'TON-BTC', 'OP-USDT', 'OP-BTC',
      'KCS-USDT', 'KCS-BTC', 'KCS-ETH',
    ]
  },
  {
    name: 'Bitstamp',
    api: 'https://www.bitstamp.net/api/v2/ticker/',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'XRP-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'DOT-USD',
      'DOGE-USD', 'AVAX-USD', 'MATIC-USD', 'TRX-USD', 'LINK-USD', 'UNI-USD', 'XTZ-USD', 'FIL-USD',
      'EOS-USD', 'AAVE-USD', 'ETC-USD', 'ALGO-USD', 'ETH-BTC',
      'BTC-EUR', 'ETH-EUR', 'LTC-EUR',
    ]
  },
  {
    name: 'Gemini',
    api: 'https://api.gemini.com/v1/pubticker/',
    symbols: [
      'BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD', 'SOL-USD', 'ADA-USD', 'XRP-USD', 'DOT-USD',
      'DOGE-USD', 'MATIC-USD', 'LINK-USD', 'UNI-USD', 'XTZ-USD', 'FIL-USD', 'EOS-USD', 'AAVE-USD',
      'ETC-USD', 'ALGO-USD', 'ETH-BTC',
    ]
  },
  {
    name: 'HitBTC',
    api: 'api.hitbtc.com/api/3/ws/public',
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
      'ETH-BTC',
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
    name: 'Coinbase',
    api: 'https://api.coinbase.com/v2/prices',
    symbols: Object.keys(pricesByExchange['Coinbase'] || {})
  },
  {
    name: 'Bitrue',
    api: 'https://www.bitrue.com/api/v1/ticker/price?symbol=',
    symbols: Object.keys(pricesByExchange['Bitrue'] || {})
  },
  {
    name: 'BithumbGlobal',
    api: 'https://global-openapi.bithumb.pro/openapi/v1/spot/ticker?symbol=',
    symbols: Object.keys(pricesByExchange['BithumbGlobal'] || {})
  },
  {
    name: 'Bitmart',
    api: 'https://api.bitmart.com/v2/ticker?symbol=',
    symbols: Object.keys(pricesByExchange['Bitmart'] || {})
  },
  {
    name: 'XTcom',
    api: 'https://sapi.xt.com/v4/public/ticker/price?symbol=',
    symbols: Object.keys(pricesByExchange['XTcom'] || {})
  },
  {
    name: 'Deribit',
    api: 'https://www.deribit.com/api/v2/public/ticker?instrument_name=',
    symbols: Object.keys(pricesByExchange['Deribit'] || {})
  },
  {
    name: 'CryptoComEnhanced',
    api: 'https://api.crypto.com/v2/public/get-ticker?instrument_name=',
    symbols: Object.keys(pricesByExchange['CryptoComEnhanced'] || {})
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
