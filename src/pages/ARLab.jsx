import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Text } from '@react-three/drei';
import { FlaskConical, X, RotateCcw, Search, Sparkles, AtomIcon, Beaker, ArrowRight } from 'lucide-react';
import { molecules, searchMolecules, ELEMENT_COLORS, ELEMENT_RADII } from '../data/molecules';
import * as THREE from 'three';

// ======================== 3D MOLECULE RENDERER ========================

const Bond = ({ from, to, order = 1 }) => {
  const midpoint = useMemo(() => [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ], [from, to]);

  const direction = useMemo(() => {
    const d = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
    return d;
  }, [from, to]);

  const length = useMemo(() => direction.length(), [direction]);

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    return q;
  }, [direction]);

  if (order === 1) {
    return (
      <mesh position={midpoint} quaternion={quaternion}>
        <cylinderGeometry args={[0.08, 0.08, length, 12]} />
        <meshStandardMaterial color="#8892a0" metalness={0.3} roughness={0.6} />
      </mesh>
    );
  }

  // Double or triple bonds: offset cylinders
  const perpendicular = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    const dir = direction.clone().normalize();
    let perp = new THREE.Vector3().crossVectors(dir, up);
    if (perp.length() < 0.01) perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(1, 0, 0));
    perp.normalize();
    return perp;
  }, [direction]);

  const offsets = order === 2 ? [-0.1, 0.1] : [-0.15, 0, 0.15];

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
          <cylinderGeometry args={[0.06, 0.06, length, 12]} />
          <meshStandardMaterial color="#8892a0" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const MoleculeModel = ({ molecule }) => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.005;
  });

  if (!molecule) return null;

  return (
    <group ref={groupRef}>
      {molecule.atoms.map((atom, i) => {
        const color = ELEMENT_COLORS[atom.element] || '#888888';
        const radius = (ELEMENT_RADII[atom.element] || 0.4) * 1.2;
        return (
          <Sphere key={`atom-${i}`} args={[radius, 32, 32]} position={atom.position}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.15}
              metalness={0.2}
              roughness={0.4}
            />
          </Sphere>
        );
      })}
      {molecule.bonds.map((bond, i) => (
        <Bond
          key={`bond-${i}`}
          from={molecule.atoms[bond.from].position}
          to={molecule.atoms[bond.to].position}
          order={bond.order}
        />
      ))}
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
  const searchInputRef = useRef();

  const searchResults = useMemo(() => searchMolecules(searchQuery), [searchQuery]);

  const categories = ['All', 'Organic', 'Inorganic', 'Pharmaceutical', 'Biochemistry'];
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

  // ======================== 3D VIEWER MODE ========================
  if (showViewer && selectedMolecule) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 100, background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)',
      }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-10, -5, -5]} intensity={0.4} color="#4361ee" />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#7c3aed" />
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <MoleculeModel molecule={selectedMolecule} />
          </Float>
          <OrbitControls ref={controlsRef} enablePan enableZoom enableRotate autoRotate autoRotateSpeed={0.5} />
        </Canvas>

        {/* Close Button */}
        <button
          onClick={closeViewer}
          style={{
            position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)', color: 'white',
            padding: '0.75rem 1.5rem', borderRadius: '0.75rem', cursor: 'pointer',
            fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <X size={18} /> Close
        </button>

        {/* Info Panel */}
        <div style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem', width: '320px',
          padding: '1.5rem', borderRadius: '1rem',
          background: 'rgba(10, 10, 30, 0.75)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)', color: 'white', zIndex: 10,
        }}>
          <div style={{
            display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '1rem',
            fontSize: '0.8rem', fontWeight: '500',
            background: 'rgba(67, 97, 238, 0.2)', color: '#818cf8', marginBottom: '0.75rem',
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

          {/* Atom Legend */}
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
        </div>

        {/* Reset Button */}
        <button
          onClick={() => controlsRef.current?.reset()}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10,
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)', color: 'white',
            padding: '0.75rem 1.5rem', borderRadius: '2rem', cursor: 'pointer',
            fontSize: '0.875rem', transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <RotateCcw size={16} /> Reset View
        </button>
      </div>
    );
  }

  // ======================== MAIN PAGE ========================
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#0a0a1a', color: 'white' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.3), rgba(67, 97, 238, 0.3))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa',
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
              Search any molecule to view its 3D structure in augmented reality
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: searchFocused ? 'rgba(67, 97, 238, 0.08)' : 'rgba(255,255,255,0.04)',
          border: searchFocused ? '1px solid rgba(67, 97, 238, 0.4)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1rem', padding: '0.75rem 1.25rem',
          transition: 'all 0.3s ease',
          boxShadow: searchFocused ? '0 0 30px rgba(67, 97, 238, 0.1)' : 'none',
        }}>
          <Search size={20} style={{ color: searchFocused ? '#818cf8' : '#64748b', flexShrink: 0 }} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search any molecule... e.g. Phenol, Benzene, H2O, Aspirin, Caffeine..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'white', fontSize: '1rem', fontFamily: "'Inter', sans-serif",
            }}
          />
          {searchQuery && (
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #4361ee, #7c3aed)',
                border: 'none', borderRadius: '0.6rem', color: 'white',
                padding: '0.5rem 1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.875rem', fontWeight: '600', whiteSpace: 'nowrap',
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
            background: 'rgba(15, 23, 42, 0.97)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem',
            overflow: 'hidden', zIndex: 50,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
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
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(67, 97, 238, 0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.2), rgba(114, 9, 183, 0.2))',
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
                  background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem',
                  borderRadius: '0.5rem', fontSize: '0.75rem', color: '#94a3b8',
                }}>
                  {mol.category}
                </div>
                <ArrowRight size={16} style={{ color: '#64748b' }} />
              </button>
            ))}
            {searchResults.length > 6 && (
              <div style={{ padding: '0.75rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                + {searchResults.length - 6} more results
              </div>
            )}
          </div>
        )}

        {/* No results */}
        {searchFocused && searchQuery.length > 0 && searchResults.length === 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem',
            background: 'rgba(15, 23, 42, 0.97)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem',
            padding: '2rem', textAlign: 'center', zIndex: 50,
          }}>
            <Beaker size={32} style={{ color: '#334155', marginBottom: '0.75rem' }} />
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
              No molecule found for "<strong>{searchQuery}</strong>"
            </p>
            <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Try: water, benzene, phenol, aspirin, caffeine, glucose...
            </p>
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
              background: activeCategory === cat ? 'rgba(67, 97, 238, 0.2)' : 'transparent',
              color: activeCategory === cat ? '#818cf8' : '#94a3b8',
              fontWeight: activeCategory === cat ? '600' : '500',
              cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.9rem',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Molecule Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {filteredMolecules.map((mol) => (
          <div
            key={mol.id}
            onClick={() => openViewer(mol)}
            style={{
              borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(67, 97, 238, 0.3)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(67, 97, 238, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Card Preview */}
            <div style={{
              height: '120px',
              background: `linear-gradient(135deg, rgba(15,23,42,0.8), rgba(67, 97, 238, 0.15))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                fontSize: '2.5rem', fontWeight: '700', fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.02em',
              }}>
                {mol.formula}
              </div>
              <div style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.6rem',
                borderRadius: '0.5rem', fontSize: '0.7rem', color: '#94a3b8',
              }}>
                {mol.atoms.length} atoms
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{
                display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '1rem',
                fontSize: '0.7rem', fontWeight: '500',
                background: 'rgba(67, 97, 238, 0.1)', color: '#818cf8', marginBottom: '0.6rem',
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

              {/* Atom badges */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {[...new Set(mol.atoms.map(a => a.element))].map(el => (
                  <span key={el} style={{
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    background: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.5rem',
                    borderRadius: '1rem', fontSize: '0.72rem', color: '#94a3b8',
                  }}>
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: ELEMENT_COLORS[el] || '#888',
                      display: 'inline-block',
                    }} />
                    {el}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
