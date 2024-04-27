import { useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import useScrolly from "./stores/useScrolly";

export default function Scrolly()
{
    //manage global state
    const pagePositionValue = useScrolly(state => state.pageValue)
    const setPageValue = useScrolly(state => state.setPageValue)


    const scroll = useScroll()
    
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

        const r1 = scroll.range(0/5, 5/5)
        
        if(r1 <= 0.2){
            state.camera.position.lerp(originalPosition, 0.01)
            state.camera.lookAt(objectLocation1)
            setPageValue(0)
        }

        if(r1 > 0.2 && r1 <= 0.4){
            state.camera.position.lerp(cameraPos1, 0.01)
            state.camera.lookAt(objectLocation1)
            setPageValue(1)
        }

        if(r1 > 0.4 && r1 <= 0.6){
            state.camera.position.lerp(cameraPos2, 0.01)
            state.camera.lookAt(objectLocation2)
            setPageValue(2)
        }

        if(r1 > 0.6 && r1 <= 0.8){
            state.camera.position.lerp(cameraPos3, 0.01)
            state.camera.lookAt(objectLocation3)
            setPageValue(3)
        }

        if(r1 > 0.8){
            state.camera.position.lerp(cameraPos4, 0.01)
            state.camera.lookAt(objectLocation4)
            setPageValue(4)
        } 
    })
}
