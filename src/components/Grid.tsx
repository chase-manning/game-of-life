import { MouseEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectCells,
  selectHeight,
  selectWidth,
  toggle,
} from "../state/lifeSlice";

interface GridProps {
  width: number;
  height: number;
}

const StyledGrid = styled.canvas`
  width: 100%;
  height: 100%;
  background: var(--bg);
  cursor: pointer;
`;

const Grid = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const cells = useSelector(selectCells);

  const windowWidth = (window as any).innerWidth;
  const windowHeight = (window as any).innerHeight;
  const canvasWidth = windowWidth * 2;
  const canvasHeight = windowHeight * 2;
  const heightRatio = canvasHeight / height;
  const widthRatio = canvasWidth / width;

  // TODO Abstract out as many canvas size and window stuff out as possible
  // Can we avoid redrawing lines each time?
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = "#C0C0C0";
    for (let i = 0; i < width; i++) {
      ctx.fillRect(
        (canvasWidth / width) * i,
        0,
        widthRatio * 0.1,
        canvasHeight
      );
    }
    for (let i = 0; i < height; i++) {
      ctx.fillRect(
        0,
        (canvasHeight / height) * i,
        canvasWidth,
        heightRatio * 0.1
      );
    }
    ctx.fillStyle = "black";
    for (let i = 0; i < width * height; i++) {
      const x = i % width;
      const y = Math.floor(i / width);
      if (cells[x] && cells[x][y]) {
        ctx.fillRect(
          x * widthRatio + widthRatio * 0.1,
          y * heightRatio + heightRatio * 0.1,
          widthRatio * 0.9,
          heightRatio * 0.9
        );
      }
    }
  }, [cells, width, height]);

  return (
    <StyledGrid
      width={canvasWidth}
      height={canvasHeight}
      onClick={(event: MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        dispatch(
          toggle({
            x: Math.floor((event.clientX / windowWidth) * width),
            y: Math.floor((event.clientY / windowHeight) * height),
          })
        );
      }}
      ref={canvasRef}
    />
  );
};

export default Grid;
