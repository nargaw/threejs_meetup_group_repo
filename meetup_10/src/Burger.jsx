import { useGLTF } from "@react-three/drei"

export default function Burger()
{
    const {nodes, materials} = useGLTF('./hamburger.glb')
    // console.log(nodes, materials)
    return <>
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
    </>
}