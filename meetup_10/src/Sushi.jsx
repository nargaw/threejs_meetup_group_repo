import { useGLTF } from "@react-three/drei"

export default function Sushi()
{

    const sushi = useGLTF('./Models/sushi/sushi.glb')
    
    return <>
        <primitive object={sushi.scene}/>
    </>
}