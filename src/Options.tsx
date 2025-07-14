import styled from 'styled-components'

const Options = () => {
  return (
    <OptionsWrapper>
      <SideText align="left">Shops</SideText>
      <SideText align="right">To buy</SideText>
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
  position: relative;
  text-align: ${({ align }) => align};
  font-size: 90px;
  font-weight: 700;
  margin: 12%;
  color: gray;
  z-index: 1;
  mix-blend-mode: difference;

  &::after {
    content: '';
    background-color: #0ff;
    transition: width 0.3s ease;
    position: absolute;
    left: 0;
    bottom: -140px;
    width: 0;
    height: 3px;
    box-shadow: 0 0 10px #0ff, 0 0 20px #0ff;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: 1s ease;
  }
`
