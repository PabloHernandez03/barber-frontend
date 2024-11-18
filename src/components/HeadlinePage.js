import React, { useEffect, useState } from "react";
import logo from "../img/imagen.avif";

// Aquí comienza el componente principal
function HeadlinePage() {
  const [weather, setWeather] = useState(null);  // Estado para almacenar los datos del clima

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
      <div className="position-absolute top-0 end-0 p-3">
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
        <h3 className="mb-4 text-warning">Nuestros Servicios</h3>
        <div className="row">
          <div className="col-md-4 py-1">
            <div className="card shadow-sm bg-secondary text-white">
              <div className="card-body">
                <h5 className="card-title">Cortes de Cabello</h5>
                <img src={logo} width="150" alt="Corte de Cabello" className="mb-4 rounded-circle" />
                <p className="card-text">Atrévete a probar algo nuevo o mantén tu estilo favorito.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 py-1">
            <div className="card shadow-sm bg-secondary text-white">
              <div className="card-body">
                <h5 className="card-title">Arreglo de Barba</h5>
                <img src={logo} width="150" alt="Arreglo de Barba" className="mb-4 rounded-circle" />
                <p className="card-text">Desde el perfilado hasta el afeitado, tenemos lo que necesitas.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 py-1">
            <div className="card shadow-sm bg-secondary text-white">
              <div className="card-body">
                <h5 className="card-title">Tintes</h5>
                <img src={logo} width="150" alt="Tintes" className="mb-4 rounded-circle" />
                <p className="card-text">Renueva tu estilo con un toque de color. Sin miedo al éxito.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horario */}
      <div className="mt-5">
        <h2 className="mb-4 text-warning">Horario de Atención</h2>
        <p className="text-light">
          <strong>Lunes a Sábados:</strong> 11:00 AM - 8:00 PM<br />
        </p>
        <p className="text-light">
          <strong>Domingos:</strong> 11:00 AM - 5:00 PM<br />
        </p>
      </div>
    </div>
  );
}

export default HeadlinePage;
