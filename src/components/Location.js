import React from "react";
import "../App.css";
import ScrollToTop from "../components/ScrollToTop";

const Location = () => {
  return (
    <div className="container-fluid bg-dark py-1">
      <ScrollToTop />
      <div className="container my-5">
        <h2 className="text-warning text-center mb-4">Nuestra Ubicación</h2>
        <div className="row">
          {/* Información de la ubicación */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <p className="text-light">
              <strong>Dirección:</strong>
            </p>
            <a
              href="https://maps.app.goo.gl/dXPArC3fX3VqmBtF8"
              className="text-warning text-decoration-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              Camino a la Pedrera #301, Tlajomulco de Zúñiga, México
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.5365159299076!2d-103.47137252577551!3d20.52521780488486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f548dd6bdda03%3A0xa10faab0790472a8!2sCam.%20a%20La%20Pedrera%20301%2C%20Lomas%20de%20San%20Agustin%2C%2045650%20Sa%2C%20Jal.!5e0!3m2!1sen!2smx!4v1732051293819!5m2!1sen!2smx"
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
