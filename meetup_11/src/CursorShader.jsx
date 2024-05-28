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
            u_mouse1: { value: new THREE.Uniform(new THREE.Vector2()) },
            u_mouse2: { value: new THREE.Uniform(new THREE.Vector2()) },
            u_mouse3: { value: new THREE.Uniform(new THREE.Vector2()) },
            u_mouse4: { value: new THREE.Uniform(new THREE.Vector2()) },
            u_mouse5: { value: new THREE.Uniform(new THREE.Vector2()) },
        },
        vertexShader: vertex,
        fragmentShader: fragment
    })
    const DPR = Math.min(window.devicePixelRatio, 1.);
    const overlayGeometry = new THREE.PlaneGeometry(2 * DPR, 2 * DPR, 1, 1)
    const meshRef = useRef()
    
    let mouseX = 0;
    let mouseY = 0;

    let mouseX2 = 0;
    let mouseY2 = 0;

    let mouseX3 = 0;
    let mouseY3 = 0;

    let mouseX4 = 0;
    let mouseY4 = 0;

    let mouseX5 = 0;
    let mouseY5 = 0;

    let tempValX = 0;
    let tempValY = 0;

    useFrame(({clock}) => {
        meshRef.current.material.uniforms.u_time.value = clock.elapsedTime
        meshRef.current.material.uniforms.u_mouse1.value = new THREE.Vector2(mouseX, mouseY)
        meshRef.current.material.uniforms.u_mouse2.value = new THREE.Vector2(mouseX2, mouseY2)
        meshRef.current.material.uniforms.u_mouse3.value = new THREE.Vector2(mouseX3, mouseY3)
        meshRef.current.material.uniforms.u_mouse4.value = new THREE.Vector2(mouseX4, mouseY4)
        meshRef.current.material.uniforms.u_mouse5.value = new THREE.Vector2(mouseX5, mouseY5)
        meshRef.current.material.uniforms.u_resolution.value = new THREE.Vector2(
            window.innerWidth * DPR,
            window.innerHeight * DPR
        )
        mouseX = lerp(mouseX, tempValX, 0.1)
        mouseY = lerp(mouseY, tempValY, 0.1)

        mouseX2 = lerp(mouseX2, tempValX, 0.15)
        mouseY2 = lerp(mouseY2, tempValY, 0.15)

        mouseX3 = lerp(mouseX3, tempValX, 0.2)
        mouseY3 = lerp(mouseY3, tempValY, 0.2)

        mouseX4 = lerp(mouseX4, tempValX, 0.25)
        mouseY4 = lerp(mouseY4, tempValY, 0.25)

        mouseX5 = lerp(mouseX5, tempValX, 0.3)
        mouseY5 = lerp(mouseY5, tempValY, 0.3)
    })

    window.addEventListener('mousemove', (e) => {
        tempValX = (e.clientX / window.innerWidth) ;
        tempValY = -(e.clientY / window.innerHeight) + 1 ;
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