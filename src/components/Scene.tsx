"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Html } from "@react-three/drei";
import * as THREE from "three";

// Reusable Tech Shape Wrapper
function TechShape({ position, rotation, scale, children }: any) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Simple continuous rotation
            groupRef.current.rotation.x += 0.005;
            groupRef.current.rotation.y += 0.005;

            // Mouse interaction (gentle tilt towards mouse)
            const targetX = (state.pointer.x * Math.PI) / 10;
            const targetY = (state.pointer.y * Math.PI) / 10;

            groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
            groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
            <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
                {children}
            </group>
        </Float>
    );
}

// 1. Database (Stacked Disks)
function DatabaseShape({ color }: { color: string }) {
    return (
        <group>
            {[0, 1, 2].map((i) => (
                <mesh key={i} position={[0, (i - 1) * 0.8, 0]}>
                    <cylinderGeometry args={[1, 1, 0.5, 32]} />
                    <MeshTransmissionMaterial backside backsideThickness={1} thickness={0.5} roughness={0.1} transmission={1} ior={1.2} chromaticAberration={1} anisotropy={0.3} distortion={0.5} distortionScale={0.5} color={color} />
                </mesh>
            ))}
        </group>
    );
}

// 2. Server Rack (Stacked rectangular boxes)
function ServerShape({ color }: { color: string }) {
    return (
        <group>
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} position={[0, (i - 1.5) * 0.6, 0]}>
                    <boxGeometry args={[1.5, 0.4, 1.5]} />
                    <MeshTransmissionMaterial backside backsideThickness={1} thickness={0.5} roughness={0.1} transmission={1} ior={1.2} chromaticAberration={1} anisotropy={0.3} distortion={0.5} distortionScale={0.5} color={color} />
                    {/* Tiny glowing light on the server */}
                    <mesh position={[0.6, 0, 0.76]}>
                        <boxGeometry args={[0.1, 0.1, 0.05]} />
                        <meshBasicMaterial color={Math.random() > 0.2 ? "#00ff00" : "#ff0000"} />
                    </mesh>
                </mesh>
            ))}
        </group>
    );
}

// 3. Processor / CPU
function ProcessorShape({ color }: { color: string }) {
    return (
        <mesh>
            <boxGeometry args={[2, 0.2, 2]} />
            <MeshTransmissionMaterial backside backsideThickness={1} thickness={0.5} roughness={0.2} transmission={1} ior={1.2} chromaticAberration={1} anisotropy={0.3} distortion={0.5} distortionScale={0.5} color={color} />
            <Html transform position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <div className="w-16 h-16 border-2 border-white/40 flex items-center justify-center rounded-lg bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <span className="text-white font-mono text-[10px] font-bold tracking-widest leading-none">AI CORE</span>
                </div>
            </Html>
        </mesh>
    );
}

// 4. Code Block / Nodes
function CodeShape({ color }: { color: string }) {
    return (
        <mesh>
            <octahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial backside backsideThickness={1} thickness={0.5} roughness={0.1} transmission={1} ior={1.2} chromaticAberration={1} anisotropy={0.3} distortion={0.5} distortionScale={0.5} color={color} />
            <Html transform position={[0, 0, 0.5]}>
                <div className="text-2xl font-mono text-purple-300 font-bold bg-black/40 px-3 py-1 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                    &lt;/&gt;
                </div>
            </Html>
        </mesh>
    );
}

export default function Scene() {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full pointer-events-auto" dpr={[1, 2]} performance={{ min: 0.5 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#5555ff" />

            {/* Database component */}
            <TechShape position={[-2.5, 1, 0]} scale={0.7}>
                <DatabaseShape color="#ffffff" />
            </TechShape>

            {/* Server component */}
            <TechShape position={[2.5, -1, 1]} scale={0.7}>
                <ServerShape color="#aaaaff" />
            </TechShape>

            {/* Code bracket component */}
            <TechShape position={[-1.5, -2, -1]} scale={0.8}>
                <CodeShape color="#ffaaff" />
            </TechShape>

            {/* CPU component */}
            <TechShape position={[3, 2, -2]} scale={0.9}>
                <ProcessorShape color="#aaffaa" />
            </TechShape>

            <Environment preset="city" />
        </Canvas>
    );
}
