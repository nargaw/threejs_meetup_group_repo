import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import Burger from './Burger'
import Sushi from './Sushi'

export default function Experience()
{
    return(
        <> 
            <Canvas camera={{position: [0, 0, 3]}}>
                <OrbitControls 
                    autoRotate
                    rotateSpeed={0.05}
                /> 
                <Stage>
                    {/* <Burger /> */}
                    <Sushi />
                </Stage>
            </Canvas>
        </>
    )
}