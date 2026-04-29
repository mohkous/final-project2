import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'security' },
    { id: 'system', label: 'System Settings', icon: 'settings_suggest' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' }
  ];

  return (
    <div className="bg-background text-on-background font-body-md antialiased flex min-h-screen">
      <Sidebar />

      <div className="flex-1 md:ml-[280px] flex flex-col h-screen">
        <header className="fixed top-0 right-0 md:left-[280px] left-0 z-30 h-16 flex items-center justify-between px-8 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant shadow-sm">
          <span className="font-h3 text-h3 text-primary uppercase tracking-wider font-black">Digital ID Admin</span>
        </header>

        <main className="flex-1 mt-16 p-margin-desktop w-full max-w-[1400px] overflow-y-auto">
          <div className="mb-stack-lg">
            <h2 className="font-h2 text-h2 text-on-surface">Settings</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Manage your account preferences and system configurations.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-gutter">
            {/* Tabs Sidebar */}
            <div className="w-full lg:w-64 flex flex-col gap-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-2 h-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id 
                    ? 'bg-primary text-on-primary shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'security' && <SecurityTab />}
              {activeTab === 'system' && <SystemTab />}
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
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-8 border-b border-outline-variant pb-8">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJdo6hSQ_R6-hhVECISBfHfKwtHmNNCMeSHrtwLyp2_mcpoI-Gx5Aew6AbkCs3J_nODZEOzv7z26hARIKlFIUBdXpAl6XMBvSoyanDgJLM60dv0rcyRsmEC8UIp55RqFp4ggxVaQO2JXUCxp4kpiI05Psdt8-HfFwhqK1tdr2JM2ly6b800T1rPF6mesiaXQE-RJYSt74L3QG79cKBo2wARXNr5-2tk4iZIACNiOCZ6GcPOfNgMbhJi3Y8LyXlahELEmwNkImHsw" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-sm">photo_camera</span>
          </button>
        </div>
        <div>
          <h3 className="font-h3 text-h3">Administrator Profile</h3>
          <p className="text-on-surface-variant">Update your photo and personal details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full Name" defaultValue="Admin User" />
        <InputField label="Email Address" defaultValue="admin@gov.id" />
        <InputField label="Role" defaultValue="Super Administrator" disabled />
        <InputField label="Organization" defaultValue="Ministry of Digital Identity" disabled />
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-medium shadow-md hover:scale-[1.02] active:scale-95 transition-all">Save Changes</button>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="font-h3 text-h3 border-b border-outline-variant pb-4">Security Credentials</h3>
      
      <div className="space-y-6 max-w-md">
        <InputField label="Current Password" type="password" placeholder="••••••••" />
        <InputField label="New Password" type="password" placeholder="••••••••" />
        <InputField label="Confirm New Password" type="password" placeholder="••••••••" />
      </div>

      <div className="bg-secondary-container/20 p-6 rounded-xl border border-secondary-container flex items-start gap-4">
        <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
        <div>
          <h4 className="font-bold text-on-secondary-fixed">Two-Factor Authentication</h4>
          <p className="text-on-secondary-fixed-variant text-sm mt-1">Add an extra layer of security to your account by enabling 2FA via SMS or App.</p>
          <button className="mt-4 bg-secondary-container text-on-secondary-fixed px-4 py-2 rounded-md font-medium text-sm">Enable 2FA</button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-medium shadow-md transition-all">Update Security</button>
      </div>
    </div>
  );
}

function SystemTab() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="font-h3 text-h3 border-b border-outline-variant pb-4">System Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-outline-variant p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">database</span>
            <span className="font-bold">Database Backup</span>
          </div>
          <p className="text-sm text-on-surface-variant">Download a full snapshot of your current SQL database.</p>
          <button className="w-full py-2 bg-surface-container rounded-md font-medium hover:bg-outline-variant transition-colors">Download .sql Backup</button>
        </div>

        <div className="border border-outline-variant p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined">key</span>
            <span className="font-bold">API Management</span>
          </div>
          <p className="text-sm text-on-surface-variant">Generate secret keys for external verification services.</p>
          <button className="w-full py-2 bg-surface-container rounded-md font-medium hover:bg-outline-variant transition-colors">Manage API Keys</button>
        </div>
      </div>

      <div className="pt-8">
        <h4 className="font-bold mb-4">Display Theme</h4>
        <div className="flex gap-4">
          <ThemeOption 
            label="Light" 
            icon="light_mode" 
            active={theme === 'light'} 
            onClick={() => toggleTheme('light')}
          />
          <ThemeOption 
            label="Dark" 
            icon="dark_mode" 
            active={theme === 'dark'} 
            onClick={() => toggleTheme('dark')}
          />
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

  const toggleNotif = (key) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="font-h3 text-h3 border-b border-outline-variant pb-4">Notification Preferences</h3>
      
      <div className="space-y-4">
        <ToggleItem label="Email notifications for new registrations" checked={notifs.email} onChange={() => toggleNotif('email')} />
        <ToggleItem label="Security alerts for unauthorized login attempts" checked={notifs.security} onChange={() => toggleNotif('security')} />
        <ToggleItem label="System maintenance reminders" checked={notifs.maintenance} onChange={() => toggleNotif('maintenance')} />
        <ToggleItem label="Weekly activity report" checked={notifs.reports} onChange={() => toggleNotif('reports')} />
      </div>
    </div>
  );
}

// Helper Components
function InputField({ label, defaultValue, placeholder, type = "text", disabled }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">{label}</label>
      <input 
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className={`px-4 py-3 rounded-md border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none ${disabled ? 'bg-surface-container-low cursor-not-allowed opacity-70' : ''}`}
      />
    </div>
  );
}

function ThemeOption({ label, icon, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${active ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant text-on-surface-variant hover:border-outline'}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function ToggleItem({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-outline-variant last:border-0">
      <span className="font-medium text-on-surface">{label}</span>
      <div 
        onClick={onChange}
        className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${checked ? 'bg-primary' : 'bg-outline-variant'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${checked ? 'right-1' : 'left-1'}`}></div>
      </div>
    </div>
  );
}

export default Settings;
