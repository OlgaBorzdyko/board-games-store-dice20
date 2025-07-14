import styled from 'styled-components'

const Options = () => {
  return (
    <OptionsWrapper>
      <SideText style={{ textAlign: 'left' }}>Shops</SideText>
      <SideText style={{ textAlign: 'right' }}>To buy</SideText>
    </OptionsWrapper>
  )
}

export default Options

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
`

const SideText = styled.div`
  font-size: 90px;
  font-weight: 700;
  margin: 12%;
  color: gray;
  mix-blend-mode: difference;
`
