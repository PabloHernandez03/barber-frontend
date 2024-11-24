import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const barbers = [
    {
      name: "Humberto",
      phone: "+52 1 33 2811 5400",
      whatsappLink: "https://wa.me/5213328115400?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?",
      instagram: "https://instagram.com/",
      facebook: "https://facebook.com/",
    },
    {
      name: "Aaron",
      phone: "+52 1 33 3072 6408",
      whatsappLink: "https://wa.me/5213330726408?text=Hola,%20quiero%20agendar%20una%20cita.%20¿Podría%20ayudarme?",
      instagram: "https://instagram.com/",
      facebook: "https://facebook.com/",
    },
    {
      name: "Erick",
      phone: "+52 1 33 2825 5950",
      whatsappLink: "https://wa.me/5213328255950?text=Hola,%20quiero%20agendar%20una%20cita.%20¿Podría%20ayudarme?",
      instagram: "https://instagram.com/",
      facebook: "https://facebook.com/",
    },
  ];

  return (
    <div className="container-fluid bg-dark py-1">
      <div className="container my-3">
        <h1 className="mb-4 text-warning text-center">Agenda tu Cita</h1>

        <div className="card bg-dark p-4 text-light">
          {/* Ubicación */}
          <p className="text-center mb-4">
            <strong>Ubicación: </strong>
            <a
              href="https://maps.app.goo.gl/dXPArC3fX3VqmBtF8"
              className="text-warning text-decoration-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              Camino a la Pedrera #301, Tlajomulco de Zúñiga, México
            </a>
          </p>

          {/* Información de contacto */}
          <div className="row text-center">
            {barbers.map((barber, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <p>
                  <strong>{barber.name}:</strong>
                  <br />
                  <a
                    href={barber.whatsappLink}
                    className="text-warning text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {barber.phone}
                  </a>
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <a
                    href={barber.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-success mx-2"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                  </a>
                  <a
                    href={barber.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-2"
                    style={{ color: "#DD247B" }}
                  >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                  <a
                    href={barber.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-2"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Nota adicional */}
          <div className="text-center mt-4">
            <p className="text-light">
              Si tienes alguna duda, no dudes en escribirnos por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
