import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api';

function Dashboard() {
  const [usersData, setUsersData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, activitiesRes] = await Promise.all([
          api.get('/users'),
          api.get('/activities')
        ]);
        setUsersData(usersRes.data);
        setActivitiesData(activitiesRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

  const totalUsers = usersData.length;
  let activeCards = 0;
  let expiredCards = 0;

  usersData.forEach(user => {
    if (user.Cards && user.Cards.length > 0) {
      user.Cards.forEach(card => {
        if (card.status === 'Active') activeCards++;
        else expiredCards++;
      });
    }
  });

  const metrics = [
    {
      title: 'Total Users',
      value: totalUsers.toLocaleString(),
      trend: 'Real-time',
      icon: 'group',
      gradient: 'linear-gradient(135deg, #00d4ff22, #00d4ff08)',
      iconColor: '#00d4ff',
      trendColor: '#00d4ff',
      glow: 'rgba(0,212,255,0.15)',
    },
    {
      title: 'Active Cards',
      value: activeCards.toLocaleString(),
      trend: 'Real-time',
      icon: 'verified',
      gradient: 'linear-gradient(135deg, #00c9a722, #00c9a708)',
      iconColor: '#00c9a7',
      trendColor: '#00c9a7',
      glow: 'rgba(0,201,167,0.15)',
    },
    {
      title: 'Expired Cards',
      value: expiredCards.toLocaleString(),
      trend: 'Needs review',
      icon: 'warning',
      gradient: 'linear-gradient(135deg, #ef444422, #ef444408)',
      iconColor: '#ef4444',
      trendColor: '#ef4444',
      glow: 'rgba(239,68,68,0.12)',
    },
    {
      title: 'Pending Verifications',
      value: '0',
      trend: 'All caught up',
      icon: 'pending_actions',
      gradient: 'linear-gradient(135deg, #f59e0b22, #f59e0b08)',
      iconColor: '#f59e0b',
      trendColor: '#f59e0b',
      glow: 'rgba(245,158,11,0.12)',
    }
  ];

  const timeAgo = (dateStr) => {
    if (!dateStr) return 'JUST NOW';
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " YRS AGO";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " MOS AGO";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " DAYS AGO";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " HRS AGO";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " MINS AGO";
    return Math.floor(Math.max(0, seconds)) + " SECS AGO";
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'issued':   return 'how_to_reg';
      case 'failed':   return 'block';
      case 'verified': return 'check_circle';
      case 'update':   return 'update';
      case 'sync':     return 'sync';
      default:         return 'info';
    }
  };

  const getColorForType = (type) => {
    switch(type) {
      case 'issued':   return { color: '#00c9a7', bg: 'rgba(0,201,167,0.12)', border: 'rgba(0,201,167,0.2)' };
      case 'failed':   return { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.2)' };
      case 'verified': return { color: '#00d4ff', bg: 'rgba(0,212,255,0.12)', border: 'rgba(0,212,255,0.2)' };
      case 'update':   return { color: '#818cf8', bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.2)' };
      case 'sync':     return { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.2)' };
      default:         return { color: '#475569', bg: 'rgba(71,85,105,0.12)', border: 'rgba(71,85,105,0.2)' };
    }
  };

  const activities = activitiesData.slice(0, 10).map(act => ({
    type: act.type,
    title: act.title,
    details: act.details,
    subtitle: act.subtitle,
    time: timeAgo(act.createdAt),
    icon: getIconForType(act.type),
    colors: getColorForType(act.type),
  }));

  const generateChartData = () => {
    const chart = [];
    const today = new Date();
    for (let i = 9; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = activitiesData.filter(act => act.createdAt && act.createdAt.startsWith(dateStr)).length;
      chart.push({ date: dateStr, count });
    }
    const max = Math.max(...chart.map(d => d.count), 10);
    return {
      chartData: chart.map(d => ({ ...d, height: (d.count / max) * 100 })),
      total: chart.reduce((sum, d) => sum + d.count, 0)
    };
  };

  const { chartData, total } = generateChartData();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0e1a', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-[268px] w-full min-h-screen">
        {/* TopAppBar */}
        <header
          className="fixed top-0 right-0 left-0 md:left-[268px] z-30 h-16 flex items-center justify-between px-8"
          style={{
            background: 'rgba(10,14,26,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid #1e2d4a',
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
            <IconButton icon="notifications" />
            <IconButton icon="help_outline" />
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer"
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

        {/* Dashboard Content */}
        <main
          className="flex-1 overflow-y-auto mt-16 p-6 md:p-8"
          style={{ background: '#0a0e1a' }}
        >
          <div className="max-w-[1280px] mx-auto space-y-8">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
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
                  System Overview
                </h2>
                <p className="text-sm" style={{ color: '#475569' }}>
                  Key metrics and recent activity for the Identity System.
                </p>
              </div>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
                  color: '#060b18',
                  fontFamily: 'Outfit, sans-serif',
                  boxShadow: '0 0 20px rgba(0,212,255,0.25)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.45)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                New Registration
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Activity Chart */}
              <div
                className="xl:col-span-2 rounded-2xl p-6 flex flex-col"
                style={{
                  background: '#0f1629',
                  border: '1px solid #1e2d4a',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0' }}
                    >
                      Activity Volume
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
                      Last 10 days
                    </p>
                  </div>
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: '#475569' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#00d4ff';
                      e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
                  </button>
                </div>

                {/* Chart */}
                <div
                  className="flex-1 min-h-[260px] rounded-xl relative overflow-hidden flex items-end px-4 pb-4 gap-2"
                  style={{
                    background: '#0a0e1a',
                    border: '1px solid #1e2d4a',
                  }}
                >
                  {/* Grid lines */}
                  {[25, 50, 75].map(pct => (
                    <div
                      key={pct}
                      className="absolute left-4 right-4"
                      style={{
                        bottom: `calc(${pct}% + 16px)`,
                        borderTop: '1px dashed #1e2d4a',
                      }}
                    />
                  ))}

                  {chartData.map((data, i) => (
                    <div
                      key={i}
                      className="flex-1 relative group flex flex-col justify-end"
                      style={{ height: '100%' }}
                    >
                      <div
                        className="w-full rounded-t-lg transition-all duration-500 relative"
                        style={{
                          height: `${Math.max(data.height, 5)}%`,
                          background: data.height > 0
                            ? 'linear-gradient(180deg, #00d4ff, #00c9a7)'
                            : '#1e2d4a',
                          opacity: Math.max(data.height / 100, 0.2),
                          boxShadow: data.height > 0 ? '0 0 12px rgba(0,212,255,0.3)' : 'none',
                        }}
                        title={`${data.count} actions on ${data.date}`}
                      >
                        {/* Tooltip */}
                        <div
                          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                          style={{
                            background: '#1a2238',
                            border: '1px solid #2a3d60',
                            color: '#e2e8f0',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '10px',
                          }}
                        >
                          {data.count} actions
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Center stat overlay */}
                  <div
                    className="absolute top-4 right-4 px-4 py-2 rounded-xl"
                    style={{
                      background: 'rgba(15,22,41,0.9)',
                      border: '1px solid #1e2d4a',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <p
                      className="text-xl font-black"
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {total}
                    </p>
                    <p className="text-xs" style={{ color: '#475569' }}>Total actions</p>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: '#0f1629',
                  border: '1px solid #1e2d4a',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  maxHeight: '460px',
                }}
              >
                <div className="flex justify-between items-center mb-5">
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0' }}
                  >
                    Recent Activity
                  </h3>
                  <a
                    href="#"
                    className="text-xs font-medium transition-colors"
                    style={{ color: '#00d4ff' }}
                    onMouseEnter={e => (e.target.style.color = '#00c9a7')}
                    onMouseLeave={e => (e.target.style.color = '#00d4ff')}
                  >
                    View All
                  </a>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {activities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#1e2d4a' }}>
                        inbox
                      </span>
                      <p className="text-xs" style={{ color: '#475569' }}>No recent activity</p>
                    </div>
                  ) : (
                    activities.map((activity, index) => (
                      <ActivityItem key={index} {...activity} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, gradient, iconColor, trendColor, glow }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
      style={{
        background: '#0f1629',
        border: '1px solid #1e2d4a',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${iconColor}44`;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${iconColor}22, 0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${glow}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1e2d4a';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      }}
    >
      {/* Background icon watermark */}
      <div
        className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{ filter: `drop-shadow(0 0 8px ${iconColor})` }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '96px', color: iconColor, fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>

      {/* Icon badge */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: gradient,
          border: `1px solid ${iconColor}33`,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px', color: iconColor, fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
        {title}
      </p>

      <p
        className="text-4xl font-black mb-2"
        style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0' }}
      >
        {value}
      </p>

      <div className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: trendColor, boxShadow: `0 0 6px ${trendColor}` }}
        />
        <span className="text-xs font-medium" style={{ color: trendColor }}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ title, details, subtitle, time, icon, colors }) {
  return (
    <div className="flex gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: colors.bg,
          border: `1px solid ${colors.border}`,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '15px', color: colors.color, fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: '#e2e8f0' }}>
          {title}
          {details && (
            <span className="font-normal ml-1" style={{ color: '#475569' }}>
              — {details}
            </span>
          )}
        </p>
        {subtitle && (
          <p className="text-xs truncate" style={{ color: '#475569' }}>
            {subtitle}
          </p>
        )}
        <p
          className="text-xs mt-1 font-medium"
          style={{ color: colors.color, fontFamily: 'JetBrains Mono, monospace' }}
        >
          {time}
        </p>
      </div>
    </div>
  );
}

function IconButton({ icon }) {
  return (
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
      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
    </button>
  );
}

export default Dashboard;
