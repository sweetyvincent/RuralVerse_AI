import React from 'react';
import { BookOpen, Users, Activity, FileText, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { teacherData, students } from '../data/students';

export default function TeacherDashboard() {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="badge-blue px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">Active</span>;
      case 'completed':
        return <span className="badge-emerald px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Completed</span>;
      case 'upcoming':
        return <span className="badge-amber px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">Upcoming</span>;
      default:
        return null;
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-blue-500 w-8 h-8" />
        <h1 className="text-3xl font-heading font-bold text-white">Teacher Dashboard</h1>
      </div>

      <div className="glass-card-accent p-8 mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Welcome back, Dr. Meera Krishnan</h2>
        <p className="text-gray-400">Govt. Higher Secondary School, Palakkad | Class 10th A</p>
      </div>

      <div className="grid-4 mb-8">
        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Total Students</h3>
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">48</div>
        </div>
        
        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Avg Attendance</h3>
            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">88%</div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Avg Performance</h3>
            <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">72%</div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium">Active Assignments</h3>
            <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">2</div>
        </div>
      </div>

      <div className="glass-card-static p-6 mb-8">
        <h3 className="text-xl font-heading font-bold text-white mb-6">Class Performance Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={teacherData.classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#6b6b8d" tick={{fill: '#6b6b8d'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f0f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 6, fill: '#0a0a1a', stroke: '#10b981', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#10b981', stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card-static p-6 mb-8">
        <h3 className="text-xl font-heading font-bold text-white mb-6">Assignments</h3>
        <div className="table-container overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-4 px-4 font-medium">Title</th>
                <th className="py-4 px-4 font-medium">Subject</th>
                <th className="py-4 px-4 font-medium">Due Date</th>
                <th className="py-4 px-4 font-medium">Submitted</th>
                <th className="py-4 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {teacherData.assignments.map((assignment) => {
                const progressPercentage = (assignment.submitted / assignment.total) * 100;
                return (
                  <tr key={assignment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-medium text-white">{assignment.title}</td>
                    <td className="py-4 px-4 text-gray-300">{assignment.subject}</td>
                    <td className="py-4 px-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {assignment.dueDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm">{assignment.submitted}/{assignment.total}</span>
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(assignment.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-heading font-bold text-white mb-6">Student Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="glass-card p-6 cursor-pointer hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{student.name}</h4>
                  <p className="text-gray-400 text-sm">{student.village}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="text-white font-medium">{student.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Attendance</p>
                    <p className="text-white font-semibold">{student.attendance}%</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Avg Score</p>
                    <p className="text-white font-semibold">{student.overallScore}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
