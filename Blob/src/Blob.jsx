import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { useControls } from 'leva'

export default function Blob()
{
    //Ref for the mesh 
    const meshRef = useRef()

    //useControls from leva creates a UI to control the shader values frequency, amplitude and speed and sent to the shader material
    const {frequency, amplitude, speed, color } = useControls({
        frequency: {
            value: 0.75,
            min: 0.25,
            max: 1.0,
            step: 0.01
        },
        amplitude: {
            value: 0.75,
            min: 0.25,
            max: 1.0,
            step: 0.01
        },
        speed: {
            value: 0.45,
            min: 0.25,
            max: 1.0,
            step: 0.01
        },
        color: '#6b92a7',
    })

    //This is the shader material
    //It has uniforms, a fragment shader and a vertex shader
    //The uniform values are sent to the fragment and vertex shaders
    const material = new THREE.ShaderMaterial({
        // wireframe: true,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            u_cameraPosition: {value: new THREE.Vector3()},
            u_time: { value: 1.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.inner) },
            u_frequency: {value: frequency },
            u_amplitude: {value: amplitude},
            u_speed: { value: speed},
            u_color: {value: new THREE.Color(color)}
        }
    })

    //get the current time as experience starts
    let currentTime = 0
    useThree((state) => {
        currentTime = state.clock.elapsedTime
    })

    //here the uniform values are update on each frame
    useFrame(({clock, camera}) => {
        material.uniforms.u_cameraPosition.value = camera.position
        material.uniforms.u_time.value = clock.elapsedTime - currentTime
        material.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
        material.uniforms.u_color.value = new THREE.Color(color)
    })

    return <>
        {/* Here is our mesh - it takes the shader material and reference  */}
        {/* It also needs a geometry the arguments are the size and how divide the mesh is - no of vertices */}
        {/* <OrbitControls /> */}
        <mesh ref={meshRef} material={material}>
            <icosahedronGeometry args={[1.25, 128]}/>
        </mesh>
    </>
}