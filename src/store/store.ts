import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./Slices/weatherSlice/weatherSlice";
import { searchReducer } from "./Slices/searchSlice/searchSlice";
import { weatherHoursReducer } from "./Slices/weatherHoursSlice/weatherHoursSlice";

export const store = configureStore({
  reducer: {
    weatherReducer,
    searchReducer,
    weatherHoursReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
