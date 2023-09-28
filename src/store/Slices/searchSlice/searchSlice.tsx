import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: "",
    tempType: {
      c: true,
      f: false,
    },
  },
  reducers: {
    toggle(state, { payload }: PayloadAction<"c" | "f">) {
      const alternate = payload === "c" ? "f" : "c";
      if (!state.tempType[payload]) {
        state.tempType[payload] = !state.tempType[payload];
        state.tempType[alternate] = !state.tempType[alternate];
      }
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const { toggle } = searchSlice.actions;
