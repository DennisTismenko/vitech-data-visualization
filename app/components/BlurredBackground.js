import styled from 'styled-components';

export default styled.div`
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: center center;
  filter: blur(30px) brightness(150%);
  position: absolute;
  top: -100px;
  left: -100px;
  width: calc(100vw + 200px);
  height: ${({ height }) => height};
  z-index: 0;
`;
