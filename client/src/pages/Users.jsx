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
        // Map backend data to frontend format if necessary
        const mappedUsers = response.data.map(u => ({
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

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased flex min-h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[280px] flex flex-col h-screen">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 md:left-[280px] left-0 z-30 h-16 flex items-center justify-between px-8 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant shadow-sm transition-all">
          <div className="flex items-center">
            <span className="font-h3 text-h3 text-on-surface uppercase tracking-wider font-black">Digital ID Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <IconButton icon="notifications" />
            <IconButton icon="help_outline" />
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2 cursor-pointer">
              <img 
                alt="Administrator Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJdo6hSQ_R6-hhVECISBfHfKwtHmNNCMeSHrtwLyp2_mcpoI-Gx5Aew6AbkCs3J_nODZEOzv7z26hARIKlFIUBdXpAl6XMBvSoyanDgJLM60dv0rcyRsmEC8UIp55RqFp4ggxVaQO2JXUCxp4kpiI05Psdt8-HfFwhqK1tdr2JM2ly6b800T1rPF6mesiaXQE-RJYSt74L3QG79cKBo2wARXNr5-2tk4iZIACNiOCZ6GcPOfNgMbhJi3Y8LyXlahELEmwNkImHsw"
              />
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-1 mt-16 p-margin-desktop w-full max-w-[1400px] overflow-y-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg gap-4">
            <div>
              <h2 className="font-h2 text-h2 text-on-surface mb-1">Users Management</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">View and manage all registered personnel within the identity system.</p>
            </div>
            <button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-body-md text-body-md font-medium hover:bg-on-surface transition-colors duration-150 active:scale-95 shadow-sm">
              <span className="material-symbols-outlined text-sm">add</span>
              Add New User
            </button>
          </div>

          {/* Toolbar */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm mb-stack-md flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full pl-10 pr-4 py-2.5 bg-background border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-shadow" placeholder="Search by name, ID, or email..." type="text"/>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Filter by</span>
              <select className="bg-background border border-outline-variant text-on-surface font-body-sm text-body-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary appearance-none min-w-[160px]">
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="security">Security</option>
                <option value="administration">Administration</option>
                <option value="human_resources">Human Resources</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider w-12">
                      <input className="rounded border-outline-variant text-primary focus:ring-secondary" type="checkbox"/>
                    </th>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">User Profile</th>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Role & Department</th>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Digital ID Status</th>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-10 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <p className="font-body-md text-on-surface-variant">Loading users...</p>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-10 text-center">
                        <p className="font-body-md text-on-surface-variant">No users found.</p>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-surface-bright transition-colors group h-[64px]">
                        <td className="py-3 px-6">
                          <input className="rounded border-outline-variant text-primary focus:ring-secondary" type="checkbox"/>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-variant border border-outline-variant/50 shrink-0 flex items-center justify-center">
                              {user.image ? (
                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="font-body-lg text-body-lg text-on-surface-variant font-medium">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-body-md text-body-md font-medium text-on-surface">{user.name}</p>
                              <p className="font-data-mono text-data-mono text-on-surface-variant text-xs mt-0.5">ID: {user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <p className="font-body-sm text-body-sm text-on-surface">{user.role}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{user.department}</p>
                        </td>
                        <td className="py-3 px-6">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="py-3 px-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                            <button className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-md transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                            <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors" title="More Options">
                              <span className="material-symbols-outlined text-sm">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 4 of 128 entries</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 font-body-sm text-body-sm" disabled>Previous</button>
                <button className="px-3 py-1.5 rounded bg-primary text-on-primary font-body-sm text-body-sm">1</button>
                <button className="px-3 py-1.5 rounded hover:bg-surface-container-low text-on-surface font-body-sm text-body-sm">2</button>
                <button className="px-3 py-1.5 rounded hover:bg-surface-container-low text-on-surface font-body-sm text-body-sm">3</button>
                <span className="text-on-surface-variant">...</span>
                <button className="px-3 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low font-body-sm text-body-sm">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let styles = "bg-surface-variant text-on-surface-variant border-outline-variant";
  let dotColor = "bg-outline";

  if (status === 'Active') {
    styles = "bg-secondary-container/30 text-on-secondary-fixed-variant border-secondary-container";
    dotColor = "bg-secondary";
  } else if (status === 'Revoked') {
    styles = "bg-error-container/30 text-error border-error-container";
    dotColor = "bg-error";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-label-caps text-label-caps border ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
}

function IconButton({ icon }) {
  return (
    <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-full hover:bg-surface-container-low">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}

export default Users;
