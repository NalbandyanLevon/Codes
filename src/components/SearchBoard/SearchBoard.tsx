import { useState} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./SearchBoard.module.css";
import axiosWeatherHours from "../../store/Slices/weatherHoursSlice/weatherHoursAPI";
import axiosWeather from "../../store/Slices/weatherSlice/weatherAPI";
import { toggle } from "../../store/Slices/searchSlice/searchSlice";

function SearchBoard() {
  let dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const tempType = useAppSelector((state) => state.searchReducer.tempType);

  const handleToggle = (str: "c" | "f") => {
    dispatch(toggle(str));
  };

  return (
    <div className={styles.head}>
      <form className={styles.inputClass}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(axiosWeatherHours({ tempType, city: text }));
            dispatch(axiosWeather({ tempType, city: text }));
          }}
        >
          Search City
        </button>
      </form>
      <div className={styles.tempBlock}>
        <label htmlFor="c">
          <input
            type="radio"
            defaultChecked
            name="a"
            id="c"
            onClick={() => handleToggle("c")}
          />
          °C
        </label>
        <label htmlFor="f">
          <input
            type="radio"
            name="a"
            id="f"
            onClick={() => handleToggle("f")}
          />
          °F
        </label>
      </div>
    </div>
  );
}

export default SearchBoard;
