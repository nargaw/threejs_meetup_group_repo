import { useFrame, Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'
import { lerp } from 'three/src/math/MathUtils.js'

export default function Shader()
{
    const overlayMaterial = new THREE.ShaderMaterial({
        uniforms: 
        {
            u_time: { value: new THREE.Uniform(0)},
            u_resolution: {value: new THREE.Uniform(new THREE.Vector2()) },
            u_mouse: { value: new THREE.Uniform(new THREE.Vector2()) },
        },
        vertexShader: vertex,
        fragmentShader: fragment
    })
    const DPR = Math.min(window.devicePixelRatio, 1.);
    const overlayGeometry = new THREE.PlaneGeometry(2 * DPR, 2 * DPR, 1, 1)
    const meshRef = useRef()
    let mouseX = 0;
    let mouseY = 0;

    useFrame(({clock}) => {
        meshRef.current.material.uniforms.u_time.value = clock.elapsedTime
        meshRef.current.material.uniforms.u_mouse.value = new THREE.Vector2(mouseX, mouseY)
        meshRef.current.material.uniforms.u_resolution.value = new THREE.Vector2(
            window.innerWidth * DPR,
            window.innerHeight * DPR
        )
    })

    addEventListener('mousemove', (e) => {
        console.log(mouseX)
        mouseX = lerp(mouseX, (e.clientX / window.innerWidth), 0.125) ;
        mouseY = lerp(mouseY,  (-(e.clientY / window.innerHeight) + 1), 0.125) ;
    })

    return(
        <>
            <mesh ref={meshRef}
                material={overlayMaterial}
                geometry={overlayGeometry}
            />
        </>
    )
}