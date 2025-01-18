import React, { useRef, useState, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BufferAttribute } from "three";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

export function Car({ progress }) {
  const { nodes, materials, animations } = useGLTF("/rim3.glb");
  const { nodes: nodes2, materials: materials2 } = useGLTF("/carriage3.glb");
  const { nodes: nodes3, materials: materials3 } = useGLTF("/old_car3.glb");
  const { nodes: nodes4, materials: materials4 } = useGLTF("/new_car2.glb");
  //   const { actions } = useAnimations(animations, group);
  const texture = useLoader(THREE.TextureLoader, "/white-cir.webp"); // Use a circular texture image
  const bufferAttributeRef = useRef(null);
  const [gg, setGG] = useState([]);
  const [gg2, setGG2] = useState([]);
  const [gg3, setGG3] = useState([]);
  const [gg4, setGG4] = useState([]);

  // const { ...config } = useControls({
  //   size: { value: 0.05, min: 0.01, max: 0.2 },
  //   count: { value: 12025, min: 3025, max: 19623, step: 200 },
  // });

  //   function combineFloat32Arrays(...arrays) {
  //     let totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  //     let combinedArray = new Float32Array(totalLength);
  //     let offset = 0;

  //     for (let arr of arrays) {
  //       combinedArray.set(arr, offset);
  //       offset += arr.length;
  //     }

  //     // return combinedArray.slice(0, 51075);
  //     return combinedArray;
  //   }

  function toFloat32Array() {
    const theta = -Math.PI; // -90 degrees in radians
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const positions = nodes.Object_3.geometry.attributes.position.array;
    const rotatedPositions = new Float32Array(positions.length);

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]+80;
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Apply Z-axis rotation
      rotatedPositions[i] = x * cosTheta - y * sinTheta; // x'
      rotatedPositions[i + 1] = x * sinTheta + y * cosTheta; // y'
      rotatedPositions[i + 2] = z; // z remains the same
    }

    setGG(rotatedPositions.slice(0,329529).map((x) => x * 0.008));
  }

  function toFloat32Array2() {
    let arr = new Float32Array(
      nodes2.Cube004_Carriage_0.geometry.attributes.position.array
    );
    // console.log("gg", arr.length);
    setGG2(arr.slice(0,329529));
  }

  function toFloat32Array3() {
    let arr = new Float32Array(
      nodes3.car_body.geometry.attributes.position.array
    );
    // console.log("gg2", arr.length);

    // setGG3(arr.slice(0, 234690));
    setGG3(arr.slice(0,329529));
  }

  function toFloat32Array4() {
    const theta = -Math.PI / 2; // -90 degrees in radians
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const positions = nodes4.body_black_0.geometry.attributes.position.array;
    const rotatedPositions = new Float32Array(positions.length);

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Apply Z-axis rotation
      rotatedPositions[i] = x * cosTheta - y * sinTheta; // x'
      rotatedPositions[i + 1] = x * sinTheta + y * cosTheta; // y'
      rotatedPositions[i + 2] = z; // z remains the same
    }

    setGG4(rotatedPositions.map((x) => x * 4));
    // console.log("gg3", rotatedPositions.map((x) => x*4).length);
  }

  useEffect(() => {
    if (nodes) {
      toFloat32Array();
      toFloat32Array2();
      toFloat32Array3();
      toFloat32Array4();
    }

  }, [nodes]);

  useEffect(() => {
  // useFrame(() => {
    if(!bufferAttributeRef.current) return;
    // console.log("progress", progress);
    if (gg.length > 0 && gg2.length > 0 && gg3.length > 0 && gg4.length > 0) {
      const positions = bufferAttributeRef.current.attributes.position.array;
      for (let i = 0; i < positions.length; i++) {
        if (0<= progress && progress <= 0.3333) {
          // Morph from gg to gg2
          positions[i] = gg[i] + (gg2[i] - gg[i]) * (progress / 0.3333);
        } else if (0.3333 < progress && progress <= 0.6666) {
          // Morph from gg2 to gg3
          positions[i] =
            gg2[i] + (gg3[i] - gg2[i]) * ((progress - 0.3333) / 0.3333);
        } else {
          // Morph from gg3 to gg4
          positions[i] =
            gg3[i] + (gg4[i] - gg3[i]) * ((progress - 0.6666) / 0.3333);
        }
      }

      bufferAttributeRef.current.attributes.position.needsUpdate = true;
    }

    // const morphParticles = () => {
    //   const currentPositions =
    //     bufferAttributeRef.current.attributes.position.array;
    //   // console.log("currentPositions",currentPositions.length/3)
    //   gsap.to(currentPositions, {
    //     duration: 4, // Duration of the morphing
    //     ease: "power2.inOut",
    //     onUpdate: () => {
    //       // Update the buffer geometry with the tweened positions
    //       bufferAttributeRef.current.attributes.position.needsUpdate = true;
    //     },
    //     // Animate to the new positions (gg2)
    //     onComplete: () => console.log("Morphing complete!"),
    //     ...Array.from(gg2).reduce((acc, value, index) => {
    //       acc[index] = value;
    //       return acc;
    //     }, {}),
    //   });
    // };
    // // morphParticles();

    // setTimeout(morphParticles, 1000);
  },[progress]);

  // Interact and animate particles
  // const strength = 0.1; // Interaction strength
  // const radius = 0.5; // Interaction radius
  // useFrame((state) => {
  //   if (!bufferAttributeRef.current) return;
  //   // console.log(state.pointer.y)
  //   // const originalPositions = gg; // Use gg as the base positions
  //   // console.log("positions: ", positions.length," and originalPositions: ", originalPositions.length);
  //   // const mouse = mouseRef.current;

  //   const positions = bufferAttributeRef.current.attributes.position.array;

  //   // if(-.98<state.pointer.x && state.pointer.x<.98 && -.8<state.pointer.y && state.pointer.y<.8){
  //     for (let i = 0; i < positions.length; i += 3) {
  //       // const px = positions[i];
  //       // const py = positions[i + 1];
  //       // const pz = positions[i + 2];
  //       // const ox = originalPositions[i];
  //       // const oy = originalPositions[i + 1];
  //       // const oz = originalPositions[i + 2];

  //       const distance = Math.sqrt((state.pointer.x - positions[i])**2 + (state.pointer.y - positions[i+1])**2 );
  //       // if (-.98<state.pointer.x && state.pointer.x<.98 && -.8<state.pointer.y && state.pointer.y<.8) {
  //       if (distance < radius) {
  //         // Move outward
  //         const dx = positions[i] - state.pointer.x;
  //         const dy = positions[i+1] - state.pointer.y;
  //         const dz = positions[i+2]; // Z can stay the same
  //         const length = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
  //         positions[i] += (dx / length) * strength;
  //         positions[i + 1] += (dy / length) * strength;
  //         // positions[i + 2] += (dy / length) * strength;
  //       } else {
  //         // Smooth return to original position
  //         positions[i] += (gg[i] - positions[i]) * 0.05; // Smooth interpolation
  //         positions[i + 1] += (gg[i+1] -positions[i+1]) * 0.05;
  //         positions[i + 2] += (gg[i+2] - positions[i+2]) * 0.05;
  //       }
  //     }

  //     bufferAttributeRef.current.attributes.position.needsUpdate = true;
  //   // }

  // });

  return (
    <group rotation={[0,-Math.PI/5,0]} scale={[5, 5, 5]}>
      {gg.length > 0 && gg2.length > 0 && gg3.length > 0 && gg4.length > 0 && (
        <points
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={1}
          position={[0, 0, 0]}
          //   ref={points}
        >
          <bufferGeometry ref={bufferAttributeRef}>
            <bufferAttribute
              attach="attributes-position"
              //   count={17025}
              args={[new Float32Array(gg), 3]}
              //   itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            map={texture}
            size={0.5}
            color="#f5cb58"
            // color="#f06c5b"
            sizeAttenuation
            // depthWrite={true}
            // emissive={new THREE.Color(0, 1, 0)}
            toneMapped={false}
            transparent
            alphaTest={0.9}
          />
        </points>
      )}
    </group>
  );
}

useGLTF.preload("/rim3.glb");
useGLTF.preload("/carriage3.glb");
useGLTF.preload("/old_car3.glb");
useGLTF.preload("/new_car2.glb");
