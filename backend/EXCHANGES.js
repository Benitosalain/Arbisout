import { pricesByExchange, normalizeKraken, normalizeBitfinex, normalizeHuobi } from "./symbol-mapping.js";

export const EXCHANGES = [
  {
    name: 'Binance',
    api: 'https://api.binance.com/api/v3/ticker/price',
    symbols: [
      'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT', 'SOLUSDT', 'DOGEUSDT', 'MATICUSDT', 'DOTUSDT',
      'SHIBUSDT', 'AVAXUSDT', 'TRXUSDT', 'LTCUSDT', 'LINKUSDT', 'BCHUSDT', 'UNIUSDT', 'ATOMUSDT', 'XMRUSDT',
      'ETCUSDT', 'FILUSDT', 'APTUSDT', 'ARBUSDT', 'OPUSDT', 'SUIUSDT', 'PEPEUSDT', 'FLOKIUSDT', 'INJ-USDT',
      'WLDUSDT', 'TIAUSDT', 'SEIUSDT', 'STXUSDT', 'RNDRUSDT', 'MKRUSDT', 'AAVEUSDT', 'CRVUSDT', 'COMPUSDT',
      'SNXUSDT', '1INCHUSDT', 'LDOUSDT', 'DYDXUSDT', 'GALAUSDT', 'AXSUSDT', 'MANAUSDT', 'SANDUSDT', 'GRTUSDT',
      'NEARUSDT', 'ALGOUSDT', 'VETUSDT', 'EOSUSDT', 'XTZUSDT', 'KAVAUSDT', 'CROUSDT', 'QNTUSDT', 'RUNEUSDT',
      'ENJUSDT', 'CHZUSDT', 'XLMUSDT', 'HBARUSDT', 'FTMUSDT', 'ZILUSDT', 'DASHUSDT', 'ARUSDT', 'WETHUSDT',
      'WBNBUSDT'
    ]
  },
  {
    name: 'KuCoin',
    api: 'https://api.kucoin.com/api/v1/market/allTickers',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'KCS-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'OKEx',
    api: 'https://www.okx.com/api/v5/market/tickers?instType=SPOT',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'OKB-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'Gate.io',
    api: 'https://api.gateio.ws/api/v4/spot/tickers',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'GT-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'MEXC',
    api: 'https://api.mexc.com/api/v3/ticker/price',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'BNB-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'CoinEx',
    api: 'https://api.coinex.com/v1/market/ticker/all',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'BCH-USDT', 'LTC-USDT', 'DOGE-USDT', 'XRP-USDT', 'ADA-USDT', 'SOL-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LINK-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT', 'ETC-USDT', 'FIL-USDT',
      'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT', 'TIA-USDT',
      'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT',
      'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT',
      'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'Bitget',
    api: 'https://api.bitget.com/api/spot/v1/market/tickers',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'BGB-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'Bybit',
    api: 'https://api.bybit.com/v5/market/tickers?category=spot',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'BIT-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'Kraken',
    api: 'https://api.kraken.com/0/public/Ticker',
    symbols: [
      'BTC-USD', 'ETH-USD', 'USDT-USD', 'ADA-USD', 'XRP-USD', 'SOL-USD', 'DOGE-USD', 'MATIC-USD', 'DOT-USD',
      'SHIB-USD', 'AVAX-USD', 'TRX-USD', 'LTC-USD', 'LINK-USD', 'BCH-USD', 'UNI-USD', 'ATOM-USD', 'XMR-USD',
      'ETC-USD', 'FIL-USD', 'APT-USD', 'ARB-USD', 'OP-USD', 'SUI-USD', 'PEPE-USD', 'FLOKI-USD', 'INJ-USD',
      'WLD-USD', 'TIA-USD', 'SEI-USD', 'STX-USD', 'RNDR-USD', 'MKR-USD', 'AAVE-USD', 'CRV-USD', 'COMP-USD',
      'SNX-USD', '1INCH-USD', 'LDO-USD', 'DYDX-USD', 'GALA-USD', 'AXS-USD', 'MANA-USD', 'SAND-USD', 'GRT-USD',
      'NEAR-USD', 'ALGO-USD', 'VET-USD', 'EOS-USD', 'XTZ-USD', 'KAVA-USD', 'CRO-USD', 'QNT-USD', 'RUNE-USD',
      'ENJ-USD', 'CHZ-USD', 'XLM-USD', 'HBAR-USD', 'FTM-USD', 'ZIL-USD', 'DASH-USD', 'AR-USD', 'WETH-USD',
      'WBNB-USD'
    ],
    normalizeSymbol: normalizeKraken,
  },
  {
    name: 'Bitfinex',
    api: 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL',
    symbols: [
      'BTC-USD', 'ETH-USD', 'USDT-USD', 'ADA-USD', 'XRP-USD', 'SOL-USD', 'DOGE-USD', 'MATIC-USD', 'DOT-USD',
      'SHIB-USD', 'AVAX-USD', 'TRX-USD', 'LTC-USD', 'LINK-USD', 'BCH-USD', 'UNI-USD', 'ATOM-USD', 'XMR-USD',
      'ETC-USD', 'FIL-USD', 'APT-USD', 'ARB-USD', 'OP-USD', 'SUI-USD', 'PEPE-USD', 'FLOKI-USD', 'INJ-USD',
      'WLD-USD', 'TIA-USD', 'SEI-USD', 'STX-USD', 'RNDR-USD', 'MKR-USD', 'AAVE-USD', 'CRV-USD', 'COMP-USD',
      'SNX-USD', '1INCH-USD', 'LDO-USD', 'DYDX-USD', 'GALA-USD', 'AXS-USD', 'MANA-USD', 'SAND-USD', 'GRT-USD',
      'NEAR-USD', 'ALGO-USD', 'VET-USD', 'EOS-USD', 'XTZ-USD', 'KAVA-USD', 'CRO-USD', 'QNT-USD', 'RUNE-USD',
      'ENJ-USD', 'CHZ-USD', 'XLM-USD', 'HBAR-USD', 'FTM-USD', 'ZIL-USD', 'DASH-USD', 'AR-USD', 'WETH-USD',
      'WBNB-USD'
    ],
    normalizeSymbol: normalizeBitfinex,
  },
  {
    name: 'Huobi',
    api: 'https://api.huobi.pro/market/tickers',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'HT-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'XMR-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ],
    normalizeSymbol: normalizeHuobi,
  },
  {
    name: 'Coinbase',
    api: 'https://api.coinbase.com/v2/prices',
    symbols: [
      'BTC-USD', 'ETH-USD', 'USDT-USD', 'ADA-USD', 'XRP-USD', 'SOL-USD', 'DOGE-USD', 'MATIC-USD', 'DOT-USD',
      'SHIB-USD', 'AVAX-USD', 'TRX-USD', 'LTC-USD', 'LINK-USD', 'BCH-USD', 'UNI-USD', 'ATOM-USD', 'XMR-USD',
      'ETC-USD', 'FIL-USD', 'APT-USD', 'ARB-USD', 'OP-USD', 'SUI-USD', 'PEPE-USD', 'FLOKI-USD', 'INJ-USD',
      'WLD-USD', 'TIA-USD', 'SEI-USD', 'STX-USD', 'RNDR-USD', 'MKR-USD', 'AAVE-USD', 'CRV-USD', 'COMP-USD',
      'SNX-USD', '1INCH-USD', 'LDO-USD', 'DYDX-USD', 'GALA-USD', 'AXS-USD', 'MANA-USD', 'SAND-USD', 'GRT-USD',
      'NEAR-USD', 'ALGO-USD', 'VET-USD', 'EOS-USD', 'XTZ-USD', 'KAVA-USD', 'CRO-USD', 'QNT-USD', 'RUNE-USD',
      'ENJ-USD', 'CHZ-USD', 'XLM-USD', 'HBAR-USD', 'FTM-USD', 'ZIL-USD', 'DASH-USD', 'AR-USD', 'WETH-USD',
      'WBNB-USD'
    ]
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
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT',
      'INJ-USDT', 'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT',
      'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT',
      'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT',
      'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT',
      'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'Poloniex',
    api: 'https://api.poloniex.com/markets/ticker24h',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'TRX-USDT', 'XRP-USDT', 'DOGE-USDT', 'LTC-USDT', 'BCH-USDT', 'ADA-USDT', 'SOL-USDT',
      'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT', 'AVAX-USDT', 'LINK-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT',
      'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT',
      'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT',
      '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'Probit',
    api: 'https://api.probit.com/api/exchange/v1/ticker',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'XRP-USDT', 'ADA-USDT', 'DOGE-USDT', 'SOL-USDT', 'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT',
      'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT', 'FIL-USDT', 'APT-USDT',
      'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT', 'TIA-USDT', 'SEI-USDT',
      'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT', 'VET-USDT',
      'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT',
      'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'SushiSwap',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: [
      'ETH-USDT', 'USDC-USDT', 'WBTC-ETH', 'DAI-USDT', 'LINK-ETH', 'UNI-ETH', 'AAVE-ETH', 'MKR-ETH', 'CRV-ETH',
      'COMP-ETH', 'SNX-ETH', '1INCH-ETH', 'LDO-ETH', 'DYDX-ETH', 'GALA-ETH', 'AXS-ETH', 'MANA-ETH', 'SAND-ETH',
      'GRT-ETH', 'NEAR-ETH', 'ALGO-ETH', 'VET-ETH', 'EOS-ETH', 'XTZ-ETH', 'KAVA-ETH', 'CRO-ETH', 'QNT-ETH', 'RUNE-ETH',
      'ENJ-ETH', 'CHZ-ETH', 'XLM-ETH', 'HBAR-ETH', 'FTM-ETH', 'ZIL-ETH', 'DASH-ETH', 'AR-ETH', 'WETH-ETH'
    ]
  },
  {
    name: 'Uniswap',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: [
      'ETH-USDT', 'USDC-USDT', 'WBTC-ETH', 'DAI-USDT', 'LINK-ETH', 'UNI-ETH', 'AAVE-ETH', 'MKR-ETH', 'CRV-ETH',
      'COMP-ETH', 'SNX-ETH', '1INCH-ETH', 'LDO-ETH', 'DYDX-ETH', 'GALA-ETH', 'AXS-ETH', 'MANA-ETH', 'SAND-ETH',
      'GRT-ETH', 'NEAR-ETH', 'ALGO-ETH', 'VET-ETH', 'EOS-ETH', 'XTZ-ETH', 'KAVA-ETH', 'CRO-ETH', 'QNT-ETH', 'RUNE-ETH',
      'ENJ-ETH', 'CHZ-ETH', 'XLM-ETH', 'HBAR-ETH', 'FTM-ETH', 'ZIL-ETH', 'DASH-ETH', 'AR-ETH', 'WETH-ETH'
    ]
  },
  {
    name: 'WhiteBIT',
    api: 'https://whitebit.com/api/v4/public/ticker',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT',
      'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT', 'FIL-USDT',
      'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT', 'TIA-USDT',
      'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT',
      'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT',
      'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'AscendEX',
    api: 'https://ascendex.com/api/pro/v1/ticker',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT',
      'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT', 'FIL-USDT',
      'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT', 'TIA-USDT',
      'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT',
      'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT',
      'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'BinanceUS',
    api: 'https://api.binance.us/api/v3/ticker/price',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'BNB-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT',
      'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT',
      'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT',
      'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT',
      '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT',
      'WBNB-USDT'
    ]
  },
  {
    name: 'Bitstamp',
    api: 'https://www.bitstamp.net/api/v2/ticker/',
    symbols: [
      'BTC-USD', 'ETH-USD', 'USDT-USD', 'ADA-USD', 'XRP-USD', 'SOL-USD', 'DOGE-USD', 'MATIC-USD', 'DOT-USD',
      'SHIB-USD', 'AVAX-USD', 'TRX-USD', 'LTC-USD', 'LINK-USD', 'BCH-USD', 'UNI-USD', 'ATOM-USD', 'XMR-USD',
      'ETC-USD', 'FIL-USD', 'APT-USD', 'ARB-USD', 'OP-USD', 'SUI-USD', 'PEPE-USD', 'FLOKI-USD', 'INJ-USD',
      'WLD-USD', 'TIA-USD', 'SEI-USD', 'STX-USD', 'RNDR-USD', 'MKR-USD', 'AAVE-USD', 'CRV-USD', 'COMP-USD',
      'SNX-USD', '1INCH-USD', 'LDO-USD', 'DYDX-USD', 'GALA-USD', 'AXS-USD', 'MANA-USD', 'SAND-USD', 'GRT-USD',
      'NEAR-USD', 'ALGO-USD', 'VET-USD', 'EOS-USD', 'XTZ-USD', 'KAVA-USD', 'CRO-USD', 'QNT-USD', 'RUNE-USD',
      'ENJ-USD', 'CHZ-USD', 'XLM-USD', 'HBAR-USD', 'FTM-USD', 'ZIL-USD', 'DASH-USD', 'AR-USD', 'WETH-USD',
      'WBNB-USD'
    ]
  },
  {
    name: 'CoinbasePro',
    api: 'https://api.exchange.coinbase.com/products',
    symbols: [
      'BTC-USD', 'ETH-USD', 'USDT-USD', 'ADA-USD', 'XRP-USD', 'SOL-USD', 'DOGE-USD', 'MATIC-USD', 'DOT-USD',
      'SHIB-USD', 'AVAX-USD', 'TRX-USD', 'LTC-USD', 'LINK-USD', 'BCH-USD', 'UNI-USD', 'ATOM-USD', 'ETC-USD',
      'FIL-USD', 'APT-USD', 'ARB-USD', 'OP-USD', 'SUI-USD', 'PEPE-USD', 'FLOKI-USD', 'INJ-USD', 'WLD-USD',
      'TIA-USD', 'SEI-USD', 'STX-USD', 'RNDR-USD', 'MKR-USD', 'AAVE-USD', 'CRV-USD', 'COMP-USD', 'SNX-USD',
      '1INCH-USD', 'LDO-USD', 'DYDX-USD', 'GALA-USD', 'AXS-USD', 'MANA-USD', 'SAND-USD', 'GRT-USD', 'NEAR-USD',
      'ALGO-USD', 'VET-USD', 'EOS-USD', 'XTZ-USD', 'KAVA-USD', 'CRO-USD', 'QNT-USD', 'RUNE-USD', 'ENJ-USD',
      'CHZ-USD', 'XLM-USD', 'HBAR-USD', 'FTM-USD', 'ZIL-USD', 'DASH-USD', 'AR-USD', 'WETH-USD', 'WBNB-USD'
    ]
  },
  {
    name: 'CryptoCom',
    api: 'https://api.crypto.com/v2/public/get-ticker',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT',
      'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT', 'FIL-USDT',
      'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT', 'TIA-USDT',
      'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT',
      'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT',
      'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'Gemini',
    api: 'https://api.gemini.com/v1/symbols',
    symbols: [
      'BTC-USD', 'ETH-USD', 'SOL-USD', 'DOGE-USD', 'MATIC-USD', 'DOT-USD', 'SHIB-USD', 'AVAX-USD', 'TRX-USD',
      'LTC-USD', 'LINK-USD', 'BCH-USD', 'UNI-USD', 'ATOM-USD', 'ETC-USD', 'FIL-USD', 'APT-USD', 'ARB-USD',
      'OP-USD', 'SUI-USD', 'PEPE-USD', 'FLOKI-USD', 'INJ-USD', 'WLD-USD', 'TIA-USD', 'SEI-USD', 'STX-USD',
      'RNDR-USD', 'MKR-USD', 'AAVE-USD', 'CRV-USD', 'COMP-USD', 'SNX-USD', '1INCH-USD', 'LDO-USD', 'DYDX-USD',
      'GALA-USD', 'AXS-USD', 'MANA-USD', 'SAND-USD', 'GRT-USD', 'NEAR-USD', 'ALGO-USD', 'VET-USD', 'EOS-USD',
      'XTZ-USD', 'KAVA-USD', 'CRO-USD', 'QNT-USD', 'RUNE-USD', 'ENJ-USD', 'CHZ-USD', 'XLM-USD', 'HBAR-USD',
      'FTM-USD', 'ZIL-USD', 'DASH-USD', 'AR-USD', 'WETH-USD', 'WBNB-USD'
    ]
  },
  {
    name: 'HitBTC',
    api: 'https://api.hitbtc.com/api/3/public/ticker',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT',
      'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT', 'FIL-USDT',
      'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT', 'TIA-USDT',
      'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT',
      'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT',
      'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'LBANK',
    api: 'https://api.lbank.info/v2/ticker.do',
    symbols: [
      'BTC-USDT', 'ETH-USDT', 'ADA-USDT', 'XRP-USDT', 'SOL-USDT', 'DOGE-USDT', 'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT',
      'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'BCH-USDT', 'UNI-USDT', 'ATOM-USDT', 'ETC-USDT', 'FIL-USDT',
      'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT', 'WLD-USDT', 'TIA-USDT',
      'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT', 'SNX-USDT', '1INCH-USDT',
      'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT', 'NEAR-USDT', 'ALGO-USDT',
      'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT', 'ENJ-USDT', 'CHZ-USDT',
      'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT', 'WBNB-USDT'
    ]
  },
  {
    name: 'OneInch',
    api: 'https://api.1inch.dev/swap/v5.2/1/quote',
    symbols: [
      'ETH-USDT', 'USDC-USDT', 'WBTC-ETH', 'DAI-USDT', 'LINK-ETH', 'UNI-ETH', 'AAVE-ETH', 'MKR-ETH', 'CRV-ETH',
      'COMP-ETH', 'SNX-ETH', '1INCH-ETH', 'LDO-ETH', 'DYDX-ETH', 'GALA-ETH', 'AXS-ETH', 'MANA-ETH', 'SAND-ETH',
      'GRT-ETH', 'NEAR-ETH', 'ALGO-ETH', 'VET-ETH', 'EOS-ETH', 'XTZ-ETH', 'KAVA-ETH', 'CRO-ETH', 'QNT-ETH', 'RUNE-ETH',
      'ENJ-ETH', 'CHZ-ETH', 'XLM-ETH', 'HBAR-ETH', 'FTM-ETH', 'ZIL-ETH', 'DASH-ETH', 'AR-ETH', 'WETH-ETH'
    ]
  },
  {
    name: 'PancakeSwap',
    api: 'https://api.1inch.dev/swap/v5.2/56/quote',
    symbols: [
      'BNB-USDT', 'CAKE-USDT', 'BTCB-USDT', 'ETH-USDT', 'USDC-USDT', 'BUSD-USDT', 'ADA-USDT', 'XRP-USDT', 'DOGE-USDT',
      'MATIC-USDT', 'DOT-USDT', 'SHIB-USDT', 'AVAX-USDT', 'TRX-USDT', 'LTC-USDT', 'LINK-USDT', 'UNI-USDT', 'ATOM-USDT',
      'ETC-USDT', 'FIL-USDT', 'APT-USDT', 'ARB-USDT', 'OP-USDT', 'SUI-USDT', 'PEPE-USDT', 'FLOKI-USDT', 'INJ-USDT',
      'WLD-USDT', 'TIA-USDT', 'SEI-USDT', 'STX-USDT', 'RNDR-USDT', 'MKR-USDT', 'AAVE-USDT', 'CRV-USDT', 'COMP-USDT',
      'SNX-USDT', '1INCH-USDT', 'LDO-USDT', 'DYDX-USDT', 'GALA-USDT', 'AXS-USDT', 'MANA-USDT', 'SAND-USDT', 'GRT-USDT',
      'NEAR-USDT', 'ALGO-USDT', 'VET-USDT', 'EOS-USDT', 'XTZ-USDT', 'KAVA-USDT', 'CRO-USDT', 'QNT-USDT', 'RUNE-USDT',
      'ENJ-USDT', 'CHZ-USDT', 'XLM-USDT', 'HBAR-USDT', 'FTM-USDT', 'ZIL-USDT', 'DASH-USDT', 'AR-USDT', 'WETH-USDT'
    ]
  }
];
