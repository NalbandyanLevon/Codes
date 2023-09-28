import { useNavigate } from "react-router-dom";
import Mainboard from "../SearchBoard/SearchBoard";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <Mainboard />
      <button onClick={() => navigate(-1)}>
        <h1>There's no city like this</h1>
      </button>
    </>
  );
}

export default ErrorPage;
