// Enhanced triangular arbitrage with better path detection and validation

export function triangularArb(pricesByExchange, minProfitPercent = 0.1) {
  const ops = [];
  
  for (const [exchange, prices] of Object.entries(pricesByExchange)) {
    const pairs = Object.keys(prices).filter(pair => prices[pair] != null);
    
    if (pairs.length < 3) {
      console.log(`[triangularArb] ${exchange}: Not enough pairs (${pairs.length})`);
      continue;
    }
    
    // Build asset graph
    const assets = new Set();
    const pairMap = new Map();
    
    pairs.forEach(pairStr => {
      const [base, quote] = pairStr.split('-');
      if (!base || !quote) return;
      
      assets.add(base);
      assets.add(quote);
      
      // Create bidirectional mapping
      const key1 = `${base}-${quote}`;
      const key2 = `${quote}-${base}`;
      
      pairMap.set(key1, { pair: pairStr, rate: prices[pairStr], direct: true });
      pairMap.set(key2, { pair: pairStr, rate: 1 / prices[pairStr], direct: false });
    });
    
    const assetList = Array.from(assets);
    let foundValidTriangle = false;
    
    // Find all possible triangular paths
    for (let i = 0; i < assetList.length; i++) {
      for (let j = i + 1; j < assetList.length; j++) {
        for (let k = j + 1; k < assetList.length; k++) {
          const [assetA, assetB, assetC] = [assetList[i], assetList[j], assetList[k]];
          
          // Find all possible routes through this triangle
          const routes = findTriangularRoutes(assetA, assetB, assetC, pairMap);
          
          for (const route of routes) {
            if (!route.isValid) continue;
            
            const profitPercent = (route.finalRate - 1) * 100;
            
            if (Math.abs(profitPercent) >= minProfitPercent) {
              ops.push({
                exchange,
                triangle: [assetA, assetB, assetC],
                route: route.path,
                pairs: route.pairs,
                rates: route.rates,
                finalRate: route.finalRate.toFixed(8),
                profitPercent: profitPercent.toFixed(4),
                direction: profitPercent > 0 ? 'PROFITABLE' : 'REVERSE_PROFITABLE',
                // Additional execution info
                startAsset: assetA,
                volume: calculateOptimalVolume(route, 1000), // $1000 starting amount
                estimatedProfit: (1000 * profitPercent / 100).toFixed(2)
              });
              
              foundValidTriangle = true;
            }
          }
        }
      }
    }
    
    // Also check common triangle patterns explicitly
    const commonTriangles = [
      ['BTC', 'ETH', 'USDT'],
      ['BTC', 'ETH', 'USDC'],
      ['ETH', 'BNB', 'USDT'],
      ['BTC', 'ADA', 'USDT'],
      ['ETH', 'LINK', 'USDT'],
      ['BTC', 'DOT', 'USDT']
    ];
    
    for (const [assetA, assetB, assetC] of commonTriangles) {
      if (!assets.has(assetA) || !assets.has(assetB) || !assets.has(assetC)) continue;
      
      const specificRoutes = findSpecificTriangleRoutes(assetA, assetB, assetC, pairMap);
      
      for (const route of specificRoutes) {
        if (!route.isValid) continue;
        
        const profitPercent = (route.finalRate - 1) * 100;
        
        if (Math.abs(profitPercent) >= minProfitPercent) {
          // Avoid duplicates
          const exists = ops.some(op => 
            op.exchange === exchange &&
            JSON.stringify(op.triangle.sort()) === JSON.stringify([assetA, assetB, assetC].sort()) &&
            Math.abs(parseFloat(op.profitPercent) - Math.abs(profitPercent)) < 0.001
          );
          
          if (!exists) {
            ops.push({
              exchange,
              triangle: [assetA, assetB, assetC],
              route: route.path,
              pairs: route.pairs,
              rates: route.rates,
              finalRate: route.finalRate.toFixed(8),
              profitPercent: profitPercent.toFixed(4),
              direction: profitPercent > 0 ? 'PROFITABLE' : 'REVERSE_PROFITABLE',
              startAsset: assetA,
              volume: calculateOptimalVolume(route, 1000),
              estimatedProfit: (1000 * Math.abs(profitPercent) / 100).toFixed(2)
            });
            
            foundValidTriangle = true;
          }
        }
      }
    }
    
    if (!foundValidTriangle) {
      console.log(`[triangularArb] ${exchange}: No profitable triangles found among ${assetList.length} assets`);
    } else {
      console.log(`[triangularArb] ${exchange}: Found ${ops.filter(op => op.exchange === exchange).length} opportunities`);
    }
  }
  
  return ops.sort((a, b) => Math.abs(parseFloat(b.profitPercent)) - Math.abs(parseFloat(a.profitPercent)));
}

function findTriangularRoutes(assetA, assetB, assetC, pairMap) {
  const routes = [];
  
  // Try all possible paths: A->B->C->A and A->C->B->A
  const paths = [
    [`${assetA}-${assetB}`, `${assetB}-${assetC}`, `${assetC}-${assetA}`],
    [`${assetA}-${assetC}`, `${assetC}-${assetB}`, `${assetB}-${assetA}`]
  ];
  
  for (const path of paths) {
    const route = {
      path: path,
      pairs: [],
      rates: [],
      finalRate: 1,
      isValid: true
    };
    
    for (const step of path) {
      const mapping = pairMap.get(step);
      if (!mapping || !mapping.rate || isNaN(mapping.rate)) {
        route.isValid = false;
        break;
      }
      
      route.pairs.push(mapping.pair);
      route.rates.push(mapping.rate);
      route.finalRate *= mapping.rate;
    }
    
    if (route.isValid && isFinite(route.finalRate) && route.finalRate > 0) {
      routes.push(route);
    }
  }
  
  return routes;
}

function findSpecificTriangleRoutes(assetA, assetB, assetC, pairMap) {
  const routes = [];
  
  // Generate all 6 possible paths through the triangle
  const allPaths = [
    [`${assetA}-${assetB}`, `${assetB}-${assetC}`, `${assetC}-${assetA}`],
    [`${assetA}-${assetC}`, `${assetC}-${assetB}`, `${assetB}-${assetA}`],
    [`${assetB}-${assetA}`, `${assetA}-${assetC}`, `${assetC}-${assetB}`],
    [`${assetB}-${assetC}`, `${assetC}-${assetA}`, `${assetA}-${assetB}`],
    [`${assetC}-${assetA}`, `${assetA}-${assetB}`, `${assetB}-${assetC}`],
    [`${assetC}-${assetB}`, `${assetB}-${assetA}`, `${assetA}-${assetC}`]
  ];
  
  for (const path of allPaths) {
    const route = {
      path: path,
      pairs: [],
      rates: [],
      finalRate: 1,
      isValid: true
    };
    
    for (const step of path) {
      const mapping = pairMap.get(step);
      if (!mapping || !mapping.rate || isNaN(mapping.rate) || mapping.rate <= 0) {
        route.isValid = false;
        break;
      }
      
      route.pairs.push(mapping.pair);
      route.rates.push(mapping.rate);
      route.finalRate *= mapping.rate;
    }
    
    if (route.isValid && isFinite(route.finalRate) && route.finalRate > 0) {
      routes.push(route);
    }
  }
  
  return routes;
}

function calculateOptimalVolume(route, startAmount) {
  // Simple volume calculation - in practice you'd need to consider order book depth
  let currentAmount = startAmount;
  
  for (const rate of route.rates) {
    currentAmount *= rate;
    // Apply a conservative factor for slippage/fees
    currentAmount *= 0.999; // 0.1% slippage per trade
  }
  
  return {
    startAmount: startAmount,
    finalAmount: currentAmount.toFixed(2),
    slippageAdjusted: true
  };
}
