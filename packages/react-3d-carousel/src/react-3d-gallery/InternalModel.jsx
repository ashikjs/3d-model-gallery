'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';

export default function InternalModel({ modelUrl, rotation }) {
    const meshRef = useRef();
    const [error, setError] = useState(null);
    const [scene, setScene] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadModel = async () => {
            try {
                const gltf = await useGLTF.preload(modelUrl);
                if (isMounted) {
                    setScene(gltf.scene);
                }
            } catch (err) {
                console.error('Failed to load 3D model:', err);
                if (isMounted) {
                    setError(err.message || 'Failed to load 3D model');
                }
            }
        };

        loadModel();

        return () => {
            isMounted = false;
        };
    }, [modelUrl]);

    if (error) {
        console.warn('3D model failed to load, showing section without model');
        return null;
    }

    if (!scene) {
        return null;
    }

    return (
        <primitive
            ref={meshRef}
            object={scene}
            rotation={[0, rotation, 0]}
            position={[0, -0.8, 0]}
            scale={1.5}
        />
    );
}
