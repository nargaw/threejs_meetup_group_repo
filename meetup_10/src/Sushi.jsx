import { useGLTF, useTexture } from "@react-three/drei"

export default function Sushi()
{
    //load model
    const {nodes} = useGLTF('./Models/sushi/sushiModel.glb')

    //load baked texture
    const sushiTexture = useTexture('./Models/sushi/bakedsushi.jpg')
    sushiTexture.flipY = false

    return <>
        {/* apply texture inside material and give geometry to the mesh*/}
        <mesh geometry={nodes.sushi.geometry}>
            <meshStandardMaterial map={sushiTexture}/>
        </mesh>
    </>
}