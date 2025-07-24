import { SYMBOLS } from "./symbols.js";
import { pricesByExchange } from "./symbol-mapping.js";
import * as binance from "./adapters/binance.js";
import * as binanceus from "./adapters/binanceus.js";

export async function getAllPrices() {
  const results = {};
  for (const symbol of SYMBOLS) {
    results[symbol] = {};
    // Binance
    const binanceSymbol = pricesByExchange['Binance'][symbol];
    if (binanceSymbol) {
      try {
        results[symbol].Binance = await binance.fetchBinanceTicker(binanceSymbol);
      } catch (e) {
        console.log(`Binance missing ${symbol}:`, e.message);
      }
    }
    // BinanceUS
    const binanceUSSymbol = pricesByExchange['BinanceUS'][symbol];
    if (binanceUSSymbol) {
      try {
        results[symbol].BinanceUS = await binanceus.fetchBinanceUSTicker(binanceUSSymbol);
      } catch (e) {
        console.log(`BinanceUS missing ${symbol}:`, e.message);
      }
    }
    // ...repeat for other exchanges...
  }
  return results;
}