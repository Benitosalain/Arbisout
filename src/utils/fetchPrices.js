import { EXCHANGES } from '../../backend/EXCHANGES.js';
import { pricesByExchange } from "./symbol-mapping.js";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second

async function fetchWithRetry(url, retries = MAX_RETRIES) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                console.warn(`Rate limited, retrying in ${RETRY_DELAY_MS / 1000} seconds... (${retries} retries left) for ${url}`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                return fetchWithRetry(url, retries - 1);
            }
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. Body: ${errorBody}`);
        }
        return response;
    } catch (error) {
        if (retries > 0 && error.message && error.message.includes('ECONNRESET')) {
             console.error(`Connection reset error (${error.message}), retrying in ${RETRY_DELAY_MS / 1000} seconds... (${retries} retries left) for ${url}`);
             await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
             return fetchWithRetry(url, retries - 1);
        }
        console.error(`Fetch failed after multiple retries: ${error.message} for ${url}`);
        throw error;
    }
}

/**
 * Returns the specific API URL and a parser function for a given exchange and symbol.
 * @param {string} exchangeName - The name of the exchange (e.g., 'Binance').
 * @param {string} symbol - The standard symbol (e.g., 'BTC-USDT').
 * @returns {{url: string, parser: Function}|null} An object with the API URL and a parser function, or null if not found/supported.
 */
export function getExchangePriceConfig(exchangeName, symbol) {
    // Use explicit mapping if available
    const targetExampleSymbol = SYMBOL_MAP[exchangeName]?.[symbol];
    if (!targetExampleSymbol) {
        console.warn(`No symbol mapping for ${exchangeName} and ${symbol}`);
        return null;
    }

    // Find the precise exchange configuration using the mapped symbol
    const specificExchangeConfig = EXCHANGES.find(
        ex => ex.name === exchangeName && ex.symbols.includes(targetExampleSymbol)
    );

    if (!specificExchangeConfig) {
        console.warn(`No precise configuration found for ${exchangeName} and symbol ${symbol} (mapped: ${targetExampleSymbol}).`);
        return null; // Return null if specific config not found
    }

    const baseApiUrl = specificExchangeConfig.api;
    let apiUrl = '';
    let parser = (data) => null;

    // Now, construct the *actual* API URL and define the parser
    switch (exchangeName) {
        case 'Binance':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.price);
            break;

        case 'Coinbase': // Disabled in server.js
            apiUrl = `${baseApiUrl}/${symbol}/ticker`;
            parser = (data) => parseFloat(data?.price);
            break;

        case 'Kraken':
            apiUrl = `${baseApiUrl}?pair=${targetExampleSymbol}`;
            parser = (data) => {
                const pairKey = Object.keys(data.result || {})[0];
                return parseFloat(data.result?.[pairKey]?.c?.[0]);
            };
            break;

        case 'Bitfinex':
            apiUrl = `${baseApiUrl}t${targetExampleSymbol}`;
            parser = (data) => Array.isArray(data) ? parseFloat(data[6]) : null;
            break;

        case 'Huobi':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.tick?.close);
            break;

        case 'OKEx': // Now OKX, needs 'instId' query parameter
            apiUrl = `${baseApiUrl}?instId=${targetExampleSymbol}`;
            parser = (data) => data?.data?.[0]?.last ? parseFloat(data.data[0].last) : null;
            break;

        case 'Gate.io':
            apiUrl = `${baseApiUrl}?currency_pair=${targetExampleSymbol}`;
            parser = (data) => Array.isArray(data) && data[0]?.last ? parseFloat(data[0].last) : null;
            break;

        case 'KuCoin':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => data.code === '200000' && data.data ? parseFloat(data.data.price) : null;
            break;

        case 'Bitstamp':
            apiUrl = `${baseApiUrl}${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.last);
            break;

        case 'Gemini':
            apiUrl = `${baseApiUrl}${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.last);
            break;

        case 'HitBTC':
            apiUrl = `${baseApiUrl}${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.last);
            break;

        case 'CoinEx':
            apiUrl = `${baseApiUrl}?market=${targetExampleSymbol}`;
            parser = (data) => data.code === 0 && data.data?.ticker?.last ? parseFloat(data.data.ticker.last) : null;
            break;

        case 'AscendEX':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.close);
            break;
        case 'BinanceUS':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.price);
            break;
        case 'Bitget':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.close);
            break;
        case 'Bybit':
            apiUrl = `${baseApiUrl}&symbol=${targetExampleSymbol}`;
            parser = (data) => Array.isArray(data?.result?.list) ? parseFloat(data.result.list[0].lastPrice) : null;
            break;
        case 'CoinbasePro':
            apiUrl = `${baseApiUrl}/${targetExampleSymbol}/ticker`;
            parser = (data) => parseFloat(data?.price);
            break;
        case 'CryptoCom':
            apiUrl = `${baseApiUrl}?instrument_name=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.result?.data?.[0]?.a);
            break;
        case 'LBank':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.ticker?.[0]?.latest);
            break;
        case 'MEXC':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.price);
            break;
        case 'OneInch':
        case 'SushiSwap':
        case 'Uniswap':
            apiUrl = `${baseApiUrl}?src=${targetExampleSymbol.split('-')[0]}&dst=${targetExampleSymbol.split('-')[1]}&amount=1000000000000000000`;
            parser = (data) => parseFloat(data?.toTokenAmount) / 1e6;
            break;
        case 'PancakeSwap':
            apiUrl = `${baseApiUrl}?src=${targetExampleSymbol.split('-')[0]}&dst=${targetExampleSymbol.split('-')[1]}&amount=1000000000000000000`;
            parser = (data) => parseFloat(data?.toTokenAmount) / 1e18;
            break;
        case 'Phemex':
            apiUrl = `${baseApiUrl}?symbol=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.lastEp) / 1e8;
            break;
        case 'Poloniex':
            apiUrl = `${baseApiUrl}/${targetExampleSymbol}/ticker24h`;
            parser = (data) => parseFloat(data?.last);
            break;
        case 'Probit':
            apiUrl = `${baseApiUrl}?market_ids=${targetExampleSymbol}`;
            parser = (data) => Array.isArray(data?.data) ? parseFloat(data.data[0].last) : null;
            break;
        case 'WhiteBIT':
            apiUrl = `${baseApiUrl}?market=${targetExampleSymbol}`;
            parser = (data) => parseFloat(data?.[targetExampleSymbol]?.last_price);
            break;
        // ...existing cases...
    }

    if (!apiUrl) {
        console.error(`Failed to construct API URL for ${exchangeName} and ${symbol}. Check switch case logic.`);
        return null;
    }

    return { url: apiUrl, parser: parser };
}

export const pricesByExchange = { ... };