import React, { useEffect, useState } from "react";
import logo from "../img/logo.webp";
import fondo from "../img/fondo.webp";
import "../App.css";

// Aquí comienza el componente principal
function HeadlinePage() {
  const [weather, setWeather] = useState(null);

  // Llamada a la API para obtener el clima de Guadalajara
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Tlajomulco', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            'X-RapidAPI-Key': '71e59e906dmshfdc9ed284df2469p1b599cjsn0355f0f200d5'
          }
        });

        const data = await response.json();
        const { current } = data;
        setWeather(current);  // Actualizamos el estado con los datos del clima
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="container-fluid bg-dark text-white text-center pb-1">
    {/* Sección con fondo decorativo */}
    <div
      className="fontspecial"
      style={{
        width: "100%",
        height: "560px",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <p 
        className="lead text-light mt-3 fw-bold"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)", 
          borderRadius: "20px", 
          fontSize: "2.5rem", 
          letterSpacing: "10px", 
          lineHeight: "2.5rem"
        }}
      >
        ROYAL STYLE BARBERSTUDIO
      </p>

      {/* Contenedor del logo */}
      <div
        style={{
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Logo Barbería"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "30px",
            objectFit: "contain",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "10px",
          }}
        />
      </div>

      {/* Descripción */}
      <p className="lead text-light mt-3 fw-bold font-monospace" style={{backgroundColor:"rgba(0,0,0,0.7)", borderRadius:"20px"}}>Vente a consentir.</p>
      </div>

      {/* Mostrar el clima en la esquina superior derecha */}
      <div
        className="position-absolute top-0 end-0 p-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "10px",
          fontSize: "1rem",
          textAlign: "center",
          width: "90px",
          marginTop: "62px"
        }}
      >
        {weather ? (
          <div className="text-light">
            <p style={{ margin: "0", fontWeight: "bold", fontSize:"0.7rem", }}>
              {weather.temp_c}°C
            </p>
            <img
              src={weather.condition.icon}
              alt="Icono de clima"
              style={{
                width: "40px",
                height: "40px",
                margin: "0 0",
              }}
            />
            <p style={{ margin: "0", fontSize: "0.7rem" }}>Tlajomulco</p>
          </div>
        ) : (
          <p style={{ fontSize: "0.8rem", color: "#fff" }}>Cargando...</p>
        )}
      </div>
    </div>
  );
}

export default HeadlinePage;
