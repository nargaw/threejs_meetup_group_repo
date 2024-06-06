import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Experience()
{
    return(
        <> 
            <Canvas camera={{position: [0, 0, 3]}}>
                <OrbitControls /> 
                <mesh>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshNormalMaterial />
                </mesh>
            </Canvas>
        </>
    )
}