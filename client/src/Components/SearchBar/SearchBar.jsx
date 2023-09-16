import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes, getRecipesByName, getRecipesbyId } from "../../redux/actions";

const SearchBar = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const dispatch = useDispatch();

   const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const handleClean = () => {
      setSearchTerm("");
      dispatch(getAllRecipes())
   };

   const handleSearch = (event) => {
      event.preventDefault();
      if (isNaN(searchTerm)) {
         dispatch(getRecipesByName(searchTerm));
      } else {
         dispatch(getRecipesbyId(searchTerm));
      }
   };
   

   return (
      <div className={style.contentSearchBar}>
         <input
            className={style.inputSearch}
            name="search-input"
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

