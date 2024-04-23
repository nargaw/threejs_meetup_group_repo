import { useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'

export default function Scrolly()
{
    // console.log('scroll')
    const scroll = useScroll()
    // console.log(scroll)
    const cameraPos1 = new THREE.Vector3(0,10,20)
    const cameraPos2 = new THREE.Vector3(0, 10, 10.0)
    const cameraPos3 = new THREE.Vector3(0, 10.0, 5.0)

    const objectLocation1 = new THREE.Vector3(0, 0.0, 0)
    const objectLocation2 = new THREE.Vector3(0, 0.0, 0)
    const objectLocation3 = new THREE.Vector3(0, 0.0, 0)

    const originalPosition = new THREE.Vector3(0, 10, 70)

    useFrame((state, delta) => {
        const r1 = scroll.range(0/4, 1/4)
        const r2 = scroll.range(1/4, 2/4)
        const r3 = scroll.range(2/4, 3/4)
        const r4 = scroll.range(3/4, 4/4)
        
        if(r1 <= 0.25){
            state.camera.position.lerp(originalPosition, 0.01)
            // state.camera.lookAt(objectLocation1)
        }

        if(r1 > 0.25 && r2 == 0){
            state.camera.position.lerp(cameraPos1, 0.01)
            state.camera.lookAt(objectLocation1)
        }
        
        if(r2 > 0.25 && r3 == 0 && r1 == 1){
            state.camera.position.lerp(cameraPos2, 0.01)
            state.camera.lookAt(objectLocation2)
        }

        if(r3 > 0.25){
            state.camera.position.lerp(cameraPos3, 0.01)
            state.camera.lookAt(objectLocation3)
        }
        
    })
}
