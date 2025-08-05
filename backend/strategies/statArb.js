// Enhanced statistical arbitrage strategy with better data handling

export function statArb(pricesByPair, history, threshold = 2) {
  const ops = [];
  
  for (const [pair, prices] of Object.entries(pricesByPair)) {
    const exchanges = Object.keys(prices).filter(ex => prices[ex] != null);
    if (exchanges.length < 2) continue;
    
    const values = exchanges.map(ex => prices[ex]);
    const currentSpread = Math.max(...values) - Math.min(...values);
    const currentSpreadPercent = (currentSpread / Math.min(...values)) * 100;
    
    // Get historical data for this pair
    const hist = history[pair] || [];
    
    // If we don't have enough history, start building it but don't trade yet
    if (hist.length < 30) { // Increased minimum history requirement
      // Add current spread to history for future calculations
      hist.push(currentSpreadPercent);
      if (hist.length > 100) hist.shift(); // Keep last 100 data points
      continue;
    }
    
    // Calculate statistics
    const mean = hist.reduce((a, b) => a + b, 0) / hist.length;
    const variance = hist.map(x => (x - mean) ** 2).reduce((a, b) => a + b, 0) / hist.length;
    const std = Math.sqrt(variance);
    
    // Avoid division by zero
    if (std === 0) continue;
    
    const zScore = (currentSpreadPercent - mean) / std;
    
    // Look for significant deviations
    if (Math.abs(zScore) > threshold) {
      const minPriceEx = exchanges.find(ex => prices[ex] === Math.min(...values));
      const maxPriceEx = exchanges.find(ex => prices[ex] === Math.max(...values));
      
      ops.push({
        pair,
        currentSpread: currentSpreadPercent.toFixed(3),
        historicalMean: mean.toFixed(3),
        zScore: zScore.toFixed(2),
        std: std.toFixed(3),
        signal: zScore > threshold ? "SELL_HIGH_BUY_LOW" : "BUY_HIGH_SELL_LOW",
        buyExchange: minPriceEx,
        sellExchange: maxPriceEx,
        buyPrice: Math.min(...values),
        sellPrice: Math.max(...values),
        confidence: Math.min(Math.abs(zScore) / threshold, 3).toFixed(2) // Cap at 3x threshold
      });
    }
    
    // Update history with current spread
    hist.push(currentSpreadPercent);
    if (hist.length > 100) hist.shift();
  }
  
  return ops.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore));
}
