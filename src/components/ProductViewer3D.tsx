import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

interface ProductModel3DProps {
  color: string;
  material: 'standard' | 'metallic' | 'velvet' | 'leather';
}

const ProductMesh = ({ color, material }: ProductModel3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  const currentColor = useRef(new THREE.Color(color));

  const materialProps = useMemo(() => {
    switch (material) {
      case 'metallic':
        return { roughness: 0.15, metalness: 0.9 };
      case 'velvet':
        return { roughness: 0.95, metalness: 0.0 };
      case 'leather':
        return { roughness: 0.7, metalness: 0.1 };
      default:
        return { roughness: 0.5, metalness: 0.3 };
    }
  }, [material]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      currentColor.current.lerp(targetColor, delta * 3);
      (meshRef.current.material as THREE.MeshStandardMaterial).color.copy(currentColor.current);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Main body — rounded box representing a product */}
        <mesh ref={meshRef} position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.4, 1.8, 0.8, 4, 4, 4]} />
          <meshStandardMaterial
            color={color}
            roughness={materialProps.roughness}
            metalness={materialProps.metalness}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Crown emblem on front */}
        <mesh position={[0, 0.6, 0.41]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Crown points */}
        {[-0.12, 0, 0.12].map((x, i) => (
          <mesh key={i} position={[x, 0.82, 0.41]}>
            <coneGeometry args={[0.04, 0.1, 4]} />
            <meshStandardMaterial color="#F0D080" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}

        {/* Label / brand strip */}
        <mesh position={[0, -0.2, 0.41]}>
          <planeGeometry args={[0.8, 0.15]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Pedestal */}
        <mesh position={[0, -0.7, 0]} receiveShadow>
          <cylinderGeometry args={[0.6, 0.7, 0.15, 32]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="font-heading text-sm text-muted-foreground">Crafting your experience...</p>
    </div>
  </div>
);

interface ProductViewer3DProps {
  color: string;
  material: 'standard' | 'metallic' | 'velvet' | 'leather';
}

const ProductViewer3D = ({ color, material }: ProductViewer3DProps) => {
  const { theme } = useStore();
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full aspect-square rounded-viewer overflow-hidden border border-border" style={{ background: isDark ? '#060D14' : '#F0EAE0' }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ position: [0, 0.5, 3.5], fov: 45 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: isDark ? 1.0 : 1.4 }}
        >
          <ambientLight intensity={isDark ? 0.4 : 0.8} color={isDark ? '#1A2A4A' : '#FFF5DC'} />
          <directionalLight position={[5, 5, 5]} intensity={isDark ? 1.8 : 1.3} color={isDark ? '#F0D080' : '#FFF8E8'} castShadow />
          <directionalLight position={[-3, 2, -3]} intensity={0.3} color={isDark ? '#4A6FA5' : '#FFE4B5'} />
          <pointLight position={[0, 3, 0]} intensity={0.5} color="#C9A84C" />

          <ProductMesh color={color} material={material} />

          <ContactShadows position={[0, -0.78, 0]} opacity={isDark ? 0.6 : 0.3} scale={3} blur={2} far={4} />

          <Environment preset={isDark ? 'night' : 'apartment'} />

          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            minDistance={2}
            maxDistance={6}
            maxPolarAngle={Math.PI * 0.85}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ProductViewer3D;
