import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('view');
  const [formData, setFormData] = useState({
    accountId: '',
    amount: '',
    type: 'deposit'
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTransaction = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = formData.type === 'deposit' ? '/deposit' : '/withdraw';
      await axios.post(`http://localhost:5000/api/transactions${endpoint}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTransactions();
      setFormData({ accountId: '', amount: '', type: 'deposit' });
      setActiveTab('view');
    } catch (error) {
      console.error('Error processing transaction:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 rounded ${activeTab === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          View
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 rounded ${activeTab === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          New Transaction
        </button>
      </div>

      {activeTab === 'view' && (
        <div>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="border p-2">{txn.id}</td>
                  <td className="border p-2">{txn.type}</td>
                  <td className="border p-2">${txn.amount}</td>
                  <td className="border p-2">{txn.status}</td>
                  <td className="border p-2">{new Date(txn.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'new' && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <input
            type="number"
            placeholder="Account ID"
            value={formData.accountId}
            onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
            className="block w-full mb-4 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="block w-full mb-4 p-2 border rounded"
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="block w-full mb-4 p-2 border rounded"
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
          <button
            onClick={handleTransaction}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Process
          </button>
        </div>
      )}
    </div>
  );
}

export default Transactions;