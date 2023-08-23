import { useState } from "react";
import validation from "./validation";
import styles from "./Form.module.css";

export default function Form({ addRecipe }) {
    const [recipeData, setRecipeData] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        Image: "",
        diets: []
    });

    const [errors, setErrors] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        Image: "",
        diets: ""
    });

    const handleInputChange = (e) => {
        if (e.target.name === "dieta") {
            const selectedDieta = e.target.value;
            const newDiets = recipeData.diets.includes(selectedDieta)
                ? recipeData.diets.filter(dieta => dieta !== selectedDieta)
                : [...recipeData.diets, selectedDieta];

            setRecipeData({
                ...recipeData,
                diets: newDiets // Cambiado a "diets"
            });
            setErrors(
                validation({
                    ...recipeData,
                    diets: newDiets // Cambiado a "diets"
                })
            );
        } else {
            setRecipeData({
                ...recipeData,
                [e.target.name]: e.target.value
            });
            setErrors(
                validation({
                    ...recipeData,
                    [e.target.name]: e.target.value
                })
            );
        }
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos que se enviarán:", recipeData);

    const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipeData)
    });

    if (response.ok) {
        // Aquí puedes realizar acciones como limpiar el formulario o mostrar un mensaje de éxito
        console.log("Receta guardada exitosamente en la base de datos");
    } else {
        console.error("Error al guardar la receta en la base de datos");
    }
};


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form className={styles.container} onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" name="name" value={recipeData.nombre} onChange={handleInputChange} className={`${styles.inputNombre} ${errors.nombre ? styles.warning : ''}`} />
                <p className="danger">{errors.nombre}</p>

                <label>Resumen:</label>
                <textarea name="summary" value={recipeData.resumen} onChange={handleInputChange} className={`${styles.inputResumen} ${errors.resumen ? styles.warning : ''}`}></textarea>
                <p className="danger">{errors.resumen}</p>

                <label>Nivel de comida saludable:</label>
                <input type="number" name="healthScore" value={recipeData.healthScore} onChange={handleInputChange} className={`${styles.inputHealthScore} ${errors.healthScore ? styles.warning : ''}`} />
                <p className="danger">{errors.healthScore}</p>

                <label>Paso a paso:</label>
                <textarea name="steps" value={recipeData.pasoAPaso} onChange={handleInputChange} className={`${styles.inputPasoAPaso} ${errors.pasoAPaso ? styles.warning : ''}`}></textarea>
                <p className="danger">{errors.pasoAPaso}</p>

                <label>Imagen:</label>
                <input type="text" name="Image" value={recipeData.imagen} onChange={handleInputChange} className={`${styles.inputImagen} ${errors.imagen ? styles.warning : ''}`} />
                <p className="danger">{errors.imagen}</p>

                <label>Tipos de dieta:</label>
                <input type="checkbox" name="diets" value="Vegetariana" onChange={handleInputChange} /> Vegetariana
                <input type="checkbox" name="diets" value="Vegana" onChange={handleInputChange} /> Vegana
                <input type="checkbox" name="diets" value="Sin gluten" onChange={handleInputChange} /> Sin gluten
                <p className="danger">{errors.diets}</p>

                <button className={styles.boton} type="submit">Crear receta</button>
            </form>
        </div>
    );
}

