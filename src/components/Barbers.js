import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

const barbers = [
  {
    id: 1,
    name: 'Humberto "Padrón"',
    description: "Un corte tradicional y preciso para mantener tu estilo impecable.",
    image: require("../img/humberto.webp"),
    link: "/humberto",
  },
  {
    id: 2,
    name: "Aarón",
    description: "Perfilado, afeitado y detalles para una barba bien cuidada.",
    image: require("../img/aaron_600.webp"),
    link: "/aaron",
  },
  {
    id: 3,
    name: "Erick",
    description: "El paquete completo para un look renovado.",
    image: require("../img/erick_600.webp"),
    link: "/erick",
  },
];

const Barbers = () => {
  return (
    <div className="container-fluid bg-dark text-white py-1">
        <div className="container mb-2 mt-4">
            <h1 className="text-center mb-4 text-warning">Conoce a nuestros Barberos</h1>
            <div className="row">
              {barbers.map((barber) => (
                  <div className="col-md-4 mb-4" key={barber.id}>
                    <Link
                      to={barber.link}
                      className="text-decoration-none"
                      >
                      <div className="card shadow h-100 bg-black barber-card">
                      <div className="image-container">
                          <img
                          src={barber.image}
                          className="card-img-top"
                          alt={barber.name}
                          style={{ objectFit: "cover", height: "250px" }}
                          />
                      </div>
                      <div className="card-body d-flex flex-column">
                          <h3 className="card-title text-center text-white">{barber.name}</h3>
                      </div>
                      </div>
                      </Link>
                  </div>
                  ))}
            </div>
        </div>
    </div>
  );
};

export default Barbers;
