import styles from "./EachDaysWeather.module.css";

interface IEachDaysWeather {
  dt_txt?: string;
  temp: number;
  setDayTemp: (temp: number) => void;
}

function EachDaysWeather(props: IEachDaysWeather) {
  return (
    <div
      className={styles.eachDaysBlock}
      onClick={() => props.setDayTemp(props.temp)}
    >
      <div>{props.dt_txt}</div>
      <div>{props.temp} °C</div>
    </div>
  );
}

export default EachDaysWeather;
