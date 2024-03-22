import * as THREE from 'three'
import './style.css'
// import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const fontLoader = new FontLoader()
console.log(fontLoader)
fontLoader.load(
    '/fonts/gentilis_bold.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()
        const matcapTexture = new THREE.TextureLoader().load('/matcap/1.png')
        const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        const text = new THREE.Mesh(textGeometry,material)
        scene.add(text)
        
        const geometry = new THREE.TorusGeometry(0.2,0.1,64,64)
        for(let i = 0; i < 300; i++) {
            const mesh = new THREE.Mesh(geometry,material)
            mesh.position.x = (Math.random() - 0.5) * 10
            mesh.position.y = (Math.random() - 0.5) * 10
            mesh.position.z = (Math.random() - 0.5) * 10
            mesh.rotation.x = Math.random() * Math.PI
            mesh.rotation.y = Math.random() * Math.PI
            const random = Math.random()
            mesh.scale.set(random, random, random)
            scene.add(mesh)
        }
    }
)




// const axes = new THREE.AxesHelper()
// scene.add(axes)

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.set(0,2,3)
scene.add(camera)

// console.log("distance",camera.position.distanceTo(mesh.position))

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

// renderer.render(scene,camera)

// const clock = new THREE.Clock()
// gsap.to(mesh.position,{duration:1,delay:1,x:2})
// gsap.to(mesh.position,{duration:1,delay:2,x:0})
// gsap.to(mesh.rotation,{duration:2,delay:1,y:Math.PI})

const loop = () => {
    // console.log("loop")
    controls.update()
    // const elapseTime = clock.getElapsedTime()
    // mesh.position.x = Math.sin(elapseTime)
    // mesh.position.y = Math.cos(elapseTime)
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()

window.addEventListener("resize",()=>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height)
})

window.addEventListener("dblclick",()=>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement) 
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    } 
    else 
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})