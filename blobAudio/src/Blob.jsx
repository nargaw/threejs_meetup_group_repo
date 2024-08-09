import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
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
    const {frequency, amplitude, speed, color, lowerLimit, upperLimit } = useControls({
        frequency: {
            value: 0.75,
            min: 0.05,
            max: 1.0,
            step: 0.01
        },
        amplitude: {
            value: 0.25,
            min: 0.05,
            max: 1.0,
            step: 0.01
        },
        speed: {
            value: 0.45,
            min: 0.25,
            max: 1.0,
            step: 0.01
        },
        color: '#101517',
        lowerLimit: {
            value: 0.25,
            min: 0.01,
            max: 2.0,
            step: 0.01
        },
        upperLimit: {
            value: 2.5,
            min: 2.0,
            max: 10.0,
            step: 0.01
        },
    })

    
    //references for the sound and analyser
    const sound = useRef()
    const analyser = useRef()
    const [listener] = useState(() => new THREE.AudioListener())
    
    //get camera
    const {camera} = useThree()

    //format/audio listner
    const fftSize = 128
    
    //load audio
    const buffer = useLoader(THREE.AudioLoader, './Audio/new-adventure-matrika.ogg')


    useEffect(() => {
        //set sound params
        sound.current.setBuffer(buffer)
        sound.current.setLoop(true)
        sound.current.setVolume(0.5)

        //play sound if clicked
        if(songStatus)sound.current.play()    
        camera.add(listener)
        
        analyser.current = new THREE.AudioAnalyser(sound.current, fftSize)
    
        //remove listener when finished
        return () => {camera.remove(listener)}
    }, [songStatus])

    
    
    //This is the shader material
    //It has uniforms, a fragment shader and a vertex shader
    //The uniform values are sent to the fragment and vertex shaders
    const material = new THREE.ShaderMaterial({
        // wireframe: true,
        // depthWrite: true,
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
            u_audio: { value: 0}, //analyser data goes here
            u_lowerLimit: { value: lowerLimit},
            u_upperLimit: { value: upperLimit},
        }
    })

    //get the current time as experience starts
    let currentTime = 0
    useThree((state) => {
        currentTime = state.clock.elapsedTime
    })

    //here the uniform values are update on each frame
    useFrame(({clock, camera}) => {
        if(analyser){ 
            analyser.current.getFrequencyData() //get current frequency data
            material.uniforms.u_audio.value = analyser.current.getAverageFrequency() //give the average frequency data to the uniform value
        }
        material.uniforms.u_cameraPosition.value = camera.position
        material.uniforms.u_time.value = clock.elapsedTime - currentTime
        material.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)        
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

        //audio object
        <audio ref={sound} args={[listener]}/>
    </>
}