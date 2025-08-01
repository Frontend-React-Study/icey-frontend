import Header from "../Header";
import { Outlet } from "react-router-dom";
import st from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={st.App_background}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
