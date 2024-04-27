// "Bola de Sorvete" (https://skfb.ly/oyvYA) by gelmi.com.br is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

import { useGLTF, useTexture } from "@react-three/drei"

export default function IceCream()
{
    //load model
    const {nodes} = useGLTF('./Models/icecream/icecream.glb')

    //load textures
    const bottomDiffuse = useTexture('./Models/icecream/Casquinha_diffuse.jpeg')
    bottomDiffuse.flipY = false
    const bottomNormal = useTexture('./Models/icecream/Casquinha_normal.png')
    bottomNormal.flipY = false
    const topDiffuse = useTexture('./Models/icecream/Sorvete_diffuse.jpeg')
    topDiffuse.flipY = false
    const topNormal = useTexture('./Models/icecream/Sorvete_normal.jpeg')
    topNormal.flipY = false

    return <>
        <mesh
            scale={[0.01, 0.01, 0.01]}
            geometry={nodes.SORVETE_Casquinha_0.geometry}
        >
            <meshStandardMaterial normalMap={bottomNormal} map={bottomDiffuse} />
        </mesh>
        <mesh
            scale={[0.01, 0.01, 0.01]}
            geometry={nodes.SORVETE_Sorvete_0.geometry}
        >
            <meshStandardMaterial normalMap={topNormal} map={topDiffuse} />
        </mesh>
    </>
}