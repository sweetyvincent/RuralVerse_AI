import React, { useState } from 'react';
import { Route, Award, Flame, BookOpen, ChevronRight, Lock, CheckCircle2, PlayCircle, Star } from 'lucide-react';

const mockCourses = [
  { id: 'math-101', title: 'Algebra Foundations', subject: 'Mathematics', icon: 'Calculator', progress: 60, total: 10, completed: 6, color: 'text-blue-400', topics: [
    { id: 't1', title: 'Introduction to Variables', status: 'completed', score: 95 },
    { id: 't2', title: 'Solving Linear Equations', status: 'completed', score: 88 },
    { id: 't3', title: 'Graphing Basic Functions', status: 'completed', score: 92 },
    { id: 't4', title: 'Systems of Equations', status: 'current' },
    { id: 't5', title: 'Polynomials Basics', status: 'locked' }
  ]},
  { id: 'sci-201', title: 'Biology Essentials', subject: 'Science', icon: 'TestTube', progress: 25, total: 8, completed: 2, color: 'text-green-400', topics: [
    { id: 't1', title: 'Cell Structure', status: 'completed', score: 90 },
    { id: 't2', title: 'Photosynthesis', status: 'current' },
    { id: 't3', title: 'Genetics 101', status: 'locked' }
  ]},
  { id: 'eng-301', title: 'Grammar Mastery', subject: 'English', icon: 'BookOpen', progress: 80, total: 5, completed: 4, color: 'text-purple-400', topics: [] },
  { id: 'hist-101', title: 'World History I', subject: 'History', icon: 'History', progress: 0, total: 12, completed: 0, color: 'text-yellow-400', topics: [] },
  { id: 'cs-101', title: 'Intro to Python', subject: 'Computer Science', icon: 'Code', progress: 10, total: 15, completed: 1, color: 'text-pink-400', topics: [] },
  { id: 'geo-101', title: 'Physical Geography', subject: 'Geography', icon: 'Globe', progress: 40, total: 10, completed: 4, color: 'text-emerald-400', topics: [] }
];

export default function LearningPath() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);

  return (
    <div className="container mx-auto p-4 md:p-8 pt-24 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-accent-blue/20 text-accent-blue">
          <Route size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-heading">Your Learning Journey</h1>
          <p className="text-white/60">Track your progress and follow your personalized path</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-white/60">Overall Progress</p>
            <p className="text-2xl font-bold">42%</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-emerald/20 flex items-center justify-center text-accent-emerald">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-white/60">Completed Lessons</p>
            <p className="text-2xl font-bold">17</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-coral/20 flex items-center justify-center text-accent-coral">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-sm text-white/60">Current Streak</p>
            <p className="text-2xl font-bold">5 Days</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-white/60">AI Recommendations</p>
            <p className="text-2xl font-bold">3 New</p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <h2 className="text-xl font-bold mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {mockCourses.map(course => (
          <div 
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className={`glass-card p-5 cursor-pointer transition-all ${
              selectedCourse.id === course.id 
                ? 'border-accent-blue shadow-[0_0_20px_rgba(67,97,238,0.2)] scale-[1.02]' 
                : 'hover:border-white/20'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-white/5 border border-white/10">
                {course.subject}
              </span>
              <span className="text-sm font-medium text-white/60">{course.completed}/{course.total}</span>
            </div>
            <h3 className="text-lg font-bold mb-4">{course.title}</h3>
            
            <div className="w-full bg-dark/50 rounded-full h-2 mb-2">
              <div 
                className="bg-accent-blue h-2 rounded-full transition-all duration-1000"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-right text-white/50">{course.progress}% Complete</p>
          </div>
        ))}
      </div>

      {/* Skill Tree */}
      {selectedCourse && selectedCourse.topics && selectedCourse.topics.length > 0 && (
        <div className="glass-card p-6 md:p-10 relative">
          <h2 className="text-2xl font-bold mb-8 text-center">{selectedCourse.title} - Learning Path</h2>
          
          <div className="skill-tree relative max-w-3xl mx-auto before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-1 before:-ml-0.5 before:bg-white/10">
            {selectedCourse.topics.map((topic, index) => (
              <div key={topic.id} className={`relative flex items-center justify-between mb-8 w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-5/12"></div>
                <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-dark border-4 border-dark shadow-[0_0_0_4px_rgba(255,255,255,0.05)] absolute left-1/2 -ml-5">
                  {topic.status === 'completed' && <CheckCircle2 className="text-accent-emerald" size={24} />}
                  {topic.status === 'current' && <div className="w-4 h-4 rounded-full bg-accent-blue animate-ping absolute"></div>}
                  {topic.status === 'current' && <div className="w-4 h-4 rounded-full bg-accent-blue relative"></div>}
                  {topic.status === 'locked' && <Lock className="text-white/30" size={18} />}
                </div>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`p-4 rounded-xl border inline-block w-full ${
                    topic.status === 'completed' ? 'bg-white/5 border-accent-emerald/30' :
                    topic.status === 'current' ? 'bg-accent-blue/10 border-accent-blue shadow-[0_0_15px_rgba(67,97,238,0.2)]' :
                    'bg-black/20 border-white/5 opacity-50'
                  }`}>
                    <h4 className="font-bold mb-1">{topic.title}</h4>
                    {topic.status === 'completed' && (
                      <p className="text-xs text-accent-emerald font-medium">Score: {topic.score}%</p>
                    )}
                    {topic.status === 'current' && (
                      <button className="mt-2 text-xs bg-accent-blue text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-600 transition-colors">
                        <PlayCircle size={14} /> Start Lesson
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <h2 className="text-xl font-bold mt-12 mb-4 flex items-center gap-2">
        <Star className="text-accent-purple" /> AI Recommended Next Steps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 border-t-2 border-t-accent-purple bg-gradient-to-b from-accent-purple/5 to-transparent">
          <h4 className="font-bold text-lg mb-2">Systems of Equations</h4>
          <p className="text-sm text-white/60 mb-4">Based on your recent progress in Algebra, you're ready to tackle this topic.</p>
          <button className="text-accent-purple text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Start Now <ChevronRight size={16} />
          </button>
        </div>
        <div className="glass-card p-5 border-t-2 border-t-accent-emerald bg-gradient-to-b from-accent-emerald/5 to-transparent">
          <h4 className="font-bold text-lg mb-2">Review: Photosynthesis</h4>
          <p className="text-sm text-white/60 mb-4">You scored 70% on this topic. A quick review could boost your understanding.</p>
          <button className="text-accent-emerald text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Review <ChevronRight size={16} />
          </button>
        </div>
        <div className="glass-card p-5 border-t-2 border-t-accent-blue bg-gradient-to-b from-accent-blue/5 to-transparent">
          <h4 className="font-bold text-lg mb-2">Weekly Math Challenge</h4>
          <p className="text-sm text-white/60 mb-4">Test your skills with our AI-generated weekly challenge to earn a badge!</p>
          <button className="text-accent-blue text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Take Challenge <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
