import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { useControls } from 'leva'
import useSong from './stores/songState'
import { Html } from '@react-three/drei'

export default function Blob()
{
    //global state to check if song is playing
    const songStatus = useSong(state => state.songPlaying)

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

    //audio loader
    //need to get camera and renderer
    let camera = null
    let renderer = null
    useThree((state) => {
        camera = state.camera
        renderer = state.gl
    })

    //format/audio listner
    const fftSize = 128
    const format = ( renderer.capabilities.isWebGL2 ) ? THREE.RedFormat : THREE.LuminanceFormat

    const listener = new THREE.AudioListener()
    if(camera) {
        if(camera.children.length < 1)
        camera.add(listener)
        // console.log(camera)
    }
    
    const analyser = useRef()
    const soundTexture = useRef()
    console.log(soundTexture.current)

    const sound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load('./Audio/new-adventure-matrika.ogg', (buffer) => {
        sound.setBuffer(buffer)
        sound.setLoop(false)
        sound.setVolume(0.5)
        sound.hasPlaybackControl = true
        songStatus == true ? sound.play() : sound.pause()

        analyser.current = new THREE.AudioAnalyser(sound, fftSize)
        soundTexture.current = new THREE.DataTexture(analyser.current.data, 64, 1, format)
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
            u_color: {value: new THREE.Color(color)},
            u_audio: { value: soundTexture.current }
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
        if(analyser.current) analyser.current.getFrequencyData()
        if(meshRef.current.material.uniforms.u_audio.value) meshRef.current.material.uniforms.u_audio.value.needsUpdate = true
        listener.needsUpdate = true
    })

    return <>
        {/* Here is our mesh - it takes the shader material and reference  */}
        {/* It also needs a geometry the arguments are the size and how divide the mesh is - no of vertices */}
        <OrbitControls />
        <mesh 
            ref={meshRef} 
            material={material}
        >
            {/* <meshNormalMaterial /> */}
            <icosahedronGeometry args={[1.25, 128]}/>
        </mesh>
    </>
}