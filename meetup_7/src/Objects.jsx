import { InstancedRigidBodies } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Objects() {
  const rigidBodies = useRef();
  const count = 20;
  const meshes = useRef();

  const instances = useMemo(() => {
    const objects = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2;
      const x = Math.cos(angle) * radius * 0.5;
      const y = Math.sin(angle) * radius * 0.5;
      objects.push({
        key: "instance_" + i,
        position: [x, y, 0],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return objects;
  });

  let upDown;
  let leftRight;

  const handleOrientation = (e) => {
    upDown = -(e.beta / 180) * 2;
    leftRight = (e.gamma / 90 / 2) * 2;
  };

  window.addEventListener("deviceorientation", handleOrientation, true);

  useFrame(() => {
    if (rigidBodies.current) {
      if (leftRight <= 1 && leftRight >= -1) {
        rigidBodies.current.forEach((api) => {
          api.applyImpulse({ x: leftRight * 0.005, y: 0, z: 0 });
        });
      }
      if (upDown <= 1 && upDown >= -1) {
        rigidBodies.current.forEach((api) => {
          api.applyImpulse({ x: 0, y: upDown * 0.005, z: 0 });
        });
      }
    }
  });

  return (
    <>
      <InstancedRigidBodies
        instances={instances}
        ref={rigidBodies}
        type="dynamic"
        colliders="cuboid"
        gravityScale={0}
        canSleep={false}
        friction={0}
        restitution={0.5}
      >
        <instancedMesh
          ref={meshes}
          args={[undefined, undefined, count]}
          dispose={null}
          count={instances.length}
        >
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshNormalMaterial />
        </instancedMesh>
      </InstancedRigidBodies>
    </>
  );
}
