import { RigidBody } from "@react-three/rapier";

export default function Box() {
  return (
    <>
      <RigidBody type="fixed">
        <mesh position-x={-2} rotation-y={-Math.PI / 2}>
          <boxGeometry args={[1, 4, 0.05]} />
          <meshNormalMaterial />
        </mesh>
        <mesh position-x={2} rotation-y={-Math.PI / 2}>
          <boxGeometry args={[1, 4, 0.05]} />
          <meshNormalMaterial />
        </mesh>
        <mesh position-y={-2} rotation-x={-Math.PI / 2}>
          <boxGeometry args={[4, 1, 0.05]} />
          <meshNormalMaterial />
        </mesh>
        <mesh position-y={2} rotation-x={-Math.PI / 2}>
          <boxGeometry args={[4, 1, 0.05]} />
          <meshNormalMaterial />
        </mesh>
        <mesh position-z={-0.5} rotation-z={-Math.PI / 2}>
          <boxGeometry args={[4, 4, 0.05]} />
          <meshNormalMaterial />
        </mesh>
        <mesh position-z={0.5} rotation-z={-Math.PI / 2}>
          <boxGeometry args={[4, 4, 0.05]} />
          <meshNormalMaterial visible={false} />
        </mesh>
      </RigidBody>
    </>
  );
}
