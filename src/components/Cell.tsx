import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCells, selectWidth, toggle } from "../state/lifeSlice";

const StyledCell = styled.button`
  display: flex;
  width: 100%;
  aspect-ratio: 1;
  border: solid 1px var(--border);
  cursor: pointer;
`;

interface Props {
  index: number;
}

const Cell = ({ index }: Props) => {
  const width = useSelector(selectWidth);
  const cells = useSelector(selectCells);
  const dispatch = useDispatch();

  const x = index % width;
  const y = Math.floor(index / width);

  return (
    <StyledCell
      onClick={() => dispatch(toggle({ x, y }))}
      style={{
        background: cells[x] && cells[x][y] ? "var(--main)" : "var(--bg)",
      }}
    />
  );
};

export default Cell;
