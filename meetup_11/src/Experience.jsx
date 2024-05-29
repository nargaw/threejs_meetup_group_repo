import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CursorShader from './CursorShader'

export default function Experience()
{

    const madeWithLoveStyle = {
        fontFamily: 'MadimiOne, sans-serif',
        position: 'absolute',
        left: '50%',
        top: '80%',
        width: '200px',
        transform: 'translate(-50%, -50%)',
        zIndex: '2',
        color: '#f4a261',
    }

    const spanStyle = {

    }

    return(
        <> 
            <Canvas >
                {/* <OrbitControls />  */}
                <CursorShader />
            </Canvas>
            <p style={madeWithLoveStyle}>made with <span>&#9825;</span> by Sost Studio</p>
        </>
    )
}