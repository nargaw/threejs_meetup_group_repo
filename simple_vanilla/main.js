import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//dom element
const canvas = document.querySelector('canvas.webgl')
console.log(canvas)

//sizes
const sizes = {
    width: window.innerWidth,
    height : window.innerHeight
}

//scene
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5
scene.add(camera)


//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(new THREE.Color(0x1f1f1f))

//object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
)
scene.add(mesh)

//controls
const controls = new OrbitControls(
    camera,
    canvas
)
controls.enableDamping = true

//animate
const animate = () => {
    requestAnimationFrame(animate)

    //render
    renderer.render(scene, camera)

    //update controls
    controls.update()
}

animate()

//update screen size
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
})