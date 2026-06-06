import React from "react";
import "../App.css";
import ScrollToTop from "../components/ScrollToTop";

const Location = () => {
  return (
    <div className="container-fluid bg-dark py-1">
      <ScrollToTop />
      <div className="container my-3">
        <h1 className="text-warning text-center mb-4">Nuestra Ubicación</h1>
        <div className="row">
          {/* Información de la ubicación */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <p className="text-light">
              <strong>Dirección:</strong>
            </p>
            <a
              href="https://maps.app.goo.gl/F8DGzqpWB7CM1obA7"
              className="text-warning text-decoration-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cam. a La Pedrera 28-Local #7, Lomas de San Agustin, 45650, Tlajomulco de Zúñiga, México
            </a>
            <p className="mt-3 text-light">
              Haz clic en el enlace para abrir la ubicación en Google Maps y
              obtener indicaciones.
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4443.53332438556!2d-103.47066745515878!3d20.524614590644813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f55ec5c20a6fb%3A0xdce9c1abee78afc!2sBarberia%20Royal%20Style%20Studio%20%F0%9F%92%88!5e0!3m2!1sen!2smx!4v1780766104646!5m2!1sen!2smx"
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
