import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

function Lamp({ position = [0, 2.1, 0] }) {
  const bulb = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.92 + Math.sin(t * 1.4) * 0.08;
    bulb.current.material.emissiveIntensity = pulse;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.9, 12]} />
        <meshStandardMaterial color="#e5d8c4" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.05, 0]} castShadow>
        <coneGeometry args={[0.35, 0.45, 24, 1, true]} />
        <meshStandardMaterial color="#d7b995" side={THREE.DoubleSide} roughness={0.7} />
      </mesh>
      <mesh ref={bulb} position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#ffe4aa" emissive="#ffcc7a" emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0, -0.18, 0]} intensity={1.2} distance={5.2} color="#ffc98b" castShadow />
    </group>
  );
}

function Plant({ position }) {
  const leaves = useRef();
  useFrame(({ clock }) => {
    leaves.current.rotation.z = Math.sin(clock.elapsedTime * 0.7) * 0.05;
  });

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.28, 18]} />
        <meshStandardMaterial color="#8f6142" roughness={0.9} />
      </mesh>
      <group ref={leaves} position={[0, 0.23, 0]}>
        {[...Array(7)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.cos((i / 7) * Math.PI * 2) * 0.12, 0.2 + (i % 2) * 0.08, Math.sin((i / 7) * Math.PI * 2) * 0.12]}
            rotation={[0.4 + i * 0.12, (i / 7) * Math.PI * 2, 0.6]}
            castShadow
          >
            <capsuleGeometry args={[0.05, 0.25, 4, 12]} />
            <meshStandardMaterial color={i % 2 ? '#79b872' : '#5f9e59'} roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Window() {
  return (
    <group position={[-1.8, 1.3, -2.39]}>
      <RoundedBox args={[1.5, 1.4, 0.06]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#d5c6b4" roughness={0.75} />
      </RoundedBox>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.27, 1.18]} />
        <meshStandardMaterial color="#8db9e8" emissive="#4e6fa5" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[1.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#ccb7a0" />
      </mesh>
      <mesh position={[0, 0, 0.07]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#ccb7a0" />
      </mesh>
    </group>
  );
}

function Rug() {
  const rugRef = useRef();
  useFrame(({ clock }) => {
    rugRef.current.material.emissiveIntensity = 0.08 + Math.sin(clock.elapsedTime * 0.9) * 0.03;
  });

  return (
    <mesh ref={rugRef} receiveShadow position={[0.4, 0.011, 0.4]} rotation={[-Math.PI / 2, 0, Math.PI / 6]}>
      <planeGeometry args={[2.2, 1.6]} />
      <meshStandardMaterial color="#6d7db8" roughness={0.95} emissive="#4f5f98" emissiveIntensity={0.1} />
    </mesh>
  );
}

function Room() {
  const steam = useMemo(
    () =>
      [...Array(10)].map(() => ({
        x: THREE.MathUtils.randFloat(-0.06, 0.06),
        z: THREE.MathUtils.randFloat(-0.06, 0.06),
        speed: THREE.MathUtils.randFloat(0.3, 0.6),
        offset: THREE.MathUtils.randFloat(0, Math.PI * 2)
      })),
    []
  );

  return (
    <group>
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[5, 0.02, 5]} />
        <meshStandardMaterial color="#c5ab8d" roughness={0.97} />
      </mesh>
      <mesh receiveShadow position={[0, 1.25, -2.5]}>
        <boxGeometry args={[5, 2.5, 0.02]} />
        <meshStandardMaterial color="#f0e4d2" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-2.5, 1.25, 0]}>
        <boxGeometry args={[0.02, 2.5, 5]} />
        <meshStandardMaterial color="#e9dcc9" roughness={0.93} />
      </mesh>

      <Rug />
      <Window />

      <RoundedBox args={[1.8, 0.38, 0.82]} radius={0.08} smoothness={4} position={[0.85, 0.25, -1.2]} castShadow receiveShadow>
        <meshStandardMaterial color="#b69273" roughness={0.85} />
      </RoundedBox>
      <RoundedBox args={[0.55, 0.28, 0.55]} radius={0.08} smoothness={4} position={[0.2, 0.2, -1.2]} castShadow receiveShadow>
        <meshStandardMaterial color="#d8c2a8" roughness={0.92} />
      </RoundedBox>

      <RoundedBox args={[1.7, 0.32, 0.76]} radius={0.15} smoothness={4} position={[0.9, 0.62, -1.2]} castShadow>
        <meshStandardMaterial color="#84a38e" roughness={0.95} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.24, 0.5]} radius={0.12} smoothness={4} position={[0.2, 0.47, -1.2]} castShadow>
        <meshStandardMaterial color="#7a9481" roughness={0.95} />
      </RoundedBox>

      <mesh castShadow receiveShadow position={[1.55, 0.42, 0.55]}>
        <cylinderGeometry args={[0.32, 0.4, 0.72, 24]} />
        <meshStandardMaterial color="#9d7658" roughness={0.85} />
      </mesh>
      <mesh castShadow position={[1.55, 0.82, 0.55]}>
        <cylinderGeometry args={[0.22, 0.24, 0.06, 24]} />
        <meshStandardMaterial color="#f6f6f6" roughness={0.4} />
      </mesh>

      {steam.map((p, i) => (
        <SteamPuff key={i} {...p} />
      ))}

      <Plant position={[-1.8, 0.14, 1.5]} />
      <Plant position={[-2.05, 0.14, -0.5]} />

      <Lamp position={[-0.4, 2.25, -1.4]} />

      <Text position={[0.86, 0.97, -0.72]} fontSize={0.14} color="#ecf2ff" anchorX="center" anchorY="middle">
        cozy evening
      </Text>
    </group>
  );
}

function SteamPuff({ x, z, speed, offset }) {
  const puff = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    puff.current.position.y = 0.85 + (t % 1.8) * 0.23;
    puff.current.position.x = 1.55 + x + Math.sin(t * 2) * 0.04;
    puff.current.position.z = 0.55 + z + Math.cos(t * 1.6) * 0.03;
    puff.current.material.opacity = Math.max(0, 0.38 - (t % 1.8) * 0.2);
  });

  return (
    <mesh ref={puff} position={[1.55 + x, 0.9, 0.55 + z]}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial color="#fafafa" transparent opacity={0.3} roughness={1} />
    </mesh>
  );
}

export default function App() {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [5.5, 4.8, 5.5], fov: 40, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#0f1323']} />
        <fog attach="fog" args={['#0f1323', 6, 16]} />

        <ambientLight intensity={0.42} color="#a7b9ff" />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.1}
          color="#fff2d6"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Room />

        <OrbitControls
          target={[0, 0.8, 0]}
          minDistance={6}
          maxDistance={11}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>

      <div className="overlay">
        <div className="tag">Isometric Cozy Room • React Three Fiber</div>
        <div className="tag">Drag to orbit • Scroll to zoom</div>
      </div>
    </>
  );
}
