import { Outlet } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import "../App.css";


export default function Layout() {
  return (
    <>
      <div className="layout">
        <div className="navdiv">
          <NavigationMenu />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
}
