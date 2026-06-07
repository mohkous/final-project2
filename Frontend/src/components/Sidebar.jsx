import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const navItems = [
    { icon: 'dashboard',       label: 'Dashboard',        path: '/dashboard',  color: '#00d4ff' },
    { icon: 'group',           label: 'Users',            path: '/users',      color: '#818cf8' },
    { icon: 'badge',           label: 'Generate Card',    path: '/generate',   color: '#00c9a7' },
    { icon: 'credit_score',    label: 'Card Management',  path: '/management', color: '#f59e0b' },
    { icon: 'qr_code_scanner', label: 'QR Verification',  path: '/verify',     color: '#e879f9' },
    { icon: 'settings',        label: 'Settings',         path: '/settings',   color: '#94a3b8' },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[268px] hidden md:flex flex-col overflow-hidden z-40"
      style={{
        background: 'linear-gradient(180deg, #0d1427 0%, #080d1a 100%)',
        borderRight: '1px solid #1e2d4a',
      }}
    >
      {/* Logo Area */}
      <div
        className="px-6 py-7 flex items-center gap-4"
        style={{ borderBottom: '1px solid #1e2d4a' }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative"
          style={{
            background: 'linear-gradient(135deg, #00d4ff22, #00c9a722)',
            border: '1px solid rgba(0,212,255,0.25)',
            boxShadow: '0 0 20px rgba(0,212,255,0.12)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: '22px',
              color: '#00d4ff',
              fontVariationSettings: "'FILL' 1",
            }}
          >
            shield
          </span>
        </div>
        <div>
          <h1
            className="text-base font-black tracking-tight leading-none mb-0.5"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Identity System
          </h1>
          <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            Government Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive ? 'active-nav' : 'inactive-nav'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.18)',
                    boxShadow: '0 0 16px rgba(0,212,255,0.08)',
                  }
                : {
                    background: 'transparent',
                    border: '1px solid transparent',
                  }
            }
          >
            {({ isActive }) => (
              <>
                {/* Left accent bar */}
                {isActive && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #00d4ff, #00c9a7)' }}
                  />
                )}

                <span
                  className="material-symbols-outlined flex-shrink-0 transition-all duration-200"
                  style={{
                    fontSize: '21px',
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    color: isActive ? item.color : '#475569',
                    filter: isActive ? `drop-shadow(0 0 6px ${item.color}88)` : 'none',
                  }}
                >
                  {item.icon}
                </span>

                <span
                  className="text-sm font-medium transition-colors duration-200"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: isActive ? '#e2e8f0' : '#475569',
                  }}
                >
                  {item.label}
                </span>

                {/* Hover indicator */}
                {!isActive && (
                  <span
                    className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: '#2a3d60' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                      chevron_right
                    </span>
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5" style={{ borderTop: '1px solid #1e2d4a', paddingTop: '16px' }}>
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          style={{
            background: 'transparent',
            border: '1px solid transparent',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <span
            className="material-symbols-outlined flex-shrink-0 transition-colors duration-200"
            style={{ fontSize: '21px', color: '#475569' }}
          >
            logout
          </span>
          <span className="text-sm font-medium transition-colors duration-200" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            Logout
          </span>
        </button>

        {/* Version badge */}
        <div className="mt-4 px-4">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: '#0a0e1a', border: '1px solid #1e2d4a' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#00c9a7', boxShadow: '0 0 6px #00c9a7' }}
            />
            <span className="text-xs" style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
              System Online v2.4.1
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
