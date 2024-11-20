import React, { useState } from "react";
import logo from "../img/logo.webp";

function ServicesPage() {
  const [showAll, setShowAll] = useState(false);

  const services = [
    {
      id: 1,
      name: "Corte de Cabello",
      description: "Un corte tradicional y preciso para mantener tu estilo impecable.",
      price: "$120 MXN",
      time: "30 minutos",
      image: logo,
    },
    {
      id: 2,
      name: "Arreglo de barba",
      description: "Perfilado, afeitado y detalles para una barba bien cuidada.",
      price: "$150 MXN",
      time: "30 minutos",
      image: logo,
    },
    {
      id: 3,
      name: "Corte + Afeitado",
      description: "Corte de cabello y corte de barba.",
      price: "$150 MXN",
      time: "30 minutos",
      image: logo,
    },
  ];

  // Determinar los servicios visibles
  const visibleServices = showAll ? services : services.slice(0, 3);
  return (
    <div className="container-fluid bg-dark text-white text-center py-1">
      {/* Servicios */}
      <div className="mt-3 mb-3">
        <h2 className="mb-2 text-warning">Nuestros Servicios</h2>
        <div className="row">
          {visibleServices.map((service) => (
            <div className="col-md-4 py-1" key={service.id}>
              <div className="card shadow-sm bg-black text-white">
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <div
                    className="d-flex flex-column align-items-center mb-2"
                    style={{ textAlign: "center" }}
                  >
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        overflow: "hidden",
                        borderRadius: "50%",
                        border: "4px solid white",
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="mb-4 rounded-circle"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  </div>
                  <p className="card-text">{service.description}</p>
                  <p>
                    <strong>Precio:</strong> {service.price} <br />
                    <strong>Duración:</strong> {service.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Botón para ver más/menos */}
        <button
          className="btn btn-warning mt-4 mb-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
}

export default ServicesPage;
