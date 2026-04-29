import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen">
        <header className="fixed top-0 right-0 md:left-[280px] left-0 z-30 h-16 border-b border-outline-variant bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-between px-8">
          <div className="text-lg font-black text-on-surface uppercase tracking-wider">
            Digital ID Admin
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">notifications</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
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
