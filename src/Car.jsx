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
  const { nodes, materials, animations } = useGLTF("/rim0.glb");
  const { nodes: nodes2, materials: materials2 } = useGLTF("/carriage0.glb");
  const { nodes: nodes3, materials: materials3 } = useGLTF("/old_car0.glb");
  const { nodes: nodes4, materials: materials4 } = useGLTF("/new_car0.glb");
  //   const { actions } = useAnimations(animations, group);
  const texture = useLoader(THREE.TextureLoader, "/white-cir.webp"); // Use a circular texture image
  const bufferAttributeRef = useRef(null);
  const [gg1, setGG1] = useState([]);
  const [gg2, setGG2] = useState([]);
  const [gg3, setGG3] = useState([]);
  const [gg4, setGG4] = useState([]);
  const [size, setSize] = useState(0.1);
  const [to, setTo] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setSize(0.5);
    }
  }, []);

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
    const theta = -Math.PI / 1.25; // -90 degrees in radians
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const positions = nodes.Object_3.geometry.attributes.position.array;
    const rotatedPositions = new Float32Array(positions.length);

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i] + 80;
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Apply Z-axis rotation
      rotatedPositions[i] = x * cosTheta - y * sinTheta; // x'
      rotatedPositions[i + 1] = x * sinTheta + y * cosTheta; // y'
      rotatedPositions[i + 2] = z; // z remains the same
    }

    // console.log("gg",rotatedPositions[0])

    setGG1(rotatedPositions.slice(0, 420306).map((x) => x * 0.008));
  }

  function toFloat32Array2() {
    let arr = new Float32Array(
      nodes2.Cube004_Carriage_0.geometry.attributes.position.array
    );
    // console.log("gg2",arr[0])
    // console.log("gg", arr.length);
    setGG2(arr.slice(0, 420306));
  }

  function toFloat32Array3() {
    let arr = new Float32Array(
      nodes3.car_body.geometry.attributes.position.array
    );
    // console.log("gg2", arr.length);

    // setGG3(arr.slice(0, 234690));
    // console.log("gg3",arr.length)
    setGG3(arr.slice(0, 420306));
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

    // console.log("gg4", rotatedPositions.length);
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
      // console.log("progress");
    if (!bufferAttributeRef.current) return;
    // console.log("progress", progress);
    if (gg1.length > 0 && gg2.length > 0 && gg3.length > 0 && gg4.length > 0) {
      const positions = bufferAttributeRef.current.attributes.position.array;
      // console.log("change ",positions[0])
      for (let i = 0; i < positions.length; i++) {
        if (0<= progress && progress <= 0.33333333) {
          // Morph from gg to gg2
          positions[i] = gg1[i] + (gg2[i] - gg1[i]) * (progress / 0.33333333);
        } else if (0.33333333 < progress && progress <= 0.66666666) {
          // Morph from gg2 to gg3
          positions[i] =
            gg2[i] + (gg3[i] - gg2[i]) * ((progress - 0.33333333) / 0.33333333);
        } else {
          // Morph from gg3 to gg4
          positions[i] =
            gg3[i] + (gg4[i] - gg3[i]) * ((progress - 0.66666666) / 0.33333333);
        }
      }

      bufferAttributeRef.current.attributes.position.needsUpdate = true;
    }

    // if (0 <= progress && progress <= 0.05 && gg1.length > 0 && to !== 1) {
    //   setTo(1);
    // }
    // else if(0.25< progress && progress <= 0.3 && gg2.length>0 && to!==2){
    //   setTo(2);
    // }
    // else if(0.5< progress && progress <= 0.55 && gg3.length>0 && to!==3){
    //   setTo(3);
    // }
    // else if(0.75< progress && progress <= 8 && gg4.length>0 && to!==4){
    //   setTo(4);
    // }
  }, [progress]);

  // useEffect(() => {
  //   console.log("to: ", to);
  //   const morphParticles = (toArray) => {
  //     const currentPositions =
  //       bufferAttributeRef.current.attributes.position.array;
  //     gsap.to(currentPositions, {
  //       duration: 4,
  //       ease: "power2.inOut",
  //       onUpdate: () => {
  //         bufferAttributeRef.current.attributes.position.needsUpdate = true;
  //       },
  //       onComplete: () => console.log("Morphing complete!"),
  //       // Animate to the new positions (gg2)
  //       ...Array.from(gg3).reduce((acc, value, index) => {
  //         acc[index] = value;
  //         return acc;
  //       }, {}),
  //     });
  //   };
  //   if (to != 0) {
  //     setTimeout(morphParticles(to), 2000);
  //   }
  // }, [to]);

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
    <group rotation={[0, -Math.PI / 5, 0]} scale={[5, 5, 5]}>
      {gg1.length > 0 && gg2.length > 0 && gg3.length > 0 && gg4.length > 0 && (
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
              args={[new Float32Array(gg1), 3]}
              //   itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            map={texture}
            // size={0.15}
            size={size}
            color="#f5cb58"
            // color="white"
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

useGLTF.preload("/rim0.glb");
useGLTF.preload("/carriage0.glb");
useGLTF.preload("/old_car0.glb");
useGLTF.preload("/new_car0.glb");
