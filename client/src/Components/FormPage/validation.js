export default function validation(data) {
    let errors = {
        nombre: "",
        resumen: "",
        healthScore: "",
        pasoAPaso: "",
        imagen: "",
        dietas: ""
    };
    
    // Validar campo "nombre"
    if (data.nombre === "") {
        errors.nombre = "Por favor, ingresa el nombre de la receta.";
    }
    
    // Validar campo "resumen"
    if (data.resumen === "") {
        errors.resumen = "Por favor, ingresa un resumen del plato.";
    }
    
    // Validar campo "healthScore"
    if (data.healthScore === "" || isNaN(data.healthScore) || data.healthScore < 0 || data.healthScore > 100) {
        errors.healthScore = "Por favor, ingresa un nivel de comida saludable válido (entre 0 y 100).";
    }
    
    // Validar campo "pasoAPaso"
    if (data.pasoAPaso === "") {
        errors.pasoAPaso = "Por favor, ingresa el paso a paso de la receta.";
    }
    
    // Validar campo "imagen"
    if (data.imagen === "") {
        errors.imagen = "Por favor, ingresa una imagen para la receta.";
    }
    
    // Validar campo "dietas"
    if (data.dietas.length === 0) {
        errors.dietas = "Por favor, selecciona al menos un tipo de dieta.";
    }
    
    return errors;
}
