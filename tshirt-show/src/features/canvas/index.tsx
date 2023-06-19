import {
  CameraControls,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Shirt } from "./Shirt";
import { Backdrop } from "./Backdrop";
import { CameraRig } from "./CameraRig";

export const CanvasModel = () => {
  const cameraRef = React.useRef();
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 40 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Backdrop />
        {/* <Center> */}
        <Shirt />
        {/* </Center> */}
      </CameraRig>
    </Canvas>
  );
};
