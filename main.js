import "./style.css"
import * as THREE from "three"
import lights_toon_fragmentGlsl from "three/src/renderers/shaders/ShaderChunk/lights_toon_fragment.glsl.js";

// Scene
const scene = new THREE.Scene()

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83"
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}


//Light
const light = new THREE.PointLight(0xffffff, 50,100)
light.position.set(10,10,10)
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas } )
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene, camera)

//Resize
window.addEventListener('resize', ()=>{
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()