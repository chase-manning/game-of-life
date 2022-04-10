import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface LifeState {
  width: number;
  height: number;
  cells: Record<number, Record<number, boolean>>;
}

const initialState: LifeState = {
  width: 20,
  height: 15,
  cells: {},
};

export const lifeSlice = createSlice({
  name: "life",
  initialState,
  reducers: {
    step: (state) => {
      state.cells = {};
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
  },
});

export const { step, toggle } = lifeSlice.actions;

export const selectCells = (state: RootState) => state.life.cells;
export const selectWidth = (state: RootState) => state.life.width;
export const selectHeight = (state: RootState) => state.life.height;

export default lifeSlice.reducer;
