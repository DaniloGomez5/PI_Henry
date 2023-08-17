import React, { useState } from "react";

function FilterOptions({ onFilterChange }) {
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("");

  const handleFilterChange = () => {
    onFilterChange(selectedDiets, selectedOrigin);
  };

  return (
    <div className="filter-options">
      <div className="diet-filter">
        <label htmlFor="diets">Filter by Diet:</label>
        <select
          id="diets"
          multiple
          value={selectedDiets}
          onChange={(e) =>
            setSelectedDiets(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="glutenFree">Gluten Free</option>
        </select>
      </div>
      <div className="origin-filter">
        <label htmlFor="origin">Filter by Origin:</label>
        <select
          id="origin"
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
        >
          <option value="">All</option>
          <option value="api">API</option>
          <option value="database">Database</option>
        </select>
      </div>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}

export default FilterOptions;
