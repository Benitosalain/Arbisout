import crypto from 'crypto';

// Replace these with your actual credentials from the Bitget API management page
const API_KEY = 'bg_61a72b85e7e0fac15b2fa960f788d455';
const API_SECRET = '665fa924dd88c74c2332f433f4d212baf97b6bcefa68810564da7446dc68f9e1';
const API_PASSPHRASE = 'benitos1234';

// This function generates the required signature for authenticated requests
function getBitgetSignature(method, requestPath, body = '') {
    const timestamp = Date.now().toString();
    const message = timestamp + method.toUpperCase() + requestPath + body;
    const signature = crypto.createHmac('sha256', API_SECRET)
        .update(message)
        .digest('base64');

    return {
        'ACCESS-KEY': API_KEY,
        'ACCESS-SIGN': signature,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-PASSPHRASE': API_PASSPHRASE,
        'Content-Type': 'application/json'
    };
}

export async function fetchBitgetTickers() {
    const url = "https://api.bitget.com/api/spot/v1/market/tickers";
    const headers = getBitgetSignature('GET', '/api/spot/v1/market/tickers');

    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Bitget API error: ${res.status}`);

    const { data } = await res.json();
    return Object.fromEntries(data.map(t => [t.symbol, parseFloat(t.close)]));
}

export async function fetchBitgetTicker(symbol) {
    const url = `https://api.bitget.com/api/spot/v1/market/ticker?symbol=${symbol}`;
    const headers = getBitgetSignature('GET', `/api/spot/v1/market/ticker?symbol=${symbol}`);

    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Bitget API error: ${res.status}`);

    const { data } = await res.json();
    return parseFloat(data.close);
}

export function bitgetSymbol(standardSymbol) {
    // Bitget uses "BTCUSDT" format
    return standardSymbol.replace("-", "");
}
