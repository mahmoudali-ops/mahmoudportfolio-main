import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Lightweight mobile detection to tune particle counts & performance
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const particlesCount = isMobile ? 2000 : 5000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      
      // Mouse interaction
      ref.current.rotation.x += mousePos.current.y * 0.00005;
      ref.current.rotation.y += mousePos.current.x * 0.00005;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Additional twinkling stars
function TwinklingStars() {
  const ref = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();
  const particlesCount = isMobile ? 400 : 1000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.PointsMaterial;
      // Twinkling effect
      material.opacity = Math.abs(Math.sin(state.clock.getElapsedTime() * 2)) * 0.8 + 0.2;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.25}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

// Slow moving background stars
function BackgroundStars() {
  const ref = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();
  const particlesCount = isMobile ? 800 : 2000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.005;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e879f9"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

export default function StarField() {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={isMobile ? [1, 1.25] : [1, 2]}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      >
        <Stars />
        <TwinklingStars />
        <BackgroundStars />
      </Canvas>
      
      {/* CSS animated stars overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
