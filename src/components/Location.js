import React from "react";
import '../App.css';
import ScrollToTop from "../components/ScrollToTop";

const Location = () => {
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBgvy6Z0Y9gsc0MeTOJwfTPJ9WPl4tljH8&q=Camino+a+la+Pedrera,+Tlajomulco+de+Zúñiga,+México`;

  return (
    <div className="container-fluid bg-dark py-1">
        <ScrollToTop />
        <div className="container mt-5 pt-5 pb-5 mb-5">
            <h2 className="text-warning text-center mb-4">Nuestra Ubicación</h2>
            <div className="row">
                {/* Información de la ubicación */}
                <div className="col-md-6 d-flex flex-column justify-content-center">
                <p className="text-light">
                    <strong>Dirección:</strong>
                </p>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Camino+a+la+Pedrera,+Tlajomulco+de+Zúñiga,+México"
                    className="text-warning text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Camino a la Pedrera, Tlajomulco de Zúñiga, México
                </a>
                <p className="mt-3 text-light">
                    Haz clic en el enlace para abrir la ubicación en Google Maps y obtener indicaciones.
                </p>
                </div>

                {/* Mapa interactivo */}
                <div className="col-md-6">
                <div
                    style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <iframe
                    title="Ubicación"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    ></iframe>
                </div>
                </div>
            </div>
            </div>
    </div>
  );
};

export default Location;
