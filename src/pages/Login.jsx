import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Shield, ArrowRight, Mail, Lock } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sphere, Box } from '@react-three/drei';
import { useAuth } from '../contexts/AuthContext';

const BackgroundScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} color="#4361ee" />
    <pointLight position={[-10, -10, -10]} intensity={1} color="#7209b7" />
    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -5]}>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#4361ee" wireframe opacity={0.3} transparent />
      </Sphere>
    </Float>
    <Float speed={2} rotationIntensity={2} floatIntensity={1} position={[4, -2, -3]}>
      <Box args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial color="#7209b7" wireframe opacity={0.2} transparent />
      </Box>
    </Float>
  </>
);

export default function Login() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, role });
    navigate('/dashboard');
  };

  const roles = [
    { id: 'student', icon: GraduationCap, label: 'Student' },
    { id: 'teacher', icon: BookOpen, label: 'Teacher' },
    { id: 'parent', icon: Users, label: 'Parent' },
    { id: 'admin', icon: Shield, label: 'Admin' }
  ];

  return (
    <div className="auth-page min-h-screen relative flex items-center justify-center p-4">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0a1a]">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <BackgroundScene />
        </Canvas>
      </div>

      <div className="auth-card glass-card relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/10 backdrop-blur-2xl bg-white/5">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 mb-4 shadow-lg shadow-blue-500/25">
            <GraduationCap size={28} className="text-white" />
          </Link>
          <h1 className="font-outfit text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">Select Role</label>
            <div className="role-selector grid grid-cols-4 gap-2">
              {roles.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`role-option flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    role === r.id 
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <r.icon size={20} className="mb-1" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Email address"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
              <span className="text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium">
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
