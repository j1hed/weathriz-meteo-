import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Cloud, Stars } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

interface WeatherScene3DProps {
  weatherCondition: string;
  temperature: number;
}

const ParticleSystem = ({ count = 100, condition }: { count?: number; condition: string }) => {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Color based on weather condition
      if (condition.includes('rain')) {
        colors[i * 3] = 0.3;     // R
        colors[i * 3 + 1] = 0.6; // G
        colors[i * 3 + 2] = 1.0; // B
      } else if (condition.includes('snow')) {
        colors[i * 3] = 1.0;     // R
        colors[i * 3 + 1] = 1.0; // G
        colors[i * 3 + 2] = 1.0; // B
      } else {
        colors[i * 3] = 1.0;     // R
        colors[i * 3 + 1] = 0.8; // G
        colors[i * 3 + 2] = 0.2; // B
      }
    }
    
    return { positions, colors };
  }, [count, condition]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const WeatherSphere = ({ condition, temperature }: { condition: string; temperature: number }) => {
  const color = useMemo(() => {
    if (condition.includes('rain')) return '#4FC3F7';
    if (condition.includes('snow')) return '#E3F2FD';
    if (condition.includes('cloud')) return '#90A4AE';
    if (temperature > 25) return '#FFB74D';
    return '#81C784';
  }, [condition, temperature]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
};

const WeatherClouds = ({ condition }: { condition: string }) => {
  if (!condition.includes('cloud') && !condition.includes('rain')) return null;

  return (
    <>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Cloud
          position={[-4, 2, -2]}
          speed={0.2}
          opacity={0.4}
          color="#ffffff"
          segments={20}
        />
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Cloud
          position={[4, 3, -1]}
          speed={0.3}
          opacity={0.3}
          color="#f0f0f0"
          segments={15}
        />
      </Float>
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <Cloud
          position={[0, 4, -3]}
          speed={0.15}
          opacity={0.5}
          color="#ffffff"
          segments={25}
        />
      </Float>
    </>
  );
};

const WeatherScene3D = ({ weatherCondition, temperature }: WeatherScene3DProps) => {
  const backgroundColor = useMemo(() => {
    if (weatherCondition.includes('rain')) return '#263238';
    if (weatherCondition.includes('snow')) return '#E8F5E8';
    if (weatherCondition.includes('cloud')) return '#607D8B';
    if (temperature > 25) return '#FF8A65';
    return '#4FC3F7';
  }, [weatherCondition, temperature]);

  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        className="w-full h-full"
        style={{ background: backgroundColor }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#4FC3F7" />
          
          <WeatherSphere condition={weatherCondition} temperature={temperature} />
          <WeatherClouds condition={weatherCondition} />
          <ParticleSystem count={150} condition={weatherCondition} />
          
          {temperature < 10 && <Stars radius={50} depth={50} count={200} factor={2} />}
          
          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
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