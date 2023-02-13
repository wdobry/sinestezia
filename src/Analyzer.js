import * as THREE from "three";
import React, { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { LayerMaterial, Displace } from "lamina";

export const Analyzer = ({ sound }) => {
  const avgFreq = useRef();
  const analyser = useRef();
  const displaceRef = useRef();
  const scale = useRef(0);

  useEffect(
    () => void (analyser.current = new THREE.AudioAnalyser(sound.current, 256)),
    []
  );
  useFrame(({ clock }, dt) => {
    if (analyser.current) {
      const data = analyser.current.getAverageFrequency();
      // avgFreq.current.scale.x = avgFreq.current.scale.y = avgFreq.current.scale.z =
      //   data / 100;

      scale.current = 0 + data / 10;
      displaceRef.current.scale = THREE.MathUtils.lerp(
        displaceRef.current.scale,
        scale.current,
        0.35
      );
    }
  });

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group>
      <Sphere
        ref={avgFreq}
        args={[0.3, 128, 128]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <LayerMaterial
          lighting={"physical"}
          transmission={1}
          roughness={0}
          thickness={1}
          color={"white"}
          toneMapped={false}
        >
          <Displace ref={displaceRef} scale={0} strength={0.07} />
        </LayerMaterial>
      </Sphere>
    </group>
  );
};
