import { useState, useEffect, useRef, Suspense } from "react";
import { request } from "graphql-request";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text, useTexture, PerspectiveCamera } from "@react-three/drei";
import { PlaySound } from "./PlaySound";
import { getRelease } from "./queries";

export const ApiTest = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [releaseData, setReleaseData] = useState([]);

  const [inputValue, setInputValue] = useState({
    soundHandle: "raeisla",
    releaseSlug: "thank-you-im-sorry-i-love-you",
  });
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const link = inputRef.current.value;
    const soundHandle = link.split("/")[link.split("/").length - 2];
    const releaseSlug = link.split("/")[link.split("/").length - 1];
    setInputValue({ soundHandle: soundHandle, releaseSlug: releaseSlug });
  };

  useEffect(() => {
    request({
      url: "https://api.sound.xyz/graphql",
      document: getRelease,
      variables: {
        soundHandle: inputValue.soundHandle,
        releaseSlug: inputValue.releaseSlug,
      },
      requestHeaders: {
        "X-Sound-Client-Key": "91f01600-9b59-4dbb-a55d-e391a9f5f7c4",
      },
    })
      .then((data) => {
        setIsLoaded(true);
        setReleaseData(data.mintedRelease);
      })
      .catch((error) => console.log(error));
  }, [inputValue]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <form className="formWrapper" onSubmit={handleSubmit}>
          <input
            className="soundInput"
            ref={inputRef}
            type="text"
            placeholder="https://www.sound.xyz/jameecornelia/direct-deposit-ft-jazzy-tha-rapper"
          />
          <button className="button" type="submit">
            Explore
          </button>
        </form>
        <div style={{ width: "400px", height: "400px" }}>
          <Canvas gl={{ preserveDrawingBuffer: true }}>
            <Scene releaseData={releaseData} />
          </Canvas>
        </div>
      </>
    );
  }
};

const Scene = ({ filename = "canvas", releaseData }) => {
  const gl = useThree((state) => state.gl);

  const texture = useTexture(releaseData.coverImage.url);

  const coverRef = useRef();
  useFrame((state, delta) => {
    coverRef.current.rotation.z += delta * 0.5;
  });

  const [play, setPlay] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [releaseData]);

  return (
    <>
      <PerspectiveCamera position={[0, 0, 1]} makeDefault toneMapped={false} />
      <color attach="background" args={["#1a1a1a"]} toneMapped={false} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Text color="white" anchorX="center" anchorY="middle" fontSize="0.1">
        {releaseData.title}, {releaseData.artist.name}
      </Text> */}
      {releaseData && (
        <>
          <PlaySound
            url={releaseData.track.revealedAudio.url}
            play={play}
            loaded={loaded}
          />
          <group ref={coverRef} onClick={() => setPlay(!play)}>
            <Suspense fallback={null}>
              <mesh position={[0, 0, -1]}>
                <boxGeometry args={[0.8, 0.8, 0.02]} />
                <meshStandardMaterial map={texture} />
              </mesh>
            </Suspense>
          </group>
        </>
      )}
    </>
  );
};
