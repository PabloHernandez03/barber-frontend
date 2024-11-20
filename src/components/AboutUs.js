import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function AboutUs() {
  return (
    <footer className="container-fluid bg-black text-white text-center py-4">
      <div className="container">
        <h2 className="mb-3 text-warning">Contáctanos</h2>

        {/* WhatsApp Contacts */}
        <div className="row justify-content-center">
          {[
            { name: "Humberto", number: "+52 1 33 2811 5400", link: "https://wa.me/5213328115400?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?" },
            { name: "Aaron", number: "+52 1 33 3072 6408", link: "https://wa.me/5213330726408?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?" },
            { name: "Erick", number: "+52 1 33 2825 5950", link: "https://wa.me/5213328255950?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?" },
          ].map((contact, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <a 
                href={contact.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-decoration-none text-light"
              >
                <FontAwesomeIcon icon={faWhatsapp} size="2x" className="text-success mb-2" />
                <p className="mb-0">
                  <strong>{contact.name}:</strong>
                </p>
                <p className="text-warning">{contact.number}</p>
              </a>
            </div>
          ))}
        </div>

        {/* Facebook Link */}
        <div className="mt-1">
          <a
            href="https://www.facebook.com/profile.php?id=61556967958798"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" className="text-primary mx-2" />
            <span className="text-warning">Página de Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default AboutUs;
