import React, { Suspense, useEffect, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";
import { Analyzer } from "./Analyzer";

export const PlaySound = ({ url, play, loaded }) => {
  // This component creates a suspense block, blocking execution until
  // all async tasks (in this case PositionAudio) have been resolved.
  const sound = useRef();

  useEffect(() => {
    play && sound.current.play();
  }, [play]);
  return (
    <Suspense fallback={null}>
      <PositionalAudio url={url} ref={sound} />
      <Analyzer sound={sound} />
    </Suspense>
  );
};
