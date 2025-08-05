// Enhanced funding arbitrage with real data handling and fallback logic

export function fundingArb(spotPrices, perpPrices, fundingRates, minAnnualized = 10) {
  const ops = [];
  
  for (const pair in spotPrices) {
    for (const ex in spotPrices[pair]) {
      const spot = spotPrices[pair][ex];
      const perp = perpPrices[pair]?.[ex];
      const funding = fundingRates[pair]?.[ex];
      
      // Skip if we don't have all required data
      if (!spot || !perp || funding === undefined || funding === null) {
        continue;
      }
      
      // Convert funding rate to percentage if it's in decimal form
      let fundingPercent = funding;
      if (Math.abs(funding) < 1) {
        fundingPercent = funding * 100; // Convert from decimal to percentage
      }
      
      // Calculate basis (premium/discount of perpetual vs spot)
      const basis = ((perp - spot) / spot) * 100;
      
      // Calculate annualized funding rate
      // Most exchanges use 8-hour funding periods (3 times per day)
      const periodsPerDay = 3;
      const annualized = Math.abs(fundingPercent) * periodsPerDay * 365;
      
      // Determine strategy direction
      let strategy = '';
      let expectedProfit = 0;
      
      if (fundingPercent > 0) {
        // Positive funding: longs pay shorts
        // Strategy: short perp, buy spot
        strategy = 'SHORT_PERP_LONG_SPOT';
        expectedProfit = annualized;
      } else {
        // Negative funding: shorts pay longs
        // Strategy: long perp, short spot
        strategy = 'LONG_PERP_SHORT_SPOT';
        expectedProfit = annualized;
      }
      
      // Check if opportunity meets minimum threshold
      if (expectedProfit >= minAnnualized) {
        ops.push({
          pair,
          exchange: ex,
          spot: parseFloat(spot.toFixed(6)),
          perp: parseFloat(perp.toFixed(6)),
          fundingRate: parseFloat(fundingPercent.toFixed(4)),
          basis: parseFloat(basis.toFixed(4)),
          annualizedReturn: parseFloat(expectedProfit.toFixed(2)),
          strategy,
          // Risk metrics
          priceDeviation: Math.abs(basis),
          fundingDirection: fundingPercent > 0 ? 'POSITIVE' : 'NEGATIVE',
          // Additional info for execution
          notionalRequired: 1000, // Example: $1000 position
          estimatedDailyProfit: parseFloat((expectedProfit / 365).toFixed(2))
        });
      }
    }
  }
  
  // Sort by annualized return (highest first)
  return ops.sort((a, b) => b.annualizedReturn - a.annualizedReturn);
}

// Helper function to simulate realistic funding rates for testing
export function generateRealisticMockFunding(pairs, exchanges) {
  const mockFunding = {};
  
  pairs.forEach(pair => {
    mockFunding[pair] = {};
    exchanges.forEach(ex => {
      // Generate more realistic funding rates
      // Typical funding rates range from -0.375% to +0.375% per 8 hours
      // That's roughly -10% to +10% annualized
      const baseFunding = (Math.random() - 0.5) * 0.75; // -0.375% to +0.375%
      
      // Add some volatility spikes occasionally
      const spike = Math.random() < 0.1 ? (Math.random() - 0.5) * 2 : 0;
      
      mockFunding[pair][ex] = baseFunding + spike;
    });
  });
  
  return mockFunding;
}

// Helper function to generate realistic perpetual prices
export function generateRealisticPerpPrices(spotPrices) {
  const perpPrices = {};
  
  for (const pair in spotPrices) {
    perpPrices[pair] = {};
    for (const ex in spotPrices[pair]) {
      const spot = spotPrices[pair][ex];
      if (spot) {
        // Perp prices typically trade at a small premium/discount to spot
        // Usually within ±2% of spot price
        const basisPoints = (Math.random() - 0.5) * 4; // -2% to +2%
        perpPrices[pair][ex] = spot * (1 + basisPoints / 100);
      }
    }
  }
  
  return perpPrices;
}
