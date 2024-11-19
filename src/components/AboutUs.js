import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

function AboutUs() {
  return (
    <div className="container-fluid bg-dark text-white text-center py-3">
      <div className="mt-2">
        <h2 className="mb-4 text-warning">Contáctanos</h2>
        <p className="text-light">
          <strong>Ubicación: </strong> 
          <a 
            href="https://maps.app.goo.gl/dXPArC3fX3VqmBtF8" 
            className="text-warning text-decoration-none" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Camino a la Pedrera #301, Tlajomulco de Zúñiga, México
          </a><br />

          <strong>WhatsApp: </strong><br/>
          <strong>Humberto: </strong>
          <a 
            href="https://wa.me/5213328115400?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?"
            className="text-warning text-decoration-none" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            +52 1 33 2811 5400
          </a><br />
          <strong>Aaron: </strong>
          <a 
            href="https://wa.me/5213330726408?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?" 
            className="text-warning text-decoration-none" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            +52 1 33 3072 6408
          </a><br />
          <strong>Erick: </strong>
          <a 
            href="https://wa.me/5213328255950?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?" 
            className="text-warning text-decoration-none" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            +52 1 33 2825 5950
          </a><br />
          <div className="d-flex align-items-center justify-content-center mt-1">
            <a
              href="https://www.facebook.com/profile.php?id=61556967958798"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue mx-2"
              >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61556967958798"
              className="text-warning text-decoration-none" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Página de Facebook
            </a>
          </div>
          <br />
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
