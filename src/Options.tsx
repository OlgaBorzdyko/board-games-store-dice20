import styled from 'styled-components'

const Options = ({
  onLeftClick,
  onRightClick
}: {
  onLeftClick: () => void
  onRightClick: () => void
}) => {
  return (
    <OptionsWrapper>
      <SideText align="left" onClick={onLeftClick}>
        Shops
      </SideText>
      <SideText align="right" onClick={onRightClick}>
        To buy
      </SideText>
    </OptionsWrapper>
  )
}

export default Options

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  position: absolute;
`

const SideText = styled.button`
  all: unset;
  position: relative;
  text-align: ${({ align }) => align};
  font-size: 90px;
  font-weight: 700;
  color: gray;
  z-index: 1;
  mix-blend-mode: difference;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: -50px;

  &::after {
    content: '';
    background-color: #0ff;
    transition: width 0.3s ease;
    position: absolute;
    left: 0;
    bottom: 10px;
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
