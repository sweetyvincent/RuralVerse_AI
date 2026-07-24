import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, OrbitControls, Stars, MeshDistortMaterial } from '@react-three/drei';

const OrbitingObjects = () => {
  const torusRef = useRef();
  const boxRef = useRef();
  const sphereRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.position.x = Math.sin(time * 0.5) * 3;
      torusRef.current.position.z = Math.cos(time * 0.5) * 3;
      torusRef.current.rotation.x = time;
    }
    if (boxRef.current) {
      boxRef.current.position.x = Math.sin(time * 0.8 + Math.PI) * 2.5;
      boxRef.current.position.y = Math.cos(time * 0.8 + Math.PI) * 2.5;
      boxRef.current.rotation.y = time;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 1.2 + Math.PI/2) * 3.5;
      sphereRef.current.position.z = Math.cos(time * 1.2 + Math.PI/2) * 3.5;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Torus ref={torusRef} args={[0.4, 0.1, 16, 32]} scale={1.5}>
          <meshStandardMaterial color="#7209b7" wireframe />
        </Torus>
      </Float>
      
      <Float speed={3} rotationIntensity={3} floatIntensity={2}>
        <Box ref={boxRef} args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial color="#f72585" />
        </Box>
      </Float>

      <Float speed={4} rotationIntensity={1} floatIntensity={3}>
        <Sphere ref={sphereRef} args={[0.3, 32, 32]}>
          <meshStandardMaterial color="#10b981" />
        </Sphere>
      </Float>
    </>
  );
};

const SceneContent = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#4361ee" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7209b7" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#4361ee"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Float>

      <OrbitingObjects />

      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <SceneContent />
    </Canvas>
  );
}
