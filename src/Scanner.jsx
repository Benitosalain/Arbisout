import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { canonicalizeSymbol } from "./utils/symbol-mapping";

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

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const THRESHOLDS = {
      cross: 1,
      inter: 0.3,
      triangular: 0.1,
      stat: 0.1,
      funding: 0.1
    };

    try {
      const response = await fetch(`${API_BASE}/api/opportunities`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const now = Date.now();
      const updatedRecent = { ...recentOpps };
      const filtered = {};

      STRATEGY_KEYS.forEach(key => {
        const raw = data[key] || [];
        const minProfit = THRESHOLDS[key];

        const filteredData = raw.filter(op =>
          parseFloat(op.profitPercent || op.profitPercentage) >= minProfit
        );

        filtered[key] = filteredData;

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

  const opps = Object.values(recentOpps)
    .map(o => o.op)
    .filter(op => {
      if (strategy === 'cross') return op.buyEx || op.buyExchange;
      if (strategy === 'inter') return op.exchange;
      if (strategy === 'triangular') return op.steps;
      if (strategy === 'stat') return op.pair && op.mean;
      if (strategy === 'funding') return op.exchange && op.pair && op.fundingRate;
      return false;
    });

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
            className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 border-2
              ${strategy === key
                ? "bg-yellow-500 text-black border-yellow-400 shadow-md"
                : "bg-gray-800 text-yellow-300 hover:bg-yellow-500 hover:text-black border-gray-700"}`}
          >
            {STRATEGY_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4 text-sm text-yellow-200">
        <span>
          {opps.length > 0
            ? <span className="text-green-400 font-bold">{opps.length} opportunity{opps.length > 1 ? "ies" : "y"} found</span>
            : lastNonEmptyOpps[strategy]
              ? <span className="text-yellow-400 font-bold">No current opportunities. Showing recent ones.</span>
              : "No opportunities found"}
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
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3">Exchange</th>
                  <th className="px-4 py-3">Profit %</th>
                  <th className="px-4 py-3">ETH/USDT</th>
                  <th className="px-4 py-3">Implied</th>
                </>
              )}
              {strategy === "triangular" && (
                <>
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3">Steps</th>
                  <th className="px-4 py-3">Profit %</th>
                </>
              )}
              {strategy === "stat" && (
                <>
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3">Mean</th>
                  <th className="px-4 py-3">Std</th>
                  <th className="px-4 py-3">Latest</th>
                  <th className="px-4 py-3">Profit %</th>
                </>
              )}
              {strategy === "funding" && (
                <>
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3">Exchange</th>
                  <th className="px-4 py-3">Funding Rate</th>
                  <th className="px-4 py-3">Profit %</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-900">
            {opps.map((op, i) => (
              <tr
                key={i}
                className={
                  "bg-green-900/40 font-bold hover:bg-yellow-900/20 transition-all duration-200" +
                  (isFresh(op) ? " animate-fade-slow" : "")
                }
              >
                {strategy === "cross" && (
                  <>
                    <td className="px-4 py-2">{canonicalizeSymbol(op.pair)}</td>
                    <td className="px-4 py-2">{op.buyEx || op.buyExchange}</td>
                    <td className="px-4 py-2 text-green-400">${parseFloat(op.buyPrice).toLocaleString()}</td>
                    <td className="px-4 py-2">{op.sellEx || op.sellExchange}</td>
                    <td className="px-4 py-2 text-green-400">${parseFloat(op.sellPrice).toLocaleString()}</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{op.profitPercent || op.profitPercentage}%</td>
                  </>
                )}
                {strategy === "inter" && (
                  <>
                    <td className="px-4 py-2">{canonicalizeSymbol(op.pair)}</td>
                    <td className="px-4 py-2">{op.exchange}</td>
                    <td className="px-4 py-2 text-green-400">{op.profitPercent}%</td>
                    <td className="px-4 py-2">{op.ethUsdt}</td>
                    <td className="px-4 py-2">{op.implied}</td>
                  </>
                )}
                {strategy === "triangular" && (
                  <>
                    <td className="px-4 py-2">{canonicalizeSymbol(op.pair)}</td>
                    <td className="px-4 py-2">{op.steps?.join(" → ")}</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{op.profitPercent}%</td>
                  </>
                )}
                {strategy === "stat" && (
                  <>
                    <td className="px-4 py-2">{canonicalizeSymbol(op.pair)}</td>
                    <td className="px-4 py-2">{op.mean}</td>
                    <td className="px-4 py-2">{op.std}</td>
                    <td className="px-4 py-2">{op.latest}</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{op.profitPercent}%</td>
                  </>
                )}
                {strategy === "funding" && (
                  <>
                    <td className="px-4 py-2">{canonicalizeSymbol(op.pair)}</td>
                    <td className="px-4 py-2">{op.exchange}</td>
                    <td className="px-4 py-2">{op.fundingRate}</td>
                    <td className="px-4 py-2 text-yellow-300 font-black">{op.profitPercent}%</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p className="text-yellow-300 text-center text-lg mt-4 animate-pulse">Loading opportunities...</p>}
      {error && <p className="text-red-500 text-center text-lg mt-4">{error}</p>}
    </div>
  );
}

export default Scanner;
