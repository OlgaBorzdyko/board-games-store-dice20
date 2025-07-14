import styled from 'styled-components'

import Dice from './Dice'
import ModelAnimation from './ModelAnimation'
import Title from './Title'

const Test = () => {
  return (
    <ModelWrapper>
      <ModelAnimation />
      <DiceWrapper>
        <Dice />
      </DiceWrapper>
      <Title />
    </ModelWrapper>
  )
}
export default Test

const ModelWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
`

const DiceWrapper = styled.div`
  //position: absolute;
  width: 300px;
  height: 300px;
  z-index: 1;
  margin-right: 10%;
`
