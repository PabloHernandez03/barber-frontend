import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import ScrollToTop from "../components/ScrollToTop";

const Humberto = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false); // Estado para ver más/menos

  // Cargar imágenes dinámicamente desde la carpeta
  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    try {
      const images = importAll(require.context('../img/humberto', false, /\.(png|jpe?g|svg|webp|avif)$/));
      setGalleryImages(images);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
    }
  }, []);

  // Mostrar las primeras 6 imágenes si no se presiona "ver más"
  const visibleImages = showAllImages ? galleryImages : galleryImages.slice(0, 6);

  return (
    <div className="container-fluid bg-dark text-white py-1">
      <ScrollToTop />
      <div className="container my-5 mb-2 mt-4">
        {/* Foto de perfil y descripción con fondo */}
        <div
          className="d-flex flex-column align-items-center mb-5"
          style={{
            textAlign: "center",
            backgroundImage: `url(${require('../img/humberto.webp')})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            padding: "50px 20px",
            color: "white",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              overflow: "hidden",
              borderRadius: "50%",
              border: "4px solid white",
            }}
          >
            <img
              src={require('../img/humberto.webp')}
              alt="Foto de Humberto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
          <h1 className="mt-3">Humberto "Padrón"</h1>
          <p className="lead">
            <a
              href="https://wa.me/5213328115400?text=Hola,%20quiero%20agendar%20una%20cita%20para%20mañana.%20¿Qué%20horas%20tienes%20disponibles?"
              className="btn btn-light text-transparent mt-2"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "transparent", // Fondo blanco
                color: "white",    // Texto transparente
                border: "2px solid white", // Borde blanco (opcional)
              }}
            >
              Mándame mensaje
            </a>
          </p>
          <div className="mt-3">
            {/* Íconos de redes sociales */}
            <a
              href="https://wa.me/5213328115400"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
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
        </div>

        {/* Galería */}
        <h2 className="text-center mb-4">Galería</h2>
        <div className="row">
          {visibleImages.length > 0 ? (
            visibleImages.map((image, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <img
                  src={image}
                  alt={`Galería Humberto ${index + 1}`}
                  className="img-fluid rounded shadow"
                />
              </div>
            ))
          ) : (
            <p className="text-center">Cargando imágenes...</p>
          )}
        </div>
        {galleryImages.length > 6 && (
          <div className="text-center">
            <button
              className="btn btn-warning"
              onClick={() => setShowAllImages(!showAllImages)}
            >
              {showAllImages ? "Ver menos" : "Ver más"}
            </button>
          </div>
        )}
      </div>
      {/* <UserBooking /> */}
    </div>
  );
};

export default Humberto;
