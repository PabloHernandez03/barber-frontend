import React from "react";
// import logo from "../img/imagen.avif";

function AboutUs() {
  return (
    <div className="container-fluid bg-dark text-white text-center py-3">
      <div className="mt-2">
        <h2 className="mb-4 text-warning">Contáctanos</h2>
        <p className="text-light">
          <strong>Ubicación: </strong> 
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Camino+a+la+Pedrera,+Tlajomulco+de+Zúñiga,+México" 
            className="text-warning text-decoration-none" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Camino a la Pedrera, Tlajomulco de Zúñiga, México
          </a><br />

          <strong>WhatsApp: </strong> 
          <a 
            href="https://wa.me/5213328412707?text=Hola,%20quiero%20agendar%20una%20cita.%20¿Podría%20ayudarme?" 
            className="text-warning text-decoration-none" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            +52 1 33 28 41 2707
          </a><br />
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
