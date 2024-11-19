import React from "react";
import { Link } from "react-router-dom";
import '../App.css';
import ScrollToTop from "../components/ScrollToTop";

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
    image: require("../img/aaron.webp"),
    link: "/aaron",
  },
  {
    id: 3,
    name: "Erick",
    description: "El paquete completo para un look renovado.",
    image: require("../img/humberto.webp"),
    link: "/humberto",
  },
];

const Barbers = () => {
  return (
    <div className="container-fluid bg-dark text-white py-1">
        <ScrollToTop />
        <div className="container mb-2 mt-4">
            <h1 className="text-center mb-4 text-warning">Conoce a nuestros Barberos</h1>
            <div className="row">
            {barbers.map((barber) => (
                <div className="col-md-4 mb-4" key={barber.id}>
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
                        <h5 className="card-title text-center text-white">{barber.name}</h5>
                        <p className="card-text text-white">{barber.description}</p>
                        <Link
                        to={barber.link}
                        className="btn btn-dark mt-auto align-self-center"
                        >
                        Ver Perfil
                        </Link>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Barbers;