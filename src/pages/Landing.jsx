import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Mic, FlaskConical, Glasses, Brain, WifiOff, Languages, BarChart3, 
  ArrowRight, Play, GraduationCap
} from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';

export default function Landing() {
  return (
    <div className="landing-page min-h-screen text-white">
      {/* Navigation */}
      <nav className="glass-panel fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="font-outfit font-bold text-xl tracking-tight">RuralVerse AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#ar-lab" className="hover:text-white transition-colors">AR Lab</a>
          <a href="#vr-class" className="hover:text-white transition-colors">VR Class</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>
        <Link to="/login" className="btn-primary text-sm px-5 py-2">
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-blue-300 border border-blue-500/20">
            <span className="animate-pulse">🚀</span> AI-Powered Education
          </div>
          
          <h1 className="font-outfit text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Smart Education for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-coral-400">
              Every Village
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Break the geographical barriers with RuralVerse AI. Experience immersive learning through AI tutors, AR science labs, and VR classrooms designed specifically for rural connectivity.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/login" className="btn-primary btn-lg gap-2">
              Start Learning <ArrowRight size={18} />
            </Link>
            <button className="btn-secondary btn-lg gap-2 glass-panel">
              <Play size={18} className="text-coral-400" /> Watch Demo
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="font-bold text-2xl text-white">10K+</div>
              <div className="text-sm text-gray-500">Students</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-white">500+</div>
              <div className="text-sm text-gray-500">Lessons</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-white">12</div>
              <div className="text-sm text-gray-500">Languages</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-white">95%</div>
              <div className="text-sm text-gray-500">Pass Rate</div>
            </div>
          </div>
        </div>
        
        <div className="h-[500px] w-full rounded-2xl overflow-hidden glass-panel relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 pointer-events-none" />
          <HeroScene />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-outfit text-3xl md:text-4xl font-bold">Limitless Learning Possibilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to excel, built with low-bandwidth optimization and local language support.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 grid-auto">
          {[
            { icon: Bot, color: "text-blue-400", bg: "bg-blue-400/10", title: "AI Tutor", desc: "Personalized guidance 24/7" },
            { icon: Mic, color: "text-purple-400", bg: "bg-purple-400/10", title: "Voice Learning", desc: "Interactive oral lessons" },
            { icon: FlaskConical, color: "text-emerald-400", bg: "bg-emerald-400/10", title: "AR Science Lab", desc: "Perform virtual experiments" },
            { icon: Glasses, color: "text-coral-400", bg: "bg-coral-400/10", title: "VR Classroom", desc: "Immersive environments" },
            { icon: Brain, color: "text-amber-400", bg: "bg-amber-400/10", title: "Smart Quizzes", desc: "Adaptive testing system" },
            { icon: WifiOff, color: "text-cyan-400", bg: "bg-cyan-400/10", title: "Offline Mode", desc: "Learn without internet" },
            { icon: Languages, color: "text-blue-400", bg: "bg-blue-400/10", title: "Multi-Language", desc: "Learn in your mother tongue" },
            { icon: BarChart3, color: "text-purple-400", bg: "bg-purple-400/10", title: "Analytics", desc: "Track student progress" }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 hover:-translate-y-1 transition-transform cursor-pointer group">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="font-outfit font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="font-outfit text-3xl font-bold mb-4">Supporting UN Sustainable Development Goals</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { num: 4, title: "Quality Education", color: "#c5192d" },
            { num: 5, title: "Gender Equality", color: "#ff3a21" },
            { num: 8, title: "Decent Work", color: "#a21942" },
            { num: 9, title: "Innovation", color: "#fd6925" },
            { num: 10, title: "Reduced Inequalities", color: "#dd1367" },
            { num: 11, title: "Sustainable Cities", color: "#fd9d24" }
          ].map(sdg => (
            <div key={sdg.num} className="glass-card p-4 flex items-center gap-4 w-64 border-l-4" style={{ borderLeftColor: sdg.color }}>
              <div className="text-2xl font-bold font-outfit" style={{ color: sdg.color }}>{sdg.num}</div>
              <div className="text-sm font-medium">{sdg.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel mt-20 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                <GraduationCap size={14} className="text-white" />
              </div>
              <span className="font-outfit font-bold">RuralVerse AI</span>
            </div>
            <p className="text-sm text-gray-500">Empowering rural education through cutting-edge artificial intelligence and immersive technologies.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">For Schools</a></li>
              <li><a href="#" className="hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Community</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} RuralVerse AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
