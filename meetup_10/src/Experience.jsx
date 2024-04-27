import { Canvas } from '@react-three/fiber'
import { Stage, PresentationControls, ScrollControls } from '@react-three/drei'
import Scrolly from './Scrolly'
import Burger from './Burger'
import Sushi from './Sushi'
import IceCream from './IceCream'
import useScrolly from './stores/useScrolly'
import TextDisplay from './TextDisplay'

export default function Experience()
{

    //get global state
    const pagePositionValue = useScrolly(state => state.pageValue)
    
    //everything is inside the canvas tag

    //ScrollControls - set the number of pages to scroll through

    //Scrolly - manage the scroll sequence

    //PresentationControls - allow to control camera view using mouse

    //conditional rendering of models based on global state

    //TextDisplay - render text component based on global state

    return(
        <>  
            <Canvas camera={{position: [0, 0, 40]}}>
                <ScrollControls pages={5}>
                <Scrolly />
                <Stage shadows={false}>
                    <PresentationControls 
                        global 
                        rotation={ [ 0., 0.0, 0 ] }
                        polar={ [ -Math.PI * 0.15,  Math.PI * 0.15 ] }
                        azimuth={ [ -Math.PI * 0.5,  Math.PI * 0.5 ] }
                        config={ { mass: 2, tension: 50 } }
                        snap={ { mass: 2, tension: 50 } }
                    >
                        {pagePositionValue === 1 && <Burger />}
                        {pagePositionValue === 2 && <Sushi />}
                        {pagePositionValue === 3 && <IceCream />}
                    </PresentationControls>
                </Stage>
                <TextDisplay />
                </ScrollControls> 
            </Canvas> 
        </>
    )
}