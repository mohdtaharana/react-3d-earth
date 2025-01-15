import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BufferAttribute } from "three";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

export function Car({ progress }) {
  // const group = useRef();
  const { nodes, materials, animations } = useGLTF("/rim.glb");
  const { nodes: nodes2, materials: materials2 } = useGLTF("/carriage.glb");
  const { nodes: nodes3, materials: materials3 } = useGLTF("/old_car.glb");
  const { nodes: nodes4, materials: materials4 } = useGLTF("/new_car.glb");
  //   const { actions } = useAnimations(animations, group);
  const texture = useLoader(THREE.TextureLoader, "/white-cir.webp"); // Use a circular texture image

  //   const [particles, setParticles] = useState(true);
  // const points = useRef();
  const bufferAttributeRef = useRef(null);
  const [gg, setGG] = useState([]);
  const [gg2, setGG2] = useState([]);
  const [gg3, setGG3] = useState([]);
  const [gg4, setGG4] = useState([]);
  // const [morphFrom, setMorphFrom] = useState([]);
  // const [morphTo, setMorphTo] = useState([]);
  // const [zAxis, setZAxis] = useState(Math.PI / 2);
  //   const [newModel, setNewModel] = useState(null);
  //   const [count, setCount] = useState(1);

  const { ...config } = useControls({
    size: { value: 0.05, min: 0.01, max: 0.2 },
    count: { value: 12025, min: 3025, max: 19623, step: 200 },
  });

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
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Apply Z-axis rotation
      rotatedPositions[i] = x * cosTheta - y * sinTheta; // x'
      rotatedPositions[i + 1] = x * sinTheta + y * cosTheta; // y'
      rotatedPositions[i + 2] = z; // z remains the same
    }

    setGG(rotatedPositions.map((x) => x * 0.008));
  }

  function toFloat32Array2() {
    let arr = new Float32Array(
      nodes2.Cube004_Carriage_0.geometry.attributes.position.array
    );
    // console.log("gg", arr.length);
    setGG2(arr);
  }

  function toFloat32Array3() {
    let arr = new Float32Array(
      nodes3.car_body.geometry.attributes.position.array
    );
    // console.log("gg2", arr.length);

    // setGG3(arr.slice(0, 234690));
    setGG3(arr);
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
    if (gg.length > 0 && gg2.length > 0 && gg3.length > 0 && gg4.length > 0) {
      const positions = bufferAttributeRef.current.attributes.position.array;
      for (let i = 0; i < positions.length; i++) {
        if (progress <= 0.33) {
          // Morph from gg to gg2
          positions[i] = gg[i] + (gg2[i] - gg[i]) * (progress / 0.33);
        } else if (progress <= 0.66) {
          // Morph from gg2 to gg3
          positions[i] = gg2[i] + (gg3[i] - gg2[i]) * ((progress - 0.33) / 0.33);
        } else {
          // Morph from gg3 to gg4
          positions[i] = gg3[i] + (gg4[i] - gg3[i]) * ((progress - 0.66) / 0.34);
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
  }, [progress]);

  return (
    <group scale={[5, 5, 5]}>
      {gg.length > 0 && gg2.length > 0 && gg3.length > 0 && gg4.length > 0 &&(
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
            size={config.size}
            color="yellow"
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

useGLTF.preload("/rim.glb");
useGLTF.preload("/carriage.glb");
useGLTF.preload("/old_car.glb");
useGLTF.preload("/new_car.glb");
