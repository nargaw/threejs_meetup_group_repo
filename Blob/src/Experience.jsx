import { Canvas} from '@react-three/fiber'
import Blob from './Blob'

export default function Experience()
{
    

    return(
        <> 
            <Canvas camera={{position: [0, 0, 3]}}>
                <Blob />
            </Canvas>
        </>
    )
}