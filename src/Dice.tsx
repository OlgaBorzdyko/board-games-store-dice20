import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import Options from './Options'

const Dice = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const d20Ref = useRef<THREE.Mesh | null>(null)
  const animationPhase = useRef<'none' | 'lift' | 'drop' | 'bounce' | 'rotate'>(
    'none'
  )
  const liftProgress = useRef<number>(0)
  const drop = useRef<number>(0)
  const bounce = useRef<number>(0)
  const bounceCount = useRef<number>(0)
  const liftTo = 1
  const fps = 60
  const maxBounces = 5

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
      if (d20Ref.current) {
        switch (animationPhase.current) {
          case 'lift': {
            const yWay = liftTo / fps
            d20Ref.current.position.y += yWay
            liftProgress.current++
            if (liftProgress.current >= fps) {
              drop.current = 0
              animationPhase.current = 'drop'
            }
            break
          }
          case 'drop': {
            drop.current += 0.05
            d20Ref.current.position.y -= drop.current
            if (d20Ref.current.position.y <= 0) {
              d20Ref.current.position.y = 0
              bounce.current = drop.current * 0.1
              animationPhase.current = 'bounce'
              drop.current = 0
            }
            break
          }
          case 'bounce': {
            bounce.current -= 0.02
            d20Ref.current.position.y += bounce.current
            if (d20Ref.current.position.y <= 0) {
              bounceCount.current++
              console.log(bounceCount)
              if (bounceCount.current >= maxBounces) {
                d20Ref.current.position.y = 0
                animationPhase.current = 'rotate'
              } else {
                bounce.current = 0.5 / bounceCount.current
              }
            }
            break
          }
          case 'rotate': {
            d20Ref.current.rotation.x += 0.05
            d20Ref.current.rotation.y += 0.05
            break
          }
          case 'none':
          default:
            break
        }
      }
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  const handleRollDice = () => {
    console.log(255)
    liftProgress.current = 0
    drop.current = 0
    bounce.current = 0
    bounceCount.current = 0
    animationPhase.current = 'lift'
  }

  return (
    <>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          top: '20%'
        }}
      ></div>
      <Options
        onLeftClick={handleRollDice}
        onRightClick={handleRollDice}
      ></Options>
    </>
  )
}

export default Dice
