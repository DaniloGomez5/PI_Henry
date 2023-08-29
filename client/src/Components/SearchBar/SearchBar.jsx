/* eslint-disable no-unused-vars */
import style from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import {
   getAllRecipes,
   getRecipesByName,
   getRecipesbyId,
   searchRecipes,
} from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const [prevSearchTerm, setPrevSearchTerm] = useState("");
   const dispatch = useDispatch();

   const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const handleClean = () => {
      setSearchTerm("");
   };

   const handleSearch = (event) => {
      event.preventDefault();
      if (parseInt(searchTerm)) {
        dispatch(getRecipesbyId(searchTerm));
      } else {
        dispatch(getRecipesByName(searchTerm));
      }
    };
    

   useEffect(() => {
      if (prevSearchTerm) {
         if (parseInt(prevSearchTerm)) {
            dispatch(getRecipesbyId(prevSearchTerm));
         } else {
            dispatch(getRecipesByName(prevSearchTerm));
         }
         setPrevSearchTerm("");
      }
   }, [prevSearchTerm, dispatch]);
   

   return (
      <div className={style.contentSearchBar}>
         <input
            className={style.inputSearch}
            type="text"
            placeholder="Search recipes"
            value={searchTerm}
            onChange={handleInputChange}
         />
         <button className={style.searchbutton} onClick={handleSearch}>
            🔎
         </button>
         <button
            className={style.cleanButton}
            type="button"
            onClick={handleClean}
         >
            ❌
         </button>
      </div>
   );
};

export default SearchBar;
