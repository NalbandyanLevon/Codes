import { createSlice } from "@reduxjs/toolkit";
import axiosWeather from "./weatherAPI";

interface IWeather {
  data?: {
    name: string;
    main: {
      temp: number;
    };
    clouds: {
      all: number;
    };
    weather: [
      {
        icon: string;
        description: string;
        main: string;
      }
    ];
  } | null;
  isLoading?: boolean;
  isError?: boolean;
}

let initialState: IWeather = {
  data: null,
  isLoading: false,
  isError: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: {
    [axiosWeather.pending.type]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [axiosWeather.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [axiosWeather.rejected.type]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const weatherReducer = weatherSlice.reducer;
