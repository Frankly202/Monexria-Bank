import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  const fetchAdminDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboard(response.data.dashboard);
      setError('');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admin dashboard:', err);
      setError(err.response?.data?.error || 'Failed to load admin dashboard. Please try again.');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <p className="text-sm">Total Users</p>
          <p className="text-3xl font-bold">{dashboard?.totalUsers}</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <p className="text-sm">Active Accounts</p>
          <p className="text-3xl font-bold">{dashboard?.activeAccounts}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <p className="text-sm">Total Transactions</p>
          <p className="text-3xl font-bold">{dashboard?.totalTransactions}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg">
          <p className="text-sm">Total Balance</p>
          <p className="text-3xl font-bold">${(dashboard?.totalBalance / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg">
          <p className="text-sm">Daily Revenue</p>
          <p className="text-3xl font-bold">${(dashboard?.dailyRevenue / 1000).toFixed(1)}K</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;