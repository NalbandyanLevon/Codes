import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY } from "../weatherSlice/weatherAPI";
import axios from "axios";
import { TempType } from "../../../types";

type Arguments = {
  city?: string;
  tempType?: TempType;
};

type WeatherReq = (arg?: Arguments) => Promise<unknown>;

const weathereReq: WeatherReq = async (arg) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${
        arg?.city ? arg?.city : "Yerevan"
      }&appid=${API_KEY}`
    );
    const tempTypeQuery = arg?.tempType?.f ? "imperial" : "metric";
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${API_KEY}&units=${tempTypeQuery}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const axiosWeatherHours = createAsyncThunk(
  "weatherHours/axiosWeatherHours",
  weathereReq
);

export default axiosWeatherHours;
