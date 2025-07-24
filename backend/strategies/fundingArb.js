// Arbitrage between spot and perpetual/futures markets

export function fundingArb(spotPrices, perpPrices, fundingRates, minAnnualized = 10) {
  // spotPrices: { "BTC-USDT": { "Binance": 100 }, ... }
  // perpPrices: { "BTC-USDT": { "Binance": 101 }, ... }
  // fundingRates: { "BTC-USDT": { "Binance": 0.01 }, ... } // 1% per 8h
  const ops = [];
  for (const pair in spotPrices) {
    for (const ex in spotPrices[pair]) {
      const spot = spotPrices[pair][ex];
      const perp = perpPrices[pair]?.[ex];
      const funding = fundingRates[pair]?.[ex];
      if (spot && perp && funding) {
        const basis = ((perp - spot) / spot) * 100;
        const annualized = funding * 3 * 365; // 3 periods per day
        if (annualized > minAnnualized) {
          ops.push({ pair, exchange: ex, spot, perp, funding, annualized, basis });
        }
      }
    }
  }
  return ops;
}