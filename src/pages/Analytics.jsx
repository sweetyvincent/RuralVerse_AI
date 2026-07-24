import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { BarChart3, TrendingUp, BookOpen, CheckCircle, Brain, Target, Lightbulb, AlertCircle } from 'lucide-react';

const subjectData = [
  { name: 'Math', score: 85 },
  { name: 'Science', score: 78 },
  { name: 'English', score: 76 },
  { name: 'History', score: 72 },
  { name: 'Geography', score: 68 },
  { name: 'CS', score: 92 },
];

const weeklyData = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 2 },
  { name: 'Sat', hours: 3.5 },
  { name: 'Sun', hours: 1 },
];

const pieData = [
  { name: 'Excellent (>90)', value: 40, color: '#10b981' },
  { name: 'Good (70-90)', value: 35, color: '#4361ee' },
  { name: 'Average (50-70)', value: 15, color: '#f59e0b' },
  { name: 'Needs Work (<50)', value: 10, color: '#f72585' },
];

const monthlyData = [
  { name: 'Jan', progress: 50 },
  { name: 'Feb', progress: 55 },
  { name: 'Mar', progress: 62 },
  { name: 'Apr', progress: 70 },
  { name: 'May', progress: 78 },
  { name: 'Jun', progress: 85 },
];

const BAR_COLORS = ['#4361ee', '#7209b7', '#10b981', '#f72585', '#f59e0b', '#06d6a0'];

export default function Analytics() {
  return (
    <div className="page-container fade-in">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-blue-500 w-8 h-8" />
        <h1 className="text-3xl font-heading font-bold text-white">Learning Analytics</h1>
      </div>

      <div className="grid-4 mb-8">
        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Total Study Hours</h3>
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">127</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +12%
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Quizzes Completed</h3>
            <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">48</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +8
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Average Score</h3>
            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">82%</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +5%
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Lessons Completed</h3>
            <div className="bg-coral-500/20 p-2 rounded-lg text-coral-400">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">42</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +15
          </div>
        </div>
      </div>

      <div className="grid-2 mb-8">
        <div className="glass-card-static p-6">
          <h4 className="text-lg font-heading font-semibold text-white mb-6">Performance by Subject</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }} cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card-static p-6">
          <h4 className="text-lg font-heading font-semibold text-white mb-6">Weekly Study Activity</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4361ee" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#4361ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#4361ee" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2 mb-8">
        <div className="glass-card-static p-6">
          <h4 className="text-lg font-heading font-semibold text-white mb-6">Quiz Score Distribution</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card-static p-6">
          <h4 className="text-lg font-heading font-semibold text-white mb-6">Monthly Progress</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="progress" stroke="#4361ee" strokeWidth={3} dot={{ r: 6, fill: '#0a0a1a', stroke: '#4361ee', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#4361ee', stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card-accent p-6 mb-8">
        <h4 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="text-yellow-400 w-6 h-6" /> AI Insights
        </h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-3">
              <span className="text-xl">🎯</span> Strength
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              You excel at Computer Science and Mathematics. Keep up the great work in these subjects!
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-3">
              <AlertCircle className="w-5 h-5" /> Focus Area
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Geography needs more attention. Try 2 extra lessons this week to improve your understanding.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-3">
              <span className="text-xl">💡</span> Recommendation
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Complete the AR Chemistry lab to boost Science score by 10% and reinforce concepts visually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
