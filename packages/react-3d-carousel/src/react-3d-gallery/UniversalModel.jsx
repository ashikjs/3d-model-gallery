'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

export default function UniversalModel({ modelUrl, rotation, position = [0, -0.8, 0], scale = 1.5 }) {
    const meshRef = useRef();
    const [error, setError] = useState(null);
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load model
    useEffect(() => {
        let isMounted = true;

        const loadModel = async () => {
            try {
                setLoading(true);
                const fileExtension = modelUrl.split('.').pop().toLowerCase();
                let loadedModel;

                switch (fileExtension) {
                    case 'glb':
                    case 'gltf':
                        const gltfLoader = new GLTFLoader();
                        loadedModel = await new Promise((resolve, reject) => {
                            gltfLoader.load(
                                modelUrl,
                                (gltf) => resolve(gltf.scene),
                                undefined,
                                reject
                            );
                        });
                        break;

                    case 'obj':
                        const objLoader = new OBJLoader();
                        loadedModel = await new Promise((resolve, reject) => {
                            objLoader.load(
                                modelUrl,
                                (obj) => resolve(obj),
                                undefined,
                                reject
                            );
                        });
                        break;

                    case 'fbx':
                        const fbxLoader = new FBXLoader();
                        loadedModel = await new Promise((resolve, reject) => {
                            fbxLoader.load(
                                modelUrl,
                                (fbx) => resolve(fbx),
                                undefined,
                                reject
                            );
                        });
                        break;

                    default:
                        throw new Error(`Unsupported file format: ${fileExtension}`);
                }

                if (isMounted) {
                    setModel(loadedModel);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to load 3D model:', err);
                if (isMounted) {
                    setError(err.message || 'Failed to load 3D model');
                    setLoading(false);
                }
            }
        };

        loadModel();

        return () => {
            isMounted = false;
        };
    }, [modelUrl]);

    // Calculate scale and position
    const transforms = useMemo(() => {
        if (!model) return null;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const autoScale = 3.5 / maxDim;

        return {
            scale: autoScale,
            position: [
                -center.x * autoScale,
                -center.y * autoScale,
                -center.z * autoScale
            ]
        };
    }, [model]);

    if (error || loading || !model || !transforms) {
        return null;
    }

    return (
        <group rotation={[0, rotation, 0]}>
            <primitive
                ref={meshRef}
                object={model}
                scale={transforms.scale}
                position={transforms.position}
            />
        </group>
    );
}
