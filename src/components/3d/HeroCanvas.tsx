import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, useVideoTexture, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const VideoPlane = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, url, label }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Load video texture
    const texture = useVideoTexture(url, {
        start: true,
        muted: true,
        loop: true,
        playsInline: true,
        crossOrigin: 'Anonymous'
    });

    // Fix color space for video textures
    texture.colorSpace = THREE.SRGBColorSpace;

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating animation
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
            meshRef.current.rotation.z = rotation[2] + Math.cos(state.clock.elapsedTime * 0.3 + position[1]) * 0.02;
        }
    });

    return (
        <group position={new THREE.Vector3(...position)} rotation={new THREE.Euler(...rotation)}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
                    {/* 9:16 vertical video aspect ratio approx */}
                    <planeGeometry args={[3, 5.33]} />
                    <meshStandardMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
                </mesh>

                {/* Optional Label */}
                {label && (
                    <Text
                        position={[-1.2, -2.4, 0.1]}
                        fontSize={0.15}
                        color="#2E2520"
                        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                        anchorX="left"
                        anchorY="middle"
                    >
                        {label.toUpperCase()}
                    </Text>
                )}
            </Float>
        </group>
    );
};

const Composition = () => {
    return (
        <group position={[0, -0.5, 0]} rotation={[0, -0.1, 0]}>
            {/* Main Center Video - Intro */}
            <VideoPlane
                url="/intro.mp4"
                position={[0, 0, 1]}
                scale={1.1}
                label="Main Film"
            />

            {/* Left Background Video - Showreel 1 */}
            <VideoPlane
                url="/showreel1.mp4"
                position={[-2.8, -0.5, -1]}
                rotation={[0, 0.2, -0.05]}
                scale={0.9}
                label="Love Story"
            />

            {/* Right Background Video - Showreel 2 */}
            <VideoPlane
                url="/showreel2.mp4"
                position={[2.8, 0.5, -1]}
                rotation={[0, -0.2, 0.05]}
                scale={0.9}
                label="Moments"
            />
        </group>
    )
}

const HeroCanvas = () => {
    return (
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none md:pointer-events-auto">
            <Canvas shadows camera={{ position: [0, 0, 9], fov: 35 }}>
                <fog attach="fog" args={['#F9F8F6', 5, 20]} />
                <ambientLight intensity={0.9} />
                <spotLight
                    position={[5, 10, 5]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#F9F8F6" />

                <Suspense fallback={null}>
                    <Composition />
                </Suspense>

                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.2} far={10} color="#4A3B32" />
                <Environment preset="studio" />
            </Canvas>
        </div>
    );
};

export default HeroCanvas;
