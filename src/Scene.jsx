import React, { useState } from "react";
import { Suspense, lazy } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Float,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { Car } from "./Car";
import { easing } from "maath";


const Scene = ({progress}) => {
  return (
      <Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: "0",
              backgroundColor: "gray",
              display: "grid",
              placeItems: "center",
              fontSize: "4rem",
              zIndex: "100000000",
            }}
          >
            Loading...
          </div>
        }
      >
        <Canvas>
          {/* <axesHelper args={[50]} /> */}

          <PerspectiveCamera
            fov={45}
            near={0.1}
            far={10000}
            position={[20, 10, 20]}
            makeDefault
          />

            {/* <EffectComposer>
                <Bloom
                intensity={20}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.9}
                    // height={0}
                />
            </EffectComposer> */}
          

          {/* <color attach="background" args={["gray"]} /> */}

          <pointLight intensity={500} color={"white"} position={[10, 6, 10]} />
          <pointLight
            intensity={500}
            color={"white"}
            position={[-10, 6, -10]}
          />
          <pointLight intensity={500} color={"white"} position={[10, 6, -10]} />
          <pointLight intensity={500} color={"white"} position={[-10, 6, 10]} />

          <OrbitControls
            enablePan={false}
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            makeDefault
            //  maxZoom={1000}
            // minZoom={1000}
            maxDistance={100}
            minDistance={1}
            enableDamping
            enableZoom
            // minAzimuthAngle={-Math.PI/2-.3}
            // maxAzimuthAngle={Math.PI / 2+.3}
          />

          <axesHelper args={[500]} />

          <Float speed={2} rotationIntensity={1}>

          <Car progress={progress}/>
          {/* <Rig /> */}
          </Float>
        </Canvas>
      </Suspense>
  );
};

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [19 + state.pointer.x * 4, 8 + state.pointer.y * 4, 20],
      0.4,
      delta
    );
    // easing.damp3(state.camera.position, [5 + state.pointer.x, 5 +Math.atan2(state.pointer.x, state.pointer.y) * 2, 15], 0.4, delta)
    state.camera.lookAt(0, 0, 0);
  });
}

export default Scene;
