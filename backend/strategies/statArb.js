// Looks for pairs where price difference is far from average

export function statArb(pricesByPair, history, threshold = 2) {
  // history: { "BTC-USDT": [spread1, spread2, ...] }
  // threshold: number of std deviations from mean
  const ops = [];
  for (const [pair, prices] of Object.entries(pricesByPair)) {
    const values = Object.values(prices).filter(x => x != null);
    if (values.length < 2) continue;
    const hist = history[pair] || [];
    if (hist.length < 10) continue;
    const mean = hist.reduce((a, b) => a + b, 0) / hist.length;
    const std = Math.sqrt(hist.map(x => (x - mean) ** 2).reduce((a, b) => a + b, 0) / hist.length);
    const spread = Math.max(...values) - Math.min(...values);
    if (spread > mean + threshold * std) {
      ops.push({ pair, spread, mean, std, signal: "StatArb Opportunity" });
    }
  }
  return ops;
}