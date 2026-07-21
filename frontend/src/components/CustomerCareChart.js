import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';
const POLL_MS = 5000;

// Lightweight, dependency-free live chart: renders the support-activity
// timeline as animated SVG bars and refreshes on an interval.
function CustomerCareChart() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/admin/support/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!cancelled) {
          setStats(res.data);
          setError('');
        }
      } catch (err) {
        console.error('Error fetching support stats:', err);
        if (!cancelled) {
          setError(err.response?.data?.error || 'Failed to load live customer-care metrics.');
        }
      }
    };

    fetchStats();
    timerRef.current = setInterval(fetchStats, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timerRef.current);
    };
  }, []);

  const timeline = stats?.timeline || [];
  const maxVal = Math.max(1, ...timeline.map((p) => Math.max(p.activeChats, p.resolved)));
  const summary = stats?.summary;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Customer Care
        </h3>
        {summary && (
          <span className="text-xs text-gray-500">
            Updated {new Date(stats.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">{error}</div>}

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Metric label="Active Chats" value={summary.activeChats} color="text-blue-600" />
          <Metric label="In Queue" value={summary.waitingInQueue} color="text-orange-600" />
          <Metric label="Avg Response" value={`${summary.avgResponseSeconds}s`} color="text-purple-600" />
          <Metric label="AI Handled" value={`${summary.aiHandledPercent}%`} color="text-green-600" />
        </div>
      )}

      <div className="flex items-end gap-1 h-40 border-b border-l border-gray-200 pt-2">
        {timeline.map((p, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center gap-0.5" title={`${p.label}: ${p.activeChats} active, ${p.resolved} resolved`}>
            <div className="w-full bg-blue-500 rounded-t transition-all duration-500"
              style={{ height: `${(p.activeChats / maxVal) * 100}%` }} />
            <div className="w-full bg-green-400 rounded-t transition-all duration-500"
              style={{ height: `${(p.resolved / maxVal) * 40}%` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{timeline[0]?.label}</span>
        <span>{timeline[timeline.length - 1]?.label}</span>
      </div>
      <div className="flex gap-4 mt-3 text-xs text-gray-600">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 inline-block rounded" /> Active chats</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 inline-block rounded" /> Resolved</span>
      </div>
    </div>
  );
}

function Metric({ label, value, color }) {
  return (
    <div className="bg-gray-50 rounded p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default CustomerCareChart;
