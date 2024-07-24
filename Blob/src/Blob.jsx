import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Blob()
{
    console.log(fragmentShader, vertexShader)
    const meshRef = useRef()
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            u_cameraPosition: {value: new THREE.Uniform(new THREE.Vector3())},
            u_time: { type: "f", value: 1.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.inner) },
            u_mouse: { type: "v2", value: new THREE.Vector2() },
            u_frequency: {value: 0.85 },
            u_amplitude: {value: 0.75},
            u_speed: { value: .2}
        }
    })

    let currentTime = 0
    let mouseX
    let mouseY
    
    useThree((state) => {
        currentTime = state.clock.elapsedTime
    })

    useFrame(({clock, camera}) => {
        material.uniforms.u_cameraPosition.value = camera.position
        material.uniforms.u_time.value = clock.elapsedTime - currentTime
        material.uniforms.u_mouse.value = new THREE.Vector2(mouseX, mouseY)
    })

    return <>
        {/* <OrbitControls autoRotate/>  */}
        <mesh ref={meshRef} material={material}>
            <icosahedronGeometry args={[1.25, 128]}/>
        </mesh>
    </>
}