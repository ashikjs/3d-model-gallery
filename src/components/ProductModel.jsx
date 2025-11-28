'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';

export default function ProductModel({ rotation }) {
  const meshRef = useRef();
  
  // Using a placeholder GLTF model URL from Three.js examples
  // You can replace this with your own model URL or local file
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      rotation={[0, rotation, 0]}
      scale={1.5}
    />
  );
}

// Preload the model for better performance
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
