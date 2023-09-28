import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Mainboard from "./components/WeatherBoard/WeatherBoard";

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainboard />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
