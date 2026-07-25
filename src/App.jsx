import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AITutor from './pages/AITutor';
import VoiceLearning from './pages/VoiceLearning';
import LearningPath from './pages/LearningPath';
import ARLab from './pages/ARLab';
import AirWriting from './pages/AirWriting';
import QuizGenerator from './pages/QuizGenerator';
import Analytics from './pages/Analytics';
import OfflineLearning from './pages/OfflineLearning';
import ContentManagement from './pages/ContentManagement';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/layout/Sidebar';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function DashboardLayout({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}

function FullScreenLayout({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/learning-path" element={<DashboardLayout><LearningPath /></DashboardLayout>} />
      <Route path="/quiz" element={<DashboardLayout><QuizGenerator /></DashboardLayout>} />
      <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
      <Route path="/offline" element={<DashboardLayout><OfflineLearning /></DashboardLayout>} />
      <Route path="/content" element={<DashboardLayout><ContentManagement /></DashboardLayout>} />
      <Route path="/teacher" element={<DashboardLayout><TeacherDashboard /></DashboardLayout>} />
      <Route path="/parent" element={<DashboardLayout><ParentDashboard /></DashboardLayout>} />
      <Route path="/admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
      <Route path="/voice" element={<DashboardLayout><VoiceLearning /></DashboardLayout>} />

      {/* Full Screen Routes (no page padding) */}
      <Route path="/tutor" element={<FullScreenLayout><AITutor /></FullScreenLayout>} />
      <Route path="/ar-lab" element={<DashboardLayout><ARLab /></DashboardLayout>} />
      <Route path="/air-writing" element={<FullScreenLayout><AirWriting /></FullScreenLayout>} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
