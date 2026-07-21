import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          🏦 Monexria Bank
        </h1>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <a href="/" className="hover:underline">Dashboard</a>
              <a href="/accounts" className="hover:underline">Accounts</a>
              <a href="/transactions" className="hover:underline">Transactions</a>
              <a href="/transfers" className="hover:underline">Transfers</a>
              <a href="/exchange" className="hover:underline">Exchange</a>
              <a href="/profile" className="hover:underline">Profile</a>
              <a href="/admin" className="hover:underline">Admin</a>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:underline">Login</a>
              <a href="/register" className="hover:underline">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;