import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere } from '@react-three/drei';
import { FlaskConical, X, RotateCcw, Search, Sparkles, Beaker, ArrowRight, Layers } from 'lucide-react';
import { molecules, searchMolecules, ELEMENT_COLORS, ELEMENT_RADII } from '../data/molecules';
import * as THREE from 'three';

// ======================== CUSTOM PHYSICS & BIOLOGY 3D MODELS ========================

const SolarSystemModel = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * 0.1;
      if (ref.current.children[1]) ref.current.children[1].rotation.y = t * 1.5;
      if (ref.current.children[2]) ref.current.children[2].rotation.y = t * 1.0;
      if (ref.current.children[3]) ref.current.children[3].rotation.y = t * 0.8;
      if (ref.current.children[4]) ref.current.children[4].rotation.y = t * 0.6;
    }
  });
  return (
    <group ref={ref}>
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.6} />
      </Sphere>
      <group>
        <Sphere args={[0.2, 16, 16]} position={[2.0, 0, 0]}>
          <meshStandardMaterial color="#9ca3af" />
        </Sphere>
      </group>
      <group>
        <Sphere args={[0.3, 16, 16]} position={[3.2, 0, 0]}>
          <meshStandardMaterial color="#fb923c" />
        </Sphere>
      </group>
      <group>
        <Sphere args={[0.35, 16, 16]} position={[4.4, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>
      </group>
      <group>
        <Sphere args={[0.25, 16, 16]} position={[5.6, 0, 0]}>
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
      </group>
    </group>
  );
};

const PendulumModel = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.4;
    }
  });
  return (
    <group position={[0, 2, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.15, 0.4]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <group ref={ref} position={[0, -0.1, 0]}>
        <mesh position={[0, -1.8, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 3.6, 16]} />
          <meshStandardMaterial color="#cccccc" metalness={0.8} />
        </mesh>
        <Sphere args={[0.55, 32, 32]} position={[0, -3.6, 0]}>
          <meshStandardMaterial color="#6366f1" metalness={0.9} roughness={0.1} />
        </Sphere>
      </group>
    </group>
  );
};

const PrismModel = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0, 1.8, 2.8, 3]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.45} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-3.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 3.5, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[2.5, 0.6, 0]} rotation={[0, 0, -Math.PI / 2.2]}>
        <cylinderGeometry args={[0.04, 0.04, 4, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
      <mesh position={[2.5, 0, 0]} rotation={[0, 0, -Math.PI / 2.3]}>
        <cylinderGeometry args={[0.04, 0.04, 4, 8]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </mesh>
      <mesh position={[2.5, -0.6, 0]} rotation={[0, 0, -Math.PI / 2.4]}>
        <cylinderGeometry args={[0.04, 0.04, 4, 8]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

const DNAModel = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.015;
  });
  const pairs = 10;
  const height = 5;
  const radius = 1.1;
  return (
    <group ref={ref} position={[0, -height / 2, 0]}>
      {Array.from({ length: pairs }).map((_, i) => {
        const y = (i / (pairs - 1)) * height;
        const angle = i * 0.55;
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;
        return (
          <group key={i}>
            <Sphere args={[0.26, 16, 16]} position={[x1, y, z1]}>
              <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} />
            </Sphere>
            <Sphere args={[0.26, 16, 16]} position={[x2, y, z2]}>
              <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.2} />
            </Sphere>
            <mesh position={[0, y, 0]} rotation={[0, -angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.06, 0.06, radius * 2, 8]} />
              <meshStandardMaterial color="#cbd5e1" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const CellModel = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  return (
    <group ref={ref}>
      <Sphere args={[2.5, 32, 32]}>
        <meshStandardMaterial color="#10b981" transparent opacity={0.3} />
      </Sphere>
      <Sphere args={[0.7, 32, 32]} position={[0.4, 0.4, 0]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[0.4, 0.4, 0.4]}>
        <meshStandardMaterial color="#ec4899" />
      </Sphere>
      <mesh position={[-0.8, -0.8, 0.8]} rotation={[0.5, 0.5, 0]}>
        <capsuleGeometry args={[0.25, 0.5, 16, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

// ======================== MOLECULAR BOND & MODEL ========================

const Bond = ({ from, to, order = 1 }) => {
  const midpoint = useMemo(() => [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ], [from, to]);

  const direction = useMemo(() => {
    return new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  }, [from, to]);

  const length = useMemo(() => direction.length(), [direction]);

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    if (length > 0.001) {
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    }
    return q;
  }, [direction, length]);

  if (length < 0.001) return null;

  if (order === 1) {
    return (
      <mesh position={midpoint} quaternion={quaternion}>
        <cylinderGeometry args={[0.07, 0.07, length, 12]} />
        <meshStandardMaterial color="#8892a0" metalness={0.3} roughness={0.6} />
      </mesh>
    );
  }

  const perpendicular = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    const dir = direction.clone().normalize();
    let perp = new THREE.Vector3().crossVectors(dir, up);
    if (perp.length() < 0.01) perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(1, 0, 0));
    perp.normalize();
    return perp;
  }, [direction]);

  const offsets = order === 2 ? [-0.09, 0.09] : [-0.14, 0, 0.14];

  return (
    <group>
      {offsets.map((off, i) => (
        <mesh
          key={i}
          position={[
            midpoint[0] + perpendicular.x * off,
            midpoint[1] + perpendicular.y * off,
            midpoint[2] + perpendicular.z * off,
          ]}
          quaternion={quaternion}
        >
          <cylinderGeometry args={[0.05, 0.05, length, 12]} />
          <meshStandardMaterial color="#8892a0" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const MoleculeModel = ({ molecule, scale = 1, autoRotateSpeed = 0.005 }) => {
  const groupRef = useRef();

  // Handle Custom Non-Chemical Models
  if (molecule.type === 'solar-system') return <SolarSystemModel />;
  if (molecule.type === 'pendulum') return <PendulumModel />;
  if (molecule.type === 'prism') return <PrismModel />;
  if (molecule.type === 'dna') return <DNAModel />;
  if (molecule.type === 'cell') return <CellModel />;

  // Compute bounding box center to guarantee PERFECT 3D centering
  const centeredAtoms = useMemo(() => {
    if (!molecule || !molecule.atoms || molecule.atoms.length === 0) return [];
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    molecule.atoms.forEach(a => {
      const [x, y, z] = a.position;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    });

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const cz = (minZ + maxZ) / 2;

    return molecule.atoms.map(a => ({
      ...a,
      position: [a.position[0] - cx, a.position[1] - cy, a.position[2] - cz],
    }));
  }, [molecule]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += autoRotateSpeed;
  });

  if (!molecule || centeredAtoms.length === 0) return null;

  return (
    <group ref={groupRef} scale={scale}>
      {centeredAtoms.map((atom, i) => {
        const color = ELEMENT_COLORS[atom.element] || '#888888';
        const radius = (ELEMENT_RADII[atom.element] || 0.4) * 1.1;
        return (
          <Sphere key={`atom-${i}`} args={[radius, 32, 32]} position={atom.position}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.2}
              metalness={0.3}
              roughness={0.3}
            />
          </Sphere>
        );
      })}
      {molecule.bonds && molecule.bonds.map((bond, i) => {
        if (!centeredAtoms[bond.from] || !centeredAtoms[bond.to]) return null;
        return (
          <Bond
            key={`bond-${i}`}
            from={centeredAtoms[bond.from].position}
            to={centeredAtoms[bond.to].position}
            order={bond.order}
          />
        );
      })}
    </group>
  );
};

// ======================== MAIN COMPONENT ========================

export default function ARLab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMolecule, setSelectedMolecule] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const controlsRef = useRef();

  const searchResults = useMemo(() => searchMolecules(searchQuery), [searchQuery]);

  const categories = ['All', 'Physics', 'Biology', 'Organic', 'Inorganic', 'Pharmaceutical', 'Biochemistry'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMolecules = useMemo(() => {
    if (activeCategory === 'All') return molecules;
    return molecules.filter(m => m.category === activeCategory);
  }, [activeCategory]);

  const openViewer = (mol) => {
    setSelectedMolecule(mol);
    setShowViewer(true);
    setSearchQuery('');
  };

  const closeViewer = () => {
    setShowViewer(false);
    setSelectedMolecule(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      openViewer(searchResults[0]);
    }
  };

  // ======================== FULLSCREEN 3D VIEWER ========================
  if (showViewer && selectedMolecule) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 100, background: 'radial-gradient(ellipse at center, #0a0a20 0%, #030308 100%)',
      }}>
        <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#6366f1" />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#a855f7" />
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
            <MoleculeModel molecule={selectedMolecule} />
          </Float>
          <OrbitControls ref={controlsRef} enablePan enableZoom enableRotate autoRotate autoRotateSpeed={0.6} />
        </Canvas>

        {/* Close Button */}
        <button
          onClick={closeViewer}
          style={{
            position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)', color: 'white',
            padding: '0.75rem 1.5rem', borderRadius: '0.75rem', cursor: 'pointer',
            fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >
          <X size={18} /> Close
        </button>

        {/* Info Panel */}
        <div style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem', width: '320px',
          padding: '1.5rem', borderRadius: '1.2rem',
          background: 'rgba(5, 5, 20, 0.8)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(99, 102, 241, 0.25)', color: 'white', zIndex: 10,
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        }}>
          <div style={{
            display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '1rem',
            fontSize: '0.8rem', fontWeight: '600',
            background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', marginBottom: '0.75rem',
          }}>
            {selectedMolecule.category}
          </div>
          <h2 style={{
            fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '0.25rem',
            fontFamily: "'Outfit', sans-serif",
            background: 'linear-gradient(135deg, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {selectedMolecule.name}
          </h2>
          <p style={{
            color: '#818cf8', fontSize: '1rem', fontWeight: '600',
            marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace",
          }}>
            {selectedMolecule.formula}
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            {selectedMolecule.description}
          </p>

          {selectedMolecule.facts && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Facts</p>
              {selectedMolecule.facts.map((fact, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1',
                }}>
                  <span style={{ color: '#818cf8', fontSize: '0.5rem' }}>●</span> {fact}
                </div>
              ))}
            </div>
          )}

          {/* Atom Color Legend if chemical */}
          {selectedMolecule.atoms && selectedMolecule.atoms.length > 0 && selectedMolecule.bonds.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Atom Colors</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[...new Set(selectedMolecule.atoms.map(a => a.element))].map(el => (
                  <div key={el} style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.6rem',
                    borderRadius: '1rem', fontSize: '0.8rem',
                  }}>
                    <span style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: ELEMENT_COLORS[el] || '#888',
                      display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)',
                    }} />
                    <span style={{ color: '#e2e8f0' }}>{el}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <button
          onClick={() => controlsRef.current?.reset()}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10,
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)', color: 'white',
            padding: '0.75rem 1.5rem', borderRadius: '2rem', cursor: 'pointer',
            fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >
          <RotateCcw size={16} /> Reset View
        </button>
      </div>
    );
  }

  // ======================== MAIN PAGE WITH LIVE 3D CARDS ========================
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#030308', color: 'white' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.25)',
          }}>
            <FlaskConical size={26} />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.2rem', fontWeight: 'bold', margin: 0,
              fontFamily: "'Outfit', sans-serif",
              background: 'linear-gradient(135deg, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              AR Science Laboratory
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
              Interactive 3D AR experiments in Physics, Chemistry, Astronomy, and Biology
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: searchFocused ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.04)',
          border: searchFocused ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1rem', padding: '0.75rem 1.25rem',
          transition: 'all 0.3s ease',
          boxShadow: searchFocused ? '0 0 30px rgba(99, 102, 241, 0.2)' : 'none',
        }}>
          <Search size={20} style={{ color: searchFocused ? '#818cf8' : '#64748b', flexShrink: 0 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search any experiment... Phenol, Benzene, Solar System, DNA, Pendulum, Caffeine..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'white', fontSize: '1rem', fontFamily: "'Inter', sans-serif",
            }}
          />
          {searchQuery && (
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: 'none', borderRadius: '0.6rem', color: 'white',
                padding: '0.5rem 1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.875rem', fontWeight: '600', whiteSpace: 'nowrap',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
              }}
            >
              <Sparkles size={16} /> View 3D
            </button>
          )}
        </div>

        {/* Search Dropdown */}
        {searchFocused && searchQuery.length > 0 && searchResults.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem',
            background: 'rgba(8, 8, 26, 0.97)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '1rem',
            overflow: 'hidden', zIndex: 50,
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}>
            {searchResults.slice(0, 6).map((mol) => (
              <button
                key={mol.id}
                onClick={() => openViewer(mol)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem', background: 'transparent', border: 'none',
                  color: 'white', cursor: 'pointer', textAlign: 'left',
                  borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#818cf8', flexShrink: 0,
                }}>
                  <Beaker size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{mol.name}</div>
                  <div style={{ color: '#818cf8', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>
                    {mol.formula}
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem',
                  borderRadius: '0.5rem', fontSize: '0.75rem', color: '#94a3b8',
                }}>
                  {mol.category}
                </div>
                <ArrowRight size={16} style={{ color: '#64748b' }} />
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Category Tabs */}
      <div style={{
        display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem',
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.5rem 1.25rem', borderRadius: '2rem', border: 'none',
              background: activeCategory === cat ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))' : 'transparent',
              border: activeCategory === cat ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
              color: activeCategory === cat ? '#fff' : '#94a3b8',
              fontWeight: activeCategory === cat ? '600' : '500',
              cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.9rem',
              boxShadow: activeCategory === cat ? '0 4px 15px rgba(99, 102, 241, 0.2)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Molecule Grid with LIVE 3D Spinning Models inside every card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {filteredMolecules.map((mol) => (
          <div
            key={mol.id}
            onClick={() => openViewer(mol)}
            className="glass-card"
            style={{
              borderRadius: '1.2rem', overflow: 'hidden', cursor: 'pointer',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            {/* Live 3D Canvas Preview on Card */}
            <div style={{
              height: '160px',
              background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.9), rgba(99, 102, 241, 0.12))',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} style={{ pointerEvents: 'none' }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                  <MoleculeModel molecule={mol} scale={0.75} autoRotateSpeed={0.01} />
                </Float>
              </Canvas>
              <div style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                padding: '0.2rem 0.6rem', borderRadius: '0.5rem',
                fontSize: '0.7rem', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)',
                pointerEvents: 'none', fontWeight: '600',
              }}>
                3D Live
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{
                display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '1rem',
                fontSize: '0.7rem', fontWeight: '600',
                background: 'rgba(99, 102, 241, 0.12)', color: '#818cf8', marginBottom: '0.6rem',
              }}>
                {mol.category}
              </div>
              <h3 style={{
                fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.25rem', color: 'white',
              }}>
                {mol.name}
              </h3>
              <p style={{
                color: '#818cf8', fontSize: '0.85rem', marginBottom: '0.5rem',
                fontFamily: "'JetBrains Mono', monospace", fontWeight: '500',
              }}>
                {mol.formula}
              </p>
              <p style={{
                color: '#64748b', fontSize: '0.82rem', lineHeight: '1.5',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {mol.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
