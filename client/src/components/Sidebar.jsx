import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'group', label: 'Users', path: '/users' },
    { icon: 'badge', label: 'Generate Card', path: '/generate' },
    { icon: 'credit_score', label: 'Card Management', path: '/management' },
    { icon: 'qr_code_scanner', label: 'QR Verification', path: '/verify' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-outline-variant bg-surface-container-lowest flex flex-col overflow-y-auto z-40 shadow-sm hidden md:flex">
      <div className="px-6 py-8 border-b border-outline-variant flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 overflow-hidden">
          <img 
            alt="Government Seal" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdSpRcjoOdGdie-gpftDOC8gLr1ISHWlxvC8Mh1EjGCvK-liSOn6HAox8ykydy-YbJ5B28zKSrSs4uYuFpkzd5YkEsgUYjlt3OJl77XtX7fpyEcQa--0qs6GL5Ctj_fe_rKOd47u1Cq8tXnkqyeBg0JlhqbIcikNYFW1pvCcysZp5Qo-rt-JJCWeptY33QXZJ7AMqFOtSAyTpxHJkR1YthFdnW-7nnjoHU_w01hSPXGc8EEeeSmOg5H3JF90njsd0OTVUFEHcVmg"
          />
        </div>
        <div>
          <h1 className="font-h3 text-h3 text-on-surface tracking-tight leading-none mb-1">Identity System</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Government Portal</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 transition-colors duration-200 rounded font-body-md text-body-md ${
                isActive 
                  ? 'bg-surface-container-high text-on-surface font-semibold border-l-4 border-primary rounded-r' 
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-outline-variant">
        <NavLink to="/login" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200 rounded">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-body-md text-body-md">Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
