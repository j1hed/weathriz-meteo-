import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Cloud, Stars, useTexture } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface WeatherScene3DProps {
  weatherCondition: string;
  temperature: number;
}

// Particle system for rain/snow
const ParticleSystem = ({ count = 100, condition }: { count?: number; condition: string }) => {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      if (condition.includes('rain')) {
        colors.set([0.3, 0.6, 1.0], i * 3);
      } else if (condition.includes('snow')) {
        colors.set([1.0, 1.0, 1.0], i * 3);
      } else {
        colors.set([1.0, 0.8, 0.2], i * 3);
      }
    }
    return { positions, colors };
  }, [count, condition]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// Earth sphere with subtle rotation and glow
const WeatherSphere = ({ condition, temperature }: { condition: string; temperature: number }) => {
  const texture = useTexture('/earth_texture.jpg');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.95}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>
      {/* Subtle atmospheric glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.53, 64, 64]} />
        <meshBasicMaterial color="#4FC3F7" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
    </Float>
  );
};

// Clouds for weather
const WeatherClouds = ({ condition }: { condition: string }) => {
  if (!condition.includes('cloud') && !condition.includes('rain')) return null;
  return (
    <>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Cloud position={[-4, 2, -2]} speed={0.2} opacity={0.4} color="#ffffff" segments={20} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Cloud position={[4, 3, -1]} speed={0.3} opacity={0.3} color="#f0f0f0" segments={15} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <Cloud position={[0, 4, -3]} speed={0.15} opacity={0.5} color="#ffffff" segments={25} />
      </Float>
    </>
  );
};

// Large faint sphere for galactic glow
const GalacticGlow = () => (
  <mesh>
    <sphereGeometry args={[60, 64, 64]} />
    <meshBasicMaterial
      color="#7e57c2"
      transparent
      opacity={0.08}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
      side={THREE.BackSide}
    />
  </mesh>
);

// Nebula planes scattered for galactic effect
const Nebula = () => {
  const texture = useTexture('/nebula.png');
  // Ensure scale and rotation arrays have 3 elements
  const configs = [
    { position: [0, 10, -30], scale: [40, 20, 1], rotation: [0, 0, 0], opacity: 0.35 },
    { position: [-25, -5, -50], scale: [60, 30, 1], rotation: [0, 0.2, 0.1], opacity: 0.25 },
    { position: [30, 15, -60], scale: [50, 25, 1], rotation: [0, -0.3, 0.2], opacity: 0.28 },
    { position: [0, -20, -40], scale: [70, 35, 1], rotation: [0.1, 0, 0.3], opacity: 0.22 },
    { position: [15, 25, -80], scale: [80, 40, 1], rotation: [0, 0.5, 0], opacity: 0.18 },
    { position: [-40, 30, -100], scale: [100, 50, 1], rotation: [0.2, 0.1, 0.4], opacity: 0.12 },
    { position: [50, -30, -120], scale: [120, 60, 1], rotation: [0.3, -0.2, 0.2], opacity: 0.10 },
  ];
  return (
    <>
      {configs.map((cfg, idx) => (
        <mesh
          key={idx}
          position={cfg.position as [number, number, number]}
          rotation={cfg.rotation as [number, number, number]}
          scale={cfg.scale as [number, number, number]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={cfg.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
};

const WeatherScene3D = ({ weatherCondition, temperature }: WeatherScene3DProps) => {
  const backgroundColor = "#0a0a1a";

  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        className="w-full h-full"
        style={{ background: backgroundColor }}
      >
        <Suspense fallback={null}>
          {/* Galactic glow */}
          <GalacticGlow />
          {/* Multiple starfields for galaxy depth */}
          <Stars radius={100} depth={80} count={2000} factor={4} saturation={0} fade speed={1} />
          <Stars radius={60} depth={40} count={800} factor={2} saturation={0.5} fade speed={0.5} />
          <Stars radius={150} depth={120} count={500} factor={6} saturation={1} fade speed={0.2} />
          {/* Nebula effect all over the universe */}
          <Nebula />
          {/* Cosmic colored lights */}
          <ambientLight intensity={0.8} color="#b39ddb" />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#90caf9" />
          <directionalLight position={[-10, -10, -10]} intensity={0.7} color="#f48fb1" />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color="#4FC3F7" />

          <WeatherSphere condition={weatherCondition} temperature={temperature} />
          <WeatherClouds condition={weatherCondition} />
          <ParticleSystem count={150} condition={weatherCondition} />

          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
            dampingFactor={0.1}
          />
        </Suspense>
      </Canvas>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/40 to-transparent" />
      </div>
    </div>
  );
};

export default WeatherScene3D;