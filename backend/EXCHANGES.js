import { pricesByExchange, normalizeKraken, normalizeBitfinex, normalizeHuobi } from "./symbol-mapping.js";

export const EXCHANGES = [
  {
    name: 'Binance',
    api: 'https://api.binance.com/api/v3/ticker/price',
    symbols: Object.keys(pricesByExchange['Binance'] || {}),
  },
  {
    name: 'KuCoin',
    api: 'https://api.kucoin.com/api/v1/market/allTickers',
    symbols: Object.keys(pricesByExchange['KuCoin'] || {}),
  },
  {
    name: 'OKEx',
    api: 'https://www.okx.com/api/v5/market/tickers?instType=SPOT',
    symbols: Object.keys(pricesByExchange['OKEx'] || {}),
  },
  {
    name: 'Gate.io',
    api: 'https://api.gateio.ws/api/v4/spot/tickers',
    symbols: Object.keys(pricesByExchange['Gate.io'] || {}),
  },
  {
    name: 'MEXC',
    api: 'https://api.mexc.com/api/v3/ticker/price',
    symbols: Object.keys(pricesByExchange['MEXC'] || {}),
  },
  {
    name: 'CoinEx',
    api: 'https://api.coinex.com/v1/market/ticker/all',
    symbols: Object.keys(pricesByExchange['CoinEx'] || {}),
  },
  {
    name: 'Bitget',
    api: 'https://api.bitget.com/api/spot/v1/market/tickers',
    symbols: Object.keys(pricesByExchange['Bitget'] || {}),
  },
  {
    name: 'Bybit',
    api: 'https://api.bybit.com/v5/market/tickers?category=spot',
    symbols: Object.keys(pricesByExchange['Bybit'] || {}),
  },
  // "Weird" exchanges with normalizer functions
  {
    name: 'Kraken',
    api: 'https://api.kraken.com/0/public/Ticker',
    symbols: Object.keys(pricesByExchange['Kraken'] || {}),
    normalizeSymbol: normalizeKraken,
  },
  {
    name: 'Bitfinex',
    api: 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL',
    symbols: Object.keys(pricesByExchange['Bitfinex'] || {}),
    normalizeSymbol: normalizeBitfinex,
  },
  {
    name: 'Huobi',
    api: 'https://api.huobi.pro/market/tickers',
    symbols: Object.keys(pricesByExchange['Huobi'] || {}),
    normalizeSymbol: normalizeHuobi,
  },
  // The rest (Coinbase, Bitrue, etc.) can stay dynamic or use pricesByExchange as before
  {
    name: 'Coinbase',
    api: 'https://api.coinbase.com/v2/prices',
    symbols: Object.keys(pricesByExchange['Coinbase'] || {}),
  },
  {
    name: 'Bitrue',
    api: 'https://www.bitrue.com/api/v1/ticker/price?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'DOGE-USDT', 'SHIB-USDT',
      'ARB-USDT', 'OP-USDT', 'MATIC-USDT', 'AVAX-USDT', 'DOT-USDT', 'ATOM-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'UNI-USDT', 'AAVE-USDT', 'CRV-USDT', 'MKR-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT',
      'APT-USDT', 'SUI-USDT', 'SEI-USDT', 'TIA-USDT', 'INJ-USDT', 'WLD-USDT',
      'OKB-USDT', 'KCS-USDT', 'HT-USDT', 'DASH-USDT', 'MANA-USDT', 'AXS-USDT', 'GALA-USDT', 'AR-USDT',
      'WETH-USDT', 'WBNB-USDT',
      // Add BTC and ETH pairs if supported:
      'PEPE-BTC', 'PEPE-ETH', 'FLOKI-BTC', 'FLOKI-ETH', 'DOGE-ETH', 'SHIB-ETH',
      'UNI-BTC', 'UNI-ETH', 'AAVE-BTC', 'AAVE-ETH', 'CRV-BTC', 'CRV-ETH', 'MKR-BTC', 'MKR-ETH',
      'COMP-BTC', 'COMP-ETH', 'SNX-BTC', 'SNX-ETH', '1INCH-BTC', '1INCH-ETH', 'LDO-BTC', 'LDO-ETH', 'DYDX-BTC', 'DYDX-ETH'
    ]
  },
  {
    name: 'BithumbGlobal',
    api: 'https://global-openapi.bithumb.pro/openapi/v1/spot/ticker?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'SHIB-USDT', 'MATIC-USDT', 'AVAX-USDT',
      'DOT-USDT', 'ATOM-USDT', 'NEAR-USDT', 'ALGO-USDT', 'UNI-USDT', 'AAVE-USDT', 'CRV-USDT', 'MKR-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'APT-USDT', 'SUI-USDT', 'SEI-USDT', 'TIA-USDT', 'INJ-USDT',
      'WLD-USDT', 'OKB-USDT', 'KCS-USDT', 'HT-USDT', 'DASH-USDT', 'MANA-USDT', 'AXS-USDT', 'GALA-USDT', 'AR-USDT',
      'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'Bitmart',
    api: 'https://api.bitmart.com/v2/ticker?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'SHIB-USDT', 'ARB-USDT', 'OP-USDT',
      'MATIC-USDT', 'AVAX-USDT', 'DOT-USDT', 'ATOM-USDT', 'NEAR-USDT', 'ALGO-USDT', 'UNI-USDT', 'AAVE-USDT',
      'CRV-USDT', 'MKR-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'APT-USDT', 'SUI-USDT',
      'SEI-USDT', 'TIA-USDT', 'INJ-USDT', 'WLD-USDT', 'OKB-USDT', 'KCS-USDT', 'HT-USDT', 'DASH-USDT', 'MANA-USDT',
      'AXS-USDT', 'GALA-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT',
      // Add BTC and ETH pairs if supported:
      'PEPE-BTC', 'PEPE-ETH', 'FLOKI-BTC', 'FLOKI-ETH', 'DOGE-ETH', 'SHIB-ETH'
    ]
  },
  {
    name: 'XTcom',
    api: 'https://sapi.xt.com/v4/public/ticker/price?symbol=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'SHIB-USDT', 'ARB-USDT', 'OP-USDT',
      'MATIC-USDT', 'AVAX-USDT', 'DOT-USDT', 'ATOM-USDT', 'NEAR-USDT', 'ALGO-USDT', 'UNI-USDT', 'AAVE-USDT',
      'CRV-USDT', 'MKR-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'APT-USDT', 'SUI-USDT',
      'SEI-USDT', 'TIA-USDT', 'INJ-USDT', 'WLD-USDT', 'OKB-USDT', 'KCS-USDT', 'HT-USDT', 'DASH-USDT', 'MANA-USDT',
      'AXS-USDT', 'GALA-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'Deribit',
    api: 'https://www.deribit.com/api/v2/public/ticker?instrument_name=',
    symbols: [
      'BTC-USD', 'ETH-USD', 'BTC-PERPETUAL', 'ETH-PERPETUAL'
      // Add more if Deribit supports them
    ]
  },
  {
    name: 'CryptoComEnhanced',
    api: 'https://api.crypto.com/v2/public/get-ticker?instrument_name=',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'SHIB-USDT', 'ARB-USDT', 'OP-USDT',
      'MATIC-USDT', 'AVAX-USDT', 'DOT-USDT', 'ATOM-USDT', 'NEAR-USDT', 'ALGO-USDT', 'UNI-USDT', 'AAVE-USDT',
      'CRV-USDT', 'MKR-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'APT-USDT', 'SUI-USDT',
      'SEI-USDT', 'TIA-USDT', 'INJ-USDT', 'WLD-USDT', 'OKB-USDT', 'KCS-USDT', 'HT-USDT', 'DASH-USDT', 'MANA-USDT',
      'AXS-USDT', 'GALA-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
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
  },
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
    name: 'Bitstamp',
    api: 'https://www.bitstamp.net/api/v2/ticker/',
    symbols: Object.keys(pricesByExchange['Bitstamp'] || {})
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
    name: 'Gemini',
    api: 'https://api.gemini.com/v1/symbols',
    symbols: Object.keys(pricesByExchange['Gemini'] || {})
  },
  {
    name: 'HitBTC',
    api: 'https://api.hitbtc.com/api/3/public/ticker',
    symbols: Object.keys(pricesByExchange['HitBTC'] || {})
  },
  {
    name: 'LBANK',
    api: 'https://api.lbank.info/v2/ticker.do',
    symbols: Object.keys(pricesByExchange['LBANK'] || {})
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
  }
];
