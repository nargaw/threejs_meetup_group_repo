import { useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import useScrolly from "./stores/useScrolly";

export default function Scrolly()
{
    //manage global state
    const pagePositionValue = useScrolly(state => state.pageValue)
    const setPageValue = useScrolly(state => state.setPageValue)


    // console.log('scroll')
    const scroll = useScroll()
    // console.log(scroll)
    const cameraPos1 = new THREE.Vector3(0,0,20)
    const cameraPos2 = new THREE.Vector3(0, 10, 10.0)
    const cameraPos3 = new THREE.Vector3(0, 0.0, 2.0)
    const cameraPos4 = new THREE.Vector3(0, 0.0, 0.0)

    const objectLocation1 = new THREE.Vector3(0, 0.0, 0)
    const objectLocation2 = new THREE.Vector3(0, 0.0, 0)
    const objectLocation3 = new THREE.Vector3(0, 0.0, 0)
    const objectLocation4 = new THREE.Vector3(0, 0.0, 0)

    const originalPosition = new THREE.Vector3(0, 10, 70)

    useFrame((state, delta) => {
        const r1 = scroll.range(0/4, 1/4)
        const r2 = scroll.range(1/4, 2/4)
        const r3 = scroll.range(2/4, 3/4)
        const r4 = scroll.range(3/4, 4/4)
        
        if(r1 <= 0.25){
            state.camera.position.lerp(originalPosition, 0.01)
            // state.camera.lookAt(objectLocation1)
            setPageValue(0)
        }

        if(r1 > 0.25 && r2 == 0){
            state.camera.position.lerp(cameraPos1, 0.01)
            state.camera.lookAt(objectLocation1)
            setPageValue(1)
        }
        
        if(r2 > 0.25 && r3 == 0 && r1 == 1){
            state.camera.position.lerp(cameraPos2, 0.01)
            state.camera.lookAt(objectLocation2)
            setPageValue(2)
        }

        if(r3 > 0.25 && r4 == 0){
            state.camera.position.lerp(cameraPos3, 0.01)
            state.camera.lookAt(objectLocation3)
            setPageValue(3)
        }
        if(r4 > 0){
            state.camera.position.lerp(cameraPos4, 0.01)
            state.camera.lookAt(objectLocation4)
            setPageValue(4)
        }
        
    })
}
