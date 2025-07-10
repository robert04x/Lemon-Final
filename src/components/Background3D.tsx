import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  scrollY: number;
}

const ScrollCamera = ({ scrollY }: { scrollY: number }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    // Create diving effect - camera moves forward (negative Z) as user scrolls
    const baseZ = 40;
    const diveIntensity = 0.03;
    camera.position.z = baseZ - (scrollY * diveIntensity);
    
    // Optional: Add slight rotation for more dynamic effect
    camera.rotation.x = scrollY * 0.0001;
    
    // Ensure camera doesn't go too far
    camera.position.z = Math.max(10, camera.position.z);
  });
  
  return null;
};

const GeometricPattern = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 40, 40);
    const position = geo.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Enhanced geometric pattern
      const wave1 = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 0.8;
      const wave2 = Math.sin((x + y) * 0.3) * 0.6;
      const wave3 = Math.cos(Math.sqrt(x * x + y * y) * 0.3) * 0.7;
      const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.1) * 0.5;
      
      position.setZ(i, wave1 + wave2 + wave3 + ripple);
    }
    
    return geo;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const position = meshRef.current.geometry.attributes.position;
    const time = Date.now() * 0.0002;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Enhanced mouse interaction
      const mouseEffect = new THREE.Vector2(mouse.x, mouse.y).multiplyScalar(3);
      const distanceToMouse = new THREE.Vector2(x / viewport.width, y / viewport.height)
        .sub(mouseEffect)
        .length();
      
      // More complex wave patterns
      const wave1 = Math.sin(x * 0.2 + time * 2) * Math.cos(y * 0.2 + time * 1.5) * 0.8;
      const wave2 = Math.sin((x + y) * 0.3 + time * 1.8) * 0.6;
      const wave3 = Math.cos(Math.sqrt(x * x + y * y) * 0.3 - time * 2.2) * 0.7;
      const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 3) * 0.5;
      
      const lift = Math.max(0, 6 - distanceToMouse) * 3;
      position.setZ(i, wave1 + wave2 + wave3 + ripple + lift);
    }
    
    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -8, -15]}>
      <primitive object={geometry} />
      <meshPhysicalMaterial
        color="#fbbf24"
        side={THREE.DoubleSide}
        wireframe
        transparent
        opacity={0.25}
        metalness={0.3}
        roughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

const Background3D = ({ scrollY }: Background3DProps) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 40], fov: 65 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#fff8dc', 35, 90]} />
        <ambientLight intensity={1.2} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#fef3c7" />
        <pointLight position={[-15, -15, -15]} intensity={0.8} color="#fbbf24" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.6}
          penumbra={1}
          intensity={1.2}
          color="#fef3c7"
        />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#fcd34d"
        />
        <GeometricPattern />
        <ScrollCamera scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Background3D;