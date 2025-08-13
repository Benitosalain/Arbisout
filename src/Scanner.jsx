import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { canonicalizeSymbol, extractPairFromOpportunity } from "./symbol-mapping.js";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const STRATEGY_LABELS = {
  cross: "Cross-Exchange",
  inter: "Inter-Asset",
  triangular: "Triangular",
  stat: "Statistical",
  funding: "Funding"
};
const STRATEGY_KEYS = Object.keys(STRATEGY_LABELS);

function Scanner() {
  const [allOpps, setAllOpps] = useState({});
  const [lastNonEmptyOpps, setLastNonEmptyOpps] = useState({});
  const [strategy, setStrategy] = useState("cross");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [lastSeen, setLastSeen] = useState({});
  const [recentOpps, setRecentOpps] = useState({});

  // Helper function to safely get profit percentage
  const getProfitPercent = (op) => {
    return op.profitPercent || op.profitPercentage || op.annualizedReturn || '0';
  };

  // Helper function to safely get pair name
  const getPairName = (op) => {
    try {
      const pairStr = extractPairFromOpportunity(op);
      return canonicalizeSymbol(pairStr);
    } catch (error) {
      console.warn('Error getting pair name:', error, op);
      return 'Unknown';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const THRESHOLDS = {
        cross: 0.5,      // Lowered from 1%
        inter: 0.3,
        triangular: 0.1,
        stat: 1.5,       // Lowered from 2% to see more opportunities
        funding: 5       // Lowered from 10% to see more opportunities
      };

      try {
        const response = await fetch(`${API_BASE}/api/opportunities`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        console.log('Raw data from API:', data); // Debug log

        const now = Date.now();
        const updatedRecent = { ...recentOpps };
        const filtered = {};

        STRATEGY_KEYS.forEach(key => {
          const raw = data[key] || [];
          console.log(`Processing ${key}:`, raw); // Debug log
          
          const minThreshold = THRESHOLDS[key];

          const filteredData = raw.filter(op => {
            const profitValue = parseFloat(getProfitPercent(op));
            const meetsThreshold = !isNaN(profitValue) && profitValue >= minThreshold;
            
            // Additional validation based on strategy type
            if (key === 'stat') {
              return meetsThreshold && (op.zScore || op.signal);
            }
            if (key === 'funding') {
              return meetsThreshold && op.fundingRate !== undefined;
            }
            if (key === 'triangular') {
              return meetsThreshold && (op.route || op.triangle || op.pairs);
            }
            if (key === 'inter') {
              return meetsThreshold && op.exchange;
            }
            if (key === 'cross') {
              return meetsThreshold && (op.buyEx || op.buyExchange) && (op.sellEx || op.sellExchange);
            }
            
            return meetsThreshold;
          });

          filtered[key] = filteredData;
          console.log(`Filtered ${key}:`, filteredData.length, 'opportunities'); // Debug log

          filteredData.forEach(op => {
            const keyHash = JSON.stringify(op);
            updatedRecent[keyHash] = { op, timestamp: now };
          });
        });

        const validRecent = {};
        Object.entries(updatedRecent).forEach(([key, value]) => {
          if (now - value.timestamp < 30000) {
            validRecent[key] = value;
          }
        });

        setRecentOpps(validRecent);
        setAllOpps(filtered);
        setLastUpdated(new Date());

        STRATEGY_KEYS.forEach(key => {
          if (Array.isArray(filtered[key]) && filtered[key].length > 0) {
            setLastNonEmptyOpps(prev => ({ ...prev, [key]: filtered[key] }));
            setLastSeen(prev => ({ ...prev, [key]: new Date() }));
          }
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError("Failed to fetch data. Please ensure the backend server is running and accessible.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, [recentOpps]);

  const isFresh = (op) => {
    const keyHash = JSON.stringify(op);
    const entry = recentOpps[keyHash];
    return entry && (Date.now() - entry.timestamp < 3000);
  };

  // Get opportunities for current strategy
  const getCurrentOpps = () => {
    const current = allOpps[strategy] || [];
    const fallback = lastNonEmptyOpps[strategy] || [];
    
    return current.length > 0 ? current : fallback.slice(0, 10); // Show max 10 recent ones
  };

  const opps = getCurrentOpps();

  return (
    <div className="mb-4 bg-gray-900 p-6 rounded-2xl shadow-2xl border border-yellow-500 animate-fade-in">
      <h2 className="text-4xl font-black text-yellow-400 mb-6 tracking-widest text-center flex items-center justify-center gap-2">
        <TrendingUp className="w-8 h-8" /> Opportunities
      </h2>

      <div className="flex justify-center mb-6 gap-2 flex-wrap">
        {STRATEGY_KEYS.map(key => (
          <button
            key={key}
            onClick={() => setStrategy(key)}
            className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 border-2 relative
              ${strategy === key
                ? "bg-yellow-500 text-black border-yellow-400 shadow-md"
                : "bg-gray-800 text-yellow-300 hover:bg-yellow-500 hover:text-black border-gray-700"}`}
          >
            {STRATEGY_LABELS[key]}
            {(allOpps[key] || []).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {(allOpps[key] || []).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4 text-sm text-yellow-200">
        <span>
          {(allOpps[strategy] || []).length > 0
            ? <span className="text-green-400 font-bold">{(allOpps[strategy] || []).length} live opportunity{(allOpps[strategy] || []).length > 1 ? "ies" : "y"}</span>
            : opps.length > 0
              ? <span className="text-yellow-400 font-bold">Showing {opps.length} recent opportunities</span>
              : <span className="text-gray-400">No opportunities found</span>}
        </span>
        <span>
          Last updated: {lastUpdated && lastUpdated.toLocaleTimeString()}
          {lastSeen[strategy] && (
            <span className="ml-2 text-yellow-300">
              | Last seen: {lastSeen[strategy].toLocaleTimeString()}
            </span>
          )}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-yellow-600 shadow-md">
        <table className="min-w-full bg-black text-yellow-200">
          <thead className="bg-yellow-800 text-yellow-100">
            <tr>
              {strategy === "cross" && (
                <>
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3">Buy From</th>
                  <th className="px-4 py-3">Buy Price</th>
                  <th className="px-4 py-3">Sell To</th>
                  <th className="px-4 py-3">Sell Price</th>
                  <th className="px-4 py-3">Profit %</th>
                </>
              )}
              {strategy === "inter" && (
                <>
                  <th className="px-4 py-3">Triangle/Pair</th>
                  <th className="px-4 py-3">Exchange</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Direct Rate</th>
                  <th className="px-4 py-3">Implied Rate</th>
                  <th className="px-4 py-3">Profit %</th>
                </>
              )}
              {strategy === "triangular" && (
                <>
                  <th className="px-4 py-3">Exchange</th>
                  <th className="px-4 py-3">Triangle</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Final Rate</th>
                  <th className="px-4 py-3">Profit %</th>
                </>
              )}
              {strategy === "stat" && (
                <>
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3">Current Spread</th>
                  <th className="px-4 py-3">Historical Mean</th>
                  <th className="px-4 py-3">Z-Score</th>
                  <th className="px-4 py-3">Signal</th>
                  <th className="px-4 py-3">Confidence</th>
                </>
              )}
              {strategy === "funding" && (
                <>
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3">Exchange</th>
                  <th className="px-4 py-3">Strategy</th>
                  <th className="px-4 py-3">Funding Rate %</th>
                  <th className="px-4 py-3">Annualized %</th>
                  <th className="px-4 py-3">Daily Profit</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-900">
            {opps.length > 0 ? opps.map((op, i) => (
              <tr
                key={i}
                className={
                  "hover:bg-yellow-900/20 transition-all duration-200 " +
                  ((allOpps[strategy] || []).length > 0 ? "bg-green-900/40 font-bold " : "bg-gray-900/60 ") +
                  (isFresh(op) ? "animate-fade-slow" : "")
                }
              >
                {strategy === "cross" && (
                  <>
                    <td className="px-4 py-2">{getPairName(op)}</td>
                    <td className="px-4 py-2">{op.buyEx || op.buyExchange}</td>
                    <td className="px-4 py-2 text-green-400">${parseFloat(op.buyPrice || 0).toLocaleString()}</td>
                    <td className="px-4 py-2">{op.sellEx || op.sellExchange}</td>
                    <td className="px-4 py-2 text-green-400">${parseFloat(op.sellPrice || 0).toLocaleString()}</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{getProfitPercent(op)}%</td>
                  </>
                )}
                {strategy === "inter" && (
                  <>
                    <td className="px-4 py-2">{op.triangle || getPairName(op)}</td>
                    <td className="px-4 py-2">{op.exchange}</td>
                    <td className="px-4 py-2 text-blue-400">{op.route}</td>
                    <td className="px-4 py-2">{op.directRate}</td>
                    <td className="px-4 py-2">{op.impliedRate}</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{getProfitPercent(op)}%</td>
                  </>
                )}
                {strategy === "triangular" && (
                  <>
                    <td className="px-4 py-2">{op.exchange}</td>
                    <td className="px-4 py-2">{(op.triangle || []).join('-') || getPairName(op)}</td>
                    <td className="px-4 py-2 text-blue-400">{(op.route || op.pairs || []).join(" → ")}</td>
                    <td className="px-4 py-2">{op.finalRate}</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{getProfitPercent(op)}%</td>
                  </>
                )}
                {strategy === "stat" && (
                  <>
                    <td className="px-4 py-2">{getPairName(op)}</td>
                    <td className="px-4 py-2">{op.currentSpread}%</td>
                    <td className="px-4 py-2">{op.historicalMean}%</td>
                    <td className="px-4 py-2 font-bold">{op.zScore}</td>
                    <td className="px-4 py-2 text-blue-400">{op.signal}</td>
                    <td className="px-4 py-2 text-green-400">{op.confidence}x</td>
                  </>
                )}
                {strategy === "funding" && (
                  <>
                    <td className="px-4 py-2">{getPairName(op)}</td>
                    <td className="px-4 py-2">{op.exchange}</td>
                    <td className="px-4 py-2 text-blue-400">{op.strategy}</td>
                    <td className="px-4 py-2">{parseFloat(op.fundingRate || 0).toFixed(4)}%</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{op.annualizedReturn || getProfitPercent(op)}%</td>
                    <td className="px-4 py-2 text-green-400">${op.estimatedDailyProfit || 'N/A'}</td>
                  </>
                )}
              </tr>
            )) : (
              <tr>
                <td 
                  colSpan={strategy === "funding" ? 6 : strategy === "stat" ? 6 : strategy === "triangular" ? 5 : 6}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  {loading ? "Loading opportunities..." : "No opportunities found for this strategy"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {loading && <p className="text-yellow-300 text-center text-lg mt-4 animate-pulse">Loading opportunities...</p>}
      {error && <p className="text-red-500 text-center text-lg mt-4">{error}</p>}
      
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-800 rounded text-xs text-gray-400">
          <strong>Debug:</strong> Strategy: {strategy}, 
          Live: {(allOpps[strategy] || []).length}, 
          Recent: {Object.keys(recentOpps).length}, 
          Showing: {opps.length}
        </div>
      )}
    </div>
  );
}

export default Scanner;
