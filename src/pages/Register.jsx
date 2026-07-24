import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, MapPin, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, TorusKnot } from '@react-three/drei';
import { useAuth } from '../contexts/AuthContext';

const BackgroundScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
    <pointLight position={[-10, -10, -10]} intensity={1} color="#4361ee" />
    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    <Float speed={1} rotationIntensity={2} floatIntensity={1.5} position={[0, 0, -5]}>
      <TorusKnot args={[1.5, 0.2, 128, 32]} scale={1.5}>
        <meshStandardMaterial color="#10b981" wireframe opacity={0.15} transparent />
      </TorusKnot>
    </Float>
  </>
);

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: 'grade-5',
    language: 'english',
    village: ''
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register({ ...formData, role: 'student' });
    navigate('/dashboard');
  };

  return (
    <div className="auth-page min-h-screen relative flex items-center justify-center p-4 py-12">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0a1a]">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <BackgroundScene />
        </Canvas>
      </div>

      <div className="auth-card glass-card relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/10 backdrop-blur-2xl bg-white/5">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-500 mb-4 shadow-lg shadow-emerald-500/25">
            <GraduationCap size={28} className="text-white" />
          </Link>
          <h1 className="font-outfit text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join the future of rural education</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Full Name"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Email address"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Password"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
            >
              <option value="grade-5" className="bg-gray-900">Grade 5</option>
              <option value="grade-6" className="bg-gray-900">Grade 6</option>
              <option value="grade-7" className="bg-gray-900">Grade 7</option>
              <option value="grade-8" className="bg-gray-900">Grade 8</option>
              <option value="grade-9" className="bg-gray-900">Grade 9</option>
              <option value="grade-10" className="bg-gray-900">Grade 10</option>
              <option value="grade-11" className="bg-gray-900">Grade 11</option>
              <option value="grade-12" className="bg-gray-900">Grade 12</option>
            </select>

            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
            >
              <option value="english" className="bg-gray-900">English</option>
              <option value="hindi" className="bg-gray-900">Hindi</option>
              <option value="marathi" className="bg-gray-900">Marathi</option>
              <option value="telugu" className="bg-gray-900">Telugu</option>
              <option value="tamil" className="bg-gray-900">Tamil</option>
              <option value="bengali" className="bg-gray-900">Bengali</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              name="village"
              required
              value={formData.village}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Village/Town Name"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 border-none shadow-lg shadow-emerald-500/20">
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
