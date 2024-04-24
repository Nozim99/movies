import { Link } from "react-router-dom";
import cls from "../style.module.css";

const Navbar = () => {

  return (
    <nav className={cls.navbar}>
      <Link to="/" className={`${cls.title} ${cls.container}`}>Nozim Maxpiraliyev</Link>
    </nav>
  )
};

export default Navbar;