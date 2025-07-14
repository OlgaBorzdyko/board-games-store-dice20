import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import styled from 'styled-components'

const ModelAnimation = () => {
  const modelRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    if (!modelRef.current) return

    gsap.to(modelRef.current, {
      rotation: 2,
      transformOrigin: 'center bottom',
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
      scale: 1.02
    })
  }, [])

  return (
    <ModelImage
      alt="model-animation"
      ref={modelRef}
      src="src/dice-bg-model.png"
    />
  )
}

export default ModelAnimation

const ModelImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: 100%;
  object-fit: contain;
  z-index: 0;
  filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.4));
`
