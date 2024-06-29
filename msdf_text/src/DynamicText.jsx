import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/Addons.js'
import { MSDFTextGeometry, MSDFTextMaterial, uniforms } from "three-msdf-text-utils";
import fragmentShader from './Shaders/fragment.glsl'
import vertexShader from './Shaders/vertex.glsl'

export default function DynamicText()
{
    console.log(uniforms)
    const meshRef = useRef()
    const fnt = './Font/MrsSheppards-msdf.json'
    const png = './Font/MrsSheppards.png'
    const loader = new THREE.TextureLoader()
    const fontLoader = new FontLoader()
    console.log(fnt)
    
    const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        defines: {
            IS_SMALL: false,
        },
        extensions: {
            derivatives: true,
        },
        vertexShader: vertexShader ,
        fragmentShader: fragmentShader,
        uniforms: {
            // Common
            ...uniforms.common,
            
            // Rendering
            ...uniforms.rendering,
            
            // Strokes
            ...uniforms.strokes,
            ...{
                uStrokeColor: {value: new THREE.Color(0x0000ff)}
            },
            u_cameraPosition: {value: new THREE.Vector3()},
            u_time: { type: "f", value: 1.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        },
    })

    const fontImage = loader.load(png)
    const fontJson = fontLoader.load(fnt, (font) => {
        const f = font
        const fontGeometry = new MSDFTextGeometry({
            text: "three",
            font: f.data
        })
        
        material.uniforms.uMap.value = fontImage
        if(meshRef.current){
            meshRef.current.geometry = fontGeometry
            meshRef.current.scale.set(0.025, -0.025, 0.025)
            meshRef.current.position.x = -1.125
        }
        // console.log(fontGeometry.computeBoundingBox())
    })

    let currentTime = 0

    useFrame(({clock, camera}) => {
        material.uniforms.u_time.value = clock.elapsedTime - currentTime
        // console.log(material.uniforms.u_time.value)
    })

    return <>
        <mesh 
            ref={meshRef}
            material={material}
        />
        
    </>
}