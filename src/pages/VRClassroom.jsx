import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import { Maximize, Minimize, RotateCcw, Info, ChevronDown, MonitorPlay } from 'lucide-react';
import { vrEnvironments } from '../data/courses';

const defaultEnvironments = [
  { id: 1, name: 'Standard Classroom', icon: '🏫' },
  { id: 2, name: 'Open Air Amphitheater', icon: '🏛️' },
  { id: 3, name: 'Space Observatory', icon: '🔭' }
];

const envs = typeof vrEnvironments !== 'undefined' ? vrEnvironments : defaultEnvironments;

const ClassroomScene = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -10]}>
        <boxGeometry args={[20, 8, 0.5]} />
        <meshStandardMaterial color="#e8e0d0" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-10, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 8, 0.5]} />
        <meshStandardMaterial color="#e8e0d0" />
      </mesh>
      
      {/* Window cut-out representation on Left Wall */}
      <mesh position={[-9.7, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[10, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 8, 0.5]} />
        <meshStandardMaterial color="#e8e0d0" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Whiteboard */}
      <mesh position={[0, 4.5, -9.7]}>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
        <Html transform position={[0, 0, 0.12]} scale={0.5}>
          <div style={{
            width: '800px',
            background: 'transparent',
            color: '#1a1a2e',
            fontSize: '40px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '20px'
          }}>
            Welcome to RuralVerse AI Classroom
          </div>
        </Html>
      </mesh>

      {/* Teacher's Desk */}
      <group position={[0, 0, -6]}>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[4, 0.1, 2]} />
          <meshStandardMaterial color="#8B6914" />
        </mesh>
        <mesh position={[-1.8, 0.6, -0.8]}><cylinderGeometry args={[0.05, 0.05, 1.2]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[1.8, 0.6, -0.8]}><cylinderGeometry args={[0.05, 0.05, 1.2]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[-1.8, 0.6, 0.8]}><cylinderGeometry args={[0.05, 0.05, 1.2]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[1.8, 0.6, 0.8]}><cylinderGeometry args={[0.05, 0.05, 1.2]} /><meshStandardMaterial color="#333" /></mesh>
      </group>

      {/* Student Desks (2 columns x 3 rows) */}
      {[-3, 3].map((x, colIdx) => 
        [-2, 1, 4].map((z, rowIdx) => (
          <group key={`desk-${colIdx}-${rowIdx}`} position={[x, 0, z]}>
            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[2, 0.1, 1.5]} />
              <meshStandardMaterial color="#8B6914" />
            </mesh>
            <mesh position={[-0.9, 0.5, -0.6]}><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#333" /></mesh>
            <mesh position={[0.9, 0.5, -0.6]}><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#333" /></mesh>
            <mesh position={[-0.9, 0.5, 0.6]}><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#333" /></mesh>
            <mesh position={[0.9, 0.5, 0.6]}><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#333" /></mesh>
          </group>
        ))
      )}

      {/* Bookshelf */}
      <group position={[9.5, 2, 4]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 4, 3]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
        {/* Books */}
        <mesh position={[-0.2, 0.5, 0]}><boxGeometry args={[0.4, 0.8, 0.1]} /><meshStandardMaterial color="#e63946" /></mesh>
        <mesh position={[-0.2, 0.5, 0.15]}><boxGeometry args={[0.4, 0.8, 0.1]} /><meshStandardMaterial color="#457b9d" /></mesh>
        <mesh position={[-0.2, 0.5, -0.15]}><boxGeometry args={[0.4, 0.7, 0.1]} /><meshStandardMaterial color="#2a9d8f" /></mesh>
      </group>
    </group>
  );
};

export default function VRClassroom() {
  const [fullscreen, setFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [activeEnv, setActiveEnv] = useState(envs[0]);
  const [showEnvDropdown, setShowEnvDropdown] = useState(false);
  
  const controlsRef = useRef();

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  return (
    <div className="vr-container" style={{ width: '100%', height: 'calc(100vh - 80px)', position: 'relative', background: '#0a0a1a', overflow: 'hidden' }}>
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-10, 5, 5]} intensity={1} castShadow />
        <ClassroomScene />
        <OrbitControls 
          ref={controlsRef} 
          target={[0, 1, 0]} 
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={2}
          maxDistance={15}
        />
      </Canvas>

      {/* Top Left Overlay */}
      <div className="vr-overlay glass-card" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, padding: '1rem', borderRadius: '1rem', background: 'rgba(10, 10, 26, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
            <MonitorPlay size={20} color="#4361ee" />
            VR Smart Classroom
          </div>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowEnvDropdown(!showEnvDropdown)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              <span>{activeEnv.icon} {activeEnv.name}</span>
              <ChevronDown size={14} />
            </button>
            
            {showEnvDropdown && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', width: '200px', background: 'rgba(15, 15, 46, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                {envs.map(env => (
                  <button 
                    key={env.id}
                    onClick={() => { setActiveEnv(env); setShowEnvDropdown(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {env.icon} {env.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Info Panel */}
      {showInfo && (
        <div className="glass-card" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '300px', padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 26, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', zIndex: 10 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            Live Session
          </h3>
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' }}>
              "AI Teacher is explaining quantum mechanics..."
            </p>
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Key Points</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li>Wave-particle duality overview</li>
            <li>Schrödinger equation basics</li>
            <li>Quantum entanglement theory</li>
          </ul>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="vr-controls glass-card" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', padding: '0.75rem 1.5rem', borderRadius: '2rem', background: 'rgba(10, 10, 26, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: showInfo ? 'rgba(67, 97, 238, 0.2)' : 'transparent', border: 'none', color: showInfo ? '#4361ee' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}
          title="Toggle Info"
        >
          <Info size={20} />
        </button>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
        <button 
          onClick={handleReset}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
          title="Reset View"
        >
          <RotateCcw size={20} />
        </button>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
        <button 
          onClick={toggleFullscreen}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
          title="Toggle Fullscreen"
        >
          {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
}
