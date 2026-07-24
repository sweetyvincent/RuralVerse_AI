import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Bot, 
  Mic, 
  Route, 
  FlaskConical, 
  Glasses, 
  Brain, 
  BarChart3, 
  WifiOff, 
  FolderOpen, 
  BookOpen, 
  Users, 
  Shield, 
  LogOut 
} from 'lucide-react';

// Mock useAuth since it's not provided in the prompt context
const useAuth = () => {
  return {
    user: {
      name: 'Sarah Jenkins',
      role: 'admin', // Or teacher, student
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    },
    logout: () => console.log('Logged out')
  };
};

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
        ? 'bg-gradient-to-r from-blue/20 to-transparent text-blue border-l-2 border-blue font-medium shadow-[inset_0_0_20px_rgba(67,97,238,0.1)]' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
    }`;

  const iconClass = ({ isActive }) => 
    `transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-blue/80'}`;

  return (
    <div className="sidebar fixed left-0 top-0 h-screen w-72 glass-panel border-r border-white/10 flex flex-col z-40 bg-dark/95 backdrop-blur-xl">
      <div className="sidebar-logo p-6 flex items-center gap-3 mb-2 border-b border-white/5">
        <div className="p-2 bg-gradient-to-br from-blue to-purple rounded-xl shadow-lg shadow-blue/20 flex-shrink-0">
          <GraduationCap size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold font-heading tracking-wide">
          Rural<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-purple">Verse</span> <span className="font-light text-gray-300 text-lg">AI</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar space-y-8">
        
        <div className="nav-section">
          <h3 className="sidebar-section-title text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-600"></span> Learning
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

        <div className="nav-section">
          <h3 className="sidebar-section-title text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-600"></span> Immersive
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/ar-lab" className={navClass}>
              {({isActive}) => <><FlaskConical size={20} className={iconClass({isActive})} /> <span>AR Science Lab</span></>}
            </NavLink>
            <NavLink to="/vr-classroom" className={navClass}>
              {({isActive}) => <><Glasses size={20} className={iconClass({isActive})} /> <span>VR Classroom</span></>}
            </NavLink>
          </nav>
        </div>

        <div className="nav-section">
          <h3 className="sidebar-section-title text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-600"></span> Assessment
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

        <div className="nav-section">
          <h3 className="sidebar-section-title text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-600"></span> Resources
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/offline" className={navClass}>
              {({isActive}) => <><WifiOff size={20} className={iconClass({isActive})} /> <span>Offline Learning</span></>}
            </NavLink>
            <NavLink to="/content" className={navClass}>
              {({isActive}) => <><FolderOpen size={20} className={iconClass({isActive})} /> <span>Content Library</span></>}
            </NavLink>
          </nav>
        </div>

        {(user.role === 'teacher' || user.role === 'admin') && (
          <div className="nav-section bg-white/5 p-3 rounded-xl border border-white/5">
            <h3 className="sidebar-section-title text-xs font-bold text-coral uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
              Management
            </h3>
            <nav className="flex flex-col gap-1">
              <NavLink to="/teacher" className={navClass}>
                {({isActive}) => (
                  <>
                    <BookOpen size={20} className={iconClass({isActive})} /> 
                    <span className="flex-1">Teacher Dashboard</span>
                    <span className="bg-coral text-white text-xs px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(247,37,133,0.5)]">3</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/parent" className={navClass}>
                {({isActive}) => <><Users size={20} className={iconClass({isActive})} /> <span>Parent Dashboard</span></>}
              </NavLink>
              <NavLink to="/admin" className={navClass}>
                {({isActive}) => <><Shield size={20} className={iconClass({isActive})} /> <span>Admin Panel</span></>}
              </NavLink>
            </nav>
          </div>
        )}
      </div>

      <div className="mt-auto p-4 border-t border-white/10 bg-black/20">
        <div className="user-profile-mini flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative">
              <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-blue/50 object-cover" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald rounded-full border-2 border-dark"></div>
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize truncate">{user.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-coral transition-colors p-2 rounded-lg hover:bg-coral/10" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
