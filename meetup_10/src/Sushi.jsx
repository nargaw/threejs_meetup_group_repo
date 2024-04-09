import { useGLTF } from "@react-three/drei"

export default function Sushi()
{

    const sushi = useGLTF('./sushi.glb')
    console.log(sushi)
    return <>
        <primitive object={sushi.scene}/>
    </>
}