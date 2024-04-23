import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, PresentationControls, ScrollControls } from '@react-three/drei'
import Scrolly from './Scrolly'
import Burger from './Burger'
import Sushi from './Sushi'
import IceCream from './IceCream'

export default function Experience()
{
    return(
        <>  
            <Canvas camera={{position: [0, 0, 3]}}>
                <ScrollControls pages={4}>
                {/* <OrbitControls 
                    autoRotate
                    rotateSpeed={0.05}
                />  */}
                <Scrolly />
                <Stage shadows={false}>
                    <PresentationControls 
                        global 
                        rotation={ [ 0., 0.0, 0 ] }
                        polar={ [ 0, 0 ] }
                        azimuth={ [ -Math.PI * 0.5,  Math.PI * 0.5 ] }
                        // azimuth={ [ 0,  0 ] }
                        config={ { mass: 2, tension: 50 } }
                        snap={ { mass: 2, tension: 50 } }
                    >
                        <Burger />
                        <Sushi />
                        <IceCream />
                    </PresentationControls>
                </Stage>
                </ScrollControls>
            </Canvas> 
        </>
    )
}