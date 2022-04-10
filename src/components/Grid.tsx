import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectHeight, selectWidth } from "../state/lifeSlice";
import Cell from "./Cell";

interface GridProps {
  width: number;
  height: number;
}

const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(${(props: GridProps) => props.width}, 1fr);
`;

const Grid = () => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);

  return (
    <StyledGrid width={width} height={height}>
      {Array.from(Array(width * height).keys()).map((i) => (
        <Cell key={i} index={i} />
      ))}
    </StyledGrid>
  );
};

export default Grid;
