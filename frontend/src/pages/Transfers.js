import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function Transfers() {
  const [mode, setMode] = useState('local');
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [local, setLocal] = useState({ fromAccountId: '', toAccountId: '', amount: '', currency: 'USD' });
  const [interbank, setInterbank] = useState({
    fromAccountId: '', bankCode: '', recipientAccount: '', recipientName: '', amount: '', currency: 'USD'
  });
  const [international, setInternational] = useState({
    fromAccountId: '', swiftCode: '', recipientAccount: '', recipientName: '', country: '', amount: '', currency: 'EUR'
  });

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [banksRes, curRes] = await Promise.all([
          axios.get(`${API}/transactions/banks`, authHeader()),
          axios.get(`${API}/currencies/supported`)
        ]);
        setBanks(banksRes.data.banks);
        setCurrencies(curRes.data.currencies);
      } catch (err) {
        console.error('Error loading transfer options:', err);
        setError(err.response?.data?.error || 'Failed to load transfer options. Please try again.');
      }
    };
    loadOptions();
  }, []);

  const submit = async (endpoint, payload) => {
    setSubmitting(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.post(`${API}/transactions/${endpoint}`, payload, authHeader());
      setResult(res.data);
    } catch (err) {
      console.error('Transfer failed:', err);
      setError(err.response?.data?.error || 'Transfer failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const tabClass = (m) =>
    `px-4 py-2 rounded font-semibold ${mode === m ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`;

  const input = 'block w-full mb-4 p-2 border rounded';

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Send Money</h1>
      <p className="text-gray-600 mb-6">Easy-access transfers — local, to other banks, or international.</p>

      <div className="flex flex-wrap gap-3 mb-6">
        <button className={tabClass('local')} onClick={() => { setMode('local'); setResult(null); setError(''); }}>Local</button>
        <button className={tabClass('interbank')} onClick={() => { setMode('interbank'); setResult(null); setError(''); }}>Other Banks</button>
        <button className={tabClass('international')} onClick={() => { setMode('international'); setResult(null); setError(''); }}>International</button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {result && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          <p className="font-semibold">{result.message}</p>
          <p className="text-sm mt-1">Reference: {result.transaction?.id} · Status: {result.transaction?.status}</p>
          {result.transaction?.fee != null && (
            <p className="text-sm">Fee: {result.transaction.fee} {result.transaction.currency} · Total debited: {result.transaction.totalDebited} {result.transaction.currency}</p>
          )}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        {mode === 'local' && (
          <div>
            <input className={input} placeholder="From Account ID" value={local.fromAccountId}
              onChange={(e) => setLocal({ ...local, fromAccountId: e.target.value })} />
            <input className={input} placeholder="To Account ID" value={local.toAccountId}
              onChange={(e) => setLocal({ ...local, toAccountId: e.target.value })} />
            <input className={input} type="number" placeholder="Amount" value={local.amount}
              onChange={(e) => setLocal({ ...local, amount: e.target.value })} />
            <select className={input} value={local.currency}
              onChange={(e) => setLocal({ ...local, currency: e.target.value })}>
              {currencies.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
            </select>
            <button disabled={submitting} onClick={() => submit('transfer/local', local)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">
              {submitting ? 'Sending...' : 'Send Locally'}
            </button>
          </div>
        )}

        {mode === 'interbank' && (
          <div>
            <input className={input} placeholder="From Account ID" value={interbank.fromAccountId}
              onChange={(e) => setInterbank({ ...interbank, fromAccountId: e.target.value })} />
            <select className={input} value={interbank.bankCode}
              onChange={(e) => setInterbank({ ...interbank, bankCode: e.target.value })}>
              <option value="">Select recipient bank</option>
              {banks.map((b) => <option key={b.code} value={b.code}>{b.name} — {b.country}</option>)}
            </select>
            <input className={input} placeholder="Recipient Account Number" value={interbank.recipientAccount}
              onChange={(e) => setInterbank({ ...interbank, recipientAccount: e.target.value })} />
            <input className={input} placeholder="Recipient Name" value={interbank.recipientName}
              onChange={(e) => setInterbank({ ...interbank, recipientName: e.target.value })} />
            <input className={input} type="number" placeholder="Amount" value={interbank.amount}
              onChange={(e) => setInterbank({ ...interbank, amount: e.target.value })} />
            <select className={input} value={interbank.currency}
              onChange={(e) => setInterbank({ ...interbank, currency: e.target.value })}>
              {currencies.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
            </select>
            <button disabled={submitting} onClick={() => submit('transfer/interbank', interbank)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">
              {submitting ? 'Sending...' : 'Send to Bank'}
            </button>
          </div>
        )}

        {mode === 'international' && (
          <div>
            <input className={input} placeholder="From Account ID" value={international.fromAccountId}
              onChange={(e) => setInternational({ ...international, fromAccountId: e.target.value })} />
            <input className={input} placeholder="SWIFT / BIC Code" value={international.swiftCode}
              onChange={(e) => setInternational({ ...international, swiftCode: e.target.value })} />
            <input className={input} placeholder="Recipient Account / IBAN" value={international.recipientAccount}
              onChange={(e) => setInternational({ ...international, recipientAccount: e.target.value })} />
            <input className={input} placeholder="Recipient Name" value={international.recipientName}
              onChange={(e) => setInternational({ ...international, recipientName: e.target.value })} />
            <input className={input} placeholder="Destination Country" value={international.country}
              onChange={(e) => setInternational({ ...international, country: e.target.value })} />
            <input className={input} type="number" placeholder="Amount" value={international.amount}
              onChange={(e) => setInternational({ ...international, amount: e.target.value })} />
            <select className={input} value={international.currency}
              onChange={(e) => setInternational({ ...international, currency: e.target.value })}>
              {currencies.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
            </select>
            <button disabled={submitting} onClick={() => submit('transfer/international', international)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">
              {submitting ? 'Sending...' : 'Send Internationally'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfers;
