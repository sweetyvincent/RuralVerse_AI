import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Bot, 
  Mic, 
  Route, 
  FlaskConical, 
  Brain, 
  BarChart3, 
  WifiOff, 
  FolderOpen, 
  BookOpen, 
  Users, 
  Shield,
  PenTool,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      isActive 
        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-300 border-l-4 border-indigo-500 font-medium shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
    }`;

  const iconClass = ({ isActive }) => 
    `transition-transform duration-300 ${isActive ? 'scale-110 text-indigo-400' : 'group-hover:scale-110 group-hover:text-indigo-400'}`;

  return (
    <div className="sidebar fixed left-0 top-0 h-screen w-72 border-r border-white/10 flex flex-col z-40 bg-[#030308]/95 backdrop-blur-2xl">
      {/* Brand Header */}
      <div className="sidebar-logo p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 flex-shrink-0">
          <div className="w-full h-full bg-[#030308] rounded-[11px] flex items-center justify-center">
            <GraduationCap size={22} className="text-indigo-400" />
          </div>
        </div>
        <h1 className="text-xl font-bold font-heading tracking-wide text-white">
          Rural<span className="text-indigo-400">Verse</span> <span className="font-light text-slate-400 text-sm">AI</span>
        </h1>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        
        {/* LEARNING */}
        <div className="nav-section">
          <h3 className="sidebar-section-title text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-3 h-[1px] bg-slate-700"></span> Learning
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/dashboard" className={navClass}>
              {({isActive}) => <><LayoutDashboard size={20} className={iconClass({isActive})} /> <span>Dashboard</span></>}
            </NavLink>
            <NavLink to="/tutor" className={navClass}>
              {({isActive}) => <><Bot size={20} className={iconClass({isActive})} /> <span>AI Tutor</span></>}
            </NavLink>
            <NavLink to="/voice" className={navClass}>
              {({isActive}) => <><Mic size={20} className={iconClass({isActive})} /> <span>Voice Learning</span></>}
            </NavLink>
            <NavLink to="/learning-path" className={navClass}>
              {({isActive}) => <><Route size={20} className={iconClass({isActive})} /> <span>Learning Path</span></>}
            </NavLink>
          </nav>
        </div>

        {/* IMMERSIVE */}
        <div className="nav-section">
          <h3 className="sidebar-section-title text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-3 h-[1px] bg-slate-700"></span> Immersive
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/ar-lab" className={navClass}>
              {({isActive}) => <><FlaskConical size={20} className={iconClass({isActive})} /> <span>AR Science Lab</span></>}
            </NavLink>
            <NavLink to="/air-writing" className={navClass}>
              {({isActive}) => <><PenTool size={20} className={iconClass({isActive})} /> <span>Air Writing</span></>}
            </NavLink>
          </nav>
        </div>

        {/* ASSESSMENT */}
        <div className="nav-section">
          <h3 className="sidebar-section-title text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-3 h-[1px] bg-slate-700"></span> Assessment
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/quiz" className={navClass}>
              {({isActive}) => <><Brain size={20} className={iconClass({isActive})} /> <span>Quiz Generator</span></>}
            </NavLink>
            <NavLink to="/analytics" className={navClass}>
              {({isActive}) => <><BarChart3 size={20} className={iconClass({isActive})} /> <span>Analytics</span></>}
            </NavLink>
          </nav>
        </div>

        {/* RESOURCES */}
        <div className="nav-section">
          <h3 className="sidebar-section-title text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-3 h-[1px] bg-slate-700"></span> Resources
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/offline" className={navClass}>
              {({isActive}) => <><WifiOff size={20} className={iconClass({isActive})} /> <span>Offline Mode</span></>}
            </NavLink>
            <NavLink to="/content" className={navClass}>
              {({isActive}) => <><FolderOpen size={20} className={iconClass({isActive})} /> <span>Content Library</span></>}
            </NavLink>
          </nav>
        </div>

        {/* MANAGEMENT */}
        <div className="nav-section bg-white/[0.02] p-3 rounded-2xl border border-white/5">
          <h3 className="sidebar-section-title text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
            Management
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/teacher" className={navClass}>
              {({isActive}) => (
                <>
                  <BookOpen size={20} className={iconClass({isActive})} /> 
                  <span className="flex-1">Teacher Portal</span>
                  <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
                </>
              )}
            </NavLink>
            <NavLink to="/parent" className={navClass}>
              {({isActive}) => <><Users size={20} className={iconClass({isActive})} /> <span>Parent Overview</span></>}
            </NavLink>
            <NavLink to="/admin" className={navClass}>
              {({isActive}) => <><Shield size={20} className={iconClass({isActive})} /> <span>Admin Panel</span></>}
            </NavLink>
          </nav>
        </div>

      </div>

      {/* User Profile Mini Footer */}
      <div className="mt-auto p-4 border-t border-white/10 bg-black/40">
        <div className="user-profile-mini flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
              {user?.avatar || 'AS'}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Aarav Sharma'}</p>
              <p className="text-[10px] text-indigo-300 capitalize truncate">{user?.role || 'student'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-slate-400 hover:text-pink-400 transition-colors p-2 rounded-lg hover:bg-pink-500/10" 
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
