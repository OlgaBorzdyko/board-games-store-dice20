import styled from 'styled-components'

const Title = () => {
  return (
    <TitleWrapper>
      <TitleText>Roll a Die</TitleText>
    </TitleWrapper>
  )
}

export default Title

const TitleWrapper = styled.div`
  height: 700px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
    top: 10%;
`

const TitleText = styled.h1`
  font-size: 300px;
  position: absolute;
  margin: 0;
  color: gray;
  mix-blend-mode: difference;
  pointer-events: none;
`
