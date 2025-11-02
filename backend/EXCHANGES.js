import { pricesByExchange, normalizeKraken, normalizeBitfinex, normalizeHuobi } from "./symbol-mapping.js";

const allSymbols = [
  "1INCH-USDT", "AAVE-USDT", "ADA-BTC", "ADA-USDT", "ALGO-USDT", "APE-USDT",
  "ARB-USDT", "ARB-BTC", "TON-USDT", "TON-BTC", "OP-USDT", "OP-BTC",
  "ATOM-USDT", "AVAX-USDT", "BCH-USDT", "BNB-BTC", "BNB-USDT", "BTC-USD",
  "BTC-USDT", "COMP-USDT", "CRV-USDT", "DAI-USDT", "DOGE-USDT", "DOT-USDT",
  "DYDX-USDT", "EGLD-USDT", "EOS-USDT", "ETC-USDT", "ETH-BTC", "ETH-USD",
  "ETH-USDT", "FIL-USDT", "GRT-USDT", "LINK-USDT", "LDO-USDT", "LTC-BTC",
  "LTC-USD", "LTC-USDT", "MATIC-USDT", "POL-USDT", "MKR-USDT", "NEAR-USDT",
  "RUNE-USDT", "SAND-USDT", "SHIB-USDT", "SNX-USDT", "SOL-BTC", "SOL-USD",
  "SOL-USDT", "STX-USDT", "TRX-USDT", "UNI-USDT", "USDC-USDT", "WBTC-USDT",
  "XMR-USDT", "XRP-BTC", "XRP-USDT", "XTZ-USDT", "ZEC-USDT",
  "USDC-USD", "USDC-USDT", "DAI-USDT", "BUSD-USDT", "TUSD-USDT", "FRAX-USDT",
  "BTC-EUR", "BTC-GBP", "BTC-JPY",
  "ETH-EUR", "ETH-GBP", "ETH-JPY",
  "LTC-EUR", "LTC-GBP", "LTC-JPY",
  "SOL-ETH", "ADA-ETH", "AVAX-ETH", "DOT-ETH",
  "ATOM-ETH", "NEAR-ETH", "ALGO-ETH",
  "MATIC-BTC", "MATIC-ETH", "POL-BTC", "POL-ETH",
  "ARB-BTC", "ARB-ETH", "OP-BTC", "OP-ETH",
  "LRC-USDT", "LRC-BTC", "LRC-ETH",
  "UNI-BTC", "UNI-ETH", "AAVE-BTC", "AAVE-ETH",
  "CRV-BTC", "CRV-ETH", "MKR-BTC", "MKR-ETH",
  "COMP-BTC", "COMP-ETH", "SNX-BTC", "SNX-ETH",
  "1INCH-BTC", "1INCH-ETH", "LDO-BTC", "LDO-ETH",
  "DYDX-BTC", "DYDX-ETH",
  "PEPE-USDT", "PEPE-BTC", "PEPE-ETH",
  "FLOKI-USDT", "FLOKI-BTC", "FLOKI-ETH",
  "DOGE-ETH", "SHIB-ETH",
  "APT-USDT", "APT-BTC", "APT-ETH",
  "SUI-USDT", "SUI-BTC", "SUI-ETH",
  "SEI-USDT", "SEI-BTC", "SEI-ETH",
  "TIA-USDT", "TIA-BTC", "TIA-ETH",
  "INJ-USDT", "INJ-BTC", "INJ-ETH",
  "WLD-USDT", "WLD-BTC", "WLD-ETH",
  "OKB-USDT", "OKB-BTC", "OKB-ETH",
  "KCS-USDT", "KCS-BTC", "KCS-ETH",
  "HT-USDT", "HT-BTC", "HT-ETH",
  "DASH-USDT", "DASH-BTC", "DASH-ETH",
  "MANA-USDT", "MANA-BTC", "MANA-ETH",
  "AXS-USDT", "AXS-BTC", "AXS-ETH",
  "GALA-USDT", "GALA-BTC", "GALA-ETH",
  "AR-USDT", "AR-BTC", "AR-ETH",
  "WETH-USDT", "WETH-BTC", "WBNB-USDT", "WBNB-BTC"
];

export const EXCHANGES = [
  {
    name: 'Binance',
    api: 'https://api.binance.com/api/v3/ticker/price',
    symbols: allSymbols
  },
  {
    name: 'KuCoin',
    api: 'https://api.kucoin.com/api/v1/market/allTickers',
    symbols: allSymbols
  },
  {
    name: 'OKEx',
    api: 'https://www.okx.com/api/v5/market/tickers?instType=SPOT',
    symbols: allSymbols
  },
  {
    name: 'Gate.io',
    api: 'https://api.gateio.ws/api/v4/spot/tickers',
    symbols: allSymbols
  },
  {
    name: 'MEXC',
    api: 'https://api.mexc.com/api/v3/ticker/price',
    symbols: allSymbols
  },
  {
    name: 'CoinEx',
    api: 'https://api.coinex.com/v1/market/ticker/all',
    symbols: allSymbols
  },
  {
    name: 'Bitget',
    api: 'https://api.bitget.com/api/spot/v1/market/tickers',
    symbols: allSymbols
  },
  {
    name: 'Bybit',
    api: 'https://api.bybit.com/v5/market/tickers?category=spot',
    symbols: allSymbols
  },
  {
    name: 'Kraken',
    api: 'https://api.kraken.com/0/public/Ticker',
    symbols: allSymbols,
    normalizeSymbol: normalizeKraken,
  },
  {
    name: 'Bitfinex',
    api: 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL',
    symbols: allSymbols,
    normalizeSymbol: normalizeBitfinex,
  },
  {
    name: 'Huobi',
    api: 'https://api.huobi.pro/market/tickers',
    symbols: allSymbols,
    normalizeSymbol: normalizeHuobi,
  },
  {
    name: 'Coinbase',
    api: 'https://api.coinbase.com/v2/prices',
    symbols: allSymbols
  },
  {
    name: 'Bitrue',
    api: 'https://www.bitrue.com/api/v1/ticker/price?symbol=',
    symbols: allSymbols
  },
  {
    name: 'BithumbGlobal',
    api: 'https://global-openapi.bithumb.pro/openapi/v1/spot/ticker?symbol=',
    symbols: allSymbols
  },
  {
    name: 'Bitmart',
    api: 'https://api.bitmart.com/v2/ticker?symbol=',
    symbols: allSymbols
  },
  {
    name: 'XTcom',
    api: 'https://sapi.xt.com/v4/public/ticker/price?symbol=',
    symbols: allSymbols
  },
  {
    name: 'Deribit',
    api: 'https://www.deribit.com/api/v2/public/ticker?instrument_name=',
    symbols: [
      'BTC-PERPETUAL', 'ETH-PERPETUAL'
    ]
  },
  {
    name: 'CryptoComEnhanced',
    api: 'https://api.crypto.com/v2/public/get-ticker?instrument_name=',
    symbols: allSymbols
  },
  {
    name: 'Phemex',
    api: 'https://api.phemex.com/md/spot/ticker/24hr/all',
    symbols: allSymbols
  },
  {
    name: 'Poloniex',
    api: 'https://api.poloniex.com/markets/ticker24h',
    symbols: allSymbols
  },
  {
    name: 'Probit',
    api: 'https://api.probit.com/api/exchange/v1/ticker',
    symbols: allSymbols
  },
  {
    name: 'SushiSwap',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: allSymbols
  },
  {
    name: 'Uniswap',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: allSymbols
  },
  {
    name: 'WhiteBIT',
    api: 'https://whitebit.com/api/v4/public/ticker',
    symbols: allSymbols
  },
  {
    name: 'AscendEX',
    api: 'https://ascendex.com/api/pro/v1/ticker',
    symbols: allSymbols
  },
  {
    name: 'BinanceUS',
    api: 'https://api.binance.us/api/v3/ticker/price',
    symbols: allSymbols
  },
  {
    name: 'Bitstamp',
    api: 'https://www.bitstamp.net/api/v2/ticker/',
    symbols: allSymbols
  },
  {
    name: 'CoinbasePro',
    api: 'https://api.exchange.coinbase.com/products',
    symbols: allSymbols
  },
  {
    name: 'CryptoCom',
    api: 'https://api.crypto.com/v2/public/get-ticker',
    symbols: allSymbols
  },
  {
    name: 'Gemini',
    api: 'https://api.gemini.com/v1/symbols',
    symbols: allSymbols
  },
  {
    name: 'HitBTC',
    api: 'https://api.hitbtc.com/api/3/public/ticker',
    symbols: allSymbols
  },
  {
    name: 'LBANK',
    api: 'https://api.lbank.info/v2/ticker.do',
    symbols: allSymbols
  },
  {
    name: 'OneInch',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: allSymbols
  },
  {
    name: 'PancakeSwap',
    api: 'https://api.1inch.dev/swap/v5.2/56/quote',
    symbols: allSymbols
  }
];
