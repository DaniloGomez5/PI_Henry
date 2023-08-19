
import React, { useState, useEffect } from 'react';

const RecetasComponent = () => {
  const [recetas, setRecetas] = useState([]); // Aquí tendrías tu lista de recetas
  const [paginaActual, setPaginaActual] = useState(1);
  const recetasPorPagina = 9;

  // Simulación de datos de recetas (sustituye con tus propios datos)
  const recetasMock = [
    { id: 1, nombre: 'Receta 1', dieta: 'Vegetariana', origen: 'API', saludable: true },
    { id: 2, nombre: 'Receta 2', dieta: 'Vegana', origen: 'Base de Datos', saludable: false },
    // ... más recetas ...
  ];

  useEffect(() => {
    // Simulación de carga de recetas (sustituye con tus propios datos)
    setRecetas(recetasMock);
  }, []);

  const filtrarPorDieta = (dieta) => {
    // Lógica para filtrar por tipo de dieta
    // Actualiza el estado con las recetas filtradas
  };

  const filtrarPorOrigen = (origen) => {
    // Lógica para filtrar por origen
    // Actualiza el estado con las recetas filtradas
  };

  const ordenarAlfabeticamente = (ascendente) => {
    // Lógica para ordenar alfabéticamente
    // Actualiza el estado con las recetas ordenadas
  };

  const ordenarPorSaludable = () => {
    // Lógica para ordenar por saludabilidad
    // Actualiza el estado con las recetas ordenadas
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const indiceInicio = (paginaActual - 1) * recetasPorPagina;
  const recetasMostradas = recetas.slice(indiceInicio, indiceInicio + recetasPorPagina);

  return (
    <div>
      <nav>
        <div>
          <h2>Filtrar por</h2>
          <button onClick={() => filtrarPorDieta('Vegetariana')}>Vegetariana</button>
          <button onClick={() => filtrarPorDieta('Vegana')}>Vegana</button>
          {/* Agrega más botones de filtro */}
        </div>
        <div>
          <h2>Ordenar por</h2>
          <button onClick={() => ordenarAlfabeticamente(true)}>A-Z</button>
          <button onClick={() => ordenarAlfabeticamente(false)}>Z-A</button>
          <button onClick={ordenarPorSaludable}>Comida Saludable</button>
        </div>
      </nav>
      <div id="recetasListado">
        {recetasMostradas.map((receta) => (
          <div key={receta.id}>
            {/* Muestra los detalles de la receta */}
            <p>Nombre: {receta.nombre}</p>
            <p>Dieta: {receta.dieta}</p>
            <p>Origen: {receta.origen}</p>
            <p>Saludable: {receta.saludable ? 'Sí' : 'No'}</p>
          </div>
        ))}
      </div>
      <div id="paginacion">
        {/* Genera los números de página y maneja el cambio de página */}
        {Array.from({ length: Math.ceil(recetas.length / recetasPorPagina) }).map((_, index) => (
          <button key={index} onClick={() => cambiarPagina(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecetasComponent;


