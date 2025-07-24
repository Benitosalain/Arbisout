import { getAllPrices } from "./aggregator.js";
import { crossExchangeArb } from "./strategies/crossExchange.js";
import { interAssetArb } from "./strategies/interAsset.js";
import { triangularArb } from "./strategies/triangular.js";
import { statArb } from "./strategies/statArb.js";
import { fundingArb } from "./strategies/fundingArb.js";
// ...import more as needed...

async function main() {
  const pricesByPair = await getAllPrices();
  const pricesByExchange = {};
  for (const pair in pricesByPair) {
    for (const ex in pricesByPair[pair]) {
      if (!pricesByExchange[ex]) pricesByExchange[ex] = {};
      pricesByExchange[ex][pair] = pricesByPair[pair][ex];
    }
  }

  console.log("Cross Exchange:", crossExchangeArb(pricesByPair));
  console.log("Inter Asset:", interAssetArb(pricesByPair));
  console.log("Triangular:", triangularArb(pricesByExchange));
  console.log("Stat Arb:", statArb(pricesByPair));
  console.log("Funding Arb:", fundingArb(pricesByPair));

  // DEX strategies (example for ETH-USDT)
  console.log("1inch ETH-USDT:", await fetchOneInchPrice("ETH-USDT"));
  console.log("PancakeSwap ETH-USDT:", await fetchPancakeSwapPrice("ETH-USDT"));
  console.log("SushiSwap ETH-USDT:", await fetchSushiSwapPrice("ETH-USDT"));
  console.log("Uniswap ETH-USDT:", await fetchUniswapPrice("ETH-USDT"));
}

main();