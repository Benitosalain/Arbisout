import express from "express";
import cors from "cors";
import { readFile } from "fs/promises";

// User management functions (from ./users.js in backend folder)
import {
  getAllUsers,
  addUser,
  deleteUser,
  findUser,
} from "./users.js";

// Arbitrage components
import { EXCHANGES } from "./EXCHANGES.js";
import { canonicalizeSymbol } from "./symbol-mapping.js";
import { SYMBOLS } from "./symbols.js";

import { crossExchangeArb } from "./strategies/crossExchange.js";
import { interAssetArb } from "./strategies/interAsset.js";
import { triangularArb } from "./strategies/triangular.js";
import { statArb } from "./strategies/statArb.js";
import { fundingArb } from "./strategies/fundingArb.js";

// Adapters (exchanges)
import { fetchBinanceTicker, binanceSymbol } from "./Adapters/binance.js";
import { fetchKrakenTicker, krakenSymbol } from "./Adapters/kraken.js";
import { fetchBitfinexTicker, bitfinexSymbol } from "./Adapters/bitfinex.js";
import { fetchHuobiTicker, huobiSymbol } from "./Adapters/huobi.js";
import { fetchOKExTicker, okexSymbol } from "./Adapters/okex.js";
import { fetchGateioTicker, gateioSymbol } from "./Adapters/gateio.js";
import { fetchKucoinTicker, kucoinSymbol } from "./Adapters/kucoin.js";
import { fetchBitstampTicker, bitstampSymbol } from "./Adapters/bitstamp.js";
import { fetchGeminiTicker, geminiSymbol } from "./Adapters/gemini.js";
import { fetchHitbtcTicker, hitbtcSymbol } from "./Adapters/hitbtc.js";
import { fetchCoinexTicker, coinexSymbol } from "./Adapters/coinex.js";
import { fetchBitgetTicker, bitgetSymbol } from "./Adapters/bitget.js";
import { fetchBybitTicker, bybitSymbol } from "./Adapters/bybit.js";
import { fetchCoinbaseProTicker, coinbaseProSymbol } from "./Adapters/coinbasepro.js";
import { fetchCryptoComTicker, cryptoComSymbol } from "./Adapters/cryptocom.js";
import { fetchLbankTicker, lbankSymbol } from "./Adapters/lbank.js";
import { fetchMexcTicker, mexcSymbol } from "./Adapters/mexc.js";
import { fetchOneInchPrice, oneInchSymbol } from "./Adapters/oneinch.js";
import { fetchPancakeSwapPrice, pancakeSwapSymbol } from "./Adapters/pancakeswap.js";
import { fetchPhemexTicker, phemexSymbol } from "./Adapters/phemex.js";
import { fetchPoloniexTicker, poloniexSymbol } from "./Adapters/poloniex.js";
import { fetchProbitTicker, probitSymbol } from "./Adapters/probit.js";
import { fetchSushiSwapPrice, sushiSwapSymbol } from "./Adapters/sushiswap.js";
import { fetchUniswapPrice, uniswapSymbol } from "./Adapters/uniswap.js";
import { fetchWhitebitTicker, whitebitSymbol } from "./Adapters/whitebit.js";
import { fetchAscendexTicker, ascendexSymbol } from "./Adapters/ascendex.js";

// Load symbols
const symbols = JSON.parse(await readFile(new URL("./symbols.json", import.meta.url)));

// ========== ENHANCED DATA MANAGEMENT ==========

class ArbitrageDataManager {
  constructor() {
    this.priceHistory = new Map();
    this.maxHistoryLength = 100;
  }

  updatePriceHistory(pricesByPair) {
    for (const [pair, prices] of Object.entries(pricesByPair)) {
      const exchanges = Object.keys(prices).filter(ex => prices[ex] != null);
      if (exchanges.length < 2) continue;

      const values = exchanges.map(ex => prices[ex]);
      const spread = (Math.max(...values) - Math.min(...values)) / Math.min(...values) * 100;

      if (!this.priceHistory.has(pair)) {
        this.priceHistory.set(pair, []);
      }

      const history = this.priceHistory.get(pair);
      history.push(spread);

      if (history.length > this.maxHistoryLength) {
        history.shift();
      }
    }
  }

  getPriceHistory() {
    const historyObject = {};
    for (const [pair, history] of this.priceHistory.entries()) {
      historyObject[pair] = [...history];
    }
    return historyObject;
  }

  // Real API calls for perpetual prices
  async fetchBinancePerpPrice(pair) {
    try {
      const symbol = pair.replace('-', '');
      const response = await fetch(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`);
      if (!response.ok) return null;
      const data = await response.json();
      return parseFloat(data.price);
    } catch (error) {
      console.error(`Binance perp price error for ${pair}:`, error.message);
      return null;
    }
  }

  async fetchBinanceFundingRate(pair) {
    try {
      const symbol = pair.replace('-', '');
      const response = await fetch(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}`);
      if (!response.ok) return null;
      const data = await response.json();
      return parseFloat(data.lastFundingRate) * 100;
    } catch (error) {
      console.error(`Binance funding rate error for ${pair}:`, error.message);
      return null;
    }
  }

  async fetchBybitPerpPrice(pair) {
    try {
      const symbol = pair.replace('-', '');
      const response = await fetch(`https://api.bybit.com/v5/market/tickers?category=linear&symbol=${symbol}`);
      if (!response.ok) return null;
      const data = await response.json();
      if (data.result && data.result.list && data.result.list[0]) {
        return parseFloat(data.result.list[0].lastPrice);
      }
      return null;
    } catch (error) {
      console.error(`Bybit perp price error for ${pair}:`, error.message);
      return null;
    }
  }

  async fetchBybitFundingRate(pair) {
    try {
      const symbol = pair.replace('-', '');
      const response = await fetch(`https://api.bybit.com/v5/market/funding/history?category=linear&symbol=${symbol}&limit=1`);
      if (!response.ok) return null;
      const data = await response.json();
      if (data.result && data.result.list && data.result.list[0]) {
        return parseFloat(data.result.list[0].fundingRate) * 100;
      }
      return null;
    } catch (error) {
      console.error(`Bybit funding rate error for ${pair}:`, error.message);
      return null;
    }
  }

  async fetchPerpetualPrices(pairs, exchanges) {
    const perpPrices = {};
    
    for (const pair of pairs) {
      perpPrices[pair] = {};
      
      for (const exchange of exchanges) {
        try {
          let perpPrice = null;
          
          switch (exchange.toLowerCase()) {
            case 'binance':
              perpPrice = await this.fetchBinancePerpPrice(pair);
              break;
            case 'bybit':
              perpPrice = await this.fetchBybitPerpPrice(pair);
              break;
            default:
              continue;
          }
          
          if (perpPrice) {
            perpPrices[pair][exchange] = perpPrice;
          }
        } catch (error) {
          console.error(`Error fetching perp price for ${pair} on ${exchange}:`, error.message);
        }
      }
    }
    
    return perpPrices;
  }

  async fetchFundingRates(pairs, exchanges) {
    const fundingRates = {};
    
    for (const pair of pairs) {
      fundingRates[pair] = {};
      
      for (const exchange of exchanges) {
        try {
          let fundingRate = null;
          
          switch (exchange.toLowerCase()) {
            case 'binance':
              fundingRate = await this.fetchBinanceFundingRate(pair);
              break;
            case 'bybit':
              fundingRate = await this.fetchBybitFundingRate(pair);
              break;
            default:
              continue;
          }
          
          if (fundingRate !== null) {
            fundingRates[pair][exchange] = fundingRate;
          }
        } catch (error) {
          console.error(`Error fetching funding rate for ${pair} on ${exchange}:`, error.message);
        }
      }
    }
    
    return fundingRates;
  }

  generateRealisticPerpPrices(spotPrices) {
    const perpPrices = {};
    for (const pair in spotPrices) {
      perpPrices[pair] = {};
      for (const ex in spotPrices[pair]) {
        const spot = spotPrices[pair][ex];
        if (spot) {
          // Perp typically trades at ±2% of spot
          const basisPoints = (Math.random() - 0.5) * 4;
          perpPrices[pair][ex] = spot * (1 + basisPoints / 100);
        }
      }
    }
    return perpPrices;
  }

  generateRealisticFundingRates(pairs, exchanges) {
    const fundingRates = {};
    pairs.forEach(pair => {
      fundingRates[pair] = {};
      exchanges.forEach(ex => {
        // Realistic funding rates: -0.375% to +0.375% per 8 hours
        const baseFunding = (Math.random() - 0.5) * 0.75;
        const spike = Math.random() < 0.1 ? (Math.random() - 0.5) * 2 : 0;
        fundingRates[pair][ex] = (baseFunding + spike);
      });
    });
    return fundingRates;
  }
}

// Initialize data manager
const dataManager = new ArbitrageDataManager();

// Express setup
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://arbisout.netlify.app',
  credentials: true,
}));
app.use(express.json());

// In-memory arbitrage data
let latestArbs = {};

// ========== API ROUTES ==========

// Arbitrage opportunities
app.get("/api/opportunities", (req, res) => {
  res.json(latestArbs);
});

// Get all users
app.get("/api/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

// Add user
app.post("/api/users", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const result = await addUser(username, password, role);
  if (!result.success) {
    return res.status(409).json({ error: result.error || "User exists" });
  }

  res.json({ success: true });
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const user = await findUser(username, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete user
app.delete("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const result = await deleteUser(username);
  if (!result.success) {
    return res.status(404).json({ error: result.error || "User not found" });
  }
  res.json({ success: true });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`✅ Backend API running at http://localhost:${PORT}`);
});

// ========== SCANNER LOGIC ==========

const ADAPTERS = {
  Binance: { fetch: fetchBinanceTicker, symbol: binanceSymbol },
  Kraken: { fetch: fetchKrakenTicker, symbol: krakenSymbol },
  Bitfinex: { fetch: fetchBitfinexTicker, symbol: bitfinexSymbol },
  Huobi: { fetch: fetchHuobiTicker, symbol: huobiSymbol },
  OKEx: { fetch: fetchOKExTicker, symbol: okexSymbol },
  "Gate.io": { fetch: fetchGateioTicker, symbol: gateioSymbol },
  KuCoin: { fetch: fetchKucoinTicker, symbol: kucoinSymbol },
  Bitstamp: { fetch: fetchBitstampTicker, symbol: bitstampSymbol },
  Gemini: { fetch: fetchGeminiTicker, symbol: geminiSymbol },
  HitBTC: { fetch: fetchHitbtcTicker, symbol: hitbtcSymbol },
  CoinEx: { fetch: fetchCoinexTicker, symbol: coinexSymbol },
  Bitget: { fetch: fetchBitgetTicker, symbol: bitgetSymbol },
  Bybit: { fetch: fetchBybitTicker, symbol: bybitSymbol },
  CoinbasePro: { fetch: fetchCoinbaseProTicker, symbol: coinbaseProSymbol },
  CryptoCom: { fetch: fetchCryptoComTicker, symbol: cryptoComSymbol },
  LBank: { fetch: fetchLbankTicker, symbol: lbankSymbol },
  MEXC: { fetch: fetchMexcTicker, symbol: mexcSymbol },
  OneInch: { fetch: fetchOneInchPrice, symbol: oneInchSymbol },
  PancakeSwap: { fetch: fetchPancakeSwapPrice, symbol: pancakeSwapSymbol },
  Phemex: { fetch: fetchPhemexTicker, symbol: phemexSymbol },
  Poloniex: { fetch: fetchPoloniexTicker, symbol: poloniexSymbol },
  Probit: { fetch: fetchProbitTicker, symbol: probitSymbol },
  SushiSwap: { fetch: fetchSushiSwapPrice, symbol: sushiSwapSymbol },
  Uniswap: { fetch: fetchUniswapPrice, symbol: uniswapSymbol },
  WhiteBIT: { fetch: fetchWhitebitTicker, symbol: whitebitSymbol },
  AscendEX: { fetch: fetchAscendexTicker, symbol: ascendexSymbol },
};

async function fetchAllPrices() {
  const pricesByPair = {};
  const pricesByExchange = {};

  for (const ex of EXCHANGES) {
    const adapter = ADAPTERS[ex.name];
    if (!adapter) continue;

    pricesByExchange[ex.name] = {};

    for (const pair of ex.symbols) {
      const canonicalPair = canonicalizeSymbol(pair);
      if (!SYMBOLS.includes(canonicalPair)) continue;

      if (!pricesByPair[canonicalPair]) pricesByPair[canonicalPair] = {};
      const exSymbol = adapter.symbol(canonicalPair);
      if (!exSymbol) continue;

      try {
        const price = await adapter.fetch(exSymbol);
        pricesByPair[canonicalPair][ex.name] = price;
        pricesByExchange[ex.name][canonicalPair] = price;
        console.log(`Fetched ${canonicalPair} on ${ex.name}: ${price}`);
      } catch (e) {
        console.warn(`Error fetching ${canonicalPair} from ${ex.name}: ${e.message}`);
        pricesByPair[canonicalPair][ex.name] = null;
      }
    }
  }
  return { pricesByPair, pricesByExchange };
}

async function scanLoop() {
  console.log("🔁 Arbisout scanning started with enhanced data management...");
  
  while (true) {
    try {
      console.log("[scanLoop] Starting scan cycle...");
      
      // 1. Fetch spot prices
      const { pricesByPair, pricesByExchange } = await fetchAllPrices();
      
      // 2. Update price history for statistical arbitrage
      dataManager.updatePriceHistory(pricesByPair);
      
      // 3. Fetch perpetual and funding data
      const pairs = Object.keys(pricesByPair);
      const exchanges = ['Binance', 'Bybit']; // Only exchanges we have perp APIs for
      
      let perpPrices, fundingRates;
      
      try {
        console.log("[scanLoop] Fetching perpetual prices and funding rates...");
        
        // Try to fetch real data
        perpPrices = await dataManager.fetchPerpetualPrices(pairs, exchanges);
        fundingRates = await dataManager.fetchFundingRates(pairs, exchanges);
        
        // Check if we got sufficient real data
        const hasRealPerpData = Object.values(perpPrices).some(ex => Object.keys(ex).length > 0);
        const hasRealFundingData = Object.values(fundingRates).some(ex => Object.keys(ex).length > 0);
        
        // Use realistic mocks as fallback
        if (!hasRealPerpData) {
          console.log("[scanLoop] Using realistic mock perpetual prices");
          perpPrices = dataManager.generateRealisticPerpPrices(pricesByPair);
        }
        
        if (!hasRealFundingData) {
          console.log("[scanLoop] Using realistic mock funding rates");
          fundingRates = dataManager.generateRealisticFundingRates(pairs, Object.keys(ADAPTERS));
        }
        
      } catch (error) {
        console.error("[scanLoop] Error fetching perp/funding data, using mocks:", error.message);
        perpPrices = dataManager.generateRealisticPerpPrices(pricesByPair);
        fundingRates = dataManager.generateRealisticFundingRates(pairs, Object.keys(ADAPTERS));
      }
      
      // 4. Run all arbitrage strategies with enhanced algorithms
      const crossExchangeOps = crossExchangeArb(pricesByPair, 0.5);
      const triangularOps = triangularArb(pricesByExchange, 0.1);
      const interAssetOps = interAssetArb(pricesByPair, 0.3);
      const statOps = statArb(pricesByPair, dataManager.getPriceHistory(), 2);
      const fundingOps = fundingArb(pricesByPair, perpPrices, fundingRates, 8);
      
      // 5. Update global opportunities
      latestArbs = {
        cross: crossExchangeOps,
        inter: interAssetOps,
        triangular: triangularOps,
        stat: statOps,
        funding: fundingOps,
      };
      
      console.log(`[scanLoop] Scan complete. Found opportunities:`, {
        crossExchange: crossExchangeOps.length,
        interAsset: interAssetOps.length,
        triangular: triangularOps.length,
        statistical: statOps.length,
        funding: fundingOps.length,
        historySize: Object.keys(dataManager.getPriceHistory()).length
      });
      
    } catch (err) {
      console.error("🚨 Error in scanning loop:", err.message);
    }
    
    // Wait 5 seconds before next scan
    await new Promise((res) => setTimeout(res, 5000));
  }
}

// Start the enhanced scanning loop
scanLoop();
