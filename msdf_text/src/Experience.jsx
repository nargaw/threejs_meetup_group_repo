import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import DynamicText from './DynamicText'

export default function Experience()
{
    return(
        <> 
            <Canvas camera={{position: [0, 0, 3]}}>
                {/* <OrbitControls />  */}
                <DynamicText />
            </Canvas>
        </>
    )
}