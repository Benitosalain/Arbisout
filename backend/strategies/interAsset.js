// Looks for price mismatches between correlated pairs

export function interAssetArb(pricesByPair, minProfitPercent = 1) {
  // Example: ETH-BTC, ETH-USDT, BTC-USDT
  const ops = [];
  if (pricesByPair["ETH-BTC"] && pricesByPair["ETH-USDT"] && pricesByPair["BTC-USDT"]) {
    for (const ex in pricesByPair["ETH-BTC"]) {
      const ethBtc = pricesByPair["ETH-BTC"][ex];
      const ethUsdt = pricesByPair["ETH-USDT"][ex];
      const btcUsdt = pricesByPair["BTC-USDT"][ex];
      if (!ethBtc || !ethUsdt || !btcUsdt) {
        console.log(`[interAssetArb] Skipping ${ex}: missing price(s)`, { ethBtc, ethUsdt, btcUsdt });
        continue;
      }
      const implied = ethBtc * btcUsdt;
      const profitPercent = ((ethUsdt - implied) / implied) * 100;
      if (Math.abs(profitPercent) >= minProfitPercent) {
        ops.push({ exchange: ex, profitPercent: profitPercent.toFixed(2), ethUsdt, implied });
      }
    }
  }
  return ops;
}