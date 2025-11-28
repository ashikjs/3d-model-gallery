'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useEffect, Suspense } from 'react';
import UniversalModel from './UniversalModel';

export default function ProductViewer({ 
  modelUrl, 
  height = '100vh', 
  overlay = null,
  scrollMultiplier = 4
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalScrollHeight = (scrollMultiplier * viewportHeight) - viewportHeight;
      const progress = Math.min(Math.max(scrollTop / totalScrollHeight, 0), 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollMultiplier]);

  const rotation = scrollProgress * Math.PI * 2;

  return (
    <div className="relative" style={{ height: `${scrollMultiplier * 100}vh` }}>

      <div className="sticky top-0 w-full bg-linear-to-b from-slate-900 to-slate-700" style={{ height }}>
        {overlay && (
          <div className="absolute bottom-12 left-0 right-0 z-10 px-8 pb-8 pointer-events-none flex justify-center">
            {overlay}
          </div>
        )}

        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'linear-gradient(to bottom, #0f172a, #334155)' }}
          gl={{ 
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              console.warn('WebGL context lost, attempting to restore...');
            });
            gl.domElement.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored');
            });
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <UniversalModel 
              modelUrl={modelUrl} 
              rotation={rotation}
            />
          </Suspense>
          
          <OrbitControls enableZoom={false} enablePan={false} enabled={false} />
        </Canvas>
      </div>
    </div>
  );
}
