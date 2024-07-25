import { Canvas} from '@react-three/fiber'
import Blob from './Blob'

export default function Experience()
{
    return(
        <> 
            {/* The whole experience goes inside the canvas from React-three-fiber - the camera position value is adjusted */}
            <Canvas camera={{position: [0, 0, 3]}}>
                {/* The blob component contains the whole 3D scene */}
                <Blob />
            </Canvas>
        </>
    )
}