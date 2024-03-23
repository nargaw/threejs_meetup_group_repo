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
const image = loader.load('./night.jpg')
// console.log(image)

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
const meshSize = 2
const geometry = new THREE.PlaneGeometry(meshSize, meshSize, 128, 128)


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

/**
 * Mesh
 */
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * fixMouse
 */
const topLeft = new THREE.Vector3(
    mesh.position.x - meshSize / 2,
    mesh.position.y + meshSize /2,
    mesh.position.z
)
const bottomLeft = new THREE.Vector3(
    mesh.position.x - meshSize / 2,
    mesh.position.y - meshSize /2,
    mesh.position.z
)
const topRight = new THREE.Vector3(
    mesh.position.x + meshSize / 2,
    mesh.position.y + meshSize /2,
    mesh.position.z
)
const bottomRight = new THREE.Vector3(
    mesh.position.x + meshSize / 2,
    mesh.position.y - meshSize /2,
    mesh.position.z
)

topLeft.project(camera)
bottomLeft.project(camera)
topRight.project(camera)
bottomRight.project(camera)

const topLeftX = (1 + topLeft.x) / 2 * sizes.width
const topLeftY = (1 - topLeft.y) / 2 * sizes.height
const topRightX = (1 + topRight.x) / 2 * sizes.width
const bottomRightY = (1 - bottomRight.y) / 2 * sizes.height

const meshLeftPixel = topLeftX
const meshRightPixel = topRightX
const meshTopPixel = topLeftY
const meshBottomPixel = bottomRightY

const remap = (value, low1, high1, low2, high2 ) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}

/**
 * SetMouse
 */
addEventListener('mousemove', (e) => {
    if(e.clientX >= meshLeftPixel && e.clientX <= meshRightPixel){
        mouseX = remap(e.clientX, meshLeftPixel, meshRightPixel, 0, 1)
    }
    if(e.clientY >= meshTopPixel && e.clientY <= meshBottomPixel){
        mouseY = remap(e.clientY, meshTopPixel, meshBottomPixel, 1, 0)
    }
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