import React, { useState } from 'react';
import { adminLogin } from '../services/menuService';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (adminLogin(password)) {
        onLogin();
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #084C55 50%, #0f172a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Background pattern */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, #084C5530 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F59E0B15 0%, transparent 40%)', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(30,41,59,0.92)',
        border: '1px solid #334155',
        borderRadius: 20,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>👑</div>
          <h1 style={{ margin: 0, color: '#F59E0B', fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>PLATINUM HOTEL</h1>
          <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 13, letterSpacing: 3, fontWeight: 600 }}>ADMIN PANEL</p>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ flex: 1, height: 1, background: '#334155' }} />
          <span style={{ color: '#475569', fontSize: 11, letterSpacing: 2 }}>SECURE LOGIN</span>
          <div style={{ flex: 1, height: 1, background: '#334155' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
              ADMIN PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password..."
              autoFocus
              style={{
                width: '100%',
                background: '#0f172a',
                border: error ? '1px solid #ef4444' : '1px solid #334155',
                color: '#f1f5f9',
                borderRadius: 10,
                padding: '13px 16px',
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color .2s',
              }}
            />
          </div>

          {error && (
            <div style={{ background: '#450a0a', border: '1px solid #7f1d1d', color: '#fca5a5', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              background: loading ? '#334155' : 'linear-gradient(90deg, #084C55, #0e7490)',
              color: loading ? '#64748b' : '#F59E0B',
              border: 'none',
              borderRadius: 10,
              padding: '13px',
              fontSize: 15,
              fontWeight: 800,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              letterSpacing: 1,
              transition: 'all .2s',
            }}
          >
            {loading ? '⏳ Verifying...' : '🔐 Login to Admin'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 12 }}>
          <a href="#/" style={{ color: '#0e7490', textDecoration: 'none' }}>← Back to Menu</a>
        </p>
      </div>
    </div>
  );
}
