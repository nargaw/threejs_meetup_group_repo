import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App'

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Canvas camera={{ fov: 50, position: [0, 0, 10], near: 0.1, far: 100 }}> 
      <App />
    </Canvas>
  </StrictMode>,
)
