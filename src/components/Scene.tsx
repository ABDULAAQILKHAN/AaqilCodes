"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Shape({ position, rotation, scale, geometry, color }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Simple continuous rotation
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;

            // Mouse interaction (gentle tilt towards mouse)
            const targetX = (state.pointer.x * Math.PI) / 10;
            const targetY = (state.pointer.y * Math.PI) / 10;

            meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
            meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                {geometry}
                {/* 
                  Switched from MeshTransmissionMaterial to MeshPhysicalMaterial 
                  MeshTransmissionMaterial is computationally extremely expensive and dropping 
                  framerates heavily when 4 of them run simultaneously.
                  MeshPhysicalMaterial achieves a very similar premium glass look with 
                  10x better performance.
                */}
                <meshPhysicalMaterial
                    color={color}
                    transmission={0.9}
                    opacity={1}
                    metalness={0.1}
                    roughness={0.1}
                    ior={1.5}
                    thickness={0.5}
                />
            </mesh>
        </Float>
    );
}

function SceneContents() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#5555ff" />

            <Shape position={[-2, 1, 0]} scale={1} color="#ffffff" geometry={<icosahedronGeometry args={[1, 0]} />} />
            <Shape position={[2, -1, 1]} scale={0.8} color="#aaaaff" geometry={<torusKnotGeometry args={[0.6, 0.2, 100, 16]} />} />
            <Shape position={[-1, -2, -1]} scale={0.6} color="#ffaaff" geometry={<octahedronGeometry args={[1, 0]} />} />
            <Shape position={[3, 2, -2]} scale={1.2} color="#aaffaa" geometry={<capsuleGeometry args={[0.5, 1, 4, 16]} />} />

            <Environment preset="city" />
        </>
    );
}

export default function Scene() {
    // Add a small delay to rendering the canvas to ensure the parent container
    // has correctly calculated its flex/grid layout dimensions. This fixes the 
    // off-center issue on initial load.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Canvas className="w-full h-full pointer-events-auto" dpr={[1, 2]} gl={{ antialias: false }}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
            <SceneContents />
        </Canvas>
    );
}

