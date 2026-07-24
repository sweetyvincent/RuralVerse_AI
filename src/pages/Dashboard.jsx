import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Check, Brain, Flame, Bot, FlaskConical, Mic, Clock, Trophy, ArrowRight, Activity, Sparkles } from 'lucide-react';

// Mock useAuth
const useAuth = () => ({ user: { name: 'Alex' } });

// Mock courses
const courses = [
  { id: 1, title: 'Algebra Basics', subject: 'Math', progress: 75, color: 'bg-blue', iconColor: 'text-blue' },
  { id: 2, title: 'Solar System', subject: 'Science', progress: 40, color: 'bg-purple', iconColor: 'text-purple' },
  { id: 3, title: 'World History', subject: 'History', progress: 90, color: 'bg-emerald', iconColor: 'text-emerald' },
  { id: 4, title: 'English Grammar', subject: 'English', progress: 20, color: 'bg-coral', iconColor: 'text-coral' },
  { id: 5, title: 'Biology: Cells', subject: 'Science', progress: 60, color: 'bg-amber', iconColor: 'text-amber' },
  { id: 6, title: 'Physics Intro', subject: 'Science', progress: 10, color: 'bg-blue', iconColor: 'text-blue' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="page-container p-8 max-w-7xl mx-auto">
      <div className="page-header mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-heading mb-2">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-purple">{user.name}</span>! 👋</h1>
          <p className="text-gray-400 text-lg">{today}</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white/5 py-2 px-4 rounded-full border border-white/10">
          <Sparkles size={18} className="text-amber" />
          <span className="text-sm font-medium">Daily Goal: 45/60 mins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stat-cards mb-12">
        <div className="stat-card glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue/10 rounded-full blur-2xl group-hover:bg-blue/20 transition-all"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue/20 rounded-xl border border-blue/20 shadow-[0_0_15px_rgba(67,97,238,0.2)]">
              <BookOpen size={24} className="text-blue" />
            </div>
            <p className="text-gray-300 font-medium">Courses Enrolled</p>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold font-heading">6</h3>
            <span className="text-emerald text-sm font-semibold flex items-center gap-1 bg-emerald/10 px-2 py-1 rounded-md">
              <Activity size={14}/> +1 new
            </span>
          </div>
        </div>
        
        <div className="stat-card glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald/10 rounded-full blur-2xl group-hover:bg-emerald/20 transition-all"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald/20 rounded-xl border border-emerald/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Check size={24} className="text-emerald" />
            </div>
            <p className="text-gray-300 font-medium">Completed Lessons</p>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold font-heading">42</h3>
            <span className="text-emerald text-sm font-semibold flex items-center gap-1 bg-emerald/10 px-2 py-1 rounded-md">
              <Activity size={14}/> +5 wk
            </span>
          </div>
        </div>

        <div className="stat-card glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple/10 rounded-full blur-2xl group-hover:bg-purple/20 transition-all"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple/20 rounded-xl border border-purple/20 shadow-[0_0_15px_rgba(114,9,183,0.2)]">
              <Brain size={24} className="text-purple" />
            </div>
            <p className="text-gray-300 font-medium">Quiz Score Avg</p>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold font-heading">82%</h3>
            <span className="text-emerald text-sm font-semibold flex items-center gap-1 bg-emerald/10 px-2 py-1 rounded-md">
              <Activity size={14}/> +3%
            </span>
          </div>
        </div>

        <div className="stat-card glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber/10 rounded-full blur-2xl group-hover:bg-amber/20 transition-all"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber/20 rounded-xl border border-amber/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Flame size={24} className="text-amber" />
            </div>
            <p className="text-gray-300 font-medium">Study Streak</p>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold font-heading">7 <span className="text-xl text-gray-400 font-normal">days</span></h3>
            <span className="text-amber text-sm font-semibold bg-amber/10 px-2 py-1 rounded-md">
              On fire!
            </span>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-heading">Continue Learning</h2>
          <Link to="/learning-path" className="text-blue hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
            View all paths <ArrowRight size={16} />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
          {courses.map(course => (
            <Link to="/learning-path" key={course.id} className="min-w-[300px] snap-start glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 block border border-white/10 hover:border-white/20 hover:shadow-xl">
              <div className={`h-2 w-full ${course.color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${course.iconColor}`}>{course.subject}</span>
                  <div className={`p-1.5 rounded-md bg-white/5 ${course.iconColor}`}>
                    <BookOpen size={16} />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-6">{course.title}</h3>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden border border-white/5">
                    <div className={`h-full rounded-full ${course.color} relative`} style={{ width: `${course.progress}%` }}>
                       <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-heading">Recent Activity</h2>
            <button className="text-gray-400 hover:text-white text-sm">View History</button>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-dark bg-purple/20 text-purple shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <Brain size={20} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-white">Completed 'Fractions' Quiz</p>
                  <span className="text-xs text-emerald font-bold bg-emerald/10 px-2 py-0.5 rounded">Score: 90%</span>
                </div>
                <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-2"><Clock size={12}/> 2 hours ago</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-dark bg-emerald/20 text-emerald shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <FlaskConical size={20} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-white">AR Lab: Plant Cells</p>
                </div>
                <p className="text-sm text-gray-300">Completed 3D structure exploration</p>
                <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-2"><Clock size={12}/> Yesterday</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-dark bg-blue/20 text-blue shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <Check size={20} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-white">Finished Lesson: Gravity</p>
                </div>
                <p className="text-sm text-gray-300">Physics Module 1</p>
                <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-2"><Clock size={12}/> 2 days ago</p>
              </div>
            </div>
            
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col">
          <h2 className="text-2xl font-bold font-heading mb-2">Quick Actions</h2>
          <p className="text-gray-400 mb-8">Jump right back into your learning journey.</p>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
            <Link to="/tutor" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/5 to-white/0 hover:from-blue/20 hover:to-blue/5 rounded-xl border border-white/10 hover:border-blue/30 transition-all duration-300 text-center group">
              <div className="p-4 bg-black/40 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Bot size={32} className="text-blue" />
              </div>
              <span className="font-bold text-lg">Start AI Chat</span>
              <span className="text-xs text-gray-400 mt-1">Get instant help</span>
            </Link>
            
            <Link to="/quiz" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/5 to-white/0 hover:from-purple/20 hover:to-purple/5 rounded-xl border border-white/10 hover:border-purple/30 transition-all duration-300 text-center group">
              <div className="p-4 bg-black/40 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Brain size={32} className="text-purple" />
              </div>
              <span className="font-bold text-lg">Take a Quiz</span>
              <span className="text-xs text-gray-400 mt-1">Test your knowledge</span>
            </Link>
            
            <Link to="/ar-lab" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/5 to-white/0 hover:from-emerald/20 hover:to-emerald/5 rounded-xl border border-white/10 hover:border-emerald/30 transition-all duration-300 text-center group">
              <div className="p-4 bg-black/40 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <FlaskConical size={32} className="text-emerald" />
              </div>
              <span className="font-bold text-lg">AR Lab</span>
              <span className="text-xs text-gray-400 mt-1">Interactive science</span>
            </Link>
            
            <Link to="/voice" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/5 to-white/0 hover:from-coral/20 hover:to-coral/5 rounded-xl border border-white/10 hover:border-coral/30 transition-all duration-300 text-center group">
              <div className="p-4 bg-black/40 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Mic size={32} className="text-coral" />
              </div>
              <span className="font-bold text-lg">Voice Learn</span>
              <span className="text-xs text-gray-400 mt-1">Hands-free studying</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-3xl -z-10"></div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber/20 rounded-lg">
            <Trophy size={24} className="text-amber" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">AI Recommendations</h2>
            <p className="text-sm text-gray-400">Personalized tasks based on your performance</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black/20 p-6 rounded-xl border-t-4 border-t-purple border-x border-b border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg leading-tight">Practice Linear Equations</h3>
                <Brain size={20} className="text-purple opacity-50" />
              </div>
              <p className="text-sm text-gray-400 mb-6 line-clamp-3">Based on your recent quiz results, this is a recommended area for improvement to strengthen your core math skills.</p>
            </div>
            <button className="w-full py-2.5 bg-purple/10 text-purple border border-purple/30 rounded-lg group-hover:bg-purple group-hover:text-white transition-all font-bold flex justify-center items-center gap-2">
              Start Practice <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="bg-black/20 p-6 rounded-xl border-t-4 border-t-emerald border-x border-b border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg leading-tight">Try AR Chemistry Lab</h3>
                <FlaskConical size={20} className="text-emerald opacity-50" />
              </div>
              <p className="text-sm text-gray-400 mb-6 line-clamp-3">Visualize molecular structures in 3D to boost your understanding of the current chemistry module.</p>
            </div>
            <button className="w-full py-2.5 bg-emerald/10 text-emerald border border-emerald/30 rounded-lg group-hover:bg-emerald group-hover:text-white transition-all font-bold flex justify-center items-center gap-2">
              Start Lab <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="bg-black/20 p-6 rounded-xl border-t-4 border-t-blue border-x border-b border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg leading-tight">Complete Geography Quiz</h3>
                <BookOpen size={20} className="text-blue opacity-50" />
              </div>
              <p className="text-sm text-gray-400 mb-6 line-clamp-3">You haven't practiced Geography in a week. Take a quick refresher quiz to keep your memory sharp.</p>
            </div>
            <button className="w-full py-2.5 bg-blue/10 text-blue border border-blue/30 rounded-lg group-hover:bg-blue group-hover:text-white transition-all font-bold flex justify-center items-center gap-2">
              Start Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
