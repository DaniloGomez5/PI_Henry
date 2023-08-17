import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
            <div>
              <h1>Landing Page</h1>
              <Link to="/home">Ir al Home</Link>
            </div>
          }
        />
        <Route path="/home" element={<HomePage />}
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/form" element={
          <div>
            <h2>Formulario para crear nuevas Recetas</h2>
          </div>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
