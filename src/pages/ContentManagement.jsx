import React, { useState } from 'react';
import { Play, FileText, Brain, Box, Upload, FolderOpen, Search, Filter, Edit, Trash2, Eye, X } from 'lucide-react';

const contentData = [
  { id: 1, type: 'Video', title: 'Introduction to Algebra', author: 'Mr. Smith', subject: 'Math', date: '2023-10-01', views: 120, status: 'Published' },
  { id: 2, type: 'Notes', title: 'Cell Structure', author: 'Ms. Johnson', subject: 'Science', date: '2023-10-02', views: 85, status: 'Published' },
  { id: 3, type: 'Quiz', title: 'World War II', author: 'Mr. Davis', subject: 'History', date: '2023-10-05', views: 200, status: 'Published' },
  { id: 4, type: 'AR Model', title: 'Solar System', author: 'Ms. Wilson', subject: 'Science', date: '2023-10-10', views: 350, status: 'Draft' },
  { id: 5, type: 'Video', title: 'Newton\'s Laws', author: 'Mr. Smith', subject: 'Physics', date: '2023-10-12', views: 90, status: 'Under Review' },
  { id: 6, type: 'Notes', title: 'Shakespeare Sonnets', author: 'Mrs. Brown', subject: 'English', date: '2023-10-15', views: 45, status: 'Published' },
  { id: 7, type: 'Quiz', title: 'Fractions', author: 'Mr. Smith', subject: 'Math', date: '2023-10-18', views: 150, status: 'Published' },
  { id: 8, type: 'AR Model', title: 'Human Heart', author: 'Ms. Johnson', subject: 'Biology', date: '2023-10-20', views: 420, status: 'Published' },
  { id: 9, type: 'Video', title: 'Grammar Basics', author: 'Mrs. Brown', subject: 'English', date: '2023-10-22', views: 60, status: 'Draft' },
  { id: 10, type: 'Notes', title: 'Ancient Egypt', author: 'Mr. Davis', subject: 'History', date: '2023-10-25', views: 110, status: 'Published' },
  { id: 11, type: 'Quiz', title: 'Chemical Elements', author: 'Ms. Wilson', subject: 'Chemistry', date: '2023-10-28', views: 180, status: 'Under Review' },
  { id: 12, type: 'AR Model', title: 'Volcano Eruption', author: 'Mr. Smith', subject: 'Geography', date: '2023-11-01', views: 500, status: 'Published' },
];

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Types');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getIcon = (type) => {
    switch(type) {
      case 'Video': return <Play size={20} className="text-blue" />;
      case 'Notes': return <FileText size={20} className="text-emerald" />;
      case 'Quiz': return <Brain size={20} className="text-purple" />;
      case 'AR Model': return <Box size={20} className="text-coral" />;
      default: return <FileText size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-emerald/20 text-emerald';
      case 'Draft': return 'bg-gray-500/20 text-gray-400';
      case 'Under Review': return 'bg-amber/20 text-amber';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  }

  return (
    <div className="page-container p-8 max-w-7xl mx-auto space-y-8 relative">
      <div className="page-header flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FolderOpen size={32} className="text-blue" />
          <h1 className="text-3xl font-bold font-heading">Content Management</h1>
        </div>
      </div>

      <div className="action-bar glass-panel p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="search-box relative flex-1 min-w-[300px] max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search content by title, author..." 
            className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select 
              className="bg-black/20 border border-white/10 rounded-lg py-2.5 pl-9 pr-8 text-white focus:outline-none focus:border-blue appearance-none transition-colors cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All Types</option>
              <option>Video</option>
              <option>Notes</option>
              <option>Quiz</option>
              <option>AR Model</option>
            </select>
          </div>
          <button 
            className="bg-blue hover:bg-blue-600 text-white py-2.5 px-5 rounded-lg flex items-center gap-2 font-medium transition-colors"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload size={18} />
            Upload Content
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contentData
          .filter(c => filter === 'All Types' || c.type === filter)
          .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.author.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(content => (
          <div key={content.id} className="content-card glass-panel p-5 rounded-xl border border-white/10 hover:border-blue/50 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                {getIcon(content.type)}
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(content.status)}`}>
                {content.status}
              </span>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{content.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{content.author}</p>
            </div>
            
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="text-xs px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/5">{content.subject}</span>
              <span className="text-gray-400 flex items-center gap-1"><Eye size={14}/> {content.views}</span>
            </div>
            
            <div className="text-xs text-gray-500 pt-3 border-t border-white/5 flex justify-between items-center">
              <span>Added: {content.date}</span>
              <span>ID: #{content.id}</span>
            </div>

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-2.5 bg-blue/20 text-blue hover:bg-blue hover:text-white rounded-full transition-colors tooltip-trigger" title="Preview">
                <Eye size={20} />
              </button>
              <button className="p-2.5 bg-purple/20 text-purple hover:bg-purple hover:text-white rounded-full transition-colors tooltip-trigger" title="Edit">
                <Edit size={20} />
              </button>
              <button className="p-2.5 bg-coral/20 text-coral hover:bg-coral hover:text-white rounded-full transition-colors tooltip-trigger" title="Delete">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-xl border border-white/10 mt-8">
        <h2 className="mb-6 text-xl font-semibold flex items-center gap-2"><FolderOpen size={20} className="text-blue"/> Curriculum View</h2>
        <div className="curriculum-tree p-4 bg-black/20 rounded-lg border border-white/5">
          <div className="tree-item pl-2">
            <div className="flex items-center gap-3 font-semibold mb-3 text-lg">
              <span className="w-2 h-2 rounded-full bg-blue"></span>
              Grade 7 
              <span className="text-xs font-normal text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">24 Lessons Total</span>
            </div>
            <div className="tree-children pl-6 border-l border-white/10 space-y-4 ml-1">
              
              <div className="subject-group">
                <div className="flex items-center gap-2 text-md font-medium mb-2 text-blue">
                  Mathematics 
                  <span className="text-xs font-normal text-gray-400 ml-2">10 Lessons</span>
                </div>
                <div className="pl-4 space-y-2 border-l border-blue/20 ml-2 py-1">
                  <div className="flex justify-between items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue"></span> Algebra Basics</p>
                    <span className="text-xs text-gray-500">3 items</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue"></span> Geometry</p>
                    <span className="text-xs text-gray-500">4 items</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue"></span> Fractions</p>
                    <span className="text-xs text-gray-500">3 items</span>
                  </div>
                </div>
              </div>

              <div className="subject-group">
                <div className="flex items-center gap-2 text-md font-medium mb-2 text-emerald">
                  Science 
                  <span className="text-xs font-normal text-gray-400 ml-2">8 Lessons</span>
                </div>
                <div className="pl-4 space-y-2 border-l border-emerald/20 ml-2 py-1">
                  <div className="flex justify-between items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-emerald"></span> Human Biology</p>
                    <span className="text-xs text-gray-500">4 items</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-emerald"></span> Chemistry Intro</p>
                    <span className="text-xs text-gray-500">4 items</span>
                  </div>
                </div>
              </div>

              <div className="subject-group">
                <div className="flex items-center gap-2 text-md font-medium mb-2 text-purple">
                  History 
                  <span className="text-xs font-normal text-gray-400 ml-2">6 Lessons</span>
                </div>
                <div className="pl-4 space-y-2 border-l border-purple/20 ml-2 py-1">
                  <div className="flex justify-between items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-purple"></span> Ancient Civilizations</p>
                    <span className="text-xs text-gray-500">6 items</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-panel p-8 rounded-2xl w-full max-w-lg relative border border-white/20 shadow-2xl animate-fade-in">
            <button 
              className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors" 
              onClick={() => setShowUploadModal(false)}
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold mb-2 font-heading">Upload New Content</h2>
            <p className="text-gray-400 text-sm mb-6">Add educational materials to the repository.</p>
            
            <div className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center mb-6 hover:border-blue hover:bg-blue/5 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white/5 group-hover:bg-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <Upload size={28} className="text-gray-400 group-hover:text-blue transition-colors" />
              </div>
              <p className="text-base font-medium mb-1">Drag & drop files here</p>
              <p className="text-sm text-gray-500">or click to browse from your computer</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input type="text" placeholder="e.g. Introduction to Photosynthesis" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue focus:outline-none transition-colors" />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea placeholder="Brief description of the content..." rows="3" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue focus:outline-none transition-colors resize-none"></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Content Type</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue focus:outline-none appearance-none transition-colors">
                    <option>Video</option>
                    <option>Notes</option>
                    <option>Quiz</option>
                    <option>AR Model</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Subject</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue focus:outline-none appearance-none transition-colors">
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>History</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Target Grade Level</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue focus:outline-none appearance-none transition-colors">
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>
              
              <div className="pt-4 flex gap-4">
                <button 
                  className="flex-1 py-3 px-4 rounded-lg font-medium border border-white/10 hover:bg-white/5 transition-colors"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-3 px-4 bg-blue hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  onClick={() => setShowUploadModal(false)}
                >
                  Upload Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
