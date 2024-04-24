import { Outlet } from "react-router";
import cls from "./style.module.css";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className={cls.container}>
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout;