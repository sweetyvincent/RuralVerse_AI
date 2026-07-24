import React from 'react';
import { Users, GraduationCap, MapPin, Target, Calendar, CheckCircle, Brain, BookOpen, FlaskConical, Glasses, MessageCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { students, parentData } from '../data/students';

export default function ParentDashboard() {
  const child = students[0]; // Aarav Sharma

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'lesson': return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'ar-lab': return <FlaskConical className="w-5 h-5 text-emerald-400" />;
      case 'vr': return <Glasses className="w-5 h-5 text-amber-400" />;
      default: return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/20';
    if (score >= 80) return 'text-blue-400 bg-blue-500/20';
    if (score >= 70) return 'text-amber-400 bg-amber-500/20';
    return 'text-coral-400 bg-coral-500/20';
  };

  const getProgressColor = (score) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-coral-500';
  };

  return (
    <div className="page-container fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-blue-500 w-8 h-8" />
        <h1 className="text-3xl font-heading font-bold text-white">Parent Dashboard</h1>
      </div>

      <div className="glass-card-accent p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <GraduationCap className="w-32 h-32 text-blue-500" />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle 
                cx="64" 
                cy="64" 
                r="56" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - child.progress / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-white">{child.progress}%</span>
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">{child.name}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300">
              <div className="flex items-center gap-1">
                <GraduationCap className="w-5 h-5 text-blue-400" /> Grade 10
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5 text-coral-400" /> {child.village}
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm">
                Attendance: <span className="text-white font-semibold ml-1">{child.attendance}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3 mb-8">
        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Overall Score</h3>
            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{child.overallScore}%</div>
          <p className="text-emerald-400 text-sm mt-2">Excellent performance</p>
        </div>
        
        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Attendance Rate</h3>
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{child.attendance}%</div>
          <p className="text-blue-400 text-sm mt-2">Highly regular</p>
        </div>

        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Completed Courses</h3>
            <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{child.coursesCompleted || 8}</div>
          <p className="text-purple-400 text-sm mt-2">On track for semester</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card-static p-6">
            <h3 className="text-xl font-heading font-bold text-white mb-6">Subject Performance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {child.subjects.map((subject, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-medium">{subject.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getScoreColor(subject.score)}`}>
                      {subject.grade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white">{subject.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getProgressColor(subject.score)}`} 
                      style={{ width: `${subject.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card p-6 bg-emerald-500/5 border-emerald-500/20">
              <h4 className="flex items-center gap-2 font-semibold text-emerald-400 mb-4">
                <Lightbulb className="w-5 h-5" /> Strengths
              </h4>
              <ul className="space-y-3">
                {parentData.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-card p-6 bg-amber-500/5 border-amber-500/20">
              <h4 className="flex items-center gap-2 font-semibold text-amber-400 mb-4">
                <AlertTriangle className="w-5 h-5" /> Areas for Improvement
              </h4>
              <ul className="space-y-3">
                {parentData.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Target className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white mb-1">{improvement.topic}</p>
                      <p className="text-xs text-gray-400">{improvement.tip}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card-static p-6">
            <h3 className="text-xl font-heading font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {child.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-lg mt-1 shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">{activity.description}</p>
                    <p className="text-gray-400 text-xs">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-static p-6">
            <h3 className="text-xl font-heading font-bold text-white mb-6">Messages from Teacher</h3>
            <div className="space-y-4">
              {parentData.messages.map((msg) => (
                <div key={msg.id} className={`p-4 rounded-xl border ${msg.read ? 'bg-white/5 border-white/10' : 'bg-blue-500/10 border-blue-500/30'} cursor-pointer hover:bg-white/10 transition-colors`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageCircle className={`w-4 h-4 ${msg.read ? 'text-gray-400' : 'text-blue-400'}`} />
                      <span className="text-sm font-semibold text-white">{msg.sender}</span>
                    </div>
                    <span className="text-xs text-gray-400">{msg.date}</span>
                  </div>
                  <p className={`text-sm ${msg.read ? 'text-gray-400' : 'text-gray-200'}`}>{msg.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
