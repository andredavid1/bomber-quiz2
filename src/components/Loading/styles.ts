import styled from "styled-components";

interface IContainerProps {
  show: boolean;
}

export const Container = styled.div.attrs((props: IContainerProps) => {
  show: props.show;
})`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  inset: 0;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur( 10px );
  -webkit-backdrop-filter: blur( 10px );
`;