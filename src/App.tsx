import styled from "styled-components";
import Controls from "./components/Controls";
import Grid from "./components/Grid";

const StyledApp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: pink;
`;

const App = () => {
  return (
    <StyledApp>
      <Grid />
      <Controls />
    </StyledApp>
  );
};

export default App;
