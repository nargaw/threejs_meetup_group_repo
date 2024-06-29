import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import DynamicText from './DynamicText'

export default function Experience()
{
    return(
        <> 
            <Canvas camera={{position: [0, 0, 3]}}>
                <OrbitControls /> 
                <Center>
                    <DynamicText />
                </Center>
            </Canvas>
        </>
    )
}