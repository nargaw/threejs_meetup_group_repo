import { OrbitControls } from "@react-three/drei";
import Box from "./Box";
import Objects from "./Objects";

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <Box />
      <Objects />
    </>
  );
}
