import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { canonicalizeSymbol, extractPairFromOpportunity } from "./utils/symbol-mapping.js";

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
  const [lastLiveUpdateByStrategy, setLastLiveUpdateByStrategy] = useState({});

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
        cross: 1.5,      // Lowered from 1%
        inter: 0.3,
        triangular: 0.1,
        stat: 0.5,       // Lowered from 2% to see more opportunities
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
        const updatedLastLive = {};

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
          if (filteredData.length > 0) {
            updatedLastLive[key] = now;
          }
        });

        const validRecent = {};
        Object.entries(updatedRecent).forEach(([key, value]) => {
          if (now - value.timestamp < 30000) {
            validRecent[key] = value;
          }
        setRecentOpps(prev => {
          const updatedRecent = { ...prev };
          STRATEGY_KEYS.forEach(key => {
            const filteredData = filtered[key] || [];
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
          return validRecent;
        });

        setRecentOpps(validRecent);
        setLastLiveUpdateByStrategy(prev => ({ ...prev, ...updatedLastLive }));
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
  }, []);

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

    // Do not keep showing stale opportunities for too long.
    const lastLiveTimestamp = lastLiveUpdateByStrategy[strategy] || 0;
    const canUseFallback = Date.now() - lastLiveTimestamp < 30000;

    return current.length > 0 ? current : (canUseFallback ? fallback.slice(0, 10) : []);
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
