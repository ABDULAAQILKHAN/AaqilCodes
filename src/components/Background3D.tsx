"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

function StarBackground() {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 10 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
<<<<<<< HEAD
            {/* 
                Performance optimization: 
                - dpr maxes out at 1.5 to prevent high-res screens from rendering 2-3x the pixels
                - gl={{ antialias: false }} because points don't need heavy antialiasing
             */}
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
=======
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]} performance={{ min: 0.5 }}>
>>>>>>> ab04690fd9af39e5e13553351ccad02ee2255d76
                <StarBackground />
                <Preload all />
            </Canvas>
        </div>
    );
}
