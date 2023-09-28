import { createSlice } from "@reduxjs/toolkit";
import axiosWeatherHours from "./weatherHoursAPI";

interface IInitialState {
  data: {
    main: any;
    cod: string;
    city: {
      name: string;
    };
    list: {
      main: {
        temp: number;
      };
      dt: number;
      dt_txt: string;
      weather: {
        description: string;
        main: string;
      }[];
    }[];
  } | null;
  isLoading: boolean;
  isError: boolean;
}

let initialState: IInitialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const weatherHoursSlice = createSlice({
  name: "weatherHours",
  initialState,
  reducers: {},
  extraReducers: {
    [axiosWeatherHours.pending.type]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [axiosWeatherHours.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [axiosWeatherHours.rejected.type]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const weatherHoursReducer = weatherHoursSlice.reducer;
