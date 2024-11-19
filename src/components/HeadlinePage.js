import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.webp";
import fondo from "../img/fondo.webp";
import "../App.css";

// Aquí comienza el componente principal
function HeadlinePage() {
  const [weather, setWeather] = useState(null);

  const barbers = [
    {
      id: 1,
      name: 'Humberto "Padrón"',
      description: "Un corte tradicional y preciso para mantener tu estilo impecable.",
      image: require("../img/humberto.webp"),
      link: "/humberto",
    },
    {
      id: 2,
      name: "Aarón",
      description: "Perfilado, afeitado y detalles para una barba bien cuidada.",
      image: require("../img/aaron.webp"),
      link: "/aaron",
    },
    {
      id: 3,
      name: "Erick",
      description: "El paquete completo para un look renovado.",
      image: require("../img/humberto.webp"),
      link: "/humberto",
    },
  ];

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

      {/* Barbero */}
      <div className="mt-4">
        <h2 className="mb-2 text-warning">Nuestros Barberos</h2>
        <div className="row">
          {barbers.map((barber) => (
            <div className="col-md-4 py-1" key={barber.id}>
              <Link to={barber.link} style={{ textDecoration: "none" }}>
                <div className="card shadow-sm bg-black text-white">
                  <div className="card-body">
                    <h5 className="card-title">{barber.name}</h5>
                    <div
                      className="d-flex flex-column align-items-center mb-2"
                      style={{ textAlign: "center" }}
                    >
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          overflow: "hidden",
                          borderRadius: "50%", // Corrección aquí
                          border: "4px solid white",
                        }}
                      >
                        <img
                          src={barber.image}
                          alt={barber.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                          }}
                        />
                      </div>
                    </div>
                    <p className="card-text">{barber.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Horario */}
      <div className="mt-4">
        <h2 className="mb-2 text-warning">Horario de Atención</h2>
        <p className="text-light" style={{fontSize:"1.1rem"}}>
          <strong>Lunes a Sábados:</strong> 10:00 AM - 7:30 PM<br />
        </p>
        <p className="text-light" style={{fontSize:"1.1rem"}}>
          <strong>Domingos:</strong> 11:00 AM - 3:30 PM<br />
        </p>
      </div>
    </div>
  );
}

export default HeadlinePage;
