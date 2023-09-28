import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TempType } from "../../../types";

export const API_KEY = "f0fed5f32d200c76908fcd89eeec3822";

type Arguments = {
  city?: string;
  tempType: TempType;
};

type WeatherReqType = (arg?: Arguments) => Promise<unknown>;

const weatherrReq: WeatherReqType = async (arg) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${
        arg?.city ? arg.city : `Yerevan`
      }&appid=${API_KEY}`
    );
    const tempTypeQuery = arg?.tempType.f ? "imperial" : "metric";
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${API_KEY}&units=${tempTypeQuery}`
    );
    return data;
  } catch (err) {
    throw new Error("");
  }
};

const axiosWeather = createAsyncThunk("weather/axiosWeather", weatherrReq);

export default axiosWeather;
