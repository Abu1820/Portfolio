import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Component, Suspense, useEffect, useState } from "react";

import { TECHNOLOGIES } from "../../constants";

// Preload all 14 tech icon textures upfront into browser cache
if (typeof window !== "undefined") {
  TECHNOLOGIES.forEach((tech) => {
    try {
      useTexture.preload(tech.icon);
    } catch {
      // ignore
    }
  });
}

type BallProps = {
  imgUrl: string;
};

// Immediate 3D mesh fallback during suspense so canvas is NEVER blank or transparent
const BallLoadingMesh = () => (
  <mesh scale={2.75}>
    <icosahedronGeometry args={[1, 1]} />
    <meshStandardMaterial
      color="#fff8eb"
      polygonOffset
      polygonOffsetFactor={-5}
      flatShading
    />
  </mesh>
);

// Ball Mesh
const Ball = ({ imgUrl }: BallProps) => {
  const [decal] = useTexture([imgUrl]);
  const { invalidate } = useThree();

  useEffect(() => {
    // Explicitly invalidate to force R3F demand loop to paint the texture immediately
    invalidate();
    const t1 = setTimeout(invalidate, 50);
    const t2 = setTimeout(invalidate, 200);
    const t3 = setTimeout(invalidate, 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [decal, invalidate]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 0.05]} />
      {/* Mesh */}
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

// Error Boundary for canvas texture failures
class CanvasErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

type BallCanvasProps = {
  icon: string;
  name?: string;
};

// Ball Canvas
export const BallCanvas = ({ icon, name = "tech" }: BallCanvasProps) => {
  const [contextLost, setContextLost] = useState(false);

  const fallback3DBall = (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-20 h-20 xs:w-24 xs:h-24 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{
          background:
            "radial-gradient(circle at 35% 25%, #fffbf2 0%, #efe4d0 42%, #d7c5aa 72%, #bfa988 100%)",
          boxShadow: [
            "inset 4px 4px 10px rgba(255, 255, 255, 0.7)",
            "inset -6px -8px 14px rgba(65, 48, 30, 0.35)",
            "0 12px 24px -6px rgba(0, 0, 0, 0.45)",
          ].join(", "),
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-2.5 left-4 h-5 w-7 rounded-full bg-white/40 blur-[2px]"
        />
        <img
          src={icon}
          alt={name}
          className="relative z-10 w-10 h-10 xs:w-12 xs:h-12 object-contain filter drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
          loading="eager"
        />
      </div>
    </div>
  );

  if (contextLost) {
    return fallback3DBall;
  }

  return (
    <CanvasErrorBoundary fallback={fallback3DBall}>
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ powerPreference: "low-power", antialias: false }}
        className="w-full h-full rounded-full"
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            setContextLost(true);
          });
          gl.domElement.addEventListener("webglcontextrestored", () => {
            setContextLost(false);
          });
        }}
      >
        <Suspense fallback={<BallLoadingMesh />}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    </CanvasErrorBoundary>
  );
};

export default BallCanvas;
