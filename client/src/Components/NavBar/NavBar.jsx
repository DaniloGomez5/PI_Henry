import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
   const handleHomeClick = () => {
      if (window.location.pathname === "/home") window.location.reload();
   };

   return (
      <header>
         <div className={style.contentNavBar}>
            <nav className={style.navBar}>
               <NavLink className={style.goHomeImg} to="/">
                  <div className={style.backtohome}>
                     🏠
                  </div>
               </NavLink>
               <NavLink to="/Create" className={style.NewRecipe}>
                  Create your recipe 🧑‍🍳
               </NavLink>
               <NavLink onClick={handleHomeClick} className={style.goWelcome} to="/home">
                  🍳 Home
               </NavLink>
            </nav>
            <SearchBar />
         </div>
      </header>
   );
};

export default NavBar;
