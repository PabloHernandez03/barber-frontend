import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/imagen.avif";

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
    <div className="container-fluid bg-dark text-white text-center py-3">
      {/* Logo */}
      <img src={logo} width="150" alt="Logo Barbería" className="mb-4 rounded-circle" />

      {/* Descripción */}
      <p className="lead text-light">Vente a consentir.</p>

      {/* Mostrar el clima en la esquina superior derecha */}
      <div className="position-absolute top-0 end-0 p-3 mt-5">
        {weather ? (
            <div className="text-light">
            <h6>Clima en Tlajomulco</h6>
            <p><strong>{weather.temp_c}°C</strong></p>
            <img
                src={`${weather.condition.icon}`}
                alt="Icono de clima"
                style={{ marginTop: '-18px' }}
            />
            </div>
        ) : (
            <p>Cargando clima...</p>
        )}
        </div>

      {/* Servicios */}
      <div className="mt-2">
        <h3 className="mb-4 text-warning">Nuestros Barberos</h3>
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
      <div className="mt-5">
        <h2 className="mb-4 text-warning">Horario de Atención</h2>
        <p className="text-light">
          <strong>Lunes a Sábados:</strong> 10:00 AM - 7:30 PM<br />
        </p>
        <p className="text-light">
          <strong>Domingos:</strong> 11:00 AM - 3:30 PM<br />
        </p>
      </div>
    </div>
  );
}

export default HeadlinePage;
