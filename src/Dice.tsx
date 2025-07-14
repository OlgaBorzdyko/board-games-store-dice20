import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import Options from './Options'

const Dice = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const d20Ref = useRef<THREE.Mesh | null>(null)
  const [rotationEnabled, setRotationEnabled] = useState(false)

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(new THREE.Color(0x000000), 0)
    renderer.setSize(width, height)
    mountRef.current?.appendChild(renderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    const diceTexture = textureLoader.load('src/dice-texture.png')

    const geometry = new THREE.IcosahedronGeometry(1, 0)
    const material = new THREE.MeshPhysicalMaterial({
      map: diceTexture,
      roughness: 0.05,
      reflectivity: 0.5
    })

    const d20 = new THREE.Mesh(geometry, material)
    d20.rotation.set(1, 0, 0.7)
    d20Ref.current = d20
    scene.add(d20)
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 0, 5)
    scene.add(light)
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const animate = () => {
      requestAnimationFrame(animate)
      if (rotationEnabled && d20Ref.current) {
        d20Ref.current.rotation.x += 0.05
        d20Ref.current.rotation.y += 0.05
      }
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [rotationEnabled])

  const handleRollDice = () => {
    setRotationEnabled(true)

    setTimeout(() => {
      setRotationEnabled(false)
    }, 2000)
  }

  return (
    <>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%', position: 'relative', top: '20%' }}
      ></div>
      <Options
        onLeftClick={handleRollDice}
        onRightClick={handleRollDice}
      ></Options>
    </>
  )
}

export default Dice
