import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Agenda = () => {
  return (
    <div className="container-fluid bg-dark py-1">
        <div className="container py-5 mb-2 mt-4">
            <h2 className="mb-4 text-warning">Agenda tu Cita</h2>
            
            <div className="card bg-dark p-4 text-light">

                {/* Información de contacto de los barberos */}
                <div>
                <p>
                    <strong>Ubicación: </strong>
                    <a
                    href="https://www.google.com/maps/search/?api=1&query=Camino+a+la+Pedrera,+Tlajomulco+de+Zúñiga,+México"
                    className="text-warning text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Camino a la Pedrera, Tlajomulco de Zúñiga, México
                    </a>
                </p>
                
                <p>
                    <strong>Humberto: </strong>
                    <a
                    href="https://wa.me/5213328412707?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%tienes%20disponibles?"
                    className="text-warning text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    +52 1 33 2811 5400
                    </a>
                    <div className="mt-3">
                        <a
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-2"
                        >
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-2"
                        >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                    </div>
                    <br />
                    <strong>Aaron: </strong>
                    <a
                    href="https://wa.me/5213330726408?text=Hola,%20quiero%20agendar%20una%20cita.%20¿Podría%20ayudarme?"
                    className="text-warning text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    +52 1 33 3072 6408
                    </a>
                    <div className="mt-3">
                        <a
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-2"
                        >
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-2"
                        >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                    </div>
                    <br />
                    <strong>Erick: </strong>
                    <a
                    href="https://wa.me/5213328255950?text=Hola,%20quiero%20agendar%20una%20cita.%20¿Podría%20ayudarme?"
                    className="text-warning text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    +52 1 33 2825 5950
                    </a>
                    <div className="mt-3">
                        <a
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-2"
                        >
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-2"
                        >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                    </div>
                    <br />
                </p>
                </div>

                {/* Otras opciones de contacto si es necesario */}
                <div className="text-center">
                <p className="text-light">Si tienes alguna duda, no dudes en escribirnos por WhatsApp</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Agenda;
