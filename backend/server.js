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

// Express setup
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin= process.env.FRONTEND_URL || 'http://localhost:3001';
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

const mockHistory = {};
const mockPerpPrices = {};
const mockFundingRates = {};

for (const pair of symbols) {
  mockHistory[pair] = Array.from({ length: 10 }, () => (Math.random() * 0.2 + 0.1).toFixed(4)).map(Number);
  mockPerpPrices[pair] = {
    Binance: +(Math.random() * 10000 + 1000).toFixed(2),
    Bybit: +(Math.random() * 10000 + 1000).toFixed(2)
  };
  mockFundingRates[pair] = {
    Binance: +(Math.random() * 0.001).toFixed(6),
    Bybit: +(Math.random() * 0.001).toFixed(6)
  };
}

async function fetchAllPrices() {
  const pricesByPair = {};
  for (const ex of EXCHANGES) {
    const adapter = ADAPTERS[ex.name];
    if (!adapter) continue;

    for (const pair of ex.symbols) {
      const canonicalPair = canonicalizeSymbol(pair);
      if (!SYMBOLS.includes(canonicalPair)) continue;

      if (!pricesByPair[canonicalPair]) pricesByPair[canonicalPair] = {};
      const exSymbol = adapter.symbol(canonicalPair);
      if (!exSymbol) continue;

      try {
        const price = await adapter.fetch(exSymbol);
        pricesByPair[canonicalPair][ex.name] = price;
        console.log(`Fetched ${canonicalPair} on ${ex.name}: ${price}`);
      } catch (e) {
        console.warn(`Error fetching ${canonicalPair} from ${ex.name}: ${e.message}`);
        pricesByPair[canonicalPair][ex.name] = null;
      }
    }
  }
  return pricesByPair;
}

async function scanLoop() {
  console.log("🔁 Arbisout scanning started...");
  while (true) {
    try {
      const prices = await fetchAllPrices();
      latestArbs = {
        cross: crossExchangeArb(prices, 1),
        inter: interAssetArb(prices, 0.5),
        triangular: triangularArb(prices, 0.5),
        stat: statArb(prices, mockHistory, 0.5),
        funding: fundingArb(prices, mockPerpPrices, mockFundingRates, 2),
      };
    } catch (err) {
      console.error("🚨 Error in scanning loop:", err.message);
    }
    await new Promise((res) => setTimeout(res, 5000));
  }
}

scanLoop();
