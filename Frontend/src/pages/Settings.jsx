import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile',       label: 'Profile',           icon: 'person',           color: '#00d4ff' },
    { id: 'security',      label: 'Security',          icon: 'security',         color: '#00c9a7' },
    { id: 'system',        label: 'System Settings',   icon: 'settings_suggest', color: '#f59e0b' },
    { id: 'notifications', label: 'Notifications',     icon: 'notifications',    color: '#818cf8' },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: '#0a0e1a', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      <div className="flex-1 md:ml-[268px] flex flex-col h-screen">
        {/* Header */}
        <header
          className="fixed top-0 right-0 md:left-[268px] left-0 z-30 h-16 flex items-center justify-between px-8"
          style={{
            background: 'rgba(10,14,26,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid #1e2d4a',
          }}
        >
          <span
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
          </span>
        </header>

        <main className="flex-1 mt-16 p-6 md:p-8 overflow-y-auto" style={{ background: '#0a0e1a' }}>
          {/* Page header */}
          <div className="mb-8">
            <h2
              className="text-3xl font-black mb-1"
              style={{
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Settings
            </h2>
            <p className="text-sm" style={{ color: '#475569' }}>
              Manage your account preferences and system configurations.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tab Sidebar */}
            <div
              className="w-full lg:w-64 flex flex-col gap-1 p-2 rounded-2xl h-fit"
              style={{ background: '#0f1629', border: '1px solid #1e2d4a' }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 relative"
                  style={{
                    background: activeTab === tab.id ? `${tab.color}12` : 'transparent',
                    border: `1px solid ${activeTab === tab.id ? `${tab.color}30` : 'transparent'}`,
                    color: activeTab === tab.id ? tab.color : '#475569',
                  }}
                  onMouseEnter={e => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.color = '#94a3b8';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  {activeTab === tab.id && (
                    <span
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      style={{ background: tab.color }}
                    />
                  )}
                  <span
                    className="material-symbols-outlined flex-shrink-0"
                    style={{
                      fontSize: '20px',
                      color: activeTab === tab.id ? tab.color : '#2a3d60',
                      fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0",
                      filter: activeTab === tab.id ? `drop-shadow(0 0 6px ${tab.color}88)` : 'none',
                    }}
                  >
                    {tab.icon}
                  </span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div
              className="flex-1 rounded-2xl overflow-hidden"
              style={{ background: '#0f1629', border: '1px solid #1e2d4a', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
            >
              {activeTab === 'profile'       && <ProfileTab />}
              {activeTab === 'security'      && <SecurityTab />}
              {activeTab === 'system'        && <SystemTab />}
              {activeTab === 'notifications' && <NotificationsTab />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="p-8 space-y-8">
      {/* Avatar row */}
      <div className="flex items-center gap-8 pb-8" style={{ borderBottom: '1px solid #1e2d4a' }}>
        <div className="relative group">
          <div
            className="w-24 h-24 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,201,167,0.15))',
              border: '2px solid rgba(0,212,255,0.25)',
              boxShadow: '0 0 24px rgba(0,212,255,0.15)',
            }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJdo6hSQ_R6-hhVECISBfHfKwtHmNNCMeSHrtwLyp2_mcpoI-Gx5Aew6AbkCs3J_nODZEOzv7z26hARIKlFIUBdXpAl6XMBvSoyanDgJLM60dv0rcyRsmEC8UIp55RqFp4ggxVaQO2JXUCxp4kpiI05Psdt8-HfFwhqK1tdr2JM2ly6b800T1rPF6mesiaXQE-RJYSt74L3QG79cKBo2wARXNr5-2tk4iZIACNiOCZ6GcPOfNgMbhJi3Y8LyXlahELEmwNkImHsw"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="absolute bottom-0 right-0 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
              color: '#060b18',
              boxShadow: '0 0 12px rgba(0,212,255,0.4)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0' }}>
            Administrator Profile
          </h3>
          <p className="text-sm" style={{ color: '#475569' }}>Update your photo and personal details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full Name" defaultValue="Admin User" />
        <InputField label="Email Address" defaultValue="admin@gov.id" />
        <InputField label="Role" defaultValue="Super Administrator" disabled />
        <InputField label="Organization" defaultValue="Ministry of Digital Identity" disabled />
      </div>

      <div className="flex justify-end pt-4">
        <GlowButton icon="save" label="Save Changes" />
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="p-8 space-y-8">
      <h3
        className="text-xl font-bold pb-4"
        style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0', borderBottom: '1px solid #1e2d4a' }}
      >
        Security Credentials
      </h3>

      <div className="space-y-4 max-w-md">
        <InputField label="Current Password" type="password" placeholder="••••••••" />
        <InputField label="New Password" type="password" placeholder="••••••••" />
        <InputField label="Confirm New Password" type="password" placeholder="••••••••" />
      </div>

      {/* 2FA Card */}
      <div
        className="p-6 rounded-2xl flex items-start gap-4"
        style={{
          background: 'rgba(0,201,167,0.06)',
          border: '1px solid rgba(0,201,167,0.2)',
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(0,201,167,0.12)', border: '1px solid rgba(0,201,167,0.25)' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#00c9a7', fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold mb-1" style={{ color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>
            Two-Factor Authentication
          </h4>
          <p className="text-sm mb-4" style={{ color: '#475569' }}>
            Add an extra layer of security to your account by enabling 2FA via SMS or App.
          </p>
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(0,201,167,0.12)',
              color: '#00c9a7',
              border: '1px solid rgba(0,201,167,0.3)',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,201,167,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,201,167,0.12)';
            }}
          >
            Enable 2FA
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <GlowButton icon="lock" label="Update Security" gradient="linear-gradient(135deg, #00c9a7, #00a085)" glow="rgba(0,201,167,0.3)" />
      </div>
    </div>
  );
}

function SystemTab() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-8">
      <h3
        className="text-xl font-bold pb-4"
        style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0', borderBottom: '1px solid #1e2d4a' }}
      >
        System Management
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Backup */}
        <div
          className="p-6 rounded-2xl space-y-4"
          style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid #1e2d4a' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#00d4ff' }}>database</span>
            </div>
            <span className="font-bold" style={{ color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>Database Backup</span>
          </div>
          <p className="text-sm" style={{ color: '#475569' }}>Download a full snapshot of your current SQL database.</p>
          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(0,212,255,0.08)',
              color: '#00d4ff',
              border: '1px solid rgba(0,212,255,0.2)',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
          >
            Download .sql Backup
          </button>
        </div>

        {/* API Management */}
        <div
          className="p-6 rounded-2xl space-y-4"
          style={{ background: 'rgba(0,201,167,0.04)', border: '1px solid #1e2d4a' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.2)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#00c9a7' }}>key</span>
            </div>
            <span className="font-bold" style={{ color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>API Management</span>
          </div>
          <p className="text-sm" style={{ color: '#475569' }}>Generate secret keys for external verification services.</p>
          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(0,201,167,0.08)',
              color: '#00c9a7',
              border: '1px solid rgba(0,201,167,0.2)',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,201,167,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,201,167,0.08)')}
          >
            Manage API Keys
          </button>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="pt-4">
        <h4 className="font-bold mb-4" style={{ color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>
          Display Theme
        </h4>
        <div className="flex gap-4">
          <ThemeOption label="Light" icon="light_mode" active={theme === 'light'} onClick={() => toggleTheme('light')} />
          <ThemeOption label="Dark"  icon="dark_mode"  active={theme === 'dark'}  onClick={() => toggleTheme('dark')} />
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [notifs, setNotifs] = useState({
    email: true,
    security: true,
    maintenance: false,
    reports: true
  });
  const toggleNotif = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { key: 'email',       label: 'Email notifications for new registrations',    icon: 'mail' },
    { key: 'security',    label: 'Security alerts for unauthorized login attempts', icon: 'gpp_bad' },
    { key: 'maintenance', label: 'System maintenance reminders',                  icon: 'build' },
    { key: 'reports',     label: 'Weekly activity report',                        icon: 'bar_chart' },
  ];

  return (
    <div className="p-8 space-y-6">
      <h3
        className="text-xl font-bold pb-4"
        style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0', borderBottom: '1px solid #1e2d4a' }}
      >
        Notification Preferences
      </h3>
      <div className="space-y-3">
        {items.map(item => (
          <ToggleItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            checked={notifs[item.key]}
            onChange={() => toggleNotif(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Helper Components ──────────────────────────────────────────

function InputField({ label, defaultValue, placeholder, type = "text", disabled }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569' }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: disabled ? 'rgba(10,14,26,0.5)' : '#0a0e1a',
          border: `1px solid ${focused ? 'rgba(0,212,255,0.5)' : '#1e2d4a'}`,
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
          color: disabled ? '#2a3d60' : '#e2e8f0',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '14px',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'all 0.2s',
        }}
      />
    </div>
  );
}

function ThemeOption({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
      style={{
        background: active ? 'rgba(0,212,255,0.08)' : 'transparent',
        border: `2px solid ${active ? 'rgba(0,212,255,0.4)' : '#1e2d4a'}`,
        color: active ? '#00d4ff' : '#475569',
        fontFamily: 'Inter, sans-serif',
        boxShadow: active ? '0 0 16px rgba(0,212,255,0.1)' : 'none',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = '#2a3d60';
          e.currentTarget.style.color = '#94a3b8';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = '#1e2d4a';
          e.currentTarget.style.color = '#475569';
        }
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function ToggleItem({ icon, label, checked, onChange }) {
  return (
    <div
      className="flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-200"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1e2d4a' }}
    >
      <div className="flex items-center gap-3">
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: '18px',
            color: checked ? '#00d4ff' : '#2a3d60',
            fontVariationSettings: checked ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          {icon}
        </span>
        <span className="text-sm font-medium" style={{ color: checked ? '#e2e8f0' : '#475569' }}>
          {label}
        </span>
      </div>
      <div
        onClick={onChange}
        className="relative cursor-pointer transition-all duration-300"
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '99px',
          background: checked ? 'linear-gradient(135deg, #00d4ff, #00c9a7)' : '#1e2d4a',
          boxShadow: checked ? '0 0 10px rgba(0,212,255,0.35)' : 'none',
          flexShrink: 0,
        }}
      >
        <div
          className="absolute top-1 transition-all duration-300"
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#fff',
            left: checked ? 'calc(100% - 20px)' : '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
}

function GlowButton({ icon, label, gradient = 'linear-gradient(135deg, #00d4ff, #00c9a7)', glow = 'rgba(0,212,255,0.3)' }) {
  return (
    <button
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
      style={{
        background: gradient,
        color: '#060b18',
        fontFamily: 'Outfit, sans-serif',
        boxShadow: `0 0 20px ${glow}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 32px ${glow.replace('0.3', '0.5')}`;
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 0 20px ${glow}`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      {label}
    </button>
  );
}

export default Settings;
