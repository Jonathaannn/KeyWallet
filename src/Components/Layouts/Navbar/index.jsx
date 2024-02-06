import { NavLink } from "react-router-dom";
import Style from "./style.module.css";
import { FiHome, FiPlusSquare, FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token")
    window.location.replace("/login")
  };

  return (
    <nav className={Style.container}>
      <NavLink
        to="/home"
        className={Style.logo}
      >
        KeyWallet
      </NavLink>
      <ul className={Style.itens}>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? Style.itemActive : Style.item)}
          >
            Home <FiHome size={24} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/create"
            className={({ isActive }) => (isActive ? Style.itemActive : Style.item)}
          >
            Create <FiPlusSquare size={24} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/me"
            className={({ isActive }) => (isActive ? Style.itemActive : Style.item)}
          >
            Profile <FiUser size={24} />
          </NavLink>
        </li>
      </ul>
      <button
        onClick={logout}
        className={Style.itemDanger}
      >
        Exit <FiLogOut size={24} />
      </button>
    </nav>
  );
};

export default Navbar;
