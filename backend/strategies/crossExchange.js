// Cross-exchange arbitrage strategy plugin

export function crossExchangeArb(pricesByPair, minProfitPercent = 1) {
  // pricesByPair: { "BTC-USDT": { "Binance": 105000, "Kraken": 105100, ... } }
  // Returns: Array of arbitrage ops
  const ops = [];
  for (const [pair, prices] of Object.entries(pricesByPair)) {
    const sorted = Object.entries(prices)
      .filter(([ex, price]) => price != null)
      .sort((a, b) => a[1] - b[1]);
    if (sorted.length < 2) continue;
    const [buyEx, buyPrice] = sorted[0];
    const [sellEx, sellPrice] = sorted[sorted.length - 1];
    const profitPercent = ((sellPrice - buyPrice) / buyPrice) * 100;
    if (profitPercent >= minProfitPercent) {
      ops.push({ pair, buyEx, buyPrice, sellEx, sellPrice, profitPercent: profitPercent.toFixed(2) });
    }
  }
  return ops;
}