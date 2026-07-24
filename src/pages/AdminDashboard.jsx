import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Users, BookOpen, Star, Check, X, Eye, Edit, AlertCircle } from 'lucide-react';

const userGrowthData = [
  { name: 'Jan', users: 200 },
  { name: 'Feb', users: 350 },
  { name: 'Mar', users: 600 },
  { name: 'Apr', users: 850 },
  { name: 'May', users: 1100 },
  { name: 'Jun', users: 1247 },
];

const platformUsageData = [
  { name: 'AI Tutor', users: 850 },
  { name: 'AR Lab', users: 420 },
  { name: 'VR Class', users: 310 },
  { name: 'Quiz', users: 760 },
  { name: 'Voice', users: 540 },
  { name: 'Offline', users: 920 },
];

const usersData = [
  { id: 1, name: 'Alice Smith', role: 'student', email: 'alice@example.com', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Bob Johnson', role: 'teacher', email: 'bob@example.com', status: 'Active', joinDate: '2022-11-05' },
  { id: 3, name: 'Carol Williams', role: 'parent', email: 'carol@example.com', status: 'Inactive', joinDate: '2023-03-20' },
  { id: 4, name: 'David Brown', role: 'admin', email: 'david@example.com', status: 'Active', joinDate: '2021-08-10' },
  { id: 5, name: 'Eve Davis', role: 'student', email: 'eve@example.com', status: 'Active', joinDate: '2023-05-12' },
  { id: 6, name: 'Frank Miller', role: 'student', email: 'frank@example.com', status: 'Active', joinDate: '2023-06-01' },
  { id: 7, name: 'Grace Wilson', role: 'teacher', email: 'grace@example.com', status: 'Active', joinDate: '2022-09-18' },
  { id: 8, name: 'Henry Moore', role: 'parent', email: 'henry@example.com', status: 'Active', joinDate: '2023-02-28' },
];

const AdminDashboard = () => {
  return (
    <div className="page-container p-8 max-w-7xl mx-auto space-y-8">
      <div className="page-header flex items-center gap-3">
        <Shield size={32} className="text-coral" />
        <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stat-cards">
        <div className="stat-card glass-panel p-6 rounded-xl">
          <div className="stat-card-content flex items-center gap-4">
            <div className="p-3 bg-blue/20 rounded-lg">
              <Users size={24} className="text-blue" />
            </div>
            <div className="stat-info">
              <h3 className="text-sm text-gray-400">Total Users</h3>
              <div className="flex items-end gap-2">
                <p className="stat-value text-2xl font-bold">1,247</p>
                <span className="stat-change positive text-emerald text-xs font-semibold mb-1">+23%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="stat-card glass-panel p-6 rounded-xl">
          <div className="stat-card-content flex items-center gap-4">
            <div className="p-3 bg-emerald/20 rounded-lg">
              <Check size={24} className="text-emerald" />
            </div>
            <div className="stat-info">
              <h3 className="text-sm text-gray-400">Active Students</h3>
              <p className="stat-value text-2xl font-bold">892</p>
            </div>
          </div>
        </div>
        <div className="stat-card glass-panel p-6 rounded-xl">
          <div className="stat-card-content flex items-center gap-4">
            <div className="p-3 bg-purple/20 rounded-lg">
              <BookOpen size={24} className="text-purple" />
            </div>
            <div className="stat-info">
              <h3 className="text-sm text-gray-400">Teachers</h3>
              <p className="stat-value text-2xl font-bold">48</p>
            </div>
          </div>
        </div>
        <div className="stat-card glass-panel p-6 rounded-xl">
          <div className="stat-card-content flex items-center gap-4">
            <div className="p-3 bg-amber/20 rounded-lg">
              <Star size={24} className="text-amber" />
            </div>
            <div className="stat-info">
              <h3 className="text-sm text-gray-400">Content Items</h3>
              <p className="stat-value text-2xl font-bold">356</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 section">
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">User Growth</h2>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4361ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="users" stroke="#4361ee" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Platform Usage</h2>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'rgba(255,255,255,0.05)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Bar dataKey="users" fill="#7209b7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <div className="table-container glass-panel rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-semibold text-gray-300">Name</th>
                <th className="p-4 font-semibold text-gray-300">Role</th>
                <th className="p-4 font-semibold text-gray-300">Email</th>
                <th className="p-4 font-semibold text-gray-300">Status</th>
                <th className="p-4 font-semibold text-gray-300">Join Date</th>
                <th className="p-4 font-semibold text-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(user => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-opacity-20 ${
                      user.role === 'student' ? 'bg-blue text-blue' : 
                      user.role === 'teacher' ? 'bg-purple text-purple' : 
                      user.role === 'parent' ? 'bg-emerald text-emerald' : 
                      'bg-coral text-coral'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{user.email}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald' : 'bg-gray-500'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{user.joinDate}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition"><Eye size={16} /></button>
                    <button className="p-2 text-gray-400 hover:text-blue bg-white/5 hover:bg-white/10 rounded transition"><Edit size={16} /></button>
                    <button className="p-2 text-gray-400 hover:text-coral bg-white/5 hover:bg-white/10 rounded transition"><AlertCircle size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 section">
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Content Approval Queue</h2>
          <ul className="space-y-4">
            {[1, 2, 3, 4].map(item => (
              <li key={item} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium">Science Lesson {item}</h4>
                  <p className="text-sm text-gray-400 mt-1">Author: Teacher Bob • Video • Submitted: 2 days ago</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded flex items-center gap-1 transition"><Eye size={14} /> Preview</button>
                  <button className="p-1.5 bg-emerald/20 text-emerald hover:bg-emerald hover:text-white rounded transition"><Check size={18} /></button>
                  <button className="p-1.5 bg-coral/20 text-coral hover:bg-coral hover:text-white rounded transition"><X size={18} /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col gap-8">
          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">System Health</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex justify-center mb-2">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald"></span>
                  </span>
                </div>
                <p className="text-sm text-gray-400">Server Status</p>
                <strong className="text-lg">Online</strong>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
                <AlertCircle size={24} className="mx-auto mb-2 text-blue" />
                <p className="text-sm text-gray-400">API Response</p>
                <strong className="text-lg">45ms avg</strong>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
                <p className="text-sm text-gray-400 mb-2">Storage</p>
                <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                  <div className="bg-purple h-2 rounded-full" style={{width: '24%'}}></div>
                </div>
                <p className="text-xs text-gray-300">2.4 GB / 10 GB</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">Recent Feedback</h2>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <li key={item} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="font-medium text-blue">User {item}</strong>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} size={14} className={i < 4 ? "text-amber fill-amber" : "text-gray-500"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">Great platform, but could use more AR experiments. The interface is very smooth!</p>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
