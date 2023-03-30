import { React, Fragment, useState } from "react";
import { pregunta, ciudad } from "../Assets/Ciudades.js";
import "../App.css";

const Perdedor = () => {
  const [datos, setDatos] = useState([]);
  const [ciudadnueva, setciudadnueva] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    
    if (event.target.checked) {
      // Agrega el valor del checkbox al array
      setDatos([...datos, value]);
    } else {
      // Remueve el valor del checkbox del array
      setDatos(datos.filter((item) => item !== value));
    }
  };

  const updateciudad = (event) => {
    setciudadnueva(event.target.value);
  };

  const nuevosdatos = () => {
    var a;
    var b = { nombre: ciudadnueva };
    var c = { caracteristicas: datos };
    a = Object.assign({}, b, c);
    ciudad.push(a);
    console.log(ciudad);
    alert("Nueva ciudad Añadida, para continuar dale al botón de nuevo juego");
  };

  return (
    <>
      <h1>No pude descubrir tu ciudad</h1>
      <input
        type="text"
        onChange={updateciudad}
        className="nuevaciudad"
        placeholder="Ingrese el nombre de la ciudad"
        required
      />
      <h1>Selecciona al menos 4 elementos para identificar a tu ciudad</h1>
      <div className="checkboxes">
        {pregunta.map((valor) => {
          return (
            <Fragment key={valor}>
              <label className="labeles">
                <input
                  type="checkbox"
                  value={valor}
                  onChange={handleChange}
                  className="check"
                />
                {valor}
              </label>
            </Fragment>
          );
        })}
      </div>
      <button onClick={nuevosdatos} className="anadir">
        Añadir Ciudad
      </button>
    </>
  );
};

export default Perdedor;
