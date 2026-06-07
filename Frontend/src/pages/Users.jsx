import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        const mappedUsers = response.data.map(u => ({
          userId: u.id,
          id: u.Cards?.[0]?.idNumber || 'N/A',
          name: `${u.firstName} ${u.lastName}`,
          role: u.role,
          department: u.department,
          status: u.status,
          image: u.image
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await api.delete(`/users/${userId}`);
        setUsers(users.filter(u => u.userId !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'Active' ? 'Revoked' : 'Active';
    try {
      await api.put(`/users/${user.userId}/status`, { status: newStatus });
      setUsers(users.map(u => u.userId === user.userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const thStyle = {
    padding: '14px 20px',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#475569',
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap',
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0e1a', fontFamily: 'Inter, sans-serif' }}>
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

        {/* Main */}
        <main className="flex-1 mt-16 p-6 md:p-8 overflow-y-auto" style={{ background: '#0a0e1a' }}>
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
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
                Users Management
              </h2>
              <p className="text-sm" style={{ color: '#475569' }}>
                View and manage all registered personnel within the identity system.
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
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
              Add New User
            </button>
          </div>

          {/* Toolbar */}
          <div
            className="rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center"
            style={{ background: '#0f1629', border: '1px solid #1e2d4a' }}
          >
            <div className="relative w-full max-w-sm">
              <span
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ fontSize: '18px', color: '#2a3d60' }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: '#0a0e1a',
                  border: '1px solid #1e2d4a',
                  color: '#e2e8f0',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(0,212,255,0.4)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#1e2d4a';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569' }}>
                Filter
              </span>
              <select
                className="rounded-xl px-4 py-2.5 text-sm appearance-none cursor-pointer transition-all"
                style={{
                  background: '#0a0e1a',
                  border: '1px solid #1e2d4a',
                  color: '#94a3b8',
                  fontFamily: 'Inter, sans-serif',
                  minWidth: '160px',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(0,212,255,0.4)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#1e2d4a';
                }}
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="security">Security</option>
                <option value="administration">Administration</option>
                <option value="human_resources">Human Resources</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0f1629', border: '1px solid #1e2d4a', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead style={{ background: '#0a0e1a', borderBottom: '1px solid #1e2d4a' }}>
                  <tr>
                    <th style={thStyle}>
                      <input
                        type="checkbox"
                        className="rounded"
                        style={{ accentColor: '#00d4ff' }}
                      />
                    </th>
                    <th style={thStyle}>User Profile</th>
                    <th style={thStyle}>Role & Department</th>
                    <th style={thStyle}>Digital ID Status</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '48px', textAlign: 'center' }}>
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                            style={{ borderColor: '#00d4ff', borderTopColor: 'transparent' }}
                          />
                          <p className="text-sm" style={{ color: '#475569' }}>Loading users...</p>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '48px', textAlign: 'center' }}>
                        <div className="flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#1e2d4a' }}>
                            group_off
                          </span>
                          <p className="text-sm" style={{ color: '#475569' }}>No users found.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.userId}
                        className="group"
                        style={{ borderBottom: '1px solid #1e2d4a', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#141c33')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '16px 20px' }}>
                          <input
                            type="checkbox"
                            className="rounded"
                            style={{ accentColor: '#00d4ff' }}
                          />
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,201,167,0.15))',
                                border: '1px solid rgba(0,212,255,0.2)',
                              }}
                            >
                              {user.image ? (
                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <span
                                  className="text-sm font-bold"
                                  style={{ color: '#00d4ff', fontFamily: 'Outfit, sans-serif' }}
                                >
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{user.name}</p>
                              <p
                                className="text-xs mt-0.5"
                                style={{ color: '#2a3d60', fontFamily: 'JetBrains Mono, monospace' }}
                              >
                                {user.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>{user.role}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{user.department}</p>
                        </td>
                        <td
                          style={{ padding: '16px 20px', cursor: 'pointer' }}
                          onClick={() => handleToggleStatus(user)}
                          title="Click to toggle status"
                        >
                          <StatusBadge status={user.status} />
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div
                            className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <ActionBtn
                              icon={user.status === 'Active' ? 'block' : 'check_circle'}
                              color="#00c9a7"
                              hoverBg="rgba(0,201,167,0.1)"
                              title={user.status === 'Active' ? 'Revoke ID' : 'Activate ID'}
                              onClick={() => handleToggleStatus(user)}
                            />
                            <ActionBtn
                              icon="delete"
                              color="#ef4444"
                              hoverBg="rgba(239,68,68,0.1)"
                              title="Delete"
                              onClick={() => handleDeleteUser(user.userId)}
                            />
                            <ActionBtn
                              icon="more_vert"
                              color="#475569"
                              hoverBg="rgba(255,255,255,0.05)"
                              title="More Options"
                              onClick={() => {}}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderTop: '1px solid #1e2d4a' }}
            >
              <span className="text-xs" style={{ color: '#475569' }}>
                Showing {users.length} entries
              </span>
              <div className="flex items-center gap-2">
                {['Previous', '1', '2', '3', 'Next'].map((label, i) => (
                  <button
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                    disabled={label === 'Previous'}
                    style={{
                      background: label === '1'
                        ? 'linear-gradient(135deg, #00d4ff, #00c9a7)'
                        : 'transparent',
                      color: label === '1' ? '#060b18' : '#475569',
                      border: label === '1' ? 'none' : '1px solid #1e2d4a',
                      fontFamily: 'Inter, sans-serif',
                      opacity: label === 'Previous' ? 0.4 : 1,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const configs = {
    Active:  { color: '#00c9a7', bg: 'rgba(0,201,167,0.12)', border: 'rgba(0,201,167,0.25)' },
    Revoked: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)' },
    default: { color: '#475569', bg: 'rgba(71,85,105,0.12)', border: 'rgba(71,85,105,0.25)' },
  };
  const cfg = configs[status] || configs.default;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
      />
      {status}
    </span>
  );
}

function ActionBtn({ icon, color, hoverBg, title, onClick }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-1.5 rounded-lg transition-all duration-200"
      style={{ color: '#475569', border: '1px solid transparent' }}
      onMouseEnter={e => {
        e.currentTarget.style.color = color;
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.borderColor = `${color}33`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#475569';
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{icon}</span>
    </button>
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

export default Users;
