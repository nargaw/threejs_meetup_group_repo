import "./styles.css";
import { Physics } from "@react-three/rapier";
import Experience from "./Experience";

export default function App() {
  return (
    <Physics debug>
      <Experience />
    </Physics>
  );
}
