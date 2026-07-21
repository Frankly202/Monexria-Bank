import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const SUGGESTIONS = [
  'How do I send an international transfer?',
  'How do I exchange currency?',
  'What are the transfer fees?',
  'I forgot my password'
];

function SupportAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm the Monexria AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || sending) return;

    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setInput('');
    setSending(true);
    setError('');

    try {
      const res = await axios.post(
        `${API}/admin/support/chat`,
        { message },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: res.data.reply, escalate: res.data.escalate }
      ]);
    } catch (err) {
      console.error('Assistant error:', err);
      setError(err.response?.data?.error || 'The assistant is unavailable. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-96">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg font-semibold flex items-center gap-2">
        <span>🤖</span> AI Customer Service Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
              m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
            }`}>
              {m.text}
              {m.escalate && (
                <button className="block mt-2 text-blue-600 underline text-xs">Connect to a human agent</button>
              )}
            </div>
          </div>
        ))}
        {sending && <div className="text-gray-400 text-sm">Assistant is typing…</div>}
        <div ref={endRef} />
      </div>

      {error && <div className="px-4 pb-2 text-red-600 text-sm">{error}</div>}

      <div className="px-4 pb-2 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => send(s)} disabled={sending}
            className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 disabled:opacity-50">
            {s}
          </button>
        ))}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type your question…"
          className="flex-1 p-2 border rounded"
        />
        <button onClick={() => send()} disabled={sending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          Send
        </button>
      </div>
    </div>
  );
}

export default SupportAssistant;
