import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const loader = new THREE.TextureLoader()
const image = loader.load('./Image/night.jpg')
console.log(image)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
scene.add(camera)
camera.position.set(0, 0, 5)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 3
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)
renderer.setClearColor(new THREE.Color(0x1f1f1f))

/**
 * Mouse
 */
let mouseX
let mouseY

/**
 * Geometry
 */
const geometry = new THREE.PlaneGeometry(1, 1)

/**
 * Material
 */
const materialParameters = {}
materialParameters.color = '#ffffff'

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms:
    {
        uTime: new THREE.Uniform(0),
        uMouse: new THREE.Uniform(new THREE.Vector2(mouseX, mouseY)),
        uTexture: new THREE.Uniform(image)
    },
    side: THREE.DoubleSide,
    transparent: true,
})

// const testMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0xff0000)})

/**
 * Mesh
 */
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// gui
//     .addColor(materialParameters, 'color')
//     .onChange(() =>
//     {
//         material.uniforms.uColor.value.set(materialParameters.color)
//     })


/**
 * SetMouse
 */
addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / sizes.width);
    mouseY = (e.clientY / sizes.height) + 1;
})



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    material.uniforms.uTime.value = elapsedTime
    material.uniforms.uMouse.value = new THREE.Vector2(mouseX, mouseY)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()