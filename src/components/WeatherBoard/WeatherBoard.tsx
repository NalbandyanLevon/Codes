import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import axiosWeather from "../../store/Slices/weatherSlice/weatherAPI";
import axiosWeatherHours from "../../store/Slices/weatherHoursSlice/weatherHoursAPI";
import styles from "./WeatherBoard.module.css";
import EachDaysWeather from "../EachDaysWeather/EachDaysWeather";
import ErrorPage from "../ErrorPage/ErrorPage";

function WeatherBoard() {
  const dispatch = useAppDispatch();
  let weather = useAppSelector((state) => state.weatherReducer);
  let weather_of_hours = useAppSelector((state) => state.weatherHoursReducer);
  let tempType = useAppSelector((state) => state.searchReducer.tempType);
  const [dayTemp, setDayTemp] = useState<number | undefined>(undefined);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (weather_of_hours.data) {
      setDayTemp(Math.floor(weather_of_hours.data.list[0].main.temp));
    }
  }, [weather_of_hours]);

  useEffect(() => {
    dispatch(axiosWeatherHours({ tempType }));
    dispatch(axiosWeather({ tempType }));
  }, [dispatch, tempType]);
  
  let timeNow = new Date().getHours();

  const filteredList = weather_of_hours.data?.list.filter((elem) => {
    let time = Number(elem.dt_txt.slice(11, 13));
    if (timeNow === 23) {
      timeNow = 0;
    }
    if (timeNow === time || timeNow - 1 === time) {
      return time === timeNow - 1 || time === timeNow;
    } else if (timeNow === time || timeNow + 1 === time) {
      return time === timeNow + 1 || time === timeNow;
    }
  });

  console.log(filteredList);
  let weathersOfDay = weather_of_hours.data?.list.slice(
    count * 8,
    count * 8 + 8
  );

  if (weather_of_hours.isLoading) {
    return <>...Loading</>;
  } else if (weather_of_hours.isError) {
    return <ErrorPage />;
  }

  else {
    return (
      <div>
        <div className={styles.mainBlock}>
          <div>{weather.data?.name}</div>
          <div>
            {weather && dayTemp}°{tempType.f ? "F" : "C"}
          </div>
          <div>{weather.data?.weather[0].main}</div>
        </div>
        <div className={styles.hoursBlock}>
          {weathersOfDay?.map((eachHoursWeather) => (
            <div key={eachHoursWeather.dt_txt}>
              {eachHoursWeather.dt_txt.slice(10)}{" "}
              {Math.floor(eachHoursWeather.main.temp)}°{tempType.f ? 'F' : 'C'}
              <hr />
            </div>
          ))}
        </div>
        <div className={styles.container}>
          {filteredList?.map((eachWeather, idx) => (
            <button
              className={styles.daysBlock}
              key={eachWeather.dt_txt}
              onClick={() => setCount(idx)}
            >
              <EachDaysWeather
                dt_txt={eachWeather.dt_txt.slice(5, 10)}
                temp={Math.floor(eachWeather.main.temp)}
                setDayTemp={setDayTemp}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default WeatherBoard;
