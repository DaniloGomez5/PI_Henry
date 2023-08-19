import { useState } from "react";
import validation from "./validation";
import styles from "./Form.module.css";

export default function Form({ addRecipe }) {
    const [recipeData, setRecipeData] = useState({
        nombre: "",
        resumen: "",
        healthScore: "",
        pasoAPaso: "",
        imagen: "",
        dietas: []
    });

    const [errors, setErrors] = useState({
        nombre: "",
        resumen: "",
        healthScore: "",
        pasoAPaso: "",
        imagen: "",
        dietas: ""
    });

    const handleInputChange = (e) => {
        if (e.target.name === "dieta") {
            let newDietas = [...recipeData.dietas];
            if (e.target.checked) {
                newDietas.push(e.target.value);
            } else {
                newDietas = newDietas.filter(dieta => dieta !== e.target.value);
            }
            setRecipeData({
                ...recipeData,
                dietas: newDietas
            });
            setErrors(
                validation({
                    ...recipeData,
                    dietas: newDietas
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRecipe(recipeData);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form className={styles.container} onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={recipeData.nombre} onChange={handleInputChange} className={`${styles.inputNombre} ${errors.nombre ? styles.warning : ''}`} />
                <p className="danger">{errors.nombre}</p>

                <label>Resumen:</label>
                <textarea name="resumen" value={recipeData.resumen} onChange={handleInputChange} className={`${styles.inputResumen} ${errors.resumen ? styles.warning : ''}`}></textarea>
                <p className="danger">{errors.resumen}</p>

                <label>Nivel de comida saludable:</label>
                <input type="number" name="healthScore" value={recipeData.healthScore} onChange={handleInputChange} className={`${styles.inputHealthScore} ${errors.healthScore ? styles.warning : ''}`} />
                <p className="danger">{errors.healthScore}</p>

                <label>Paso a paso:</label>
                <textarea name="pasoAPaso" value={recipeData.pasoAPaso} onChange={handleInputChange} className={`${styles.inputPasoAPaso} ${errors.pasoAPaso ? styles.warning : ''}`}></textarea>
                <p className="danger">{errors.pasoAPaso}</p>

                <label>Imagen:</label>
                <input type="text" name="imagen" value={recipeData.imagen} onChange={handleInputChange} className={`${styles.inputImagen} ${errors.imagen ? styles.warning : ''}`} />
                <p className="danger">{errors.imagen}</p>

                <label>Tipos de dieta:</label>
                <input type="checkbox" name="dieta" value="Vegetariana" onChange={handleInputChange} /> Vegetariana
                <input type="checkbox" name="dieta" value="Vegana" onChange={handleInputChange} /> Vegana
                <input type="checkbox" name="dieta" value="Sin gluten" onChange={handleInputChange} /> Sin gluten
                <p className="danger">{errors.dietas}</p>

                <button className={styles.boton} type="submit">Crear receta</button>
            </form>
        </div>
    );
}

