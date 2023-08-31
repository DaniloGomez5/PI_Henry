/* eslint-disable no-unused-vars */
import { useNavigate, NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
   const navigate = useNavigate();

   const toHomePage = () => {
      navigate("/home");
   };

   return (
      <div className={style.landing}>
         <div className={style.titleContent}>
            <h1 className={style.h1Title}>SoyHenry PI: Food!</h1>
         </div>
         <NavLink className={style.button} to="/home">
            Go!
         </NavLink>
      </div>
   );
};

export default LandingPage;
