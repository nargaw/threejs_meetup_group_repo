import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'

export default function Experience()
{

    const {nodes, materials} = useGLTF('./hamburger.glb')
    console.log(nodes, materials)
    return(
        <> 
            <Canvas camera={{position: [0, 0, 3]}}>
                <OrbitControls /> 
                <Stage>
                    <mesh 
                        geometry={nodes.bottomBun.geometry}
                        material={materials.BunMaterial}
                        position={nodes.bottomBun.position}
                    />
                    <mesh 
                        geometry={nodes.meat.geometry}
                        material={materials.SteakMaterial}
                        position={nodes.meat.position}
                    />
                    <mesh 
                        geometry={nodes.cheese.geometry}
                        material={materials.CheeseMaterial}
                        position={nodes.cheese.position}
                    />
                    <mesh 
                        geometry={nodes.topBun.geometry}
                        material={materials.BunMaterial}
                        position={nodes.topBun.position}
                    />
                </Stage>
            </Canvas>
        </>
    )
}