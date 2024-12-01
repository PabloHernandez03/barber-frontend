import React, { useState } from "react";
import logo from "../img/logo.webp";

function Products() {
  const [showAll, setShowAll] = useState(false);

  const products = [
    {
      id: 1,
      name: "Cera Premium",
      description:
        "Cera de alta calidad para un acabado firme y duradero, ideal para mantener tu peinado todo el día.",
      price: "$100 MXN",
      image: logo,
    },
    {
      id: 2,
      name: "Aceite para Barba y Bigote",
      description:
        "Aceite nutritivo para barba y bigote, que hidrata, suaviza y mejora el crecimiento, dejándolos con un acabado saludable y brillante.",
      price: "$100 MXN",
      image: logo,
    },
    {
      id: 3,
      name: "Cera Teleraña",
      description:
        "Cera especial con textura suave para un peinado flexible y con volumen. Ideal para estilos con más control y fijación.",
      price: "$150 MXN",
      image: logo,
    },
    {
      id: 4,
      name: "Suero para Barba",
      description:
        "Suero que ayuda a mantener hidratación del vello facial, contribuye a una barba suave y manejable.",
      price: "$180 MXN",
      image: logo,
    },
    {
      id: 5,
      name: "Cera Profesional",
      description:
        "Cera profesional de alto rendimiento, que ofrece fijación extrema y un acabado brillante para todo tipo de peinados.",
      price: "$200 MXN",
      image: logo,
    },
    {
      id: 6,
      name: "Minoxidil para Crecimiento Capilar",
      description:
        "Tratamiento tópico de minoxidil para estimular el crecimiento capilar, ideal para combatir la caída del cabello.",
      price: "$250 MXN",
      image: logo,
    },
    {
      id: 7,
      name: "Shampoo Tinte Express",
      description:
        "Sobre de Shampoo especializado especial de color negro especial para las canas, proporcionando una cobertura rápida y duradera. 15-20 días.",
      price: "$30 MXN",
      image: logo,
    },
  ];

  const visibleProducts = showAll ? products : products.slice(0, 3);

  return (
    <div className="container-fluid bg-dark text-white text-center py-1">
      <div className="mb-2 mt-4">
        <h1 className="text-warning mb-4">Nuestros Productos</h1>

        <div className="row justify-content-center">
          {visibleProducts.map((product) => (
            <div className="col-md-4 py-3" key={product.id}>
              <div
                className={`card shadow-sm bg-black text-white`}
              >
                <div className="card-body">
                  <h5 className="card-title text-warning">{product.name}</h5>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-3 rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "4px solid white",
                    }}
                  />
                  <p>{product.description}</p>
                  <p>
                    <strong className="text-warning">Precio:</strong>{" "}
                    {product.price}
                  </p>
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

export default Products;
