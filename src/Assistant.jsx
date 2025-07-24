import React, { useState } from 'react';

const LOCAL_FAKE_AI_RESPONSES = {
  "how does arbitrage work": "Buy low on one exchange and sell high on another.",
  "best exchange": "Depends on region. Binance and KuCoin are popular.",
  "risk": "Slippage, fees, transfer delays. Be cautious."
};

function Assistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const ask = () => {
    const q = query.toLowerCase();
    const match = Object.keys(LOCAL_FAKE_AI_RESPONSES).find(k => q.includes(k));
    setResponse(LOCAL_FAKE_AI_RESPONSES[match] || "I'm just a local bot. Try a simpler question.");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mt-8">
      <h2 className="text-lg mb-2">AI Assistant</h2>
      <input
        className="p-2 w-full text-black mb-2"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={ask} className="bg-indigo-600 text-white px-3 py-1 rounded">Ask</button>
      {response && <p className="mt-2">{response}</p>}
    </div>
  );
}

export default Assistant;
