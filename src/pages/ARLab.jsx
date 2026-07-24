import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere } from '@react-three/drei';
import { FlaskConical, X, RotateCcw, ZoomIn, ZoomOut, Play } from 'lucide-react';
import { experiments } from '../data/courses';

const defaultExperiments = [
  { id: 1, title: 'Water Molecule', description: 'Explore H2O structure', category: 'Chemistry', difficulty: 'Beginner', duration: '10 mins', color: '#4361ee' },
  { id: 2, title: 'Simple Pendulum', description: 'Learn about gravity and periods', category: 'Physics', difficulty: 'Beginner', duration: '15 mins', color: '#7209b7' },
  { id: 3, title: 'Animal Cell', description: 'Dive into cellular biology', category: 'Biology', difficulty: 'Intermediate', duration: '20 mins', color: '#10b981' },
  { id: 4, title: 'Methane Molecule', description: 'Explore CH4 tetrahedral structure', category: 'Chemistry', difficulty: 'Beginner', duration: '10 mins', color: '#f72585' }
];

const expList = typeof experiments !== 'undefined' ? experiments : defaultExperiments;

// Chemistry Models
const WaterMolecule = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });
  return (
    <group ref={ref}>
      {/* Oxygen */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ff0000" emissive="#550000" />
      </Sphere>
      {/* Hydrogens */}
      <Sphere args={[0.5, 32, 32]} position={[1.2, -0.8, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#444444" />
      </Sphere>
      <Sphere args={[0.5, 32, 32]} position={[-1.2, -0.8, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#444444" />
      </Sphere>
      {/* Bonds */}
      <mesh position={[0.6, -0.4, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[-0.6, -0.4, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    </group>
  );
};

const MethaneMolecule = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });
  return (
    <group ref={ref}>
      {/* Carbon */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#333333" emissive="#111111" />
      </Sphere>
      {/* Hydrogens */}
      <Sphere args={[0.5, 32, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#444444" />
      </Sphere>
      <Sphere args={[0.5, 32, 32]} position={[1.4, -0.5, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#444444" />
      </Sphere>
      <Sphere args={[0.5, 32, 32]} position={[-0.7, -0.5, 1.2]}>
        <meshStandardMaterial color="#ffffff" emissive="#444444" />
      </Sphere>
      <Sphere args={[0.5, 32, 32]} position={[-0.7, -0.5, -1.2]}>
        <meshStandardMaterial color="#ffffff" emissive="#444444" />
      </Sphere>
      {/* Bonds */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[0.7, -0.25, 0]} rotation={[0, 0, -1.2]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[-0.35, -0.25, 0.6]} rotation={[1.2, 0, 0.6]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[-0.35, -0.25, -0.6]} rotation={[-1.2, 0, 0.6]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    </group>
  );
};

// Physics Model
const Pendulum = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.5;
    }
  });
  
  return (
    <group position={[0, 2, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.2, 0.5]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <group ref={ref} position={[0, -0.1, 0]}>
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
        <Sphere args={[0.6, 32, 32]} position={[0, -4, 0]}>
          <meshStandardMaterial color="#4361ee" metalness={0.8} roughness={0.2} />
        </Sphere>
      </group>
    </group>
  );
};

// Biology Model
const AnimalCell = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  
  return (
    <group ref={ref}>
      {/* Cell Membrane */}
      <Sphere args={[3, 32, 32]}>
        <meshStandardMaterial color="#10b981" transparent opacity={0.3} />
      </Sphere>
      {/* Nucleus */}
      <Sphere args={[0.8, 32, 32]} position={[0.5, 0.5, 0]}>
        <meshStandardMaterial color="#7209b7" />
      </Sphere>
      {/* Nucleolus */}
      <Sphere args={[0.3, 16, 16]} position={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color="#f72585" />
      </Sphere>
      {/* Mitochondria */}
      <mesh position={[-1, -1, 1]} rotation={[0.5, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 16, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[1, -1.5, -0.5]} rotation={[-0.5, 0.2, 0.8]}>
        <capsuleGeometry args={[0.3, 0.6, 16, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Golgi Apparatus (abstract representation) */}
      <mesh position={[-1.5, 1, 0]} rotation={[0, 0, 0.5]}>
        <torusGeometry args={[0.5, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[-1.6, 0.8, 0]} rotation={[0, 0, 0.5]}>
        <torusGeometry args={[0.6, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
};

export default function ARLab() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeExperiment, setActiveExperiment] = useState(null);
  const controlsRef = useRef();
  
  const tabs = ['All', 'Chemistry', 'Physics', 'Biology'];
  
  const filteredExperiments = activeTab === 'All' 
    ? expList 
    : expList.filter(exp => exp.category === activeTab);

  const renderModel = () => {
    if (!activeExperiment) return null;
    
    if (activeExperiment.title.includes('Water')) return <WaterMolecule />;
    if (activeExperiment.title.includes('Methane')) return <MethaneMolecule />;
    if (activeExperiment.category === 'Physics') return <Pendulum />;
    if (activeExperiment.category === 'Biology') return <AnimalCell />;
    
    return <WaterMolecule />; // Fallback
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (activeExperiment) {
    return (
      <div className="viewer-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100, background: '#0a0a1a' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            {renderModel()}
          </Float>
          <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
        
        {/* Top Controls */}
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
          <button 
            className="btn btn-outline"
            onClick={() => setActiveExperiment(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
          >
            <X size={20} /> Close Viewer
          </button>
        </div>

        {/* Info Panel */}
        <div className="viewer-3d-info glass-card" style={{ position: 'absolute', top: '2rem', right: '2rem', width: '300px', padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 26, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', zIndex: 10 }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: '500', background: 'rgba(67, 97, 238, 0.2)', color: '#4361ee', marginBottom: '1rem' }}>
            {activeExperiment.category}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: "'Outfit', sans-serif" }}>{activeExperiment.title}</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>{activeExperiment.description}</p>
          
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#64748b' }}>Difficulty</span>
              <span style={{ fontWeight: '500' }}>{activeExperiment.difficulty}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#64748b' }}>Duration</span>
              <span style={{ fontWeight: '500' }}>{activeExperiment.duration}</span>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="viewer-3d-controls" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '0.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
          <button className="icon-btn" onClick={handleReset} style={{ background: 'transparent', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', hover: { background: 'rgba(255,255,255,0.1)' } }} title="Reset View">
            <RotateCcw size={20} />
          </button>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 0.5rem' }}></div>
          <button className="icon-btn" style={{ background: 'transparent', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Zoom In">
            <ZoomIn size={20} />
          </button>
          <button className="icon-btn" style={{ background: 'transparent', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Zoom Out">
            <ZoomOut size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: '2rem', minHeight: '100vh', background: '#0a0a1a', color: 'white' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(114, 9, 183, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7209b7' }}>
            <FlaskConical size={24} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, fontFamily: "'Outfit', sans-serif" }}>AR Science Laboratory</h1>
        </div>
        
        {/* Tabs */}
        <div className="tabs" style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '2rem',
                border: 'none',
                background: activeTab === tab ? 'rgba(67, 97, 238, 0.2)' : 'transparent',
                color: activeTab === tab ? '#4361ee' : '#94a3b8',
                fontWeight: activeTab === tab ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredExperiments.map((exp) => (
          <div 
            key={exp.id} 
            className="experiment-card glass-card"
            onClick={() => setActiveExperiment(exp)}
            style={{ 
              borderRadius: '1rem', 
              overflow: 'hidden', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <div 
              className="experiment-card-preview"
              style={{ 
                height: '160px', 
                background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, ${exp.color || '#4361ee'}33 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Play size={24} fill="currentColor" />
              </div>
            </div>
            
            <div className="experiment-card-body" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '500', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', marginBottom: '0.75rem' }}>
                {exp.category}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white' }}>{exp.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>{exp.description}</p>
              
              <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                  ⏱️ {exp.duration}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                  📊 {exp.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
