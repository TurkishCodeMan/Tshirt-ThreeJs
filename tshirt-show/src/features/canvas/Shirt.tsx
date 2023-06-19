import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { folder, useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
};

type PosType = [x: number, y: number, z: number];

export const Shirt = () => {
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF("/shirt_baked.glb") as GLTFResult;

  const [logoPos, setLogoPos] = React.useState<PosType>([0, 0.04, 0.1]);
  const [logoRot, setLogoRot] = React.useState<PosType>([0, 0, 0]);

  const [fullPos, setFullPos] = React.useState<PosType>([0, 0, 0]);
  const [fullRot, setfullRot] = React.useState<PosType>([0, 0, 0]);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const { LogoScale, FullScale } = useControls({
    LogoScale: { value: 1, min: 0, max: 2 },
    FullScale: { value: 1, min: 0, max: 2 },
  });

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  function calculatePos(local: THREE.Matrix4) {
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    local.decompose(position, quaternion, scale);
    const rotation = new THREE.Euler().setFromQuaternion(quaternion);
    return { position, rotation };
  }

  return (
    <>
      {(!snap.intro && snap.isDragHand || snap.isDragHandFull) &&(
        <group renderOrder={2} position={[0, 0, 0]}>
          <PivotControls
            scale={0.4}
            depthTest={false}
            activeAxes={[true, true, false]}
            onDrag={(local) => {
              const { position, rotation } = calculatePos(local);
              if (snap.isDragHand) {
                setLogoPos([position.x, position.y + 0.15, 0.1]);
                setLogoRot([rotation.x, rotation.y, rotation.z]);
              } else if (snap.isDragHandFull) {
                {
                  setFullPos([position.x, position.y + 0.15, 0.2]);
                  setfullRot([rotation.x, rotation.y, rotation.z]);
                }
              }
            }}
          />
        </group>
      )}
      <group renderOrder={1} key={stateString}>
        <mesh
          castShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-roughness={1}
          dispose={null}
         
        >
          {snap.isFullTexture && (
            <Decal
              position={fullPos}
              rotation={fullRot}
              scale={1 * FullScale}
              map={fullTexture}
              map-anisotropy={16}
              depthTest={true}
              
            />
          )}
          {snap.isLogoTexture && (
            <Decal
              
              position={logoPos}
              rotation={logoRot}
              scale={0.15 * LogoScale}
              map={logoTexture}
              map-anisotropy={16}
              depthTest={true}
            />
          )}
        </mesh>
      </group>
    </>
  );
};
