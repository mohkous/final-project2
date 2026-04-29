import React from 'react';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const metrics = [
    {
      title: 'Total Users',
      value: '2.4M',
      trend: '+12% this month',
      icon: 'group',
      iconColor: 'text-primary',
      trendColor: 'text-secondary'
    },
    {
      title: 'Active Cards',
      value: '1.8M',
      trend: '+5% this month',
      icon: 'verified',
      iconColor: 'text-secondary',
      trendColor: 'text-secondary'
    },
    {
      title: 'Expired Cards',
      value: '45.2K',
      trend: 'Stable',
      icon: 'warning',
      iconColor: 'text-error',
      trendColor: 'text-on-surface-variant'
    },
    {
      title: 'Pending Verifications',
      value: '1,204',
      trend: '+24% required attention',
      icon: 'pending_actions',
      iconColor: 'text-on-tertiary-fixed-variant',
      trendColor: 'text-error'
    }
  ];

  const activities = [
    {
      type: 'issued',
      title: 'New Card Issued',
      details: 'ID: 908-223',
      subtitle: 'Approved by Admin A. Smith',
      time: '2 MINS AGO',
      icon: 'how_to_reg',
      bg: 'bg-secondary-fixed',
      color: 'text-on-secondary-fixed'
    },
    {
      type: 'failed',
      title: 'Verification Failed',
      details: 'ID: 445-190',
      subtitle: 'Biometric mismatch detected.',
      time: '15 MINS AGO',
      icon: 'block',
      bg: 'bg-error-container',
      color: 'text-on-error-container'
    },
    {
      type: 'update',
      title: 'System Update',
      details: 'v2.4.1 deployed',
      subtitle: 'Security patches applied.',
      time: '1 HOUR AGO',
      icon: 'update',
      bg: 'bg-surface-variant',
      color: 'text-on-surface-variant'
    },
    {
      type: 'sync',
      title: 'Data Sync',
      details: 'Regional Hub B',
      subtitle: 'Completed successfully.',
      time: '3 HOURS AGO',
      icon: 'sync',
      bg: 'bg-tertiary-fixed',
      color: 'text-on-tertiary-fixed'
    }
  ];

  return (
    <div className="bg-background text-on-background font-body-md antialiased flex h-screen overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[280px] w-full min-h-screen">
        {/* TopAppBar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-16 fixed top-0 right-0 left-0 md:left-[280px] z-30 flex items-center justify-between px-8">
          <div className="flex items-center font-h3 text-h3 text-primary uppercase tracking-wider font-black">
            Digital ID Admin
          </div>
          <div className="flex items-center gap-4">
            <IconButton icon="notifications" />
            <IconButton icon="help_outline" />
            <button className="text-on-surface-variant hover:text-primary transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">account_circle</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop mt-16 bg-background">
          <div className="max-w-container-max mx-auto space-y-stack-lg">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-h2 text-h2 text-primary">System Overview</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">Key metrics and recent activity for the Identity System.</p>
              </div>
              <button className="bg-primary text-on-primary font-data-mono text-data-mono px-6 py-3 rounded-lg shadow-sm hover:scale-98 transition-transform duration-150 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">add</span>
                New Registration
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
              {/* System Health */}
              <div className="xl:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-h3 text-h3 text-primary">System Health</h3>
                  <button className="text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <div className="flex-1 min-h-[300px] rounded-lg bg-surface-container-low border border-outline-variant flex items-center justify-center relative overflow-hidden">
                  <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-secondary-fixed/30 to-transparent flex items-end px-4 gap-2 pb-4">
                    {[40, 60, 30, 80, 50, 90, 70, 85, 40, 60].map((height, i) => (
                      <div 
                        key={i} 
                        className={`w-1/12 bg-primary-container rounded-t-sm transition-all duration-500`}
                        style={{ height: `${height}%`, opacity: height / 100 }}
                      ></div>
                    ))}
                  </div>
                  <div className="z-10 text-center bg-white/90 backdrop-blur px-6 py-4 rounded-lg shadow-sm border border-outline-variant">
                    <p className="font-data-mono text-data-mono text-primary text-xl">99.98% Uptime</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Last 30 Days</p>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col h-[500px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-h3 text-h3 text-primary">Recent Activity</h3>
                  <a className="font-data-mono text-data-mono text-primary hover:underline text-sm" href="#">View All</a>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                  {activities.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, iconColor, trendColor }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col justify-between h-full relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className={`material-symbols-outlined text-[64px] ${iconColor}`}>{icon}</span>
      </div>
      <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-4 relative z-10">{title}</h3>
      <div className="relative z-10">
        <span className="font-h1 text-h1 text-primary">{value}</span>
        <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
          <span className="material-symbols-outlined text-[16px]">
            {trend === 'Stable' ? 'trending_flat' : 'trending_up'}
          </span>
          <span className="font-data-mono text-data-mono text-sm">{trend}</span>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, details, subtitle, time, icon, bg, color }) {
  return (
    <div className="flex gap-4">
      <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0 mt-1`}>
        <span className={`material-symbols-outlined text-[16px] ${color}`}>{icon}</span>
      </div>
      <div>
        <p className="font-body-md text-body-md text-primary"><span className="font-bold">{title}</span> - {details}</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p>
        <p className="font-label-caps text-label-caps text-on-primary-container mt-1">{time}</p>
      </div>
    </div>
  );
}

function IconButton({ icon }) {
  return (
    <button className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-surface-container-low">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}

export default Dashboard;
