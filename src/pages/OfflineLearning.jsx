import React, { useState, useEffect } from 'react';
import { Download, Trash2, WifiOff, Wifi, RefreshCw, HardDrive, Check, BookOpen, Clock, FileText } from 'lucide-react';

const availableLessonsData = [
  { id: 1, title: 'Introduction to Algebra', subject: 'Mathematics', size: '12 MB', icon: <BookOpen size={20} /> },
  { id: 2, title: 'Photosynthesis Explained', subject: 'Biology', size: '18 MB', icon: <FileText size={20} /> },
  { id: 3, title: 'Newton Laws of Motion', subject: 'Physics', size: '25 MB', icon: <BookOpen size={20} /> },
  { id: 4, title: 'World War II History', subject: 'History', size: '15 MB', icon: <FileText size={20} /> },
  { id: 5, title: 'Basic English Grammar', subject: 'English', size: '8 MB', icon: <BookOpen size={20} /> },
  { id: 6, title: 'Chemical Reactions', subject: 'Chemistry', size: '22 MB', icon: <FileText size={20} /> },
  { id: 7, title: 'Indian Geography', subject: 'Geography', size: '30 MB', icon: <BookOpen size={20} /> },
  { id: 8, title: 'Introduction to Coding', subject: 'Computer Science', size: '10 MB', icon: <FileText size={20} /> },
];

const initialDownloaded = [
  { id: 101, title: 'Solar System VR', subject: 'Science', size: '45 MB', icon: <BookOpen size={20} /> },
  { id: 102, title: 'Fractions Masterclass', subject: 'Mathematics', size: '14 MB', icon: <FileText size={20} /> },
  { id: 103, title: 'Human Anatomy 3D', subject: 'Biology', size: '55 MB', icon: <BookOpen size={20} /> },
  { id: 104, title: 'Periodic Table Basics', subject: 'Chemistry', size: '11 MB', icon: <FileText size={20} /> },
];

export default function OfflineLearning() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [availableLessons, setAvailableLessons] = useState(availableLessonsData);
  const [downloadedLessons, setDownloadedLessons] = useState(initialDownloaded);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleDownload = (lesson) => {
    if (!isOnline) {
      alert("You need an internet connection to download lessons.");
      return;
    }
    
    setDownloadingId(lesson.id);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingId(null);
            setAvailableLessons(prevAvailable => prevAvailable.filter(l => l.id !== lesson.id));
            setDownloadedLessons(prevDownloaded => [lesson, ...prevDownloaded]);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDelete = (lessonId) => {
    const lesson = downloadedLessons.find(l => l.id === lessonId);
    setDownloadedLessons(prev => prev.filter(l => l.id !== lessonId));
    setAvailableLessons(prev => [...prev, lesson]);
  };

  const handleSync = () => {
    if (!isOnline) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced(new Date().toLocaleTimeString());
    }, 1500);
  };

  // Calculate storage
  const totalStorage = 500; // MB
  const usedStorage = downloadedLessons.reduce((acc, curr) => {
    return acc + parseInt(curr.size.split(' ')[0]);
  }, 0);
  const storagePercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="page-container" style={{ padding: '2rem', minHeight: '100vh', background: '#0a0a1a', color: 'white' }}>
      
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(247, 37, 133, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f72585' }}>
            <WifiOff size={24} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, fontFamily: "'Outfit', sans-serif" }}>Offline Learning</h1>
        </div>
        
        <button 
          className="btn-primary"
          onClick={handleSync}
          disabled={!isOnline || isSyncing}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: isOnline ? '#4361ee' : '#334155', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: isOnline ? 'pointer' : 'not-allowed', fontWeight: '600', transition: 'all 0.2s' }}
        >
          <RefreshCw size={18} className={isSyncing ? "spin-animation" : ""} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {/* Offline Status Banner */}
      <div className="offline-banner" style={{ background: isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${isOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, borderRadius: '0.75rem', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isOnline ? <Wifi color="#10b981" /> : <WifiOff color="#ef4444" />}
        <div>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: isOnline ? '#10b981' : '#ef4444' }}>
            {isOnline ? 'You are currently Online' : 'You are currently Offline'}
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#94a3b8' }}>
            {isOnline ? 'You can download new lessons and sync your progress.' : 'You can access all downloaded lessons below without internet.'}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(67, 97, 238, 0.2)', color: '#4361ee' }}><BookOpen size={20} /></div>
            <h4 style={{ margin: 0, color: '#94a3b8', fontWeight: '500' }}>Downloaded Lessons</h4>
          </div>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{downloadedLessons.length}</p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(114, 9, 183, 0.2)', color: '#7209b7' }}><HardDrive size={20} /></div>
            <h4 style={{ margin: 0, color: '#94a3b8', fontWeight: '500' }}>Storage Used</h4>
          </div>
          <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{usedStorage} MB <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 'normal' }}>/ {totalStorage} MB</span></p>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${storagePercentage}%`, height: '100%', background: 'linear-gradient(90deg, #7209b7, #4361ee)', borderRadius: '3px' }}></div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}><Clock size={20} /></div>
            <h4 style={{ margin: 0, color: '#94a3b8', fontWeight: '500' }}>Last Synced</h4>
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{lastSynced}</p>
        </div>
      </div>

      {/* Downloaded Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check color="#10b981" /> Available Offline ({downloadedLessons.length})
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {downloadedLessons.map(lesson => (
            <div key={lesson.id} className="download-card glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#10b981' }}>
                  {lesson.icon}
                </div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '1rem', fontWeight: '600' }}>
                  Available Offline
                </span>
              </div>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>{lesson.title}</h3>
              <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.875rem' }}>{lesson.subject} • {lesson.size}</p>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button style={{ flex: 1, padding: '0.5rem', background: '#4361ee', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: '500', cursor: 'pointer' }}>
                  Open Lesson
                </button>
                <button 
                  onClick={() => handleDelete(lesson.id)}
                  style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Remove from offline"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {downloadedLessons.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748b', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
              No lessons downloaded yet. Download some lessons below.
            </div>
          )}
        </div>
      </div>

      {/* Available for Download Section */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download color="#4361ee" /> Available for Download
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {availableLessons.map(lesson => (
            <div key={lesson.id} className="download-card glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#94a3b8' }}>
                  {lesson.icon}
                </div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>
                  {lesson.size}
                </span>
              </div>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>{lesson.title}</h3>
              <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.875rem' }}>{lesson.subject}</p>
              
              {downloadingId === lesson.id ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    <span>Downloading...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${downloadProgress}%`, height: '100%', background: '#4361ee', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => handleDownload(lesson)}
                  disabled={!isOnline}
                  style={{ width: '100%', padding: '0.6rem', background: 'transparent', color: isOnline ? '#4361ee' : '#64748b', border: `1px solid ${isOnline ? '#4361ee' : '#334155'}`, borderRadius: '0.5rem', fontWeight: '500', cursor: isOnline ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                >
                  <Download size={16} /> Download
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
