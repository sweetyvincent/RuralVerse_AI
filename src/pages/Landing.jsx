import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Mic, FlaskConical, PenTool, Brain, WifiOff, Languages, BarChart3, 
  ArrowRight, Play, GraduationCap, Sparkles, CheckCircle2, Shield, Globe, Layers, Users
} from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';

export default function Landing() {
  return (
    <div className="landing-page min-h-screen text-slate-100 bg-[#030308] relative overflow-hidden">
      {/* Background Mesh Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-600/08 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-[#030308]/75 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#030308] rounded-[11px] flex items-center justify-center">
                <GraduationCap size={22} className="text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
              Rural<span className="text-indigo-400">Verse</span> <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <Link to="/ar-lab" className="hover:text-indigo-400 transition-colors">AR Science Lab</Link>
            <Link to="/air-writing" className="hover:text-indigo-400 transition-colors">Air Writing</Link>
            <Link to="/tutor" className="hover:text-indigo-400 transition-colors">AI Tutor</Link>
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:inline-flex text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              to="/login" 
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/25 backdrop-blur-md shadow-inner">
            <Sparkles size={16} className="text-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">
              Next-Gen AI & AR Rural Education Platform
            </span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            Empowering Village Schools With <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 drop-shadow-sm">
              Spatial AI & AR Labs
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Break educational barriers with low-bandwidth AI tutors, hand-tracked mid-air writing, and 3D interactive science laboratories accessible on any device.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              to="/login" 
              className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 text-base"
            >
              Start Learning Now <ArrowRight size={20} />
            </Link>
            
            <Link 
              to="/ar-lab" 
              className="px-8 py-4 rounded-xl font-semibold text-slate-200 bg-white/05 hover:bg-white/10 border border-white/15 backdrop-blur-xl hover:border-indigo-400/40 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 text-base"
            >
              <FlaskConical size={20} className="text-indigo-400" /> Explore AR Lab
            </Link>
          </div>

          {/* Quick Key Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/10">
            <div>
              <div className="font-heading font-extrabold text-3xl text-white">10K+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Active Students</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl text-white">30+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">3D AR Experiments</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl text-white">12</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Regional Languages</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Offline Accessible</div>
            </div>
          </div>
        </div>

        {/* 3D Hero Scene Showcase */}
        <div className="lg:col-span-5 h-[520px] w-full rounded-3xl overflow-hidden border border-white/15 bg-slate-950/60 backdrop-blur-2xl relative shadow-2xl shadow-indigo-950/50 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-purple-600/20 pointer-events-none z-10" />
          <HeroScene />
          
          {/* Floating Feature Badges over 3D Canvas */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2 pointer-events-none">
            <div className="p-3.5 rounded-2xl bg-[#030308]/80 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">AI Personal Tutor Active</div>
                  <div className="text-[10px] text-slate-400">Available 24/7 in 12 languages</div>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Comprehensive Suite
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Built for Smart, Accessible Education
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Empowering every student with artificial intelligence, spatial augmented reality, and offline learning tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Bot, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", title: "AI Tutor", desc: "Interactive personalized chat guidance for all subjects 24/7.", link: "/tutor" },
            { icon: FlaskConical, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", title: "AR Science Lab", desc: "Search and view 30+ interactive 3D chemical & physics models.", link: "/ar-lab" },
            { icon: PenTool, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", title: "Air Writing Camera", desc: "Write floating ink in mid-air using camera finger tracking.", link: "/air-writing" },
            { icon: Mic, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", title: "Voice Learning", desc: "Speech-to-text and text-to-speech audio interactive lessons.", link: "/voice" },
            { icon: Brain, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", title: "Smart Quizzes", desc: "Adaptive AI test generator with real-time feedback.", link: "/quiz" },
            { icon: WifiOff, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", title: "Offline Mode", desc: "Download lessons locally for learning without internet.", link: "/offline" },
            { icon: Languages, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", title: "Multi-Language", desc: "Learn seamlessly in regional mother tongues.", link: "/learning-path" },
            { icon: BarChart3, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", title: "Analytics", desc: "Track progress, strengths, and study streaks.", link: "/analytics" }
          ].map((feature, i) => (
            <Link 
              key={i} 
              to={feature.link}
              className={`p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:${feature.border} hover:bg-white/[0.06] transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 block`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={26} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                {feature.title}
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* UN Sustainable Development Goals (SDG) */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Global Impact
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
            Supporting UN Sustainable Development Goals
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { num: 4, title: "Quality Education", color: "#c5192d" },
            { num: 5, title: "Gender Equality", color: "#ff3a21" },
            { num: 8, title: "Decent Work", color: "#a21942" },
            { num: 9, title: "Industry & Innovation", color: "#fd6925" },
            { num: 10, title: "Reduced Inequalities", color: "#dd1367" },
            { num: 11, title: "Sustainable Cities", color: "#fd9d24" }
          ].map(sdg => (
            <div 
              key={sdg.num} 
              className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="text-3xl font-black font-heading mb-1" style={{ color: sdg.color }}>
                SDG {sdg.num}
              </div>
              <div className="text-xs font-medium text-slate-300">{sdg.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020206] pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">RuralVerse AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering rural education through cutting-edge artificial intelligence, spatial computing, and offline-first tech.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-200 mb-4">Learning Hub</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/ar-lab" className="hover:text-indigo-400 transition-colors">AR Science Lab</Link></li>
              <li><Link to="/air-writing" className="hover:text-indigo-400 transition-colors">Air Writing Camera</Link></li>
              <li><Link to="/tutor" className="hover:text-indigo-400 transition-colors">AI Personal Tutor</Link></li>
              <li><Link to="/quiz" className="hover:text-indigo-400 transition-colors">Smart AI Quizzes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-200 mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/offline" className="hover:text-indigo-400 transition-colors">Offline Downloads</Link></li>
              <li><Link to="/learning-path" className="hover:text-indigo-400 transition-colors">Learning Journey</Link></li>
              <li><Link to="/analytics" className="hover:text-indigo-400 transition-colors">Analytics Dashboard</Link></li>
              <li><Link to="/content" className="hover:text-indigo-400 transition-colors">Content Library</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-200 mb-4">Dashboards</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/teacher" className="hover:text-indigo-400 transition-colors">Teacher Portal</Link></li>
              <li><Link to="/parent" className="hover:text-indigo-400 transition-colors">Parent Overview</Link></li>
              <li><Link to="/admin" className="hover:text-indigo-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/05 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} RuralVerse AI. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
