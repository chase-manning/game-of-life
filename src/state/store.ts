import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import lifeReducer from "./lifeSlice";

export const store = configureStore({
  reducer: {
    life: lifeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
