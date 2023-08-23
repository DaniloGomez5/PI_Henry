export default function validation(data) {
    let errors = {
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        Image: "",
        diets: ""
    };
    
    // Validar campo "nombre"
    if (data.name === "") {
        errors.nombre = "Por favor, ingresa el nombre de la receta.";
    }
    
    // Validar campo "resumen"
    if (data.summary === "") {
        errors.resumen = "Por favor, ingresa un resumen del plato.";
    }
    
    // Validar campo "healthScore"
    if (data.healthScore === "" || isNaN(data.healthScore) || data.healthScore < 0 || data.healthScore > 100) {
        errors.healthScore = "Por favor, ingresa un nivel de comida saludable válido (entre 0 y 100).";
    }
    
    // Validar campo "pasoAPaso"
    if (data.steps === "") {
        errors.pasoAPaso = "Por favor, ingresa el paso a paso de la receta.";
    }
    
    // Validar campo "imagen"
    if (data.Image === "") {
        errors.imagen = "Por favor, ingresa una imagen para la receta.";
    }
    
    // Validar campo "dietas"
    if (data.diets.length === 0) {
        errors.diets = "Por favor, selecciona al menos un tipo de dieta.";
    }
    
    return errors;
}
