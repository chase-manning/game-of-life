import { createSlice, PayloadAction, Selector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface LifeState {
  width: number;
  height: number;
  cells: Record<number, Record<number, boolean>>;
  playing: boolean;
}

const initialState: LifeState = {
  width: 100,
  height: 100,
  cells: {},
  playing: false,
};

export const lifeSlice = createSlice({
  name: "life",
  initialState,
  reducers: {
    step: (state) => {
      let newCells = JSON.parse(JSON.stringify(state.cells));
      for (let x = 0; x < state.width; x++) {
        for (let y = 0; y < state.height; y++) {
          let neighbors = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              if (
                state.cells[(x + i + state.width) % state.width] &&
                state.cells[(x + i + state.width) % state.width][
                  (y + j + state.height) % state.height
                ]
              ) {
                neighbors++;
              }
            }
          }
          if (state.cells[x] && state.cells[x][y]) {
            if (neighbors < 2 || neighbors > 3) {
              newCells[x][y] = false;
            }
          } else {
            if (neighbors === 3) {
              if (newCells[x]) newCells[x][y] = true;
              else newCells[x] = { [y]: true };
            }
          }
        }
      }
      state.cells = newCells;
    },
    toggle: (state, action: PayloadAction<{ x: number; y: number }>) => {
      if (state.cells[action.payload.x]) {
        state.cells[action.payload.x][action.payload.y] =
          !state.cells[action.payload.x][action.payload.y];
      } else {
        state.cells[action.payload.x] = {};
        state.cells[action.payload.x][action.payload.y] = true;
      }
    },
    play: (state) => {
      state.playing = true;
    },
    pause: (state) => {
      state.playing = false;
    },
    clear: (state) => {
      state.cells = {};
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});

export const { step, toggle, play, pause, clear, setHeight, setWidth } =
  lifeSlice.actions;

export const selectCells = (state: RootState) => state.life.cells;
export const selectWidth = (state: RootState) => state.life.width;
export const selectHeight = (state: RootState) => state.life.height;
export const selectPlaying = (state: RootState) => state.life.playing;

export function selectAlive(
  x: number,
  y: number
): Selector<RootState, boolean> {
  return (state: RootState) => {
    return state.life.cells[x] && state.life.cells[x][y];
  };
}

export default lifeSlice.reducer;
