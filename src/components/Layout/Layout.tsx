import { Outlet } from "react-router-dom";
import SearchBoard from "../SearchBoard/SearchBoard";

function Layout() {
  return (
    <>
      <SearchBoard />
      <Outlet />
    </>
  );
}

export default Layout;
