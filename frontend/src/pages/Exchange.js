import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function Exchange() {
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [curRes, rateRes] = await Promise.all([
          axios.get(`${API}/currencies/supported`),
          axios.get(`${API}/currencies/rates`)
        ]);
        setCurrencies(curRes.data.currencies);
        setRates(rateRes.data.rates);
      } catch (err) {
        console.error('Error loading currencies:', err);
        setError(err.response?.data?.error || 'Failed to load exchange data. Please try again.');
      }
    };
    load();
  }, []);

  const convert = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.post(
        `${API}/currencies/convert`,
        { amount: Number(amount), fromCurrency: from, toCurrency: to },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setResult(res.data);
    } catch (err) {
      console.error('Conversion failed:', err);
      setError(err.response?.data?.error || 'Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Currency Exchange</h1>
      <p className="text-gray-600 mb-6">Convert between {currencies.length || '40+'} currencies across all countries.</p>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 max-w-xl">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow max-w-xl mb-8">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="block w-full mb-4 p-2 border rounded"
        />
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-1">
            <label className="text-sm text-gray-600">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="block w-full p-2 border rounded">
              {currencies.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.country}</option>)}
            </select>
          </div>
          <button onClick={swap} className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300" title="Swap">⇄</button>
          <div className="flex-1">
            <label className="text-sm text-gray-600">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="block w-full p-2 border rounded">
              {currencies.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.country}</option>)}
            </select>
          </div>
        </div>
        <button onClick={convert} disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {result && (
          <div className="mt-6 bg-blue-50 p-4 rounded">
            <p className="text-2xl font-bold">
              {result.originalAmount} {result.originalCurrency} = {result.convertedAmount} {result.convertedCurrency}
            </p>
            <p className="text-sm text-gray-600 mt-1">Rate: 1 {result.originalCurrency} = {result.rate} {result.convertedCurrency}</p>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">Live Rates (per 1 USD)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Object.entries(rates).map(([code, rate]) => (
          <div key={code} className="border rounded-lg p-3 text-center">
            <p className="font-semibold">{code}</p>
            <p className="text-gray-600">{rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exchange;
