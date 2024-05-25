import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CursorShader from './CursorShader'

export default function Experience()
{
    return(
        <> 
            <Canvas >
                {/* <OrbitControls />  */}
                <CursorShader />
            </Canvas>
        </>
    )
}