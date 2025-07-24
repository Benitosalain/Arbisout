// Triangular arbitrage: e.g., BTC/ETH, ETH/USDT, BTC/USDT on one exchange

export function triangularArb(pricesByExchange, minProfitPercent = 1) {
  // pricesByExchange: { "Binance": { "BTC-USDT": 100, "ETH-USDT": 5, "BTC-ETH": 20 }, ... }
  const ops = [];
  for (const [exchange, prices] of Object.entries(pricesByExchange)) {
    const pairs = Object.keys(prices);
    let foundValid = false; // Track if any valid triangle found
    for (const a of pairs) {
      for (const b of pairs) {
        for (const c of pairs) {
          if (a === b || b === c || a === c) continue;
          // a: BASE-QUOTE1, b: QUOTE1-QUOTE2, c: BASE-QUOTE2
          const [baseA, quoteA] = a.split("-");
          const [baseB, quoteB] = b.split("-");
          const [baseC, quoteC] = c.split("-");
          if (quoteA === baseB && baseA === baseC && quoteB === quoteC) {
            // Simulate round-trip
            const rate1 = prices[a];
            const rate2 = prices[b];
            const rate3 = 1 / prices[c];
            if (
              rate1 == null || rate2 == null || prices[c] == null ||
              isNaN(rate1) || isNaN(rate2) || isNaN(prices[c])
            ) {
              console.log(`[triangularArb] Skipping triangle on ${exchange}: invalid price(s)`, { a, b, c, rate1, rate2, rate3 });
              continue;
            }
            const final = rate1 * rate2 * rate3;
            const profitPercent = (final - 1) * 100;
            if (profitPercent >= minProfitPercent) {
              ops.push({ exchange, route: [a, b, c], profitPercent: profitPercent.toFixed(2) });
              foundValid = true;
            }
          }
        }
      }
    }
    if (!foundValid) {
      console.log(`[triangularArb] No valid triangle found for ${exchange}. Pairs:`, pairs);
    }
  }
  return ops;
}