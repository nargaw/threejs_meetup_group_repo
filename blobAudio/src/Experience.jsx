import {Canvas} from '@react-three/fiber'
import Blob from './Blob'
import { Leva } from 'leva'
import SongUI from './SongUI'

export default function Experience()
{
    return(
        <> 
            <Leva
                fill = {false}
                flat = {false} 
                titleBar = {false}
                collapsed = {false}
                drag = {true}
                hideCopyButton = {true}
            />
             
            {/* The whole experience goes inside the canvas from React-three-fiber - the camera position value is adjusted */}
            <Canvas camera={{position: [0, 0, 3]}}>
                {/* The blob component contains the whole 3D scene */}
                <Blob />
            </Canvas>
            {/* songUI goes outside the canvas - however it is possible to use HTML inside canvas using Drei helper */}
            <SongUI />
        </>
    )
}