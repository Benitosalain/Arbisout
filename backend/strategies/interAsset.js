// Enhanced inter-asset arbitrage with dynamic pair discovery

export function interAssetArb(pricesByPair, minProfitPercent = 0.5) {
  const ops = [];
  
  // Get all available pairs and extract unique assets
  const pairs = Object.keys(pricesByPair);
  const assets = new Set();
  const pairMap = {};
  
  // Build asset list and pair mapping
  pairs.forEach(pair => {
    const [base, quote] = pair.split('-');
    assets.add(base);
    assets.add(quote);
    
    if (!pairMap[base]) pairMap[base] = {};
    if (!pairMap[quote]) pairMap[quote] = {};
    
    pairMap[base][quote] = pair;
    pairMap[quote][base] = pair;
  });
  
  const assetList = Array.from(assets);
  
  // Find triangular arbitrage opportunities across all possible combinations
  for (let i = 0; i < assetList.length; i++) {
    for (let j = i + 1; j < assetList.length; j++) {
      for (let k = j + 1; k < assetList.length; k++) {
        const [assetA, assetB, assetC] = [assetList[i], assetList[j], assetList[k]];
        
        // Try to find all three pairs for this triangle
        const pairAB = pairMap[assetA]?.[assetB];
        const pairBC = pairMap[assetB]?.[assetC];
        const pairAC = pairMap[assetA]?.[assetC];
        
        if (!pairAB || !pairBC || !pairAC) continue;
        
        // Check each exchange that has all three pairs
        const exchangesAB = Object.keys(pricesByPair[pairAB] || {});
        const exchangesBC = Object.keys(pricesByPair[pairBC] || {});
        const exchangesAC = Object.keys(pricesByPair[pairAC] || {});
        
        const commonExchanges = exchangesAB.filter(ex => 
          exchangesBC.includes(ex) && exchangesAC.includes(ex)
        );
        
        for (const exchange of commonExchanges) {
          const priceAB = pricesByPair[pairAB][exchange];
          const priceBC = pricesByPair[pairBC][exchange];
          const priceAC = pricesByPair[pairAC][exchange];
          
          if (!priceAB || !priceBC || !priceAC) continue;
          
          // Calculate implied price and profit opportunities
          const opportunities = calculateTriangleOpportunities(
            assetA, assetB, assetC,
            pairAB, pairBC, pairAC,
            priceAB, priceBC, priceAC,
            exchange,
            minProfitPercent
          );
          
          ops.push(...opportunities);
        }
      }
    }
  }
  
  // Also check specific common triangles if they exist
  const commonTriangles = [
    ['BTC', 'ETH', 'USDT'],
    ['BTC', 'ETH', 'USDC'],
    ['ETH', 'BNB', 'USDT'],
    ['BTC', 'ADA', 'USDT'],
    ['ETH', 'DOT', 'USDT']
  ];
  
  for (const [assetA, assetB, assetC] of commonTriangles) {
    if (!assets.has(assetA) || !assets.has(assetB) || !assets.has(assetC)) continue;
    
    const pairs = [
      `${assetA}-${assetB}`, `${assetB}-${assetA}`,
      `${assetB}-${assetC}`, `${assetC}-${assetB}`,
      `${assetA}-${assetC}`, `${assetC}-${assetA}`
    ].filter(pair => pricesByPair[pair]);
    
    if (pairs.length < 3) continue;
    
    // Find exchanges with all required pairs
    const exchangeSets = pairs.map(pair => new Set(Object.keys(pricesByPair[pair] || {})));
    const commonExchanges = [...exchangeSets[0]].filter(ex => 
      exchangeSets.every(set => set.has(ex))
    );
    
    for (const exchange of commonExchanges) {
      const triangleOps = findTriangleArbitrage(
        assetA, assetB, assetC,
        pricesByPair, exchange, minProfitPercent
      );
      ops.push(...triangleOps);
    }
  }
  
  return ops.sort((a, b) => Math.abs(b.profitPercent) - Math.abs(a.profitPercent));
}

function calculateTriangleOpportunities(assetA, assetB, assetC, pairAB, pairBC, pairAC, priceAB, priceBC, priceAC, exchange, minProfit) {
  const ops = [];
  
  // Route 1: A -> B -> C, compare with direct A -> C
  const [baseAB, quoteAB] = pairAB.split('-');
  const [baseBC, quoteBC] = pairBC.split('-');
  const [baseAC, quoteAC] = pairAC.split('-');
  
  let rateAB, rateBC, rateAC;
  
  // Determine conversion rates based on pair directions
  if (baseAB === assetA && quoteAB === assetB) {
    rateAB = priceAB; // A -> B
  } else if (baseAB === assetB && quoteAB === assetA) {
    rateAB = 1 / priceAB; // A -> B
  } else return ops;
  
  if (baseBC === assetB && quoteBC === assetC) {
    rateBC = priceBC; // B -> C
  } else if (baseBC === assetC && quoteBC === assetB) {
    rateBC = 1 / priceBC; // B -> C
  } else return ops;
  
  if (baseAC === assetA && quoteAC === assetC) {
    rateAC = priceAC; // A -> C direct
  } else if (baseAC === assetC && quoteAC === assetA) {
    rateAC = 1 / priceAC; // A -> C direct
  } else return ops;
  
  // Calculate implied rate via A -> B -> C
  const impliedAC = rateAB * rateBC;
  const profitPercent = ((impliedAC - rateAC) / rateAC) * 100;
  
  if (Math.abs(profitPercent) >= minProfit) {
    ops.push({
      type: 'INTER_ASSET',
      exchange,
      triangle: `${assetA}-${assetB}-${assetC}`,
      route: profitPercent > 0 ? `${assetA}->${assetB}->${assetC}` : `${assetC}->${assetB}->${assetA}`,
      directRate: rateAC.toFixed(8),
      impliedRate: impliedAC.toFixed(8),
      profitPercent: Math.abs(profitPercent).toFixed(4),
      direction: profitPercent > 0 ? 'INDIRECT_BETTER' : 'DIRECT_BETTER',
      pairs: [pairAB, pairBC, pairAC]
    });
  }
  
  return ops;
}

function findTriangleArbitrage(assetA, assetB, assetC, pricesByPair, exchange, minProfit) {
  const ops = [];
  
  // Try different pair combinations
  const possiblePairs = [
    [`${assetA}-${assetB}`, `${assetB}-${assetC}`, `${assetA}-${assetC}`],
    [`${assetB}-${assetA}`, `${assetB}-${assetC}`, `${assetA}-${assetC}`],
    [`${assetA}-${assetB}`, `${assetC}-${assetB}`, `${assetA}-${assetC}`],
    [`${assetA}-${assetB}`, `${assetB}-${assetC}`, `${assetC}-${assetA}`]
  ];
  
  for (const [pair1, pair2, pair3] of possiblePairs) {
    const price1 = pricesByPair[pair1]?.[exchange];
    const price2 = pricesByPair[pair2]?.[exchange];
    const price3 = pricesByPair[pair3]?.[exchange];
    
    if (!price1 || !price2 || !price3) continue;
    
    // Calculate round-trip rate
    let rate1 = price1;
    let rate2 = price2;
    let rate3 = 1 / price3; // Reverse the third leg
    
    const final = rate1 * rate2 * rate3;
    const profitPercent = (final - 1) * 100;
    
    if (Math.abs(profitPercent) >= minProfit) {
      ops.push({
        type: 'TRIANGULAR_INTER_ASSET',
        exchange,
        triangle: `${assetA}-${assetB}-${assetC}`,
        route: [pair1, pair2, pair3],
        finalRate: final.toFixed(6),
        profitPercent: profitPercent.toFixed(4),
        prices: [price1, price2, price3]
      });
    }
  }
  
  return ops;
}
