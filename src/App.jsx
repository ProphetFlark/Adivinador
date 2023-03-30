import React, { useState } from "react";
import "./App.css";
import { ciudad, pregunta } from "./Assets/Ciudades.js";
import Perdedor from "./Components/Perdedor";

const ciudades = ciudad;
const preguntas = pregunta;

const App = () => {
  const [pregunta, setPregunta] = useState("");
  const [ciudadesPosibles, setCiudadesPosibles] = useState(ciudades);
  const [intentos, setIntentos] = useState(0);
  const [ciudadFinal, setCiudadFinal] = useState("");

  const msjperdedor = "No encontrado";

  const comenzarJuego = () => {
    setPregunta(preguntas[Math.floor(Math.random() * preguntas.length)]);
    setCiudadesPosibles(ciudades);
    setIntentos(0);
    setCiudadFinal("");
  };

  // Función que se encarga de responder la pregunta actual (SI y NO)
  const responderPregunta = (respuesta) => {
    // Filtra las ciudades posibles según la pregunta actual
    let ciudadesFiltradas = ciudadesPosibles.filter((ciudad) =>
      ciudad.caracteristicas.includes(pregunta)
    );
    // Si la respuesta es "Sí", establece las ciudades posibles como las ciudades filtradas
    if (respuesta === "Sí") {
      setCiudadesPosibles(ciudadesFiltradas);
    } else {
      // Si la respuesta es "No", establece las ciudades posibles como las ciudades que no están en las ciudades filtradas
      setCiudadesPosibles(
        ciudades.filter((ciudad) => !ciudadesFiltradas.includes(ciudad))
      );
    }
    // Incrementa el número de intentos en 1
    setIntentos(intentos + 1);
    // Si solo queda una ciudad posible, establece esa ciudad como la ciudad final
    if (ciudadesFiltradas.length === 1) {
      setCiudadFinal(ciudadesFiltradas[0].nombre); //Miami
    } else if (intentos === 9) {
      // Si se han hecho 10 intentos y no se ha encontrado la ciudad, pide al usuario que ingrese la ciudad que estaba pensando
      setCiudadFinal(msjperdedor); //No encontrado
    } else {
      // Si aún hay más de una ciudad posible y no se han hecho 10 intentos, selecciona una nueva pregunta al azar
      setPregunta(preguntas[Math.floor(Math.random() * preguntas.length)]);
    }
  };

  return (
    <>
      {ciudadFinal ? (
        <div>
          {ciudadFinal === msjperdedor ? (
            <>
              <Perdedor />
              <button onClick={comenzarJuego} className="jugardenuevo">
                NUEVO JUEGO
              </button>
            </>
          ) : (
            <>
              <h2>Lo adiviné la ciudad que estás pensando es:</h2>
              <h1 className="ace rtado">{ciudadFinal}</h1>
              <button onClick={comenzarJuego} className="jugardenuevo">
                Jugar de nuevo
              </button>
            </>
          )}
        </div>
      ) : pregunta === "" ? (
        <>
          {" "}
          <div className="imagen">
            <img
              src="https://avatars.mds.yandex.net/get-games/3006389/2a00000185cd495f5a44d6765c6e80a31339/orig"
              alt=""
            />
          </div>
          <button onClick={comenzarJuego} className="nuevojuego">
            Nuevo juego
          </button>
        </>
      ) : (
        <div className="preguntas">
          <h2>¿{pregunta}?</h2>
          <div className="botones">
            <button onClick={() => responderPregunta("Sí")}>Sí</button>
            <button onClick={() => responderPregunta("No")}>No</button>
          </div>
          <h3>Intentos restantes: {10 - intentos}</h3>
        </div>
      )}
    </>
  );
};

export default App;
