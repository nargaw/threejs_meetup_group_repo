// "Bola de Sorvete" (https://skfb.ly/oyvYA) by gelmi.com.br is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

import { useGLTF, useTexture } from "@react-three/drei"

export default function IceCream()
{

    const {nodes} = useGLTF('./icecream.glb')
    const bottomDiffuse = useTexture('./Casquinha_diffuse.jpeg')
    bottomDiffuse.flipY = false
    const bottomNormal = useTexture('./Casquinha_normal.png')
    bottomNormal.flipY = false
    const topDiffuse = useTexture('./Sorvete_diffuse.jpeg')
    topDiffuse.flipY = false
    const topNormal = useTexture('./Sorvete_normal.jpeg')
    topNormal.flipY = false

    return <>
        <mesh
            scale={[0.1, 0.1, 0.1]}
            geometry={nodes.SORVETE_Casquinha_0.geometry}
        >
            <meshStandardMaterial normalMap={bottomNormal} map={bottomDiffuse} />
        </mesh>
        <mesh
            scale={[0.1, 0.1, 0.1]}
            geometry={nodes.SORVETE_Sorvete_0.geometry}
        >
            <meshStandardMaterial normalMap={topNormal} map={topDiffuse} />
        </mesh>
    </>
}