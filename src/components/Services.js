import React, { useState } from "react";
import logo from "../img/logo.webp";
import '../Services.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Services() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const barbers = [
    {
      id: 1,
      name: 'Humberto',
      image: require("../img/humberto.webp"),
      phone: "+52 1 33 2811 5400",
      whatsappLink: "https://wa.me/5213328115400?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana%20de%20",
    },
    {
      id: 2,
      name: "Aarón",
      image: require("../img/aaron_600.webp"),
      phone: "+52 1 33 3072 6408",
      whatsappLink: "https://wa.me/5213330726408?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana%20de%20",
    },
    {
      id: 3,
      name: "Erick",
      image: require("../img/erick_600.webp"),
      phone: "+52 1 33 2825 5950",
      whatsappLink: "https://wa.me/5213328255950?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana%20de%20",
    },
  ];

  const services = [
    {
      id: 1,
      name: "Corte de Cabello",
      description: "Un corte tradicional y preciso para mantener tu estilo impecable.",
      price: "$100 MXN",
      time: "30-40 minutos",
      image: logo,
      category: "cortes",
      barbers: ["Humberto","Aarón","Erick"],
    },
    {
      id: 2,
      name: "Barba Express",
      description: "Perfilado rápido con máquina, navajal, gel de afeitar y desvanecido.",
      price: "$70 MXN",
      time: "15-20 minutos",
      image: logo,
      category: "barba",
      barbers: ["Humberto","Aarón","Erick"],
    },
    {
      id: 3,
      name: "Pigmentación de Barba",
      description: "Tinte natural con duración de 10 a 15 días.",
      price: "$100 MXN",
      time: "35 minutos",
      image: logo,
      category: "extras",
      barbers: ["Humberto","Aarón"],
    },
    {
      id: 4,
      name: "Recortes",
      description: "Detalles precisos en nuca, patillas y orejas con máquina y navaja.",
      price: "$70 MXN",
      time: "20 minutos",
      image: logo,
      category: "cortes",
      barbers: ["Humberto","Aarón","Erick"],
    },
    {
      id: 5,
      name: "Arreglo de Ceja",
      description: "Delineado perfecto de cejas con navaja.",
      price: "$20 MXN",
      time: "5 minutos",
      image: logo,
      category: "cortes",
      barbers: ["Humberto","Aarón","Erick"],
    },
    {
      id: 6,
      name: "Conoterapia",
      description: "Limpieza profunda y segura de los oídos.",
      price: "$100 MXN",
      time: "30 minutos",
      image: logo,
      category: "extras",
      barbers: ["Humberto"],
    },
    {
      id: 7,
      name: "Cera Española",
      description: "Remoción efectiva de vellos en oídos y orejas.",
      price: "$100 MXN",
      time: "25 minutos",
      image: logo,
      category: "extras",
      barbers: ["Humberto"],
    },
    {
      id: 8,
      name: "Ritual de Barba",
      description: "Relájate con vapor, ozonoterapia, toalla y jabón caliente, y un acabado con navaja.",
      price: "$110 MXN",
      time: "30 minutos",
      image: logo,
      category: "barba",
      barbers: ["Humberto","Aarón","Erick"],
    },
    {
      id: 9,
      name: "Facial",
      description: "Limpieza con vapor, exfoliación, extracción, y mascarillas hidratantes y purificantes.",
      price: "$150 MXN",
      time: "1 hora y 20 minutos",
      image: logo,
      category: "extras",
      barbers: ["Humberto"],
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const visibleServices = showAll ? filteredServices : filteredServices.slice(0, 3);

  return (
    <div className="container-fluid bg-dark text-white text-center py-1">
      <div className="mb-3">
        <h1 className="text-warning mb-4">Nuestros Servicios</h1>

        <div className="btn-group mb-4" role="group">
          <button
            className={`btn ${selectedCategory === "all" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setSelectedCategory("all")}
          >
            Todos
          </button>
          <button
            className={`btn ${selectedCategory === "cortes" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setSelectedCategory("cortes")}
          >
            Cortes
          </button>
          <button
            className={`btn ${selectedCategory === "barba" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setSelectedCategory("barba")}
          >
            Barba
          </button>
          <button
            className={`btn ${selectedCategory === "extras" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setSelectedCategory("extras")}
          >
            Extras
          </button>
        </div>

        <div className="row justify-content-center">
          {visibleServices.map((service) => (
            <div className="col-md-4 py-3" key={service.id}>
              <div className={`card shadow-sm bg-black text-white ${expandedCard === service.id ? "expanded-card" : ""}`}>
                <div className="card-body">
                  <h5 className="card-title text-warning">{service.name}</h5>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="mb-3 rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "4px solid white",
                    }}
                  />
                  <p>{service.description}</p>
                  <p>
                    <strong className="text-warning">Precio:</strong> {service.price} <br />
                    <strong className="text-warning">Duración:</strong> {service.time}
                  </p>
                  {expandedCard === service.id && (
                    <div className="mt-3">
                      <p>
                        <strong className="text-warning">Agenda tu cita:</strong>
                      </p>
                      <div className="row justify-content-center">
                      {service.barbers.map((barber) => {
                        const barberDetails = barbers.find((b) => b.name === barber);
                        const newMessage = `${barberDetails.whatsappLink}${service.name.toLowerCase()}.%20¿Qué%20horarios%20tienes%20disponibles?`
                        return (
                          <div className="col-4">
                            <div key={barberDetails.id} className="mb-2">
                              <p>{barberDetails.name}</p>
                              <a
                                href={newMessage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn text-success"
                                style={{
                                  backgroundColor: "transparent",
                                }}
                              >
                                <FontAwesomeIcon icon={faWhatsapp} size="2x"/>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-light mt-3"
                    onClick={() => toggleExpand(service.id)}
                  >
                    {expandedCard === service.id ? "Cerrar" : "Agendar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-warning mt-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
}

export default Services;