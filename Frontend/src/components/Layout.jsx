import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen" style={{ background: '#0a0e1a' }}>
      <Sidebar />
      <div className="flex-1 md:ml-[268px] flex flex-col min-h-screen">
        {/* Header */}
        <header
          className="fixed top-0 right-0 md:left-[268px] left-0 z-30 h-16 flex items-center justify-between px-8"
          style={{
            background: 'rgba(10, 14, 26, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid #1e2d4a',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div
            className="text-lg font-black uppercase tracking-widest"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Digital ID Admin
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: '#475569', border: '1px solid transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#00d4ff';
                e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#475569';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
            </button>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
                color: '#060b18',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 mt-16 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
