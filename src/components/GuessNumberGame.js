import React, { useState } from "react";
import '../App.css';

function GuessNumberGame() {
  // Estado para el número aleatorio, el intento, el mensaje y los intentos
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Función que maneja el intento de adivinanza
  const handleGuess = () => {
    setAttempts(attempts + 1);
    if (parseInt(guess) === number) {
      setMessage(`¡Felicidades! Adivinaste el número en ${attempts + 1} intentos.`);
    } else if (parseInt(guess) < number) {
      setMessage("El número es más grande.");
    } else {
      setMessage("El número es más pequeño.");
    }
  };

  // Función para reiniciar el juego
  const handleReset = () => {
    setNumber(Math.floor(Math.random() * 100) + 1); // Generar un nuevo número aleatorio
    setGuess(""); // Reiniciar el campo de adivinanza
    setMessage(""); // Limpiar el mensaje
    setAttempts(0); // Reiniciar los intentos
  };

  return (
    <div className="container-fluid bg-dark text-white py-5">
      <div className="container">
        <h3 className="text-warning">Juego: Adivina el Número</h3>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Adivina el número entre 1 y 100"
        />
        <button onClick={handleGuess}>Adivinar</button>
        <p>{message}</p>
        <p>Intentos: {attempts}</p>
        <button onClick={handleReset} className="btn btn-danger mt-2 mb-4">
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
}

export default GuessNumberGame;
