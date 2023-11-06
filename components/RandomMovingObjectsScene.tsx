import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Box args={[1, 1, 1]} />
      <meshStandardMaterial color={'blue'} roughness={0.5} metalness={0.5} />
    </mesh>
  );
}

const RotatingCubeScene = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', background: 'black' }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.2} />
      <pointLight intensity={1.5} position={[10, 10, 10]} />
      <RotatingCube />
      <OrbitControls />
    </Canvas>
  );
}

export default RotatingCubeScene;
