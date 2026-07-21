import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ accountType: 'Checking', currency: 'USD' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/accounts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccounts(response.data.accounts);
      setError('');
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError(err.response?.data?.error || 'Failed to load accounts. Please try again.');
    }
  };

  const handleCreateAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/accounts', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowForm(false);
      setError('');
      fetchAccounts();
    } catch (err) {
      console.error('Error creating account:', err);
      setError(err.response?.data?.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Accounts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Account
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>
      )}

      {showForm && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <select
            value={formData.accountType}
            onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
            className="block mb-4 p-2 border rounded"
          >
            <option>Checking</option>
            <option>Savings</option>
            <option>Investment</option>
          </select>
          <button
            onClick={handleCreateAccount}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="border rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold">{account.type}</h2>
            <p className="text-2xl font-bold mt-4">${account.balance}</p>
            <p className="text-gray-600">ID: {account.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;